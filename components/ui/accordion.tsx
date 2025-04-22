import type { ReactNode } from "react"

interface AccordionProps {
  children: ReactNode
  type?: "single" | "multiple"
  collapsible?: boolean
  className?: string
}

interface AccordionItemProps {
  value: string
  children: ReactNode
}

interface AccordionTriggerProps {
  children: ReactNode
  className?: string
}

interface AccordionContentProps {
  children: ReactNode
  className?: string
}

export function Accordion({ children, className }: AccordionProps) {
  return <div className={`Accordion ${className}`}>{children}</div>
}

export function AccordionItem({ children, value }: AccordionItemProps) {
  return <div className="AccordionItem">{children}</div>
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  return <button className={`AccordionTrigger ${className}`}>{children}</button>
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  return <div className={`AccordionContent ${className}`}>{children}</div>
}
