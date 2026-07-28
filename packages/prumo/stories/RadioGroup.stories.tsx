import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Componentes/RadioGroup',
  component: RadioGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="domicilio">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="domicilio" id="domicilio" />
        <Label htmlFor="domicilio">Domicílio</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="retirada" id="retirada" />
        <Label htmlFor="retirada">Retirada no local</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="presencial" id="presencial" />
        <Label htmlFor="presencial">Atendimento presencial</Label>
      </div>
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="dia" className="flex gap-6">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="dia" id="dia" />
        <Label htmlFor="dia">Hoje</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="semana" id="semana" />
        <Label htmlFor="semana">Esta semana</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="mes" id="mes" />
        <Label htmlFor="mes">Este mês</Label>
      </div>
    </RadioGroup>
  ),
}
