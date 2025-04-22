import type { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  variant?: "default" | "outline"
  size?: "default" | "lg"
}

export function Button({
  children,
  className,
  onClick,
  type = "button",
  variant = "default",
  size = "default",
}: ButtonProps) {
  let buttonClass =
    "rounded-lg px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-secondary data-[state=open]:text-muted-foreground "

  if (variant === "outline") {
    buttonClass += "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
  } else {
    buttonClass += "bg-primary text-primary-foreground shadow hover:bg-primary/90"
  }

  if (size === "lg") {
    buttonClass += " text-lg px-8 py-4"
  }

  return (
    <button type={type} className={`${buttonClass} ${className || ""}`} onClick={onClick}>
      {children}
    </button>
  )
}
