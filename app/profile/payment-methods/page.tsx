import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

export default function PaymentMethodsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/profile" className="text-blue-600 hover:underline mb-4 inline-block">
        <ArrowLeft className="inline mr-2" />
        Back to Profile
      </Link>
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <CreditCard className="mr-2" /> Payment Methods
      </h1>
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Saved Payment Methods</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded">
            <div>
              <p className="font-semibold">Visa ending in 1234</p>
              <p className="text-sm text-gray-600">Expires 12/2025</p>
            </div>
            <Button variant="outline">Remove</Button>
          </div>
          <div className="flex justify-between items-center p-4 border rounded">
            <div>
              <p className="font-semibold">Mastercard ending in 5678</p>
              <p className="text-sm text-gray-600">Expires 06/2024</p>
            </div>
            <Button variant="outline">Remove</Button>
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Payment Method</h2>
        <Button className="w-full">
          <Plus className="mr-2" /> Add New Card
        </Button>
      </Card>
    </div>
  )
}
