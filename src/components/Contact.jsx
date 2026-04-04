// =========================================================
// src/components/Contact.jsx
// Luxury CTA panel with WhatsApp, Instagram, Call buttons.
// Gold glow hover animations.
// =========================================================
import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Instagram, Phone, Sparkles } from 'lucide-react'

/* ── Update these with real contact details ──────────────── */
const WHATSAPP_NUMBER = '916379892595'
const INSTAGRAM_URL   = 'https://ig.me/m/pearlyn.co_'
const PHONE_NUMBER    = 'tel:+916379892595'

const BUTTONS = [
  {
    label: 'WhatsApp',
    icon: MessageCircle,
    color: '#25D366',
    glow: 'rgba(37,211,102,0.4)',
    action: () => window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'm interested in your jewellery collection.")}`,
      '_blank'
    ),
  },
  {
    label: 'Instagram',
    icon: Instagram,
    color: '#E1306C',
    glow: 'rgba(225,48,108,0.4)',
    action: () => window.open(INSTAGRAM_URL, '_blank'),
  },
  {
    label: 'Call Us',
    icon: Phone,
    color: '#2D7D5F',
    glow: 'rgba(45, 125, 95,0.4)',
    action: () => window.open(PHONE_NUMBER),
  },
]

function ContactButton({ label, icon: Icon, color, glow, action, index }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.12 }}
      whileHover={{ y: -4, scale: 1.03 }}
      onClick={action}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 30px',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${color}55`,
        borderRadius: '6px',
        color: color,
        fontFamily: '"Courier New", sans-serif',
        fontSize: '0.85rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
      }}
      onHoverStart={(e) => {
        e.target.style && (e.target.style.boxShadow = `0 0 25px ${glow}`)
      }}
      onHoverEnd={(e) => {
        e.target.style && (e.target.style.boxShadow = 'none')
      }}
    >
      <Icon size={18} />
      {label}
    </motion.button>
  )
}

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: '7rem 1.5rem',
        background: 'transparent',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '600px',
        height: '300px',
        background: 'transparent',
        pointerEvents: 'none',
      }} />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          padding: '3.5rem 2.5rem',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(45, 125, 95,0.15)',
          borderRadius: '12px',
          boxShadow: '0 0 60px rgba(45, 125, 95,0.08), 0 20px 60px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        {/* Top sparkle */}
        <div style={{ marginBottom: '1.5rem' }}>
          <Sparkles size={28} color="#2D7D5F" style={{ animation: 'pulse-gold 2s ease-in-out infinite' }} />
        </div>

        <p className="section-sub" style={{ marginBottom: '1rem' }}>Get in Touch</p>

        <h2 className="section-heading" style={{ marginBottom: '0.75rem' }}>
          Courier Newested in this design?
        </h2>

        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.25rem',
          fontStyle: 'italic',
          fontWeight: 300,
          color: '#6b7280',
          marginBottom: '2rem',
          opacity: 0.8,
        }}>
          Contact us to place your order.
        </p>

        <div className="divider-gold" style={{ marginBottom: '2rem' }} />

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {BUTTONS.map((btn, i) => (
            <ContactButton key={btn.label} {...btn} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
