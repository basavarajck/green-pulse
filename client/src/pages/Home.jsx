import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import VisionSection from '../components/VisionSection.jsx'
import LeadsSection from '../components/LeadsSection.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-50 text-neutral-900">
      {/* Section 1: Navbar + Hero */}
      <section
        id="home"
        className="min-h-screen w-full bg-gradient-to-b from-green-900 via-green-950 to-neutral-950"
        >
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col">
            <Navbar />
            <Hero />
        </div>
      </section>


      {/* Section 2 */}
      <section id="about" className="min-h-screen w-full bg-white">
        <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
          <VisionSection />
        </div>
      </section>

      {/* Section 3 */}
      <section id="leads" className="min-h-screen w-full bg-neutral-950">
        <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
          <LeadsSection />
        </div>
      </section>

      {/* Section 4 */}
     <section
        id="contact"
        className="w-full bg-neutral-900 text-neutral-100"
        >
        <div className="mx-auto max-w-6xl px-6 py-8">
            <Footer />
            <p className="mt-4 text-xs text-neutral-500">
            © {new Date().getFullYear()} Green Pulse Club. All rights reserved.
            </p>
        </div>
    </section>
    </div>
  )
}

export default Home
