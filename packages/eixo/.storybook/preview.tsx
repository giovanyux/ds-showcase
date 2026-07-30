/// <reference types="vite/client" />
import type { Preview } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import '../src/index.css'

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'theme-reto',
        dark:  'theme-reto dark',
      },
      defaultTheme: 'light',
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
    options: {
      storySort: {
        order: ['Foundation', 'Showcases'],
      },
    },
  },
}

export default preview
