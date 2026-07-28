"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap outline-none select-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:brightness-105 hover:shadow-[0_6px_20px_-4px_oklch(0.491_0.270_277/0.5)]",
        outline:
          "border-border bg-background text-foreground shadow-xs transition-all duration-150 ease-out hover:bg-accent hover:border-primary/40 hover:-translate-y-px hover:shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs transition-all duration-150 ease-out hover:bg-secondary/70 hover:-translate-y-px",
        ghost:
          "transition-colors duration-150 hover:bg-accent hover:text-accent-foreground",
        "ghost-primary":
          "text-primary transition-colors duration-150 hover:bg-primary/8 hover:text-primary",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:brightness-105 hover:shadow-[0_6px_20px_-4px_oklch(0.577_0.245_27/0.5)]",
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

// Magnetic hover effect — button follows cursor on primary/destructive variants only.
// STRENGTH: fraction of cursor-to-center distance applied as translate (0.2 = subtle, 0.5 = strong).
const MAGNETIC_VARIANTS = new Set(["default", "destructive"])
const MAGNETIC_STRENGTH = 0.22

function Button({
  className,
  variant = "default",
  size = "default",
  onMouseMove,
  onMouseLeave,
  style,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  const ref = React.useRef<HTMLButtonElement>(null)
  const [pos, setPos] = React.useState({ x: 0, y: 0 })
  const [hovered, setHovered] = React.useState(false)
  const isMagnetic = MAGNETIC_VARIANTS.has(variant ?? "default")

  const handleMouseMove = React.useCallback<NonNullable<ButtonPrimitive.Props["onMouseMove"]>>(
    (e) => {
      onMouseMove?.(e)
      if (!isMagnetic || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - (rect.left + rect.width / 2)) * MAGNETIC_STRENGTH
      const y = (e.clientY - (rect.top + rect.height / 2)) * MAGNETIC_STRENGTH
      setPos({ x, y })
      setHovered(true)
    },
    [isMagnetic, onMouseMove]
  )

  const handleMouseLeave = React.useCallback<NonNullable<ButtonPrimitive.Props["onMouseLeave"]>>(
    (e) => {
      onMouseLeave?.(e)
      if (!isMagnetic) return
      setPos({ x: 0, y: 0 })
      setHovered(false)
    },
    [isMagnetic, onMouseLeave]
  )

  const sharedTransition = "box-shadow 0.35s ease, filter 0.35s ease"
  const magneticStyle: React.CSSProperties = isMagnetic
    ? {
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: hovered
          ? `transform 0.12s ease-out, ${sharedTransition}`
          : `transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), ${sharedTransition}`,
        ...style,
      }
    : (style as React.CSSProperties)

  return (
    <ButtonPrimitive
      ref={ref}
      data-slot="button"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={magneticStyle}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
