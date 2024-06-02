import { ReceiptText, CircleArrowOutUpRight } from 'lucide-react'

import { Separator } from '@ui/separator'
import { OrderCard } from '@modules/auth/orders/OrderCard'
import { IOrderListProps } from '@utils/types/order.types'

import { useOrderListGrouping } from '@hooks/useOrderListGrouping'

const ListUserOrders: React.FC<IOrderListProps> = ({ orders }) => {
  const { pendingOrders, completedOrders } = useOrderListGrouping(orders)

  return (
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
                <OrderCard key={index} order={order} isUserMadeOrder />
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
              Aun no tienes pedidos completados.
            </p>
          ) : (
            completedOrders.map((order, index) => (
              <OrderCard key={index} order={order} isUserMadeOrder />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export { ListUserOrders }
