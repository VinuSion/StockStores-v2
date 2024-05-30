import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShoppingCart,
  CreditCard,
  ArrowRight,
  Plus,
  Minus,
  RefreshCcw,
  Trash2,
} from 'lucide-react'

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

import { ICartItemProps } from '@utils/types/cart.types'
import { formatPrice } from '@utils/numberMethods'
import { truncateString } from '@/utils/stringMethods'
import { FALLBACK_IMAGE } from '@utils/constants/errorMessages'

import { useShoppingCartStore } from '@/store'

const CartButton: React.FC = () => {
  const [cartDialog, setCartDialogOpen] = useState<boolean>(false)
  const { cart, isCartEmpty, clearCart } = useShoppingCartStore()

  return (
    <Dialog open={cartDialog} onOpenChange={setCartDialogOpen}>
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
          {isCartEmpty() && (
            <DialogDescription className="flex flex-col gap-1 text-left text-xs sm:text-sm">
              <span className="text-sm md:text-base">
                Aún no tienes productos en tu carrito. ¡Comienza comprar de tu
                tienda favorita!
              </span>
              <Link to="/stores">
                <Button
                  type="button"
                  variant="link"
                  className="w-fit px-0"
                  iconRight
                  icon={<ArrowRight className="svg-size" />}
                  onClick={() => setCartDialogOpen(false)}
                >
                  Ir a Tiendas
                </Button>
              </Link>
            </DialogDescription>
          )}
        </DialogHeader>
        {!isCartEmpty() && (
          <div className="flex flex-col gap-3">
            <span className="text-sm text-muted-foreground">
              Añade productos a tu carrito de compras. Cuando estés listo para
              finalizar tu compra, procede al pago.
            </span>
            <div className="flex flex-col gap-2 mt-3 border-2 border-primary rounded-md p-1 overflow-y-scroll max-h-96">
              {cart.map((cartItem, index) => (
                <CartItemCard key={index} cartItem={cartItem} />
              ))}
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-muted-foreground">
                ¿Cambiaste de opinión?
              </span>
              <Button
                type="button"
                variant="link"
                className="my-2"
                icon={<RefreshCcw className="svg-size" />}
                onClick={() => clearCart()}
              >
                Vacear Carrito
              </Button>
            </div>
            <Link to="/orders/new" className="w-full sm:w-fit">
              <Button
                type="button"
                icon={<CreditCard className="svg-size" />}
                className="w-full sm:w-fit"
                onClick={() => setCartDialogOpen(false)}
              >
                Proceder al Pago
              </Button>
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

const CartItemCard: React.FC<ICartItemProps> = ({ cartItem }) => {
  const { incrementQuantity, decrementQuantity, removeProduct } =
    useShoppingCartStore()

  return (
    <div className="flex justify-between p-2 gap-3 rounded-md border-2 border-accent shadow-lg">
      <div className="flex gap-3">
        <img
          className="hidden sm:flex aspect-square object-cover max-h-20 rounded-md p-1 border-2 border-primary"
          src={`${cartItem?.product?.leadImageURL || FALLBACK_IMAGE}`}
          alt={`${cartItem?.product?.productName} photo`}
        />
      </div>
      <div className="flex flex-col justify-between gap-1 w-full sm:justify-normal">
        <div className="flex flex-col gap-2">
          <span className="flex text-md font-semibold sm:hidden">
            {truncateString(cartItem?.product?.productName, 14)}
          </span>
          <span className="hidden text-md font-semibold sm:flex">
            {cartItem?.product?.productName}
          </span>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-3">
            <p>
              ${formatPrice(cartItem?.product?.productPrice || 0)}
              <span className="text-primary font-normal text-xs mx-1">COP</span>
            </p>
            <Button
              variant="destructive"
              size="icon"
              className="w-7 h-6"
              icon={<Trash2 className="h-4 w-4" />}
              onClick={() => removeProduct(cartItem?.product?._id)}
            />
          </div>
          <div className="flex items-center gap-2 -mt-7 sm:-mt-4">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 sm:h-10 sm:w-10"
              icon={<Minus className="h-4 w-4 sm:svg-size" />}
              disabled={cartItem?.quantity === 1}
              onClick={() => decrementQuantity(cartItem?.product?._id)}
            />
            <span className="flex justify-center items-center font-bold text-primary text-md h-5 w-5">
              {cartItem?.quantity}
            </span>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 sm:h-10 sm:w-10"
              icon={<Plus className="h-4 w-4 sm:svg-size" />}
              disabled={cartItem?.quantity === cartItem?.product?.stockAmount}
              onClick={() => incrementQuantity(cartItem?.product?._id)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { CartButton }
