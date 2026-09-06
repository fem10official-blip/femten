import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import { InstagramIcon, FacebookIcon } from './SocialIcons'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    setEmail('')
  }

  return (
    <footer className="bg-neutral-900 text-cream">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-8 lg:py-16">
        {/* Brand */}
        <div className="col-span-2 md:col-span-2 lg:col-span-1">
          <img
            src="/logo/fem10logo.png"
            alt="Femten"
            className="h-16 max-w-[12rem] w-auto object-contain sm:h-24 sm:max-w-[16rem]"
          />
          <p className="mt-3 text-sm text-cream/80">Pure Care, Natural Beauty</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-cream/80 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <a href="mailto:hello@fem10.com" className="transition-colors hover:text-gold">
                hello@fem10.com
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <a href="tel:+923001234567" className="transition-colors hover:text-gold">
                +92 300 1234567
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <span>Lahore, Pakistan</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="col-span-2 md:col-span-2 lg:col-span-1">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Newsletter
          </h3>
          <p className="mt-4 text-sm text-cream/80">Join our newsletter</p>
          <form onSubmit={handleSubscribe} className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label htmlFor="footer-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="w-full rounded-full border border-cream/20 bg-neutral-800 px-4 py-3 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="min-h-11 shrink-0 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 active:scale-[0.98] hover:scale-105"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/40">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-5 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-cream/60 sm:text-sm">
            © 2026 Femten. All rights reserved.
          </p>
          <div className="flex gap-3 sm:absolute sm:right-6 sm:top-1/2 sm:-translate-y-1/2 lg:right-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-cream/70 transition-colors hover:text-gold"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-cream/70 transition-colors hover:text-gold"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
