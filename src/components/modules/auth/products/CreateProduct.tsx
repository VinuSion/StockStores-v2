import { Boxes } from 'lucide-react'

import { Button } from '@forms/button'

const CreateProduct: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 w-fit px-4 md:px-8 mb-5">
      <p className="text-xs md:text-sm text-muted-foreground">
        ¡Haz crecer tu negocio con más productos! Pulsa el botón "Nuevo
        Producto" y gestiona tu inventario a tu propio ritmo.
      </p>
      <Button type="button" icon={<Boxes className="svg-size" />} className="w-full md:w-fit">
        Nuevo Producto
      </Button>
    </div>
  )
}

export { CreateProduct }
