import { Link } from 'react-router-dom'
import { ShoppingCart, ArrowRight } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui/dialog'
import { Ping } from '@ui/ping'
import { Button } from '@forms/button'

import { useShoppingCartStore } from '@/store'

const CartButton: React.FC = () => {
  const { isCartEmpty } = useShoppingCartStore()

  return (
    <Dialog>
      <DialogTrigger>
        <div className="absolute right-0 bottom-20 m-4 shadow-xl bg-primary rounded-md md:static md:shadow-none md:m-0 md:bg-transparent">
          <Ping enabled={!isCartEmpty()}>
            <div className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible-ring disabled:cursor-not-allowed disabled:opacity-50 bg-transparent hover:bg-accent hover:text-primary w-14 h-14 p-2 text-primary-foreground border-2 border-primary md:w-auto md:h-auto md:text-foreground md:border md:border-accent md:px-4">
              <ShoppingCart className="md:svg-size" />
              <span className="hidden md:flex">Carrito</span>
            </div>
          </Ping>
        </div>
      </DialogTrigger>
      <DialogContent className="w-11/12 sm:w-full rounded-md">
        <DialogHeader className="gap-1.5">
          <DialogTitle className="text-left flex flex-row items-center gap-1.5">
            <ShoppingCart className="svg-size" />
            Carrito de Compras
          </DialogTitle>
          <DialogDescription className="text-left text-xs sm:text-sm">
            {!isCartEmpty() ? (
              <div>Aqui estan tus productos:</div>
            ) : (
              <div className="flex flex-col gap-3 my-3">
                <span className="text-sm md:text-base">Aun no tienes productos en tu carrito.</span>
                <Link to="/stores" className="w-fit">
                  <Button iconRight icon={<ArrowRight className="svg-size" />}>
                    Ir a Tiendas
                  </Button>
                </Link>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        {!isCartEmpty() && <div>Cart items</div>}
      </DialogContent>
    </Dialog>
  )
}

export { CartButton }
