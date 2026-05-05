import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, GripVertical, Copy, ExternalLink, Save, CheckCircle } from 'lucide-react'
import { useStore } from '../store'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }
})

function GridLines() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {[25, 50, 75].map(p => (
        <div key={p} style={{ position: 'absolute', top: 0, bottom: 0, left: `${p}%`, width: 1, background: 'rgba(13,17,23,0.04)' }} />
      ))}
    </div>
  )
}

const TYPES = [
  { value: 'text', label: 'Texto curto' },
  { value: 'textarea', label: 'Texto longo' },
  { value: 'choice', label: 'Múltipla escolha' },
  { value: 'scale', label: 'Escala (1-10)' },
  { value: 'multicolor', label: 'Seleção de cores' },
]

const inp = {
  width: '100%', background: 'var(--bg2)', border: '1px solid var(--border-strong)',
  borderRadius: 'var(--radius)', padding: '10px 14px', color: 'var(--text)', fontSize: 14,
  fontFamily: 'var(--font-body)'
}

export default function FormEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getForm, updateForm } = useStore()
  const form = getForm(id)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!form) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', flexDirection: 'column', gap: 16 }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, opacity: 0.3 }}>PROJETO NÃO ENCONTRADO</p>
      <button className="btn-ghost" onClick={() => navigate('/admin')}>Voltar ao painel</button>
    </div>
  )

  const [questions, setQuestions] = useState(form.questions)

  const save = () => { updateForm(id, { questions }); setSaved(true); setTimeout(() => setSaved(false), 2000) }
  const addQ = () => setQuestions(q => [...q, { id: Date.now().toString(), type: 'text', label: '', required: false, options: ['Opção 1', 'Opção 2'] }])
  const updateQ = (qid, updates) => setQuestions(q => q.map(x => x.id === qid ? { ...x, ...updates } : x))
  const removeQ = (qid) => setQuestions(q => q.filter(x => x.id !== qid))
  const copyLink = () => { navigator.clipboard.writeText(`${window.location.origin}/form/${id}`); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 100, position: 'relative', overflow: 'hidden' }}>
      <GridLines />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.07, 0.13, 0.07] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, #1A2FE8 0%, transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }}
      />

      <div style={{ borderBottom: '1px solid var(--border)', padding: '18px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(237,234,228,0.9)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button onClick={() => navigate('/admin')} style={{ background: 'transparent', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
            <ArrowLeft size={15} />
          </button>
          <div style={{ width: 1, height: 16, background: 'var(--border-strong)' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '0.06em' }}>BRIEFLOW</span>
          <span className="tag" style={{ background: 'var(--blue)', color: 'white', padding: '2px 8px', borderRadius: 2 }}>EDITOR</span>
          <div style={{ width: 1, height: 16, background: 'var(--border-strong)' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, letterSpacing: '0.04em', color: 'var(--text-muted)' }}>{form.name.toUpperCase()}</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={copyLink}
            style={{ background: copied ? 'var(--blue)' : 'transparent', border: `1px solid ${copied ? 'var(--blue)' : 'var(--border-strong)'}`, borderRadius: 'var(--radius)', padding: '8px 16px', color: copied ? 'white' : 'var(--text)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer', transition: 'all 0.2s' }}>
            <Copy size={11} /> {copied ? 'Copiado!' : 'Link do cliente'}
          </button>
          <button onClick={() => window.open(`/form/${id}`, '_blank')}
            style={{ background: 'transparent', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius)', padding: '8px 14px', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text)' }}>
            <ExternalLink size={11} /> Prévia
          </button>
          <button className="btn-primary" style={{ padding: '8px 22px' }} onClick={save}>
            {saved ? <><CheckCircle size={13} /> Salvo!</> : <><Save size={13} /> Salvar</>}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '64px 48px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 48, paddingBottom: 40, borderBottom: '1px solid var(--border)' }}>
          <motion.p {...fade(0)} className="tag-orange" style={{ marginBottom: 16 }}>— EDITOR DE QUESTIONÁRIO</motion.p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <motion.h1 {...fade(0.1)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 400, lineHeight: 0.9, letterSpacing: '0.02em' }}>
              {form.name.toUpperCase()}
            </motion.h1>
            <motion.div {...fade(0.2)} style={{ display: 'flex', gap: 24 }}>
              <div style={{ textAlign: 'right' }}>
                <p className="tag" style={{ marginBottom: 4 }}>CLIENTE</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{form.clientName}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="tag" style={{ marginBottom: 4 }}>PERGUNTAS</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, lineHeight: 1, color: 'var(--blue)' }}>{questions.length}</p>
              </div>
            </motion.div>
          </div>
          <motion.div {...fade(0.3)} style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '10px 16px' }}>
            <span className="tag">LINK DO CLIENTE:</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', flex: 1 }}>{window.location.origin}/form/{id}</span>
            <button onClick={copyLink} style={{ background: 'transparent', border: 'none', color: 'var(--blue)', fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer' }}>
              {copied ? 'Copiado!' : 'Copiar'}
            </button>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '32px 24px 1fr 160px 100px 40px', gap: 12, padding: '0 12px 10px', marginBottom: 4 }}>
          <span /><span className="tag">#</span><span className="tag">PERGUNTA</span><span className="tag">TIPO</span><span className="tag">OBRIGATÓRIA</span><span />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <AnimatePresence>
            {questions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', background: 'var(--bg)' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, opacity: 0.2, marginBottom: 12 }}>NENHUMA PERGUNTA</p>
                <p className="tag">Adicione a primeira pergunta abaixo</p>
              </div>
            ) : questions.map((q, i) => (
              <motion.div key={q.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                style={{ background: 'var(--bg)', padding: '20px 12px', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}>
                <div style={{ display: 'grid', gridTemplateColumns: '32px 24px 1fr 160px 100px 40px', gap: 12, alignItems: 'center' }}>
                  <GripVertical size={14} color="var(--text-light)" style={{ cursor: 'grab' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-light)' }}>{String(i+1).padStart(2,'0')}</span>
                  <input value={q.label} onChange={e => updateQ(q.id, { label: e.target.value })} placeholder="Escreva a pergunta aqui..."
                    style={{ ...inp, background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', borderRadius: 0, padding: '6px 0', fontSize: 15 }} />
                  <select value={q.type} onChange={e => updateQ(q.id, { type: e.target.value })}
                    style={{ ...inp, padding: '7px 10px', fontSize: 12, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer' }}>
                    {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                  <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
                    <input type="checkbox" checked={q.required} onChange={e => updateQ(q.id, { required: e.target.checked })} />
                    <span className="tag" style={{ color: q.required ? 'var(--blue)' : 'var(--text-light)' }}>{q.required ? 'SIM' : 'NÃO'}</span>
                  </label>
                  <button onClick={() => removeQ(q.id)}
                    style={{ background: 'transparent', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius)', padding: '6px 8px', color: 'var(--orange)', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--orange)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-strong)'}>
                    <Trash2 size={12} />
                  </button>
                </div>
                {q.type === 'choice' && (
                  <div style={{ marginTop: 16, marginLeft: 68, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <p className="tag" style={{ marginBottom: 4 }}>OPÇÕES DE RESPOSTA</p>
                    {(q.options || []).map((opt, oi) => (
                      <div key={oi} style={{ display: 'flex', gap: 6 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-light)', minWidth: 24, paddingTop: 10 }}>{String(oi+1).padStart(2,'0')}</span>
                        <input value={opt} onChange={e => { const opts = [...q.options]; opts[oi] = e.target.value; updateQ(q.id, { options: opts }) }} style={{ ...inp, flex: 1, fontSize: 13 }} placeholder={`Opção ${oi+1}`} />
                        <button onClick={() => updateQ(q.id, { options: q.options.filter((_, j) => j !== oi) })}
                          style={{ background: 'transparent', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius)', padding: '0 10px', color: 'var(--orange)', cursor: 'pointer' }}>
                          <Trash2 size={11} />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => updateQ(q.id, { options: [...(q.options || []), `Opção ${(q.options?.length || 0) + 1}`] })}
                      style={{ background: 'transparent', border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius)', padding: '8px 16px', color: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer', marginTop: 4, alignSelf: 'flex-start', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
                      + Adicionar opção
                    </button>
                  </div>
                )}
                {q.type === 'scale' && (
                  <div style={{ marginTop: 16, marginLeft: 68, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 400 }}>
                    <div>
                      <p className="tag" style={{ marginBottom: 6 }}>LABEL MÍNIMO</p>
                      <input value={q.min || ''} onChange={e => updateQ(q.id, { min: e.target.value })} placeholder="Ex: Muito clássico" style={{ ...inp, fontSize: 13 }} />
                    </div>
                    <div>
                      <p className="tag" style={{ marginBottom: 6 }}>LABEL MÁXIMO</p>
                      <input value={q.max || ''} onChange={e => updateQ(q.id, { max: e.target.value })} placeholder="Ex: Muito moderno" style={{ ...inp, fontSize: 13 }} />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button onClick={addQ}
          style={{ width: '100%', marginTop: 8, padding: '18px', background: 'transparent', border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
          <Plus size={14} /> Adicionar pergunta
        </button>

        <AnimatePresence>
          {saved && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              style={{ position: 'fixed', bottom: 32, right: 32, background: 'var(--dark)', color: 'var(--white)', padding: '12px 24px', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', zIndex: 50 }}>
              <CheckCircle size={14} color="#00F5D4" /> Questionário salvo
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
