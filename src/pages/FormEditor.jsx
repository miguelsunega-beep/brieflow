import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, GripVertical, Copy, ExternalLink, Save, CheckCircle } from 'lucide-react'
import { useStore } from '../store'

const QUESTION_TYPES = [
  { value: 'text', label: 'Texto curto' },
  { value: 'textarea', label: 'Texto longo' },
  { value: 'choice', label: 'Múltipla escolha' },
  { value: 'scale', label: 'Escala (1-10)' },
  { value: 'multicolor', label: 'Seleção de cores' },
]

const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', color: 'var(--text)', fontSize: 14 }
const selectStyle = { ...inputStyle, cursor: 'pointer' }

export default function FormEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getForm, updateForm } = useStore()
  const form = getForm(id)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!form) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--dark)' }}>
      <p>Questionário não encontrado.</p>
    </div>
  )

  const [questions, setQuestions] = useState(form.questions)

  const save = () => {
    updateForm(id, { questions })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const addQuestion = () => {
    setQuestions(q => [...q, { id: Date.now().toString(), type: 'text', label: '', required: false, options: ['Opção 1', 'Opção 2'] }])
  }

  const updateQ = (qid, updates) => setQuestions(q => q.map(x => x.id === qid ? { ...x, ...updates } : x))
  const removeQ = (qid) => setQuestions(q => q.filter(x => x.id !== qid))

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/form/${id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', paddingBottom: 80 }}>
      <div style={{ position: 'fixed', top: '-15%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(43,134,197,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ borderBottom: '1px solid var(--border)', padding: '18px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(20px)', background: 'rgba(10,10,15,0.8)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => navigate('/admin')} style={{ background: 'transparent', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
            <ArrowLeft size={16} /> Painel
          </button>
          <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16 }}>{form.name}</p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{form.clientName}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={copyLink} style={{ background: copied ? 'rgba(0,245,212,0.15)' : 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 10, padding: '9px 18px', color: copied ? '#00F5D4' : 'var(--text)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Copy size={14} /> {copied ? 'Copiado!' : 'Copiar link do cliente'}
          </button>
          <button onClick={() => window.open(`/form/${id}`, '_blank')} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 10, padding: '9px 14px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
            <ExternalLink size={14} /> Prévia
          </button>
          <button className="btn-primary" style={{ padding: '9px 22px', fontSize: 14 }} onClick={save}>
            {saved ? <><CheckCircle size={15} /> Salvo!</> : <><Save size={15} /> Salvar</>}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 48px 0' }}>
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Link para o cliente:</p>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 16px', fontSize: 13, color: 'var(--text-muted)', fontFamily: 'monospace' }}>
            {window.location.origin}/form/{id}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <AnimatePresence>
            {questions.map((q, i) => (
              <motion.div
                key={q.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="card-glass"
                style={{ padding: '24px 28px' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                    <GripVertical size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0, fontWeight: 600 }}>#{i + 1}</span>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <input
                        value={q.label}
                        onChange={e => updateQ(q.id, { label: e.target.value })}
                        placeholder="Texto da pergunta..."
                        style={inputStyle}
                      />
                      <div style={{ display: 'flex', gap: 10 }}>
                        <select value={q.type} onChange={e => updateQ(q.id, { type: e.target.value })} style={{ ...selectStyle, flex: 1 }}>
                          {QUESTION_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                          <input type="checkbox" checked={q.required} onChange={e => updateQ(q.id, { required: e.target.checked })} />
                          Obrigatória
                        </label>
                      </div>
                      {q.type === 'choice' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {(q.options || []).map((opt, oi) => (
                            <div key={oi} style={{ display: 'flex', gap: 8 }}>
                              <input value={opt} onChange={e => { const opts = [...q.options]; opts[oi] = e.target.value; updateQ(q.id, { options: opts }) }} style={{ ...inputStyle, flex: 1 }} placeholder={`Opção ${oi + 1}`} />
                              <button onClick={() => { const opts = q.options.filter((_, j) => j !== oi); updateQ(q.id, { options: opts }) }} style={{ background: 'rgba(255,60,172,0.1)', border: 'none', borderRadius: 8, padding: '0 10px', color: '#FF3CAC' }}><Trash2 size={13} /></button>
                            </div>
                          ))}
                          <button onClick={() => updateQ(q.id, { options: [...(q.options || []), `Opção ${(q.options?.length || 0) + 1}`] })} style={{ background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: 8, padding: '8px', color: 'var(--text-muted)', fontSize: 13 }}>
                            + Adicionar opção
                          </button>
                        </div>
                      )}
                      {q.type === 'scale' && (
                        <div style={{ display: 'flex', gap: 10 }}>
                          <input value={q.min || ''} onChange={e => updateQ(q.id, { min: e.target.value })} placeholder="Label mínimo (ex: Clássico)" style={{ ...inputStyle, flex: 1 }} />
                          <input value={q.max || ''} onChange={e => updateQ(q.id, { max: e.target.value })} placeholder="Label máximo (ex: Moderno)" style={{ ...inputStyle, flex: 1 }} />
                        </div>
                      )}
                    </div>
                  </div>
                  <button onClick={() => removeQ(q.id)} style={{ background: 'rgba(255,60,172,0.08)', border: '1px solid rgba(255,60,172,0.2)', borderRadius: 10, padding: '8px 10px', color: '#FF3CAC', flexShrink: 0 }}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={addQuestion}
          style={{ width: '100%', marginTop: 16, padding: '18px', background: 'transparent', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: 16, color: 'var(--text-muted)', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,60,172,0.4)'; e.currentTarget.style.color = '#FF3CAC' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'var(--text-muted)' }}
        >
          <Plus size={18} /> Adicionar pergunta
        </motion.button>
      </div>
    </div>
  )
} 