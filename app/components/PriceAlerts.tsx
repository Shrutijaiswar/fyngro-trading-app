"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Bell, ArrowUp, ArrowDown } from "lucide-react"

interface Alert {
  symbol: string
  type: "buy" | "sell"
  price: number
  currentPrice: number
}

export default function PriceAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    // In a real app, you'd fetch this data from an API and update it regularly
    const watchlists = JSON.parse(localStorage.getItem("watchlists") || "[]")
    const newAlerts: Alert[] = []

    watchlists.forEach((watchlist: any) => {
      watchlist.stocks.forEach((stock: any) => {
        if (stock.buyAlert && stock.price <= stock.buyAlert) {
          newAlerts.push({
            symbol: stock.symbol,
            type: "buy",
            price: stock.buyAlert,
            currentPrice: stock.price,
          })
        }
        if (stock.sellAlert && stock.price >= stock.sellAlert) {
          newAlerts.push({
            symbol: stock.symbol,
            type: "sell",
            price: stock.sellAlert,
            currentPrice: stock.price,
          })
        }
      })
    })

    setAlerts(newAlerts)
  }, [])

  if (alerts.length === 0) {
    return null
  }

  return (
    <Card className="p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Bell className="mr-2" /> Price Alerts
      </h2>
      {alerts.map((alert, index) => (
        <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
          <p className="font-semibold">{alert.symbol}</p>
          <p className={`text-sm ${alert.type === "buy" ? "text-green-600" : "text-red-600"}`}>
            {alert.type === "buy" ? <ArrowUp className="inline mr-1" /> : <ArrowDown className="inline mr-1" />}
            {alert.type === "buy" ? "Buy" : "Sell"} alert triggered at ${alert.price.toFixed(2)}
          </p>
          <p className="text-sm">Current price: ${alert.currentPrice.toFixed(2)}</p>
        </div>
      ))}
    </Card>
  )
}
