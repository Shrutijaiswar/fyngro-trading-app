import { NextResponse } from "next/server"

// Mock database of Aadhaar numbers and associated mobile numbers
const mockAadhaarDatabase: { [key: string]: string } = {
  "123456789012": "9876543210",
  "234567890123": "8765432109",
  "345678901234": "7654321098",
  // Add more mock data as needed
}

export async function POST(req: Request) {
  try {
    const { aadhaarNumber } = await req.json()

    if (!aadhaarNumber || aadhaarNumber.length !== 12 || !/^\d+$/.test(aadhaarNumber)) {
      return NextResponse.json({ error: "Invalid Aadhaar number" }, { status: 400 })
    }

    const mobileNumber = mockAadhaarDatabase[aadhaarNumber]
    if (!mobileNumber) {
      return NextResponse.json({ error: "Aadhaar number not found in our records" }, { status: 404 })
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // In a real scenario, this OTP would be sent via SMS
    console.log(`OTP ${otp} sent to mobile number ${mobileNumber} for Aadhaar ${aadhaarNumber}`)

    // Only return the last 4 digits of the mobile number for privacy
    const maskedMobile = `******${mobileNumber.slice(-4)}`

    return NextResponse.json({
      message: `OTP sent successfully to ${maskedMobile}`,
      maskedMobile,
    })
  } catch (error) {
    console.error("Error generating OTP:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
