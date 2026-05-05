import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowDown } from 'lucide-react'
import Blobs from '../components/Blobs'
import { useRef } from 'react'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
})

const fadeV = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }
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

function AnimatedOrb({ style, delay = 0, duration = 12 }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7], x: [0, 20, 0], y: [0, -15, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      style={style}
    />
  )
}

function LiquidGlassOrb({ size = 200, x, y, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0], rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 8 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{
        position: 'absolute', left: x, top: y,
        width: size, height: size, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(75,110,245,0.3) 50%, rgba(26,47,232,0.1))',
        boxShadow: 'inset 0 0 40px rgba(255,255,255,0.5), inset 0 0 80px rgba(75,110,245,0.2), 0 20px 60px rgba(26,47,232,0.15)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.6)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

function TwistShape({ x, y, delay = 0 }) {
  return (
    <motion.div
      animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
      transition={{ duration: 20 + delay, repeat: Infinity, ease: 'linear', delay }}
      style={{
        position: 'absolute', left: x, top: y,
        width: 120, height: 120,
        background: 'conic-gradient(from 0deg, rgba(75,110,245,0.6), rgba(26,47,232,0.2), rgba(75,110,245,0.6))',
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        boxShadow: 'inset 0 0 30px rgba(255,255,255,0.4), 0 10px 40px rgba(26,47,232,0.2)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255,255,255,0.5)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowX: 'hidden' }}>

      <motion.nav {...fade(0)} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', background: 'rgba(237,234,228,0.92)', backdropFilter: 'blur(24px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, letterSpacing: '0.04em', fontWeight: 400 }}>brieflow</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'white', background: 'var(--blue)', padding: '2px 8px', borderRadius: 2 }}>BETA</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <span className="tag" style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--blue)'} onMouseLeave={e => e.target.style.color = ''}>PRODUTO</span>
          <span className="tag" style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--blue)'} onMouseLeave={e => e.target.style.color = ''}>COMO FUNCIONA</span>
          <span className="tag" style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--blue)'} onMouseLeave={e => e.target.style.color = ''}>PREÇOS</span>
          <button className="btn-primary" style={{ padding: '10px 24px', fontSize: 12 }} onClick={() => navigate('/admin')}>
            Acessar plataforma <ArrowRight size={13} />
          </button>
        </div>
      </motion.nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '120px 48px 80px', position: 'relative', overflow: 'hidden' }}>
        <Blobs /><GridLines />
        <AnimatedOrb delay={0} duration={10} style={{ position: 'absolute', top: '-10%', right: '-5%', width: 650, height: 650, borderRadius: '50%', background: 'radial-gradient(circle at 40% 40%, rgba(26,47,232,0.22) 0%, rgba(75,110,245,0.1) 40%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <AnimatedOrb delay={3} duration={14} style={{ position: 'absolute', bottom: '0%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,83,10,0.12) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <AnimatedOrb delay={6} duration={11} style={{ position: 'absolute', top: '30%', right: '15%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,47,232,0.15) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        <LiquidGlassOrb size={180} x="62%" y="15%" delay={0} />
        <LiquidGlassOrb size={100} x="78%" y="55%" delay={2} />
        <TwistShape x="70%" y="25%" delay={1} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <motion.div {...fade(0.1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 2, border: '1px solid rgba(26,47,232,0.25)', background: 'rgba(26,47,232,0.06)', marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--blue)' }}>Plataforma de briefing para designers</span>
          </motion.div>
          <motion.h1 {...fade(0.2)} style={{ fontSize: 'clamp(72px, 11vw, 160px)', fontWeight: 400, lineHeight: 0.88, marginBottom: 48, letterSpacing: '0.01em', maxWidth: 900 }}>brieflow</motion.h1>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 48 }}>
            <motion.div {...fade(0.35)}>
              <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: 440, fontWeight: 300, marginBottom: 32 }}>
                A ferramenta que transforma o caos do briefing em clareza estratégica. Crie questionários sob medida, envie um link e receba tudo que precisa para começar a criar.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn-primary" style={{ padding: '14px 32px', fontSize: 14 }} onClick={() => navigate('/admin')}>Começar agora <ArrowRight size={15} /></button>
                <button className="btn-ghost" style={{ padding: '14px 32px', fontSize: 14 }}>Ver demo ao vivo</button>
              </div>
            </motion.div>
            <motion.div {...fade(0.45)} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
              {[{ n: '8+', label: 'tipos de pergunta' }, { n: '100%', label: 'personalizável' }, { n: '∞', label: 'projetos simultâneos' }].map(s => (
                <div key={s.n} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--blue)', lineHeight: 1 }}>{s.n}</span>
                  <span className="tag">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div {...fade(0.6)} style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span className="tag">EXPLORAR</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowDown size={16} color="var(--text-muted)" /></motion.div>
        </motion.div>
        <motion.div {...fade(0.5)} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid var(--border)', padding: '16px 48px', display: 'flex', justifyContent: 'space-between', zIndex: 1 }}>
          {['Sem limite de projetos', 'Link único por cliente', 'PDF automático', 'Dados salvos na nuvem'].map((t, i) => (
            <span key={t} className="tag">{String(i+1).padStart(2,'0')} — {t}</span>
          ))}
        </motion.div>
      </section>

      {/* MANIFESTO */}
      <section style={{ padding: '140px 48px', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border)' }}>
        <GridLines />
        <AnimatedOrb delay={2} duration={13} style={{ position: 'absolute', top: '-20%', right: '-10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,47,232,0.14) 0%, transparent 65%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <LiquidGlassOrb size={220} x="5%" y="10%" delay={1} />
        <LiquidGlassOrb size={130} x="88%" y="60%" delay={3} />
        <TwistShape x="8%" y="60%" delay={2} />
        <TwistShape x="85%" y="5%" delay={4} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.p {...fadeV(0)} className="tag-orange" style={{ marginBottom: 24 }}>— O PRODUTO</motion.p>
          <motion.h2 {...fadeV(0.1)} style={{ fontSize: 'clamp(52px, 7vw, 100px)', fontWeight: 400, lineHeight: 0.9, marginBottom: 80, maxWidth: 900 }}>
            BRIEFINGS QUE INSPIRAM{' '}<span style={{ color: 'var(--blue)' }}>GRANDES MARCAS.</span>
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 80 }}>
            <motion.p {...fadeV(0.2)} style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.85, fontWeight: 300 }}>Briefings mal feitos custam tempo, dinheiro e energia. O cliente não sabe explicar o que quer. Você começa o projeto no escuro. Revisões se multiplicam. O resultado decepciona.</motion.p>
            <motion.p {...fadeV(0.3)} style={{ fontSize: 17, color: 'var(--text-muted)', lineHeight: 1.85, fontWeight: 300 }}>O Brieflow foi criado por designers para designers. Um sistema que extrai as informações certas, no momento certo, da forma certa — para que você comece cada projeto com clareza total.</motion.p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {[
              { n: '01', title: 'QUESTIONÁRIOS\nSOB MEDIDA', desc: 'Monte o briefing perfeito para cada nicho — moda, gastronomia, tech, saúde. 5 tipos de pergunta com lógica customizável.' },
              { n: '02', title: 'LINK ÚNICO\nSEM FRICÇÃO', desc: 'O cliente abre no celular, responde em minutos, sem criar conta. A experiência impressiona antes do projeto começar.' },
              { n: '03', title: 'RELATÓRIO\nINSTANTÂNEO', desc: 'Todas as respostas organizadas em PDF profissional, pronto para apresentar na reunião de alinhamento.' },
              { n: '04', title: '+40min\nECONOMIZADOS', desc: 'Por projeto. Sem reuniões improdutivas, sem e-mails intermináveis, sem "você pode me mandar mais detalhes?"' },
            ].map((f, i) => (
              <motion.div key={f.n} {...fadeV(i * 0.1)} style={{ padding: '40px 32px', background: 'var(--bg)', display: 'flex', flexDirection: 'column', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}>
                <span className="tag-orange" style={{ marginBottom: 24 }}>{f.n}</span>
                <h3 style={{ fontSize: 22, fontWeight: 400, whiteSpace: 'pre-line', lineHeight: 1.0, marginBottom: 20 }}>{f.title}</h3>
                <div style={{ width: 24, height: 1, background: 'var(--border-strong)', marginBottom: 20 }} />
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section style={{ padding: '140px 48px', background: 'var(--dark)', color: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <AnimatedOrb delay={0} duration={12} style={{ position: 'absolute', top: '-15%', right: '-8%', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,47,232,0.2) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <AnimatedOrb delay={5} duration={15} style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,83,10,0.1) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 100, flexWrap: 'wrap', gap: 32 }}>
            <div>
              <motion.p {...fadeV(0)} className="tag" style={{ color: 'rgba(247,245,240,0.35)', marginBottom: 20 }}>— COMO FUNCIONA</motion.p>
              <motion.h2 {...fadeV(0.1)} style={{ fontSize: 'clamp(52px, 6vw, 88px)', fontWeight: 400, lineHeight: 0.9 }}>TRÊS PASSOS.<br /><span style={{ color: 'var(--blue)', opacity: 0.7 }}>RESULTADO GARANTIDO.</span></motion.h2>
            </div>
            <motion.p {...fadeV(0.2)} style={{ fontSize: 15, color: 'rgba(247,245,240,0.45)', maxWidth: 340, lineHeight: 1.85, fontWeight: 300 }}>Do primeiro contato com o cliente ao início da criação — sem reuniões improdutivas, sem e-mails intermináveis, sem ruído de comunicação.</motion.p>
          </div>
          <div style={{ borderTop: '1px solid rgba(247,245,240,0.08)' }}>
            {[
              { n: '01', title: 'CONFIGURE O BRIEFING', desc: 'Acesse o painel e monte seu questionário. Escolha entre 5 tipos de pergunta — texto livre, múltipla escolha, escala de valores, seleção de cores e mais. Adicione, remova e reordene conforme o projeto. Salve como template para reutilizar.', detail: '5 tipos de pergunta · Templates reutilizáveis · Perguntas obrigatórias ou opcionais' },
              { n: '02', title: 'ENVIE PARA O CLIENTE', desc: 'Um link único é gerado automaticamente. Mande por WhatsApp, e-mail ou onde preferir. O cliente abre no celular ou computador — sem criar conta, sem instalar nada. A experiência é tão fluida que impressiona antes do projeto começar.', detail: 'Link único por projeto · Funciona em qualquer dispositivo · Sem cadastro para o cliente' },
              { n: '03', title: 'RECEBA E CRIE', desc: 'Quando o cliente termina, você recebe uma notificação. Todas as respostas ficam organizadas no painel com histórico completo. Exporte em PDF profissional pronto para a reunião de alinhamento — e comece a criar com clareza total.', detail: 'Notificação automática · Histórico de respostas · PDF profissional em um clique' },
            ].map((s, i) => (
              <motion.div key={s.n} {...fadeV(i * 0.15)} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr', gap: 48, alignItems: 'start', padding: '56px 0', borderBottom: '1px solid rgba(247,245,240,0.08)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'rgba(247,245,240,0.25)', paddingTop: 8 }}>{s.n}</span>
                <h3 style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 400, lineHeight: 1 }}>{s.title}</h3>
                <div>
                  <p style={{ fontSize: 15, color: 'rgba(247,245,240,0.5)', lineHeight: 1.85, fontWeight: 300, marginBottom: 20 }}>{s.desc}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(75,110,245,0.7)', letterSpacing: '0.06em' }}>{s.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section style={{ padding: '140px 48px', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border)' }}>
        <GridLines />
        <AnimatedOrb delay={1} duration={11} style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,47,232,0.12) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <LiquidGlassOrb size={160} x="80%" y="5%" delay={2} />
        <TwistShape x="3%" y="15%" delay={3} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.p {...fadeV(0)} className="tag-orange" style={{ marginBottom: 24 }}>— PARA QUEM É</motion.p>
          <motion.h2 {...fadeV(0.1)} style={{ fontSize: 'clamp(44px, 5vw, 76px)', fontWeight: 400, lineHeight: 0.9, marginBottom: 80 }}>FEITO PARA QUEM<br />LEVA O DESIGN A SÉRIO.</motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {[
              { role: 'FREELANCER', pain: '"Perco horas em reuniões que não chegam a lugar nenhum."', solution: 'Com o Brieflow você manda o link antes da primeira reunião. Quando chega na call, já sabe tudo que precisa para apresentar uma proposta certeira.' },
              { role: 'ESTÚDIO DE DESIGN', pain: '"Nossa equipe recebe briefings diferentes de cada designer."', solution: 'Padronize o processo de briefing em todo o estúdio. Um template, um padrão, uma qualidade de informação consistente para todos os projetos.' },
              { role: 'AGÊNCIA', pain: '"Clientes novos não sabem comunicar o que querem."', solution: 'O questionário guia o cliente a articular sua visão. Você recebe insights que o próprio cliente não sabia que tinha — e entrega com muito mais precisão.' },
            ].map((p, i) => (
              <motion.div key={p.role} {...fadeV(i * 0.1)} style={{ padding: '48px 36px', background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: 24, transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}>
                <span className="tag-blue">{p.role}</span>
                <p style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.5, color: 'var(--text)', fontStyle: 'italic' }}>{p.pain}</p>
                <div style={{ width: 24, height: 1, background: 'var(--border-strong)' }} />
                <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, fontWeight: 300 }}>{p.solution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section style={{ padding: '140px 48px', background: 'var(--dark)', color: 'var(--white)', position: 'relative', overflow: 'hidden' }}>
        <AnimatedOrb delay={3} duration={14} style={{ position: 'absolute', top: '-10%', left: '-5%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,47,232,0.18) 0%, transparent 65%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.p {...fadeV(0)} className="tag" style={{ color: 'rgba(247,245,240,0.35)', marginBottom: 24 }}>— POR QUE BRIEFLOW</motion.p>
          <motion.h2 {...fadeV(0.1)} style={{ fontSize: 'clamp(44px, 5vw, 76px)', fontWeight: 400, lineHeight: 0.9, marginBottom: 80 }}>NÃO É SÓ UM<br />FORMULÁRIO.</motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(247,245,240,0.06)', border: '1px solid rgba(247,245,240,0.08)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {[
              { title: 'Experiência que impressiona', desc: 'O cliente não preenche um formulário. Ele passa por uma experiência cuidadosamente desenhada que o faz sentir que está trabalhando com um profissional de alto nível — antes mesmo de você começar a criar.' },
              { title: 'Perguntas que revelam o que o cliente não sabe dizer', desc: 'Desenvolvemos cada pergunta com base em anos de experiência em briefings reais. A sequência certa extrai informações que o cliente não conseguiria articular em uma reunião.' },
              { title: 'Seus dados, seu controle', desc: 'Tudo armazenado com segurança em banco de dados profissional. Acesse o histórico de qualquer projeto, a qualquer momento, de qualquer dispositivo.' },
              { title: 'Evolui com você', desc: 'Personalize as perguntas para cada cliente, crie templates por nicho, ajuste o tom. O Brieflow se adapta ao seu processo — não o contrário.' },
            ].map((d, i) => (
              <motion.div key={d.title} {...fadeV(i * 0.1)} style={{ padding: '48px 40px', borderBottom: i < 2 ? '1px solid rgba(247,245,240,0.06)' : 'none', borderRight: i % 2 === 0 ? '1px solid rgba(247,245,240,0.06)' : 'none' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)', marginBottom: 24 }} />
                <h3 style={{ fontSize: 22, fontWeight: 400, marginBottom: 16, lineHeight: 1.2 }}>{d.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(247,245,240,0.45)', lineHeight: 1.85, fontWeight: 300 }}>{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '160px 48px', position: 'relative', overflow: 'hidden' }}>
        <GridLines />
        <AnimatedOrb delay={0} duration={10} style={{ position: 'absolute', top: '-20%', right: '-10%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,47,232,0.16) 0%, transparent 65%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <AnimatedOrb delay={4} duration={13} style={{ position: 'absolute', bottom: '-15%', left: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,83,10,0.1) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <LiquidGlassOrb size={200} x="75%" y="5%" delay={1} />
        <TwistShape x="72%" y="55%" delay={2} />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 80, alignItems: 'flex-end' }}>
            <div>
              <motion.p {...fadeV(0)} className="tag-orange" style={{ marginBottom: 24 }}>— COMECE AGORA</motion.p>
              <motion.h2 {...fadeV(0.1)} style={{ fontSize: 'clamp(60px, 8vw, 130px)', fontWeight: 400, lineHeight: 0.88, marginBottom: 32 }}>SEU PRÓXIMO<br />BRIEFING VAI SER<br /><span style={{ color: 'var(--blue)' }}>DIFERENTE.</span></motion.h2>
              <motion.p {...fadeV(0.2)} style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: 480, fontWeight: 300 }}>Designers que usam o Brieflow relatam menos revisões, clientes mais satisfeitos e projetos entregues com mais confiança. Teste agora — é gratuito.</motion.p>
            </div>
            <motion.div {...fadeV(0.3)} style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 8 }}>
              <button className="btn-primary" style={{ fontSize: 14, padding: '18px 40px', whiteSpace: 'nowrap' }} onClick={() => navigate('/admin')}>Acessar o Brieflow <ArrowRight size={15} /></button>
              <button className="btn-ghost" style={{ fontSize: 14, padding: '18px 40px', whiteSpace: 'nowrap' }}>Ver demo do cliente</button>
              <p className="tag" style={{ textAlign: 'center', marginTop: 4 }}>Gratuito · Sem cartão · Começa em 2 minutos</p>
            </motion.div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, letterSpacing: '0.04em' }}>brieflow</span>
        <span className="tag" style={{ textAlign: 'center' }}>FEITO PARA DESIGNERS</span>
        <span className="tag" style={{ textAlign: 'right' }}>© 2025</span>
      </footer>
    </div>
  )
}