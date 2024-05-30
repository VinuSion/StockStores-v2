export const SHIPPING_ENDPOINT: string = '/shipping'

export type ShippingAddress = {
  _id: string
  userId: string
  fullName: string
  address: string
  city: string
  department: string
  contactPhoneNumber: string
}

export type ShippingAddressState = {
  shippingAddresses: ShippingAddress[]
  addAllAddresses: (addresses: ShippingAddress[]) => void
  addOneShippingAddress: (address: ShippingAddress) => void
  removeOneShippingAddress: (addressId: string) => void
  clearShippingAddresses: () => void
  isShippingSet: () => boolean
}