import { useState } from 'react'
import { Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { openWhatsAppBuyNow } from '../data/product'

function ProductCard({ id, image, title, description, price, priceLabel, priceValue }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const numericPrice = priceValue ?? (typeof price === 'number' ? price : Number(String(price).replace(/[^\d]/g, '')))
  const displayPrice = priceLabel ?? (typeof price === 'string' ? price : `Rs. ${price}`)

  const product = {
    id: id || title,
    title,
    description,
    price: numericPrice,
    priceLabel: displayPrice,
    image,
  }

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1500)
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="aspect-square overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold text-[#2C1810] sm:text-xl">{title}</h3>
        <p className="mt-1 text-sm text-stone-500">{description}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <div className="flex gap-0.5" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
            ))}
          </div>
          <span className="text-xs text-stone-500">(128 reviews)</span>
        </div>

        <p className="mt-4 text-xl font-bold text-[#2C1810]">{displayPrice}</p>

        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className="w-full rounded-full bg-gold py-3 text-sm font-semibold text-white shadow-sm transition-transform duration-200 hover:scale-105"
          >
            {added ? 'Added!' : 'Add to Cart'}
          </button>
          <button
            type="button"
            onClick={() => openWhatsAppBuyNow(product)}
            className="w-full rounded-full border-2 border-gold py-3 text-sm font-semibold text-gold transition-transform duration-200 hover:scale-105 hover:bg-gold hover:text-white"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
