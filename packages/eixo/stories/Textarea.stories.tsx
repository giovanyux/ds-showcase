import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof Textarea> = {
  title: 'Componentes/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: () => (
    <div className="grid w-72 gap-1.5">
      <Label htmlFor="msg">Mensagem</Label>
      <Textarea id="msg" placeholder="Escreva sua mensagem..." />
    </div>
  ),
}
