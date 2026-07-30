import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof Toaster> = {
  title: 'Componentes/Sonner (Toast)',
  component: Toaster,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Toaster>

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast.success('Agendamento confirmado', {
            description: 'Corte + Barba às 14h30.',
          })
        }
      >
        Mostrar notificação
      </Button>
    </>
  ),
}
