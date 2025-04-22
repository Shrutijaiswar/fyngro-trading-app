import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
}

export default function WatchlistItem({ stock }: { stock: Stock }) {
  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
      <div>
        <h3 className="font-semibold text-black">{stock.symbol}</h3>
        <p className="text-sm text-gray-600">{stock.name}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-black">${stock.price.toFixed(2)}</p>
        <p className={`text-sm flex items-center ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
          {stock.change >= 0 ? (
            <ArrowUpRight size={16} className="mr-1" />
          ) : (
            <ArrowDownRight size={16} className="mr-1" />
          )}
          {Math.abs(stock.change)}%
        </p>
      </div>
    </div>
  )
}
