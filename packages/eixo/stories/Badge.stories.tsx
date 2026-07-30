import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@/components/ui/badge'

const meta: Meta<typeof Badge> = {
  title: 'Componentes/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: { children: 'Novo' },
}

export const TodasVariantes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Aprovado</Badge>
      <Badge variant="warning">Pendente</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
}
