import * as React from "react"
import { cn } from "@/lib/utils"

interface BulletListProps {
  items: React.ReactNode[]
  className?: string
  /** Size variant for spacing */
  spacing?: "tight" | "default" | "loose"
}

function BulletList({
  items,
  className,
  spacing = "default",
}: BulletListProps) {
  const spacingClass = {
    tight: "space-y-1.5",
    default: "space-y-2",
    loose: "space-y-3",
  }[spacing]

  return (
    <ul className={cn(spacingClass, className)}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-900 dark:bg-stone-100 mt-2 shrink-0" />
          <span className="text-stone-700 dark:text-stone-300 text-sm">
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

interface MutedBulletListProps {
  items: React.ReactNode[]
  className?: string
}

function MutedBulletList({ items, className }: MutedBulletListProps) {
  return (
    <ul className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3 text-stone-700 dark:text-stone-300">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-stone-500 mt-2 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export { BulletList, MutedBulletList }
