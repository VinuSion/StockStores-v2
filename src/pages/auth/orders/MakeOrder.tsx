import { Link } from 'react-router-dom'
import { Receipt, ArrowRight } from 'lucide-react'

import { AuthLayout } from '@pages/layouts/AuthLayout'
import { DescribeOrder } from '@modules/auth/orders/DescribeOrder'
import { Button } from '@forms/button'

import { useShoppingCartStore } from '@/store'

const MakeOrder: React.FC = () => {
  const { isCartEmpty } = useShoppingCartStore()

  return (
    <section className="my-5">
      <div className="flex gap-2 items-center px-4 md:px-8 py-5">
        <Receipt />
        <h1 className="text-2xl md:text-3xl font-extrabold">Nuevo Pedido</h1>
      </div>
      <p className="w-full px-4 md:px-8 text-sm mb-5 text-muted-foreground">
        Revisa los detalles de tu pedido y completa la información de domicilio
        y método de pago antes de enviarlo. Al finalizar, recibirás una
        confirmación por correo electrónico. Nosotros nos encargamos de
        contactar al vendedor y mantenerte informado sobre el estado de tu
        pedido.
      </p>
      <div className="my-3 w-full px-4 md:px-8">
        {isCartEmpty() ? (
          <div className="py-5 flex flex-col justify-center items-center gap-3 w-full">
            <p className="font-semibold text-lg text-primary">
              No tienes productos en el carrito para realizar un nuevo pedido.
            </p>
            <Link to="/stores">
              <Button
                type="button"
                iconRight
                icon={<ArrowRight className="svg-size" />}
              >
                Ir a Tiendas
              </Button>
            </Link>
          </div>
        ) : (
          <DescribeOrder />
        )}
      </div>
    </section>
  )
}

export default AuthLayout(MakeOrder)
