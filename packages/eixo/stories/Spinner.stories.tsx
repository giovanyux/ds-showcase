import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Spinner> = {
  title: 'Componentes/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner />
      <Button disabled>
        <Spinner className="mr-2" />
        Confirmando agendamento...
      </Button>
    </div>
  ),
}
