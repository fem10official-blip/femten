import { useEffect, useRef, useState } from 'react'
import {
  Sparkles,
  Droplets,
  Wind,
  Shield,
  TrendingUp,
  Scissors,
  CheckCircle2,
} from 'lucide-react'

const solutions = [
  {
    problem: 'Frizziness',
    solution: 'Anti-Frizz Control',
    description: 'Tames stubborn flyaways and locks in all-day sleek smoothness.',
    Icon: Wind,
  },
  {
    problem: 'Dullness',
    solution: 'Radiant Natural Shine',
    description: 'Restores brilliant, healthy luster without synthetic silicones.',
    Icon: Sparkles,
  },
  {
    problem: 'Dryness',
    solution: 'Deep Moisture Infusion',
    description: 'Hydrates parched strands from cuticle to core with botanical oils.',
    Icon: Droplets,
  },
  {
    problem: 'Rough Hair Texture',
    solution: 'Silky Soft Smoothing',
    description: 'Softens coarse, rough hair into touchably soft, flowing locks.',
    Icon: CheckCircle2,
  },
  {
    problem: 'Slow Hair Growth',
    solution: 'Growth & Scalp Revitalizer',
    description: 'Amla and Reetha stimulate hair follicles to encourage faster, thicker growth.',
    Icon: TrendingUp,
  },
  {
    problem: 'Hair Breakage',
    solution: 'Breakage Defense',
    description: 'Strengthens fragile hair fibers to resist snap, shedding, and damage.',
    Icon: Shield,
  },
  {
    problem: 'Split Ends',
    solution: 'End Seal & Protection',
    description: 'Nourishes vulnerable tips to mend and prevent recurring split ends.',
    Icon: Scissors,
  },
]

function HairSolutionsSection() {
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
      { threshold: 0.12 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="border-t border-gold/15 bg-gradient-to-b from-cream via-white to-cream py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div
          className={[
            'mx-auto max-w-2xl text-center transition-all duration-700',
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
          ].join(' ')}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gold ring-1 ring-gold/25">
            All-In-One Hair Care
          </span>
          <h2 className="mt-4 fluid-title font-serif font-bold text-[#2C1810]">
            7 Hair Solutions in 1 Pure Bottle
          </h2>
          <p className="mt-3 text-sm text-stone-600 sm:text-base">
            Crafted with Amla, Reetha & Shikakai to target your everyday hair concerns naturally and gently.
          </p>
          <div className="mx-auto mt-5 h-px w-20 bg-gold" aria-hidden="true" />
        </div>

        {/* 7 Solutions Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
          {solutions.map(({ problem, solution, description, Icon }, index) => {
            const isFeatured = index === 4 // Growth card or center
            return (
              <div
                key={problem}
                className={[
                  'relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-5 sm:p-6 shadow-sm ring-1 ring-stone-200/80 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-md hover:ring-gold/40',
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
                  index === 6 ? 'sm:col-span-2 lg:col-span-3 xl:col-span-1' : '',
                ].join(' ')}
                style={{ transitionDelay: visible ? `${100 + index * 70}ms` : '0ms' }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/20">
                      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-stone-600">
                      Solution 0{index + 1}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gold">
                      Target: {problem}
                    </span>
                    <h3 className="mt-1 font-serif text-lg font-bold text-[#2C1810]">
                      {solution}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-stone-600 sm:text-sm">
                      {description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-stone-100 pt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span>Visible results with regular wash</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HairSolutionsSection
