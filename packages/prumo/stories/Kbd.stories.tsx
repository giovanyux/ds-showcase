import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Command } from 'lucide-react'
import { Kbd, KbdGroup } from '@/components/ui/kbd'

const meta = {
  title: 'Componentes/Kbd',
  component: Kbd,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { children: '⌘K' },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Atalhos: Story = {
  render: () => (
    <div className="flex flex-col gap-3 text-sm">
      {[
        { label: 'Buscar', keys: ['⌘', 'K'] },
        { label: 'Salvar', keys: ['⌘', 'S'] },
        { label: 'Novo item', keys: ['⌘', 'N'] },
        { label: 'Fechar', keys: ['Esc'] },
      ].map(({ label, keys }) => (
        <div key={label} className="flex items-center justify-between w-48">
          <span className="text-muted-foreground">{label}</span>
          <KbdGroup>
            {keys.map(k => <Kbd key={k}>{k}</Kbd>)}
          </KbdGroup>
        </div>
      ))}
    </div>
  ),
}
