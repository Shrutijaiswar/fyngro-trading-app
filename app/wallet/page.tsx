import { Card } from "../components/ui/card"
import { Wallet, TrendingUp } from "lucide-react"
import WalletChart from "../components/WalletChart"
import DematAccountChart from "../components/DematAccountChart"

const investments = [
  { id: 1, type: "Stocks", value: 5000, change: 2.5 },
  { id: 2, type: "Mutual Funds", value: 3000, change: 1.8 },
  { id: 3, type: "ETFs", value: 2000, change: -0.5 },
  { id: 4, type: "Bonds", value: 1500, change: 0.3 },
  { id: 5, type: "Commodities", value: 500, change: 3.2 },
]

export default function WalletPage() {
  const balance = 10000 // This would be fetched from an API in a real application
  const totalInvestmentValue = investments.reduce((total, inv) => total + inv.value, 0)

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Wallet className="mr-2 text-primary" size={32} />
        Wallet & Investments
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <h2 className="text-xl font-semibold mb-2">Cash Balance</h2>
          <p className="text-3xl font-bold text-primary">${balance.toLocaleString()}</p>
          <div className="mt-4">
            <WalletChart />
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-2">Demat Account Overview</h2>
          <p className="text-3xl font-bold text-primary">${totalInvestmentValue.toLocaleString()}</p>
          <div className="mt-4">
            <DematAccountChart investments={investments} />
          </div>
        </Card>
      </div>
      <Card>
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="mr-2 text-primary" size={24} />
          Investment Portfolio
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-2">Type</th>
                <th className="pb-2">Value</th>
                <th className="pb-2">24h Change</th>
                <th className="pb-2">Allocation</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment) => (
                <tr key={investment.id} className="border-b border-gray-700">
                  <td className="py-3">{investment.type}</td>
                  <td className="py-3">${investment.value.toLocaleString()}</td>
                  <td className={`py-3 ${investment.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {investment.change >= 0 ? "+" : ""}
                    {investment.change}%
                  </td>
                  <td className="py-3">{((investment.value / totalInvestmentValue) * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
