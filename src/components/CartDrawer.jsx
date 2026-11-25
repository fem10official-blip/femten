import { useState } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  MapPin,
  Minus,
  PackageCheck,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  User,
  X,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { saveOrder } from '../services/orderService'
import { sendOrderConfirmationEmail } from '../services/emailService'

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
    drawerStep,
    setDrawerStep,
    lastPlacedOrder,
    setLastPlacedOrder,
  } = useCart()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const handleProceedToCheckout = () => {
    if (!items.length) return
    setError('')
    setDrawerStep('checkout')
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      setError('Please enter your full name')
      return
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid email address for order confirmation')
      return
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError('Please enter a valid phone number')
      return
    }
    if (!formData.address.trim()) {
      setError('Please enter your delivery address')
      return
    }
    if (!formData.city.trim()) {
      setError('Please enter your city')
      return
    }

    setLoading(true)
    setError('')

    try {
      // 1. Save order locally
      const order = saveOrder({
        customer: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          notes: formData.notes.trim(),
        },
        items: [...items],
        totalPrice,
        paymentMethod: 'Cash on Delivery (COD)',
      })

      // 2. Dispatch order confirmation email
      await sendOrderConfirmationEmail(order)

      // 3. Clear cart & transition to confirmation screen
      setLastPlacedOrder(order)
      clearCart()
      setDrawerStep('success')
    } catch (err) {
      console.error('Order placement error:', err)
      setError('An error occurred while placing your order. Please try again.')
    } finally {
      setLoading(false)
    }
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
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        aria-label="Close cart"
        onClick={closeCart}
      />

      <aside
        className={[
          'absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out sm:w-[min(26rem,94vw)] safe-pb',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200/80 px-5 py-4">
          <div className="flex items-center gap-2">
            {drawerStep === 'checkout' && (
              <button
                type="button"
                onClick={() => setDrawerStep('cart')}
                className="mr-1 rounded-md p-1 text-stone-700 hover:bg-stone-200/50"
                aria-label="Back to Cart"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <ShoppingBag className="h-5 w-5 text-gold" />
            <h2 className="font-serif text-xl font-bold text-[#2C1810]">
              {drawerStep === 'cart' && `Your Cart (${totalItems})`}
              {drawerStep === 'checkout' && 'Checkout & Delivery'}
              {drawerStep === 'success' && 'Order Placed!'}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-md p-1.5 text-stone-700 hover:bg-stone-200/60"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {/* STEP 1: CART ITEMS */}
          {drawerStep === 'cart' && (
            <>
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                    <ShoppingBag className="h-7 w-7" />
                  </div>
                  <p className="text-base font-medium text-[#2C1810]">Your cart is empty</p>
                  <p className="mt-1 text-xs text-stone-500">
                    Add Femten daily shampoo to get started.
                  </p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-stone-200/60"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#2C1810]">{item.title}</p>
                        <p className="mt-0.5 text-sm font-medium text-gold">{item.priceLabel}</p>
                        <div className="mt-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50/50 px-2 py-0.5">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              className="rounded-full p-1 hover:bg-stone-200/60 text-stone-600"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-5 text-center text-xs font-semibold text-[#2C1810]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              className="rounded-full p-1 hover:bg-stone-200/60 text-stone-600"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            type="button"
                            aria-label="Remove item"
                            className="rounded-md p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-600"
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
            </>
          )}

          {/* STEP 2: CHECKOUT FORM */}
          {drawerStep === 'checkout' && (
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="rounded-xl border border-gold/30 bg-gold/10 p-3 text-xs text-[#2C1810]">
                <p className="font-semibold flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-gold shrink-0" />
                  Order confirmation email will be sent
                </p>
                <p className="mt-1 text-stone-600">
                  Please provide an accurate email address to receive your order summary and delivery details immediately.
                </p>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 p-2.5 text-xs font-medium text-red-600 border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-gold" /> Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Fatima Khan"
                  required
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-[#2C1810] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-gold" /> Email Address (for confirmation) *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. fatima@example.com"
                  required
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-[#2C1810] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-gold" /> Phone / Mobile Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g. 0300 1234567"
                  required
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-[#2C1810] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-gold" /> Delivery Address *
                </label>
                <textarea
                  name="address"
                  rows={2}
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House / Apartment #, Street, Area"
                  required
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-sm text-[#2C1810] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g. Lahore, Karachi, Islamabad"
                  required
                  className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-[#2C1810] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-3">
                <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
                  <span>Payment Method:</span>
                  <span className="font-semibold text-[#2C1810] flex items-center gap-1">
                    <Truck className="h-3.5 w-3.5 text-gold" /> Cash on Delivery (COD)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Estimated Delivery:</span>
                  <span className="font-medium text-stone-800">2-4 Working Days</span>
                </div>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER SUCCESS */}
          {drawerStep === 'success' && lastPlacedOrder && (
            <div className="py-6 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#2C1810]">
                  Order Placed Successfully!
                </h3>
                <p className="mt-1 text-sm font-semibold text-gold">
                  Order ID: #{lastPlacedOrder.id}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-left text-xs space-y-2">
                <p className="font-semibold text-emerald-900 flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-emerald-700 shrink-0" />
                  Confirmation Email Sent!
                </p>
                <p className="text-emerald-800 leading-relaxed">
                  A confirmation email with your order summary has been dispatched to <strong>{lastPlacedOrder.customer.email}</strong>.
                </p>
              </div>

              <div className="rounded-xl border border-stone-200 bg-white p-4 text-left space-y-2 text-xs">
                <p className="font-bold text-stone-700 uppercase tracking-wider text-[10px]">
                  Order Summary
                </p>
                <p className="text-stone-700">
                  <strong>Customer:</strong> {lastPlacedOrder.customer.name} ({lastPlacedOrder.customer.phone})
                </p>
                <p className="text-stone-700">
                  <strong>Delivery Address:</strong> {lastPlacedOrder.customer.address}, {lastPlacedOrder.customer.city}
                </p>
                <p className="text-stone-700">
                  <strong>Items:</strong> {lastPlacedOrder.items.map((i) => `${i.title} x${i.quantity}`).join(', ')}
                </p>
                <div className="border-t border-stone-100 pt-2 flex justify-between font-bold text-sm text-[#2C1810]">
                  <span>Total Payable:</span>
                  <span>Rs. {lastPlacedOrder.totalPrice} (COD)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCart}
                className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-105"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {drawerStep === 'cart' && items.length > 0 && (
          <div className="border-t border-stone-200 px-5 py-4 safe-pb bg-cream">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-stone-600">Total</span>
              <span className="text-xl font-bold text-[#2C1810]">Rs. {totalPrice}</span>
            </div>
            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105"
            >
              Proceed to Checkout
            </button>
            <button
              type="button"
              onClick={clearCart}
              className="mt-2 w-full py-1 text-xs text-stone-500 hover:text-stone-800"
            >
              Clear cart
            </button>
          </div>
        )}

        {drawerStep === 'checkout' && (
          <div className="border-t border-stone-200 px-5 py-4 safe-pb bg-cream">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-stone-600">Total Payable:</span>
              <span className="text-lg font-bold text-[#2C1810]">Rs. {totalPrice}</span>
            </div>
            <button
              type="submit"
              form="checkout-form"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-gold py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Placing Order...
                </>
              ) : (
                <>
                  <PackageCheck className="h-4 w-4" />
                  Confirm & Place Order
                </>
              )}
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer
