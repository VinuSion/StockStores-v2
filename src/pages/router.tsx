import { Route, Routes, Navigate } from 'react-router-dom'
import { RouterType } from '@utils/types/router.types'
import { authPagesData, landingPagesData } from '@utils/constants/pagesData'
import NotFound from '@pages/NotFound'

import { useUserStore } from '@/store'

const Router = () => {
  const { userData } = useUserStore()

  const authPageRoutes = authPagesData.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={path} element={element} />
    }
  )

  const landingPageRoutes = landingPagesData.map(
    ({ path, title, element }: RouterType) => {
      return <Route key={title} path={path} element={element} />
    }
  )

  const allRoutes = userData ? [...authPageRoutes] : [...landingPageRoutes]

  // Add wildcard route to catch any unmatched routes
  allRoutes.push(
    <Route
      key="not-found"
      path="*"
      element={<NotFound userData={userData} />}
    />
  )

  // Redirect to specific page depending on type of user
  if (userData) {
    allRoutes.push(
      <Route
        key="redirect"
        path="/"
        element={
          <Navigate to={userData?.isSeller ? '/dashboard' : '/stores'} />
        }
      />
    )
  }

  return <Routes>{allRoutes}</Routes>
}

export { Router }
