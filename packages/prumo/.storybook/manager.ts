import React from 'react'
import { addons, types } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'

const theme = create({
  base: 'light',
  brandTitle: 'Prumo',
  brandUrl: '/',
  brandTarget: '_self',

  fontBase: '"Inter", -apple-system, sans-serif',
  fontCode: '"JetBrains Mono", monospace',

  colorPrimary: '#AE4526',
  colorSecondary: '#AE4526',

  appBg: '#FFFBF7',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E8DDD4',
  appBorderRadius: 10,

  textColor: '#2B1410',
  textInverseColor: '#FFFFFF',

  barTextColor: '#7A5C50',
  barSelectedColor: '#AE4526',
  barHoverColor: '#AE4526',
  barBg: '#FFFFFF',

  inputBg: '#FFFFFF',
  inputBorder: '#E8DDD4',
  inputTextColor: '#2B1410',
  inputBorderRadius: 10,
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
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            color: '#AE4526',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          },
        },
        'Portfólio ↗'
      ),
  })
})
