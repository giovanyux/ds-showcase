import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

const meta = {
  title: 'Componentes/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Accordion className="w-80">
      <AccordionItem value="horarios">
        <AccordionTrigger>Horários de funcionamento</AccordionTrigger>
        <AccordionContent>
          <p className="text-muted-foreground">Segunda a sexta: 11h — 23h</p>
          <p className="text-muted-foreground">Sábados e domingos: 11h — 00h</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="entrega">
        <AccordionTrigger>Área de entrega</AccordionTrigger>
        <AccordionContent>
          <p className="text-muted-foreground">Entregamos num raio de 10 km a partir do negócio.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="pagamento">
        <AccordionTrigger>Formas de pagamento</AccordionTrigger>
        <AccordionContent>
          <p className="text-muted-foreground">Pix, cartão de crédito/débito e dinheiro.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const MultiploAberto: Story = {
  name: 'Múltiplos abertos',
  render: () => (
    <Accordion multiple className="w-80">
      <AccordionItem value="ingredientes">
        <AccordionTrigger>Ingredientes</AccordionTrigger>
        <AccordionContent>
          <p className="text-muted-foreground">Farinha, molho de tomate, mussarela, manjericão.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="alergenos">
        <AccordionTrigger>Alergênicos</AccordionTrigger>
        <AccordionContent>
          <p className="text-muted-foreground">Contém glúten e lactose.</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
