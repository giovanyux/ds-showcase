import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Button> = {
  title: 'Componentes/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { children: 'Tactile button', variant: 'default' },
}

export const TodasVariantes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Tamanhos: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Pequeno</Button>
      <Button size="default">Padrão</Button>
      <Button size="lg">Grande</Button>
    </div>
  ),
}

export const Desabilitado: Story = {
  args: { children: 'Not Available', disabled: true },
}
