import { routerType } from '@utils/types/router.types'

import Home from '@pages/landing/Home'
import Login from '@pages/landing/Login'
import SignUp from '@pages/landing/SignUp'
import ResetPassword from '@pages/landing/ResetPassword'

import Stores from '@pages/auth/Stores'
import Dashboard from '@pages/auth/Dashboard'

const landingPagesData: routerType[] = [
  {
    title: 'home',
    path: '/',
    element: <Home />,
  },
  {
    title: 'login',
    path: '/login',
    element: <Login />,
  },
  {
    title: 'signup',
    path: '/signup',
    element: <SignUp />,
  },
  {
    title: 'reset-password',
    path: '/reset-password',
    element: <ResetPassword />,
  },
]

const authPagesData: routerType[] = [
  {
    title: 'stores',
    path: '/stores',
    element: <Stores />,
  },
  {
    title: 'dashboard',
    path: '/dashboard',
    element: <Dashboard />,
  },
]

export { authPagesData, landingPagesData }
