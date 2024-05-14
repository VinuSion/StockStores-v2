import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store'
import { Button } from '@forms/button'
import { User } from '@utils/types/user.types'
import { ShowStores } from '@components/showStores'

const Stores = () => {
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
    <div className="align-center-row gap-3">
      <ShowStores />
      <h2>
        My Profile: {userData?.firstName} {userData?.lastName}
      </h2>
      <p>Are you seller? {userData?.isSeller ? 'Yes' : 'No'}</p>
      <Button onClick={handleUpdateProfile}>Update Profile</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Stores
