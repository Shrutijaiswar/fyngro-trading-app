import { Card } from "../components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { TradingQuiz } from "../components/TradingQuiz"

const faqs = [
  {
    question: "What is Fyngro?",
    answer:
      "Fyngro is a cutting-edge trading platform designed to empower investors with powerful tools and insights for stock trading, market analysis, and portfolio management.",
  },
  {
    question: "How do I create an account on Fyngro?",
    answer:
      "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. Fill in your personal details, verify your email address, and complete the KYC (Know Your Customer) process to start trading.",
  },
  {
    question: "What is a Demat account and why do I need one?",
    answer:
      "A Demat (Dematerialized) account is an electronic account to hold your securities in digital form. It's necessary for trading stocks in India as it eliminates the risks associated with physical share certificates. Fyngro helps you open and manage your Demat account seamlessly.",
  },
  {
    question: "How can I add funds to my Fyngro account?",
    answer:
      "You can add funds to your Fyngro account through various methods including net banking, UPI, NEFT/RTGS transfers, or by linking your bank account directly. Go to the 'Wallet' section in your dashboard to initiate a fund transfer.",
  },
  {
    question: "What types of securities can I trade on Fyngro?",
    answer:
      "Fyngro allows you to trade in various securities including stocks, ETFs (Exchange Traded Funds), mutual funds, and bonds. You can view all available options in the 'Stocks' and 'Market Overview' sections.",
  },
  {
    question: "How do I place a trade on Fyngro?",
    answer:
      "To place a trade, navigate to the 'Stocks' page, search for the desired stock, and click on it. You'll be taken to the stock's detail page where you can use the Buy/Sell form to place your trade. Enter the quantity and review the total before confirming your order.",
  },
  {
    question: "What is a watchlist and how do I create one?",
    answer:
      "A watchlist is a personalized list of stocks you want to monitor closely. To create a watchlist, go to the 'Watchlist' page and click on 'Create New Watchlist'. Give it a name and start adding stocks you're interested in tracking.",
  },
  {
    question: "How can I view my portfolio performance?",
    answer:
      "Your portfolio performance can be viewed in the 'Wallet' section. Here, you'll find charts and breakdowns of your investments, including your cash balance and the value of your securities.",
  },
  {
    question: "What tools does Fyngro offer for market analysis?",
    answer:
      "Fyngro provides various tools for market analysis including real-time stock charts, market overviews showing top gainers and losers, and detailed company information. You can access these in the 'Stocks' and 'Market Overview' sections.",
  },
  {
    question: "How secure is my data on Fyngro?",
    answer:
      "Fyngro takes data security very seriously. We use industry-standard encryption for all data transmissions, implement strict access controls, and regularly audit our systems. Your financial and personal information is protected with the highest level of security measures.",
  },
]

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <Card className="p-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
      <TradingQuiz />
    </div>
  )
}
