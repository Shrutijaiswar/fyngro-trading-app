import { Loader2 } from "lucide-react"

export default function StocksLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Live Stock Data</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-6 relative">
            <div className="w-full h-10 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin" size={48} />
            <span className="ml-2 text-lg">Loading stock data...</span>
          </div>
        </div>
        <div>
          {/* Skeleton loaders for the sidebar cards */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-6 bg-gray-200 animate-pulse rounded h-40"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
