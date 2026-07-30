import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Componentes/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="visao-geral" className="w-96">
      <TabsList>
        <TabsTrigger value="visao-geral">Visão geral</TabsTrigger>
        <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
        <TabsTrigger value="config">Configurações</TabsTrigger>
      </TabsList>
      <TabsContent value="visao-geral" className="text-sm text-muted-foreground pt-2">
        Resumo dos agendamentos e receita do mês.
      </TabsContent>
      <TabsContent value="detalhes" className="text-sm text-muted-foreground pt-2">
        Lista detalhada por cliente e serviço.
      </TabsContent>
      <TabsContent value="config" className="text-sm text-muted-foreground pt-2">
        Preferências de horário e notificação.
      </TabsContent>
    </Tabs>
  ),
}
