import { NavBar } from '@modules/auth/NavBar'
import { TopBar } from '@modules/auth/TopBar'

const AuthLayout = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const LayoutWrapper: React.FC<P> = (props) => {
    return (
      <>
        <TopBar />
        <NavBar />
        <main className="w-auto overflow-auto mb-20 md:mb-0 md:ml-72 md:pt-16">
          <Component {...props} />
        </main>
      </>
    )
  }

  return LayoutWrapper
}

export { AuthLayout }
