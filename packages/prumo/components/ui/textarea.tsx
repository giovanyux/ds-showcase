import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-20 w-full rounded-lg border border-input bg-background/60 px-3 py-2 text-sm shadow-xs ring-1 ring-border/40 transition-all duration-150 outline-none placeholder:text-muted-foreground/55 focus-visible:border-primary focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:shadow-[0_0_0_4px_oklch(0.491_0.270_277/0.08)] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:bg-slate-900/40 dark:focus-visible:bg-slate-900",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
