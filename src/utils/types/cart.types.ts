import { Product } from "@utils/types/product.types"

export type CartItem = {
  quantity: number
  product: Product
}

export type ICartItem = {
  cartItem: CartItem
}

export interface ShoppingCartState {
  cart: CartItem[]
  checkStoreId: (product: Product) => boolean
  addProduct: (product: Product) => void
  removeProduct: (productId: string) => void
  incrementQuantity: (productId: string) => void
  decrementQuantity: (productId: string) => void
  isCartEmpty: () => boolean
  isProductInCart: (productId: string) => boolean
  clearCart: () => void
}