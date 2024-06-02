import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { request } from '@utils/RequestGenerator'
import { ORDERS_ENDPOINT, Order } from '@/utils/types/order.types'

const useGetOrder = () => {
  const { orderId } = useParams<{ orderId: string }>()

  const { isLoading, isError, data, error } = useQuery<Order, Error>({
    queryKey: [`order-${orderId}`],
    queryFn: () =>
      request<Order>({
        url: `${ORDERS_ENDPOINT}/${orderId}`,
        method: 'GET',
      }),
  })

  return { isLoading, isError, data, error }
}

export { useGetOrder }
