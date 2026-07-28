"use client"

import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/lib/button-variants"

export { buttonVariants }

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

export { Button }
