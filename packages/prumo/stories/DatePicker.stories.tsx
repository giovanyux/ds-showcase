import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { DatePicker, DateRangePicker } from '@/components/ui/date-picker'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Componentes/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function DefaultStory() {
    const [date, setDate] = useState<Date>()
    return <DatePicker value={date} onChange={setDate} />
  },
}

export const ComLabel: Story = {
  name: 'Com label',
  render: function ComLabelStory() {
    const [date, setDate] = useState<Date>()
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor="data-entrega">Data de entrega</Label>
        <DatePicker value={date} onChange={setDate} placeholder="Escolher data" />
      </div>
    )
  },
}

export const ComValorInicial: Story = {
  name: 'Com data pré-selecionada',
  render: function ComValorStory() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return <DatePicker value={date} onChange={setDate} />
  },
}

export const Desabilitado: Story = {
  render: () => <DatePicker disabled placeholder="Campo desabilitado" />,
}

export const Intervalo: Story = {
  name: 'Seleção de intervalo',
  render: function IntervaloStory() {
    const [range, setRange] = useState<DateRange>()
    return <DateRangePicker value={range} onChange={setRange} />
  },
}

export const IntervaloComLabel: Story = {
  name: 'Intervalo com label — relatório',
  render: function IntervaloLabelStory() {
    const [range, setRange] = useState<DateRange>()
    return (
      <div className="flex flex-col gap-2">
        <Label>Período do relatório</Label>
        <DateRangePicker value={range} onChange={setRange} placeholder="Selecionar período" />
      </div>
    )
  },
}
