import { Link, useNavigate } from 'react-router-dom'
import { UserRound, LogOut, MessageCircleQuestion } from 'lucide-react'

import { Avatar, AvatarImage, AvatarFallback } from '@ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu'
import { Button } from '@forms/button'
import { CartButton } from '@modules/auth/CartButton'

import { useUserStore, useShippingAddressStore } from '@/store'

const TopBar: React.FC = () => {
  const navigate = useNavigate()
  const { clearShippingAddresses } = useShippingAddressStore()
  const { userData, removeUserData } = useUserStore()

  return (
    <header className="hidden h-16 px-5 z-50 border-b-2 md:flex items-center justify-between gap-4 bg-background fixed pl-72 w-full shadow-lg">
      <Link to="/faq" className="ml-8">
        <Button
          variant="outline"
          icon={<MessageCircleQuestion className="svg-size" />}
        >
          FAQ
        </Button>
      </Link>
      <div className="flex gap-4">
        <CartButton />
        <div className="flex flex-col justify-center items-center h-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer mx-4 transition-all duration-150 border-2 hover:border-primary">
                <AvatarImage
                  src={`${userData?.pictureURL}`}
                  alt={`${userData?.firstName}_profile_picture`}
                />
                <AvatarFallback className="font-bold text-sm">
                  {userData?.firstName.charAt(0)}
                  {userData?.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 mr-9">
              <DropdownMenuGroup>
                <Link to="/account" className="flex">
                  <DropdownMenuItem className="w-full cursor-pointer">
                    <UserRound className="mr-2 svg-size" />
                    <span>Mi Cuenta</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    removeUserData()
                    clearShippingAddresses()
                    navigate('/')
                  }}
                  className="w-full cursor-pointer focus:bg-destructive focus:text-white"
                >
                  <LogOut className="mr-2 svg-size" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export { TopBar }
