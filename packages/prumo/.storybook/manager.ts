import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'

const theme = create({
  base: 'light',
  brandTitle: 'Prumo',
  brandUrl: '/',
  brandTarget: '_self',

  fontBase: '"Inter", -apple-system, sans-serif',
  fontCode: '"JetBrains Mono", monospace',

  colorPrimary: '#0D9488',
  colorSecondary: '#0D9488',

  appBg: '#F8FAFC',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E2E8F0',
  appBorderRadius: 6,

  textColor: '#0F172A',
  textInverseColor: '#FFFFFF',

  barTextColor: '#64748B',
  barSelectedColor: '#0D9488',
  barHoverColor: '#0D9488',
  barBg: '#FFFFFF',

  inputBg: '#FFFFFF',
  inputBorder: '#E2E8F0',
  inputTextColor: '#0F172A',
  inputBorderRadius: 6,
})

addons.setConfig({ theme })
