import { IOrderProps } from "@utils/types/order.types"

const OrderCard: React.FC<IOrderProps> = ({ order }) => {
  return (
    <div>{order.storeName}</div>
  )
}

export { OrderCard }