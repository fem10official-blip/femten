import { saveEmailLog } from './orderService'

export async function sendOrderConfirmationEmail(order) {
  const itemsSummary = order.items
    .map((item) => `${item.title} x${item.quantity} (Rs. ${item.price * item.quantity})`)
    .join(', ')

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const emailSubject = `Order Confirmation - #${order.id} | Femten`

  const plainTextMessage = `Dear ${order.customer.name},

Thank you for your order with Femten! Your order #${order.id} has been received and confirmed.

Order Summary:
• Items: ${itemsSummary}
• Total Amount: Rs. ${order.totalPrice} (Cash on Delivery)
• Delivery Address: ${order.customer.address}, ${order.customer.city}
• Contact Phone: ${order.customer.phone}
• Order Date: ${formattedDate}

Your package will arrive in 2 to 4 working days.

Warm regards,
Femten Care Team`

  const htmlMessage = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FAF7F2; padding: 24px; border-radius: 16px; color: #2C1810;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #B8860B; margin: 0; font-size: 28px;">Femten</h1>
        <p style="color: #786C5E; font-size: 13px; margin: 4px 0 0 0;">Extra Care, Everyday</p>
      </div>
      <div style="background: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #E5DFD5;">
        <h2 style="font-size: 20px; color: #2C1810; margin-top: 0;">Order Confirmed!</h2>
        <p style="font-size: 14px; line-height: 1.6; color: #554D43;">
          Dear <strong>${order.customer.name}</strong>,<br>
          Thank you for choosing Femten. Your order <strong>#${order.id}</strong> has been successfully placed.
        </p>

        <div style="border-top: 1px solid #EFEAE2; border-bottom: 1px solid #EFEAE2; padding: 16px 0; margin: 18px 0;">
          <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #B8860B; margin-top: 0;">Items Ordered</h3>
          <ul style="padding-left: 20px; font-size: 14px; line-height: 1.8; color: #332C24; margin: 8px 0;">
            ${order.items
              .map(
                (item) =>
                  `<li><strong>${item.title}</strong> &times; ${item.quantity} &mdash; Rs. ${item.price * item.quantity}</li>`
              )
              .join('')}
          </ul>
          <p style="font-size: 16px; font-weight: bold; color: #2C1810; margin: 12px 0 0 0;">
            Total Payable: Rs. ${order.totalPrice} <span style="font-size: 12px; font-weight: normal; color: #786C5E;">(Cash on Delivery)</span>
          </p>
        </div>

        <div style="font-size: 13px; line-height: 1.6; color: #554D43;">
          <p style="margin: 0;"><strong>Shipping To:</strong> ${order.customer.address}, ${order.customer.city}</p>
          <p style="margin: 4px 0 0 0;"><strong>Phone:</strong> ${order.customer.phone}</p>
          <p style="margin: 4px 0 0 0;"><strong>Expected Delivery:</strong> 2 - 4 business days</p>
        </div>
      </div>
      <p style="text-align: center; font-size: 12px; color: #A09689; margin-top: 24px;">
        Questions? Reply directly to this email or visit Femten.
      </p>
    </div>
  `

  try {
    const res = await fetch('/api/send-order-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: order.customer.email,
        subject: emailSubject,
        text: plainTextMessage,
        html: htmlMessage,
      }),
    })

    const result = await res.json()

    if (result.success) {
      saveEmailLog({
        orderId: order.id,
        recipient: order.customer.email,
        subject: emailSubject,
        body: plainTextMessage,
        status: 'Sent via SMTP',
        mode: 'smtp',
        messageId: result.messageId,
      })
      return { success: true, mode: 'smtp', messageId: result.messageId }
    } else {
      saveEmailLog({
        orderId: order.id,
        recipient: order.customer.email,
        subject: emailSubject,
        body: plainTextMessage,
        status: result.simulated
          ? 'Saved Locally (SMTP Credentials Pending in .env)'
          : `SMTP Error: ${result.error || 'Unknown'}`,
        mode: result.simulated ? 'simulated' : 'error',
      })
      return { success: result.simulated, mode: result.simulated ? 'simulated' : 'error' }
    }
  } catch (error) {
    console.error('Failed to contact SMTP email endpoint:', error)
    saveEmailLog({
      orderId: order.id,
      recipient: order.customer.email,
      subject: emailSubject,
      body: plainTextMessage,
      status: 'Network Error',
      mode: 'error',
    })
    return { success: false, error: error.message }
  }
}
