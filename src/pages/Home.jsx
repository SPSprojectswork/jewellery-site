// =========================================================
// src/pages/Home.jsx
// Mobile  → horizontal category tab filter (cute.co style)
// Desktop → all categories shown with headers (original)
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

/* ── Helpers ──────────────────────────────────────────── */
const formatCategory = (cat) =>
  cat.replace(/\b\w/g, (c) => c.toUpperCase())

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 640)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 640)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return mobile
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null)
  const isMobile = useIsMobile()

  // non-empty categories only
  const categories = productsData.filter((c) => c.items.length > 0)

  // active category tab (mobile only) – default to first
  const [activeCategory, setActiveCategory] = useState(
    categories.length > 0 ? categories[0].category : null
  )
  const activeItems =
    categories.find((c) => c.category === activeCategory)?.items ?? []

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
      {/* 1. Hero */}
      <Hero />

      {/* 2. Products */}
      <section
        id="products"
        style={{
          padding: isMobile ? '4rem 0 3rem' : '8rem 1.5rem 4rem',
          background: 'transparent',
          textAlign: 'center',
        }}
      >
        <p className="section-sub" style={{ marginBottom: '0.5rem', padding: '0 1rem' }}>
          Explore Our Collections
        </p>
        <h2 className="section-heading" style={{ marginBottom: '2rem', padding: '0 1rem' }}>
          Our Products
        </h2>
        <div className="divider-gold" style={{ marginBottom: isMobile ? '1.5rem' : '3rem' }} />

        {isMobile ? (
          /* ════════════════════════════════════════════════
             MOBILE: Horizontal sticky tab bar + filtered grid
             ════════════════════════════════════════════════ */
          <>
            {/* Sticky tab bar */}
            <div
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                background: 'rgba(45, 125, 95, 0.97)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255,255,255,0.15)',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                padding: '10px 12px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              {categories.map((cat) => {
                const isActive = cat.category === activeCategory
                return (
                  <button
                    key={cat.category}
                    onClick={() => {
                      setActiveCategory(cat.category)
                      document.getElementById('mobile-products-anchor')
                        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '7px 16px',
                      borderRadius: '999px',
                      border: isActive ? 'none' : '1px solid rgba(255,255,255,0.5)',
                      background: isActive ? '#ffffff' : 'transparent',
                      color: isActive ? '#2D7D5F' : '#ffffff',
                      fontFamily: '"Courier New", sans-serif',
                      fontSize: '0.72rem',
                      fontWeight: isActive ? 700 : 500,
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                    }}
                  >
                    {formatCategory(cat.category)}
                  </button>
                )
              })}
            </div>

            {/* Products grid for active category */}
            <div id="mobile-products-anchor" style={{ padding: '16px 10px 0' }}>
              <div className="products-grid">
                {activeItems.map((item, index) => (
                  <ProductCard
                    key={item.path}
                    index={index}
                    category={activeCategory}
                    name={item.name}
                    image={`${import.meta.env.BASE_URL}${item.path}`}
                    description=""
                    onImageClick={(img) => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          /* ════════════════════════════════════════════════
             DESKTOP: All categories with headers (original)
             ════════════════════════════════════════════════ */
          <>
            {categories.map((categoryData) => (
              <div key={categoryData.category} style={{ marginBottom: '5rem' }}>
                <h3
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                    color: '#ffffff',
                    marginBottom: '2.5rem',
                    textTransform: 'capitalize',
                  }}
                >
                  {categoryData.category.replace(/-/g, ' ')}
                </h3>
                <div className="products-grid">
                  {categoryData.items.map((item, index) => (
                    <ProductCard
                      key={item.path}
                      index={index}
                      category={categoryData.category}
                      name={item.name}
                      image={`${import.meta.env.BASE_URL}${item.path}`}
                      description=""
                      onImageClick={(img) => setSelectedImage(img)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </section>

      {/* 3. Why Our Jewellery */}
      <Features />

      {/* 4. Contact / CTA */}
      <Contact />

      {/* 5. Footer */}
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
