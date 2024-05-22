import { Star, StarHalf } from 'lucide-react'

interface RatingProps {
  averageRating: number
}

const Rating: React.FC<RatingProps> = ({ averageRating = 0}) => {
  const fullStars = Math.floor(averageRating)
  const hasHalfStar = averageRating % 1 !== 0

  return (
    <div className="relative">
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} className="text-primary" />
        ))}
      </div>
      <div className="flex gap-1 absolute top-0">
        {Array.from({ length: fullStars }, (_, index) => (
          <Star key={`full-${index}`} fill="#17ab75" className="text-primary" />
        ))}
        {hasHalfStar && (
          <StarHalf key="half" fill="#17ab75" className="text-primary" />
        )}
      </div>
    </div>
  )
}

export { Rating }
