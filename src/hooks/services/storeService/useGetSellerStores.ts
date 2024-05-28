import { useQuery } from '@tanstack/react-query'
import { request } from '@utils/RequestGenerator'
import { STORES_ENDPOINT, Store } from '@utils/types/store.types'

const useGetSellerStores = (sellerId: string) => {
  const { isLoading, isError, data, error } = useQuery<Store[], Error>({
    queryKey: [`seller-stores-${sellerId}`],
    queryFn: () =>
      request<Store[]>({
        url: `${STORES_ENDPOINT}/seller/${sellerId}`,
        method: 'GET',
      }),
  })

  return { isLoading, isError, data, error }
}

export { useGetSellerStores }