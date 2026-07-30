import React from 'react'
import { addons, types } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'

const theme = create({
  base: 'light',
  brandTitle: 'Eixo',
  brandUrl: '/',
  brandTarget: '_self',

  fontBase: '"Inter", -apple-system, sans-serif',
  fontCode: 'monospace',

  colorPrimary: '#4657E9',
  colorSecondary: '#4657E9',

  appBg: '#E9EDF2',
  appContentBg: '#E9EDF2',
  appBorderColor: 'rgba(163,177,198,0.35)',
  appBorderRadius: 12,

  textColor: '#4A5568',
  textInverseColor: '#FFFFFF',

  barTextColor: '#5C6980',
  barSelectedColor: '#4657E9',
  barHoverColor: '#4657E9',
  barBg: '#E9EDF2',

  inputBg: '#E9EDF2',
  inputBorder: 'rgba(163,177,198,0.35)',
  inputTextColor: '#4A5568',
  inputBorderRadius: 10,
})

addons.setConfig({ theme })

addons.register('eixo/portfolio-link', () => {
  addons.add('eixo/portfolio-link', {
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
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            color: '#4657E9',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          },
        },
        'Portfólio ↗'
      ),
  })
})
