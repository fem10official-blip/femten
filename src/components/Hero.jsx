import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden md:min-h-screen md:items-center">
      {/* Desktop: landscape hero — position keeps model's full face in frame */}
      <div
        className="absolute inset-0 hidden bg-cover bg-no-repeat md:block md:bg-[82%_12%]"
        style={{
          backgroundImage: "url('/images/hero/hero-model-landscape.png')",
        }}
        aria-hidden="true"
      />

      {/* Mobile: portrait crop — face near top */}
      <img
        src="/images/product/product-model-giant-bottle.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[50%_8%] md:hidden"
        aria-hidden="true"
      />

      {/* Mobile veil — light so the photo stays visible */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-cream/80 via-cream/15 to-transparent md:hidden"
        aria-hidden="true"
      />

      {/* Desktop overlays — original */}
      <div
        className="pointer-events-none absolute inset-0 hidden from-cream/90 via-cream/45 to-transparent bg-gradient-to-r md:block"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 hidden from-black/15 via-transparent to-cream/20 bg-gradient-to-b md:block"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-24 safe-pb sm:px-6 md:px-8 md:pb-16 md:pt-28 lg:px-12">
        {/* Mobile: frosted card | Desktop: plain left copy */}
        <div className="mx-auto w-full max-w-xl rounded-3xl bg-cream/90 p-5 shadow-lg backdrop-blur-md md:mx-0 md:rounded-none md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
          <span className="animate-fade-in-up mb-4 inline-flex items-center rounded-full bg-cream px-4 py-1.5 text-[11px] font-medium text-stone-800 shadow-sm sm:text-sm md:mb-6">
            Extra Care, Everyday 🌿
          </span>

          <h1 className="animate-fade-in-up animation-delay-100 font-serif text-[2.15rem] font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-[#2C1810]">Gentle Today,</span>
            <span className="mt-1 block text-gold">Healthy Tomorrow</span>
          </h1>

          <p className="animate-fade-in-up animation-delay-200 mt-4 max-w-md text-sm text-stone-700 sm:mt-5 sm:text-lg md:text-xl">
            Nourished by Nature, Loved by All
          </p>

          <div className="animate-fade-in-up animation-delay-300 mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
            <Link
              to="/shop"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-8 py-3 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 sm:text-base"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[#2C1810] px-8 py-3 text-sm font-semibold text-[#2C1810] transition-transform duration-200 hover:scale-105 hover:border-gold hover:text-gold sm:text-base"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
