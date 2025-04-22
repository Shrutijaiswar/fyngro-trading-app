"use client"

import { useState } from "react"
import { Card } from "../components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import DematInfo from "../components/DematInfo"
import OpenDematAccount from "../components/OpenDematAccount"
import VideoModal from "../components/VideoModal"
import { PlayCircle } from "lucide-react"
import { AadhaarKYC } from "../components/AadhaarKYC"

const dematHoldings = [
  { name: "Stocks", value: 5000 },
  { name: "Mutual Funds", value: 3000 },
  { name: "ETFs", value: 2000 },
  { name: "Bonds", value: 1000 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function DematAccountPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const totalValue = dematHoldings.reduce((sum, holding) => sum + holding.value, 0)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Demat Account</h1>
        <button
          onClick={() => setIsVideoModalOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlayCircle className="mr-2" size={20} />
          Learn About Demat Accounts
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${totalValue.toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Portfolio Value</p>
        </Card>
        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Holdings Distribution</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dematHoldings}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {dematHoldings.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <Card className="mt-6 p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Holdings Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-2">Type</th>
                <th className="pb-2">Value</th>
                <th className="pb-2">Allocation</th>
              </tr>
            </thead>
            <tbody>
              {dematHoldings.map((holding, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-2">{holding.name}</td>
                  <td className="py-2">${holding.value.toLocaleString()}</td>
                  <td className="py-2">{((holding.value / totalValue) * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card className="mt-6 p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Learn About Demat Account</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.youtube.com/embed/ZV-_Rre9laQ"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
      </Card>
      <AadhaarKYC />
      <DematInfo />
      <OpenDematAccount />
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoId="ZV-_Rre9laQ" />
    </div>
  )
}
