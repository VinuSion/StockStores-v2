import { ReviewCard } from '@modules/auth/reviews/ReviewCard'
import { useGetReviews } from '@services/reviewService/useGetReviews'
import { ProductReviewsProps } from '@utils/types/product.types'

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { isLoading, isError, data, error } = useGetReviews(productId)

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <p>{error!.message}</p>
  }

  return (
    <>
      {data && data.length > 0 ? (
        <div className="my-3 grid grid-cols-1 gap-6 xl:grid-cols-2">
          {data?.map((review, index) => (
            <ReviewCard
              key={index}
              review={review}
            />
          ))}
        </div>
      ) : (
        <div className="my-3 flex justify-center w-full">
          <p className="font-semibold text-lg text-primary">No hay reseñas para este producto todavia.</p>
        </div>
      )}
    </>
  )
}

export { ProductReviews }
