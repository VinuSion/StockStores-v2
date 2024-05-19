import { useNavigate } from 'react-router-dom'

import { AuthLayout } from '@pages/layouts/AuthLayout'
import { Button } from '@forms/button'

import { useUserStore } from '@/store'

const Dashboard: React.FC = () => {
  const navigate = useNavigate()

  const { removeUserData } = useUserStore()

  const handleLogout = () => {
    removeUserData()
    navigate('/')
  }

  return (
    <AuthLayout>
      <div className="align-center-row gap-2 my-5">
        <p>Welcome to Dashboard</p>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </AuthLayout>
  )
}

export default Dashboard
