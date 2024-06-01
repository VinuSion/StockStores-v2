import { Link } from 'react-router-dom'

import { Button } from '@forms/button'
import { NotFoundProps } from '@utils/types/user.types'

const NotFound: React.FC<NotFoundProps> = ({ userData }) => {
  return (
    <div className="align-center flex-col gap-4 mt-5">
      404 - Pagina Equivocada
      <Link
        to={userData ? (userData?.isSeller ? '/dashboard' : '/stores') : '/'}
      >
        <Button>
          Regresar a{' '}
          {userData ? (userData?.isSeller ? 'Dashboard' : 'Tiendas') : 'Inicio'}
        </Button>
      </Link>
    </div>
  )
}

export default NotFound
