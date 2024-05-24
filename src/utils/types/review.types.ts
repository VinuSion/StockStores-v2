export const REVIEWS_ENDPOINT: string = '/reviews'

export type Review = {
  id: string
  productId: string
  userId: string
  userFirstName: string
  userLastName: string
  userPictureURL: string
  rating: number
  comment?: string
  createdAt: string
  updatedAt: string
}