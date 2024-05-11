import { routerType } from '@utils/types/router.types'
import Stores from '@pages/auth/Stores'
import Home from '@pages/landing/Home'

const landingPagesData: routerType[] = [
  {
    title: 'home',
    path: '/',
    element: <Home />,
  },
]

const authPagesData: routerType[] = [
  {
    title: 'stores',
    path: '/stores',
    element: <Stores />,
  },
]

export { authPagesData, landingPagesData }
