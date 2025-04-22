"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  TrendingUp,
  BarChart2,
  DollarSign,
  Wallet,
  Briefcase,
  Eye,
  ArrowRight,
  Smartphone,
  FileCheck,
  Lock,
  ArrowUpRight,
  ArrowDownRight,
  Search,
} from "lucide-react"

export default function Home() {
  const allStocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 150.25, change: 2.5 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 2750.8, change: -1.2 },
    { symbol: "MSFT", name: "Microsoft Corporation", price: 305.15, change: 0.8 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 3380.5, change: -0.5 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 750.3, change: 3.2 },
    { symbol: "FB", name: "Meta Platforms Inc.", price: 330.75, change: 1.7 },
    { symbol: "NVDA", name: "NVIDIA Corporation", price: 220.8, change: -0.9 },
    { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 155.9, change: 0.3 },
    { symbol: "V", name: "Visa Inc.", price: 230.45, change: 1.1 },
    { symbol: "JNJ", name: "Johnson & Johnson", price: 170.2, change: -0.2 },
  ]

  const [searchTerm, setSearchTerm] = useState("")
  const [stocks, setStocks] = useState(allStocks)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
    const filteredStocks = allStocks.filter(
      (stock) => stock.symbol.toLowerCase().includes(term) || stock.name.toLowerCase().includes(term),
    )
    setStocks(filteredStocks)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Invest in everything section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-indigo-800 dark:text-indigo-200">Invest in everything</h2>
            <p className="mb-8 text-indigo-600 dark:text-indigo-300 text-xl max-w-2xl mx-auto">
              Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: TrendingUp, label: "Stocks" },
              { icon: BarChart2, label: "Market Overview" },
              { icon: DollarSign, label: "Transactions" },
              { icon: Wallet, label: "Wallet" },
              { icon: Briefcase, label: "Demat Account" },
              { icon: Eye, label: "Watchlist" },
            ].map((item, index) => (
              <Link key={index} href={`/${item.label.toLowerCase().replace(" ", "-")}`}>
                <Button className="w-full bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <item.icon className="mr-2" /> {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Open a Fyngro account section */}
        <div className="mb-24 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-8">
              <h2 className="text-4xl font-bold mb-4 text-indigo-600 dark:text-indigo-300">Open a Fyngro account</h2>
              <p className="mb-6 text-gray-600 dark:text-gray-300 text-lg">
                Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
              </p>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-lg py-4 px-8 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50">
                <span className="flex items-center">
                  Sign up for free
                  <ArrowRight className="ml-2 animate-bounce" />
                </span>
              </Button>
            </div>
            <div className="md:w-1/2 relative">
              <div className="aspect-[4/3] md:aspect-auto md:h-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/web-trading-platform-how-to-trade-like-a-pro-on-the-big-screen.jpg-fFUwIxNl4hW1yK0k0IanJp852hPkaw.jpeg"
                  alt="Trading Platform Interface"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 bg-indigo-500 rounded-full px-4 py-2 transform -rotate-12">
                  <span className="text-white font-semibold text-lg">Fyngro</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stocks List and Market Overview */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-center text-indigo-800 dark:text-indigo-200">Market Snapshot</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-300">Top Stocks</h3>
              <div className="mb-4 relative">
                <Input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {stocks.map((stock) => (
                  <div key={stock.symbol} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{stock.symbol}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800 dark:text-gray-200">${stock.price.toFixed(2)}</p>
                      <p
                        className={`text-sm flex items-center ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {stock.change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {Math.abs(stock.change)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-300">Market Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Indices</h4>
                  <div className="space-y-2">
                    {[
                      { name: "Sensex", value: "61,795.04", change: "+1.2%" },
                      { name: "Nifty 50", value: "18,349.70", change: "+0.9%" },
                      { name: "BSE SmallCap", value: "28,486.91", change: "+0.5%" },
                      { name: "BSE MidCap", value: "25,228.41", change: "+0.7%" },
                    ].map((index) => (
                      <div key={index.name} className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">{index.name}</span>
                        <div className="text-right">
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{index.value}</span>
                          <span
                            className={`ml-2 text-sm ${index.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                          >
                            {index.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Currencies</h4>
                  <div className="space-y-2">
                    {[
                      { name: "USD/INR", value: "81.67", change: "-0.3%" },
                      { name: "EUR/INR", value: "85.42", change: "+0.2%" },
                      { name: "GBP/INR", value: "97.31", change: "-0.1%" },
                      { name: "JPY/INR", value: "0.58", change: "+0.4%" },
                    ].map((currency) => (
                      <div key={currency.name} className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">{currency.name}</span>
                        <div className="text-right">
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{currency.value}</span>
                          <span
                            className={`ml-2 text-sm ${currency.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                          >
                            {currency.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Commodities</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "Gold", value: "₹58,450", change: "+0.8%" },
                      { name: "Silver", value: "₹69,800", change: "+1.2%" },
                      { name: "Crude Oil", value: "₹6,450", change: "-0.5%" },
                      { name: "Natural Gas", value: "₹520", change: "+1.5%" },
                    ].map((commodity) => (
                      <div key={commodity.name} className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">{commodity.name}</span>
                        <div className="text-right">
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{commodity.value}</span>
                          <span
                            className={`ml-2 text-sm ${commodity.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                          >
                            {commodity.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Open Account Section */}
        <div className="mb-24 bg-indigo-600 dark:bg-indigo-800 rounded-lg shadow-xl overflow-hidden">
          <div className="py-16 px-8">
            <h2 className="text-4xl font-bold mb-12 text-white text-center">How to Open a Demat Account</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Smartphone, title: "Download App", description: "Get the Fyngro app or visit our website" },
                { icon: Smartphone, title: "Verify Mobile", description: "Enter your number and verify with OTP" },
                { icon: Lock, title: "KYC Process", description: "Complete KYC and verify bank details" },
                { icon: FileCheck, title: "E-Sign Documents", description: "Digitally sign your account forms" },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-full w-24 h-24 flex items-center justify-center shadow-lg mb-4">
                    <step.icon className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white text-xl">{step.title}</h3>
                  <p className="text-indigo-200">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center text-indigo-200 flex items-center justify-center gap-2">
              <Lock className="w-5 h-5" />
              <p className="text-sm">All data is stored safely with encryption as per regulatory guidelines.</p>
            </div>
          </div>
        </div>

        {/* Footer Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: TrendingUp,
              title: "Stocks",
              description: "View and manage your stock portfolio with real-time updates and insights.",
            },
            {
              icon: BarChart2,
              title: "Market Overview",
              description: "Get comprehensive insights on market trends and performance indicators.",
            },
            {
              icon: DollarSign,
              title: "Recent Transactions",
              description: "Track your recent trading activity and monitor your investment performance.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center text-indigo-600 dark:text-indigo-400">
                <item.icon className="mr-2" />
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
