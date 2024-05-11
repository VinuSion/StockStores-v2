import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'

// Extend Axios Requests with additional token
interface RequestOptions extends AxiosRequestConfig {
  token?: string
}

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    "Content-type": "application/json",
  },
})

export const request = async <T>(options: RequestOptions): Promise<T> => {
  const { token, ...axiosOptions } = options

  // Set the authorization header if token is provided
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  const onSuccess = (response: AxiosResponse<T>): T => {
    return response?.data
  }

  const onError = (error: AxiosError): Promise<never> => {
    return Promise.reject(error.response?.data)
  }

  return client.request<T>(axiosOptions).then(onSuccess).catch(onError)
}
