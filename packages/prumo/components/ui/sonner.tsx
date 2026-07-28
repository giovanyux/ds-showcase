"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      icons={{
        success: <CircleCheckIcon className="size-4 text-emerald-500" />,
        info: <InfoIcon className="size-4 text-violet-500" />,
        warning: <TriangleAlertIcon className="size-4 text-amber-500" />,
        error: <OctagonXIcon className="size-4 text-red-500" />,
        loading: <Loader2Icon className="size-4 animate-spin text-muted-foreground" />,
      }}
      toastOptions={{
        duration: 5000,
        classNames: {
          toast:
            "group/toast flex items-start gap-3 rounded-xl border border-border/60 bg-popover px-4 py-3 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/6 backdrop-blur-sm",
          title: "font-medium leading-tight tracking-tight",
          description: "text-xs text-muted-foreground/80 leading-relaxed mt-0.5",
          actionButton: "!bg-primary !text-primary-foreground !text-xs !font-medium !rounded-md !px-3 !py-1.5 !h-auto",
          cancelButton: "!bg-muted !text-muted-foreground !text-xs !font-medium !rounded-md !px-3 !py-1.5 !h-auto",
          closeButton: "!border-border/50 !bg-background hover:!bg-accent",
        },
      }}
      style={
        {
          "--border-radius": "var(--radius-xl)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
