import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DollarSign, ArrowLeft, ArrowUpCircle, ArrowDownCircle } from "lucide-react"
import Link from "next/link"

export default function FundsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/profile" className="text-blue-600 hover:underline mb-4 inline-block">
        <ArrowLeft className="inline mr-2" />
        Back to Profile
      </Link>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <DollarSign className="mr-2" /> Deposit & Withdraw Funds
      </h1>
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Account Balance</h2>
        <p className="text-3xl font-bold text-blue-600">$10,000.00</p>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <ArrowUpCircle className="mr-2 text-green-500" /> Deposit Funds
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Amount</label>
              <input type="number" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter amount" />
            </div>
            <div>
              <label className="block mb-2">Payment Method</label>
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Visa ending in 1234</option>
                <option>Mastercard ending in 5678</option>
              </select>
            </div>
            <Button className="w-full">Deposit</Button>
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <ArrowDownCircle className="mr-2 text-red-500" /> Withdraw Funds
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Amount</label>
              <input type="number" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter amount" />
            </div>
            <div>
              <label className="block mb-2">Withdrawal Method</label>
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Bank Account (ending in 9876)</option>
                <option>PayPal</option>
              </select>
            </div>
            <Button className="w-full">Withdraw</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
