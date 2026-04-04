// =========================================================
// src/components/Features.jsx
// "Why Our Jewellery" section — 4 feature cards with
// Lucide icons, scroll-reveal stagger animations.
// =========================================================
import React from 'react'
import { motion } from 'framer-motion'
import { Gem, Star, Sparkles, Gift } from 'lucide-react'

const FEATURES = [
  {
    icon: Gem,
    title: 'Handcrafted Design',
    desc: 'Every piece is meticulously shaped by skilled artisans, ensuring no two creations are alike.',
  },
  {
    icon: Star,
    title: 'Premium Finish',
    desc: 'We use only the finest metals and gemstones, finished to a mirror-like perfection.',
  },
  {
    icon: Sparkles,
    title: 'Elegant Styling',
    desc: 'Timeless aesthetics designed to elevate any outfit — from everyday wear to grand occasions.',
  },
  {
    icon: Gift,
    title: 'Perfect Gift',
    desc: 'Thoughtfully packaged in a luxury box — an unforgettable gift for someone you cherish.',
  },
]

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15 },
  }),
}

export default function Features() {
  return (
    <section
      id="features"
      style={{
        padding: '6rem 1.5rem',
        background: 'transparent',
        textAlign: 'center',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '3.5rem' }}
      >
        <p className="section-sub" style={{ marginBottom: '0.75rem' }}>Our Promise</p>
        <h2 className="section-heading">Why Our Jewellery</h2>
        <div className="divider-gold" />
      </motion.div>

      {/* Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {FEATURES.map((f, i) => {
          const Icon = f.icon
          return (
            <motion.div
              key={f.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              style={{
                padding: '2rem 1.5rem',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(12px)',
                border: '1px solid #ffffff',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                cursor: 'default',
              }}
              onHoverStart={(e) => {
                e.target.closest
                  && (e.target.closest('[data-feature]') || e.target)
              }}
            >
              {/* Icon circle */}
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(45, 125, 95,0.08)',
                border: '1px solid rgba(45, 125, 95,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                boxShadow: '0 0 20px rgba(45, 125, 95,0.15)',
              }}>
                <Icon size={26} color="#2D7D5F" />
              </div>

              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.3rem',
                fontWeight: 500,
                color: '#1a1a1a',
                marginBottom: '0.6rem',
                letterSpacing: '0.03em',
              }}>
                {f.title}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: '#1a1a1a',
                fontFamily: '"Courier New", sans-serif',
                fontWeight: 600,
                lineHeight: 1.7,
              }}>
                {f.desc}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
