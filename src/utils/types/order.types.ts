export const ORDERS_ENDPOINT: string = '/orders'

export type OrderStatus = 'Awaiting Seller Approval' | 'Waiting for Payment' | 'Waiting for Delivery' | 'Delivered' | 'Cancelled' | 'Rejected by Seller'

export type OrderItem = {
  productId: string
  productSlug: string
  productName: string
  productLeadImage: string
  productPrice: number
  quantity: number
  itemPrice: number
}

type OrderShippingAddress = {
  fullName: string
  address: string
  city: string
  department: string
  contactPhoneNumber: string
}

export type Order = {
  _id: string
  userId: string
  storeId: string,
  storeSlug: string,
  storeName: string,
  storeImageURL: string,
  orderStatus: OrderStatus,
  orderItems: OrderItem[],
  shippingAddress: OrderShippingAddress,
  itemsPrice: number,
  shippingPrice: number,
  totalPrice: number,
  paymentMethod: string,
  paidAt?: Date,
  deliveredAt?: Date,
}

export interface IOrderItemProps {
  orderItem: OrderItem
}

export interface IOrderProps {
  order: Order
}
