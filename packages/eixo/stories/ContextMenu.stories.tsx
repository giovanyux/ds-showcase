import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'

const meta: Meta<typeof ContextMenu> = {
  title: 'Componentes/ContextMenu',
  component: ContextMenu,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof ContextMenu>

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center rounded-lg text-sm text-muted-foreground shadow-[var(--shadow-raised)]">
        Clique com o botão direito em Mariana Costa
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem>Ver ficha da cliente</ContextMenuItem>
        <ContextMenuItem>Reagendar horário</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive">Cancelar agendamento</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}
