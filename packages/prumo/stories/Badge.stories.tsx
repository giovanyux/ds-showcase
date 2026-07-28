import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Badge } from '@/components/ui/badge'

const meta = {
  title: 'Componentes/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: [],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'success', 'warning'],
    },
  },
  args: { children: 'ATIVO' },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Secondary: Story = { args: { variant: 'secondary', children: 'Inativo' } }
export const Success: Story = { args: { variant: 'success', children: 'ENTREGUE' } }
export const Warning: Story = { args: { variant: 'warning', children: 'PENDENTE' } }
export const Destructive: Story = { args: { variant: 'destructive', children: 'CANCELADO' } }
export const Ghost: Story = { args: { variant: 'ghost', children: 'Arquivado' } }
export const Outline: Story = { args: { variant: 'outline', children: 'Rascunho' } }

export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">ATIVO</Badge>
      <Badge variant="success">ENTREGUE</Badge>
      <Badge variant="warning">PENDENTE</Badge>
      <Badge variant="destructive">CANCELADO</Badge>
      <Badge variant="secondary">Inativo</Badge>
      <Badge variant="ghost">Arquivado</Badge>
      <Badge variant="outline">Rascunho</Badge>
    </div>
  ),
}

export const StatusAgendamento: Story = {
  name: 'Status de agendamento',
  render: () => (
    <div className="flex flex-col gap-3 w-64">
      {[
        { status: 'Aguardando pagamento', variant: 'warning' as const },
        { status: 'Em preparo', variant: 'default' as const },
        { status: 'Saiu para entrega', variant: 'default' as const },
        { status: 'Entregue', variant: 'success' as const },
        { status: 'Cancelado', variant: 'destructive' as const },
      ].map(({ status, variant }) => (
        <div key={status} className="flex items-center justify-between text-sm">
          <span>Agendamento #1042</span>
          <Badge variant={variant}>{status.toUpperCase()}</Badge>
        </div>
      ))}
    </div>
  ),
}
