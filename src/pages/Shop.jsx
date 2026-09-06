import { Ban, Heart, Leaf } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { MAIN_PRODUCT } from '../data/product'

const products = [
  {
    ...MAIN_PRODUCT,
    image: '/images/lifestyle/ritual-wet.jpg',
  },
]

const whyChoose = [
  { label: 'Free from Sulfates', Icon: Ban },
  { label: 'Cruelty-Free', Icon: Heart },
  { label: 'Made with Natural Extracts', Icon: Leaf },
]

function Shop() {
  return (
    <div className="bg-cream">
      {/* Page header */}
      <section className="bg-cream px-4 pb-8 pt-24 text-center sm:px-6 sm:pb-12 sm:pt-32 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">
          Our Collection
        </p>
        <h1 className="mt-3 fluid-title font-serif font-bold text-[#2C1810]">
          Shop Femten
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-stone-600 sm:text-base">
          Gentle, natural hair care for every day
        </p>
        <div className="mx-auto mt-5 h-px w-16 bg-gold" aria-hidden="true" />
      </section>

      {/* Product grid */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8">
        <div className="mx-auto w-full max-w-md md:max-w-sm">
          <ProductCard {...products[0]} />
        </div>
      </section>

      {/* Why Choose Femten */}
      <section className="border-t border-gold/20 bg-cream px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <h2 className="mb-8 text-center font-serif text-2xl font-bold text-[#2C1810] sm:text-3xl">
          Why Choose Femten
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-3 sm:gap-6">
          {whyChoose.map(({ label, Icon }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold text-gold sm:mb-3 sm:h-12 sm:w-12">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <p className="text-[9px] font-semibold uppercase leading-snug tracking-[0.1em] text-[#2C1810] sm:text-[0.7rem] sm:tracking-[0.14em]">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Shop
