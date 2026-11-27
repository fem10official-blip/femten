import { Link } from 'react-router-dom'
import { Leaf, Heart, Sparkles } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const values = [
  {
    title: 'Natural',
    description: "Powered by Amla, Reetha, and Shikakai — nature's trusted hair care trio.",
    Icon: Leaf,
  },
  {
    title: 'Cruelty-Free',
    description: 'Never tested on animals. Kind to you, kind to every living being.',
    Icon: Heart,
  },
  {
    title: 'Pure Botanical Care',
    description: 'Gentle pH-balanced herbal formula crafted to nourish scalp and hair from root to tip.',
    Icon: Sparkles,
  },
]

function About() {
  const story = useInView()
  const valuesSection = useInView()

  return (
    <div className="bg-cream">
      {/* Header */}
      <section className="bg-cream px-4 pb-8 pt-24 text-center sm:px-6 sm:pb-12 sm:pt-32 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">
          Our Story
        </p>
        <h1 className="mt-3 fluid-title font-serif font-bold text-[#2C1810]">
          Why Femten?
        </h1>
        <div className="mx-auto mt-5 h-px w-16 bg-gold" aria-hidden="true" />
      </section>

      {/* Split story */}
      <section
        ref={story.ref}
        className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20"
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div
            className={[
              'transition-all duration-700',
              story.visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
            ].join(' ')}
          >
            <img
              src="/images/product/product-model-giant-bottle.jpg"
              alt="Woman with Femten Extra Gentle Daily Shampoo"
              className="w-full rounded-2xl object-cover shadow-lg aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:max-h-[560px]"
            />
          </div>

          <div
            className={[
              'space-y-5 transition-all duration-700 delay-150',
              story.visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
            ].join(' ')}
          >
            <p className="text-base leading-relaxed text-stone-700 sm:text-lg">
              Femten was born from a simple belief — that great hair care doesn&apos;t need
              harsh chemicals. Inspired by time-tested ingredients like Amla, Reetha, and
              Shikakai, we created a gentle daily shampoo that nourishes as it cleanses.
            </p>
            <p className="text-base leading-relaxed text-stone-700 sm:text-lg">
              Every bottle is crafted with care, blending nature&apos;s wisdom with modern
              formulation to deliver 7 complete solutions — overcoming frizz, dullness, dryness,
              rough texture, slow growth, breakage, and split ends for naturally radiant hair every single day.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section
        ref={valuesSection.ref}
        className="border-t border-gold/15 bg-cream px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      >
        <h2 className="mb-10 text-center font-serif text-3xl font-bold text-[#2C1810] sm:text-4xl">
          Our Values
        </h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {values.map(({ title, description, Icon }, index) => (
            <div
              key={title}
              className={[
                'flex flex-col items-center rounded-2xl bg-white px-6 py-8 text-center shadow-md transition-all duration-700',
                valuesSection.visible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0',
              ].join(' ')}
              style={{
                transitionDelay: valuesSection.visible ? `${index * 120}ms` : '0ms',
              }}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/25">
                <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2C1810]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-900 px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-gold sm:text-4xl">
          Ready to feel the difference?
        </h2>
        <Link
          to="/shop"
          className="mt-6 inline-flex rounded-full bg-gold px-8 py-3 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 sm:text-base"
        >
          Shop Now
        </Link>
      </section>
    </div>
  )
}

export default About
