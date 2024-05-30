export const ORDERS_ENDPOINT: string = '/orders'

export type OrderItem = {
  productId: string
  productSlug: string
  productName: string
  productLeadImage: string
  productPrice: number
  quantity: number
  itemPrice: number
}

export interface IOrderItemProps {
  orderItem: OrderItem
}