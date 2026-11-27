import Hero from '../components/Hero'
import TrustBadges from '../components/TrustBadges'
import IngredientsSection from '../components/IngredientsSection'
import HairSolutionsSection from '../components/HairSolutionsSection'
import ProductShowcase from '../components/ProductShowcase'
import Testimonials from '../components/Testimonials'

function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <IngredientsSection />
      <HairSolutionsSection />
      <ProductShowcase />
      <Testimonials />
    </>
  )
}

export default Home
