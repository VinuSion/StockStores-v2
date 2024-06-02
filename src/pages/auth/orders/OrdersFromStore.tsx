import { Link } from 'react-router-dom'
import { ReceiptText, CircleArrowOutUpRight } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ui/breadcrumb'
import { Separator } from '@ui/separator'
import { OrderCard } from '@modules/auth/orders/OrderCard'
import { AuthLayout } from '@pages/layouts/AuthLayout'

import { useOrderListGrouping } from '@hooks/useOrderListGrouping'
import { useGetStoreOrders } from '@services/orderService/useGetStoreOrders'

const OrdersFromStore: React.FC = () => {
  const { isLoading, isError, data, error } = useGetStoreOrders()
  const { pendingOrders, completedOrders } =
    data && data?.orders?.length > 0
      ? useOrderListGrouping(data?.orders!)
      : { pendingOrders: [], completedOrders: [] }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <p>{error!.message}</p>
  }

  return (
    <section className="my-5 pb-5">
      <div className="flex flex-col gap-5 px-4 md:px-8 py-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link
                to="/orders"
                className="transition-colors hover:text-foreground"
              >
                Pedidos
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.storeName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="w-full px-4 md:px-8">
        <div className="flex flex-wrap items-center gap-3 w-full pb-3">
          <h1 className="text-2xl md:text-3xl font-bold">
            Pedidos - {data?.storeName}
          </h1>
        </div>
      </div>
      {data?.orders?.length === 0 ? (
        <div className="flex justify-center w-full px-4 md:px-8">
          <p className="font-semibold text-lg text-primary">
            Esta tienda aún no tiene pedidos realizados.
          </p>
        </div>
      ) : (
        <>
          {pendingOrders.length !== 0 && (
            <>
              <div className="my-3 w-full px-4 md:px-8">
                <div className="flex gap-2 items-center my-3">
                  <CircleArrowOutUpRight className="svg-size" />
                  <h2 className="text-xl font-bold">Pedidos Pendientes</h2>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {pendingOrders.map((order, index) => (
                    <OrderCard key={index} order={order} />
                  ))}
                </div>
              </div>
              <div className="px-4 md:px-8">
                <Separator className="my-5" />
              </div>
            </>
          )}
          <div className="my-3 w-full px-4 md:px-8">
            <div className="flex gap-2 items-center my-3">
              <ReceiptText className="svg-size" />
              <h2 className="text-xl font-bold">Historial de Pedidos</h2>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {completedOrders.length === 0 ? (
                <p className="w-full text-primary font-semibold">
                  Esta tienda aun no tiene pedidos completados.
                </p>
              ) : (
                completedOrders.map((order, index) => (
                  <OrderCard key={index} order={order} />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default AuthLayout(OrdersFromStore)
