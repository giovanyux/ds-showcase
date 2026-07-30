import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof Switch> = {
  title: 'Componentes/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notif" />
      <Label htmlFor="notif">Notificações</Label>
    </div>
  ),
}

export const Ligado: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="notif-on" defaultChecked />
      <Label htmlFor="notif-on">Atualização automática</Label>
    </div>
  ),
}
