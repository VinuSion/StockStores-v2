import { Link } from 'react-router-dom'
import {
  Store,
  ShoppingBag,
  Truck,
  Mail,
  CircleUserRound,
  Phone,
} from 'lucide-react'

import { Badge } from '@ui/badge'
import { Separator } from '@ui/separator'
import { OrderItemCard } from '@modules/auth/orders/OrderItemCard'
import { ShippingAddressForm } from '@modules/auth/shipping/ShippingAddressForm'
import { formatPhoneNumber } from '@utils/stringMethods'
import { formatPrice } from '@utils/numberMethods'

import { useStoreFromOrder } from '@services/orderService/useStoreFromOrder'
import { useOrderDetails } from '@services/orderService/useOrderDetails'

import { useShippingAddressStore } from '@/store'

const DescribeOrder: React.FC = () => {
  const { isLoading, isError, data, error } = useStoreFromOrder()
  const { orderItems, itemsPrice, shippingPrice, totalPrice } =
    useOrderDetails()
  const { shippingAddresses, isShippingSet } = useShippingAddressStore()

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <p>{error!.message}</p>
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-5 items-center">
        <div className="flex gap-2 items-center p-2 bg-accent text-primary rounded-md">
          <Store className="svg-size" />
          <h3 className="text-xl font-bold w-max">{data?.storeName}</h3>
        </div>
        <div className="hidden md:flex w-full">
          <Separator />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 h-full xl:gap-8 xl:grid-cols-2">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <ShoppingBag className="svg-size" />
            <h4 className="text-lg font-bold w-max">Items del Pedido</h4>
          </div>
          <div className="flex flex-col gap-2 mt-3 border-2 border-accent rounded-md p-1 max-h-full xl:overflow-y-scroll xl:max-h-[600px]">
            {orderItems.map((orderItem, index) => (
              <OrderItemCard key={index} orderItem={orderItem} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Truck className="svg-size" />
            <h4 className="text-lg font-bold w-max">Direccion de Envio</h4>
          </div>
          <div className="flex flex-col gap-2 mt-3 border-2 border-accent rounded-md p-1 w-full">
            {isShippingSet() ? (
              <div className="flex flex-col sm:m-4">
                <div className="flex flex-col gap-2 rounded-md shadow-lg border-2 border-primary p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Mail className="svg-size" />
                    <span className="text-md font-bold w-max">
                      {shippingAddresses[0]?.address}
                    </span>
                    <Badge>{`${shippingAddresses[0]?.city}, ${shippingAddresses[0]?.department}`}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleUserRound className="svg-size" />
                    <span className="text-base font-semibold w-max">
                      {shippingAddresses[0]?.fullName}
                    </span>
                  </div>
                  <Link
                    to={`tel:+57${shippingAddresses[0]?.contactPhoneNumber}`}
                    className="transition-all duration-150 ease-in-out w-fit flex items-center gap-2 py-1 px-2 rounded-md bg-transparent active:bg-accent active:text-primary md:hover:bg-accent md:hover:text-primary"
                  >
                    <Phone className="h-4 w-4" />
                    <span>
                      +57{' '}
                      {`${formatPhoneNumber(
                        shippingAddresses[0]?.contactPhoneNumber!
                      )}` || 'N/A'}
                    </span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <ShippingAddressForm />
              </div>
            )}
          </div>
          <Separator className="my-3" />
          {isShippingSet() && (
            <div className="flex flex-col gap-2 px-1 sm:px-6">
              <div className="flex justify-between">
                <span className="text-xl font-bold">Subtotal:</span>
                <p className="text-xl font-bold">
                  ${formatPrice(itemsPrice || 0)}
                  <span className="text-primary font-normal text-sm mx-1">
                    COP
                  </span>
                </p>
              </div>
              <div className="flex justify-between">
                <span className="text-xl font-bold">Precio de Envio:</span>
                <p className="text-xl font-bold">
                  ${formatPrice(shippingPrice || 0)}
                  <span className="text-primary font-normal text-sm mx-1">
                    COP
                  </span>
                </p>
              </div>
              <Separator className="my-3 mt-5" />
              <div className="flex justify-between text-primary">
                <span className="text-xl font-bold">PRECIO TOTAL:</span>
                <p className="text-xl font-bold">
                  ${formatPrice(totalPrice || 0)}
                  <span className="font-normal text-sm mx-1">
                    COP
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { DescribeOrder }
