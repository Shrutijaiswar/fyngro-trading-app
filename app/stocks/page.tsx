"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Card } from "../components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Loader2,
  Star,
  Bell,
  Minus,
  Plus,
  X,
  Mail,
  DollarSign,
  Briefcase,
  TrendingUp,
  ShoppingCart,
  Settings,
} from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const API_KEY = "A5LNBJABMVNE5R4A"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
}

interface WatchlistItem {
  symbol: string
  buyPrice: number
  sellPrice: number
  buyAlert: number
  sellAlert: number
}

interface PopupState {
  isOpen: boolean
  stock: Stock | null
  action: "buy" | "sell"
  quantity: number
}

interface CartItem {
  symbol: string
  action: "buy" | "sell"
  quantity: number
  price: number
}

const stockSymbols = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "META",
  "TSLA",
  "NVDA",
  "JPM",
  "V",
  "JNJ",
  "WMT",
  "PG",
  "MA",
  "UNH",
  "HD",
  "BAC",
  "DIS",
  "ADBE",
  "NFLX",
  "CSCO",
]

export default function StockList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [stocks, setStocks] = useState<Stock[]>([])
  const [portfolio, setPortfolio] = useState<Record<string, number>>({})
  const [walletBalance, setWalletBalance] = useState(10000.0)
  const [dematBalance, setDematBalance] = useState(11000.0)
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(21000.0)
  const [loading, setLoading] = useState(true)
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [email, setEmail] = useState("pawansaroj4536@gmail.com")
  const [popup, setPopup] = useState<PopupState>({ isOpen: false, stock: null, action: "buy", quantity: 1 })
  const [cart, setCart] = useState<CartItem[]>([])
  const [manageWatchlistModal, setManageWatchlistModal] = useState<{ isOpen: boolean; item: WatchlistItem | null }>({
    isOpen: false,
    item: null,
  })

  const [isManageWatchlistOpen, setIsManageWatchlistOpen] = useState(false)

  useEffect(() => {
    fetchStockData()
    const storedCart = localStorage.getItem("stockCart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("stockCart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    setTotalPortfolioValue(walletBalance + dematBalance)
  }, [walletBalance, dematBalance])

  const checkAlerts = useCallback(() => {
    watchlist.forEach((item) => {
      const stock = stocks.find((s) => s.symbol === item.symbol)
      if (stock) {
        if (item.buyAlert > 0 && stock.price <= item.buyAlert) {
          sendAlert(stock.symbol, "buy", stock.price)
        }
        if (item.sellAlert > 0 && stock.price >= item.sellAlert) {
          sendAlert(stock.symbol, "sell", stock.price)
        }
      }
    })
  }, [stocks, watchlist])

  useEffect(() => {
    checkAlerts()
  }, [checkAlerts])

  const fetchStockData = async () => {
    setLoading(true)
    const stockData: Stock[] = []

    for (const symbol of stockSymbols) {
      try {
        const quoteResponse = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`,
        )
        const quoteData = await quoteResponse.json()

        if (quoteData["Global Quote"] && Object.keys(quoteData["Global Quote"]).length > 0) {
          const quote = quoteData["Global Quote"]
          const overviewResponse = await fetch(
            `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`,
          )
          const overviewData = await overviewResponse.json()

          stockData.push({
            symbol: quote["01. symbol"],
            name: overviewData.Name || symbol,
            price: Number(quote["05. price"]),
            change: Number(quote["10. change percent"].replace("%", "")),
          })
        } else {
          throw new Error("Invalid data structure received from API")
        }

        await new Promise((resolve) => setTimeout(resolve, 12000))
      } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error)
        stockData.push({
          symbol,
          name: `Company ${symbol}`,
          price: Number((Math.random() * 1000).toFixed(2)),
          change: Number((Math.random() * 10 - 5).toFixed(2)),
        })
      }
    }

    setStocks(stockData)
    setLoading(false)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  const filteredStocks = stocks.filter(
    (stock) => stock.symbol.toLowerCase().includes(searchTerm) || stock.name.toLowerCase().includes(searchTerm),
  )

  const openPopup = (stock: Stock, action: "buy" | "sell") => {
    setPopup({ isOpen: true, stock, action, quantity: 1 })
  }

  const closePopup = () => {
    setPopup({ isOpen: false, stock: null, action: "buy", quantity: 1 })
  }

  const handleQuantityChange = (change: number) => {
    setPopup((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + change),
    }))
  }

  const addToCart = () => {
    if (!popup.stock) return

    const newCartItem: CartItem = {
      symbol: popup.stock.symbol,
      action: popup.action,
      quantity: popup.quantity,
      price: popup.stock.price,
    }

    setCart((prevCart) => [...prevCart, newCartItem])
    localStorage.setItem("stockCart", JSON.stringify([...cart, newCartItem]))
    toast.success(`Added ${popup.quantity} ${popup.stock.symbol} to cart for ${popup.action}`)
    closePopup()
  }

  const addToWatchlist = (stock: Stock) => {
    const existingItem = watchlist.find((item) => item.symbol === stock.symbol)
    if (existingItem) {
      toast.info(`${stock.symbol} is already in your watchlist`)
    } else {
      setWatchlist((prev) => [...prev, { symbol: stock.symbol, buyPrice: 0, sellPrice: 0, buyAlert: 0, sellAlert: 0 }])
      toast.success(`Added ${stock.symbol} to watchlist`)
    }
  }

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol))
    toast.success(`Removed ${symbol} from watchlist`)
  }

  const updateWatchlistItem = (symbol: string, updates: Partial<WatchlistItem>) => {
    setWatchlist((prev) => prev.map((item) => (item.symbol === symbol ? { ...item, ...updates } : item)))
    toast.success(`Updated alert prices for ${symbol}`)
  }

  const sendAlert = (symbol: string, action: "buy" | "sell", price: number) => {
    console.log(`Alert: ${action.toUpperCase()} ${symbol} at $${price}`)
    toast.info(`Alert: ${action.toUpperCase()} ${symbol} at $${price}`)
  }

  const confirmEmail = () => {
    if (email) {
      toast.success(`Confirmation email sent to ${email}`)
    } else {
      toast.error("Please enter an email address")
    }
  }

  const openManageWatchlistModal = (item: WatchlistItem) => {
    setManageWatchlistModal({ isOpen: true, item })
  }

  const openManageWatchlist = () => {
    setIsManageWatchlistOpen(true)
  }

  const closeManageWatchlist = () => {
    setIsManageWatchlistOpen(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Live Stock Data</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-6 relative">
            <Input
              type="text"
              placeholder="Search stocks by symbol or name..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin" size={48} />
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStocks.map((stock) => (
                <Card
                  key={stock.symbol}
                  className="p-4 hover:bg-gray-50 transition-colors duration-150 border-l-4 border-blue-500"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <Link href={`/stocks/${stock.symbol}`}>
                        <h2 className="text-xl font-semibold">{stock.symbol}</h2>
                      </Link>
                      <p className="text-gray-600 text-sm">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">${stock.price.toFixed(2)}</p>
                      <p
                        className={`text-sm flex items-center ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {stock.change >= 0 ? (
                          <ArrowUpRight size={16} className="mr-1" />
                        ) : (
                          <ArrowDownRight size={16} className="mr-1" />
                        )}
                        {Math.abs(stock.change).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button
                      onClick={() => openPopup(stock, "buy")}
                      className="bg-green-500 hover:bg-green-600 text-white flex-1 mr-2"
                    >
                      Buy
                    </Button>
                    <Button
                      onClick={() => openPopup(stock, "sell")}
                      className="bg-red-500 hover:bg-red-600 text-white flex-1 ml-2"
                    >
                      Sell
                    </Button>
                  </div>
                  <div className="flex justify-between mt-2">
                    <Button
                      onClick={() => addToWatchlist(stock)}
                      className="bg-orange-500 hover:bg-orange-600 text-white flex-1 mr-2"
                    >
                      <Star size={16} className="mr-1" /> Watch
                    </Button>
                    <Button onClick={() => {}} className="bg-yellow-500 hover:bg-yellow-600 text-white flex-1 ml-2">
                      <Bell size={16} className="mr-1" /> Alert
                    </Button>
                  </div>
                  {portfolio[stock.symbol] > 0 && (
                    <p className="mt-2 text-sm text-blue-600">
                      You own: <span className="font-bold text-black">{portfolio[stock.symbol]}</span> shares
                    </p>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
        <div>
          <Card className="p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <DollarSign className="mr-2 text-green-500" size={24} />
              Wallet Information
            </h2>
            <p className="text-2xl font-bold text-green-600">Balance: ${walletBalance.toFixed(2)}</p>
          </Card>
          <Card className="p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <Briefcase className="mr-2 text-blue-500" size={24} />
              Demat Account Summary
            </h2>
            <p className="text-2xl font-bold text-blue-600">Balance: ${dematBalance.toFixed(2)}</p>
          </Card>
          <Card className="p-4 mb-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <TrendingUp className="mr-2 text-purple-500" size={24} />
              Total Portfolio Value
            </h2>
            <p className="text-2xl font-bold text-purple-600">${totalPortfolioValue.toFixed(2)}</p>
          </Card>
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Watchlist</h2>
              <Button onClick={openManageWatchlist} className="bg-blue-500 hover:bg-blue-600 text-white">
                <Settings size={16} className="mr-2" /> Manage Watchlist
              </Button>
            </div>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Enter your email for alerts"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-2"
              />
              <Button onClick={confirmEmail} className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2">
                <Mail size={14} className="mr-2" /> Confirm Email
              </Button>
            </div>
            {watchlist.map((item) => (
              <div key={item.symbol} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg">{item.symbol}</span>
                  <Button
                    onClick={() => removeFromWatchlist(item.symbol)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1"
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Buy Alert Price</label>
                    <Input
                      type="number"
                      value={item.buyAlert || ""}
                      onChange={(e) => updateWatchlistItem(item.symbol, { buyAlert: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sell Alert Price</label>
                    <Input
                      type="number"
                      value={item.sellAlert || ""}
                      onChange={(e) => updateWatchlistItem(item.symbol, { sellAlert: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => openManageWatchlistModal(item)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2"
                >
                  Manage Alerts
                </Button>
              </div>
            ))}
          </Card>

          <Card className="p-4 mt-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ShoppingCart className="mr-2 text-blue-500" size={24} />
              Cart
            </h2>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <span>
                      {item.action === "buy" ? "Buy" : "Sell"} {item.quantity} {item.symbol} @ ${item.price.toFixed(2)}
                    </span>
                    <Button
                      onClick={() => {
                        const newCart = cart.filter((_, i) => i !== index)
                        setCart(newCart)
                        localStorage.setItem("stockCart", JSON.stringify(newCart))
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Link href="/checkout">
                  <Button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white">
                    Proceed to Checkout
                  </Button>
                </Link>
              </>
            )}
          </Card>
        </div>
      </div>
      {popup.isOpen && popup.stock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {popup.action === "buy" ? "Buy" : "Sell"} {popup.stock.symbol}
              </h2>
              <button onClick={closePopup} className="text-white hover:text-gray-200 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-lg mb-2">
                  Current Price:{" "}
                  <span className="font-bold text-blue-500 dark:text-blue-400">${popup.stock.price.toFixed(2)}</span>
                </p>
                <p className="text-lg text-blue-600 dark:text-blue-300">
                  Shares Owned: <span className="font-bold">{portfolio[popup.stock.symbol] || 0}</span>
                </p>
              </div>
              <div className="flex items-center justify-center mb-6">
                <Button
                  onClick={() => handleQuantityChange(-1)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-l hover:bg-gray-300 transition-colors"
                >
                  <Minus size={20} />
                </Button>
                <span className="px-6 py-2 bg-blue-500 text-white font-bold text-xl">{popup.quantity}</span>
                <Button
                  onClick={() => handleQuantityChange(1)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r hover:bg-gray-300 transition-colors"
                >
                  <Plus size={20} />
                </Button>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mb-6">
                <p className="text-xl text-center">
                  Total:{" "}
                  <span className="font-bold text-blue-600 dark:text-blue-300">
                    ${(popup.stock.price * popup.quantity).toFixed(2)}
                  </span>
                </p>
              </div>
              <Button
                onClick={addToCart}
                className={`w-full py-3 text-lg font-semibold rounded-lg transition-colors ${
                  popup.action === "buy"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      )}
      {manageWatchlistModal.isOpen && manageWatchlistModal.item && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Alerts for {manageWatchlistModal.item.symbol}</h2>
              <button
                onClick={() => setManageWatchlistModal({ isOpen: false, item: null })}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Buy Alert Price
                </label>
                <Input
                  type="number"
                  value={manageWatchlistModal.item.buyAlert || ""}
                  onChange={(e) =>
                    setManageWatchlistModal((prev) => ({
                      ...prev,
                      item: { ...prev.item!, buyAlert: Number(e.target.value) },
                    }))
                  }
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sell Alert Price
                </label>
                <Input
                  type="number"
                  value={manageWatchlistModal.item.sellAlert || ""}
                  onChange={(e) =>
                    setManageWatchlistModal((prev) => ({
                      ...prev,
                      item: { ...prev.item!, sellAlert: Number(e.target.value) },
                    }))
                  }
                  className="w-full"
                />
              </div>
              <Button
                onClick={() => {
                  updateWatchlistItem(manageWatchlistModal.item!.symbol, {
                    buyAlert: manageWatchlistModal.item!.buyAlert,
                    sellAlert: manageWatchlistModal.item!.sellAlert,
                  })
                  setManageWatchlistModal({ isOpen: false, item: null })
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
      {isManageWatchlistOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden">
            <div className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Watchlist</h2>
              <button onClick={closeManageWatchlist} className="text-white hover:text-gray-200 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              {watchlist.map((item) => (
                <div key={item.symbol} className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">{item.symbol}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Buy Alert Price</label>
                      <Input
                        type="number"
                        value={item.buyAlert || ""}
                        onChange={(e) => updateWatchlistItem(item.symbol, { buyAlert: Number(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sell Alert Price</label>
                      <Input
                        type="number"
                        value={item.sellAlert || ""}
                        onChange={(e) => updateWatchlistItem(item.symbol, { sellAlert: Number(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={closeManageWatchlist} className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}
