"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AadhaarKYC() {
  const [aadhaarNumber, setAadhaarNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"aadhaar" | "otp" | "success">("aadhaar")
  const [error, setError] = useState<string | null>(null)
  const [otpMessage, setOtpMessage] = useState<string | null>(null)
  const [kycData, setKycData] = useState<any>(null)

  const handleAadhaarSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setOtpMessage(null)
    try {
      const response = await fetch("/api/ekyc/generate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aadhaarNumber }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      console.log("OTP generation successful:", data)
      setOtpMessage(data.message)
      setStep("otp")
    } catch (error) {
      console.error("Error generating OTP:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const response = await fetch("/api/ekyc/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ aadhaarNumber, otp }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      console.log("OTP verification successful:", data)
      setKycData(data)
      setStep("success")
    } catch (error) {
      console.error("Error verifying OTP:", error)
      setError(error instanceof Error ? error.message : "An unexpected error occurred")
    }
  }

  return (
    <Card className="mt-6 p-6 bg-white border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">Aadhaar e-KYC</h2>
      {step === "aadhaar" && (
        <form onSubmit={handleAadhaarSubmit} className="space-y-4">
          {error && <div className="text-red-500">{error}</div>}
          <div>
            <label htmlFor="aadhaarNumber" className="block mb-2">
              Aadhaar Number
            </label>
            <Input
              type="text"
              id="aadhaarNumber"
              placeholder="Enter your 12-digit Aadhaar number"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <Button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Generate OTP
          </Button>
          {otpMessage && <div className="text-green-600">{otpMessage}</div>}
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          {error && <div className="text-red-500">{error}</div>}
          <div>
            <label htmlFor="otp" className="block mb-2">
              OTP
            </label>
            <Input
              type="text"
              id="otp"
              placeholder="Enter the OTP sent to your Aadhaar-linked mobile number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <Button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Verify OTP
          </Button>
        </form>
      )}

      {step === "success" && kycData && (
        <div>
          <h3 className="text-xl font-semibold mb-2">KYC Details</h3>
          <p>Name: {kycData.name}</p>
          <p>Date of Birth: {kycData.dob}</p>
          <p>Gender: {kycData.gender}</p>
          <p>Address: {kycData.address}</p>
          <p>Mobile: {kycData.mobile}</p>
          <p>Email: {kycData.email}</p>
        </div>
      )}
    </Card>
  )
}
