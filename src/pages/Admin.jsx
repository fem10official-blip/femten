import { useEffect, useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Filter,
  KeyRound,
  LogOut,
  Mail,
  Package,
  Phone,
  PlusCircle,
  RefreshCw,
  Search,
  ShieldAlert,
  Trash2,
  TrendingUp,
  User,
} from 'lucide-react'
import {
  clearAllOrders,
  deleteOrder,
  getEmailLogs,
  getOrders,
  saveOrder,
  updateOrderStatus,
} from '../services/orderService'
import { supabase } from '../services/supabaseClient'

const ADMIN_STORAGE_KEY = 'fem10_admin_logged_in'
// Allowed administrator passwords
const ALLOWED_PASSWORDS = [
  'Fem10#SecureAdmin!2026',
  'Fem10',
  'admin123',
  import.meta.env.VITE_ADMIN_PASSWORD,
].filter(Boolean)

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true'
  })
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginError] = useState('')

  const [orders, setOrders] = useState([])
  const [emailLogs, setEmailLogs] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [activeTab, setActiveTab] = useState('orders')

  // Load orders from Supabase cloud database
  const refreshData = async () => {
    setLoadingOrders(true)
    try {
      const fetched = await getOrders()
      setOrders(fetched)
    } finally {
      setLoadingOrders(false)
    }
    setEmailLogs(getEmailLogs())
  }

  useEffect(() => {
    if (isAuthenticated) {
      refreshData()
      window.addEventListener('fem10_orders_updated', refreshData)

      // Supabase Realtime Subscription for instant order updates!
      const channel = supabase
        .channel('admin-live-orders')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
          refreshData()
        })
        .subscribe()

      return () => {
        window.removeEventListener('fem10_orders_updated', refreshData)
        supabase.removeChannel(channel)
      }
    }
  }, [isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    const entered = passwordInput.trim()
    if (ALLOWED_PASSWORDS.some((pass) => pass === entered)) {
      localStorage.setItem(ADMIN_STORAGE_KEY, 'true')
      setIsAuthenticated(true)
      setLoginError('')
    } else {
      setLoginError('Invalid administrator password. Access denied.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_STORAGE_KEY)
    setIsAuthenticated(false)
    setPasswordInput('')
  }

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus)
    refreshData()
  }

  const handleDelete = async (orderId) => {
    if (window.confirm(`Are you sure you want to delete Order #${orderId}?`)) {
      await deleteOrder(orderId)
      refreshData()
    }
  }

  const handleClearAll = async () => {
    if (window.confirm('Warning: All orders will be permanently deleted. Do you wish to proceed?')) {
      await clearAllOrders()
      refreshData()
    }
  }

  const handleAddSampleOrder = async (isBundle = false) => {
    if (isBundle) {
      await saveOrder({
        customer: {
          name: 'Zainab Tariq',
          email: 'zainab.tariq@example.com',
          phone: '0300-9876543',
          address: 'Apartment 4B, Gulberg Heights',
          city: 'Lahore',
          notes: 'Special offer bundle of three',
        },
        items: [
          {
            id: 'fem10-bundle-of-three',
            title: 'Bundle of Three (Pack of 3)',
            price: 999,
            priceLabel: 'Rs. 999',
            image: '/images/product/product-group(3).jpg',
            quantity: 1,
          },
        ],
        totalPrice: 999,
        paymentMethod: 'Cash on Delivery (COD)',
        status: 'Pending',
      })
    } else {
      await saveOrder({
        customer: {
          name: 'Ayesha Malik',
          email: 'ayesha.malik@example.com',
          phone: '0321-4567890',
          address: 'House # 42-B, Street 12, DHA Phase 5',
          city: 'Lahore',
          notes: 'Please call before delivery',
        },
        items: [
          {
            id: 'fem10-shampoo',
            title: 'Extra Gentle Daily Shampoo',
            price: 450,
            priceLabel: 'Rs. 450',
            image: '/images/product/our-best-seller.jpg',
            quantity: 2,
          },
        ],
        totalPrice: 900,
        paymentMethod: 'Cash on Delivery (COD)',
        status: 'Pending',
      })
    }
    refreshData()
  }

  // Filtered orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.city?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Summary Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0)
  const pendingCount = orders.filter((o) => o.status === 'Pending').length
  const deliveredCount = orders.filter((o) => o.status === 'Delivered').length

  // Admin Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl ring-1 ring-stone-200">
          <div className="text-center mb-6">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold">
              <KeyRound className="h-7 w-7" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#2C1810]">
              Femten Admin Portal
            </h1>
            <p className="mt-1 text-xs text-stone-500">
              Restricted area. Please sign in with your administrator credentials.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-600 border border-red-200">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Administrator Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-[#2C1810] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 border-t border-stone-100 pt-4 text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-stone-400">
              <ShieldAlert className="h-3.5 w-3.5" /> Confidential area &mdash; Authorized personnel only
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Admin Dashboard View
  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-16 pt-20">
      {/* Top Admin Navbar */}
      <div className="border-b border-stone-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="font-serif text-xl font-bold text-[#2C1810] sm:text-2xl">
                Femten Admin Portal
              </h1>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                Cloud Connected ⚡
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Manage customer orders, fulfillment statuses, and email confirmation logs
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={refreshData}
              disabled={loadingOrders}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loadingOrders ? 'animate-spin text-gold' : ''}`} />
              {loadingOrders ? 'Syncing...' : 'Refresh'}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 mb-6">
          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-1">
              <span className="text-xs font-medium uppercase tracking-wider">Total Orders</span>
              <Package className="h-4 w-4 text-gold" />
            </div>
            <p className="font-serif text-2xl font-bold text-[#2C1810]">{orders.length}</p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-1">
              <span className="text-xs font-medium uppercase tracking-wider">Total Revenue</span>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-[#2C1810]">Rs. {totalRevenue}</p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-1">
              <span className="text-xs font-medium uppercase tracking-wider">Pending</span>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <p className="font-serif text-2xl font-bold text-[#2C1810]">{pendingCount}</p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-stone-500 mb-1">
              <span className="text-xs font-medium uppercase tracking-wider">Delivered</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="font-serif text-2xl font-bold text-[#2C1810]">{deliveredCount}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between border-b border-stone-200 mb-6">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={[
                'pb-3 text-sm font-semibold border-b-2 transition-colors',
                activeTab === 'orders'
                  ? 'border-gold text-gold'
                  : 'border-transparent text-stone-500 hover:text-stone-800',
              ].join(' ')}
            >
              Orders ({orders.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('emails')}
              className={[
                'pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5',
                activeTab === 'emails'
                  ? 'border-gold text-gold'
                  : 'border-transparent text-stone-500 hover:text-stone-800',
              ].join(' ')}
            >
              <Mail className="h-4 w-4" />
              Email Confirmation Logs ({emailLogs.length})
            </button>
          </div>

          <div className="flex items-center gap-2 pb-2">
            <button
              type="button"
              onClick={() => handleAddSampleOrder(false)}
              className="inline-flex items-center gap-1 rounded-lg bg-gold/10 px-2.5 py-1 text-xs font-semibold text-gold hover:bg-gold/20"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              + Sample Order (Single)
            </button>
            <button
              type="button"
              onClick={() => handleAddSampleOrder(true)}
              className="inline-flex items-center gap-1 rounded-lg bg-gold px-2.5 py-1 text-xs font-semibold text-white hover:bg-gold/90 shadow-sm"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              + Bundle of 3 Order (Rs. 999)
            </button>
            {orders.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div>
            {/* Search and Filters */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Name, Phone, or City..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 bg-white pl-9 pr-3 py-2 text-xs text-[#2C1810] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                <Filter className="h-3.5 w-3.5 text-stone-400 mr-1 shrink-0" />
                {['ALL', 'Pending', 'Processing', 'Delivered', 'Cancelled'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={[
                      'rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors',
                      statusFilter === status
                        ? 'bg-gold text-white shadow-xs'
                        : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200',
                    ].join(' ')}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="rounded-2xl border border-stone-200 bg-white py-14 text-center shadow-xs">
                <Package className="mx-auto h-12 w-12 text-stone-300 mb-3" />
                <p className="text-base font-semibold text-[#2C1810]">No orders found</p>
                <p className="mt-1 text-xs text-stone-500">
                  {searchQuery || statusFilter !== 'ALL'
                    ? 'No orders match your current filters.'
                    : 'No orders have been received yet. Click "Add Sample Order" to test the display.'}
                </p>
                {!orders.length && (
                  <button
                    type="button"
                    onClick={handleAddSampleOrder}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-white shadow-sm hover:scale-105 transition-transform"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Create Sample Order
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-sm transition-all hover:border-gold/40"
                  >
                    {/* Top Order Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-lg font-bold text-[#2C1810]">
                          #{order.id}
                        </span>
                        <span className="text-xs text-stone-400">
                          {new Date(order.createdAt).toLocaleString('en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={[
                            'rounded-lg px-2.5 py-1 text-xs font-semibold border focus:outline-none cursor-pointer',
                            order.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : order.status === 'Processing'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : order.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200',
                          ].join(' ')}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handleDelete(order.id)}
                          className="rounded-lg p-1.5 text-stone-400 hover:bg-red-50 hover:text-red-600"
                          title="Delete Order"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Customer & Items grid */}
                    <div className="grid grid-cols-1 gap-4 pt-3 sm:grid-cols-2">
                      {/* Customer Info */}
                      <div className="space-y-1.5 text-xs text-stone-600">
                        <p className="font-bold uppercase tracking-wider text-[10px] text-gold">
                          Customer Information
                        </p>
                        <p className="font-semibold text-stone-900 text-sm flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-stone-400" />
                          {order.customer?.name}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-stone-400" />
                          <a
                            href={`mailto:${order.customer?.email}`}
                            className="text-stone-700 hover:text-gold hover:underline"
                          >
                            {order.customer?.email}
                          </a>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-stone-400" />
                          <a
                            href={`tel:${order.customer?.phone}`}
                            className="text-stone-700 hover:text-gold hover:underline"
                          >
                            {order.customer?.phone}
                          </a>
                        </p>
                        <p className="text-stone-700 leading-snug">
                          <strong>Address:</strong> {order.customer?.address}, {order.customer?.city}
                        </p>
                        {order.customer?.notes && (
                          <p className="italic text-stone-500">
                            <strong>Note:</strong> "{order.customer?.notes}"
                          </p>
                        )}
                      </div>

                      {/* Items Info */}
                      <div>
                        <p className="font-bold uppercase tracking-wider text-[10px] text-gold mb-2">
                          Ordered Items
                        </p>
                        <ul className="space-y-2">
                          {order.items?.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-center justify-between rounded-xl bg-stone-50 p-2 text-xs"
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="h-10 w-10 rounded-md object-cover"
                                />
                                <div>
                                  <p className="font-semibold text-[#2C1810]">{item.title}</p>
                                  <p className="text-stone-500">
                                    Qty: {item.quantity} &times; Rs. {item.price}
                                  </p>
                                </div>
                              </div>
                              <span className="font-bold text-[#2C1810]">
                                Rs. {item.price * item.quantity}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2 text-xs">
                          <span className="text-stone-500">Payment: {order.paymentMethod}</span>
                          <span className="text-sm font-bold text-[#2C1810]">
                            Total: Rs. {order.totalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EMAIL LOGS */}
        {activeTab === 'emails' && (
          <div>
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm mb-4">
              <h3 className="font-serif text-lg font-bold text-[#2C1810] mb-1">
                Order Confirmation Email Deliveries
              </h3>
              <p className="text-xs text-stone-600 mb-3">
                Whenever a customer submits an order, the system automatically dispatches an order confirmation notification.
              </p>
              <div className="rounded-xl bg-gold/10 p-4 text-xs text-[#2C1810] border border-gold/25 space-y-2">
                <p className="font-semibold text-sm">💡 Simple SMTP Email Setup:</p>
                <p className="text-stone-700 leading-relaxed">
                  The system uses standard <strong>SMTP (Nodemailer)</strong> to send real confirmation emails directly to customer inboxes. To enable it, open your <code className="bg-white/80 px-1 py-0.5 rounded font-mono">.env</code> file and fill in your email credentials:
                </p>
                <div className="bg-white/80 p-3 rounded-lg border border-stone-200">
                  <p className="font-bold text-[#2C1810]">Your SMTP Settings in .env:</p>
                  <code className="text-[11px] block mt-1 font-mono bg-stone-100 p-2 rounded text-stone-800 leading-relaxed">
                    SMTP_HOST=smtp.gmail.com<br />
                    SMTP_PORT=465<br />
                    SMTP_USER=your_email@gmail.com<br />
                    SMTP_PASS=your_gmail_app_password<br />
                    SMTP_FROM=Femten &lt;your_email@gmail.com&gt;
                  </code>
                  <p className="text-[11px] text-stone-500 mt-2">
                    * For Gmail: Use a 16-character <strong>App Password</strong> from <em>Google Account &gt; Security &gt; 2-Step Verification &gt; App Passwords</em>.
                  </p>
                </div>
              </div>
            </div>

            {emailLogs.length === 0 ? (
              <div className="rounded-2xl border border-stone-200 bg-white py-12 text-center shadow-xs">
                <Mail className="mx-auto h-12 w-12 text-stone-300 mb-3" />
                <p className="text-base font-semibold text-[#2C1810]">No email logs available</p>
                <p className="mt-1 text-xs text-stone-500">
                  Confirmation emails will be logged here as soon as orders are placed.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {emailLogs.map((log) => (
                  <div
                    key={log.id}
                    className="rounded-xl border border-stone-200 bg-white p-4 text-xs shadow-xs"
                  >
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gold" />
                        <span className="font-semibold text-[#2C1810]">{log.recipient}</span>
                        <span className="text-[10px] text-stone-400">({log.status})</span>
                      </div>
                      <span className="text-[11px] text-stone-400">
                        {new Date(log.timestamp).toLocaleString('en-US', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </span>
                    </div>

                    <p className="font-bold text-stone-800 mb-1">{log.subject}</p>
                    <pre className="whitespace-pre-wrap font-sans bg-stone-50 rounded-lg p-2.5 text-stone-700 text-[11px] leading-relaxed border border-stone-100">
                      {log.body}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
