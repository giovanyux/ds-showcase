import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'

const meta = {
  title: 'Componentes/Sonner (Toast)',
  component: Toaster,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story: React.ComponentType) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Sucesso: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast.success('Agendamento confirmado!', { description: 'O agendamento #1042 foi enviado para preparo.' })}
    >
      Toast de sucesso
    </Button>
  ),
}

export const Erro: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast.error('Erro ao salvar', { description: 'Não foi possível salvar as alterações. Tente novamente.' })}
    >
      Toast de erro
    </Button>
  ),
}

export const Aviso: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast.warning('Plano expirando', { description: 'Seu plano expira em 3 dias.' })}
    >
      Toast de aviso
    </Button>
  ),
}

export const Informacao: Story = {
  name: 'Informação',
  render: () => (
    <Button
      variant="outline"
      onClick={() => toast.info('Novo agendamento recebido', { description: 'Pizza Margherita · R$ 42,00' })}
    >
      Toast informativo
    </Button>
  ),
}

export const ComAcao: Story = {
  name: 'Com ação',
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast('Item removido do catálogo', {
          action: { label: 'Desfazer', onClick: () => toast.success('Ação desfeita!') },
        })
      }
    >
      Toast com ação
    </Button>
  ),
}

export const TodosTipos: Story = {
  name: 'Todos os tipos',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" variant="outline" onClick={() => toast.success('Sucesso!')}>Sucesso</Button>
      <Button size="sm" variant="outline" onClick={() => toast.error('Erro!')}>Erro</Button>
      <Button size="sm" variant="outline" onClick={() => toast.warning('Aviso!')}>Aviso</Button>
      <Button size="sm" variant="outline" onClick={() => toast.info('Info!')}>Info</Button>
      <Button size="sm" variant="outline" onClick={() => toast('Padrão')}>Padrão</Button>
    </div>
  ),
}
