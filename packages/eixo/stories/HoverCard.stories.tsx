import type { Meta, StoryObj } from '@storybook/react-vite'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const meta: Meta<typeof HoverCard> = {
  title: 'Componentes/HoverCard',
  component: HoverCard,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-default text-sm font-medium underline decoration-dotted underline-offset-4">
          @mariana.costa
        </span>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-semibold">Mariana Costa</p>
            <p className="text-xs text-muted-foreground">
              Cliente desde 2023 · 14 visitas ao Studio Bela
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
