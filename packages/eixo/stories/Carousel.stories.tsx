import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const meta: Meta<typeof Carousel> = {
  title: 'Componentes/Carousel',
  component: Carousel,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Carousel>

const fotos = ['Salão · Recepção', 'Salão · Cadeiras', 'Salão · Lavatório', 'Salão · Studio de cor']

export const Default: Story = {
  render: () => (
    <Carousel className="w-72">
      <CarouselContent>
        {fotos.map((foto) => (
          <CarouselItem key={foto}>
            <div className="flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 text-sm text-muted-foreground">
              {foto}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
