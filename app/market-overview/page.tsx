"use client"

import { useState, useEffect } from "react"
import { Card } from "../components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Simulated API call
const fetchMarketData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        marketData: [
          { date: "2023-01-01", value: 1000 },
          { date: "2023-02-01", value: 1050 },
          { date: "2023-03-01", value: 1100 },
          { date: "2023-04-01", value: 1075 },
          { date: "2023-05-01", value: 1150 },
          { date: "2023-06-01", value: 1200 },
        ],
        topGainers: [
          { symbol: "AAPL", name: "Apple Inc.", change: 5.2 },
          { symbol: "TSLA", name: "Tesla Inc.", change: 4.8 },
          { symbol: "NVDA", name: "NVIDIA Corporation", change: 4.3 },
          { symbol: "MSFT", name: "Microsoft Corporation", change: 3.9 },
          { symbol: "AMZN", name: "Amazon.com Inc.", change: 3.7 },
          { symbol: "GOOGL", name: "Alphabet Inc.", change: 3.5 },
          { symbol: "FB", name: "Meta Platforms Inc.", change: 3.2 },
          { symbol: "NFLX", name: "Netflix Inc.", change: 3.0 },
          { symbol: "ADBE", name: "Adobe Inc.", change: 2.8 },
          { symbol: "CRM", name: "Salesforce.com Inc.", change: 2.6 },
        ],
        topLosers: [
          { symbol: "IBM", name: "International Business Machines", change: -3.1 },
          { symbol: "GE", name: "General Electric Company", change: -2.9 },
          { symbol: "XOM", name: "Exxon Mobil Corporation", change: -2.7 },
          { symbol: "CVX", name: "Chevron Corporation", change: -2.5 },
          { symbol: "WMT", name: "Walmart Inc.", change: -2.3 },
          { symbol: "PFE", name: "Pfizer Inc.", change: -2.1 },
          { symbol: "KO", name: "The Coca-Cola Company", change: -1.9 },
          { symbol: "VZ", name: "Verizon Communications Inc.", change: -1.7 },
          { symbol: "T", name: "AT&T Inc.", change: -1.5 },
          { symbol: "MRK", name: "Merck & Co. Inc.", change: -1.3 },
        ],
      })
    }, 1000) // Simulate a 1-second delay
  })
}

export default function MarketOverview() {
  const [marketData, setMarketData] = useState([])
  const [topGainers, setTopGainers] = useState([])
  const [topLosers, setTopLosers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMarketData().then((data: any) => {
      setMarketData(data.marketData)
      setTopGainers(data.topGainers)
      setTopLosers(data.topLosers)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <div className="text-center mt-8">Loading market data...</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Market Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Market Performance</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Top Gainers</h2>
            <div className="overflow-y-auto max-h-64">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-2">Symbol</th>
                    <th className="pb-2">Name</th>
                    <th className="pb-2 text-right">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {topGainers.map((stock) => (
                    <tr key={stock.symbol} className="border-t">
                      <td className="py-2">{stock.symbol}</td>
                      <td className="py-2">{stock.name}</td>
                      <td className="py-2 text-right text-green-600">+{stock.change}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Top Losers</h2>
            <div className="overflow-y-auto max-h-64">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-2">Symbol</th>
                    <th className="pb-2">Name</th>
                    <th className="pb-2 text-right">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {topLosers.map((stock) => (
                    <tr key={stock.symbol} className="border-t">
                      <td className="py-2">{stock.symbol}</td>
                      <td className="py-2">{stock.name}</td>
                      <td className="py-2 text-right text-red-600">{stock.change}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
