import { Receipt } from 'lucide-react'

import { AuthLayout } from '@pages/layouts/AuthLayout'
import { OrderCard } from '@modules/auth/orders/OrderCard'
import { useGetUserOrders } from '@services/orderService/useGetUserOrders'

import { useUserStore } from '@/store'

const Orders: React.FC = () => {
  const { userData } = useUserStore()
  const { isLoading, isError, data, error } = useGetUserOrders()

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <p>{error!.message}</p>
  }

  console.log(data)

  return (
    <section className="my-5">
      {userData?.isSeller && (
        <div>Aqui estan tus tiendas para ver tus pedidos</div>
      )}
      <div className="flex gap-2 items-center px-4 md:px-8 py-5">
        <Receipt />
        <h1 className="text-2xl md:text-3xl font-extrabold">Tus Pedidos</h1>
      </div>
      <p className="w-full px-4 md:px-8 text-sm mb-5 text-muted-foreground">
        Debajo encontrarás un listado de todos los pedidos que has realizado.
        Podrás consultar su información y actualizar el estado de tus pedidos
        pendientes.
      </p>
      {data?.length === 0 ? (
        <div className="flex justify-center w-full px-4 md:px-8">
          <p className="font-semibold text-lg text-primary">
            Aún no tienes pedidos realizados. ¡Compra en tu tienda favorita
            ahora!
          </p>
        </div>
      ) : (
        <div className="my-3 grid grid-cols-1 xl:grid-cols-2 gap-8 w-full px-4 md:px-8">
          {data?.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))}
        </div>
      )}
    </section>
  )
}

export default AuthLayout(Orders)
