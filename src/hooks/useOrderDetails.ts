import { useTransformCartItems } from '@hooks/useTransformCartItems'

const useOrderDetails = () => {
  const orderItems = useTransformCartItems()
  const shippingPrice: number = 3000 // Constant of $3.000 COP for now

  // Calculate the total price of all items in the order
  const itemsPrice = orderItems.reduce((total, item) => total + item.itemPrice, 0)

  // Calculate the total order cost including shipping
  const totalPrice = itemsPrice + shippingPrice

  return {
    orderItems,
    itemsPrice,
    shippingPrice,
    totalPrice,
  }
}

export { useOrderDetails }