import { NextResponse } from "next/server"

// This would be replaced with a proper database in a real application
const otpStore: { [key: string]: { otp: string; timestamp: number } } = {}

export async function POST(req: Request) {
  try {
    const { aadhaarNumber, otp } = await req.json()

    if (!aadhaarNumber || aadhaarNumber.length !== 12 || !/^\d+$/.test(aadhaarNumber)) {
      return NextResponse.json({ error: "Invalid Aadhaar number" }, { status: 400 })
    }

    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

    // Check if OTP exists and is valid
    const storedOTP = otpStore[aadhaarNumber]
    if (!storedOTP || storedOTP.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

    // Check if OTP has expired (15 minutes validity)
    if (Date.now() - storedOTP.timestamp > 15 * 60 * 1000) {
      delete otpStore[aadhaarNumber]
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 })
    }

    // Clear the OTP after successful verification
    delete otpStore[aadhaarNumber]

    // Mock KYC data
    const mockKycData = {
      name: "John Doe",
      dob: "1990-01-01",
      gender: "M",
      address: "123 Main St, Metropolis, State, 123456",
      mobile: "9999999999",
      email: "johndoe@example.com",
      photo: Buffer.from("mock-photo-data").toString("base64"),
    }

    return NextResponse.json(mockKycData)
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 },
    )
  }
}
