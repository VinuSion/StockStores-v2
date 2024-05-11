import { Send } from 'lucide-react'
import { Button } from '@forms/button'
import { ThemeToggle } from '@components/theme-toggle'

const Home = () => {
  return (
    <div className="w-full align-center-row gap-2 my-4">
      <h1 className="font-bold text-lg">Change Theme Here</h1>
      <ThemeToggle />
      <Button icon={<Send className="svg-size" />}>Submit</Button>
    </div>
  )
}

export default Home
