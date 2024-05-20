import { ReactNode } from 'react'
import { NavBar } from '@modules/auth/NavBar'
import { TopBar } from '@modules/auth/TopBar'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="w-auto overflow-auto mb-20 md:mb-0 md:ml-72">
        <TopBar />
        {children}
      </main>
    </>
  )
}

export { AuthLayout }
