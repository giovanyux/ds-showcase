import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { DatePicker } from '@/components/ui/date-picker'

const meta: Meta<typeof DatePicker> = {
  title: 'Componentes/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof DatePicker>

function DatePickerDemo() {
  const [data, setData] = useState<Date>()
  return <DatePicker value={data} onChange={setData} placeholder="Selecionar data do agendamento" />
}

export const Default: Story = {
  render: () => <DatePickerDemo />,
}
