import { Receipt, StoreIcon } from 'lucide-react'

import { Separator } from '@ui/separator'
import { AuthLayout } from '@pages/layouts/AuthLayout'
import { ListUserOrders } from '@modules/auth/orders/ListUserOrders'
import { SellerStores } from '@modules/auth/stores/SellerStores'
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

  return (
    <section className="my-5">
      {userData?.isSeller && (
        <>
          <div className="flex gap-2 items-center px-4 md:px-8 py-3">
            <StoreIcon />
            <h1 className="text-2xl md:text-3xl font-extrabold">
              Pedidos en Tus Tiendas
            </h1>
          </div>
          <p className="w-full px-4 md:px-8 text-sm mb-5 text-muted-foreground">
            Debajo encontrarás un listado de todas tus tiendas. Podrás consultar
            los pedidos que se realizaron dentro de el y actualizar el estado de
            los pedidos pendientes.
          </p>
          <div className="my-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full px-4 md:px-8">
            <SellerStores sellerId={userData?._id!} isOrdersPage />
          </div>
          <div className="px-4 md:px-8 py-3">
            <Separator />
          </div>
        </>
      )}
      <div className="flex gap-2 items-center px-4 md:px-8 py-3">
        <Receipt />
        <h1 className="text-2xl md:text-3xl font-extrabold">Tus Pedidos</h1>
      </div>
      <p className="w-full px-4 md:px-8 text-sm mb-5 text-muted-foreground">
        Debajo encontrarás un listado de todos los pedidos que has realizado.
        Podrás consultar su información y realizar el pago de ellos.
      </p>
      {data?.length === 0 ? (
        <div className="flex justify-center w-full px-4 md:px-8">
          <p className="font-semibold text-lg text-primary">
            Aún no tienes pedidos realizados. ¡Compra en tu tienda favorita
            ahora!
          </p>
        </div>
      ) : (
        <ListUserOrders orders={data!} />
      )}
    </section>
  )
}

export default AuthLayout(Orders)
