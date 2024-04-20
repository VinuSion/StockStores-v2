import { ThemeProvider } from '@components/theme-provider'
import { ThemeToggle } from '@components/theme-toggle'
import { Button } from '@ui/button'
import { Ping } from '@ui/ping'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui/select'
import { Send, LoaderCircle, Bell } from 'lucide-react'

import { useLoading } from './hooks/useLoading'

function App() {
  const { isLoading, handleLoadingClick } = useLoading()

  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
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
        <Ping color="bg-rose-500">
          <Button variant="outline" icon={<Bell className="svg-size" />}>
            Notifications
          </Button>
        </Ping>
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="nextjs">Next.js</SelectItem>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="vue">Vue</SelectItem>
              <SelectItem value="angular">Angular</SelectItem>
              <SelectItem value="ruby">Ruby</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </ThemeProvider>
  )
}

export default App
