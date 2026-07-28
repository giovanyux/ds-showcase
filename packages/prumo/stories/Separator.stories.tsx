import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Separator } from '@/components/ui/separator'

const meta = {
  title: 'Componentes/Separator',
  component: Separator,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div className="w-64 space-y-3">
      <p className="text-sm">Informações do negócio</p>
      <Separator />
      <p className="text-sm text-muted-foreground">42 itens · Atualizado hoje</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3 text-sm">
      <span>Catálogo</span>
      <Separator orientation="vertical" />
      <span>Agendamentos</span>
      <Separator orientation="vertical" />
      <span>Relatórios</span>
    </div>
  ),
}
