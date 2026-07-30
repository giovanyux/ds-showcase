import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

const meta: Meta<typeof Label> = {
  title: 'Componentes/Label',
  component: Label,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="newsletter" />
      <Label htmlFor="newsletter">Quero receber novidades por e-mail</Label>
    </div>
  ),
}
