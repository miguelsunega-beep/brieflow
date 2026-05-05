import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Sparkles, CheckCircle, Download } from 'lucide-react'
import { useStore } from '../store'
import Scene3D from '../components/Scene3D'

const COLORS = ['#FF3CAC','#784BA0','#2B86C5','#00F5D4','#F7B731','#FC5C7D','#1DB954','#FF6B35','#A8DADC','#E63946']

function ColorPicker({ value = [], onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {COLORS.map(c => (
        <button key={c} onClick={() => onChange(value.includes(c) ? value.filter(x => x !== c) : [...value, c])}
          style={{ width: 44, height: 44, borderRadius: '50%', background: c, border: value.includes(c) ? '3px solid white' : '3px solid transparent', boxShadow: value.includes(c) ? `0 0 0 2px ${c}` : 'none', transition: 'all 0.2s', cursor: 'pointer' }}
        />
      ))}
    </div>
  )
}

function ScaleInput({ value, onChange, min, max }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: 'var(--text-muted)' }}>
        <span>{min || 'Mínimo'}</span><span>{max || 'Máximo'}</span>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {[1,2,3,4,5,6,7,8,9,10].map(n => (
          <button key={n} onClick={() => onChange(n)}
            style={{ flex: 1, height: 44, borderRadius: 10, border: 'none', background: value === n ? 'var(--grad-hero)' : 'rgba(255,255,255,0.06)', color: value === n ? 'white' : 'var(--text-muted)', fontWeight: value === n ? 700 : 400, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s' }}
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--dark)', flexDirection: 'column', gap: 16 }}>
      <p style={{ fontSize: 20 }}>Questionário não encontrado.</p>
      <button className="btn-ghost" onClick={() => navigate('/')}>Voltar ao início</button>
    </div>
  )

  const q = form.questions[current]
  const progress = ((current) / form.questions.length) * 100
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
      return `${i+1}. ${q.label}\n   Resposta: ${ansText}`
    }).join('\n\n')
    const content = `BRIEFING — ${form.name}\nCliente: ${form.clientName}\nData: ${new Date().toLocaleDateString('pt-BR')}\n\n${'='.repeat(60)}\n\n${lines}`
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `briefing-${form.clientName.toLowerCase().replace(/\s/g,'-')}.txt`; a.click()
  }

  if (submitted) return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <Scene3D style={{ width: '100%', height: '100%' }} />
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 520, padding: 48 }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #00F5D4, #2B86C5)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
          <CheckCircle size={40} color="white" />
        </motion.div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, marginBottom: 16 }}>Pronto! 🎉</h1>
        <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 36 }}>
          Suas respostas foram enviadas com sucesso. <strong style={{ color: 'var(--text)' }}>{form.clientName}</strong>, obrigado pelo tempo dedicado!
        </p>
        <button className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }} onClick={generatePDF}>
          <Download size={18} /> Baixar resumo das respostas
        </button>
      </motion.div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.3 }}>
        <Scene3D style={{ width: '100%', height: '100%' }} />
      </div>

      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.08)', zIndex: 100 }}>
        <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }}
          style={{ height: '100%', background: 'var(--grad-hero)', borderRadius: '0 2px 2px 0' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10, padding: '24px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--grad-hero)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={14} color="white" />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Brieflow</span>
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{current + 1} de {form.questions.length}</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 48px', position: 'relative', zIndex: 10 }}>
        <div style={{ width: '100%', maxWidth: 640 }}>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 50, border: '1px solid rgba(255,60,172,0.3)', background: 'rgba(255,60,172,0.08)', marginBottom: 24 }}>
            <span style={{ fontSize: 12, color: '#FF3CAC', fontWeight: 500 }}>Para: {form.clientName}</span>
          </motion.div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={q.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ marginBottom: 32 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.15 }}>
                  {q.label}
                  {q.required && <span style={{ color: '#FF3CAC', marginLeft: 4 }}>*</span>}
                </span>
              </div>

              <div style={{ marginBottom: 40 }}>
                {q.type === 'text' && (
                  <input value={answer || ''} onChange={e => setAnswer(e.target.value)} placeholder="Sua resposta..." autoFocus
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '18px 24px', color: 'var(--text)', fontSize: 18 }}
                  />
                )}
                {q.type === 'textarea' && (
                  <textarea value={answer || ''} onChange={e => setAnswer(e.target.value)} placeholder="Sua resposta..." autoFocus rows={4}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '18px 24px', color: 'var(--text)', fontSize: 16, resize: 'vertical', lineHeight: 1.6 }}
                  />
                )}
                {q.type === 'choice' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {(q.options || []).map(opt => (
                      <motion.button key={opt} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setAnswer(opt)}
                        style={{ padding: '16px 24px', borderRadius: 14, border: `1px solid ${answer === opt ? 'rgba(255,60,172,0.6)' : 'rgba(255,255,255,0.1)'}`, background: answer === opt ? 'rgba(255,60,172,0.12)' : 'rgba(255,255,255,0.04)', color: answer === opt ? 'var(--text)' : 'var(--text-muted)', fontSize: 16, textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s' }}>
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

          <div style={{ display: 'flex', gap: 12 }}>
            {current > 0 && (
              <button className="btn-ghost" onClick={back} style={{ padding: '14px 24px' }}>
                <ChevronLeft size={18} />
              </button>
            )}
            <button className="btn-primary" onClick={next} disabled={!canAdvance}
              style={{ flex: 1, justifyContent: 'center', padding: '16px', opacity: canAdvance ? 1 : 0.4, cursor: canAdvance ? 'pointer' : 'not-allowed', fontSize: 16 }}>
              {current < form.questions.length - 1 ? 'Próxima' : 'Enviar briefing'}
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 