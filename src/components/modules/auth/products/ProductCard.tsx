import { Link } from 'react-router-dom'
import { ShoppingCart, ArrowRight } from 'lucide-react'

import { Badge } from '@ui/badge'
import { Rating } from '@ui/rating'
import { Button } from '@forms/button'
import { Product } from '@utils/types/product.types'
import { formatPrice } from '@utils/numberMethods'

import { useShoppingCartStore } from '@/store'

interface ProductCardProps {
  product: Product
  pathname: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  pathname = '/stores',
}) => {
  const { addProduct, isProductInCart } = useShoppingCartStore()

  return (
    <div className="flex flex-col justify-around gap-2 md:gap-3 p-3 border-2 rounded-md shadow-lg h-full">
      <img
        className="rounded-md object-cover aspect-video"
        src={
          product?.leadImageURL ||
          'https://github.com/VinuSion/StockStores-v2/assets/56313573/2b33a407-9214-4847-a75b-4e70808c6bae'
        }
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
        <p className="text-xl font-bold">
          ${formatPrice(product?.productPrice)}
          <span className="font-normal text-sm mx-1">COP</span>
        </p>
      </div>
      <div className="flex flex-col gap-3 mb-3">
        {isProductInCart(product._id) ? (
          <div className="flex justify-center w-full p-2 rounded-md bg-accent text-primary font-semibold select-none pointer-events-none">Ya está en tu Carrito</div>
        ) : (
          <Button
            icon={<ShoppingCart className="svg-size" />}
            onClick={() => addProduct(product)}
          >
            Agregar
          </Button>
        )}
        <Link to={`${pathname}/${product?.productSlug}`}>
          <Button
            variant="outline"
            iconRight
            icon={<ArrowRight className="svg-size" />}
            className="w-full"
          >
            Ver Producto
          </Button>
        </Link>
      </div>
    </div>
  )
}

export { ProductCard }
