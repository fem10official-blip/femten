import { Leaf, Droplet, Sparkles, CheckCircle } from 'lucide-react'

const badges = [
  { label: 'Natural Ingredients', Icon: Leaf },
  { label: 'Gentle Cleanse', Icon: Droplet },
  { label: 'Stronger Hair', Icon: Sparkles },
  { label: 'For All Hair Types', Icon: CheckCircle },
]

function TrustBadges() {
  return (
    <section className="border-y border-gold/20 bg-cream px-3 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-3 gap-y-7 sm:gap-8 md:grid-cols-4 md:gap-6">
        {badges.map(({ label, Icon }) => (
          <div key={label} className="flex flex-col items-center text-center">
            <div className="mb-2.5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold text-gold sm:mb-3 sm:h-16 sm:w-16">
              <Icon className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <p className="max-w-[9.5rem] text-[9px] font-semibold uppercase leading-snug tracking-[0.14em] text-[#2C1810] sm:max-w-[10rem] sm:text-xs sm:tracking-[0.18em]">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrustBadges
