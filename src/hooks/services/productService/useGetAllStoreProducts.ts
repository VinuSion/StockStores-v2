import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { request } from '@utils/RequestGenerator'
import { PRODUCTS_ENDPOINT, StoreProducts } from '@utils/types/product.types'

const useGetAllStoreProducts = () => {
  const { storeSlug } = useParams<{ storeSlug: string }>()

  const { isLoading, isError, data, error } = useQuery<StoreProducts, Error>({
    queryKey: [`all-products-from-store-${storeSlug}`],
    queryFn: () =>
      request<StoreProducts>({
        url: `${PRODUCTS_ENDPOINT}/store-slug/${storeSlug}`,
        method: 'GET',
      }),
  })

  return { storeSlug, isLoading, isError, data, error }
}

export { useGetAllStoreProducts }
