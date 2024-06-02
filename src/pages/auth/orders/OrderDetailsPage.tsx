import { Link } from 'react-router-dom'
import {
  ShoppingBag,
  Mail,
  CircleUserRound,
  Phone,
  Truck,
  StoreIcon,
  ShoppingBasket,
  ReceiptText,
  PackageCheck,
} from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ui/breadcrumb'
import { Badge } from '@ui/badge'
import { Separator } from '@ui/separator'
import { OrderStatusBadge } from '@ui/order-status'
import { Button } from '@forms/button'
import { AuthLayout } from '@pages/layouts/AuthLayout'
import { OrderItemCard } from '@modules/auth/orders/OrderItemCard'
import { OrderActions } from '@modules/auth/orders/OrderActions'
import { formatPhoneNumber, formatDate } from '@utils/stringMethods'
import { formatPrice } from '@utils/numberMethods'
import { FALLBACK_IMAGE } from '@utils/constants/errorMessages'

import { useGetOrder } from '@services/orderService/useGetOrder'
import { useUserStore } from '@/store'

const OrderDetailsPage: React.FC = () => {
  const { userData } = useUserStore()
  const { isLoading, isError, data, error } = useGetOrder()

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
            {userData?.isSeller && (
              <>
                <BreadcrumbItem>
                  <Link
                    to={`/orders/${data?.storeSlug}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {data?.storeName}
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{data?._id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="w-full px-4 md:px-8">
        <div className="flex flex-wrap items-center gap-3 w-full pb-3">
          <h1 className="text-2xl md:text-3xl font-bold">
            Pedido - {data?._id}
          </h1>
          <OrderStatusBadge status={data?.orderStatus!} />
        </div>
        <div className="grid grid-cols-1 gap-5 h-full xl:gap-6 xl:grid-cols-5 my-3">
          <div className="flex flex-col gap-2 xl:col-span-3">
            <div className="flex flex-col gap-3">
              <Link to={`/stores/${data?.storeSlug}`}>
                <Badge
                  className="rounded-sm text-lg font-bold hover:text-primary h-full"
                  variant="secondary"
                  icon={<StoreIcon className="h-4 w-4 mr-1" />}
                >
                  {data?.storeName}
                </Badge>
              </Link>
              <img
                className="aspect-video object-cover rounded-md outline outline-primary outline-offset-2 shadow-lg"
                src={`${data?.storeImageURL || FALLBACK_IMAGE}`}
                alt={`${data?.storeName} photo`}
              />
            </div>
            {!userData?.isSeller && (
              <div className="flex flex-col justify-between gap-3 mt-3 h-full xl:col-span-2 xl:flex-row">
                <p className="text-muted-foreground text-sm w-full">
                  Los pedidos pueden cambiar según el criterio del vendedor, lo
                  que puede hacer que desaparezcan de tu lista si son
                  rechazados. De igual forma, si tú cancelas un pedido, también
                  desaparecerá de tu lista.
                </p>
                <Link to={`/stores/${data?.storeSlug}/products`}>
                  <Button
                    type="button"
                    className="w-full"
                    icon={<ShoppingBasket className="svg-size" />}
                  >
                    Volver a Comprar
                  </Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 xl:col-span-2">
            <div className="flex gap-2 items-center">
              <ReceiptText className="svg-size" />
              <h4 className="text-lg font-bold w-max">Detalles del Pedido</h4>
            </div>
            <div className="flex flex-col gap-2 my-3">
              <div className="flex justify-between">
                <span className="font-bold">Pagado:</span>
                <span className="text-muted-foreground">
                  {data?.paidAt ? `${formatDate(data?.paidAt)}` : 'Sin Pagar'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Enviado:</span>
                <span className="text-muted-foreground">
                  {data?.deliveredAt
                    ? `${formatDate(data?.deliveredAt)}`
                    : 'Sin Enviar'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Metodo de Pago:</span>
                <span className="text-muted-foreground">
                  {data?.paymentMethod}
                </span>
              </div>
            </div>
            {data?.orderStatus !== 'Delivered' && (
              <>
                <Separator />
                <div
                  className={`p-2 rounded-md border-2 ${
                    userData?.isSeller ? 'border-primary' : 'border-accent'
                  } mt-3`}
                >
                  <div className="flex gap-2 items-center">
                    <PackageCheck className="svg-size" />
                    <span className="text-md font-semibold w-max">
                      Acciones del Pedido
                    </span>
                  </div>
                  <div className="flex w-full my-2">
                    <p className="text-sm w-full text-muted-foreground">
                      {userData?.isSeller
                        ? 'Como vendedor, puedes rechazar o aceptar pedidos. Cada acción generará un seguimiento hasta completarse, y te proporcionaremos el estado actual para mantenerte informado.'
                        : 'Puedes cancelar tu pedido en cualquier momento. Recuerda que los pedidos pendientes necesitan de tu atención para realizar el pago, y luego notificaremos al vendedor para que envíe tus productos lo antes posible.'}
                    </p>
                  </div>
                  <OrderActions
                    isSeller={userData?.isSeller!}
                    orderStatus={data?.orderStatus!}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <Separator className="my-5" />
        <div className="grid grid-cols-1 gap-5 h-full xl:gap-6 xl:grid-cols-5 my-3">
          <div className="flex flex-col gap-1 xl:col-span-3">
            <div className="flex gap-2 items-center">
              <ShoppingBag className="svg-size" />
              <h4 className="text-lg font-bold w-max">Items del Pedido</h4>
            </div>
            <div className="flex flex-col gap-2 mt-3 border-2 border-accent rounded-md p-1 max-h-full xl:overflow-y-scroll xl:max-h-[600px]">
              {data?.orderItems?.map((orderItem, index) => (
                <OrderItemCard
                  key={index}
                  orderItem={orderItem}
                  storeSlug={data?.storeSlug}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1 xl:col-span-2">
            <div className="flex gap-2 items-center">
              <Truck className="svg-size" />
              <h4 className="text-lg font-bold w-max">Direccion de Envio</h4>
            </div>
            <div className="flex flex-col gap-2 mt-3 rounded-md shadow-lg border-2 border-primary p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Mail className="svg-size" />
                <span className="text-md font-bold w-max">
                  {data?.shippingAddress?.address}
                </span>
                <Badge>{`${data?.shippingAddress?.city}, ${data?.shippingAddress?.department}`}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <CircleUserRound className="svg-size" />
                <span className="text-base font-semibold w-max">
                  {data?.shippingAddress?.fullName}
                </span>
              </div>
              <Link
                to={`tel:+57${data?.shippingAddress?.contactPhoneNumber}`}
                className="transition-all duration-150 ease-in-out w-fit flex items-center gap-2 py-1 px-2 rounded-md bg-transparent active:bg-accent active:text-primary md:hover:bg-accent md:hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                <span>
                  +57{' '}
                  {`${formatPhoneNumber(
                    data?.shippingAddress?.contactPhoneNumber!
                  )}` || 'N/A'}
                </span>
              </Link>
            </div>
            <Separator className="my-3 mt-5" />
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-xl font-bold">Subtotal:</span>
                <p className="text-xl font-bold">
                  ${formatPrice(data?.itemsPrice || 0)}
                  <span className="text-primary font-normal text-sm mx-1">
                    COP
                  </span>
                </p>
              </div>
              <div className="flex justify-between">
                <span className="text-xl font-bold">Precio de Envio:</span>
                <p className="text-xl font-bold">
                  ${formatPrice(data?.shippingPrice || 0)}
                  <span className="text-primary font-normal text-sm mx-1">
                    COP
                  </span>
                </p>
              </div>
              <Separator className="my-3 mt-5" />
              <div className="flex justify-between text-primary">
                <span className="text-xl font-bold">PRECIO TOTAL:</span>
                <p className="text-xl font-bold">
                  ${formatPrice(data?.totalPrice || 0)}
                  <span className="font-normal text-sm mx-1">COP</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthLayout(OrderDetailsPage)
