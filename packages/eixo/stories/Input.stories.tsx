import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof Input> = {
  title: 'Componentes/Input',
  component: Input,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: () => (
    <div className="grid w-72 gap-1.5">
      <Label htmlFor="email">E-mail</Label>
      <Input id="email" type="email" placeholder="seu@email.com" />
    </div>
  ),
}

export const Desabilitado: Story = {
  render: () => <Input disabled placeholder="Campo desabilitado" className="w-72" />,
}

export const ComValor: Story = {
  render: () => <Input defaultValue="Studio Bela" className="w-72" />,
}
