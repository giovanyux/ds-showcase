import type { Meta, StoryObj } from '@storybook/react-vite'
import { Combobox } from '@/components/ui/combobox'

const meta: Meta<typeof Combobox> = {
  title: 'Componentes/Combobox',
  component: Combobox,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof Combobox>

const profissionais = [
  { value: 'mariana', label: 'Mariana Costa' },
  { value: 'camila', label: 'Camila Rocha' },
  { value: 'beatriz', label: 'Beatriz Lima' },
  { value: 'fernanda', label: 'Fernanda Alves' },
]

export const Default: Story = {
  render: () => (
    <Combobox
      options={profissionais}
      placeholder="Selecionar profissional"
      searchPlaceholder="Buscar profissional..."
      emptyMessage="Nenhuma profissional encontrada."
    />
  ),
}
