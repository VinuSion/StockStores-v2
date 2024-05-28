import { Avatar, AvatarImage, AvatarFallback } from '@ui/avatar'
import { Rating } from '@ui/rating'

import { compareDates } from '@utils/stringMethods'
import { ReviewCardProps } from '@utils/types/review.types'

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="border-2 p-4 flex flex-col rounded-md">
      <div className="flex flex-row flex-wrap items-center gap-2">
        <Avatar className="border-2">
          <AvatarImage
            src={review?.userPictureURL}
            alt={`${review?.userFirstName}_${review?.userLastName}_profile_picture`}
          />
          <AvatarFallback className="font-bold text-sm">
            {review?.userFirstName?.charAt(0)}
            {review?.userLastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex">
          <p className="font-semibold text-lg">
            {review?.userFirstName || 'N/A'} {review?.userLastName || 'N/A'}
          </p>
        </div>
        <div className="flex ml-2">
          <span className="text-sm text-muted-foreground">{compareDates(review?.createdAt, review?.updatedAt)}</span>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 w-full my-2">
        <Rating averageRating={review?.rating || 0} />
        <span className="text-sm text-primary font-semibold">{review?.rating}/5 estrellas</span>
      </div>
      {review?.comment && (
        <div className="w-full text-wrap my-2">
          <p>{review?.comment}</p>
        </div>
      )}
    </div>
  )
}

export { ReviewCard }
