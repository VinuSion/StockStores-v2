export const BASE_STORES_ENDPOINT: string = '/stores'

export interface StoreAddress {
  address: string
  city: string
  department: string
}

export interface StoreData {
  _id: string
  sellerId: string
  sellerFirstName: string
  sellerLastName: string
  sellerPictureURL: string
  storeSlug: string
  storeName: string
  storeDescription: string
  storePhoneNumber: string
  storeAddress: StoreAddress
  storeImageURL: string
}
