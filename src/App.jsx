// =========================================================
// src/App.jsx
// =========================================================
import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Lazy-load heavy pages for better performance
const Home  = lazy(() => import('./pages/Home.jsx'))
const Admin = lazy(() => import('./pages/Admin.jsx'))

/* ── Loading Fallback ─────────────────────────────────── */
function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #2D7D5F 0%, #3a9e7a 60%, #ffffff 100%)',
      gap: '1.5rem',
    }}>
      {/* Spinning gem */}
      <div style={{
        fontSize: '3rem',
        animation: 'spin 1.5s linear infinite',
      }}>💎</div>

      {/* Brand name */}
      <p style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '1.1rem',
        color: 'rgba(255,255,255,0.85)',
        letterSpacing: '0.1em',
      }}>
        pearlyn accessories
      </p>

      {/* Animated dots */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.7)',
              animation: `dotBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  )
}

/* ── 404 Not Found Page ───────────────────────────────── */
function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #2D7D5F 0%, #3a9e7a 60%, #ffffff 100%)',
      textAlign: 'center',
      padding: '2rem',
      gap: '1rem',
    }}>
      <span style={{ fontSize: '4rem' }}>💎</span>
      <h1 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(3rem, 10vw, 6rem)',
        color: 'rgba(255,255,255,0.2)',
        lineHeight: 1,
      }}>404</h1>
      <p style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '1.4rem',
        color: '#ffffff',
        fontWeight: 400,
      }}>Page Not Found</p>
      <p style={{
        color: 'rgba(255,255,255,0.7)',
        fontSize: '0.9rem',
        maxWidth: '360px',
        lineHeight: 1.6,
      }}>
        The page you're looking for doesn't exist. Let's take you back to our collection.
      </p>
      <a
        href="#/"
        style={{
          marginTop: '1rem',
          padding: '12px 32px',
          background: '#ffffff',
          color: '#2D7D5F',
          fontFamily: '"Courier New", sans-serif',
          fontSize: '0.82rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          borderRadius: '4px',
          transition: 'all 0.3s ease',
        }}
      >
        Back to Collection
      </a>
    </div>
  )
}

/* ── App ──────────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter basename="/jewellery-site/">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"      element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*"      element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
