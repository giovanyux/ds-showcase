import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Componentes/Accordion',
  component: Accordion,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Como funciona o agendamento?</AccordionTrigger>
        <AccordionContent>
          Clientes escolhem horário e profissional direto pelo link do Studio Bela, sem
          precisar ligar.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Posso cancelar um agendamento?</AccordionTrigger>
        <AccordionContent>
          Sim, até 2 horas antes do horário marcado, direto pela confirmação enviada por
          e-mail.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Como funciona o pagamento?</AccordionTrigger>
        <AccordionContent>
          Aceitamos pagamento no local ou antecipado pelo aplicativo, com recibo
          automático.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
