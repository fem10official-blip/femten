import nodemailer from 'nodemailer'

const SMTP_USER = process.env.SMTP_USER || 'toobaamjad098@gmail.com'
const SMTP_PASS = (process.env.SMTP_PASS || 'qymcxqnkqkkttbgm').replace(/\s+/g, '')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
})

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { order, to, subject, html, text } = req.body || {}

    if (!order && !to) {
      return res.status(400).json({ error: 'Order or recipient details required' })
    }

    const orderData = order || {}
    const customer = orderData.customer || {}
    const items = orderData.items || []
    const orderId = orderData.id || `FEM-${Date.now().toString().slice(-6)}`
    const totalPrice = orderData.totalPrice || 0

    // 1. Send Alert Email to Store Owner (toobaamjad098@gmail.com)
    const adminMailPromise = transporter.sendMail({
      from: `"Femten Store" <${SMTP_USER}>`,
      to: 'toobaamjad098@gmail.com',
      subject: `🔔 NEW ORDER #${orderId} - Rs. ${totalPrice} (COD)`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #E5DFD5; border-radius: 12px; background-color: #FAF7F2; color: #2C1810;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #B8860B; margin: 0; font-size: 26px;">Femten</h1>
            <p style="color: #786C5E; font-size: 13px; margin: 4px 0 0 0;">New Order Notification</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #E5DFD5;">
            <h2 style="color: #2C1810; margin-top: 0; font-size: 20px;">🎉 Naya Order Receive Hua Hai!</h2>
            <p style="font-size: 15px; margin: 4px 0;"><strong>Order ID:</strong> #${orderId}</p>
            <p style="font-size: 15px; margin: 4px 0;"><strong>Date:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })}</p>
            <p style="font-size: 15px; margin: 4px 0;"><strong>Payment:</strong> Cash on Delivery (COD)</p>

            <div style="margin: 20px 0; padding: 15px; background-color: #F8F5F0; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #B8860B; font-size: 15px; text-transform: uppercase;">Customer Details</h3>
              <p style="margin: 6px 0;"><strong>Name:</strong> ${customer.name || 'N/A'}</p>
              <p style="margin: 6px 0;"><strong>Phone:</strong> <a href="tel:${customer.phone}" style="color: #B8860B; font-weight: bold;">${customer.phone || 'N/A'}</a></p>
              <p style="margin: 6px 0;"><strong>Delivery Address:</strong> ${customer.address || 'N/A'}, ${customer.city || ''}</p>
              <p style="margin: 6px 0;"><strong>Email:</strong> ${customer.email || 'N/A'}</p>
              ${customer.notes ? `<p style="margin: 6px 0;"><strong>Customer Notes:</strong> ${customer.notes}</p>` : ''}
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #B8860B; font-size: 15px; text-transform: uppercase;">Ordered Items</h3>
              <ul style="padding-left: 20px; line-height: 1.8;">
                ${items.map((i) => `<li><strong>${i.title}</strong> &times; ${i.quantity} &mdash; Rs. ${i.price * i.quantity}</li>`).join('')}
              </ul>
              <div style="border-top: 1px solid #EFEAE2; padding-top: 10px; font-size: 18px; font-weight: bold; color: #2C1810;">
                Total Payable: Rs. ${totalPrice} (Cash on Delivery)
              </div>
            </div>

            <div style="text-align: center; margin-top: 25px;">
              <a href="https://www.femtenofficial.com/admin" style="display: inline-block; background-color: #B8860B; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 25px; font-weight: bold; font-size: 14px;">
                Open Admin Portal
              </a>
            </div>
          </div>
        </div>
      `,
    })

    // 2. Send Confirmation Email to Customer (if valid customer email)
    const customerEmail = customer.email || to
    let customerMailPromise = Promise.resolve()

    if (customerEmail && customerEmail.includes('@') && !customerEmail.includes('example.com')) {
      customerMailPromise = transporter.sendMail({
        from: `"Femten" <${SMTP_USER}>`,
        to: customerEmail,
        subject: `Order Confirmation - #${orderId} | Femten`,
        html: html || `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #E5DFD5; border-radius: 12px; background-color: #FAF7F2; color: #2C1810;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #B8860B; margin: 0; font-size: 26px;">Femten</h1>
              <p style="color: #786C5E; font-size: 13px; margin: 4px 0 0 0;">Extra Care, Everyday</p>
            </div>
            <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; border: 1px solid #E5DFD5;">
              <h2 style="color: #2C1810; margin-top: 0;">Order Confirmed!</h2>
              <p>Dear <strong>${customer.name || 'Customer'}</strong>,</p>
              <p>Thank you for choosing Femten! Your order <strong>#${orderId}</strong> has been received and confirmed.</p>
              <div style="margin: 20px 0; border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 15px 0;">
                <h3 style="color: #B8860B; font-size: 14px; text-transform: uppercase;">Order Summary</h3>
                <ul style="padding-left: 20px; line-height: 1.8;">
                  ${items.map((i) => `<li><strong>${i.title}</strong> &times; ${i.quantity} &mdash; Rs. ${i.price * i.quantity}</li>`).join('')}
                </ul>
                <p style="font-size: 16px; font-weight: bold; margin: 10px 0 0 0;">Total Payable: Rs. ${totalPrice} (Cash on Delivery)</p>
              </div>
              <p style="font-size: 13px; color: #555;"><strong>Delivery Address:</strong> ${customer.address || ''}, ${customer.city || ''}</p>
              <p style="font-size: 13px; color: #555;"><strong>Estimated Delivery:</strong> 2 to 4 working days</p>
            </div>
          </div>
        `,
      })
    }

    const results = await Promise.allSettled([adminMailPromise, customerMailPromise])
    console.log('Emails dispatched successfully:', results)

    return res.status(200).json({ success: true, message: 'Emails sent successfully' })
  } catch (error) {
    console.error('Email dispatch error:', error)
    return res.status(500).json({ success: false, error: error.message })
  }
}
