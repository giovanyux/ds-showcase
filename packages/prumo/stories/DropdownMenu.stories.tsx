import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MoreHorizontal, Edit, Copy, Trash2, Settings, LogOut, User } from 'lucide-react'
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

const meta = {
  title: 'Componentes/DropdownMenu',
  component: DropdownMenu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const AcoesItem: Story = {
  name: 'Ações de item',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label="Mais opções"><MoreHorizontal /></Button>} />
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem>
          <Edit />Editar item
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy />Duplicar
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 />Excluir
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const MenuUsuario: Story = {
  name: 'Menu de usuário',
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline">João Silva</Button>} />
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem><User />Perfil</DropdownMenuItem>
        <DropdownMenuItem><Settings />Configurações</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive"><LogOut />Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
