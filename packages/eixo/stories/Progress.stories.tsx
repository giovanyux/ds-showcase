import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from '@/components/ui/progress'

const meta: Meta<typeof Progress> = {
  title: 'Componentes/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {
  render: () => <Progress value={72} className="w-72" />,
}

export const Vazio: Story = {
  render: () => <Progress value={0} className="w-72" />,
}

export const Completo: Story = {
  render: () => <Progress value={100} className="w-72" />,
}
