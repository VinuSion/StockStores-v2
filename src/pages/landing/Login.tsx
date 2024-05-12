import { useNavigate } from 'react-router-dom'

import { Button } from '@forms/button'
import { User } from '@utils/types/user.types'

import { useUserStore } from '@/store'

const Login = () => {
  const navigate = useNavigate()

  const { setUserData } = useUserStore()

  const newUserData: User = {
    id: crypto.randomUUID(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    isSeller: false,
    pictureURL: '',
    settings: {
      colorTheme: 'light',
    },
  }

  const handleLogin = () => {
    // Step 3: Set user data when logging in
    setUserData(newUserData)
    console.log('Logged in with new user data:', newUserData)
    navigate('/stores')
  }

  return (
    <div className="align-center-row gap-3">
      <h2>Login Form</h2>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  )
}

export default Login
