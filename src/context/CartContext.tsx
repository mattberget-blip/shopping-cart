import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../types/product'

export type CartItem = {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  updateQuantity: (productId: string, quantity: number) => void
  total: number
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'frontend-future-cart'

function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persistCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart())

  const value = useMemo<CartContextValue>(() => {
    const addItem = (product: Product, quantity = 1) => {
      setItems((current) => {
        const existing = current.find((item) => item.id === product.id)
        const next = existing
          ? current.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            )
          : [
              ...current,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity,
              },
            ]

        persistCart(next)
        return next
      })
    }

    const updateQuantity = (productId: string, quantity: number) => {
      setItems((current) => {
        const next =
          quantity <= 0
            ? current.filter((item) => item.id !== productId)
            : current.map((item) =>
                item.id === productId ? { ...item, quantity } : item,
              )

        persistCart(next)
        return next
      })
    }

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )

    return { items, addItem, updateQuantity, total }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
