import { useState } from 'react'
import { Check, Droplets, Hand, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { MAIN_PRODUCT, openWhatsAppBuyNow } from '../data/product'
import { useInView } from '../hooks/useInView'

const features = [
  'Sulfate-Free',
  'For All Hair Types',
  'Dermatologically Tested',
  '100% Natural Extracts',
]

const ritualSteps = [
  {
    step: '01',
    title: 'Wet Thoroughly',
    text: 'Start with damp hair. Warm water opens the cuticle so every drop of Femten can work deeper.',
    Icon: Droplets,
    image: '/images/lifestyle/ritual-wet.jpg',
  },
  {
    step: '02',
    title: 'Massage Gently',
    text: 'Work a small amount into the scalp with soft circular motions — let Amla, Reetha & Shikakai cleanse.',
    Icon: Hand,
    image: '/images/lifestyle/ritual-massage.png',
  },
  {
    step: '03',
    title: 'Rinse & Glow',
    text: 'Rinse well and feel the difference: clean, light, naturally soft hair — ready for every day.',
    Icon: Sparkles,
    image: '/images/lifestyle/ritual-rinse.png',
  },
]

const highlights = [
  { value: '3', label: 'Ancient Botanicals' },
  { value: '0', label: 'Harsh Sulfates' },
  { value: '100%', label: 'Everyday Safe' },
]

function ProductShowcase() {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const ritual = useInView(0.12)

  const handleAdd = () => {
    addToCart(MAIN_PRODUCT)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1500)
  }

  return (
    <section className="bg-cream">
      {/* Split layout */}
      <div className="flex min-h-0 flex-col lg:min-h-screen lg:flex-row">
        <div className="relative flex h-[52vh] w-full shrink-0 items-center justify-center overflow-hidden bg-cream p-3 sm:h-[60vh] sm:p-5 lg:h-auto lg:min-h-screen lg:w-1/2 lg:p-8">
          <img
            src="/images/product/our-best-seller.jpeg"
            alt="Femten Extra Gentle Daily Shampoo — Our Bestseller"
            className="h-full w-full rounded-2xl object-contain object-center shadow-md"
          />
        </div>

        <div className="flex w-full items-center justify-center bg-cream px-4 py-10 sm:px-10 sm:py-16 lg:w-1/2 lg:px-12 lg:py-20 xl:px-16">
          <div className="mx-auto w-full max-w-md text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">
              Our Bestseller
            </p>

            <h2 className="mt-3 fluid-title font-serif font-bold text-[#2C1810]">
              Extra Gentle Daily Shampoo
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-stone-600 sm:mt-5 sm:text-base">
              Infused with Amla, Reetha, and Shikakai — a time-tested formula that cleanses
              gently while nourishing your hair naturally. Free from harsh sulfates, safe for
              everyday use.
            </p>

            <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
              {features.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-stone-700 sm:text-base">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <p className="text-xl font-bold text-[#2C1810] sm:text-2xl">
                {MAIN_PRODUCT.priceLabel}
              </p>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="min-h-12 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-200 active:scale-[0.98] hover:scale-105 sm:px-7 sm:text-base"
                >
                  {added ? 'Added!' : 'Add to Cart'}
                </button>
                <button
                  type="button"
                  onClick={() => openWhatsAppBuyNow(MAIN_PRODUCT)}
                  className="min-h-12 rounded-full border-2 border-gold px-5 py-3 text-sm font-semibold text-gold transition-transform duration-200 active:scale-[0.98] hover:scale-105 hover:bg-gold hover:text-white sm:px-7 sm:text-base"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Ritual */}
      <div
        ref={ritual.ref}
        className="border-t border-gold/20 bg-gradient-to-b from-white to-cream py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div
            className={[
              'mx-auto max-w-2xl px-4 text-center transition-all duration-700 sm:px-0',
              ritual.visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            ].join(' ')}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold sm:text-xs">
              Simple Care
            </p>
            <h3 className="mt-3 fluid-title font-serif font-bold text-[#2C1810]">
              Your Daily Femten Ritual
            </h3>
            <p className="mt-3 text-sm text-stone-600 sm:text-base">
              Three easy steps. Soft, healthy hair — every single day.
            </p>
            <div className="mx-auto mt-5 h-px w-16 bg-gold" aria-hidden="true" />
          </div>

          <div className="mt-10 snap-row md:mt-12">
            {ritualSteps.map(({ step, title, text, Icon, image }, index) => (
              <article
                key={step}
                className={[
                  'snap-card relative overflow-hidden rounded-2xl bg-cream shadow-sm ring-1 ring-stone-200/70 transition-all duration-700 md:hover:-translate-y-1 md:hover:shadow-md',
                  ritual.visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
                ].join(' ')}
                style={{ transitionDelay: ritual.visible ? `${120 + index * 110}ms` : '0ms' }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1 font-serif text-sm font-bold text-gold shadow-sm">
                    {step}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#2C1810] sm:text-xl">{title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="px-4 sm:px-0">
            <div
              className={[
                'mt-10 grid grid-cols-3 overflow-hidden rounded-2xl bg-[#2C1810] transition-all duration-700 sm:mt-14',
                ritual.visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
              ].join(' ')}
              style={{ transitionDelay: ritual.visible ? '450ms' : '0ms' }}
            >
              {highlights.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={[
                    'px-2 py-6 text-center sm:px-6 sm:py-8',
                    i < highlights.length - 1 ? 'border-r border-gold/20' : '',
                  ].join(' ')}
                >
                  <p className="font-serif text-2xl font-bold text-gold sm:text-4xl">{value}</p>
                  <p className="mt-1.5 text-[9px] font-semibold uppercase leading-tight tracking-[0.1em] text-cream/70 sm:mt-2 sm:text-[11px] sm:tracking-[0.16em]">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center sm:mt-10">
              <Link
                to="/shop"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-8 py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-200 active:scale-[0.98] hover:scale-105"
              >
                Start Your Ritual
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
