"use client"

import { useState } from "react"
import { Plus, Star, Bell, Settings } from "lucide-react"
import { Card } from "../components/ui/card"
import WatchlistItem from "../components/WatchlistItem"
import CreateWatchlistModal from "../components/CreateWatchlistModal"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import PriceAlerts from "../components/PriceAlerts"

const initialWatchlists = [
  {
    id: 1,
    name: "Tech Stocks",
    stocks: [
      { symbol: "AAPL", name: "Apple Inc.", price: 150.25, change: 2.5 },
      { symbol: "GOOGL", name: "Alphabet Inc.", price: 2750.8, change: -1.2 },
      { symbol: "MSFT", name: "Microsoft Corporation", price: 305.15, change: 0.8 },
    ],
  },
  {
    id: 2,
    name: "Energy Sector",
    stocks: [
      { symbol: "XOM", name: "Exxon Mobil Corporation", price: 110.7, change: 1.5 },
      { symbol: "CVX", name: "Chevron Corporation", price: 160.3, change: -0.7 },
    ],
  },
]

export default function WatchlistPage() {
  const [watchlists, setWatchlists] = useState(initialWatchlists)
  const [activeWatchlist, setActiveWatchlist] = useState(watchlists[0])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateWatchlist = (name: string) => {
    const newWatchlist = {
      id: watchlists.length + 1,
      name,
      stocks: [],
    }
    setWatchlists([...watchlists, newWatchlist])
    setActiveWatchlist(newWatchlist)
    setIsModalOpen(false)
  }

  return (
    <div className="max-w-6xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Star className="mr-2 text-blue-600" size={32} />
        Watchlists
      </h1>
      <PriceAlerts />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1 bg-white border-gray-200 p-4">
          <h2 className="text-xl font-semibold mb-4">My Watchlists</h2>
          <ul className="space-y-2">
            {watchlists.map((watchlist) => (
              <li
                key={watchlist.id}
                className={`cursor-pointer p-2 rounded ${
                  activeWatchlist.id === watchlist.id ? "bg-blue-600 text-white" : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveWatchlist(watchlist)}
              >
                {watchlist.name}
              </li>
            ))}
          </ul>
          <button
            className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={20} className="mr-1" />
            Create New Watchlist
          </button>
        </Card>
        <Card className="md:col-span-3 bg-white border-gray-200 p-4">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">{activeWatchlist.name}</h2>
            <div className="flex justify-center space-x-4">
              <Link href="/watchlist/price-alerts" className="w-1/2">
                <Button
                  variant="outline"
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  <Bell className="mr-2" size={18} />
                  Price Alerts
                </Button>
              </Link>
              <Link href="/watchlist/manage" className="w-1/2">
                <Button
                  variant="outline"
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white border-0 transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  <Settings className="mr-2" size={18} />
                  Manage Watchlist
                </Button>
              </Link>
            </div>
          </div>
          <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
            {activeWatchlist.stocks.map((stock) => (
              <WatchlistItem key={stock.symbol} stock={stock} />
            ))}
          </div>
        </Card>
      </div>
      <CreateWatchlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateWatchlist}
      />
    </div>
  )
}
