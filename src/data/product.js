export const WHATSAPP_NUMBER = '923027727778'

export const MAIN_PRODUCT = {
  id: 'fem10-shampoo',
  title: 'Extra Gentle Daily Shampoo',
  description: 'Infused with Amla, Reetha, Shikakai',
  price: 350,
  priceLabel: 'Rs. 350',
  image: '/images/product/our-best-seller.jpg',
}

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function openWhatsAppOrder(items) {
  const lines = items.map(
    (item) => `• ${item.title} x${item.quantity} — Rs. ${item.price * item.quantity}`
  )
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const message = [
    'Hello Femten! I want to place an order:',
    '',
    ...lines,
    '',
    `Total: Rs. ${total}`,
    '',
    'Please confirm availability. Thank you!',
  ].join('\n')

  window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
}

export function openWhatsAppBuyNow(product, quantity = 1) {
  openWhatsAppOrder([{ ...product, quantity }])
}
