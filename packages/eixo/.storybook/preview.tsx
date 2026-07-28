/// <reference types="vite/client" />
import type { Preview } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import '../src/index.css'

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        'reto-light':  'theme-reto',
        'reto-dark':   'theme-reto dark',
        'suave-light': 'theme-suave',
        'suave-dark':  'theme-suave dark',
      },
      defaultTheme: 'reto-light',
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
