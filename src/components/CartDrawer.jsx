import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { openWhatsAppOrder } from '../data/product'

function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart()

  const handleBuyNow = () => {
    if (!items.length) return
    openWhatsAppOrder(items)
  }

  return (
    <div
      className={[
        'fixed inset-0 z-[60] transition-opacity duration-300',
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      ].join(' ')}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close cart"
        onClick={closeCart}
      />

      <aside
        className={[
          'absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out sm:w-[min(24rem,92vw)] safe-pb',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-gold" />
            <h2 className="font-serif text-xl font-bold text-[#2C1810]">
              Your Cart ({totalItems})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-md p-1 text-stone-700 hover:bg-stone-100"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="py-10 text-center text-sm text-stone-500">
              Your cart is empty. Add Femten shampoo to get started.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-stone-100"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#2C1810]">{item.title}</p>
                    <p className="mt-0.5 text-sm text-gold">{item.priceLabel}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-stone-200 px-1.5 py-0.5">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="rounded-full p-1 hover:bg-stone-100"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-5 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="rounded-full p-1 hover:bg-stone-100"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label="Remove item"
                        className="rounded-md p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-500"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-stone-200 px-5 py-4 safe-pb">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-stone-600">Total</span>
            <span className="text-lg font-bold text-[#2C1810]">Rs. {totalPrice}</span>
          </div>
          <button
            type="button"
            disabled={!items.length}
            onClick={handleBuyNow}
            className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            Buy Now on WhatsApp
          </button>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="mt-2 w-full py-2 text-xs text-stone-500 hover:text-stone-800"
            >
              Clear cart
            </button>
          )}
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
