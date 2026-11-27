import { useState } from 'react'
import { Droplets, Hand, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { MAIN_PRODUCT, BUNDLE_PRODUCT } from '../data/product'
import { useInView } from '../hooks/useInView'

const botanicals = [
  { name: 'Amla', note: 'Strength' },
  { name: 'Reetha', note: 'Cleanse' },
  { name: 'Shikakai', note: 'Shine' },
]

const features = [
  { label: 'Sulfate-Free', detail: 'No harsh foam' },
  { label: 'All Hair Types', detail: 'Daily gentle' },
  { label: 'Pure Botanical Care', detail: 'Scalp friendly' },
  { label: 'Natural Extracts', detail: 'Herbal care' },
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
  const { addToCart, buyNow } = useCart()
  const [selectedProduct, setSelectedProduct] = useState(MAIN_PRODUCT)
  const [added, setAdded] = useState(false)
  const product = useInView(0.15)
  const ritual = useInView(0.12)

  const handleAdd = () => {
    addToCart(selectedProduct)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1500)
  }

  return (
    <section className="bg-cream">
      {/* Bestseller — editorial split */}
      <div
        ref={product.ref}
        className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20"
      >
        <div
          className={[
            'relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl bg-[#E8E0D4] shadow-[0_25px_60px_-20px_rgba(44,24,16,0.3)] ring-1 ring-[#2C1810]/10 transition-all duration-700 sm:max-w-md sm:rounded-3xl lg:max-w-md xl:max-w-lg',
            product.visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
          ].join(' ')}
        >
          <img
            src={selectedProduct.image}
            alt={`${selectedProduct.title} — Femten`}
            className="aspect-[4/5] w-full object-cover object-center transition-all duration-500"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#2C1810]/25 to-transparent"
            aria-hidden="true"
          />
        </div>

        <div
          className={[
            'w-full transition-all duration-700',
            product.visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
          ].join(' ')}
          style={{ transitionDelay: product.visible ? '120ms' : '0ms' }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Our Bestseller & Special Deals
            </p>
          </div>

          <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-[#2C1810] sm:text-4xl lg:text-[2.75rem]">
            Extra Gentle Daily Shampoo
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base sm:leading-7">
            A quiet daily cleanse — time-tested botanicals that soften without stripping,
            made for hair you live in every day.
          </p>

          <div className="mt-7 grid grid-cols-3 gap-2 rounded-2xl border border-[#2C1810]/10 bg-white/60 px-2 py-4 sm:gap-4 sm:px-4 sm:py-5">
            {botanicals.map(({ name, note }) => (
              <div key={name} className="text-center">
                <p className="font-serif text-lg font-semibold text-[#2C1810] sm:text-xl">{name}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-stone-500">{note}</p>
              </div>
            ))}
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {features.map(({ label, detail }) => (
              <li
                key={label}
                className="rounded-xl border border-[#2C1810]/8 bg-white/50 px-4 py-3"
              >
                <p className="text-sm font-semibold text-[#2C1810]">{label}</p>
                <p className="mt-0.5 text-xs text-stone-500">{detail}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-4 rounded-2xl border border-[#2C1810]/10 bg-white/70 p-4 sm:p-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500 mb-2">
                Choose Pack / Deal
              </p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(MAIN_PRODUCT)}
                  className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                    selectedProduct.id === MAIN_PRODUCT.id
                      ? 'border-gold bg-gold/10 ring-2 ring-gold/30'
                      : 'border-stone-200 bg-white/80 hover:border-stone-300'
                  }`}
                >
                  <span className="text-xs font-bold text-[#2C1810]">Single Bottle</span>
                  <span className="mt-0.5 text-sm font-semibold text-gold">Rs. 450</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(BUNDLE_PRODUCT)}
                  className={`relative flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                    selectedProduct.id === BUNDLE_PRODUCT.id
                      ? 'border-gold bg-gold/10 ring-2 ring-gold/30'
                      : 'border-stone-200 bg-white/80 hover:border-stone-300'
                  }`}
                >
                  <span className="absolute -top-2.5 right-2 rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold text-white shadow-sm">
                    Save Rs. 351
                  </span>
                  <span className="text-xs font-bold text-[#2C1810]">Bundle of 3</span>
                  <div className="mt-0.5 flex items-baseline gap-1">
                    <span className="text-sm font-semibold text-gold">Rs. 999</span>
                    <span className="text-[10px] text-stone-400 line-through">Rs. 1,350</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-stone-200/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                  Total Price
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="font-serif text-3xl font-semibold tracking-tight text-[#2C1810] sm:text-4xl">
                    {selectedProduct.priceLabel}
                  </p>
                  {selectedProduct.originalPriceLabel && (
                    <span className="text-sm text-stone-400 line-through">
                      {selectedProduct.originalPriceLabel}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0 sm:gap-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="min-h-12 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] hover:bg-[#9A7209] sm:px-7"
                >
                  {added ? 'Added' : 'Add to Cart'}
                </button>
                <button
                  type="button"
                  onClick={() => buyNow(selectedProduct)}
                  className="min-h-12 rounded-full border border-[#2C1810]/25 px-6 py-3 text-sm font-semibold text-[#2C1810] transition-all duration-200 active:scale-[0.98] hover:border-gold hover:text-gold sm:px-7"
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
