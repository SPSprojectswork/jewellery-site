// =========================================================
// src/components/ProductCard.jsx
// Glassmorphism card with 3D mouse-tilt effect,
// gold glow border, floating animation, WhatsApp CTA.
// =========================================================
import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Sparkles } from 'lucide-react'

const WHATSAPP_NUMBER = '919999999999' // ← Replace with your WhatsApp number

export default function ProductCard({ name, image, description, index = 0 }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  /* ── 3D Tilt on mouse move ──────────────────────────── */
  const handleMouseMove = (e) => {
    const card    = cardRef.current
    const rect    = card.getBoundingClientRect()
    const centerX = rect.left + rect.width  / 2
    const centerY = rect.top  + rect.height / 2
    const x = ((e.clientX - centerX) / (rect.width  / 2)) * 12
    const y = ((e.clientY - centerY) / (rect.height / 2)) * 10
    setTilt({ x: y, y: x })
  }
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setIsHovered(false)
  }

  const handleAskDetails = () => {
    const msg = encodeURIComponent(`Hi! I'm interested in the "${name}". Could you share more details?`)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      style={{
        animation: `float ${4 + index * 0.8}s ease-in-out ${index * 0.4}s infinite`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '320px',
          borderRadius: '12px',
          overflow: 'hidden',
          cursor: 'pointer',
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: isHovered ? 'transform 0.05s linear' : 'transform 0.5s ease',
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${isHovered ? 'rgba(45, 125, 95,0.55)' : 'rgba(45, 125, 95,0.18)'}`,
          boxShadow: isHovered
            ? '0 0 35px rgba(45, 125, 95,0.45), 0 20px 60px rgba(0,0,0,0.7), inset 0 0 25px rgba(45, 125, 95,0.06)'
            : '0 8px 32px rgba(0,0,0,0.5), inset 0 0 10px rgba(45, 125, 95,0.03)',
        }}
      >
        {/* Product Image */}
        <div style={{ position: 'relative', width: '100%', height: '260px', overflow: 'hidden' }}>
          <img
            src={image}
            alt={name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.6s ease',
            }}
            onError={(e) => {
              // Fallback gradient if image missing
              e.target.style.display = 'none'
              e.target.parentNode.style.background =
                'linear-gradient(135deg, #1a120a 0%, #2a1f0a 50%, #1a1200 100%)'
            }}
          />
          {/* Shimmer overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: isHovered
              ? 'linear-gradient(135deg, rgba(45, 125, 95,0.12), transparent 60%)'
              : 'transparent',
            transition: 'background 0.4s ease',
          }} />
          {/* Badge */}
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(8,8,8,0.7)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(45, 125, 95,0.3)',
            borderRadius: '20px',
            padding: '4px 10px',
          }}>
            <Sparkles size={11} color="#2D7D5F" />
            <span style={{ fontSize: '0.65rem', color: '#2D7D5F', fontWeight: 600, letterSpacing: '0.1em' }}>
              EXCLUSIVE
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.5rem',
            fontWeight: 400,
            color: '#1a1a1a',
            marginBottom: '0.5rem',
            letterSpacing: '0.02em',
          }}>
            {name}
          </h3>
          {description && (
            <p style={{
              fontSize: '0.82rem',
              color: 'rgba(245,230,202,0.6)',
              marginBottom: '1.2rem',
              lineHeight: 1.6,
            }}>
              {description}
            </p>
          )}

          {/* Gold divider */}
          <div className="divider-gold" style={{ margin: '0 0 1.2rem 0' }} />

          {/* CTA Button */}
          <button
            onClick={handleAskDetails}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '11px',
              background: 'linear-gradient(135deg, #2D7D5F, #3a9e7a, #c9a84c)',
              color: '#f5f7f5',
              fontFamily: '"Courier New", sans-serif',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(45, 125, 95,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(45, 125, 95,0.6)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(45, 125, 95,0.3)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <MessageCircle size={15} />
            Ask for Details
          </button>
        </div>
      </div>
    </motion.div>
  )
}
