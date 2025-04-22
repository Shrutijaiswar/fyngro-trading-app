"use client"

import Link from "next/link"
import { TrendingUp, ShoppingCart } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface CartItem {
  symbol: string
  action: "buy" | "sell"
  quantity: number
  price: number
}

const Navbar = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const storedCart = localStorage.getItem("stockCart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("stockCart", JSON.stringify(cart))
  }, [cart])

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const removeFromCart = (index: number) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
          <TrendingUp className="mr-2" size={24} />
          Fyngro
        </Link>
        <div className="space-x-4 flex items-center">
          <Link href="/profile" className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
            Profile
          </Link>
          <Link href="/stocks" className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
            Stocks
          </Link>
          <Link
            href="/market-overview"
            className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            Market Overview
          </Link>
          <Link
            href="/transactions"
            className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            Transactions
          </Link>
          <Link href="/wallet" className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
            Wallet
          </Link>
          <Link
            href="/demat-account"
            className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            Demat Account
          </Link>
          <Link href="/watchlist" className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
            Watchlist
          </Link>
          <Button onClick={toggleCart} className="relative">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </Button>
        </div>
      </div>
      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-10 p-4">
          <h3 className="text-lg font-semibold mb-2">Cart</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>
                    {item.action === "buy" ? "Buy" : "Sell"} {item.quantity} {item.symbol} @ ${item.price}
                  </span>
                  <Button onClick={() => removeFromCart(index)} size="sm" variant="destructive">
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <Button className="w-full mt-4" onClick={() => alert("Checkout not implemented")}>
            Checkout
          </Button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
