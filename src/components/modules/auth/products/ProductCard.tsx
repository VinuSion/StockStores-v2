import { Link } from 'react-router-dom'
import { ShoppingCart, ArrowRight } from 'lucide-react'

import { Badge } from '@ui/badge'
import { Rating } from '@ui/rating'
import { Button } from '@forms/button'

import { Product, ProductCardProps } from '@utils/types/product.types'
import { formatPrice } from '@utils/numberMethods'
import { FALLBACK_IMAGE } from '@utils/constants/errorMessages'

import { useToast } from '@hooks/useToast'
import { useShoppingCartStore } from '@/store'

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  pathname = '/stores',
}) => {
  const { checkStoreId, addProduct, isProductInCart, isCartEmpty } =
    useShoppingCartStore()
  const { toast } = useToast()

  const addProductToCartSafe = (product: Product) => {
    if (isCartEmpty()) {
      addProduct(product)
    } else {
      if (!checkStoreId(product)) {
        toast({
          title: `❌ Error al Agregar "${product?.productName}"`,
          description: 'Solo puedes agregar productos de la misma Tienda.',
        })
      } else {
        addProduct(product)
      }
    }
  }

  return (
    <div className="flex flex-col justify-around gap-2 md:gap-3 p-3 border-2 rounded-md shadow-lg h-full">
      <img
        className="rounded-md object-cover aspect-video"
        src={product?.leadImageURL || FALLBACK_IMAGE}
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
          <div className="flex justify-center w-full p-2 rounded-md bg-accent text-primary font-semibold select-none pointer-events-none">
            Ya está en tu Carrito
          </div>
        ) : product?.stockAmount > 0 ? (
          <Button
            icon={<ShoppingCart className="svg-size" />}
            onClick={() => addProductToCartSafe(product)}
          >
            Agregar
          </Button>
        ) : (
          <div className="flex justify-center w-full p-2 rounded-md bg-accent text-destructive font-semibold select-none pointer-events-none">
            Agotado
          </div>
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
