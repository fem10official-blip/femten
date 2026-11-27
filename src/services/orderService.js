import { supabase } from './supabaseClient'

const ORDERS_STORAGE_KEY = 'fem10_orders'
const EMAIL_LOGS_STORAGE_KEY = 'fem10_email_logs'

function formatDbOrder(row) {
  return {
    id: row.id,
    createdAt: row.created_at,
    customer: row.customer || {},
    items: row.items || [],
    totalPrice: Number(row.total_price) || 0,
    paymentMethod: row.payment_method || 'Cash on Delivery (COD)',
    status: row.status || 'Pending',
  }
}

export async function getOrders() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && Array.isArray(data)) {
      const formatted = data.map(formatDbOrder)
      try {
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(formatted))
      } catch {}
      return formatted
    }
  } catch (err) {
    console.warn('Supabase fetch failed, falling back to local storage:', err)
  }

  // Fallback to local storage
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function saveOrder(orderInput) {
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

  // 1. Save to Supabase Cloud Database
  try {
    const { error } = await supabase.from('orders').insert([
      {
        id: newOrder.id,
        created_at: newOrder.createdAt,
        customer: newOrder.customer,
        items: newOrder.items,
        total_price: newOrder.totalPrice,
        payment_method: newOrder.paymentMethod,
        status: newOrder.status,
      },
    ])
    if (error) {
      console.error('Supabase insert error:', error)
    } else {
      console.log('Order successfully synced to Supabase Cloud:', newOrder.id)
    }
  } catch (err) {
    console.error('Supabase saveOrder exception:', err)
  }

  // 2. Cache locally in browser
  try {
    const local = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]')
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([newOrder, ...local]))
  } catch {}

  window.dispatchEvent(new Event('fem10_orders_updated'))
  return newOrder
}

export async function updateOrderStatus(orderId, newStatus) {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId)
    if (error) console.error('Supabase update status error:', error)
  } catch (err) {
    console.error('Supabase updateOrderStatus exception:', err)
  }

  try {
    const local = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]')
    const updated = local.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated))
  } catch {}

  window.dispatchEvent(new Event('fem10_orders_updated'))
}

export async function deleteOrder(orderId) {
  try {
    const { error } = await supabase.from('orders').delete().eq('id', orderId)
    if (error) console.error('Supabase delete error:', error)
  } catch (err) {
    console.error('Supabase deleteOrder exception:', err)
  }

  try {
    const local = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]')
    const updated = local.filter((o) => o.id !== orderId)
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated))
  } catch {}

  window.dispatchEvent(new Event('fem10_orders_updated'))
}

export async function clearAllOrders() {
  try {
    await supabase.from('orders').delete().neq('id', '')
  } catch (err) {
    console.error('Supabase clearAllOrders error:', err)
  }

  try {
    localStorage.removeItem(ORDERS_STORAGE_KEY)
  } catch {}

  window.dispatchEvent(new Event('fem10_orders_updated'))
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
