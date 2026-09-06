import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { InstagramIcon, FacebookIcon } from './SocialIcons'
import { buildWhatsAppUrl } from '../data/product'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const INSTAGRAM = 'https://www.instagram.com/fem10_official?utm_source=qr&stkn=YzhibXJ2NDhsajZy'
const FACEBOOK = 'https://www.facebook.com/share/1F2xbCQ27r/'
const askWhatsAppUrl = buildWhatsAppUrl('Hello Femten! I have a question.')

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="border-t border-gold/20 bg-[#141414] text-cream">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Top: brand + links + newsletter — compact 3-col on desktop */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 md:items-start">
          {/* Brand */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="inline-flex rounded-lg bg-cream p-2">
              <img
                src="/logo/fem10logo.png"
                alt="Femten"
                className="h-10 w-auto max-w-[8.5rem] object-contain sm:h-11"
              />
            </div>
            <p className="mt-3 max-w-[16rem] text-xs leading-relaxed text-cream/60 sm:text-[13px]">
              Pure Care, Natural Beauty
            </p>
            <div className="mt-3.5 flex items-center gap-2.5">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-gold hover:text-gold"
              >
                <FacebookIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href={askWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 items-center gap-1.5 rounded-full bg-gold/90 px-3.5 text-xs font-semibold text-white transition-colors hover:bg-gold"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Ask
              </a>
            </div>
          </div>

          {/* Links + Contact */}
          <div className="grid grid-cols-2 gap-6 text-center md:text-left">
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                Explore
              </h3>
              <ul className="mt-3.5 space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-cream/70 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                Contact
              </h3>
              <ul className="mt-3.5 space-y-2.5 text-xs text-cream/70 sm:text-sm">
                <li>
                  <a
                    href="mailto:fem10official@gmail.com"
                    className="inline-flex items-start justify-center gap-2 transition-colors hover:text-gold md:justify-start"
                  >
                    <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                    <span className="break-all text-left">fem10official@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+923027727778"
                    className="inline-flex items-center justify-center gap-2 transition-colors hover:text-gold md:justify-start"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0 text-gold" />
                    0302 7727778
                  </a>
                </li>
                <li className="inline-flex items-center justify-center gap-2 md:justify-start">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" />
                  Vehari, Pakistan
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter — slim */}
          <div className="text-center md:text-left">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
              Newsletter
            </h3>
            <p className="mt-3.5 text-xs leading-relaxed text-cream/55 sm:text-[13px]">
              Soft hair tips & offers — straight to your inbox.
            </p>
            {subscribed ? (
              <p className="mt-3 text-sm font-medium text-gold">You&apos;re subscribed.</p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mx-auto mt-3.5 flex max-w-sm flex-col gap-2 sm:flex-row md:mx-0"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="min-h-10 flex-1 rounded-full border border-cream/12 bg-white/[0.04] px-4 text-sm text-cream placeholder:text-cream/35 outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="min-h-10 shrink-0 rounded-full bg-gold px-5 text-sm font-semibold text-white transition-colors hover:bg-[#9A7209]"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Slim bottom bar */}
      <div className="border-t border-cream/[0.08]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-1.5 px-4 py-3.5 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-[11px] text-cream/45 sm:text-xs">
            © 2026 Femten. All rights reserved.
          </p>
          <p className="text-[11px] tracking-wide text-cream/35 sm:text-xs">
            Extra Gentle Daily Shampoo
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
