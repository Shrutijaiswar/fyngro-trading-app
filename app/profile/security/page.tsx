import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft, Lock, Smartphone } from "lucide-react"
import Link from "next/link"

export default function SecuritySettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/profile" className="text-blue-600 hover:underline mb-4 inline-block">
        <ArrowLeft className="inline mr-2" />
        Back to Profile
      </Link>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Shield className="mr-2" /> Security Settings
      </h1>
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Lock className="mr-2" /> Change Password
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Current Password</label>
            <input type="password" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block mb-2">New Password</label>
            <input type="password" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block mb-2">Confirm New Password</label>
            <input type="password" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <Button className="w-full">Update Password</Button>
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Smartphone className="mr-2" /> Two-Factor Authentication
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Enable Two-Factor Authentication</span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
          <p className="text-sm text-gray-600">
            Two-factor authentication adds an extra layer of security to your account. When enabled, you'll need to
            enter a code from your phone in addition to your password when logging in.
          </p>
          <Button className="w-full">Set Up Two-Factor Authentication</Button>
        </div>
      </Card>
    </div>
  )
}
