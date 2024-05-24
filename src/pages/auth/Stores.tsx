import { Store } from 'lucide-react'

import { AuthLayout } from '@pages/layouts/AuthLayout'
import { ListAllStores } from '@modules/auth/stores/ListAllStores'

const Stores: React.FC = () => {
  return (
    <section className="my-5">
      <div className="flex gap-2 items-center px-4 md:px-8 py-5">
        <Store />
        <h1 className="text-2xl md:text-3xl font-extrabold">Tiendas Destacadas</h1>
      </div>
      <div className="align-center-row grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 w-full px-4 md:px-8">
        <ListAllStores />
      </div>
    </section>
  )
}

export default AuthLayout(Stores)
