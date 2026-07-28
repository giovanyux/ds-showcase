import * as React from "react"

import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "rounded-lg bg-size-[200%_100%] bg-[linear-gradient(90deg,var(--muted)_25%,color-mix(in_oklch,var(--muted),var(--foreground)_8%)_50%,var(--muted)_75%)] animate-[shimmer_1.8s_infinite_linear]",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
