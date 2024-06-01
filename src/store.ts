import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { UserStore, User } from '@utils/types/user.types'
import { Theme, ThemeProviderState } from '@utils/types/theme.types'
import { ShoppingCartState } from '@utils/types/cart.types'
import {
  ShippingAddressState,
  ShippingAddress,
} from '@utils/types/shipping.types'
import { Product } from '@utils/types/product.types'

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        userData: null,
        setUserData: (user: User) => {
          set((state) => ({ ...state, userData: user }))
          useThemeStore
            .getState()
            .setTheme(user?.settings?.colorTheme || 'system')
        },
        updateUserData: (userUpdates: Partial<User>) => {
          set((state) => ({
            userData: { ...state.userData, ...userUpdates } as User,
          }))
        },
        removeUserData: () => {
          set({ userData: null })
          useThemeStore.getState().setTheme('system')
        },
      }),
      {
        name: 'user-data',
      }
    )
  )
)

export const useThemeStore = create<ThemeProviderState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'system',
        setTheme: (theme: Theme) => {
          set({ theme })
          const root = window.document.documentElement
          root.classList.remove('light', 'dark')
          if (theme === 'system') {
            const systemTheme = window.matchMedia(
              '(prefers-color-scheme: dark)'
            ).matches
              ? 'dark'
              : 'light'
            root.classList.add(systemTheme)
            return
          }
          root.classList.add(theme)
        },
      }),
      {
        name: 'ui-theme',
      }
    )
  )
)

export const useShoppingCartStore = create<ShoppingCartState>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        checkStoreId: (product: Product) => {
          const state = get()
          return state.cart.every(
            (item) => item.product.storeId === product.storeId
          )
        },
        addProduct: (product: Product) => {
          set((state) => {
            if (state.cart.length === 0) {
              return { cart: [{ product, quantity: 1 }] }
            }
            const existingProduct = state.cart.find(
              (item) => item.product._id === product._id
            )
            if (!existingProduct) {
              return { cart: [...state.cart, { product, quantity: 1 }] }
            }
            return state
          })
        },
        removeProduct: (productId: string) => {
          set((state) => ({
            cart: state.cart.filter((item) => item.product._id !== productId),
          }))
        },
        incrementQuantity: (productId: string) => {
          set((state) => ({
            cart: state.cart.map((item) =>
              item.product._id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }))
        },
        decrementQuantity: (productId: string) => {
          set((state) => ({
            cart: state.cart
              .map((item) =>
                item.product._id === productId && item.quantity > 1
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
              .filter((item) => item.quantity > 0),
          }))
        },
        isCartEmpty: () => {
          const state = get()
          return state.cart.length === 0
        },
        isProductInCart: (productId: string) => {
          const state = get()
          return state.cart.some((item) => item.product._id === productId)
        },
        clearCart: () => {
          set({ cart: [] })
        },
      }),
      {
        name: 'shopping-cart',
      }
    )
  )
)

export const useShippingAddressStore = create<ShippingAddressState>()(
  devtools(
    persist(
      (set, get) => ({
        shippingAddresses: [],
        addAllAddresses: (addresses: ShippingAddress[]) =>
          set({ shippingAddresses: addresses }),
        addOneShippingAddress: (address: ShippingAddress) =>
          set((state) => ({
            shippingAddresses: [...state.shippingAddresses, address],
          })),
        removeOneShippingAddress: (addressId: string) =>
          set((state) => ({
            shippingAddresses: state.shippingAddresses.filter(
              (address) => address.userId !== addressId
            ),
          })),
        clearShippingAddresses: () => set({ shippingAddresses: [] }),
        isShippingSet: () => get().shippingAddresses.length > 0,
      }),
      {
        name: 'shipping-address',
      }
    )
  )
)
