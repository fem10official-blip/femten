import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import nodemailer from 'nodemailer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || '').replace(/\/$/, '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'html-site-url',
        transformIndexHtml(html) {
          return html.replaceAll('%SITE_URL%', siteUrl)
        },
      },
      {
        name: 'smtp-email-server',
        configureServer(server) {
          server.middlewares.use('/api/send-order-email', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Method not allowed' }))
              return
            }

            let body = ''
            req.on('data', (chunk) => {
              body += chunk
            })

            req.on('end', async () => {
              res.setHeader('Content-Type', 'application/json')
              try {
                const data = JSON.parse(body || '{}')
                const { to, subject, html, text } = data

                const host = env.SMTP_HOST || 'smtp.gmail.com'
                const port = Number(env.SMTP_PORT) || 465
                const secure = port === 465
                const user = env.SMTP_USER
                const pass = env.SMTP_PASS
                const from = env.SMTP_FROM || (user ? `Femten <${user}>` : 'Femten <no-reply@femten.pk>')

                if (!user || !pass) {
                  console.warn('⚠️ [SMTP] SMTP_USER or SMTP_PASS is missing in .env')
                  res.statusCode = 200
                  res.end(
                    JSON.stringify({
                      success: false,
                      simulated: true,
                      message: 'SMTP credentials missing in .env. Please enter SMTP_USER and SMTP_PASS.',
                    })
                  )
                  return
                }

                const transporter = nodemailer.createTransport({
                  host,
                  port,
                  secure,
                  auth: {
                    user,
                    pass,
                  },
                })

                const info = await transporter.sendMail({
                  from,
                  to,
                  subject,
                  text,
                  html,
                })

                console.log('✅ [SMTP] Email sent successfully to:', to, 'ID:', info.messageId)
                res.statusCode = 200
                res.end(JSON.stringify({ success: true, messageId: info.messageId }))
              } catch (err) {
                console.error('❌ [SMTP Error]', err)
                res.statusCode = 500
                res.end(JSON.stringify({ success: false, error: err.message }))
              }
            })
          })
        },
      },
    ],
  }
})
