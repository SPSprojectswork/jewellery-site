// =========================================================
// src/pages/Home.jsx
// Main assembly page for the single-page application.
// Initializes Lenis for smooth parallax scrolling.
// =========================================================
import React, { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { X } from 'lucide-react'

import Hero from '../components/Hero.jsx'
import ProductCard from '../components/ProductCard.jsx'
import productsData from '../products.json'
import Features from '../components/Features.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null)

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

      {/* 2. Organized Products */}
      <section id="products" style={{ padding: '8rem 1.5rem', background: 'transparent', textAlign: 'center' }}>
        <p className="section-sub" style={{ marginBottom: '0.75rem' }}>Explore Our Collections</p>
        <h2 className="section-heading">Our Products</h2>
        <div className="divider-gold" style={{ marginBottom: '4rem' }} />

        {productsData.map((categoryData, catIndex) => (
          categoryData.items.length > 0 && (
            <div key={categoryData.category} style={{ marginBottom: '5rem' }}>
              <h3 style={{ 
                fontFamily: '"Playfair Display", serif', 
                fontSize: '2.5rem', 
                color: '#c9a84c',
                marginBottom: '2.5rem',
                textTransform: 'capitalize' 
              }}>
                {categoryData.category.replace(/-/g, ' ')}
              </h3>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2.5rem',
                justifyContent: 'center',
                maxWidth: '1200px',
                margin: '0 auto',
              }}>
                {categoryData.items.map((item, index) => (
                  <ProductCard 
                    key={item.path}
                    index={index}
                    name={item.name}
                    image={`${import.meta.env.BASE_URL}${item.path}`}
                    description=""
                    onImageClick={(img) => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>
          )
        ))}
      </section>

      {/* 3. Why Our Jewellery */}
      <Features />

      {/* 5. Contact / CTA */}
      <Contact />

      {/* 6. Footer */}
      <Footer />

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            cursor: 'zoom-out',
          }}
        >
          <div style={{ position: 'absolute', top: '2rem', right: '2rem' }}>
            <X size={32} color="#ffffff" />
          </div>
          <img
            src={selectedImage}
            alt="Expanded view"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  )
}
