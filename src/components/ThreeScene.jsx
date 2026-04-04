// =========================================================
// src/components/ThreeScene.jsx
// 3D floating gold ring (torus) with PBR material,
// cinematic camera drift, and warm point lighting.
// =========================================================
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshDistortMaterial, Torus, Sphere } from '@react-three/drei'

/* ── Rotating Gold Ring ────────────────────────────────── */
function GoldRing() {
  const meshRef = useRef()
  const innerRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    // Slow Y rotation + gentle float on Y axis
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.25
    meshRef.current.rotation.y = t * 0.4
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.15
    // Inner gem pulse scale
    innerRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.04)
  })

  return (
    <group ref={meshRef}>
      {/* Outer ring */}
      <Torus args={[1.1, 0.28, 64, 128]}>
        <meshStandardMaterial
          color="#C5A028"
          metalness={0.98}
          roughness={0.08}
          envMapIntensity={2.5}
        />
      </Torus>

      {/* Inner diamond gem */}
      <mesh ref={innerRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[0.38, 0]} />
        <MeshDistortMaterial
          color="#FFFAF0"
          metalness={0.1}
          roughness={0}
          distort={0.15}
          speed={1.5}
          envMapIntensity={3}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Decorative thin outer halo ring */}
      <Torus args={[1.45, 0.03, 16, 100]}>
        <meshStandardMaterial
          color="#3a9e7a"
          metalness={1}
          roughness={0.05}
          transparent
          opacity={0.5}
          envMapIntensity={3}
        />
      </Torus>
    </group>
  )
}

/* ── Cinematic Camera Drift ────────────────────────────── */
function CameraDrift() {
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime()
    camera.position.x = Math.sin(t * 0.12) * 0.6
    camera.position.y = 0.5 + Math.cos(t * 0.1) * 0.3
    camera.position.z = 4.2 + Math.sin(t * 0.08) * 0.4
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* ── Ambient Glow Sphere ───────────────────────────────── */
function GlowOrb() {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.intensity = 1.8 + Math.sin(t * 0.8) * 0.6
  })
  return (
    <pointLight ref={ref} position={[2, 2, 2]} color="#3a9e7a" intensity={1.8} distance={8} />
  )
}

/* ── Main Export ───────────────────────────────────────── */
export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, zIndex: 1 }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.3} color="#1a1a1a" />
      <GlowOrb />
      <pointLight position={[-3, -2, -3]} color="#c9a84c" intensity={0.8} distance={10} />
      <pointLight position={[0, 3, 1]}   color="#FFFFFF"  intensity={0.5} distance={10} />

      {/* Environment reflections */}
      <Environment preset="city" />

      {/* Camera animation */}
      <CameraDrift />

      {/* The jewellery object */}
      <GoldRing />
    </Canvas>
  )
}
