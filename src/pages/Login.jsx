import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function GridLines() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {[25, 50, 75].map(p => (
        <div key={p} style={{ position: 'absolute', top: 0, bottom: 0, left: `${p}%`, width: 1, background: 'rgba(13,17,23,0.04)' }} />
      ))}
    </div>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const inp = { width: '100%', background: 'var(--bg2)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius)', padding: '13px 16px', color: 'var(--text)', fontSize: 14, fontFamily: 'var(--font-body)', outline: 'none' }

  const handle = async () => {
    if (!email || !password) { setError('Preencha todos os campos.'); return }
    setLoading(true); setError(''); setSuccess('')
    if (mode === 'login') {
      const { error } = await signIn(email, password)
      if (error) { setError('Email ou senha incorretos.'); setLoading(false) }
      else navigate('/dashboard')
    } else {
      const { error } = await signUp(email, password)
      if (error) { setError(error.message); setLoading(false) }
      else { setSuccess('Conta criada! Verifique seu email para confirmar.'); setLoading(false) }
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <GridLines />
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '-20%', right: '-10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,47,232,0.2) 0%, transparent 65%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.14, 0.08] }} transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        style={{ position: 'absolute', bottom: '-15%', left: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,83,10,0.1) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 440, padding: '0 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <button onClick={() => navigate('/')} style={{ background: 'transparent', cursor: 'pointer' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, letterSpacing: '0.04em' }}>brieflow</span>
          </button>
        </div>

        <div style={{ background: 'var(--bg)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-lg)', padding: '40px' }}>
          <div style={{ marginBottom: 32 }}>
            <p className="tag-orange" style={{ marginBottom: 12 }}>— {mode === 'login' ? 'ENTRAR' : 'CRIAR CONTA'}</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400, lineHeight: 1, letterSpacing: '0.02em', whiteSpace: 'pre-line' }}>
              {mode === 'login' ? 'BEM-VINDO\nDE VOLTA.' : 'CRIE SUA\nCONTA.'}
            </h1>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="tag" style={{ display: 'block', marginBottom: 8 }}>EMAIL</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" style={inp}
                onKeyDown={e => e.key === 'Enter' && handle()} />
            </div>
            <div>
              <label className="tag" style={{ display: 'block', marginBottom: 8 }}>SENHA</label>
              <div style={{ position: 'relative' }}>
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ ...inp, paddingRight: 44 }}
                  onKeyDown={e => e.key === 'Enter' && handle()} />
                <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--orange)', letterSpacing: '0.06em' }}>{error}</p>}
            {success && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--blue)', letterSpacing: '0.06em' }}>{success}</p>}

            <button className="btn-primary" onClick={handle} disabled={loading}
              style={{ justifyContent: 'center', padding: '14px', fontSize: 13, opacity: loading ? 0.6 : 1, marginTop: 8 }}>
              {loading ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
              {!loading && <ArrowRight size={14} />}
            </button>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', marginTop: 28, paddingTop: 24, textAlign: 'center' }}>
            <span className="tag">{mode === 'login' ? 'Não tem conta?' : 'Já tem conta?'} </span>
            <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setSuccess('') }}
              style={{ background: 'transparent', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue)', cursor: 'pointer', textDecoration: 'underline' }}>
              {mode === 'login' ? 'Criar conta' : 'Entrar'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
