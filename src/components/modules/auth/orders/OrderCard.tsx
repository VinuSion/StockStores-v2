import { Link } from 'react-router-dom'
import { ArrowRight, StoreIcon } from 'lucide-react'

import { Badge } from '@ui/badge'
import { OrderStatusBadge } from '@ui/order-status'
import { Button } from '@forms/button'
import { formatPrice } from '@utils/numberMethods'
import { formatDate } from '@utils/stringMethods'
import { IOrderProps } from '@utils/types/order.types'

const OrderCard: React.FC<IOrderProps> = ({
  order,
  isUserMadeOrder = false,
}) => {
  return (
    <div className="p-3 border-2 rounded-md shadow-lg h-full w-full flex flex-col items-center gap-3 md:flex-row">
      <div className="flex flex-col flex-wrap gap-2 w-full">
        {isUserMadeOrder && (
          <Link to={`/stores/${order?.storeSlug}`}>
            <Badge
              className="rounded-sm hover:text-primary"
              variant="secondary"
              icon={<StoreIcon className="h-4 w-4 mr-1" />}
            >
              {order?.storeName}
            </Badge>
          </Link>
        )}
        <div className="flex flex-wrap gap-2 items-center">
          <h3 className="text-md font-semibold">Pedido - {order?._id}</h3>
          <OrderStatusBadge status={order?.orderStatus} />
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-sm font-bold bg-accent px-3 py-1 w-fit rounded-md">
            ${formatPrice(order?.totalPrice)}
            <span className="font-normal text-xs mx-1">COP</span>
          </p>
          <span className="text-sm text-muted-foreground">
            ({order?.orderItems.length}{' '}
            {order?.orderItems.length > 1 ? 'Productos' : 'Producto'})
          </span>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">
            {order.paidAt
              ? `Pagado el ${formatDate(order.paidAt)}`
              : 'Sin Pagar'}
          </span>
          <span className="text-sm text-muted-foreground">|</span>
          <span className="text-sm text-muted-foreground">
            {order.deliveredAt
              ? `Enviado el ${formatDate(order.deliveredAt)}`
              : 'Sin Enviar'}
          </span>
        </div>
      </div>
      <div className="w-full md:w-fit my-2">
        <Link
          to={`/orders/${
            isUserMadeOrder
              ? `my/${order?._id}`
              : `${order?.storeSlug}/${order?._id}`
          }`}
        >
          <Button
            type="button"
            className="w-full md:w-fit"
            iconRight
            icon={<ArrowRight className="svg-size" />}
          >
            Ver Detalles
          </Button>
        </Link>
      </div>
    </div>
  )
}

export { OrderCard }
