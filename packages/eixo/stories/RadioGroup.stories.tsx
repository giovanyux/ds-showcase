import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof RadioGroup> = {
  title: 'Componentes/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="mensal" className="gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="mensal" id="mensal" />
        <Label htmlFor="mensal">Cobrança mensal</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="anual" id="anual" />
        <Label htmlFor="anual">Cobrança anual (2 meses grátis)</Label>
      </div>
    </RadioGroup>
  ),
}
