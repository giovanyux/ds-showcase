import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Componentes/ToggleGroup',
  component: ToggleGroup,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof ToggleGroup>

export const Default: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="semana" variant="outline">
      <ToggleGroupItem value="dia">Dia</ToggleGroupItem>
      <ToggleGroupItem value="semana">Semana</ToggleGroupItem>
      <ToggleGroupItem value="mes">Mês</ToggleGroupItem>
    </ToggleGroup>
  ),
}
