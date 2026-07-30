import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from '@/components/ui/skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'Componentes/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  ),
}
