import { useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@hooks/useToast'
import { request } from '@utils/RequestGenerator'
import { ORDERS_ENDPOINT, Order, OrderStatus } from '@/utils/types/order.types'
import { API_ERROR_DEFAULT_MESSAGE } from '@utils/constants/errorMessages'

const useUpdateOrder = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { mutate: updateOrder, isPending } = useMutation({
    mutationFn: (orderStatus: OrderStatus) => {
      const data: {
        orderStatus: OrderStatus
        paidAt?: string
        deliveredAt?: string
      } = { orderStatus }

      if (orderStatus === 'Waiting for Delivery') {
        data.paidAt = new Date().toISOString()
      } else if (orderStatus === 'Delivered') {
        data.deliveredAt = new Date().toISOString()
      }

      return request<Order>({
        url: `${ORDERS_ENDPOINT}/update/${orderId}`,
        method: 'PUT',
        data: data,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [`order-${orderId}`],
      })
      let toastMessage = ''
      switch (data.orderStatus) {
        case 'Waiting for Payment':
          toastMessage =
            '💳 El estado del pedido ha cambiado a "Esperando Pago".'
          break
        case 'Waiting for Delivery':
          toastMessage =
            '📦 El estado del pedido ha cambiado a "Esperando Envio".'
          break
        case 'Delivered':
          toastMessage = '🚚 El pedido ha sido enviado.'
          break
        case 'Cancelled':
          toastMessage = '❌ Has cancelado este pedido.'
          break
        case 'Rejected by Seller':
          toastMessage = '⚠️ Has rechazado este pedido.'
          break
        default:
          toastMessage = 'El estado del pedido ha sido actualizado.'
      }
      toast({
        title: 'Estado del Pedido Actualizado',
        description: toastMessage,
      })
      if (
        data.orderStatus === 'Cancelled' ||
        data.orderStatus === 'Rejected by Seller'
      ) {
        navigate('/orders')
      }
    },
    onError: (error) =>
      toast({
        title: `❌ Error al Actualizar el Pedido`,
        description: `Error: ${error?.message || API_ERROR_DEFAULT_MESSAGE}`,
      }),
  })

  return {
    updateOrder,
    isPending,
  }
}

export { useUpdateOrder }
