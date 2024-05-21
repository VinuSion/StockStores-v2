import { useQuery } from '@tanstack/react-query'
import { request } from '@utils/RequestGenerator'
import { PRODUCTS_ENDPOINT, Product } from '@utils/types/product.types'
import { useParams } from 'react-router-dom'

const useGetAllStoreProducts = () => {
  const { storeSlug } = useParams()

  const { isLoading, isError, data, error } = useQuery<Product, Error>({
    queryKey: [`all-products-from-store-${storeSlug}`],
    queryFn: () =>
      request<Product>({
        url: `${PRODUCTS_ENDPOINT}/${storeSlug}/all`,
        method: 'GET',
      }),
  })

  return { isLoading, isError, data, error }
}

export { useGetAllStoreProducts }