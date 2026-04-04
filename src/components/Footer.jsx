// =========================================================
// src/components/Footer.jsx
// Minimal luxury footer with brand tagline & social icons.
// =========================================================
import React from 'react'
import { Instagram, Facebook, Twitter, ShieldCheck } from 'lucide-react'

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
          fontFamily: '"Playfair Display", serif',
          fontSize: '2rem',
          fontWeight: 300,
          color: '#2D7D5F',
          letterSpacing: '0.1em',
          marginBottom: '0.5rem',
        }}>
          LUMIÈRE JEWELS
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
          <a href="#" className="text-gold-muted hover:text-gold" style={{ transition: 'color 0.3s' }}>
            <Instagram size={20} />
          </a>
          <a href="#" className="text-gold-muted hover:text-gold" style={{ transition: 'color 0.3s' }}>
            <Facebook size={20} />
          </a>
          <a href="#" className="text-gold-muted hover:text-gold" style={{ transition: 'color 0.3s' }}>
            <Twitter size={20} />
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
            <ShieldCheck size={14} color="#2D7D5F" />
            <span>100% Secure Checkout & Worldwide Shipping</span>
          </div>
          <p>© {new Date().getFullYear()} Lumière Jewels. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  )
}
