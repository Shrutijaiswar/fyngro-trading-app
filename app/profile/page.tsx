"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "../components/ui/card"
import { User, Mail, Phone, Settings, Camera, Sun, Moon, Briefcase, CreditCard, DollarSign, Shield } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  if (!mounted) return null

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 p-6">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <User className="mr-2 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 text-gray-500 dark:text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 text-gray-500 dark:text-gray-400" />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </Card>
        <Card className="p-6 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <label
            htmlFor="photo-upload"
            className="cursor-pointer flex items-center justify-center w-full p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <Camera className="mr-2" size={18} />
            Upload Photo
          </label>
          <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Link href="/profile/portfolio-settings">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <Briefcase className="mr-2 text-blue-600" />
              Portfolio Settings
            </h2>
            <p className="text-gray-600">Manage your investment preferences and strategies</p>
          </Card>
        </Link>
        <Link href="/profile/payment-methods">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <CreditCard className="mr-2 text-blue-600" />
              Payment Methods
            </h2>
            <p className="text-gray-600">Add or manage your payment options</p>
          </Card>
        </Link>
        <Link href="/profile/funds">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <DollarSign className="mr-2 text-blue-600" />
              Deposit & Withdraw Funds
            </h2>
            <p className="text-gray-600">Manage your account balance</p>
          </Card>
        </Link>
        <Link href="/profile/security">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <Shield className="mr-2 text-blue-600" />
              Security Settings
            </h2>
            <p className="text-gray-600">Update your password and security preferences</p>
          </Card>
        </Link>
      </div>
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Settings className="mr-2 text-blue-600" />
          Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Two-Factor Authentication</span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {theme === "dark" ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700" />}
            </button>
          </div>
        </div>
      </Card>
    </div>
  )
}
