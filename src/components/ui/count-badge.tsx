import { cn } from "@/lib/utils"

interface CountBadgeProps {
  count: number
  label?: string
  singularLabel?: string
  className?: string
}

function CountBadge({
  count,
  label,
  singularLabel,
  className,
}: CountBadgeProps) {
  const displayLabel = label
    ? count === 1 && singularLabel
      ? singularLabel
      : label
    : undefined

  return (
    <span
      className={cn(
        "text-xs font-medium text-stone-500 dark:text-stone-400",
        "bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded",
        className
      )}
    >
      {count}
      {displayLabel && ` ${displayLabel}`}
    </span>
  )
}

export { CountBadge }
