import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

const meta = {
  title: 'Componentes/Carousel',
  component: Carousel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Carousel className="w-72">
      <CarouselContent>
        {['Pizza Margherita', 'Hambúrguer Smash', 'Salada Caesar', 'Tiramisu'].map((item) => (
          <CarouselItem key={item}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-sm font-medium text-center">{item}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const Multiplos: Story = {
  name: 'Múltiplos itens visíveis',
  render: () => (
    <Carousel opts={{ align: 'start' }} className="w-80">
      <CarouselContent className="-ml-2">
        {Array.from({ length: 6 }, (_, i) => `Item ${i + 1}`).map((item) => (
          <CarouselItem key={item} className="pl-2 basis-1/2">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-4">
                <span className="text-sm font-medium">{item}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
