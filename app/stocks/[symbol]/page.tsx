"use client"

import { useParams } from "next/navigation"
import { Card } from "../../components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, BarChart2, Activity } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const stocks = {
  AAPL: { name: "Apple Inc.", price: 150.25, change: 2.5, volume: 82.5, marketCap: 2480, pe: 28.5, dividend: 0.65 },
  MSFT: {
    name: "Microsoft Corporation",
    price: 305.15,
    change: 0.8,
    volume: 23.2,
    marketCap: 2300,
    pe: 34.2,
    dividend: 0.56,
  },
  GOOGL: { name: "Alphabet Inc.", price: 2750.8, change: -1.2, volume: 1.5, marketCap: 1850, pe: 29.8, dividend: 0 },
  AMZN: { name: "Amazon.com Inc.", price: 3380.5, change: -0.5, volume: 3.2, marketCap: 1710, pe: 60.1, dividend: 0 },
  FB: { name: "Meta Platforms Inc.", price: 330.75, change: 1.7, volume: 15.8, marketCap: 935, pe: 24.3, dividend: 0 },
  // ... (add data for all 50 stocks)
}

const generateChartData = () => {
  const data = []
  const now = new Date()
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    data.push({
      date: date.toISOString().split("T")[0],
      price: Math.random() * 100 + 100,
    })
  }
  return data
}

export default function StockSummary() {
  const params = useParams()
  const symbol = params.symbol as string
  const stock = stocks[symbol as keyof typeof stocks]
  const chartData = generateChartData()

  if (!stock) {
    return <div>Stock not found</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {stock.name} ({symbol})
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-white border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Stock Performance</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6 bg-white border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Stock Info</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Current Price</p>
              <p className="text-2xl font-semibold">${stock.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-600">Change</p>
              <p
                className={`text-xl font-semibold flex items-center ${
                  stock.change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock.change >= 0 ? (
                  <ArrowUpRight size={20} className="mr-1" />
                ) : (
                  <ArrowDownRight size={20} className="mr-1" />
                )}
                {Math.abs(stock.change)}%
              </p>
            </div>
            <div>
              <p className="text-gray-600">Volume</p>
              <p className="text-xl font-semibold">{stock.volume}M</p>
            </div>
            <div>
              <p className="text-gray-600">Market Cap</p>
              <p className="text-xl font-semibold">${stock.marketCap}B</p>
            </div>
            <div>
              <p className="text-gray-600">P/E Ratio</p>
              <p className="text-xl font-semibold">{stock.pe}</p>
            </div>
            <div>
              <p className="text-gray-600">Dividend Yield</p>
              <p className="text-xl font-semibold">{stock.dividend}%</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-6 bg-white border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Company Overview</h2>
          <p className="text-gray-600">
            {stock.name} is a leading company in its industry. This section would typically include a brief description
            of the company's business model, key products or services, and recent significant developments. In a real
            application, this information would be fetched from an API or database.
          </p>
        </Card>
        <Card className="p-6 bg-white border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <DollarSign className="text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="font-semibold">$89.5B</p>
              </div>
            </div>
            <div className="flex items-center">
              <TrendingUp className="text-green-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Growth Rate</p>
                <p className="font-semibold">12.3%</p>
              </div>
            </div>
            <div className="flex items-center">
              <BarChart2 className="text-purple-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Profit Margin</p>
                <p className="font-semibold">21.5%</p>
              </div>
            </div>
            <div className="flex items-center">
              <Activity className="text-red-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Volatility</p>
                <p className="font-semibold">Medium</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
