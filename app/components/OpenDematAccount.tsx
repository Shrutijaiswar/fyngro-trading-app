"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "./ui/card"
import { FileText, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OpenDematAccount() {
  const [uploadedFiles, setUploadedFiles] = useState({
    panCard: null,
    aadharCard: null,
    addressProof: null,
    passportPhoto: null,
  })

  const handleFileUpload =
    (documentType: keyof typeof uploadedFiles) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setUploadedFiles((prev) => ({ ...prev, [documentType]: file }))
      }
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the files to your server
    console.log("Submitted files:", uploadedFiles)
    alert("Application submitted successfully!")
  }

  return (
    <Card className="mt-6 p-6 bg-white border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <FileText className="mr-2 text-blue-600" />
        Open a Demat Account
      </h2>
      <p className="mb-4">To open a Demat account, you'll need to provide the following documents:</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["PAN Card", "Aadhar Card", "Address Proof", "Passport Photo"].map((doc, index) => {
          const key = doc.toLowerCase().replace(" ", "") as keyof typeof uploadedFiles
          return (
            <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
              <Upload className="mr-2 text-blue-600" />
              <span>{doc}</span>
              <label className="ml-auto cursor-pointer">
                <span className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  {uploadedFiles[key] ? "Change" : "Upload"}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload(key)}
                  accept={key === "passportphoto" ? "image/*" : "application/pdf,image/*"}
                />
              </label>
              {uploadedFiles[key] && <span className="ml-2 text-sm text-green-600">{uploadedFiles[key].name}</span>}
            </div>
          )
        })}
        <Button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Submit Application
        </Button>
      </form>
    </Card>
  )
}
