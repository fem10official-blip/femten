import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems, openCart } = useCart()
  const { pathname } = useLocation()

  // Cream pages need solid nav; only Home hero gets transparent cream-on-dark links
  const solidNav = scrolled || menuOpen || pathname !== '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const linkClass = ({ isActive }) =>
    [
      'text-base tracking-wide transition-colors duration-200 sm:text-lg',
      solidNav
        ? isActive
          ? 'text-gold'
          : 'text-stone-800 hover:text-gold'
        : isActive
          ? 'text-gold'
          : 'text-cream/90 hover:text-gold',
    ].join(' ')

  const iconBtnClass = [
    'relative inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors',
    solidNav ? 'text-stone-900' : 'text-cream',
  ].join(' ')

  return (
    <>
      <header
        className={[
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          solidNav
            ? 'bg-cream/95 shadow-md backdrop-blur-sm'
            : 'bg-transparent',
        ].join(' ')}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2 safe-pt sm:gap-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="group flex shrink-0 items-center"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="/logo/fem10logo.png"
              alt="Femten"
              className="h-10 max-h-12 w-auto max-w-[9rem] object-contain sm:h-11 md:h-12 md:max-w-[11rem]"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openCart}
              className={iconBtnClass}
              aria-label={`Open cart${totalItems ? `, ${totalItems} items` : ''}`}
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <Link
              to="/shop"
              className="hidden rounded-full bg-gold px-5 py-2 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-105 md:inline-flex"
            >
              Shop Now
            </Link>

            <button
              type="button"
              className={[
                'inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden',
                solidNav ? 'text-stone-900' : 'text-cream',
              ].join(' ')}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={[
          'fixed inset-0 z-40 md:hidden transition-opacity duration-300',
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/40"
          aria-label="Close menu overlay"
          onClick={() => setMenuOpen(false)}
        />
        <aside
          className={[
            'absolute right-0 top-0 flex h-full w-[min(20rem,88vw)] flex-col bg-cream shadow-xl transition-transform duration-300 ease-out safe-pb',
            menuOpen ? 'translate-x-0' : 'translate-x-full',
          ].join(' ')}
        >
          <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4 safe-pt">
            <img
              src="/logo/fem10logo.png"
              alt="Femten"
              className="h-9 w-auto object-contain"
            />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-stone-800"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    'rounded-xl px-4 py-3.5 text-lg font-medium transition-colors',
                    isActive ? 'bg-gold/10 text-gold' : 'text-stone-800 hover:bg-stone-100',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                openCart()
              }}
              className="mt-2 rounded-xl px-4 py-3.5 text-left text-lg font-medium text-stone-800 hover:bg-stone-100"
            >
              Cart ({totalItems})
            </button>
          </nav>
          <div className="border-t border-stone-200 p-4">
            <Link
              to="/shop"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-12 items-center justify-center rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-white transition-transform duration-200 active:scale-[0.98]"
            >
              Shop Now
            </Link>
          </div>
        </aside>
      </div>
    </>
  )
}

export default Navbar
