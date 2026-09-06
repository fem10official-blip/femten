import { useEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      'My hair has never felt this soft and healthy. Femten is now a staple in my routine.',
    name: 'Ayesha K.',
    descriptor: 'Verified Buyer',
  },
  {
    quote:
      "Finally a shampoo that's gentle enough for daily use without weighing my hair down.",
    name: 'Sara M.',
    descriptor: 'Daily User',
  },
  {
    quote:
      "Love that it's made with natural ingredients. You can really feel the difference.",
    name: 'Fatima R.',
    descriptor: 'Verified Buyer',
  },
]

function Testimonials() {
  const cardsRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = cardsRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bg-cream">
      {/* Lifestyle banner */}
      <div className="px-3 pt-2 sm:px-6 lg:px-8">
        <div className="relative min-h-[58vh] w-full overflow-hidden rounded-2xl shadow-md sm:min-h-[70vh] sm:rounded-3xl lg:min-h-[78vh]">
          <img
            src="/images/lifestyle/testimonials-hair-shine.png"
            alt="Woman with long shiny healthy hair — Femten shampoo results"
            className="absolute inset-0 h-full w-full object-cover object-[68%_20%] sm:object-[70%_15%] md:object-[72%_12%]"
          />

          {/* Soft wash only on left for text — keep girl/hair clear on the right */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-cream/80 via-cream/35 to-transparent md:w-[48%]"
            aria-hidden="true"
          />

          <div className="relative z-10 flex h-full min-h-[58vh] max-w-xl flex-col justify-end px-4 pb-10 pt-10 sm:min-h-[70vh] sm:justify-start sm:px-8 sm:pb-24 sm:pt-16 lg:min-h-[78vh] lg:px-12 lg:pt-20">
            <div className="rounded-2xl bg-cream/85 p-4 backdrop-blur-sm sm:bg-cream/70 sm:p-5 md:bg-transparent md:p-0 md:backdrop-blur-none">
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-cream px-3.5 py-1.5 text-[11px] font-medium text-stone-800 shadow-sm sm:mb-4 sm:text-sm">
                Extra Care, Everyday 🌿
              </span>
              <h2 className="fluid-title font-serif font-bold text-[#2C1810] lg:text-6xl">
                Gentle Today, <span className="text-gold">Healthy</span> Tomorrow
              </h2>
              <p className="mt-3 text-sm text-stone-700 sm:mt-4 sm:text-base md:text-lg">
                Nourished by Nature, Loved by All
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial cards — snap carousel on mobile */}
      <div ref={cardsRef} className="mx-auto max-w-6xl pb-14 pt-2 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <p className="mb-4 px-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-gold md:hidden">
          Swipe to read reviews
        </p>
        <div className="snap-row">
          {testimonials.map((item, index) => (
            <article
              key={item.name}
              className={[
                'snap-card rounded-2xl bg-white px-5 py-6 shadow-md ring-1 ring-stone-200/60 transition-all duration-700 ease-out sm:px-6 sm:py-7',
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
              ].join(' ')}
              style={{ transitionDelay: visible ? `${index * 140}ms` : '0ms' }}
            >
              <div className="mb-4 flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-gold text-gold"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-stone-700 sm:text-[0.95rem]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <p className="mt-5 text-sm font-semibold text-[#2C1810]">
                {item.name}{' '}
                <span className="font-normal text-stone-500">— {item.descriptor}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
