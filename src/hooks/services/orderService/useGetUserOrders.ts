import { useQuery } from '@tanstack/react-query'
import { request } from '@utils/RequestGenerator'
import { ORDERS_ENDPOINT, Order } from '@utils/types/order.types'

import { useUserStore } from '@/store'

const useGetUserOrders = () => {
  const { userData } = useUserStore()

  const { isLoading, isError, data, error } = useQuery<Order[], Error>({
    queryKey: [`orders-from-user-${userData?._id}`],
    queryFn: () =>
      request<Order[]>({
        url: `${ORDERS_ENDPOINT}/user/${userData?._id}`,
        method: 'GET',
      }),
  })

  return { isLoading, isError, data, error }
}

export { useGetUserOrders }
