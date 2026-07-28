import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

const meta = {
  title: 'Componentes/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  tags: [],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="agendamentos" className="w-80">
      <TabsList>
        <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
        <TabsTrigger value="catalogo">Catálogo</TabsTrigger>
        <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
      </TabsList>
      <TabsContent value="agendamentos">
        <p className="text-sm text-muted-foreground pt-2">Lista de agendamentos do dia.</p>
      </TabsContent>
      <TabsContent value="catalogo">
        <p className="text-sm text-muted-foreground pt-2">Itens do catálogo ativo.</p>
      </TabsContent>
      <TabsContent value="relatorios">
        <p className="text-sm text-muted-foreground pt-2">Relatórios de vendas.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const Variante: Story = {
  name: 'Variante default (cards)',
  render: () => (
    <Tabs defaultValue="hoje" className="w-80">
      <TabsList variant="default">
        <TabsTrigger value="hoje">Hoje</TabsTrigger>
        <TabsTrigger value="semana">Semana</TabsTrigger>
        <TabsTrigger value="mes">Mês</TabsTrigger>
      </TabsList>
      <TabsContent value="hoje">
        <p className="text-sm text-muted-foreground pt-2">Dados de hoje.</p>
      </TabsContent>
      <TabsContent value="semana">
        <p className="text-sm text-muted-foreground pt-2">Dados da semana.</p>
      </TabsContent>
      <TabsContent value="mes">
        <p className="text-sm text-muted-foreground pt-2">Dados do mês.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const ComBadge: Story = {
  name: 'Com badge de contagem',
  render: () => (
    <Tabs defaultValue="novos" className="w-80">
      <TabsList>
        <TabsTrigger value="novos" className="gap-1.5">
          Novos <Badge variant="default" className="text-[10px] px-1.5 py-0">3</Badge>
        </TabsTrigger>
        <TabsTrigger value="preparo" className="gap-1.5">
          Em preparo <Badge variant="warning" className="text-[10px] px-1.5 py-0">5</Badge>
        </TabsTrigger>
        <TabsTrigger value="entregues">Entregues</TabsTrigger>
      </TabsList>
      <TabsContent value="novos">
        <p className="text-sm text-muted-foreground pt-2">3 agendamentos aguardando confirmação.</p>
      </TabsContent>
      <TabsContent value="preparo">
        <p className="text-sm text-muted-foreground pt-2">5 agendamentos em preparo.</p>
      </TabsContent>
      <TabsContent value="entregues">
        <p className="text-sm text-muted-foreground pt-2">Histórico de entregas.</p>
      </TabsContent>
    </Tabs>
  ),
}
