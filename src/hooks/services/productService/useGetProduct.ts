import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { request } from '@utils/RequestGenerator'
import { PRODUCTS_ENDPOINT, ProductResponse } from '@utils/types/product.types'

const useGetProduct = () => {
  const { productSlug } = useParams<{ productSlug: string }>()

  const { isLoading, isError, data, error } = useQuery<ProductResponse, Error>({
    queryKey: [`product-${productSlug}`],
    queryFn: () =>
      request<ProductResponse>({
        url: `${PRODUCTS_ENDPOINT}/${productSlug}`,
        method: 'GET',
      }),
  })

  return { productSlug, isLoading, isError, data, error }
}

export { useGetProduct }