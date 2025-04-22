"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, TrendingUp, BarChart2, DollarSign, Wallet, Briefcase, Eye } from "lucide-react"

export default function InvestmentPromotions() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 p-4 bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-300 ease-in-out transform translate-y-0 shadow-lg">
      <div className="container mx-auto">
        <Card className="bg-white p-6 rounded-lg shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-sky-600">Invest in everything</h2>
              <p className="mb-4 text-gray-600">
                Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/stocks">
                  <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                    <TrendingUp className="mr-2" /> Stocks
                  </Button>
                </Link>
                <Link href="/market-overview">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    <BarChart2 className="mr-2" /> Market Overview
                  </Button>
                </Link>
                <Link href="/transactions">
                  <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">
                    <DollarSign className="mr-2" /> Transactions
                  </Button>
                </Link>
                <Link href="/wallet">
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                    <Wallet className="mr-2" /> Wallet
                  </Button>
                </Link>
                <Link href="/demat-account">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                    <Briefcase className="mr-2" /> Demat Account
                  </Button>
                </Link>
                <Link href="/watchlist">
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                    <Eye className="mr-2" /> Watchlist
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-sky-600">Open a Fyngro account</h2>
              <p className="mb-4 text-gray-600">
                Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
              </p>
              <Button className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-3">
                Sign up for free <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
