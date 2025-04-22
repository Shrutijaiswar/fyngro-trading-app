"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { date: "2023-01-01", price: 150 },
  { date: "2023-02-01", price: 155 },
  { date: "2023-03-01", price: 160 },
  { date: "2023-04-01", price: 158 },
  { date: "2023-05-01", price: 162 },
  { date: "2023-06-01", price: 165 },
]

export default function StockChart({ symbol }: { symbol: string }) {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="date" stroke="#E0E0E0" />
          <YAxis stroke="#E0E0E0" />
          <Tooltip
            contentStyle={{ backgroundColor: "#121212", border: "1px solid #333" }}
            labelStyle={{ color: "#E0E0E0" }}
          />
          <Line type="monotone" dataKey="price" stroke="#1E88E5" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
