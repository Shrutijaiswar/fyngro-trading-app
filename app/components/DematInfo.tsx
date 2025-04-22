import { Card } from "./ui/card"
import { Info } from "lucide-react"

export default function DematInfo() {
  return (
    <Card className="mt-6 p-6 bg-white border-gray-200">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Info className="mr-2 text-blue-600" />
        How Does A Demat Account Work?
      </h2>
      <p className="mb-4">
        Demat Accounts are used to hold the purchased shares by an individual in electronic form. Here's how it works:
      </p>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li>When you buy shares, they are credited to your Demat account.</li>
        <li>When you sell shares, they are debited from your Demat account.</li>
        <li>The Demat account is maintained by a Depository Participant (DP).</li>
        <li>DPs are usually banks or brokers registered with a depository like NSDL or CDSL.</li>
      </ul>
      <p className="font-semibold">
        A significant thing to note here is that the buyer and seller may hold a demat account with DPs associated with
        different depositories.
      </p>
    </Card>
  )
}
