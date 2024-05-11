import { Send, LoaderCircle } from 'lucide-react'
import { Button } from '@forms/button'
import { ThemeToggle } from '@components/theme-toggle'
import { useLoading } from '@hooks/useLoading'

const Home = () => {
  const { isLoading, handleLoadingClick } = useLoading()

  return (
    <div className="w-full align-center-row gap-2 my-4">
      <h1 className="font-bold text-lg">Change Theme Here</h1>
      <ThemeToggle />
      <Button
        onClick={handleLoadingClick}
        disabled={isLoading}
        icon={
          isLoading ? (
            <LoaderCircle className="svg-size animate-spin" />
          ) : (
            <Send className="svg-size" />
          )
        }
      >
        {isLoading ? 'Loading...' : 'Submit'}
      </Button>
    </div>
  )
}

export default Home
