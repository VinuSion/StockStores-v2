import { Link } from 'react-router-dom'
import { ShoppingCart, ArrowRight } from 'lucide-react'

import { Badge } from '@ui/badge'
import { Rating } from '@ui/rating'
import { Button } from '@forms/button'
import { Product } from '@utils/types/product.types'

interface ProductCardProps {
  product: Product
  pathname: string
}

const ProductCard: React.FC<ProductCardProps> = ({ product, pathname = "/stores" }) => {
  return (
    <div className="flex flex-col justify-around gap-3 md:gap-4 p-3 border-2 rounded-md shadow-lg h-full">
      <img
        className="rounded-md object-cover aspect-video"
        src={product?.leadImageURL || ''}
        alt={`${product?.productName} product photo`}
      />
      <div className="flex flex-wrap items-center gap-2 w-full">
        <h3 className="text-xl font-bold">
          {product?.productName || 'Producto - Sin Nombre'}
        </h3>
        {product?.isFeatured && <Badge>Destacado</Badge>}
      </div>
      <div className="flex flex-wrap items-center gap-2 w-full">
        <Rating averageRating={product?.averageRating || 0} />
        <span>{product?.reviewsAmount || 0} reseñas</span>
      </div>
      <div className="flex">
        <span className="text-xl font-bold">${product?.productPrice}</span>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mb-3">
        <Button icon={<ShoppingCart className="svg-size" />}>Agregar</Button>
        <Link to={`${pathname}/${product?.productSlug}`}>
          <Button variant="outline" iconRight icon={<ArrowRight className="svg-size" />}>Ver Producto</Button>
        </Link>
      </div>
    </div>
  )
}

export { ProductCard }
