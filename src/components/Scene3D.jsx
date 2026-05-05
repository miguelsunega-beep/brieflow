import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Float } from '@react-three/drei'

function FloatingOrb({ position, color, scale = 1, speed = 1, distort = 0.4 }) {
  const mesh = useRef()
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.3
      mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.2
    }
  })
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere ref={mesh} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial color={color} distort={distort} speed={2} roughness={0.1} metalness={0.8} transparent opacity={0.85} />
      </Sphere>
    </Float>
  )
}

function Particles() {
  const points = useRef()
  const count = 300
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i*3] = (Math.random()-0.5)*20
      pos[i*3+1] = (Math.random()-0.5)*20
      pos[i*3+2] = (Math.random()-0.5)*20
    }
    return pos
  }, [])
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#784BA0" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function Scene3D({ style }) {
  return (
    <Canvas style={style} camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#FF3CAC" />
      <pointLight position={[-10, -5, -10]} intensity={1} color="#2B86C5" />
      <pointLight position={[0, 10, -5]} intensity={0.8} color="#00F5D4" />
      <FloatingOrb position={[-2, 1, 0]} color="#FF3CAC" scale={1.4} speed={0.8} distort={0.5} />
      <FloatingOrb position={[2.5, -1, -1]} color="#2B86C5" scale={1.1} speed={1.2} distort={0.3} />
      <FloatingOrb position={[0, 2, -2]} color="#784BA0" scale={0.8} speed={1.5} distort={0.6} />
      <FloatingOrb position={[-3, -2, -1]} color="#00F5D4" scale={0.6} speed={0.9} distort={0.4} />
      <FloatingOrb position={[3, 2, -3]} color="#F7B731" scale={0.5} speed={1.1} distort={0.7} />
      <Particles />
    </Canvas>
  )
}
