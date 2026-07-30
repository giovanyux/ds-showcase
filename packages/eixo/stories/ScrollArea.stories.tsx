import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

const meta: Meta<typeof ScrollArea> = {
  title: 'Componentes/ScrollArea',
  component: ScrollArea,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof ScrollArea>

const clientes = [
  'Mariana Costa', 'Camila Rocha', 'Beatriz Lima', 'Fernanda Alves', 'Juliana Prado',
  'Larissa Souza', 'Patrícia Nunes', 'Renata Dias', 'Vanessa Martins', 'Aline Ferreira',
]

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-64 w-64 rounded-md shadow-[var(--shadow-inset)]">
      <div className="p-4">
        <h4 className="mb-3 text-sm font-medium">Clientes cadastradas</h4>
        {clientes.map((nome) => (
          <div key={nome}>
            <div className="py-2 text-sm">{nome}</div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
