import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calendar, Scissors, Users } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

const meta: Meta<typeof Sidebar> = {
  title: 'Componentes/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof Sidebar>

const itens = [
  { title: 'Agenda', icon: Calendar },
  { title: 'Clientes', icon: Users },
  { title: 'Serviços', icon: Scissors },
]

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="px-3 py-2 text-sm font-semibold">Studio Bela</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegação</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {itens.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.title === 'Agenda'}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex items-center gap-2 p-4">
          <SidebarTrigger />
          <span className="text-sm text-muted-foreground">Agenda do dia</span>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}
