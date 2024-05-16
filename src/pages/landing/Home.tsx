import { Link } from 'react-router-dom'
import { Button } from '@forms/button'
import { ThemeToggle } from '@components/theme-toggle'

const Home = () => {
  return (
    <div className="w-full align-center-row gap-2 my-4">
      <h1 className="font-bold text-lg">Change Theme Here</h1>
      <ThemeToggle />
      <Link to="/login">
        <Button>Ingresar</Button>
      </Link>
      <Link to="/signup">
        <Button>Registrarse</Button>
      </Link>
    </div>
  )
}

export default Home
