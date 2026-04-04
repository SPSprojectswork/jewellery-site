// =========================================================
// src/pages/Admin.jsx
// Image upload interface using react-dropzone.
// Sends images to /api/upload.
// =========================================================
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, FileImage, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Admin() {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [success, setSuccess] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    // Append new files to state, create local Object URLs for preview
    setFiles((prev) => [
      ...prev,
      ...acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
    ])
    setSuccess(false)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] }
  })

  // Cleanup object urls on unmount
  React.useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = (name) => {
    setFiles(files.filter(f => f.name !== name))
  }

  const handleUpload = async () => {
    if (files.length === 0) return
    setUploading(true)
    
    const formData = new FormData()
    files.forEach(file => formData.append('images', file))

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        setSuccess(true)
        setFiles([])
      } else {
        alert('Upload failed. Is the local Express server running?')
      }
    } catch (err) {
      console.error(err)
      alert('Upload failed. Make sure you run `node server.js` alongside Vite.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#040404',
      padding: '4rem 1.5rem',
      fontFamily: '"Courier New", sans-serif',
      color: '#1a1a1a'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '2.5rem',
              color: '#2D7D5F',
              marginBottom: '0.5rem'
            }}>
              Lumière Admin
            </h1>
            <p style={{ color: 'rgba(245,230,202,0.6)' }}>Upload products to the gallery</p>
          </div>
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            color: '#2D7D5F', textDecoration: 'none', borderBottom: '1px solid transparent',
            transition: 'border-color 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderBottom = '1px solid #2D7D5F'}
          onMouseLeave={(e) => e.currentTarget.style.borderBottom = '1px solid transparent'}
          >
            <ArrowLeft size={16} /> Back to Site
          </Link>
        </div>

        {/* Dropzone Area */}
        <div
          {...getRootProps()}
          style={{
            padding: '4rem 2rem',
            background: isDragActive ? 'rgba(45, 125, 95,0.08)' : 'rgba(255,255,255,0.02)',
            border: `2px dashed ${isDragActive ? '#2D7D5F' : 'rgba(45, 125, 95,0.2)'}`,
            borderRadius: '12px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginBottom: '2rem'
          }}
        >
          <input {...getInputProps()} />
          <UploadCloud 
            size={48} 
            color={isDragActive ? '#3a9e7a' : '#2D7D5F'} 
            style={{ margin: '0 auto 1rem', transition: 'color 0.3s' }} 
          />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
            {isDragActive ? 'Drop images here...' : 'Drag & drop product images'}
          </h3>
          <p style={{ color: 'rgba(245,230,202,0.5)', fontSize: '0.85rem' }}>
            Supports JPG, PNG, WEBP. You can select multiple images.
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div style={{
            padding: '1rem 1.5rem',
            background: 'rgba(37,211,102,0.1)',
            border: '1px solid rgba(37,211,102,0.3)',
            borderRadius: '8px',
            color: '#25D366',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '2rem'
          }}>
            <CheckCircle2 size={20} />
            Images uploaded successfully! They are now visible in the gallery.
          </div>
        )}

        {/* Preview Grid */}
        {files.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(45, 125, 95,0.1)',
            borderRadius: '12px',
            padding: '2rem',
          }}>
            <h4 style={{ marginBottom: '1.5rem', color: '#2D7D5F', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileImage size={18} /> Selected Images ({files.length})
            </h4>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {files.map(file => (
                <div key={file.name} style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden', height: '120px' }}>
                  <img src={file.preview} alt={file.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(file.name); }}
                    style={{
                      position: 'absolute', top: '4px', right: '4px',
                      background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff',
                      width: '24px', height: '24px', borderRadius: '50%', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px'
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleUpload}
                disabled={uploading}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '12px 28px',
                  background: 'linear-gradient(135deg, #2D7D5F, #c9a84c)',
                  color: '#f5f7f5',
                  border: 'none', borderRadius: '4px',
                  fontWeight: 600, textTransform: 'uppercase', cursor: uploading ? 'not-allowed' : 'pointer',
                  opacity: uploading ? 0.7 : 1, transition: 'all 0.3s'
                }}
              >
                {uploading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                {uploading ? 'Uploading...' : 'Save Images'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
