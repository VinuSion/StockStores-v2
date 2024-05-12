import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@forms/button'
import { User } from '@utils/types/user.types'

interface NotFoundProps {
  userData: User | null
}

const NotFound: React.FC<NotFoundProps> = ({ userData }) => {
  return (
    <div className="align-center flex-col gap-4 mt-5">
      404 - Page Not Found
      <Link to={userData ? '/stores' : '/'}>
        <Button>
          Return to{' '}
          {userData
            ? userData?.isSeller
              ? 'Dashboard Page'
              : 'Stores Page'
            : 'Home Page'}
        </Button>
      </Link>
    </div>
  )
}

export default NotFound
