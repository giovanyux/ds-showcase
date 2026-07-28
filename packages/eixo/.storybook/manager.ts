import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'

const theme = create({
  base: 'light',
  brandTitle: 'Eixo',
  brandUrl: '/',
  brandTarget: '_self',

  fontBase: '"Inter", -apple-system, sans-serif',
  fontCode: 'monospace',

  colorPrimary: '#B45309',
  colorSecondary: '#B45309',

  appBg: '#FAFAF9',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E7E5E4',
  appBorderRadius: 2,

  textColor: '#1C1917',
  textInverseColor: '#FFFFFF',

  barTextColor: '#78716C',
  barSelectedColor: '#B45309',
  barHoverColor: '#B45309',
  barBg: '#FFFFFF',

  inputBg: '#FFFFFF',
  inputBorder: '#E7E5E4',
  inputTextColor: '#1C1917',
  inputBorderRadius: 2,
})

addons.setConfig({ theme })
