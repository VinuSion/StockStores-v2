import { Route, Routes } from 'react-router-dom'
import { routerType } from '@utils/types/router.types'
import { authPagesData, landingPagesData } from '@utils/constants/pagesData'
import NotFound from '@pages/NotFound' // Import your custom 404 page component

const Router = () => {
  const isAuth: boolean = false // Pretend this is controlled by authentication logic

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

  const allRoutes = isAuth ? [...authPageRoutes] : [...landingPageRoutes]

  // Add wildcard route to catch any unmatched routes
  allRoutes.push(<Route key="not-found" path="*" element={<NotFound isAuth={isAuth} />} />)

  return <Routes>{allRoutes}</Routes>
}

export { Router }
