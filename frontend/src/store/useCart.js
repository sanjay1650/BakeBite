import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        const items = get().items
        const existing = items.find((i) => i.id === product.id)
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
            ),
          })
        } else {
          set({ items: [...items, { ...product, quantity }] })
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.id !== productId) })
      },
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return
        set({
          items: get().items.map((i) =>
            i.id === productId ? { ...i, quantity } : i
          ),
        })
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      },
    }),
    {
      name: 'cookie-crave-cart',
    }
  )
)
