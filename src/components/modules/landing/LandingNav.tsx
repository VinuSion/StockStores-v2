// import React from "react"
import { Link } from "react-router-dom"


import { Button } from '@forms/button'
import { ThemeToggle } from '@modules/theme/theme-toggle'
import { SVGLogo } from "@/components/ui/svg-logo"

export function LandingNav({  }) {
  return (
    <div className="bg-primary">
      <nav className="w-3/4 h-16  mx-auto flex items-center justify-between">
        <div className="mx-5 flex items-center gap-2">
          <SVGLogo className="w-9"></SVGLogo>
         <Link to="">StockStores</Link>
        </div>
        
        <ul className="flex items-center gap-4 mx-5">
          <li>
            <Link to="">Tienda</Link>
          </li>
          <li>
            <Link to="">Acerca</Link>
          </li>
          <li>
            <Link to="/login">
              <Button>Iniciar</Button>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <Button>Registrar</Button>
            </Link>
          </li>
          <ThemeToggle />
        </ul>
      </nav>
    </div>
    
  )
} 

