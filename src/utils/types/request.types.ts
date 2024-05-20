// Extend Fetch API Requests with additional token
export interface TRequestOptions extends RequestInit {
  url: string
  token?: string
  data?: any
}
