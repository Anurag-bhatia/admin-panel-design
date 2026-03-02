import * as React from "react"
import { ArrowRight, ChevronRight } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const actionButtonVariants = cva(
  "w-full flex items-center justify-between gap-4 px-6 py-4 rounded-lg transition-colors group",
  {
    variants: {
      variant: {
        primary:
          "bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200",
        secondary:
          "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionButtonVariants> {
  /** Icon to display on the left */
  icon?: React.ElementType
  /** Button label */
  children: React.ReactNode
  /** Type of trailing indicator */
  trailingIcon?: "arrow" | "chevron"
}

function ActionButton({
  icon: Icon,
  children,
  variant,
  trailingIcon = "arrow",
  className,
  ...props
}: ActionButtonProps) {
  const TrailingIcon = trailingIcon === "arrow" ? ArrowRight : ChevronRight

  return (
    <button
      className={cn(actionButtonVariants({ variant, className }))}
      {...props}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5" strokeWidth={1.5} />}
        <span className="font-medium">{children}</span>
      </div>
      <TrailingIcon
        className="w-5 h-5 transition-transform group-hover:translate-x-1"
        strokeWidth={1.5}
      />
    </button>
  )
}

export { ActionButton, actionButtonVariants }
