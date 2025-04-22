"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

interface Stock {
  symbol: string
  name: string
}

interface Watchlist {
  id: number
  name: string
  stocks: Stock[]
}

export default function ManageWatchlistPage() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([])
  const [newStockSymbol, setNewStockSymbol] = useState("")
  const [activeWatchlist, setActiveWatchlist] = useState<Watchlist | null>(null)

  useEffect(() => {
    // In a real app, you'd fetch this data from an API
    const savedWatchlists = localStorage.getItem("watchlists")
    if (savedWatchlists) {
      setWatchlists(JSON.parse(savedWatchlists))
      setActiveWatchlist(JSON.parse(savedWatchlists)[0])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("watchlists", JSON.stringify(watchlists))
  }, [watchlists])

  const addStock = () => {
    if (newStockSymbol && activeWatchlist) {
      const updatedWatchlists = watchlists.map((watchlist) => {
        if (watchlist.id === activeWatchlist.id) {
          return {
            ...watchlist,
            stocks: [
              ...watchlist.stocks,
              { symbol: newStockSymbol.toUpperCase(), name: `Company ${newStockSymbol.toUpperCase()}` },
            ],
          }
        }
        return watchlist
      })
      setWatchlists(updatedWatchlists)
      setActiveWatchlist(updatedWatchlists.find((w) => w.id === activeWatchlist.id) || null)
      setNewStockSymbol("")
    }
  }

  const removeStock = (symbol: string) => {
    if (activeWatchlist) {
      const updatedWatchlists = watchlists.map((watchlist) => {
        if (watchlist.id === activeWatchlist.id) {
          return {
            ...watchlist,
            stocks: watchlist.stocks.filter((stock) => stock.symbol !== symbol),
          }
        }
        return watchlist
      })
      setWatchlists(updatedWatchlists)
      setActiveWatchlist(updatedWatchlists.find((w) => w.id === activeWatchlist.id) || null)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/watchlist" className="text-blue-600 hover:underline mb-4 inline-block">
        <ArrowLeft className="inline mr-2" />
        Back to Watchlists
      </Link>
      <h1 className="text-3xl font-bold mb-6">Manage Watchlist</h1>
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
              <h2 className="text-xl font-semibold mb-4">{activeWatchlist.name}</h2>
              <div className="flex space-x-2 mb-4">
                <Input
                  type="text"
                  value={newStockSymbol}
                  onChange={(e) => setNewStockSymbol(e.target.value)}
                  placeholder="Enter stock symbol"
                />
                <Button onClick={addStock}>
                  <Plus className="mr-2" /> Add
                </Button>
              </div>
              <ul className="space-y-2">
                {activeWatchlist.stocks.map((stock) => (
                  <li key={stock.symbol} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                    <span>
                      {stock.symbol} - {stock.name}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => removeStock(stock.symbol)}>
                      <X size={16} />
                    </Button>
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
