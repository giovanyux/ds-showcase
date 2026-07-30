import type { Meta, StoryObj } from '@storybook/react-vite'
import { Star } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Componentes/Toggle',
  component: Toggle,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Marcar como favorita">
      <Star className="h-4 w-4" />
      Cliente favorita
    </Toggle>
  ),
}
