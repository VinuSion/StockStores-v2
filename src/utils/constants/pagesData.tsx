import { RouterType } from '@utils/types/router.types'

import Home from '@/pages/landing/Home'
import Login from '@pages/landing/Login'
import SignUp from '@pages/landing/SignUp'
import ResetPassword from '@pages/landing/ResetPassword'

import Account from '@pages/auth/Account'
import Stores from '@pages/auth/Stores'
import Dashboard from '@pages/auth/Dashboard'
import Orders from '@pages/auth/Orders'
import Faq from '@pages/auth/faq/Faq'

import FaqDetails from '@pages/auth/faq/FaqDetails'
import StoreDetailsPage from '@pages/auth/stores/StoreDetailsPage'
import StoreProducts from '@pages/auth/products/StoreProducts'
import ProductDetailsPage from '@pages/auth/products/ProductDetailsPage'

const landingPagesData: RouterType[] = [
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
    path: '/reset-password/:token',
    element: <ResetPassword />,
  },
]

const authPagesData: RouterType[] = [
  {
    title: 'account',
    path: '/account',
    element: <Account />,
  },
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
  {
    title: 'orders',
    path: '/orders',
    element: <Orders />,
  },
  {
    title: 'faq',
    path: '/faq',
    element: <Faq />,
  },
  {
    title: 'faq-details-page',
    path: '/faq/:faqDetail',
    element: <FaqDetails />,
  },
  {
    title: 'stores-details-page',
    path: '/stores/:storeSlug',
    element: <StoreDetailsPage />,
  },
  {
    title: 'stores-products-page',
    path: '/stores/:storeSlug/products',
    element: <StoreProducts />,
  },
  {
    title: 'products-details-page',
    path: '/stores/:storeSlug/products/:productSlug',
    element: <ProductDetailsPage />,
  },
]

export { authPagesData, landingPagesData }
