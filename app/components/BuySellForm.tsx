"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "./ui/card"

export default function BuySellForm({ symbol, currentPrice }: { symbol: string; currentPrice: number }) {
  const [action, setAction] = useState<"buy" | "sell">("buy")
  const [quantity, setQuantity] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle the buy/sell action here
    console.log(`${action.toUpperCase()} ${quantity} shares of ${symbol} at $${currentPrice}`)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Action</label>
          <div className="flex">
            <button
              type="button"
              className={`flex-1 py-2 ${action === "buy" ? "bg-primary text-white" : "bg-secondary text-text"}`}
              onClick={() => setAction("buy")}
            >
              Buy
            </button>
            <button
              type="button"
              className={`flex-1 py-2 ${action === "sell" ? "bg-primary text-white" : "bg-secondary text-text"}`}
              onClick={() => setAction("sell")}
            >
              Sell
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="quantity" className="block mb-2">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
            className="w-full p-2 bg-background text-text border border-secondary rounded"
          />
        </div>
        <div>
          <p>Total: ${(quantity * currentPrice).toFixed(2)}</p>
        </div>
        <button type="submit" className="w-full py-2 bg-primary text-white rounded">
          {action === "buy" ? "Buy" : "Sell"} {symbol}
        </button>
      </form>
    </Card>
  )
}
