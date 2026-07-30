import React from 'react'
import { addons, types } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'

const theme = create({
  base: 'light',
  brandTitle: 'Prumo',
  brandUrl: '/',
  brandTarget: '_self',

  fontBase: '"Archivo", -apple-system, sans-serif',
  fontCode: '"JetBrains Mono", monospace',

  colorPrimary: '#2411ED',
  colorSecondary: '#2411ED',

  appBg: '#FFFFFF',
  appContentBg: '#FFFFFF',
  appBorderColor: '#121110',
  appBorderRadius: 0,

  textColor: '#121110',
  textInverseColor: '#FFF8EE',

  barTextColor: '#4A4744',
  barSelectedColor: '#2411ED',
  barHoverColor: '#2411ED',
  barBg: '#FFFFFF',

  inputBg: '#FFFFFF',
  inputBorder: '#121110',
  inputTextColor: '#121110',
  inputBorderRadius: 0,
})

addons.setConfig({ theme })

addons.register('prumo/portfolio-link', () => {
  addons.add('prumo/portfolio-link', {
    type: types.TOOL,
    title: 'Portfólio',
    match: () => true,
    render: () =>
      React.createElement(
        'a',
        {
          href: 'https://giovanyux.github.io/portfolio',
          target: '_blank',
          rel: 'noreferrer',
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            height: 28,
            padding: '0 10px',
            marginLeft: 8,
            borderRadius: 0,
            fontSize: 12,
            fontWeight: 600,
            color: '#2411ED',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          },
        },
        'Portfólio ↗'
      ),
  })
})
