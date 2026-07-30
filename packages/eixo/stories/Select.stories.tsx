import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'

const meta: Meta<typeof Select> = {
  title: 'Componentes/Select',
  component: Select,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => (
    <Select defaultValue="corte">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Escolha um serviço" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Serviços</SelectLabel>
          <SelectItem value="corte">Corte + Barba</SelectItem>
          <SelectItem value="manicure">Manicure + Pedicure</SelectItem>
          <SelectItem value="consultoria">Consultoria inicial</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}
