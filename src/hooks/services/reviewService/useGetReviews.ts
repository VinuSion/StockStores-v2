import { useQuery } from '@tanstack/react-query'
import { request } from '@utils/RequestGenerator'
import { REVIEWS_ENDPOINT, Review } from '@utils/types/review.types'

const useGetReviews = (productId: string | undefined) => {
  const { isLoading, isError, data, error } = useQuery<Review[], Error>({
    queryKey: [`reviews-from-product-${productId}`],
    queryFn: () =>
      request<Review[]>({
        url: `${REVIEWS_ENDPOINT}/${productId}/all`,
        method: 'GET',
      }),
  })

  return { isLoading, isError, data, error }
}

export { useGetReviews }