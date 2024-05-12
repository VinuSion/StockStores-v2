import { Route, Routes } from 'react-router-dom'
import { routerType } from '@utils/types/router.types'
import { authPagesData, landingPagesData } from '@utils/constants/pagesData'
import NotFound from '@pages/NotFound'
import { useUserStore } from '@/store'

const Router = () => {
  const { userData } = useUserStore();

  const authPageRoutes = authPagesData.map(
    ({ path, title, element }: routerType) => {
      return <Route key={title} path={path} element={element} />
    }
  )

  const landingPageRoutes = landingPagesData.map(
    ({ path, title, element }: routerType) => {
      return <Route key={title} path={path} element={element} />
    }
  )

  const allRoutes = userData ? [...authPageRoutes] : [...landingPageRoutes]

  // Add wildcard route to catch any unmatched routes
  allRoutes.push(<Route key="not-found" path="*" element={<NotFound userData={userData} />} />)

  return <Routes>{allRoutes}</Routes>
}

export { Router }
