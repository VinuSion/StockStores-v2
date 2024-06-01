import { useQuery } from '@tanstack/react-query'
import { request } from '@utils/RequestGenerator'
import { STORES_ENDPOINT, Store } from '@utils/types/store.types'

import { useShoppingCartStore } from '@/store'

const useStoreFromOrder = () => {
  const { cart } = useShoppingCartStore()
  const storeId = cart[0]?.product?.storeId

  const { isLoading, isError, data, error } = useQuery<Store, Error>({
    queryKey: [`find-store-${storeId}-new-order`],
    queryFn: () =>
      request<Store>({
        url: `${STORES_ENDPOINT}/find/${storeId}`,
        method: 'GET',
      }),
  })

  return { isLoading, isError, data, error }
}

export { useStoreFromOrder }
