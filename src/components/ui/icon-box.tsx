import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const iconBoxVariants = cva(
  "flex items-center justify-center shrink-0",
  {
    variants: {
      variant: {
        default: "bg-stone-200 dark:bg-stone-700",
        muted: "bg-stone-100 dark:bg-stone-800",
        accent: "bg-lime-100 dark:bg-lime-900/30",
      },
      size: {
        sm: "w-6 h-6 rounded-full",
        default: "w-8 h-8 rounded-md",
        lg: "w-10 h-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface IconBoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconBoxVariants> {
  children: React.ReactNode
}

function IconBox({
  className,
  variant,
  size,
  children,
  ...props
}: IconBoxProps) {
  return (
    <div
      className={cn(iconBoxVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </div>
  )
}

export { IconBox, iconBoxVariants }
