import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { IconBox } from "@/components/ui/icon-box"
import { cn } from "@/lib/utils"

interface ListItemProps {
  /** Primary text/title */
  title: string
  /** Optional subtitle/description */
  subtitle?: string
  /** Icon to display (Lucide icon component) */
  icon?: React.ElementType
  /** Navigation path (renders as Link) or click handler (renders as button) */
  to?: string
  onClick?: () => void
  /** Custom content to render on the left instead of icon */
  leftContent?: React.ReactNode
  /** Whether to show the chevron indicator */
  showChevron?: boolean
  /** Additional class names */
  className?: string
}

function ListItem({
  title,
  subtitle,
  icon: Icon,
  to,
  onClick,
  leftContent,
  showChevron = true,
  className,
}: ListItemProps) {
  const content = (
    <>
      <div className="flex items-start gap-4 min-w-0">
        {leftContent || (Icon && (
          <IconBox>
            <Icon className="w-4 h-4 text-stone-600 dark:text-stone-300" strokeWidth={1.5} />
          </IconBox>
        ))}
        <div className="min-w-0">
          <span className="font-medium text-stone-900 dark:text-stone-100 truncate block">
            {title}
          </span>
          {subtitle && (
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {showChevron && (
        <ChevronRight
          className="w-4 h-4 text-stone-400 dark:text-stone-500 shrink-0"
          strokeWidth={1.5}
        />
      )}
    </>
  )

  const baseStyles = cn(
    "w-full px-6 py-4 flex items-center justify-between gap-4 text-left",
    "hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors",
    className
  )

  if (to) {
    return (
      <Link to={to} className={baseStyles}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={baseStyles}>
      {content}
    </button>
  )
}

interface DividedListProps {
  children: React.ReactNode
  className?: string
}

function DividedList({ children, className }: DividedListProps) {
  return (
    <ul className={cn("divide-y divide-stone-200 dark:divide-stone-700", className)}>
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  )
}

export { ListItem, DividedList }
