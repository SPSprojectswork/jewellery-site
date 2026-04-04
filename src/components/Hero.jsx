// =========================================================
// src/components/Hero.jsx
// Full-screen hero with 3D scene, particle field,
// luxury heading, CTA buttons, scroll indicator.
// =========================================================
import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Gem, ArrowRight } from 'lucide-react'

/* ── Gold Particle Field ───────────────────────────────── */
function ParticleField({ count = 80 }) {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 2, overflow: 'hidden', pointerEvents: 'none' }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const size    = Math.random() * 3 + 1
        const left    = Math.random() * 100
        const delay   = Math.random() * 12
        const dur     = 8 + Math.random() * 10
        const opacity = 0.3 + Math.random() * 0.5
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              bottom: `-${size * 2}px`,
              left:   `${left}%`,
              width:  `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              background: 'transparent',
              opacity,
              animation: `particleDrift ${dur}s ${delay}s ease-in infinite`,
            }}
          />
        )
      })}
    </div>
  )
}

/* ── Hero ──────────────────────────────────────────────── */
export default function Hero() {
  const handleViewCollection = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }
  const handleContactOrder = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      {/* Logo in top-left corner */}
      <img 
        src={`${import.meta.env.BASE_URL}logo.png`} 
        alt="Pearlyn Logo" 
        style={{ 
          position: 'absolute',
          top: '40px',
          left: '40px',
          zIndex: 50,
          height: '140px', 
          width: '140px',
          objectFit: 'cover',
          borderRadius: '50%',
          border: '2px solid #ffffff',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
        }} 
      />

      {/* 3D Canvas removed */}

      {/* Particle field */}
      <ParticleField count={80} />

      {/* Dark vignette overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          background: 'transparent',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: '800px',
        }}
      >
        {/* Eyebrow tag & Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '1.5rem',
          }}
        >

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <Gem size={14} color="#2D7D5F" />
            <span className="section-sub">
              <span style={{ fontFamily: '"Great Vibes", cursive', fontSize: '1.8rem', textTransform: 'none', letterSpacing: 'normal', color: '#ffffff', fontWeight: '400', paddingRight: '6px' }}>pearlyn accessories</span>
              · Est. Craftsmanship · Since 2005
            </span>
            <Gem size={14} color="#2D7D5F" />
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="section-heading text-gold-gradient"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ 
            marginBottom: '1rem', 
            fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
            WebkitTextStroke: '1px #ffffff'
          }}
        >
          Luxury Gold Plated<br />Handcraft
        </motion.h1>

        {/* Sub heading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#ffffff',
            marginBottom: '2.5rem',
            letterSpacing: '0.02em',
            lineHeight: 1.6,
          }}
        >
          Elegant designs crafted to shine with your personality.
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="divider-gold"
          style={{ marginBottom: '2.5rem' }}
        />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button className="btn-gold" onClick={handleViewCollection}>
            View Collection <ArrowRight size={16} />
          </button>
          <button className="btn-outline-gold" onClick={handleContactOrder}>
            Contact to Order
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={handleViewCollection}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#2D7D5F', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <ChevronDown size={20} color="#2D7D5F" className="animate-scroll-bounce" />
      </motion.div>
    </section>
  )
}
