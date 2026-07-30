import type { Meta, StoryObj } from '@storybook/react-vite'
import { Kbd, KbdGroup } from '@/components/ui/kbd'

const meta: Meta<typeof Kbd> = {
  title: 'Componentes/Kbd',
  component: Kbd,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Kbd>

export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        Buscar cliente
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        Novo agendamento
        <KbdGroup>
          <Kbd>Ctrl</Kbd>
          <Kbd>N</Kbd>
        </KbdGroup>
      </div>
    </div>
  ),
}
