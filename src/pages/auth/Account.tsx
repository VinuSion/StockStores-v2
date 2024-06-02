import { useNavigate, Link } from 'react-router-dom'
import { MessageCircleQuestion } from 'lucide-react'

import { AuthLayout } from '@pages/layouts/AuthLayout'
import { Button } from '@forms/button'
// import { User } from '@utils/types/user.types'

import { useUserStore, useShippingAddressStore } from '@/store'

const Account: React.FC = () => {
  const navigate = useNavigate()
  const { clearShippingAddresses } = useShippingAddressStore()
  const { userData, removeUserData } = useUserStore()

  // const updatedUserData: Partial<User> = {
  //   firstName: 'Bruh',
  //   lastName: 'Momento',
  // }

  // const handleUpdateProfile = () => {
  //   updateUserData(updatedUserData)
  // }

  return (
    <div className="align-center-row gap-3 my-5">
      <h2>
        Mi Cuenta: {userData?.firstName} {userData?.lastName}
      </h2>
      {/* <Button onClick={handleUpdateProfile}>Actualizar Perfil</Button> */}
      <Button
        onClick={() => {
          removeUserData()
          clearShippingAddresses()
          navigate('/')
        }}
      >
        Cerrar Sesion
      </Button>
      <Link to="/faq">
        <Button
          variant="outline"
          icon={<MessageCircleQuestion className="svg-size" />}
        >
          FAQ
        </Button>
      </Link>
    </div>
  )
}

export default AuthLayout(Account)
