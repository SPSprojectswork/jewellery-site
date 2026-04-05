// =========================================================
// src/components/Footer.jsx
// Minimal luxury footer with brand tagline & social icons.
// =========================================================
import React from 'react'
import { Instagram, ShieldCheck, Code2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      padding: '4rem 1.5rem 2rem',
      background: '#040404',
      borderTop: '1px solid rgba(45, 125, 95,0.1)',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Brand Name */}
        <h2 style={{
          fontFamily: '"Great Vibes", cursive',
          fontSize: '3.5rem',
          fontWeight: 400,
          color: '#ffffff',
          marginBottom: '0.5rem',
        }}>
          pearlyn accessories
        </h2>

        {/* Tagline */}
        <p style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.1rem',
          fontStyle: 'italic',
          color: 'rgba(245,230,202,0.6)',
          marginBottom: '2.5rem',
        }}>
          Elegant jewellery crafted to shine.
        </p>

        {/* Links / Socials Grid */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          <a href="https://instagram.com/pearlyn.co_" target="_blank" className="text-gold-muted hover:text-gold" style={{ transition: 'color 0.3s' }}>
            <Instagram size={20} />
          </a>
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: '1px', background: 'rgba(45, 125, 95,0.1)', marginBottom: '2rem' }} />

        {/* Bottom */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.75rem',
          color: 'rgba(245,230,202,0.4)',
          letterSpacing: '0.05em',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} color="#91ba37ff" />
            <span>100% Secure Checkout &amp; Worldwide Shipping</span>
          </div>
          <p>© {new Date().getFullYear()} pearlyn accessories. All rights reserved.</p>
        </div>

        {/* ── Developer Credit ─────────────────────────────── */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid rgba(45, 125, 95,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}>
          {/* Pulsing dot */}
          <span style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#2D7D5F',
            animation: 'pulse-gold 2s ease-in-out infinite',
            flexShrink: 0,
          }} />

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: '"Courier New", monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(205, 235, 15, 0.55)',
            }}
          >
            <Code2 size={11} />
            Designed &amp; Developed by&nbsp;<strong style={{ letterSpacing: '0.1em' }}>SPS Projects Work</strong>
          </span>

          <span style={{
            display: 'inline-block',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#2D7D5F',
            animation: 'pulse-gold 2s ease-in-out 1s infinite',
            flexShrink: 0,
          }} />
        </div>

      </div>
    </footer>
  )
}

