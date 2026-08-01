import { useEffect } from 'react'
import Hero from '../../components/sections/Hero'
import FeaturedDogs from '../../components/sections/FeaturedDogs'
import Breeds from '../../components/sections/Breeds'
import About from '../../components/sections/About'
import Testimonials from '../../components/sections/Testimonials'
import Contact from '../../components/sections/Contact'

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Hero />
      <FeaturedDogs />
      <Breeds />
      <About />
      <Testimonials />
      <Contact />
    </>
  )
}