import type { ReactNode } from "react"

export function Card({ children }: { children: ReactNode }) {
  return <div className="bg-secondary p-6 rounded-lg shadow-lg">{children}</div>
}
