'use client'

import { useEffect, useRef } from 'react'
import { driver, type Config, type Popover } from 'driver.js'
import 'driver.js/dist/driver.css'

export interface TourStep {
  element?: string
  title: string
  description: string
  side?: Popover['side']
  align?: Popover['align']
}

export interface TourProps {
  steps: TourStep[]
  onComplete?: () => void
  onClose?: () => void
  config?: Partial<Config>
}

export function useTour({ steps, onComplete, onClose, config }: TourProps) {
  const driverRef = useRef<ReturnType<typeof driver> | null>(null)

  useEffect(() => {
    driverRef.current = driver({
      showProgress: true,
      animate: true,
      smoothScroll: true,
      allowClose: true,
      popoverClass: 'prumo-tour-popover',
      nextBtnText: 'Próximo →',
      prevBtnText: '← Anterior',
      doneBtnText: 'Concluir',
      progressText: '{{current}} de {{total}}',
      onDestroyed: onClose,
      onDestroyStarted: () => {
        if (driverRef.current?.isLastStep()) onComplete?.()
        driverRef.current?.destroy()
      },
      steps: steps.map(s => ({
        element: s.element,
        popover: {
          title: s.title,
          description: s.description,
          side: s.side,
          align: s.align,
        },
      })),
      ...config,
    })

    return () => {
      driverRef.current?.destroy()
    }
  }, [])

  const start = () => driverRef.current?.drive()
  const destroy = () => driverRef.current?.destroy()

  return { start, destroy }
}
