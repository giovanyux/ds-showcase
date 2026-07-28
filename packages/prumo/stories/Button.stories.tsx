import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ShoppingCart, Plus, Trash2, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Componentes/Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: [],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'ghost-primary', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
    },
    disabled: { control: 'boolean' },
  },
  args: { children: 'Salvar agendamento' },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { variant: 'default' },
}

export const Outline: Story = {
  args: { variant: 'outline', children: 'Cancelar' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Ver detalhes' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ignorar' },
}

export const GhostPrimary: Story = {
  args: { variant: 'ghost-primary', children: 'Saiba mais' },
}

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Excluir catálogo' },
}

export const Link: Story = {
  args: { variant: 'link', children: 'Ver todos os agendamentos' },
}

export const ComIcone: Story = {
  name: 'Com ícone',
  args: {
    variant: 'default',
    children: (
      <>
        <Plus />
        Novo item
      </>
    ),
  },
}

export const IconeApenas: Story = {
  name: 'Ícone apenas',
  args: {
    variant: 'default',
    size: 'icon',
    children: (
      <>
        <ShoppingCart />
        <span className="sr-only">Carrinho</span>
      </>
    ),
  },
}

export const Carregando: Story = {
  args: {
    variant: 'default',
    disabled: true,
    children: (
      <>
        <Loader2 className="animate-spin" />
        Salvando...
      </>
    ),
  },
}

export const Desabilitado: Story = {
  args: { variant: 'default', disabled: true, children: 'Salvar agendamento' },
}

export const Tamanhos: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="xs">Micro</Button>
      <Button size="sm">Pequeno</Button>
      <Button size="default">Padrão</Button>
      <Button size="lg">Grande</Button>
    </div>
  ),
}

export const TodasVariantes: Story = {
  name: 'Todas as variantes',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="ghost-primary">Ghost Primary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const EfeitoMagnetico: Story = {
  name: 'Efeito magnético (hover)',
  render: () => (
    <div className="flex gap-4 p-12">
      <Button variant="default">
        <ArrowRight />
        Hover aqui
      </Button>
      <Button variant="destructive">
        <Trash2 />
        Excluir
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Botões `default` e `destructive` têm efeito magnético — o botão segue o cursor levemente no hover, criando uma sensação de atração.',
      },
    },
  },
}
