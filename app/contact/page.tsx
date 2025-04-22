import { Card } from "../components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">
            We're here to help and answer any question you might have. We look forward to hearing from you.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <Mail className="mr-2 text-blue-600" />
              <a href="mailto:admin@finquotient.com" className="hover:text-blue-600">
                admin@finquotient.com
              </a>
            </li>
            <li className="flex items-center">
              <Phone className="mr-2 text-blue-600" />
              <a href="tel:+918317438271" className="hover:text-blue-600">
                +91 8317438271
              </a>
            </li>
            <li className="flex items-start">
              <MapPin className="mr-2 text-blue-600 mt-1" />
              <address className="not-italic">
                Fyngro Office
                <br />
                44, Legal Building, 2nd Floor
                <br />
                Bakery Portion, Connaught Place
                <br />
                New Delhi, 110001
                <br />
                India
              </address>
            </li>
          </ul>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full p-2 border border-gray-300 rounded"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </Card>
      </div>
    </div>
  )
}
