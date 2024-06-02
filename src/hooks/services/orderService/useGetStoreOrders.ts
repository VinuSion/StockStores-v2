import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { request } from '@utils/RequestGenerator'
import { ORDERS_ENDPOINT, StoreOrders } from '@utils/types/order.types'

const useGetStoreOrders = () => {
  const { storeSlug } = useParams<{ storeSlug: string }>()

  const { isLoading, isError, data, error } = useQuery<StoreOrders, Error>({
    queryKey: [`orders-from-store-${storeSlug}`],
    queryFn: () =>
      request<StoreOrders>({
        url: `${ORDERS_ENDPOINT}/store-slug/${storeSlug}`,
        method: 'GET',
      }),
  })

  return { isLoading, isError, data, error }
}

export { useGetStoreOrders }