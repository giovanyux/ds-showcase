import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const meta: Meta<typeof NavigationMenu> = {
  title: 'Componentes/NavigationMenu',
  component: NavigationMenu,
  parameters: { layout: 'centered' },
}
export default meta
type Story = StoryObj<typeof NavigationMenu>

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-64 gap-1 p-3">
              <li>
                <NavigationMenuLink className="block rounded-md px-3 py-2 text-sm hover:bg-accent">
                  Corte e escova
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink className="block rounded-md px-3 py-2 text-sm hover:bg-accent">
                  Coloração
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink className="block rounded-md px-3 py-2 text-sm hover:bg-accent">
                  Manicure e pedicure
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Sobre o Studio Bela
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
