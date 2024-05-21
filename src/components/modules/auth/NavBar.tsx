import { Link, useLocation } from 'react-router-dom'
import { SquareUserRound } from 'lucide-react'

import { SVGFullLogo } from '@ui/svg-logo'
import { menuItems } from '@utils/constants/navBarList'

const NavBar: React.FC = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <aside className="h-20 w-screen fixed bottom-0 z-50 bg-background flex flex-col border-t-2 md:h-full md:w-72 md:bottom-auto md:border-t-0 md:border-r-2">
      <div className="p-6 hidden md:flex">
        <SVGFullLogo primaryAccent />
      </div>
      <nav className="flex-1 md:p-4">
        <ul className="h-full flex justify-center gap-3 md:justify-normal md:flex-col md:gap-2">
          {menuItems.map((menuItem, index) => (
            <li
              key={index}
              className={`h-full flex items-center md:h-auto ${
                menuItem.to === '/account' && 'md:hidden'
              }`}
            >
              <Link
                to={menuItem.to}
                className={`w-full flex flex-col items-center gap-2 p-2 rounded-md transition-all ease-in-out delay-50 md:flex-row ${
                  isActive(menuItem.to)
                    ? 'bg-primary/20 text-primary active:bg-accent md:hover:bg-accent'
                    : 'active:bg-accent active:text-primary md:hover:bg-accent md:hover:text-primary'
                }`}
              >
                <menuItem.icon className="svg-size" />
                <span
                  className={`text-xs md:text-base ${
                    isActive(menuItem.to) && 'font-bold'
                  }`}
                >
                  {menuItem.label}
                </span>
              </Link>
            </li>
          ))}
          {isActive('/account') && (
            <li className="hidden h-auto items-center md:flex">
              <Link
                to="/account"
                className="w-full flex flex-col items-center gap-2 p-2 rounded-md transition-all ease-in-out delay-50 md:flex-row bg-primary/20 text-primary active:bg-accent md:hover:bg-accent"
              >
                <SquareUserRound className="svg-size" />
                <span className="text-xs md:text-base font-bold">
                  Mi Cuenta
                </span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  )
}

export { NavBar }
