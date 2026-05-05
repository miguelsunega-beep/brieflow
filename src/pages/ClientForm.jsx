import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft, CheckCircle, Download } from 'lucide-react'
import { useStore } from '../store'

function GridLines() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {[25, 50, 75].map(p => (
        <div key={p} style={{ position: 'absolute', top: 0, bottom: 0, left: `${p}%`, width: 1, background: 'rgba(13,17,23,0.04)' }} />
      ))}
    </div>
  )
}

const COLORS = [
  { hex: '#0D1117', label: 'Preto' },
  { hex: '#1A2FE8', label: 'Azul' },
  { hex: '#4B6EF5', label: 'Azul claro' },
  { hex: '#E8530A', label: 'Laranja' },
  { hex: '#C74208', label: 'Terracota' },
  { hex: '#6B6B6B', label: 'Cinza' },
  { hex: '#CCCCCC', label: 'Prata' },
  { hex: '#F7F5F0', label: 'Off-white' },
  { hex: '#2D6A4F', label: 'Verde' },
  { hex: '#9B2335', label: 'Vermelho' },
]

function ColorPicker({ value = [], onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {COLORS.map(c => (
          <button key={c.hex} onClick={() => onChange(value.includes(c.hex) ? value.filter(x => x !== c.hex) : [...value, c.hex])}
            title={c.label}
            style={{ width: 48, height: 48, borderRadius: 'var(--radius)', background: c.hex, border: value.includes(c.hex) ? '2px solid var(--blue)' : '2px solid transparent', outline: value.includes(c.hex) ? '2px solid var(--blue)' : '1px solid rgba(13,17,23,0.15)', outlineOffset: 2, transition: 'all 0.15s', cursor: 'pointer', transform: value.includes(c.hex) ? 'scale(1.1)' : 'scale(1)' }}
          />
        ))}
      </div>
      {value.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="tag">SELECIONADAS:</span>
          <div style={{ display: 'flex', gap: 6 }}>
            {value.map(hex => (
              <div key={hex} style={{ width: 20, height: 20, borderRadius: 2, background: hex, border: '1px solid rgba(13,17,23,0.15)' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ScaleInput({ value, onChange, min, max }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <span className="tag">{min || 'MÍNIMO'}</span>
        <span className="tag">{max || 'MÁXIMO'}</span>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {[1,2,3,4,5,6,7,8,9,10].map(n => (
          <button key={n} onClick={() => onChange(n)}
            style={{ flex: 1, height: 52, borderRadius: 'var(--radius)', border: `1px solid ${value === n ? 'var(--blue)' : 'var(--border-strong)'}`, background: value === n ? 'var(--blue)' : 'transparent', color: value === n ? 'white' : 'var(--text-muted)', fontSize: 15, cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-display)', letterSpacing: '0.02em' }}
          >{n}</button>
        ))}
      </div>
    </div>
  )
}

export default function ClientForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getForm, submitResponses } = useStore()
  const form = getForm(id)
  const [current, setCurrent] = useState(0)
  const [responses, setResponses] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [direction, setDirection] = useState(1)

  if (!form) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', flexDirection: 'column', gap: 16 }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, opacity: 0.3 }}>QUESTIONÁRIO NÃO ENCONTRADO</p>
      <button className="btn-ghost" onClick={() => navigate('/')}>Voltar</button>
    </div>
  )

  const q = form.questions[current]
  const progress = (current / form.questions.length) * 100
  const answer = responses[q?.id]
  const canAdvance = !q?.required || (answer !== undefined && answer !== '' && (Array.isArray(answer) ? answer.length > 0 : true))

  const next = () => {
    if (current < form.questions.length - 1) { setDirection(1); setCurrent(c => c + 1) }
    else { submitResponses(id, responses); setSubmitted(true) }
  }
  const back = () => { setDirection(-1); setCurrent(c => c - 1) }
  const setAnswer = (v) => setResponses(r => ({ ...r, [q.id]: v }))

  const generatePDF = () => {
    const lines = form.questions.map((q, i) => {
      const ans = responses[q.id]
      const ansText = Array.isArray(ans) ? ans.join(', ') : (ans?.toString() || '—')
      return `${String(i+1).padStart(2,'0')}. ${q.label}\n    R: ${ansText}`
    }).join('\n\n')
    const content = `BRIEFLOW — BRIEFING DE IDENTIDADE VISUAL\n${'—'.repeat(50)}\nPROJETO: ${form.name}\nCLIENTE: ${form.clientName}\nDATA: ${new Date().toLocaleDateString('pt-BR')}\n${'—'.repeat(50)}\n\n${lines}\n\n${'—'.repeat(50)}\nGerado pelo Brieflow`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `briefing-${form.clientName.toLowerCase().replace(/\s/g,'-')}.txt`; a.click()
  }

  if (submitted) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <GridLines />
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '-20%', right: '-10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, #1A2FE8 0%, transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 1, maxWidth: 600, padding: 48, textAlign: 'center' }}>
        <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          style={{ width: 72, height: 72, borderRadius: 'var(--radius)', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 40px' }}>
          <CheckCircle size={32} color="var(--white)" />
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="tag-orange" style={{ marginBottom: 16 }}>— BRIEFING CONCLUÍDO</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 8vw, 96px)', fontWeight: 400, lineHeight: 0.9, marginBottom: 32, letterSpacing: '0.02em' }}>
          ENVIADO<br /><span style={{ color: 'var(--blue)' }}>COM<br />SUCESSO.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 40, fontWeight: 300 }}>
          Obrigado pelo tempo dedicado, <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{form.clientName}</strong>.<br />
          Suas respostas foram recebidas e serão usadas para criar sua identidade visual.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="btn-primary" onClick={generatePDF}><Download size={14} /> Baixar resumo</button>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' }}>
          <span className="tag">POWERED BY</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, letterSpacing: '0.06em' }}>BRIEFLOW</span>
        </motion.div>
      </motion.div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <GridLines />
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08], x: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'fixed', top: '10%', right: '-15%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, #1A2FE8 0%, transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.1, 0.06] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        style={{ position: 'fixed', bottom: '-10%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #E8530A 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, background: 'var(--border)', zIndex: 100 }}>
        <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', background: 'var(--blue)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, padding: '22px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', background: 'rgba(237,234,228,0.9)', backdropFilter: 'blur(20px)' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: '0.08em' }}>BRIEFLOW</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="tag">{form.name.toUpperCase()}</span>
          <span style={{ width: 1, height: 14, background: 'var(--border-strong)', display: 'inline-block' }} />
          <span className="tag" style={{ color: 'var(--blue)' }}>{String(current+1).padStart(2,'0')} / {String(form.questions.length).padStart(2,'0')}</span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px', position: 'relative', zIndex: 10 }}>
        <div style={{ width: '100%', maxWidth: 720 }}>
          <motion.div key={`badge-${current}`} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
            <span className="tag-orange">— PARA: {form.clientName.toUpperCase()}</span>
            <div style={{ display: 'flex', gap: 4 }}>
              {form.questions.map((_, i) => (
                <div key={i} style={{ width: i === current ? 20 : 6, height: 4, borderRadius: 2, background: i < current ? 'var(--text)' : i === current ? 'var(--blue)' : 'var(--border-strong)', transition: 'all 0.3s' }} />
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={q.id} custom={direction}
              initial={{ opacity: 0, x: direction * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 400, lineHeight: 0.92, marginBottom: 40, letterSpacing: '0.01em' }}>
                {q.label.toUpperCase()}
                {q.required && <span style={{ color: 'var(--blue)' }}>.</span>}
              </h2>
              <div style={{ marginBottom: 48 }}>
                {q.type === 'text' && (
                  <input value={answer || ''} onChange={e => setAnswer(e.target.value)} placeholder="Sua resposta..." autoFocus
                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border-strong)', padding: '14px 0', color: 'var(--text)', fontSize: 20, fontWeight: 300, fontFamily: 'var(--font-body)', outline: 'none' }} />
                )}
                {q.type === 'textarea' && (
                  <textarea value={answer || ''} onChange={e => setAnswer(e.target.value)} placeholder="Sua resposta..." autoFocus rows={4}
                    style={{ width: '100%', background: 'rgba(13,17,23,0.03)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius)', padding: '16px', color: 'var(--text)', fontSize: 16, resize: 'vertical', lineHeight: 1.7, fontWeight: 300, fontFamily: 'var(--font-body)', outline: 'none' }} />
                )}
                {q.type === 'choice' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {(q.options || []).map((opt, i) => (
                      <motion.button key={opt} whileTap={{ scale: 0.99 }} onClick={() => setAnswer(opt)}
                        style={{ padding: '18px 24px', borderRadius: 'var(--radius)', border: `1px solid ${answer === opt ? 'var(--blue)' : 'var(--border-strong)'}`, background: answer === opt ? 'var(--blue)' : 'transparent', color: answer === opt ? 'white' : 'var(--text)', fontSize: 15, textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.5, minWidth: 20 }}>{String(i+1).padStart(2,'0')}</span>
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                )}
                {q.type === 'scale' && <ScaleInput value={answer} onChange={setAnswer} min={q.min} max={q.max} />}
                {q.type === 'multicolor' && <ColorPicker value={answer || []} onChange={setAnswer} />}
              </div>
            </motion.div>
          </AnimatePresence>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {current > 0 && (
              <button className="btn-ghost" onClick={back} style={{ padding: '14px 18px' }}>
                <ChevronLeft size={16} />
              </button>
            )}
            <button className="btn-primary" onClick={next} disabled={!canAdvance}
              style={{ flex: 1, justifyContent: 'center', padding: '16px', opacity: canAdvance ? 1 : 0.3, cursor: canAdvance ? 'pointer' : 'not-allowed', fontSize: 14 }}>
              {current < form.questions.length - 1 ? 'Próxima pergunta' : 'Enviar briefing'}
              <ChevronRight size={15} />
            </button>
          </div>

          {q.required && !canAdvance && answer !== undefined && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="tag"
              style={{ marginTop: 12, color: 'var(--orange)', textAlign: 'center' }}>
              Esta pergunta é obrigatória
            </motion.p>
          )}
        </div>
      </div>
    </div>
  )
}
