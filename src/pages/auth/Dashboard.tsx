import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store'
import { Button } from '@forms/button'

const Dashboard = () => {
  const navigate = useNavigate()

  const { removeUserData } = useUserStore()

  const handleLogout = () => {
    removeUserData()
    navigate('/')
  }

  return (
    <div className="align-center-row gap-2 my-5">
      <p>Welcome to Dashboard</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Dashboard
