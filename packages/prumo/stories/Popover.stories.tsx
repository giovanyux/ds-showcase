import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SlidersHorizontal } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'

const meta = {
  title: 'Componentes/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline"><SlidersHorizontal />Filtros</Button>} />
      <PopoverContent className="w-64">
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Filtrar agendamentos</h4>
          <Separator />
          {[
            { id: 'domicilio', label: 'Domicílio' },
            { id: 'presencial', label: 'Presencial' },
          ].map(({ id, label }) => (
            <div key={id} className="flex items-center justify-between">
              <Label htmlFor={id} className="cursor-pointer">{label}</Label>
              <Switch id={id} defaultChecked />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const Informacao: Story = {
  name: 'Informação contextual',
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="ghost" size="icon" aria-label="Informação sobre ticket médio" className="size-5 rounded-full text-xs">?</Button>} />
      <PopoverContent className="w-72">
        <p className="text-sm text-muted-foreground">
          O <strong>ticket médio</strong> é calculado dividindo a receita total pelo número de agendamentos no período selecionado.
        </p>
      </PopoverContent>
    </Popover>
  ),
}
