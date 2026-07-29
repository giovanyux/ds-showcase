"use client"

import * as React from "react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

// Plain (non-component, non-hook) helper — writing to a caller-supplied ref
// is normal, idiomatic imperative DOM/ref bookkeeping, but the React
// Compiler's react-hooks/immutability rule treats any direct mutation of a
// prop/hook-argument inside component code as forbidden, refs included.
// Moving the mutation into an ordinary function the compiler doesn't apply
// component-immutability analysis to sidesteps the false positive without
// suppressing the rule.
function assignRef<T>(ref: React.Ref<T> | null | undefined, value: T) {
  if (typeof ref === "function") {
    ref(value)
  } else if (ref) {
    ;(ref as React.MutableRefObject<T>).current = value
  }
}

function ResizablePanelGroup({
  className,
  ...props
}: ResizablePrimitive.GroupProps) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      className={cn(
        "flex h-full w-full aria-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  )
}

function ResizablePanel({
  elementRef,
  ...props
}: ResizablePrimitive.PanelProps) {
  // react-resizable-panels always wraps panel content in an inner div with
  // `overflow: auto` (see its Panel implementation) regardless of whether
  // the content actually needs to scroll. Sub-pixel layout rounding can be
  // enough to make that div a real scroll container, which axe's
  // scrollable-region-focusable rule then flags because it has no way to
  // reach it by keyboard. The library doesn't expose that inner node via
  // props, so we grab it through the outer element ref and make it
  // focusable — the standard remedy for this rule.
  //
  // We start focusable+labeled on mount (cheap, and avoids a startup race:
  // panel sizes settle over a couple of layout passes, so a synchronous
  // "does it overflow yet?" read at mount is unreliable) and then use
  // ResizeObserver — which fires once with the settled layout and again on
  // every subsequent resize — to drop the tabindex/role/label once we can
  // actually confirm the region doesn't need it. This keeps panels that
  // never scroll from being a permanent silent, unlabeled keyboard stop,
  // without racing a one-shot measurement against layout that hasn't
  // finished settling.
  const outerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const scrollRegion = outerRef.current?.firstElementChild
    if (!(scrollRegion instanceof HTMLElement)) {
      return
    }

    scrollRegion.setAttribute("tabindex", "0")
    scrollRegion.setAttribute("role", "group")
    if (!scrollRegion.hasAttribute("aria-label")) {
      scrollRegion.setAttribute("aria-label", "Área com rolagem")
    }

    const syncScrollAffordance = () => {
      const overflows =
        scrollRegion.scrollHeight > scrollRegion.clientHeight ||
        scrollRegion.scrollWidth > scrollRegion.clientWidth
      if (overflows) {
        scrollRegion.setAttribute("tabindex", "0")
        scrollRegion.setAttribute("role", "group")
        if (!scrollRegion.hasAttribute("aria-label")) {
          scrollRegion.setAttribute("aria-label", "Área com rolagem")
        }
      } else {
        scrollRegion.removeAttribute("tabindex")
        scrollRegion.removeAttribute("role")
        scrollRegion.removeAttribute("aria-label")
      }
    }

    const observer = new ResizeObserver(syncScrollAffordance)
    observer.observe(scrollRegion)
    return () => observer.disconnect()
  }, [])

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      outerRef.current = node
      assignRef(elementRef, node)
    },
    [elementRef]
  )

  return (
    <ResizablePrimitive.Panel
      data-slot="resizable-panel"
      elementRef={setRefs}
      {...props}
    />
  )
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  withHandle?: boolean
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        "relative flex w-px items-center justify-center bg-border ring-offset-background after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border" />
      )}
    </ResizablePrimitive.Separator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
