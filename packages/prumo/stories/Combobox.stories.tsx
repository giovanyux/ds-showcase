import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxChips,
  ComboboxChipsInput,
  useComboboxAnchor,
} from '@/components/ui/combobox'

const CATEGORIAS = ['Categoria A', 'Serviços principais', 'Categoria B', 'Extras', 'Categoria C', 'Categoria D', 'Categoria E', 'Categoria F']

const meta = {
  title: 'Componentes/Combobox',
  component: Combobox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Combobox>
      <ComboboxInput placeholder="Buscar categoria..." showClear className="w-64" />
      <ComboboxContent>
        <ComboboxList>
          {CATEGORIAS.map(cat => (
            <ComboboxItem key={cat} value={cat}>{cat}</ComboboxItem>
          ))}
          <ComboboxEmpty>Nenhuma categoria encontrada.</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

export const MultiploComChips: Story = {
  name: 'Múltipla seleção com chips',
  render: function MultiChips() {
    const anchor = useComboboxAnchor()
    return (
      <Combobox multiple>
        <ComboboxChips ref={anchor} className="w-72">
          <ComboboxChipsInput placeholder="Adicionar categoria..." />
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxList>
            {CATEGORIAS.map(cat => (
              <ComboboxItem key={cat} value={cat}>{cat}</ComboboxItem>
            ))}
            <ComboboxEmpty>Nenhuma categoria encontrada.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    )
  },
}
