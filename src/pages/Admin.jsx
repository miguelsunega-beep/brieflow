import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Plus, Copy, ExternalLink, Trash2, CheckCircle, Clock, Sparkles, ArrowLeft, FileText, User, Mail, X } from 'lucide-react'
import { useStore } from '../store'

function Modal({ onClose, onSave }) {
  const [name, setName] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: 24 }}
      onClick={onClose}
    >
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{ background: '#1A1A26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 40, width: '100%', maxWidth: 480 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700 }}>Novo questionário</h2>
          <button onClick={onClose} style={{ background: 'transparent', color: 'var(--text-muted)', padding: 4 }}><X size={20} /></button>
        </div>
        {[
          { label: 'Nome do projeto', icon: <FileText size={16} />, value: name, set: setName, placeholder: 'Ex: Identidade Visual — Barbearia do Zé' },
          { label: 'Nome do cliente', icon: <User size={16} />, value: clientName, set: setClientName, placeholder: 'Ex: José Silva' },
          { label: 'Email do cliente', icon: <Mail size={16} />, value: clientEmail, set: setClientEmail, placeholder: 'jose@email.com', type: 'email' },
        ].map(f => (
          <div key={f.label} style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 500 }}>{f.label}</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>{f.icon}</span>
              <input type={f.type || 'text'} value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '12px 14px 12px 40px', color: 'var(--text)', fontSize: 14 }} />
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
          <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>Cancelar</button>
          <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}
            onClick={() => { if (name && clientName) { onSave({ name, clientName, clientEmail }); onClose() } }}>
            Criar <Plus size={16} />
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
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleCreate = (data) => {
    const id = createForm(data)
    setTimeout(() => navigate(`/admin/form/${id}`), 200)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', padding: '0 0 80px' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(120,75,160,0.12) 0%, transparent 70%)' }} />
      </div>
      <div style={{ borderBottom: '1px solid var(--border)', padding: '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(20px)', background: 'rgba(10,10,15,0.8)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => navigate('/')} style={{ background: 'transparent', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
            <ArrowLeft size={16} /> Voltar
          </button>
          <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--grad-hero)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={14} color="white" />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>Painel Admin</span>
          </div>
        </div>
        <button className="btn-primary" style={{ padding: '10px 22px', fontSize: 14 }} onClick={() => setShowModal(true)}>
          <Plus size={16} /> Novo questionário
        </button>
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 48px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { label: 'Total de projetos', value: forms.length, color: '#FF3CAC' },
            { label: 'Pendentes', value: forms.filter(f => f.status === 'pending').length, color: '#F7B731' },
            { label: 'Concluídos', value: forms.filter(f => f.status === 'completed').length, color: '#00F5D4' },
          ].map(s => (
            <div key={s.label} className="card-glass" style={{ padding: '24px 28px' }}>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>{s.label}</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Questionários</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <AnimatePresence>
            {forms.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
                <FileText size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
                <p>Nenhum questionário criado ainda.</p>
              </div>
            ) : forms.map((form, i) => (
              <motion.div key={form.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.05 }}
                className="card-glass" style={{ padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: form.status === 'completed' ? 'rgba(0,245,212,0.15)' : 'rgba(247,183,49,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {form.status === 'completed' ? <CheckCircle size={20} color="#00F5D4" /> : <Clock size={20} color="#F7B731" />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{form.name}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{form.clientName} · {form.questions.length} perguntas · {new Date(form.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
                <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                  <button onClick={() => navigate(`/admin/form/${form.id}`)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 10, padding: '8px 14px', color: 'var(--text)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ExternalLink size={14} /> Editar
                  </button>
                  <button onClick={() => copyLink(form.id)} style={{ background: copied === form.id ? 'rgba(0,245,212,0.15)' : 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 10, padding: '8px 14px', color: copied === form.id ? '#00F5D4' : 'var(--text)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Copy size={14} /> {copied === form.id ? 'Copiado!' : 'Link'}
                  </button>
                  <button onClick={() => deleteForm(form.id)} style={{ background: 'rgba(255,60,172,0.08)', border: '1px solid rgba(255,60,172,0.2)', borderRadius: 10, padding: '8px 12px', color: '#FF3CAC' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {showModal && <Modal onClose={() => setShowModal(false)} onSave={handleCreate} />}
      </AnimatePresence>
    </div>
  )
}
