import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PortfolioSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/profile" className="text-blue-600 hover:underline mb-4 inline-block">
        <ArrowLeft className="inline mr-2" />
        Back to Profile
      </Link>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Briefcase className="mr-2" /> Portfolio Settings
      </h1>
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Investment Preferences</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Risk Tolerance</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>Conservative</option>
              <option>Moderate</option>
              <option>Aggressive</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Investment Goals</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>Long-term Growth</option>
              <option>Income Generation</option>
              <option>Capital Preservation</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Preferred Sectors</label>
            <div className="space-x-2">
              <Button variant="outline">Technology</Button>
              <Button variant="outline">Healthcare</Button>
              <Button variant="outline">Finance</Button>
              <Button variant="outline">Energy</Button>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Auto-invest Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Enable Auto-invest</span>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
          <div>
            <label className="block mb-2">Monthly Investment Amount</label>
            <input type="number" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter amount" />
          </div>
        </div>
      </Card>
    </div>
  )
}
