import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DashboardExample } from '@/components/examples/dashboard-example'

const meta = {
  title: 'Showcases/Dashboard',
  component: DashboardExample,
  parameters: { layout: 'fullscreen' },
  tags: [],
} satisfies Meta<typeof DashboardExample>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Tela densa (todos os componentes compostos)',
}
