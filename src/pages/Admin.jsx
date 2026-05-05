import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Plus, Copy, ExternalLink, Trash2, ArrowLeft, X } from 'lucide-react'
import { useStore } from '../store'
import Blobs from '../components/Blobs'

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

function Modal({ onClose, onSave }) {
  const [name, setName] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const inp = { width: '100%', background: 'var(--bg2)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius)', padding: '12px 16px', color: 'var(--text)', fontSize: 14, fontFamily: 'var(--font-body)' }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(13,17,23,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24, backdropFilter: 'blur(12px)' }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
        transition={{ ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{ background: 'var(--bg)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-lg)', padding: '48px', width: '100%', maxWidth: 520 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
          <div>
            <p className="tag-orange" style={{ marginBottom: 10 }}>— NOVO PROJETO</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, letterSpacing: '0.03em', lineHeight: 1 }}>CRIAR<br />QUESTIONÁRIO</h2>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', color: 'var(--text-muted)', marginTop: 4 }}><X size={18} /></button>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { label: 'NOME DO PROJETO', value: name, set: setName, placeholder: 'Ex: Identidade Visual — Barbearia do Zé' },
            { label: 'NOME DO CLIENTE', value: clientName, set: setClientName, placeholder: 'Ex: José Silva' },
            { label: 'EMAIL DO CLIENTE', value: clientEmail, set: setClientEmail, placeholder: 'jose@email.com', type: 'email' },
          ].map(f => (
            <div key={f.label}>
              <label className="tag" style={{ display: 'block', marginBottom: 8 }}>{f.label}</label>
              <input type={f.type || 'text'} value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} style={inp} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 32 }}>
          <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>Cancelar</button>
          <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}
            onClick={() => { if (name && clientName) { onSave({ name, clientName, clientEmail }); onClose() } }}>
            Criar projeto <Plus size={14} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Admin() {
  const navigate = useNavigate()
  const { forms, createForm, deleteForm } = useStore()
  const [showModal, setShowModal] = useState(false)
  const [copied, setCopied] = useState(null)

  const copyLink = (id) => {
    navigator.clipboard.writeText(`${window.location.origin}/form/${id}`)
    setCopied(id); setTimeout(() => setCopied(null), 2000)
  }
  const handleCreate = (data) => {
    const id = createForm(data)
    setTimeout(() => navigate(`/admin/form/${id}`), 200)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
      <Blobs />
      <GridLines />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'fixed', top: '-20%', right: '-10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, #1A2FE8 0%, transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }}
      />

      <div style={{ borderBottom: '1px solid var(--border)', padding: '18px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(237,234,228,0.9)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button onClick={() => navigate('/')} style={{ background: 'transparent', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <ArrowLeft size={14} />
          </button>
          <div style={{ width: 1, height: 16, background: 'var(--border-strong)' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '0.06em' }}>BRIEFLOW</span>
          <span className="tag" style={{ background: 'var(--blue)', color: 'white', padding: '2px 8px', borderRadius: 2 }}>PAINEL</span>
        </div>
        <button className="btn-primary" style={{ padding: '9px 22px' }} onClick={() => setShowModal(true)}>
          <Plus size={13} /> Novo projeto
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 48px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, paddingBottom: 40, borderBottom: '1px solid var(--border)' }}>
          <div>
            <motion.p {...fade(0)} className="tag-orange" style={{ marginBottom: 16 }}>— SEUS PROJETOS</motion.p>
            <motion.h1 {...fade(0.1)} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 6vw, 80px)', fontWeight: 400, lineHeight: 0.9, letterSpacing: '0.02em' }}>
              PAINEL<br />
              <span style={{ color: 'var(--blue)' }}>ADMIN</span>
            </motion.h1>
          </div>
          <motion.div {...fade(0.2)} style={{ display: 'flex', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {[
              { label: 'TOTAL', value: forms.length, color: 'var(--blue)' },
              { label: 'PENDENTES', value: forms.filter(f => f.status === 'pending').length, color: 'var(--orange)' },
              { label: 'CONCLUÍDOS', value: forms.filter(f => f.status === 'completed').length, color: 'var(--text)' },
            ].map(s => (
              <div key={s.label} style={{ padding: '24px 36px', background: 'var(--bg)', textAlign: 'center', minWidth: 110 }}>
                <p className="tag" style={{ marginBottom: 8 }}>{s.label}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: s.color, lineHeight: 1 }}>{s.value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 120px 160px', gap: 16, padding: '0 20px 12px', marginBottom: 8 }}>
          <span className="tag">PROJETO</span>
          <span className="tag" style={{ textAlign: 'center' }}>STATUS</span>
          <span className="tag" style={{ textAlign: 'center' }}>PERGUNTAS</span>
          <span className="tag" style={{ textAlign: 'right' }}>AÇÕES</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <AnimatePresence>
            {forms.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '100px 0', background: 'var(--bg)' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, marginBottom: 12, opacity: 0.2 }}>NENHUM PROJETO</p>
                <p className="tag">Crie seu primeiro questionário acima</p>
              </div>
            ) : forms.map((form, i) => (
              <motion.div key={form.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 160px 120px 160px', gap: 16, alignItems: 'center', padding: '20px', background: 'var(--bg)', transition: 'background 0.15s', cursor: 'default' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: '0.03em', marginBottom: 4 }}>{form.name.toUpperCase()}</p>
                  <p className="tag">{form.clientName} — {new Date(form.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 2, background: form.status === 'completed' ? 'rgba(13,17,23,0.08)' : 'rgba(232,83,10,0.1)', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: form.status === 'completed' ? 'var(--text)' : 'var(--orange)' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: form.status === 'completed' ? 'var(--text)' : 'var(--orange)' }} />
                    {form.status === 'completed' ? 'Concluído' : 'Pendente'}
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, textAlign: 'center', color: 'var(--text-muted)' }}>{form.questions.length}</p>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                  <button onClick={() => navigate(`/admin/form/${form.id}`)}
                    style={{ background: 'transparent', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius)', padding: '7px 12px', color: 'var(--text)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text)' }}>
                    <ExternalLink size={11} /> Editar
                  </button>
                  <button onClick={() => copyLink(form.id)}
                    style={{ background: copied === form.id ? 'var(--blue)' : 'transparent', border: `1px solid ${copied === form.id ? 'var(--blue)' : 'var(--border-strong)'}`, borderRadius: 'var(--radius)', padding: '7px 12px', color: copied === form.id ? 'white' : 'var(--text)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <Copy size={11} /> {copied === form.id ? 'OK!' : 'Link'}
                  </button>
                  <button onClick={() => deleteForm(form.id)}
                    style={{ background: 'transparent', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius)', padding: '7px 9px', color: 'var(--orange)', cursor: 'pointer', transition: 'all 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--orange)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-strong)'}>
                    <Trash2 size={11} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.button {...fade(0.3)} onClick={() => setShowModal(true)}
          style={{ width: '100%', marginTop: 8, padding: '18px', background: 'transparent', border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.color = 'var(--blue)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
          <Plus size={14} /> Novo projeto
        </motion.button>
      </div>

      <AnimatePresence>{showModal && <Modal onClose={() => setShowModal(false)} onSave={handleCreate} />}</AnimatePresence>
    </div>
  )
}
