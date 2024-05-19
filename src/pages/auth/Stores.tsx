import { useNavigate } from 'react-router-dom'

import { AuthLayout } from '@pages/layouts/AuthLayout'
import { Button } from '@forms/button'
import { ShowStores } from '@modules/auth/ShowStores'
import { User } from '@utils/types/user.types'

import { useUserStore } from '@/store'

const Stores: React.FC = () => {
  const navigate = useNavigate()

  const { userData, updateUserData, removeUserData } = useUserStore()

  const updatedUserData: Partial<User> = {
    firstName: 'Bruh',
    lastName: 'Momento',
  }

  const handleUpdateProfile = () => {
    updateUserData(updatedUserData)
  }

  const handleLogout = () => {
    removeUserData()
    navigate('/')
  }

  return (
    <AuthLayout>
      <div className="align-center-row gap-3">
        <ShowStores />
        <h2>
          My Profile: {userData?.firstName} {userData?.lastName}
        </h2>
        <p>Are you seller? {userData?.isSeller ? 'Yes' : 'No'}</p>
        <Button onClick={handleUpdateProfile}>Update Profile</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </AuthLayout>
  )
}

export default Stores
