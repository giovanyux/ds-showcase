import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const meta = {
  title: 'Componentes/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const ComImagem: Story = {
  name: 'Com imagem',
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  name: 'Fallback (sem imagem)',
  render: () => (
    <Avatar>
      <AvatarFallback>JO</AvatarFallback>
    </Avatar>
  ),
}

export const Tamanhos: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const GrupoUsuarios: Story = {
  name: 'Grupo de usuários',
  render: () => (
    <div className="flex -space-x-2">
      {['JO', 'MA', 'PE', 'AN', 'CL'].map((initials) => (
        <Avatar key={initials} className="ring-2 ring-background">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      ))}
      <Avatar className="ring-2 ring-background">
        <AvatarFallback className="text-xs">+12</AvatarFallback>
      </Avatar>
    </div>
  ),
}
