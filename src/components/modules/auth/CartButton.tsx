import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, CreditCard, ArrowRight, Plus, Minus } from 'lucide-react'

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

import { ICartItem } from '@utils/types/cart.types'
import { formatPrice } from '@utils/numberMethods'
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
            <div className="flex flex-col gap-2 overflow-y-scroll max-h-96">
              {cart.map((cartItem, index) => (
                <CartItemCard key={index} cartItem={cartItem} />
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              className="my-2"
              onClick={() => clearCart()}
            >
              Vacear Carrito
            </Button>
            <Button
              type="button"
              icon={<CreditCard className="svg-size" />}
              className="w-full sm:w-fit"
            >
              Proceder al Pago
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

const CartItemCard: React.FC<ICartItem> = ({ cartItem }) => {
  const { incrementQuantity, decrementQuantity } = useShoppingCartStore()

  return (
    <div className="flex justify-between p-2 gap-3 rounded-md border-2 border-accent shadow-lg">
      <div className="flex gap-3">
        <img
          className="aspect-square object-cover max-h-20 rounded-md p-1 border-2 border-primary"
          src={`${cartItem?.product?.leadImageURL || FALLBACK_IMAGE}`}
          alt={`${cartItem?.product?.productName} photo`}
        />
        <div className="flex flex-col gap-2">
          <span className="text-md font-semibold">
            {cartItem?.product?.productName}
          </span>
          <p className="flex items-center">
            ${formatPrice(cartItem?.product?.productPrice || 0)}
            <span className="text-primary font-normal text-xs mx-1">COP</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="outline"
          icon={<Minus className="svg-size" />}
          disabled={cartItem?.quantity === 1}
          onClick={() => decrementQuantity(cartItem?.product?._id)}
        />
        <span className="flex justify-center items-center font-bold text-primary text-md h-5 w-5">
          {cartItem?.quantity}
        </span>
        <Button
          size="icon"
          variant="outline"
          icon={<Plus className="svg-size" />}
          disabled={cartItem?.quantity === cartItem?.product?.stockAmount}
          onClick={() => incrementQuantity(cartItem?.product?._id)}
        />
      </div>
    </div>
  )
}

export { CartButton }
