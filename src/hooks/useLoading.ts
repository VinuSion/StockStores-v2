import { useState } from 'react'

interface LoadingState {
  isLoading: boolean
  handleLoadingClick: () => void
}

export const useLoading = (): LoadingState => {
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadingClick = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return { isLoading, handleLoadingClick }
}
