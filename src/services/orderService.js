const ORDERS_STORAGE_KEY = 'fem10_orders'
const EMAIL_LOGS_STORAGE_KEY = 'fem10_email_logs'

export function getOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Error loading orders:', error)
    return []
  }
}

export function saveOrder(orderInput) {
  try {
    const currentOrders = getOrders()
    const newOrder = {
      id: orderInput.id || `FEM-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      customer: {
        name: orderInput.customer?.name || 'Customer',
        email: orderInput.customer?.email || '',
        phone: orderInput.customer?.phone || '',
        address: orderInput.customer?.address || '',
        city: orderInput.customer?.city || '',
        notes: orderInput.customer?.notes || '',
      },
      items: orderInput.items || [],
      totalPrice: orderInput.totalPrice || 0,
      paymentMethod: orderInput.paymentMethod || 'Cash on Delivery (COD)',
      status: orderInput.status || 'Pending',
    }

    const updated = [newOrder, ...currentOrders]
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('fem10_orders_updated'))
    return newOrder
  } catch (error) {
    console.error('Error saving order:', error)
    throw error
  }
}

export function updateOrderStatus(orderId, newStatus) {
  try {
    const currentOrders = getOrders()
    const updated = currentOrders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    )
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('fem10_orders_updated'))
    return updated
  } catch (error) {
    console.error('Error updating order status:', error)
    return getOrders()
  }
}

export function deleteOrder(orderId) {
  try {
    const currentOrders = getOrders()
    const updated = currentOrders.filter((order) => order.id !== orderId)
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new Event('fem10_orders_updated'))
    return updated
  } catch (error) {
    console.error('Error deleting order:', error)
    return getOrders()
  }
}

export function clearAllOrders() {
  try {
    localStorage.removeItem(ORDERS_STORAGE_KEY)
    window.dispatchEvent(new Event('fem10_orders_updated'))
  } catch (error) {
    console.error('Error clearing orders:', error)
  }
}

export function getEmailLogs() {
  try {
    const raw = localStorage.getItem(EMAIL_LOGS_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveEmailLog(log) {
  try {
    const logs = getEmailLogs()
    const updated = [
      {
        id: `LOG-${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...log,
      },
      ...logs,
    ]
    localStorage.setItem(EMAIL_LOGS_STORAGE_KEY, JSON.stringify(updated.slice(0, 100)))
  } catch (e) {
    console.error('Error saving email log:', e)
  }
}
