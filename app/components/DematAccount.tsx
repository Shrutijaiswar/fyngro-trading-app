import { Card } from "./ui/card"
import { TrendingUp } from "lucide-react"

interface DematAccountProps {
  dematBalance: number
  totalPortfolioValue: number
}

export function DematAccount({ dematBalance, totalPortfolioValue }: DematAccountProps) {
  return (
    <Card className="p-4 mb-6">
      <h2 className="text-xl font-semibold mb-2 flex items-center">
        <TrendingUp className="mr-2 text-blue-500" size={24} />
        Demat Account Summary
      </h2>
      <div className="space-y-2">
        <p className="text-lg">
          Account Balance: <span className="font-bold text-blue-600">${dematBalance.toFixed(2)}</span>
        </p>
        <p className="text-xl font-bold text-purple-600">Total Portfolio Value: ${totalPortfolioValue.toFixed(2)}</p>
      </div>
    </Card>
  )
}
