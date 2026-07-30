import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'

const meta: Meta<typeof Calendar> = {
  title: 'Componentes/Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Calendar>

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
    )
  },
}
