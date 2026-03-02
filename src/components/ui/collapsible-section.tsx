import * as React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

interface CollapsibleSectionProps {
  title: string
  count?: number
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

function CollapsibleSection({
  title,
  count,
  children,
  defaultOpen = false,
  className,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-left group">
        <span className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
          {title}
          {count !== undefined && (
            <span className="ml-2 text-stone-400 dark:text-stone-500 normal-case tracking-normal">
              ({count})
            </span>
          )}
        </span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-stone-400 dark:text-stone-500 transition-transform",
            isOpen && "rotate-180"
          )}
          strokeWidth={1.5}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pt-2">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export { CollapsibleSection }
