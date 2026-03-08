// =========================================================
// src/components/Gallery.jsx
// Dynamic masonry grid reading images from
// /public/products/manifest.json
// Effects: hover zoom, parallax, fade-in per image.
// =========================================================
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ZoomIn } from 'lucide-react'

/* ── Lightbox ──────────────────────────────────────────── */
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const close = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backdropFilter: 'blur(8px)',
      }}
    >
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          objectFit: 'contain',
          borderRadius: '8px',
          border: '1px solid rgba(212,175,55,0.3)',
          boxShadow: '0 0 60px rgba(212,175,55,0.3)',
        }}
      />
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'rgba(212,175,55,0.15)',
          border: '1px solid rgba(212,175,55,0.4)',
          color: '#D4AF37',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '1.2rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ✕
      </button>
    </div>
  )
}

/* ── Gallery Item ──────────────────────────────────────── */
function GalleryItem({ src, alt, index, onOpen }) {
  const [hovered, setHovered] = useState(false)

  // Vary the aspect ratio for masonry feel
  const heights = [250, 300, 220, 340, 270, 290]
  const height  = heights[index % heights.length]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(src, alt)}
      style={{
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        height: `${height}px`,
        border: `1px solid ${hovered ? 'rgba(212,175,55,0.45)' : 'rgba(212,175,55,0.08)'}`,
        boxShadow: hovered ? '0 0 25px rgba(212,175,55,0.3)' : '0 4px 20px rgba(0,0,0,0.4)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.6s ease',
        }}
      />
      {/* Hover overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: hovered ? 'rgba(0,0,0,0.45)' : 'transparent',
        transition: 'background 0.4s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {hovered && (
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(212,175,55,0.2)',
            border: '1px solid rgba(212,175,55,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <ZoomIn size={22} color="#D4AF37" />
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ── Main Export ───────────────────────────────────────── */
export default function Gallery() {
  const [images, setImages]       = useState([])
  const [lightbox, setLightbox]   = useState(null)
  const [loading, setLoading]     = useState(true)

  useEffect(() => {
    // Load images from manifest
    fetch('/products/manifest.json')
      .then((r) => r.json())
      .then((files) => {
        setImages(files.map((f) => ({ src: `/products/${f}`, alt: f.replace(/\.[^.]+$/, '').replace(/-/g, ' ') })))
      })
      .catch(() => {
        // Fallback: show placeholders if manifest not found
        setImages([])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section
      id="gallery"
      style={{ padding: '6rem 1.5rem', background: '#080808', textAlign: 'center' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '3.5rem' }}
      >
        <p className="section-sub" style={{ marginBottom: '0.75rem' }}>Our Collection</p>
        <h2 className="section-heading">Product Gallery</h2>
        <div className="divider-gold" />
        <p style={{ color: 'rgba(245,230,202,0.5)', fontSize: '0.85rem', marginTop: '0.75rem' }}>
          Click any piece to view in detail
        </p>
      </motion.div>

      {/* Grid */}
      {loading ? (
        <p style={{ color: 'rgba(245,230,202,0.4)', fontStyle: 'italic' }}>Loading gallery…</p>
      ) : images.length === 0 ? (
        <div style={{
          padding: '3rem',
          border: '1px dashed rgba(212,175,55,0.2)',
          borderRadius: '8px',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          <p style={{ color: 'rgba(245,230,202,0.4)', fontStyle: 'italic' }}>
            No gallery images yet. Upload images from the{' '}
            <a href="/admin" style={{ color: '#D4AF37', textDecoration: 'underline' }}>Admin page</a>.
          </p>
        </div>
      ) : (
        <div style={{
          columns: 'auto 220px',
          columnGap: '1rem',
          maxWidth: '1100px',
          margin: '0 auto',
          textAlign: 'left',
        }}>
          {images.map((img, i) => (
            <div key={img.src} style={{ marginBottom: '1rem', breakInside: 'avoid' }}>
              <GalleryItem
                src={img.src}
                alt={img.alt}
                index={i}
                onOpen={(src, alt) => setLightbox({ src, alt })}
              />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </section>
  )
}
