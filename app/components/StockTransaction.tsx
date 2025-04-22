"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
}

interface StockTransactionProps {
  stock: Stock
  onBuy: (symbol: string, quantity: number) => void
  onSell: (symbol: string, quantity: number) => void
}

export function StockTransaction({ stock, onBuy, onSell }: StockTransactionProps) {
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    setQuantity(isNaN(value) ? 1 : Math.max(1, value))
  }

  return (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-4">
      <div>
        <p className="font-semibold text-gray-800 dark:text-gray-200">{stock.symbol}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{stock.name}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-800 dark:text-gray-200">${stock.price.toFixed(2)}</p>
        <p className={`text-sm flex items-center ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
          {stock.change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {Math.abs(stock.change)}%
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Input type="number" min="1" value={quantity} onChange={handleQuantityChange} className="w-20 text-center" />
        <Button onClick={() => onBuy(stock.symbol, quantity)} className="bg-green-500 hover:bg-green-600 text-white">
          Buy
        </Button>
        <Button onClick={() => onSell(stock.symbol, quantity)} className="bg-red-500 hover:bg-red-600 text-white">
          Sell
        </Button>
      </div>
    </div>
  )
}
