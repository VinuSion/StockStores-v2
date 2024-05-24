export const STORES_ENDPOINT: string = '/stores'

export type StoreAddress = {
  address: string
  city: string
  department: string
}

export type Store = {
  _id: string
  sellerId: string
  sellerFirstName: string
  sellerLastName: string
  sellerPictureURL: string
  storeSlug: string
  storeName: string
  storeDescription?: string
  storePhoneNumber: string
  storeAddress: StoreAddress
  storeImageURL: string
}
