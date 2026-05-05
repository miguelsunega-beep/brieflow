import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Blobs from '../components/Blobs'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
})

const fadeV = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
})

function NoiseBg() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }}>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}

function GridLines() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {[25, 50, 75].map(p => (
        <div key={p} style={{ position: 'absolute', top: 0, bottom: 0, left: `${p}%`, width: 1, background: 'rgba(13,17,23,0.05)' }} />
      ))}
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowX: 'hidden' }}>

      <motion.nav {...fade(0)} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '18px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', background: 'rgba(237,234,228,0.9)', backdropFilter: 'blur(20px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, letterSpacing: '0.08em' }}>BRIEFLOW</span>
          <span className="tag" style={{ background: 'var(--blue)', color: 'white', padding: '2px 8px', borderRadius: 2 }}>BETA</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <span className="tag" style={{ cursor: 'pointer' }} onClick={() => navigate('/form/demo-001')}>VER DEMO</span>
          <span className="tag" style={{ cursor: 'pointer' }} onClick={() => navigate('/admin')}>PAINEL</span>
          <button className="btn-primary" style={{ padding: '9px 22px' }} onClick={() => navigate('/admin')}>
            Acessar <ArrowUpRight size={13} />
          </button>
        </div>
      </motion.nav>

      <section style={{ minHeight: '100vh', display: 'grid', gridTemplateRows: '1fr auto', padding: '80px 48px 0', position: 'relative', overflow: 'hidden' }}>
        <Blobs />
        <GridLines />
        <NoiseBg />

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '10%', right: '5%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, #1A2FE8 0%, #4B6EF5 40%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }}
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.14, 0.08], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          style={{ position: 'absolute', bottom: '5%', right: '20%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #E8530A 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }}
        />

        <div style={{ position: 'absolute', top: 96, left: 48, zIndex: 1 }}>
          <motion.p {...fade(0.1)} className="tag">SISTEMA DE BRIEFING</motion.p>
          <motion.p {...fade(0.15)} className="tag" style={{ marginTop: 4 }}>IDENTIDADE VISUAL — 2025</motion.p>
        </div>
        <div style={{ position: 'absolute', top: 96, right: 48, textAlign: 'right', zIndex: 1 }}>
          <motion.p {...fade(0.1)} className="tag">23°28'S 46°37'W</motion.p>
          <motion.p {...fade(0.15)} className="tag" style={{ marginTop: 4 }}>SÃO PAULO — BR</motion.p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1, paddingTop: 80 }}>
          <motion.p {...fade(0.2)} className="tag-orange" style={{ marginBottom: 20 }}>
            — COLETA DE BRIEFING PARA DESIGNERS
          </motion.p>

          <motion.h1 {...fade(0.3)} style={{ fontSize: 'clamp(100px, 15vw, 220px)', fontWeight: 400, lineHeight: 0.85, letterSpacing: '0.01em' }}>
            BRIEF
          </motion.h1>
          <motion.h1 {...fade(0.38)} style={{ fontSize: 'clamp(100px, 15vw, 220px)', fontWeight: 400, lineHeight: 0.85, marginBottom: 56, letterSpacing: '0.01em', color: 'var(--blue)' }}>
            LOW
          </motion.h1>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40 }}>
            <motion.p {...fade(0.45)} style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 380, fontWeight: 300 }}>
              Crie questionários personalizados para cada cliente, envie um link único e receba um briefing completo — tudo numa ferramenta feita para designers que levam o trabalho a sério.
            </motion.p>
            <motion.div {...fade(0.5)} style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn-primary" onClick={() => navigate('/admin')} style={{ padding: '13px 28px' }}>
                  Acessar painel <ArrowRight size={14} />
                </button>
                <button className="btn-ghost" onClick={() => navigate('/form/demo-001')} style={{ padding: '13px 28px' }}>
                  Ver demo
                </button>
              </div>
              <p className="tag">Sem cadastro · Sem mensalidade · 100% seu</p>
            </motion.div>
          </div>
        </div>

        <motion.div {...fade(0.6)} style={{ borderTop: '1px solid var(--border)', paddingTop: 20, paddingBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 1, marginTop: 48 }}>
          {['01 — Questionários personalizados', '02 — Link único por cliente', '03 — PDF automático', '04 — Sem limite de clientes'].map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </motion.div>
      </section>

      <section style={{ padding: '120px 48px', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <Blobs />
        <GridLines />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 80, alignItems: 'start' }}>
            <div style={{ paddingTop: 8 }}>
              <motion.p {...fadeV(0)} className="tag-orange" style={{ marginBottom: 20 }}>— O QUE É</motion.p>
              <motion.p {...fadeV(0.1)} style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.9, fontFamily: 'var(--font-mono)' }}>
                Sistema de briefing<br />
                desenvolvido para<br />
                profissionais de design<br />
                de identidade visual
              </motion.p>
            </div>
            <div>
              <motion.h2 {...fadeV(0.15)} style={{ fontSize: 'clamp(48px, 6vw, 88px)', fontWeight: 400, lineHeight: 0.92, marginBottom: 48 }}>
                BRIEFINGS QUE<br />
                <span style={{ color: 'var(--blue)' }}>INSPIRAM</span><br />
                GRANDES MARCAS.
              </motion.h2>
              <motion.div {...fadeV(0.25)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {[
                  { label: 'Para cada cliente', desc: 'Questionários 100% personalizáveis. Adicione, remova e reordene perguntas para cada projeto.' },
                  { label: 'Sem fricção', desc: 'O cliente recebe um link, abre no celular ou computador e responde sem criar conta.' },
                ].map(item => (
                  <div key={item.label} style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 10 }}>{item.label}</p>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 48px 120px', position: 'relative' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border-strong)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {[
              { n: '01', title: 'QUESTIONÁRIOS\nPERSONALIZADOS', desc: 'Monte o briefing perfeito para cada cliente. Adicione, remova e reordene perguntas livremente. 5 tipos de pergunta disponíveis.' },
              { n: '02', title: 'LINK ÚNICO\nPOR CLIENTE', desc: 'Gere um link exclusivo e envie por WhatsApp ou email. O cliente preenche sem precisar criar conta ou instalar nada.' },
              { n: '03', title: 'RELATÓRIO\nAUTOMÁTICO', desc: 'Após o preenchimento, exporte um briefing completo e organizado. Pronto para usar na criação da identidade visual.' },
            ].map((f, i) => (
              <motion.div key={f.n} {...fadeV(i * 0.12)}
                style={{ padding: '44px 40px', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
                <span className="tag-orange" style={{ marginBottom: 32 }}>{f.n}</span>
                <h3 style={{ fontSize: 32, fontWeight: 400, whiteSpace: 'pre-line', lineHeight: 0.95, marginBottom: 24 }}>{f.title}</h3>
                <div style={{ width: 32, height: 1, background: 'var(--border-strong)', marginBottom: 24 }} />
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '120px 48px', background: 'var(--dark)', color: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <Blobs dark />
        <NoiseBg />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '-20%', right: '-10%', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, #1A2FE8 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }}
        />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 80, flexWrap: 'wrap', gap: 32 }}>
            <div>
              <motion.p {...fadeV(0)} className="tag" style={{ color: 'rgba(247,245,240,0.35)', marginBottom: 16 }}>— COMO FUNCIONA</motion.p>
              <motion.h2 {...fadeV(0.1)} style={{ fontSize: 'clamp(48px, 6vw, 88px)', fontWeight: 400, lineHeight: 0.92 }}>
                TRÊS<br />PASSOS.
              </motion.h2>
            </div>
            <motion.p {...fadeV(0.2)} style={{ fontSize: 14, color: 'rgba(247,245,240,0.45)', maxWidth: 300, lineHeight: 1.8, fontWeight: 300 }}>
              Do briefing à identidade visual em menos tempo, com mais clareza e resultados melhores para você e seu cliente.
            </motion.p>
          </div>
          <div style={{ borderTop: '1px solid rgba(247,245,240,0.08)' }}>
            {[
              { n: '01', title: 'CRIE O QUESTIONÁRIO', desc: 'Acesse o painel, adicione suas perguntas e personalize para o projeto. Escolha entre texto, múltipla escolha, escala e seleção de cores.' },
              { n: '02', title: 'ENVIE O LINK', desc: 'Copie o link único gerado e mande para seu cliente por WhatsApp ou email. Ele abre no celular, sem login, sem cadastro.' },
              { n: '03', title: 'RECEBA O BRIEFING', desc: 'O cliente responde e você recebe tudo organizado e exportável em PDF. Comece a criar com informações reais.' },
            ].map((s, i) => (
              <motion.div key={s.n} {...fadeV(i * 0.15)}
                style={{ display: 'grid', gridTemplateColumns: '80px 1fr 320px', gap: 40, alignItems: 'center', padding: '44px 0', borderBottom: '1px solid rgba(247,245,240,0.08)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'rgba(247,245,240,0.25)' }}>{s.n}</span>
                <h3 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(247,245,240,0.45)', lineHeight: 1.8, fontWeight: 300 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '140px 48px', position: 'relative', overflow: 'hidden' }}>
        <Blobs />
        <GridLines />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', bottom: '-20%', left: '20%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, #1A2FE8 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }}
        />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 80, alignItems: 'flex-end' }}>
            <div>
              <motion.p {...fadeV(0)} className="tag-orange" style={{ marginBottom: 24 }}>— COMECE AGORA</motion.p>
              <motion.h2 {...fadeV(0.1)} style={{ fontSize: 'clamp(60px, 8vw, 130px)', fontWeight: 400, lineHeight: 0.88 }}>
                PRONTO<br />
                PARA<br />
                <span style={{ color: 'var(--blue)' }}>COMEÇAR?</span>
              </motion.h2>
            </div>
            <motion.div {...fadeV(0.2)} style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 8 }}>
              <button className="btn-primary" style={{ fontSize: 14, padding: '16px 36px', whiteSpace: 'nowrap' }} onClick={() => navigate('/admin')}>
                Acessar o Brieflow <ArrowRight size={14} />
              </button>
              <button className="btn-ghost" style={{ fontSize: 14, padding: '16px 36px', whiteSpace: 'nowrap' }} onClick={() => navigate('/form/demo-001')}>
                Ver demo do cliente
              </button>
              <p className="tag" style={{ textAlign: 'center' }}>Gratuito · Sem limite</p>
            </motion.div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '28px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: '0.08em' }}>BRIEFLOW</span>
        <span className="tag" style={{ textAlign: 'center' }}>FEITO PARA DESIGNERS</span>
        <span className="tag" style={{ textAlign: 'right' }}>© 2025 — TODOS OS DIREITOS RESERVADOS</span>
      </footer>
    </div>
  )
}
