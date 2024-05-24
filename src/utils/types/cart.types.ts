import { Product } from "@utils/types/product.types"

export type CartItem = {
  quantity: number
  product: Product
}

export interface ShoppingCartState {
  cart: CartItem[]
  addProduct: (product: Product) => void
  removeProduct: (productId: string) => void
  incrementQuantity: (productId: string) => void
  decrementQuantity: (productId: string) => void
  isCartEmpty: () => boolean
  isProductInCart: (productId: string) => boolean
  clearCart: () => void
}