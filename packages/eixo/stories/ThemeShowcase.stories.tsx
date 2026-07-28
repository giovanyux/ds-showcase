import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell, CheckCircle2, ChevronRight, Package, Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const meta: Meta = {
  title: 'Foundation/Seletor de tema',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Use o seletor de tema na toolbar do Storybook (ícone de paleta) para alternar entre **Reto** e **Suave** — a marca inteira muda: radius, cor primária e sombras, sem tocar em nenhum componente individualmente.',
      },
    },
  },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Componentes reagindo ao tema',
  render: () => (
    <div className="min-h-screen bg-background text-foreground p-10 space-y-10">
      <header className="space-y-2">
        <Badge variant="outline">Foundation</Badge>
        <h1 className="text-3xl font-bold">Seletor de tema</h1>
        <p className="text-muted-foreground max-w-xl">
          Troque entre os temas <strong>Reto</strong> e <strong>Suave</strong> na toolbar acima
          (ícone de paleta) e observe cor primária, radius e sombras mudarem juntos nos
          componentes abaixo.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Plano atual</CardTitle>
            <CardDescription>Resumo de uso do mês</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Uso</span>
              <span className="font-medium">72%</span>
            </div>
            <Progress value={72} />
            <div className="flex items-center gap-3 pt-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>EX</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Time Exemplo</p>
                <p className="text-xs text-muted-foreground">Plano Pro</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Fazer upgrade</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferências</CardTitle>
            <CardDescription>Configurações rápidas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme-name">Nome</Label>
              <Input id="theme-name" placeholder="Digite algo..." />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notif" className="text-sm font-normal">Notificações</Label>
              <Switch id="notif" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto" className="text-sm font-normal">Atualização automática</Label>
              <Switch id="auto" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade</CardTitle>
            <CardDescription>Últimas notificações</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: CheckCircle2, label: 'Item aprovado' },
              { icon: Bell, label: 'Novo comentário' },
              { icon: Package, label: 'Entrega concluída' },
              { icon: Star, label: 'Nova avaliação' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="size-4 text-primary" />
                </div>
                <span>{label}</span>
                <ChevronRight className="ml-auto size-4 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="a" className="max-w-md">
        <TabsList>
          <TabsTrigger value="a">Aba A</TabsTrigger>
          <TabsTrigger value="b">Aba B</TabsTrigger>
          <TabsTrigger value="c">Aba C</TabsTrigger>
        </TabsList>
        <TabsContent value="a" className="text-sm text-muted-foreground pt-2">
          Conteúdo de exemplo da aba A.
        </TabsContent>
        <TabsContent value="b" className="text-sm text-muted-foreground pt-2">
          Conteúdo de exemplo da aba B.
        </TabsContent>
        <TabsContent value="c" className="text-sm text-muted-foreground pt-2">
          Conteúdo de exemplo da aba C.
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </div>
  ),
}
