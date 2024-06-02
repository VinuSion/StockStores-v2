import { OrderItem } from '@utils/types/order.types'
import { useShoppingCartStore } from '@/store'

const useTransformCartItems = () => {
  const { cart } = useShoppingCartStore()

  const transformedCartItems: OrderItem[] = cart.map((cartItem) => ({
    productId: cartItem.product._id,
    productSlug: cartItem.product.productSlug,
    productName: cartItem.product.productName,
    productLeadImage: cartItem.product.leadImageURL,
    productPrice: cartItem.product.productPrice,
    quantity: cartItem.quantity,
    itemPrice: cartItem.product.productPrice * cartItem.quantity,
  }))

  return transformedCartItems
}

export { useTransformCartItems }
