import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'fem10-cart'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => loadCart())
  const [isOpen, setIsOpen] = useState(false)
  const [drawerStep, setDrawerStep] = useState('cart') // 'cart' | 'checkout' | 'success'
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          priceLabel: product.priceLabel,
          image: product.image,
          quantity,
        },
      ]
    })
    setDrawerStep('cart')
    setIsOpen(true)
  }

  const buyNow = (product, quantity = 1) => {
    addToCart(product, quantity)
    setDrawerStep('checkout')
    setIsOpen(true)
  }

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id)
      return
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => setItems([])

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  )

  const closeCart = () => {
    setIsOpen(false)
    // Reset to 'cart' step slightly after closing animation
    setTimeout(() => {
      if (drawerStep === 'success') {
        setDrawerStep('cart')
      }
    }, 300)
  }

  const value = {
    items,
    isOpen,
    drawerStep,
    setDrawerStep,
    lastPlacedOrder,
    setLastPlacedOrder,
    openCart: () => {
      setDrawerStep('cart')
      setIsOpen(true)
    },
    closeCart,
    addToCart,
    buyNow,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
