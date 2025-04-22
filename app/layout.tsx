import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "./components/Navbar"
import { ThemeProvider } from "./components/ThemeProvider"
import { Footer } from "./components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Fyngro - Trading App",
  description: "A fully responsive trading application",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="container mx-auto px-4 py-8 flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
