"use client"

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-lg border border-input bg-background/70 px-3 py-1 text-sm shadow-xs ring-1 ring-border/40 transition-all duration-150 outline-none placeholder:text-muted-foreground/50 focus-visible:border-primary focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:shadow-[0_0_0_4px_oklch(from_var(--primary)_l_c_h/0.08)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:bg-slate-900/50 dark:ring-border/30 dark:focus-visible:bg-slate-900",
        className
      )}
      {...props}
    />
  )
}

export { Input }
