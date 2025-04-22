"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface CartItem {
  symbol: string
  action: "buy" | "sell"
  quantity: number
  price: number
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem("stockCart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  const removeFromCart = (index: number) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
    localStorage.setItem("stockCart", JSON.stringify(newCart))
  }

  const getTotalValue = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0)
  }

  const handleCheckout = () => {
    // Here you would typically process the order
    // For now, we'll just clear the cart and show a success message
    localStorage.removeItem("stockCart")
    setCart([])
    toast.success("Order placed successfully!")
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <ShoppingCart className="mr-2" /> Checkout
      </h1>
      <Link href="/stocks" className="text-blue-600 hover:underline mb-4 inline-block">
        <ArrowLeft className="inline mr-2" />
        Back to Stocks
      </Link>
      {cart.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link href="/stocks">
            <Button>Go to Stocks</Button>
          </Link>
        </Card>
      ) : (
        <>
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-4 pb-4 border-b">
                <div>
                  <p className="font-semibold">
                    {item.action === "buy" ? "Buy" : "Sell"} {item.symbol}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity} @ ${item.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">${(item.quantity * item.price).toFixed(2)}</p>
                  <Button onClick={() => removeFromCart(index)} variant="destructive" size="sm" className="mt-2">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6 pt-6 border-t">
              <p className="text-xl font-semibold">Total</p>
              <p className="text-xl font-semibold">${getTotalValue().toFixed(2)}</p>
            </div>
          </Card>
          <Button onClick={handleCheckout} className="w-full py-3 text-lg">
            Place Order
          </Button>
        </>
      )}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  )
}
