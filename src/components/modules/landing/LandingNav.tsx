import { Link } from 'react-router-dom'

import { Button } from '@forms/button'
import { ThemeToggle } from '@modules/theme/theme-toggle'
import { SVGLogo } from '@ui/svg-logo'

const LandingNav: React.FC = () => {
  return (
    <div className="bg-primary">
      <nav className="w-3/4 h-16  mx-auto flex items-center justify-between">
        <Link to="/" className="mx-5 flex items-center gap-2 text-white">
          <SVGLogo className="w-9" />
          <span>StockStores</span>
        </Link>

        <ul className="flex items-center gap-4 mx-5 text-white">
          <li>
            <a
              href="#stores"
              className="hover:bg-white hover:text-primary text-sm font-medium h-10 px-4 py-2 rounded-md transition-all duration-150 ease-in-out"
            >
              Tienda
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="hover:bg-white hover:text-primary text-sm font-medium h-10 px-4 py-2 rounded-md transition-all duration-150 ease-in-out"
            >
              Servicios
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:bg-white hover:text-primary text-sm font-medium h-10 px-4 py-2 rounded-md transition-all duration-150 ease-in-out"
            >
              Contacto
            </a>
          </li>
          <li>
            <Link to="/login">
              <Button className="text-white hover:bg-white hover:text-primary">
                Ingresar
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <Button className="text-white hover:bg-white hover:text-primary">
                Registrar
              </Button>
            </Link>
          </li>
          <ThemeToggle />
        </ul>
      </nav>
    </div>
  )
}

export { LandingNav }
