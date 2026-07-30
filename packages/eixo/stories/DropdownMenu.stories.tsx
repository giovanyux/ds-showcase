import type { Meta, StoryObj } from '@storybook/react-vite'
import { User, CreditCard, Settings, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Componentes/DropdownMenu',
  component: DropdownMenu,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Abrir menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" /><span>Perfil</span>
          <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" /><span>Cobrança</span>
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" /><span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" /><span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
