import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slider } from '@/components/ui/slider'

const meta: Meta<typeof Slider> = {
  title: 'Componentes/Slider',
  component: Slider,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: () => <Slider defaultValue={[75]} max={100} step={1} className="w-72" />,
}

export const RangeDeValores: Story = {
  render: () => <Slider defaultValue={[25, 75]} max={100} step={1} className="w-72" />,
}
