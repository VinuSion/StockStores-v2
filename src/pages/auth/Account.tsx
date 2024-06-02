import { useNavigate } from 'react-router-dom'

import { AuthLayout } from '@pages/layouts/AuthLayout'
import { Button } from '@forms/button'
import { User } from '@utils/types/user.types'

import { useUserStore, useShippingAddressStore } from '@/store'

const Account: React.FC = () => {
  const navigate = useNavigate()
  const { clearShippingAddresses } = useShippingAddressStore()
  const { userData, updateUserData, removeUserData } = useUserStore()

  const updatedUserData: Partial<User> = {
    firstName: 'Bruh',
    lastName: 'Momento',
  }

  const handleUpdateProfile = () => {
    updateUserData(updatedUserData)
  }

  return (
    <div className="align-center-row gap-3">
      <h2>
        Mi Cuenta: {userData?.firstName} {userData?.lastName}
      </h2>
      <p>Eres Vendedor? {userData?.isSeller ? 'Si' : 'No'}</p>
      <Button onClick={handleUpdateProfile}>Actualizar Perfil</Button>
      <Button
        onClick={() => {
          removeUserData()
          clearShippingAddresses()
          navigate('/')
        }}
      >
        Cerrar Sesion
      </Button>
    </div>
  )
}

export default AuthLayout(Account)
