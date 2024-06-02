import { Order } from '@utils/types/order.types'

const useOrderListGrouping = (orders: Order[]) => {
  const pendingOrders = orders.filter(
    (order) =>
      order.orderStatus !== 'Delivered' &&
      order.orderStatus !== 'Cancelled' &&
      order.orderStatus !== 'Rejected by Seller'
  )

  const completedOrders = orders.filter(
    (order) => order.orderStatus === 'Delivered'
  )

  return { pendingOrders, completedOrders }
}

export { useOrderListGrouping }
