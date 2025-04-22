import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, BarChart2, Briefcase, LineChart, PieChart, TrendingUp } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-blue-900 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-600 dark:text-blue-400">Invest in everything</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300">
            Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
          </p>
          <Button size="lg" className="text-lg px-8 py-4">
            Sign up for free <ArrowRight className="ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Stocks", icon: TrendingUp },
            { title: "Derivatives", icon: LineChart },
            { title: "Mutual Funds", icon: PieChart },
            { title: "ETFs", icon: BarChart2 },
            { title: "Bonds", icon: Briefcase },
            { title: "More Options", icon: ArrowRight },
          ].map((item, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <item.icon className="w-8 h-8 text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Invest in {item.title.toLowerCase()} with our easy-to-use platform.
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
