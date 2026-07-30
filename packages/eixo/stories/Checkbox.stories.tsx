import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof Checkbox> = {
  title: 'Componentes/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Aceito os termos de uso</Label>
    </div>
  ),
}

export const Marcado: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms-checked" defaultChecked />
      <Label htmlFor="terms-checked">Notificações por e-mail</Label>
    </div>
  ),
}

export const Desabilitado: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms-disabled" disabled />
      <Label htmlFor="terms-disabled" className="opacity-50">Indisponível no seu plano</Label>
    </div>
  ),
}
