import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Componentes/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="Usuário" />
      <AvatarFallback>EX</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: () => (
    <div className="flex gap-3">
      <Avatar>
        <AvatarFallback>MC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JS</AvatarFallback>
      </Avatar>
    </div>
  ),
}
