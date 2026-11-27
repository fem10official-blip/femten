import { useState } from 'react'
import { Mail, MapPin, Clock } from 'lucide-react'
import { InstagramIcon, FacebookIcon } from '../components/SocialIcons'
import { useInView } from '../hooks/useInView'

const contactDetails = [
  { label: 'Email', value: 'fem10official@gmail.com', href: 'mailto:fem10official@gmail.com', Icon: Mail },
  { label: 'Address', value: 'Islamabad, Pakistan', href: null, Icon: MapPin },
  { label: 'Hours', value: 'Mon-Sat, 9am - 6pm', href: null, Icon: Clock },
]

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const section = useInView()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="bg-cream">
      {/* Header */}
      <section className="bg-cream px-4 pb-8 pt-24 text-center sm:px-6 sm:pb-12 sm:pt-32 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">
          Get In Touch
        </p>
        <h1 className="mt-3 fluid-title font-serif font-bold text-[#2C1810]">
          Contact Us
        </h1>
        <div className="mx-auto mt-5 h-px w-16 bg-gold" aria-hidden="true" />
      </section>

      {/* Form + info */}
      <section
        ref={section.ref}
        className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16"
      >
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Form */}
          <div
            className={[
              'rounded-2xl bg-white p-6 shadow-md transition-all duration-700 sm:p-8',
              section.visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
            ].join(' ')}
          >
            {sent ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                <p className="font-serif text-2xl font-bold text-[#2C1810]">Message sent!</p>
                <p className="mt-2 text-sm text-stone-600">
                  Thanks for reaching out — we&apos;ll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 rounded-full border border-gold px-5 py-2 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-white"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#2C1810]">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone-200 bg-cream/40 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-gold"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#2C1810]">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-stone-200 bg-cream/40 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-gold"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-[#2C1810]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full resize-y rounded-xl border border-stone-200 bg-cream/40 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-gold"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-105 sm:w-auto sm:px-10"
                >
                  Submit
                </button>
              </form>
            )}
          </div>

          {/* Contact info card */}
          <div
            className={[
              'rounded-2xl bg-cream p-6 shadow-md ring-1 ring-stone-200/70 transition-all duration-700 sm:p-8',
              section.visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
            ].join(' ')}
            style={{ transitionDelay: section.visible ? '150ms' : '0ms' }}
          >
            <h2 className="font-serif text-2xl font-bold text-[#2C1810]">Reach Us</h2>
            <p className="mt-2 text-sm text-stone-600">
              We&apos;d love to hear from you. Drop a message or use the details below.
            </p>
            <ul className="mt-6 space-y-4">
              {contactDetails.map(({ label, value, href, Icon }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold text-gold">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-0.5 block text-sm text-[#2C1810] transition-colors hover:text-gold"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm text-[#2C1810]">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="border-t border-gold/15 px-4 py-12 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-stone-600 sm:text-base">Follow us for hair care tips</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <a
            href="https://www.instagram.com/fem10_official?utm_source=qr&stkn=YzhibXJ2NDhsajZy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold text-gold transition-colors hover:bg-gold hover:text-white"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.facebook.com/share/1F2xbCQ27r/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold text-gold transition-colors hover:bg-gold hover:text-white"
          >
            <FacebookIcon className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  )
}

export default Contact
