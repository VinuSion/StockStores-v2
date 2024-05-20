import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, SquareUserRound, LogOut } from 'lucide-react'

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

import { useUserStore } from '@/store'

const TopBar: React.FC = () => {
  const navigate = useNavigate()
  const { userData, removeUserData } = useUserStore()

  return (
    <header className="hidden h-16 px-5 border-b-2 md:flex items-center justify-end gap-4">
      <Button variant="outline" icon={<ShoppingCart className="svg-size" />}>
        Carrito
      </Button>
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
                  <SquareUserRound className="mr-2 svg-size" />
                  <span>Mi Cuenta</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  removeUserData()
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
    </header>
  )
}

export { TopBar }
