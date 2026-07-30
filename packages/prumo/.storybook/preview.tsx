import type { Preview, Decorator } from '@storybook/nextjs-vite'
import React from 'react'
import '../app/globals.css'
import { TooltipProvider } from '@/components/ui/tooltip'

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals?.theme ?? 'light'
  document.documentElement.classList.toggle('dark', theme === 'dark')
  return Story()
}

const withTooltipProvider: Decorator = (Story) => (
  <TooltipProvider>
    <Story />
  </TooltipProvider>
)

const preview: Preview = {
  decorators: [withTheme, withTooltipProvider],
  globalTypes: {
    theme: {
      description: 'Tema global dos componentes',
      defaultValue: 'light',
      toolbar: {
        title: 'Tema',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          'Showcases',
          ['Painel do Negócio', 'Onboarding', 'Mensageria'],
          'Fundação',
          [
            'Cores',
            'Tipografia',
            'Raio de Borda',
            'Sombras',
            'Espaçamento',
            'Guia de Overlays',
            'Guia de Seleção',
            'Guia de Tabelas',
            'Guia de Formulários (Field)',
            'Guia de Sidebar',
          ],
          'Componentes',
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile (375)',
          styles: { width: '375px', height: '812px' },
          type: 'mobile',
        },
        mobileLg: {
          name: 'Mobile (430)',
          styles: { width: '430px', height: '932px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet (768)',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop (1280)',
          styles: { width: '1280px', height: '800px' },
          type: 'desktop',
        },
        desktopLg: {
          name: 'Desktop (1440)',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop',
        },
      },
    },
  },
}

export default preview
