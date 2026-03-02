import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <h4
      className={cn(
        "text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide",
        className
      )}
    >
      {children}
    </h4>
  )
}

export { SectionLabel }
