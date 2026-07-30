import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from '@/components/ui/separator'

const meta: Meta<typeof Separator> = {
  title: 'Componentes/Separator',
  component: Separator,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: () => (
    <div className="w-72">
      <p className="text-sm">Studio Bela</p>
      <p className="text-sm text-muted-foreground">Agenda de serviços</p>
      <Separator className="my-3" />
      <p className="text-sm text-muted-foreground">São Paulo, SP</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3 text-sm">
      <span>Início</span>
      <Separator orientation="vertical" />
      <span>Sobre</span>
      <Separator orientation="vertical" />
      <span>Contato</span>
    </div>
  ),
}
