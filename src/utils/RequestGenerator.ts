import { TRequestOptions } from '@utils/types/request.types'

const baseURL = import.meta.env.VITE_API_URL as string

export const request = async <T>(options: TRequestOptions): Promise<T> => {
  const { url, token, data, headers, ...fetchOptions } = options

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string>),
  }

  // Set the authorization header if token is provided
  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`
  }

  const fetchOptionsWithBody = {
    ...fetchOptions,
    headers: requestHeaders,
    ...(data ? { body: JSON.stringify(data) } : {}), // Add body if data is provided
  }

  const response = await fetch(`${baseURL}${url}`, fetchOptionsWithBody)

  if (!response.ok) {
    // Handle HTTP errors
    const errorResponse = await response.json()
    return Promise.reject(errorResponse)
  }

  // Handle successful response
  const responseData: T = await response.json();
  return responseData;
}
