import { CircleX, CreditCard, CircleCheck, Ban, Bike } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@ui/dialog'
import { Button } from '@forms/button'
import { OrderActionProps } from '@utils/types/order.types'

import { useUpdateOrder } from '@services/orderService/useUpdateOrder'

const OrderActions: React.FC<OrderActionProps> = ({
  isSeller,
  orderStatus,
}) => {
  const { updateOrder, isPending } = useUpdateOrder()

  const renderNonSellerActions = () => (
    <div className="grid grid-cols-1 gap-3 mt-5 xl:grid-cols-2">
      {orderStatus === 'Awaiting Seller Approval' && (
        <div className="flex justify-center w-full text-sm p-2 rounded-md bg-accent text-primary font-semibold select-none pointer-events-none">
          Esperando Aprobacion del Vendedor
        </div>
      )}
      {orderStatus === 'Waiting for Delivery' && (
        <div className="flex justify-center w-full text-sm p-2 rounded-md bg-accent text-primary font-semibold select-none pointer-events-none">
          Esperando Envio
        </div>
      )}
      {orderStatus === 'Waiting for Payment' && (
        <Button
          type="button"
          className="w-full bg-blue-600 text-white hover:bg-blue-800"
          icon={<CreditCard className="svg-size" />}
          onClick={() => updateOrder('Waiting for Delivery')}
          isLoading={isPending}
        >
          Realizar Pago
        </Button>
      )}
      <Dialog>
        <DialogTrigger className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible-ring disabled:cursor-not-allowed disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/80 focus-visible:ring-destructive h-10 w-full">
          <CircleX className="svg-size" />
          Cancelar Pedido
        </DialogTrigger>
        <DialogContent className="w-11/12 sm:w-full rounded-md">
          <DialogHeader className="gap-1.5">
            <DialogTitle className="text-left flex flex-row items-center gap-1.5">
              <CircleX className="svg-size" />
              ¿Cancelar Este Pedido?
            </DialogTitle>
            <DialogDescription className="text-left text-xs sm:text-sm">
              Esta acción es irreversible. Al continuar, el pedido se eliminará
              de tu lista y notificaremos al vendedor sobre tu decisión.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 sm:gap-1">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cerrar
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              icon={<CircleX className="svg-size" />}
              onClick={() => updateOrder('Cancelled')}
              isLoading={isPending}
            >
              Cancelar Pedido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )

  const renderSellerActions = () => (
    <div className={`${orderStatus === "Awaiting Seller Approval" ? "grid grid-cols-1 xl:grid-cols-2" : "flex w-full"} gap-3 mt-5`}>
      {orderStatus === 'Awaiting Seller Approval' && (
        <>
          <Button
            type="button"
            className="w-full"
            icon={<CircleCheck className="svg-size" />}
            onClick={() => updateOrder('Waiting for Payment')}
            isLoading={isPending}
          >
            Aceptar Pedido
          </Button>
          <Dialog>
            <DialogTrigger className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible-ring disabled:cursor-not-allowed disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/80 focus-visible:ring-destructive h-10 w-full">
              <Ban className="svg-size" />
              Rechazar Pedido
            </DialogTrigger>
            <DialogContent className="w-11/12 sm:w-full rounded-md">
              <DialogHeader className="gap-1.5">
                <DialogTitle className="text-left flex flex-row items-center gap-1.5">
                  <Ban className="svg-size" />
                  ¿Rechazar Este Pedido?
                </DialogTitle>
                <DialogDescription className="text-left text-xs sm:text-sm">
                  Esta acción es irreversible. Al continuar, el pedido se
                  eliminará de tu tienda y notificaremos al usuario sobre tu
                  decisión.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-3 sm:gap-1">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cerrar
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  variant="destructive"
                  icon={<Ban className="svg-size" />}
                  onClick={() => updateOrder('Rejected by Seller')}
                  isLoading={isPending}
                >
                  Rechazar Pedido
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
      {orderStatus === 'Waiting for Payment' && (
        <div className="flex justify-center w-full text-sm p-2 rounded-md bg-accent text-primary font-semibold select-none pointer-events-none">
          Esperando Pago del Usuario
        </div>
      )}
      {orderStatus === 'Waiting for Delivery' && (
        <Button
          type="button"
          className="w-full bg-amber-600 text-white hover:bg-amber-700"
          icon={<Bike className="svg-size" />}
          onClick={() => updateOrder('Delivered')}
          isLoading={isPending}
        >
          Realizar Envio
        </Button>
      )}
    </div>
  )

  return <>{isSeller ? renderSellerActions() : renderNonSellerActions()}</>
}

export { OrderActions }
