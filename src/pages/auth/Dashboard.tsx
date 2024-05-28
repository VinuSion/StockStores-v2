import { Link } from 'react-router-dom'
import { LayoutDashboard } from 'lucide-react'

import { Button } from '@forms/button'
import { AuthLayout } from '@pages/layouts/AuthLayout'
import { SellerStores } from '@modules/auth/stores/SellerStores'
import { CreateStore } from '@modules/auth/stores/CreateStore'

import { useUserStore } from '@/store'

const Dashboard: React.FC = () => {
  const { userData } = useUserStore()

  if (!userData?.isSeller) {
    return (
      <div className="align-center-row gap-2 my-5">
        <p>Aun no eres Vendedor.</p>
        <Link to="/stores">
          <Button type="button">Regresar a Tiendas</Button>
        </Link>
      </div>
    )
  }

  return (
    <section className="my-5">
      <div className="flex gap-2 items-center px-4 md:px-8 py-5">
        <LayoutDashboard />
        <h1 className="text-2xl md:text-3xl font-extrabold">Dashboard</h1>
      </div>
      <p className="w-full px-4 md:px-8 text-sm mb-5">
        Desde aquí, podrás editar la información de cada tienda y gestionar los
        productos disponibles.
      </p>
      <div className="my-3 grid grid-cols-1 xl:grid-cols-2 gap-8 w-full px-4 md:px-8">
        <SellerStores sellerId={userData?._id!} />
      </div>
      <CreateStore />
    </section>
  )
}

export default AuthLayout(Dashboard)
