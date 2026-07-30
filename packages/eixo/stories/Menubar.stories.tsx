import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar'

const meta: Meta<typeof Menubar> = {
  title: 'Componentes/Menubar',
  component: Menubar,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Menubar>

export const Default: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Agenda</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Novo agendamento <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Ver semana</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Exportar agenda</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Clientes</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Nova cliente</MenubarItem>
          <MenubarItem>Importar contatos</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Relatórios</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Receita mensal</MenubarItem>
          <MenubarItem>Serviços mais vendidos</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
}
