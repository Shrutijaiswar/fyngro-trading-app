"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Stock {
  symbol: string
  name: string
  price: number
  buyAlert: number | null
  sellAlert: number | null
}

interface Watchlist {
  id: number
  name: string
  stocks: Stock[]
}

export default function ManageAlertsPage() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([])
  const [activeWatchlist, setActiveWatchlist] = useState<Watchlist | null>(null)

  useEffect(() => {
    // In a real app, you'd fetch this data from an API
    const savedWatchlists = localStorage.getItem("watchlists")
    if (savedWatchlists) {
      setWatchlists(JSON.parse(savedWatchlists))
      setActiveWatchlist(JSON.parse(savedWatchlists)[0])
    }
  }, [])

  const updateAlert = (symbol: string, type: "buy" | "sell", value: number | null) => {
    if (activeWatchlist) {
      const updatedWatchlists = watchlists.map((watchlist) => {
        if (watchlist.id === activeWatchlist.id) {
          return {
            ...watchlist,
            stocks: watchlist.stocks.map((stock) => {
              if (stock.symbol === symbol) {
                return {
                  ...stock,
                  [type === "buy" ? "buyAlert" : "sellAlert"]: value,
                }
              }
              return stock
            }),
          }
        }
        return watchlist
      })
      setWatchlists(updatedWatchlists)
      setActiveWatchlist(updatedWatchlists.find((w) => w.id === activeWatchlist.id) || null)
      localStorage.setItem("watchlists", JSON.stringify(updatedWatchlists))
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/watchlist" className="text-blue-600 hover:underline mb-4 inline-block">
        <ArrowLeft className="inline mr-2" />
        Back to Watchlists
      </Link>
      <h1 className="text-3xl font-bold mb-6">Manage Alerts</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Watchlists</h2>
          <ul className="space-y-2">
            {watchlists.map((watchlist) => (
              <li
                key={watchlist.id}
                className={`cursor-pointer p-2 rounded ${
                  activeWatchlist?.id === watchlist.id ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveWatchlist(watchlist)}
              >
                {watchlist.name}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="md:col-span-2 p-4">
          {activeWatchlist && (
            <>
              <h2 className="text-xl font-semibold mb-4">{activeWatchlist.name} - Alerts</h2>
              <ul className="space-y-4">
                {activeWatchlist.stocks.map((stock) => (
                  <li key={stock.symbol} className="p-4 bg-gray-100 rounded">
                    <h3 className="font-semibold mb-2">
                      {stock.symbol} - {stock.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">Current Price: ${stock.price.toFixed(2)}</p>
                    <div className="flex space-x-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Buy Alert</label>
                        <Input
                          type="number"
                          value={stock.buyAlert || ""}
                          onChange={(e) =>
                            updateAlert(stock.symbol, "buy", e.target.value ? Number(e.target.value) : null)
                          }
                          placeholder="Set buy alert price"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sell Alert</label>
                        <Input
                          type="number"
                          value={stock.sellAlert || ""}
                          onChange={(e) =>
                            updateAlert(stock.symbol, "sell", e.target.value ? Number(e.target.value) : null)
                          }
                          placeholder="Set sell alert price"
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
