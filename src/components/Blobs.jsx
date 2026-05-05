import { motion } from 'framer-motion'

export default function Blobs({ dark = false }) {
  const base = dark ? 'rgba(75,110,245,' : 'rgba(26,47,232,'
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '-15%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${base}0.25) 0%, transparent 70%)`, filter: 'blur(60px)' }}
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ position: 'absolute', top: '20%', right: '-15%', width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle, ${base}0.2) 0%, transparent 70%)`, filter: 'blur(80px)' }}
      />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, 25, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        style={{ position: 'absolute', bottom: '-10%', left: '25%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${base}0.15) 0%, transparent 70%)`, filter: 'blur(70px)' }}
      />
      {!dark && (
        <motion.div
          animate={{ x: [0, -15, 0], y: [0, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 9 }}
          style={{ position: 'absolute', top: '50%', left: '40%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,83,10,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
      )}
    </div>
  )
}