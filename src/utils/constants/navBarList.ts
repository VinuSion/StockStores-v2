import {
  Store,
  LayoutDashboard,
  Receipt,
  UserRound,
} from 'lucide-react'

interface MenuItem {
  to: string
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export const menuItems: MenuItem[] = [
  { to: '/account', label: 'Cuenta', icon: UserRound },
  { to: '/stores', label: 'Tiendas', icon: Store },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/orders', label: 'Pedidos', icon: Receipt },
]
