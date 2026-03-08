// =========================================================
// src/pages/Home.jsx
// Main assembly page for the single-page application.
// Initializes Lenis for smooth parallax scrolling.
// =========================================================
import React, { useEffect } from 'react'
import Lenis from 'lenis'

import Hero from '../components/Hero.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Features from '../components/Features.jsx'
import Gallery from '../components/Gallery.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  /* ── Smooth Scrolling (Lenis) ───────────────────────── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <main style={{ width: '100%', overflowX: 'hidden' }}>
      {/* 1. Hero 3D Showcase */}
      <Hero />

      {/* 2. Featured Products */}
      <section 
        id="products"
        style={{ 
          padding: '8rem 1.5rem', 
          background: 'radial-gradient(ellipse at top, #111 0%, #080808 100%)',
          textAlign: 'center'
        }}
      >
        <p className="section-sub" style={{ marginBottom: '0.75rem' }}>Signature Pieces</p>
        <h2 className="section-heading">Featured Collection</h2>
        <div className="divider-gold" style={{ marginBottom: '4rem' }} />

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2.5rem',
          justifyContent: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <ProductCard 
            index={0}
            name="Gold Bangle"
            image="/products/featured-bangle.jpg"
            description="A minimalist hollow gold bangle wrapped in pure 24k essence. Perfect for daily elegance."
          />
          <ProductCard 
            index={1}
            name="Hollow Heart Necklace"
            image="/products/featured-necklace.jpg"
            description="An intricately designed hollow heart pendant suspended on a delicate golden chain."
          />
        </div>
      </section>

      {/* 3. Why Our Jewellery */}
      <Features />

      {/* 4. Product Gallery (Masonry grid from /public) */}
      <Gallery />

      {/* 5. Contact / CTA */}
      <Contact />

      {/* 6. Footer */}
      <Footer />
    </main>
  )
}
