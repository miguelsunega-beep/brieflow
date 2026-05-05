import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, CheckCircle, Zap, FileText, Palette } from 'lucide-react'
import Scene3D from '../components/Scene3D'

const features = [
  { icon: <Palette size={22} />, title: 'Questionários personalizados', desc: 'Monte o briefing perfeito pra cada cliente, adicionando ou removendo perguntas.' },
  { icon: <Zap size={22} />, title: 'Link único por cliente', desc: 'Gere um link exclusivo e envie direto. O cliente preenche sem precisar de login.' },
  { icon: <FileText size={22} />, title: 'PDF automático', desc: 'Após o preenchimento, baixe um relatório completo com todas as respostas organizadas.' },
]

const steps = [
  { n: '01', title: 'Crie o questionário', desc: 'Acesse o painel, adicione suas perguntas e personalize para o cliente.' },
  { n: '02', title: 'Envie o link', desc: 'Copie o link único gerado e mande para o seu cliente por WhatsApp, email ou onde preferir.' },
  { n: '03', title: 'Receba o briefing', desc: 'O cliente responde, você recebe tudo organizado e pronto para criar a identidade visual.' },
]

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark)', position: 'relative', overflowX: 'hidden' }}>
      
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,60,172,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: '30%', right: '-15%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(43,134,197,0.1) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '30%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,245,212,0.08) 0%, transparent 70%)' }} />
      </div>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', background: 'rgba(10,10,15,0.8)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--grad-hero)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={16} color="white" />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.03em' }}>Brieflow</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-ghost" style={{ padding: '10px 24px', fontSize: 14 }} onClick={() => navigate('/admin')}>Painel Admin</button>
          <button className="btn-primary" style={{ padding: '10px 24px', fontSize: 14 }} onClick={() => navigate('/admin')}>
            Começar grátis <ArrowRight size={15} />
          </button>
        </div>
      </motion.nav>

      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', padding: '120px 48px 80px' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Scene3D style={{ width: '100%', height: '100%', opacity: 0.7 }} />
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 50, border: '1px solid rgba(255,60,172,0.3)', background: 'rgba(255,60,172,0.08)', marginBottom: 32 }}>
              <Sparkles size={14} color="#FF3CAC" />
              <span style={{ fontSize: 13, color: '#FF3CAC', fontWeight: 500 }}>Briefing de identidade visual inteligente</span>
            </div>
            <h1 style={{ fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 800, marginBottom: 24, lineHeight: 1.0 }}>
              Colete briefings
              <br />
              <span className="gradient-text">que inspiram</span>
              <br />
              grandes marcas.
            </h1>
            <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 520, marginBottom: 40 }}>
              Crie questionários personalizados para cada cliente, envie um link e receba um briefing completo em PDF — tudo numa ferramenta feita para designers.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button className="btn-primary" style={{ fontSize: 16, padding: '16px 36px' }} onClick={() => navigate('/admin')}>
                Acessar painel <ArrowRight size={18} />
              </button>
              <button className="btn-ghost" style={{ fontSize: 16, padding: '16px 36px' }} onClick={() => navigate('/form/demo-001')}>
                Ver demo do cliente
              </button>
            </div>
            <div style={{ marginTop: 40, display: 'flex', gap: 24 }}>
              {['Sem limite de clientes', 'PDF automático', '100% personalizável'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <CheckCircle size={14} color="#00F5D4" />
                  <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '100px 48px', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, marginBottom: 16 }}>
            Tudo que você precisa,<br /><span className="gradient-text-warm">nada do que atrapalha</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto' }}>
            Ferramentas simples e diretas para você focar no que importa: criar identidades visuais incríveis.
          </p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 1100, margin: '0 auto' }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="card-glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, borderColor: 'rgba(255,60,172,0.3)' }}
              style={{ padding: 32 }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--grad-hero)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: 'white' }}>
                {f.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 48px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, marginBottom: 16 }}>
              Como <span className="gradient-text">funciona</span>
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={{ position: 'relative' }}
              >
                <div style={{ fontSize: 'clamp(64px, 8vw, 96px)', fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1, background: 'var(--grad-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', opacity: 0.3, marginBottom: 16 }}>{s.n}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 48px', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '80px 48px', borderRadius: 32, background: 'linear-gradient(135deg, rgba(255,60,172,0.1) 0%, rgba(120,75,160,0.15) 50%, rgba(43,134,197,0.1) 100%)', border: '1px solid rgba(255,60,172,0.2)' }}
        >
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, marginBottom: 20 }}>
            Pronto para elevar seus<br /><span className="gradient-text">briefings?</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-muted)', marginBottom: 36 }}>Acesse o painel, crie seu primeiro questionário e envie para um cliente ainda hoje.</p>
          <button className="btn-primary" style={{ fontSize: 17, padding: '18px 48px' }} onClick={() => navigate('/admin')}>
            Acessar o Brieflow <ArrowRight size={20} />
          </button>
        </motion.div>
      </section>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: 'var(--grad-hero)' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Brieflow</span>
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Feito para designers que levam o trabalho a sério.</span>
      </footer>
    </div>
  )
}
