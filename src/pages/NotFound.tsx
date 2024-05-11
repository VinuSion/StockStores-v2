import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@forms/button'

interface NotFoundProps {
  isAuth: boolean
}

const NotFound: React.FC<NotFoundProps> = ({ isAuth }) => {
  return (
    <div className="align-center flex-col gap-4 mt-5">
      404 - Page Not Found
      <Link to={isAuth ? '/stores' : '/'}>
        <Button>
          Return to {isAuth ? 'Stores Page' : 'Home Page'}
        </Button>
      </Link>
    </div>
  )
}

export default NotFound
