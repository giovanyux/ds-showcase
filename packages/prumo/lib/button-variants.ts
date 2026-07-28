import { cva } from "class-variance-authority"

// Split out of components/ui/button.tsx (which is "use client" for the
// magnetic hover effect) so Server Components can compute button classes
// — e.g. for a plain <a> styled as a button — without needing "use client".
export const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap outline-none select-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:brightness-105 hover:shadow-[0_6px_20px_-4px_oklch(from_var(--primary)_l_c_h/50%)]",
        outline:
          "border-border bg-background text-foreground shadow-xs transition-all duration-150 ease-out hover:bg-accent hover:border-primary/40 hover:-translate-y-px hover:shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs transition-all duration-150 ease-out hover:bg-secondary/70 hover:-translate-y-px",
        ghost:
          "transition-colors duration-150 hover:bg-accent hover:text-accent-foreground",
        "ghost-primary":
          "text-primary transition-colors duration-150 hover:bg-primary/8 hover:text-primary",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:brightness-105 hover:shadow-[0_6px_20px_-4px_oklch(from_var(--destructive)_l_c_h/50%)]",
        link: "text-primary underline-offset-4 transition-colors hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-7 rounded-md px-2 text-[10px] uppercase font-bold tracking-wider",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-base",
        icon: "h-9 w-9",
        "icon-xs": "h-7 w-7",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
