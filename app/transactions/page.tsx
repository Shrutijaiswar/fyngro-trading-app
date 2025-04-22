import { Card } from "../components/ui/card"

const transactions = [
  { id: 1, date: "2023-06-01", type: "Buy", symbol: "AAPL", quantity: 10, price: 150.25 },
  { id: 2, date: "2023-06-02", type: "Sell", symbol: "GOOGL", quantity: 5, price: 2750.8 },
  { id: 3, date: "2023-06-03", type: "Buy", symbol: "MSFT", quantity: 15, price: 305.15 },
  { id: 4, date: "2023-06-04", type: "Sell", symbol: "AMZN", quantity: 8, price: 3380.5 },
  { id: 5, date: "2023-06-05", type: "Buy", symbol: "TSLA", quantity: 20, price: 750.3 },
]

export default function Transactions() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recent Transactions</h1>
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Symbol</th>
                <th className="text-right p-2">Quantity</th>
                <th className="text-right p-2">Price</th>
                <th className="text-right p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="p-2">{transaction.date}</td>
                  <td className={`p-2 ${transaction.type === "Buy" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type}
                  </td>
                  <td className="p-2">{transaction.symbol}</td>
                  <td className="p-2 text-right">{transaction.quantity}</td>
                  <td className="p-2 text-right">${transaction.price.toFixed(2)}</td>
                  <td className="p-2 text-right">${(transaction.quantity * transaction.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
