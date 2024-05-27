import React from 'react'

import { Link } from 'react-router-dom'
import { SVGLogo } from '@ui/svg-logo'

const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto py-14 px-6">
        <div className="grid md:grid-cols-12 grid-cols-2 gap-7">
          <div className="lg:col-span-4 col-span-12">
            <div className="flex items-center">
              <SVGLogo className="w-28" />
              <h3 className="px-2 text-5xl font-bold">StockStores</h3>
            </div>
            <p className="mt-4">
              Este proyecto es de caracter academico como idea para brindar una
              herramienta tecnologica dirigida a las tiendas de barrio. Todo el
              contenido de esta pagina es meramente ilustrativo.
            </p>
          </div>
          <div className="lg:col-span-2 md:col-span-4 col-span-12">
            <h5 className="tracking-wide font-semibold">Empresa</h5>
            <ul className="list-none mt-6 space-y-2">
              <li>
                <Link to="#">Acerca de Nosotros</Link>
              </li>
              <li>
                <Link to="#">Conoce nuestro equipo</Link>
              </li>
              <li>
                <Link to="#">Sede Central</Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 md:col-span-4 col-span-12">
            <h5 className="tracking-wide font-semibold">Marco legal</h5>
            <ul className="list-none mt-6 space-y-2">
              <li>
                <Link to="#">Accesibilidad</Link>
              </li>
              <li>
                <Link to="#">Términos y Condiciones</Link>
              </li>
              <li>
                <Link to="#">Política de Privacidad</Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 md:col-span-4 col-span-12">
            <h5 className="tracking-wide font-semibold">Soporte</h5>
            <ul className="list-none mt-6 space-y-2">
              <li>
                <Link to="#">Contacto</Link>
              </li>
              <li>
                <Link to="#">Preguntas frecuentes</Link>
              </li>
              <li>
                <Link to="#">Chat IA</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-background">
        <div className="md:text-left text-center container mx-auto py-7 px-6">
          <p className="mb-0 font-light text-sm">
            © 2024 - StockStores | Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}

export { LandingFooter }
