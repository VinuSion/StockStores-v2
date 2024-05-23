export const PRODUCTS_ENDPOINT: string = '/products'

export type Product = {
  id: string
  storeId: string
  productSlug: string
  productName: string
  productDescription: string
  productPrice: number
  productBrand?: string
  productCategory: string
  stockAmount: number
  reviewsAmount: number
  averageRating: number
  leadImageURL: string
  imagesCollectionURL: string[]
  isFeatured: boolean
}

export type StoreProducts = {
  storeName: string
  allProductsFromStore: Product[]
}

export type ProductResponse = {
  storeSlug: string,
  storeName: string,
  product: Product,
}
