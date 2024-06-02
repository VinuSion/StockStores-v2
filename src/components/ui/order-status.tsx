import {
  CheckCircle,
  Bike,
  CreditCard,
  Hourglass,
  XCircle,
  AlertTriangle,
} from 'lucide-react'
import { OrderStatusProps } from '@utils/types/order.types'

const statusStylesMap = {
  'Awaiting Seller Approval': {
    text: 'Esperando Aprobación',
    icon: <Hourglass className="mr-1 h-4 w-4" />,
    style: 'bg-amber-600/20 text-amber-600',
  },
  'Waiting for Payment': {
    text: 'Esperando Pago',
    icon: <CreditCard className="mr-1 h-4 w-4" />,
    style: 'bg-blue-600/20 text-blue-500',
  },
  'Waiting for Delivery': {
    text: 'Esperando Entrega',
    icon: <Bike className="mr-1 h-4 w-4" />,
    style: 'bg-amber-600/20 text-amber-600',
  },
  'Delivered': {
    text: 'Enviado',
    icon: <CheckCircle className="mr-1 h-4 w-4" />,
    style: 'bg-emerald-600/20 text-emerald-500',
  },
  'Cancelled': {
    text: 'Cancelado',
    icon: <XCircle className="mr-1 h-4 w-4" />,
    style: 'bg-slate-600/20 text-slate-600',
  },
  'Rejected by Seller': {
    text: 'Rechazado',
    icon: <AlertTriangle className="mr-1 h-4 w-4" />,
    style: 'bg-rose-600/20 text-rose-600',
  },
}

const OrderStatusBadge: React.FC<OrderStatusProps> = ({ status }) => {
  const { text, icon, style } = statusStylesMap[status]

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${style}`}
    >
      {icon}
      {text}
    </div>
  )
}

export { OrderStatusBadge }
