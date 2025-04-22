import type React from "react"
import type { ReactNode } from "react"

interface InputProps {
  children?: ReactNode
  className?: string
  placeholder?: string
  type?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input({ children, className, placeholder, type = "text", value, onChange }: InputProps) {
  const inputClass =
    "rounded-lg px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-secondary data-[state=open]:text-muted-foreground border border-input bg-background text-text"

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${inputClass} ${className || ""}`}
    />
  )
}
