import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-[oklch(0.78_0.15_145)] text-[oklch(0.18_0.04_145)] dark:bg-[oklch(0.45_0.18_145)] dark:text-[oklch(0.95_0.01_145)]",
        warning:
          "border-transparent bg-[oklch(0.85_0.16_85)] text-[oklch(0.18_0.04_85)] dark:bg-[oklch(0.65_0.18_85)] dark:text-[oklch(0.12_0.04_85)]",
        info:
          "border-transparent bg-[oklch(0.82_0.10_230)] text-[oklch(0.18_0.04_230)] dark:bg-[oklch(0.55_0.15_230)] dark:text-[oklch(0.95_0.01_230)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
