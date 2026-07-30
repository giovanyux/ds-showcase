import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const meta: Meta<typeof ChartContainer> = {
  title: 'Componentes/Chart',
  component: ChartContainer,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof ChartContainer>

const data = [
  { mes: 'Mar', receita: 8400 },
  { mes: 'Abr', receita: 9100 },
  { mes: 'Mai', receita: 8800 },
  { mes: 'Jun', receita: 10200 },
  { mes: 'Jul', receita: 11400 },
]

const config = {
  receita: { label: 'Receita', color: 'oklch(0.536 0.219 271.6)' },
} satisfies ChartConfig

export const Default: Story = {
  render: () => (
    <ChartContainer config={config} className="h-64 w-96">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="mes" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="receita" fill="var(--color-receita)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
}
