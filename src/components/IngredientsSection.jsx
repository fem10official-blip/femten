import { useEffect, useRef, useState } from 'react'
import { Leaf, Sparkles, Droplets } from 'lucide-react'

const ingredients = [
  {
    name: 'Amla',
    text: 'Rich in Vitamin C, strengthens hair from root to tip and prevents premature greying.',
    Icon: Leaf,
  },
  {
    name: 'Reetha',
    text: "Nature's gentle cleanser, removes buildup without stripping natural oils.",
    Icon: Droplets,
  },
  {
    name: 'Shikakai',
    text: 'Promotes healthy scalp and adds natural shine, used for centuries in hair care.',
    Icon: Sparkles,
  },
]

function IngredientsSection() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-cream px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div
          className={[
            'mx-auto max-w-2xl text-center transition-all duration-700',
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
          ].join(' ')}
        >
          <h2 className="fluid-title font-serif font-bold text-[#2C1810]">
            Nature&apos;s Ancient Secret
          </h2>
          <p className="mt-3 text-sm font-medium text-gold sm:text-base md:text-lg">
            Three powerful ingredients, one gentle formula
          </p>
          <div className="mx-auto mt-5 h-px w-16 bg-gold sm:w-20" aria-hidden="true" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:gap-8 md:grid-cols-3">
          {ingredients.map(({ name, text, Icon }, index) => (
            <article
              key={name}
              className={[
                'rounded-2xl bg-white px-5 py-7 text-center shadow-md transition-all duration-500 ease-out sm:px-6 sm:py-8 md:hover:-translate-y-2 md:hover:shadow-xl',
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
              ].join(' ')}
              style={{ transitionDelay: visible ? `${150 + index * 120}ms` : '0ms' }}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/25 sm:mb-5 sm:h-16 sm:w-16">
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2C1810] sm:text-2xl">{name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-[0.95rem]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default IngredientsSection
