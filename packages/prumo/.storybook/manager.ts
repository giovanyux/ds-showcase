import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'

const theme = create({
  base: 'light',
  brandTitle: 'Prumo',
  brandUrl: '/',
  brandTarget: '_self',

  fontBase: '"Inter", -apple-system, sans-serif',
  fontCode: '"JetBrains Mono", monospace',

  colorPrimary: '#5F2016',
  colorSecondary: '#5F2016',

  appBg: '#FFFBF7',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E8DDD4',
  appBorderRadius: 10,

  textColor: '#2B1410',
  textInverseColor: '#FFFFFF',

  barTextColor: '#7A5C50',
  barSelectedColor: '#5F2016',
  barHoverColor: '#5F2016',
  barBg: '#FFFFFF',

  inputBg: '#FFFFFF',
  inputBorder: '#E8DDD4',
  inputTextColor: '#2B1410',
  inputBorderRadius: 10,
})

addons.setConfig({ theme })
