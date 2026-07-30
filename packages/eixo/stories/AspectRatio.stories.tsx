import type { Meta, StoryObj } from '@storybook/react-vite'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const meta: Meta<typeof AspectRatio> = {
  title: 'Componentes/AspectRatio',
  component: AspectRatio,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof AspectRatio>

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg shadow-[var(--shadow-raised)]">
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 text-sm text-muted-foreground">
          Foto do salão · Studio Bela
        </div>
      </AspectRatio>
    </div>
  ),
}
