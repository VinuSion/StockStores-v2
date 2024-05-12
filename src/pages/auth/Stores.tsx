import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store'
import { Button } from '@forms/button'
import { User } from '@utils/types/user.types'
import { ShowStores } from '@components/showStores'

const Stores = () => {
  const navigate = useNavigate()

  const { userData, updateUserData, removeUserData } = useUserStore()

  const updatedUserData: User = {
    id: crypto.randomUUID(),
    firstName: 'Bruh',
    lastName: 'Momento',
    email: 'bruh@example.com',
    isSeller: true,
    pictureURL: 'https://example.com/profile.jpg',
    settings: {
      colorTheme: 'dark',
    },
  }

  const handleUpdateProfile = () => {
    // Step 3: Update user data
    updateUserData(updatedUserData)
    console.log('Updated user data:', updatedUserData)
  }

  const handleLogout = () => {
    // Step 3: Remove user data when logging out
    removeUserData()
    console.log('User logged out')
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
