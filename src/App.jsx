import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Award,
  Smile,
  Sparkles,
  Brush,
  Sun,
  Activity,
  ShieldPlus,
  AlignCenter,
  Menu,
  X,
  Upload,
} from 'lucide-react'
import { createChat } from '@n8n/chat'
import '@n8n/chat/style.css'

gsap.registerPlugin(ScrollTrigger)

const CHATBOT_WEBHOOK_URL =
  'https://drake14.app.n8n.cloud/webhook/9277d8da-ab6d-48be-a725-1cf3bd81f524/chat'

const NAV_LINKS = [
  { label: 'Inicio', href: '#home' },
  { label: 'Servicios', href: '#services' },
  { label: 'Enfoque', href: '#approach' },
  { label: 'Proceso', href: '#process' },
  { label: 'Contacto', href: '#contact' },
]

const SERVICES = [
  {
    icon: Sparkles,
    title: 'Limpieza dental',
    text: 'Profilaxis profesional que elimina placa y sarro, dejando tu boca fresca y protegida.',
  },
  {
    icon: Brush,
    title: 'Resinas',
    text: 'Restauraciones estéticas que devuelven forma y color natural a tus dientes en una sola sesión.',
  },
  {
    icon: Sun,
    title: 'Blanqueamiento',
    text: 'Tratamientos de blanqueamiento seguros y graduales, pensados para tu tipo de esmalte.',
  },
  {
    icon: Activity,
    title: 'Endodoncia',
    text: 'Tratamientos de conducto realizados con tecnología de punta y mínimas molestias.',
  },
  {
    icon: ShieldPlus,
    title: 'Implantes',
    text: 'Soluciones permanentes para reemplazar piezas perdidas, con seguimiento personalizado.',
  },
  {
    icon: AlignCenter,
    title: 'Ortodoncia',
    text: 'Brackets y alineadores a medida para lograr una sonrisa pareja, a cualquier edad.',
  },
]

/* ----------------------------------------------------------------
   Navbar
---------------------------------------------------------------- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-primary/10' : 'bg-transparent'
        } rounded-full px-4 sm:px-6 py-2.5 w-[calc(100%-2rem)] max-w-5xl`}
      >
        <div className="flex items-center justify-between gap-6">
          <a href="#home" className="flex items-center gap-2 group">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <Smile className="h-5 w-5 text-white" strokeWidth={2.4} />
              <span className="absolute inset-0 rounded-full ring-2 ring-primary/30 group-hover:ring-primary/50 transition" />
            </span>
            <span
              className={`font-display font-bold tracking-tight text-lg ${
                scrolled ? 'text-ink' : 'text-white'
              } transition-colors`}
            >
              Dra. Catalina Morales
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-tight lift-on-hover ${
                  scrolled ? 'text-ink/70 hover:text-primary' : 'text-white/90 hover:text-white'
                } transition-colors`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden lg:inline-flex magnetic-btn items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/30"
          >
            Agenda tu hora
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
          </a>

          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden p-2 rounded-full ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-deep/90 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 left-0 right-0 bg-background rounded-b-5xl px-6 pt-8 pb-12 transition-transform duration-500 ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <span className="font-display font-bold text-xl text-ink">Dra. Catalina Morales</span>
            <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-divider/40" aria-label="Cerrar menú">
              <X className="h-5 w-5" strokeWidth={2.2} />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-semibold text-ink py-3 border-b border-divider"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-8 magnetic-btn flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-semibold w-full"
          >
            Agenda tu hora
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
          </a>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   Hero
---------------------------------------------------------------- */
function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 })
      gsap.from('.hero-cta, .hero-meta', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
        stagger: 0.12,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1704455306251-b4634215d98f?q=80&w=2069&auto=format&fit=crop"
          alt="Consulta dental moderna y luminosa"
          className="w-full h-full object-cover brightness-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-deep/80 via-deep/40 to-deep/70" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-deep to-transparent" />
      </div>

      <div className="absolute top-10 right-8 sm:right-16 pointer-events-none hidden sm:block">
        <Sparkles className="absolute -top-2 left-2 h-4 w-4 text-primary-light/70 animate-float" style={{ animationDelay: '0s' }} strokeWidth={2} />
        <Sparkles className="absolute top-10 left-16 h-3 w-3 text-accent/60 animate-float" style={{ animationDelay: '1.2s' }} strokeWidth={2} />
        <Sparkles className="absolute top-2 left-28 h-2.5 w-2.5 text-white/50 animate-float" style={{ animationDelay: '2.4s' }} strokeWidth={2} />
        <Sparkles className="absolute top-20 left-4 h-2 w-2 text-primary/60 animate-float" style={{ animationDelay: '3.6s' }} strokeWidth={2} />
        <Sparkles className="absolute top-16 left-36 h-3.5 w-3.5 text-primary-light/50 animate-float" style={{ animationDelay: '0.8s' }} strokeWidth={2} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-20 min-h-[100dvh] flex flex-col justify-end">
        <p className="hero-meta font-mono text-xs uppercase tracking-[0.25em] text-white/70 mb-6">
          CIRUJANA DENTISTA · PROVIDENCIA, SANTIAGO
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.95] max-w-5xl">
          <span className="hero-line-1 block">Sonrisas sanas,</span>
          <span className="hero-line-2 block font-serif italic font-medium text-primary">cuidadas con calidez</span>
        </h1>
        <p className="hero-meta mt-8 max-w-xl text-white/70 text-base sm:text-lg leading-relaxed">
          En pleno corazón de Providencia, la Dra. Catalina Morales combina técnica de excelencia con un trato cercano,
          para que cada visita —desde una limpieza de rutina hasta un tratamiento más complejo— se sienta tranquila y
          en buenas manos.
        </p>
        <div className="hero-cta mt-10 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-primary/30"
          >
            Agenda tu hora
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
          </a>
          <a
            href="tel:+56965432187"
            className="magnetic-btn inline-flex items-center gap-2 glass-dark text-white px-6 py-3 rounded-full font-semibold border border-white/15"
          >
            <Phone className="h-4 w-4" strokeWidth={2.4} />
            +56 9 6543 2187
          </a>
        </div>

        <div className="absolute bottom-8 right-6 sm:right-12 hidden md:flex flex-col items-center gap-2 text-white/50">
          <span className="font-mono uppercase text-[10px] tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Feature Card 1 — Treatment Shuffler
---------------------------------------------------------------- */
function TreatmentShuffler() {
  const items = [
    { tag: 'Limpieza dental', label: 'Profilaxis profesional y prevención', icon: Sparkles },
    { tag: 'Blanqueamiento', label: 'Tratamientos seguros y graduales', icon: Sun },
    { tag: 'Ortodoncia', label: 'Brackets y alineadores a tu medida', icon: AlignCenter },
  ]
  const [stack, setStack] = useState(items)

  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-44 w-full">
      {stack.map((item, i) => {
        const offset = i
        const total = stack.length
        const Icon = item.icon
        return (
          <div
            key={item.tag}
            style={{
              transform: `translate(${offset * 14}px, ${offset * 14}px) scale(${1 - offset * 0.05})`,
              zIndex: total - offset,
              opacity: 1 - offset * 0.25,
              transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease',
            }}
            className="absolute inset-0 bg-white border border-divider rounded-3xl p-5 shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-1 rounded-full">
                {item.tag}
              </span>
              <Icon className="h-4 w-4 text-primary" strokeWidth={2.2} />
            </div>
            <div className="mt-4 font-display text-lg font-semibold text-ink leading-tight">
              {item.label}
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {Array.from({ length: 24 }).map((_, idx) => (
                <span
                  key={idx}
                  className="h-1 w-1 rounded-full"
                  style={{ background: idx < 24 - offset * 6 ? '#85c4eb' : '#E0E0E0' }}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 2 — SmileSparkle (signature animation)
---------------------------------------------------------------- */
function SmileSparkle() {
  const [statusIdx, setStatusIdx] = useState(0)
  const [count, setCount] = useState(7)

  const statuses = [
    { text: 'Sonrisa sana', tone: 'emerald' },
    { text: 'Revisión en curso', tone: 'primary' },
    { text: 'Puliendo', tone: 'accent' },
    { text: 'Reluciente', tone: 'emerald' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((idx) => {
        const next = (idx + 1) % statuses.length
        if (statuses[next].text === 'Reluciente') {
          setCount((c) => c + 1)
        }
        return next
      })
    }, 2300)
    return () => clearInterval(interval)
  }, [])

  const sparkles = [
    { left: '15%', delay: '0.0s', dur: '2.6s', size: 14 },
    { left: '25%', delay: '1.3s', dur: '3.0s', size: 11 },
    { left: '38%', delay: '0.6s', dur: '2.8s', size: 16 },
    { left: '50%', delay: '1.8s', dur: '2.4s', size: 12 },
    { left: '62%', delay: '0.9s', dur: '3.1s', size: 15 },
    { left: '74%', delay: '2.0s', dur: '2.7s', size: 11 },
    { left: '85%', delay: '0.4s', dur: '2.9s', size: 14 },
  ]

  const ripples = [
    { left: '22%', delay: '0.2s' },
    { left: '48%', delay: '1.0s' },
    { left: '76%', delay: '1.8s' },
  ]

  const status = statuses[statusIdx]
  const toneText =
    status.tone === 'emerald' ? 'text-emerald-600' :
    status.tone === 'accent' ? 'text-accent-dark' :
    'text-primary-dark'
  const toneDot =
    status.tone === 'emerald' ? 'bg-emerald-500' :
    status.tone === 'accent' ? 'bg-accent' :
    'bg-primary'

  return (
    <div
      className="relative h-44 w-full rounded-3xl overflow-hidden border border-primary/15"
      style={{ background: 'linear-gradient(180deg, #EAF6FB 0%, #D2EAF5 70%, #BFE0F0 100%)' }}
    >
      <div className="absolute -top-8 -left-6 h-20 w-32 rounded-full bg-white/60 blur-2xl" />
      <div className="absolute top-2 right-10 h-14 w-24 rounded-full bg-white/50 blur-xl" />
      <div className="absolute bottom-2 left-1/3 h-12 w-20 rounded-full bg-white/40 blur-xl" />

      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-primary-dark" strokeWidth={2.2} />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-dark">
            EN LA CONSULTA AHORA
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display font-bold text-sm text-ink tabular-nums">
            {String(count).padStart(2, '0')}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted">hoy</span>
        </div>
      </div>

      <svg className="absolute left-1/2 -translate-x-1/2 top-7 h-8 w-8" viewBox="0 0 24 28" fill="none">
        <path
          d="M12 1.5c-2.6 0-4.6 1.4-5.6 2.7-.7.9-1.1 2-1.3 3-.2 1.1-.1 2.4.2 3.7.5 2.1 1.3 4.6 1.7 6.6.3 1.4.5 2.6 1 3.4.4.7 1 1.1 1.7 1.1.6 0 1-.5 1.3-1.4.3-.9.4-2.1.5-3.3.1-1.1.2-2.1.5-2.6.3-.5.6-.5.9 0 .3.5.4 1.5.5 2.6.1 1.2.2 2.4.5 3.3.3.9.7 1.4 1.3 1.4.7 0 1.3-.4 1.7-1.1.5-.8.7-2 1-3.4.4-2 1.2-4.5 1.7-6.6.3-1.3.4-2.6.2-3.7-.2-1-.6-2.1-1.3-3-1-1.3-3-2.7-5.5-2.7Z"
          fill="white"
          stroke="#b3d9f2"
          strokeWidth="1.2"
        />
      </svg>

      <div className="absolute inset-x-0 top-16 bottom-11 overflow-hidden">
        {sparkles.map((s, i) => (
          <svg
            key={i}
            className="absolute top-0"
            style={{
              left: s.left,
              width: `${s.size}px`,
              height: `${Math.round(s.size * 1.5)}px`,
              animation: `rain-fall ${s.dur} cubic-bezier(0.55,0.05,0.7,0.45) ${s.delay} infinite`,
              filter: 'drop-shadow(0 1px 2px rgba(95,169,214,0.3))',
              transform: 'translateX(-50%)',
            }}
            viewBox="0 0 24 36"
          >
            <defs>
              <linearGradient id={`spark-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#b3d9f2" />
                <stop offset="50%" stopColor="#85c4eb" />
                <stop offset="100%" stopColor="#5fa9d6" />
              </linearGradient>
            </defs>
            <path
              d="M12 2 L14 9 L21 11 L14 13 L12 20 L10 13 L3 11 L10 9 Z"
              fill={`url(#spark-${i})`}
            />
            <circle cx="12" cy="11" r="1.6" fill="white" fillOpacity="0.65" />
          </svg>
        ))}
      </div>

      <svg className="absolute bottom-9 left-3 right-3 h-4" viewBox="0 0 200 16" preserveAspectRatio="none">
        <path
          d="M 4,4 Q 100,16 196,4"
          fill="none"
          stroke="#5fa9d6"
          strokeOpacity="0.45"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M 4,7 Q 100,18 196,7"
          fill="none"
          stroke="#85c4eb"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute bottom-[34px] left-3 right-3 h-2">
        {ripples.map((r, i) => (
          <span
            key={i}
            className="absolute top-0 -translate-x-1/2 rounded-full border border-primary-dark/40"
            style={{
              left: r.left,
              width: '4px',
              height: '4px',
              animation: `rain-ripple 2.4s ease-out ${r.delay} infinite`,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`relative h-2 w-2 rounded-full ${toneDot}`}>
            {status.tone === 'accent' && (
              <span className={`absolute inset-0 rounded-full ${toneDot} animate-ping`} />
            )}
          </span>
          <span
            key={status.text}
            className={`font-mono text-[10px] truncate ${toneText}`}
            style={{ animation: 'rain-fadein 0.35s ease-out' }}
          >
            {status.text}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes rain-fall {
          0%   { transform: translate(-50%, -10px); opacity: 0; }
          12%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(-50%, 95px); opacity: 0; }
        }
        @keyframes rain-ripple {
          0%   { transform: translateX(-50%) scale(0.4); opacity: 0.9; }
          80%  { transform: translateX(-50%) scale(3.5); opacity: 0; }
          100% { transform: translateX(-50%) scale(3.5); opacity: 0; }
        }
        @keyframes rain-fadein {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 3 — Cursor + scheduler
---------------------------------------------------------------- */
function BookingScheduler() {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  const [step, setStep] = useState(0)
  const activeDay = 2

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 5)
    }, 1400)
    return () => clearInterval(interval)
  }, [])

  const cursorPos = (() => {
    switch (step) {
      case 0:
        return { x: 8, y: 110, opacity: 0 }
      case 1:
        return { x: 60, y: 60, opacity: 1 }
      case 2:
        return { x: 60 + activeDay * 36, y: 60, opacity: 1 }
      case 3:
        return { x: 60 + activeDay * 36, y: 60, opacity: 1 }
      case 4:
        return { x: 130, y: 130, opacity: 1 }
      default:
        return { x: 8, y: 110, opacity: 0 }
    }
  })()

  return (
    <div className="relative h-44 w-full bg-white border border-divider rounded-3xl p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          Semana 24 · Junio
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-0.5 rounded-full">
          Reserva
        </span>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((d, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center h-9 rounded-xl text-xs font-medium transition-all duration-300 ${
              step >= 3 && idx === activeDay
                ? 'bg-primary text-deep scale-110 shadow-lg shadow-primary/30'
                : 'bg-background text-ink'
            }`}
          >
            <span className="font-mono text-[9px] text-muted">{d}</span>
            <span className="font-display font-semibold text-sm">{idx + 9}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full py-2.5 rounded-2xl font-medium text-xs transition-all duration-300 ${
          step === 4
            ? 'bg-accent text-white scale-[1.02] shadow-md shadow-accent/30'
            : 'bg-divider/40 text-muted'
        }`}
      >
        {step >= 3 ? '✓ Hora confirmada' : 'Elige un día'}
      </button>

      <div
        className="absolute pointer-events-none transition-all duration-500 ease-out"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          opacity: cursorPos.opacity,
          transform: step === 3 ? 'scale(0.85)' : 'scale(1)',
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 3L19 12L12 13L9 20L5 3Z"
            fill="#1A1A1A"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Features Section
---------------------------------------------------------------- */
function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const cards = [
    {
      eyebrow: 'TRATAMIENTOS DESTACADOS',
      heading: 'Atención integral para toda la familia',
      text: 'Desde la prevención hasta tratamientos más complejos, acompañamos a cada paciente —niños, adultos y adultos mayores— con un plan pensado para su realidad.',
      bullets: ['Limpieza y prevención periódica', 'Estética dental y blanqueamiento', 'Ortodoncia para todas las edades'],
      Component: TreatmentShuffler,
    },
    {
      eyebrow: 'EN LA CONSULTA',
      heading: 'Cada sesión, cuidada al detalle',
      text: 'Trabajamos con técnica moderna y atención al detalle en cada paso, para que sientas que tu sonrisa está en manos expertas y cercanas.',
      bullets: ['Tecnología y materiales actuales', 'Protocolos de bioseguridad estrictos', 'Explicaciones claras en cada etapa'],
      Component: SmileSparkle,
    },
    {
      eyebrow: 'RESERVA EN SEGUNDOS',
      heading: 'Agenda tu hora cuando te acomode',
      text: 'Coordina tu visita en pocos clics, elige el día que más te acomode y recibe la confirmación al instante, sin vueltas ni esperas.',
      bullets: ['Agenda online disponible 24/7', 'Confirmación y recordatorios', 'Cambios de hora sin complicaciones'],
      Component: BookingScheduler,
    },
  ]

  return (
    <section id="services" ref={sectionRef} className="relative py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-16 sm:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
            ╱ Lo que hacemos por tu sonrisa
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-ink mt-4 leading-[1.05] tracking-tighter">
            Cuidado dental,
            <span className="block font-serif italic font-medium text-primary-dark mt-1">
              pensado para ti.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="feature-card group relative bg-surface border border-divider rounded-3xl p-6 sm:p-8 hover:border-primary/40 transition-colors duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="mb-6">
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-primary-dark">
                  {card.eyebrow}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-ink mt-2 leading-tight">
                  {card.heading}
                </h3>
              </div>

              <card.Component />

              <div className="mt-6">
                <p className="text-muted text-[15px] leading-relaxed">{card.text}</p>
                <ul className="mt-4 space-y-1.5">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   CountUp
---------------------------------------------------------------- */
function CountUp({ end, suffix = '', duration = 2000 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTs = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - startTs) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setValue(Math.round(end * eased))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end, duration])

  return <span ref={ref} className="tabular-nums">{value}{suffix}</span>
}

/* ----------------------------------------------------------------
   Pillars
---------------------------------------------------------------- */
function Pillars() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const pillars = [
    {
      n: '01',
      eyebrow: 'AÑOS DE TRAYECTORIA',
      target: 12,
      suffix: '+',
      desc: 'Más de una década formando sonrisas sanas en Providencia, con foco en la salud bucal de cada paciente.',
    },
    {
      n: '02',
      eyebrow: 'PACIENTES ATENDIDOS',
      target: 4500,
      suffix: '+',
      desc: 'Familias completas que confían su sonrisa —y la de los suyos— a la Dra. Morales, año tras año.',
    },
    {
      n: '03',
      eyebrow: 'SATISFACCIÓN',
      target: 98,
      suffix: '%',
      desc: 'De nuestros pacientes recomienda la clínica a familiares y amigos después de su primera visita.',
    },
  ]

  return (
    <section id="approach" ref={ref} className="relative py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[44rem] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24 transition-all duration-1000 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="max-w-2xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-primary-dark mb-5">
              ╱ Nuestro enfoque
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-ink leading-[1.05] tracking-tighter">
              Los números
              <span className="block font-serif italic font-medium text-primary-dark">detrás de la confianza.</span>
            </h2>
          </div>
          <p className="text-muted text-lg leading-relaxed max-w-md lg:text-right">
            Tres cifras que reflejan cómo trabajamos cada día — no marketing, simplemente lo que entregamos en cada visita.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x divide-divider rounded-3xl overflow-hidden border border-divider shadow-xl shadow-primary/5 bg-surface">
          {pillars.map((p, i) => (
            <article
              key={i}
              style={{ transitionDelay: visible ? `${i * 150}ms` : '0ms' }}
              className={`relative p-9 sm:p-12 group overflow-hidden transition-all duration-1000 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  {p.n} / {p.eyebrow}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
              </div>

              <div className="flex items-end gap-1 leading-none">
                <span className="font-display font-extrabold text-[4.5rem] sm:text-[6rem] lg:text-[6.5rem] leading-[0.85] text-ink tabular-nums tracking-tight">
                  <CountUp end={p.target} suffix="" duration={1800 + i * 200} />
                </span>
                <span className="font-serif italic font-medium text-3xl sm:text-4xl text-primary-dark mb-3">
                  {p.suffix}
                </span>
              </div>

              <p className="text-muted text-[15px] mt-6 leading-relaxed max-w-xs">{p.desc}</p>

              <div className="mt-8 h-px bg-divider overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                  style={{ animation: `pillar-sweep 4s ease-in-out ${i * 0.4}s infinite` }}
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pillar-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}

/* ----------------------------------------------------------------
   Protocol — Sticky Stacking Cards
---------------------------------------------------------------- */
function Protocol() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top top+=100',
            endTrigger: cards[cards.length - 1],
            end: 'top top+=120',
            scrub: 1,
          },
          scale: 0.92,
          filter: 'blur(6px) saturate(0.7)',
          opacity: 0.5,
          ease: 'none',
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const steps = [
    {
      num: '01',
      title: 'Evaluación y diagnóstico',
      text: 'Empezamos con una revisión clínica completa y, si es necesario, radiografías digitales — para entender tu situación bucal sin apuros ni sorpresas.',
      bullets: ['Revisión clínica detallada', 'Radiografías digitales cuando se requieren', 'Conversación honesta sobre tus opciones'],
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop',
      alt: 'Evaluación dental con tecnología digital',
      meta: 'Paso 1 / Diagnóstico',
    },
    {
      num: '02',
      title: 'Un plan de tratamiento a tu medida',
      text: 'Diseñamos contigo un plan claro, con tiempos, costos y alternativas explicadas en detalle, para que decidas con total tranquilidad.',
      bullets: ['Presupuesto detallado, sin letra chica', 'Alternativas de tratamiento explicadas', 'Tiempos estimados realistas'],
      image: 'https://images.unsplash.com/photo-1770321119305-f191c09c5801?q=80&w=1600&auto=format&fit=crop',
      alt: 'Plan de tratamiento dental conversado con la paciente',
      meta: 'Paso 2 / Plan',
    },
    {
      num: '03',
      title: 'Tratamiento y seguimiento',
      text: 'Ejecutamos cada procedimiento con tecnología moderna y protocolos de bioseguridad estrictos, y te acompañamos hasta ver el resultado final.',
      bullets: ['Tecnología y materiales de calidad', 'Protocolos de esterilización certificados', 'Controles de seguimiento incluidos'],
      image: 'https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?q=80&w=1600&auto=format&fit=crop',
      alt: 'Tratamiento dental y seguimiento clínico',
      meta: 'Paso 3 / Seguimiento',
    },
  ]

  return (
    <section id="process" ref={containerRef} className="relative px-4 sm:px-6 py-20">
      <div className="max-w-7xl mx-auto mb-16 px-2 sm:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
          ╱ Cómo trabajamos
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-ink mt-4 leading-[1.05] tracking-tighter max-w-3xl">
          Tres pasos.
          <span className="block font-serif italic font-medium text-primary-dark">
            Sin sorpresas en el camino.
          </span>
        </h2>
      </div>

      <div className="space-y-8">
        {steps.map((step, idx) => (
          <article
            key={idx}
            className="protocol-card sticky top-24 sm:top-28 mx-auto max-w-6xl bg-gradient-to-br from-surface to-background border border-divider rounded-3xl overflow-hidden shadow-2xl shadow-primary/5"
          >
            <div className="grid lg:grid-cols-5 gap-0 min-h-[60vh] lg:min-h-[70vh]">
              <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
                    {step.meta}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">
                    Protocolo Morales
                  </span>
                </div>

                <div className="my-12">
                  <span className="font-display font-extrabold text-[5rem] sm:text-[7rem] lg:text-[8rem] leading-none text-primary/15 -mb-4 block">
                    {step.num}
                  </span>
                  <h3 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-ink leading-[1.05] tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted text-base sm:text-lg leading-relaxed max-w-lg mt-5">
                    {step.text}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {step.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-muted">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-2 relative overflow-hidden min-h-[300px] lg:min-h-full bg-deep">
                <img
                  src={step.image}
                  alt={step.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-deep/15" />
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full pl-3 pr-4 py-1.5 shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink">
                    Paso {step.num}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-white/70">
                  {step.num} / Dra. Catalina Morales
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   ServicesGrid
---------------------------------------------------------------- */
function ServicesGrid() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.06,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">╱ Todo lo que hacemos</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl mt-4 leading-[1.05] tracking-tighter">
              Servicios pensados
              <span className="block font-serif italic font-medium text-primary">
                para tu sonrisa.
              </span>
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-base leading-relaxed">
            Atendemos a toda la familia, con tratamientos para cada etapa y necesidad — siempre con calidez y técnica de excelencia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon
            return (
              <div
                key={i}
                className="svc-tile group bg-deep p-8 sm:p-10 hover:bg-white/[0.03] transition-colors duration-500 relative"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <Icon className="h-5 w-5 text-primary group-hover:text-deep" strokeWidth={2.2} />
                  </div>
                  <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-xl mb-3">{svc.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{svc.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Trust Signals
---------------------------------------------------------------- */
function TrustSignals() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const badges = [
    {
      Icon: Award,
      title: 'Cirujana Dentista titulada',
      text: 'Formación en la Universidad de Chile, con perfeccionamiento continuo en odontología restaurativa y estética.',
    },
    {
      Icon: ShieldCheck,
      title: 'Bioseguridad rigurosa',
      text: 'Instrumental esterilizado y protocolos de higiene auditados en cada sesión, sin excepciones.',
    },
    {
      Icon: Clock,
      title: 'Más de 12 años de trayectoria',
      text: 'Atendiendo a familias completas en Providencia desde 2014, con horarios pensados para tu rutina.',
    },
  ]

  return (
    <section ref={ref} className="relative py-24 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
            ╱ Por qué confiar en nosotros
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-ink mt-3 tracking-tighter">
            Más que una consulta.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {badges.map(({ Icon, title, text }, i) => (
            <div
              key={i}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
              className={`bg-white border border-divider rounded-2xl p-6 hover:border-primary/40 lift-on-hover transition-all duration-700 ease-out shadow-sm ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <Icon className="h-6 w-6 text-primary mb-3" strokeWidth={2.2} />
              <h3 className="font-display font-bold text-lg text-ink mb-1.5">{title}</h3>
              <p className="text-muted text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Field
---------------------------------------------------------------- */
function Field({ label, type = 'text', required, value, onChange }) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition font-body"
      />
    </div>
  )
}

/* ----------------------------------------------------------------
   ContactForm
---------------------------------------------------------------- */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', zip: '', message: '' })
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle')
  const dropRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1200)
  }

  const handleFiles = (newFiles) => {
    const list = [...newFiles].filter((f) => f.type.startsWith('image/'))
    setFiles((prev) => [...prev, ...list].slice(0, 5))
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">
              ╱ Contacto
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-ink mt-4 leading-[1.05] tracking-tighter">
              Escríbenos y
              <span className="block font-serif italic font-medium text-primary-dark">
                coordinamos tu hora
              </span>
            </h2>
            <p className="text-muted text-lg mt-6 leading-relaxed max-w-md">
              Completa el formulario o contáctanos directamente — te respondemos dentro de nuestro horario de atención.
            </p>

            <div className="mt-10 space-y-4">
              <a href="tel:+56965432187" className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Phone className="h-5 w-5 text-primary group-hover:text-white" strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Llámanos</span>
                  <span className="font-display font-semibold text-ink text-lg">+56 9 6543 2187</span>
                </span>
              </a>

              <a href="mailto:contacto@clinicamorales.cl" className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Mail className="h-5 w-5 text-primary group-hover:text-white" strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Escríbenos</span>
                  <span className="font-display font-semibold text-ink text-lg">contacto@clinicamorales.cl</span>
                </span>
              </a>

              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Visítanos</span>
                  <span className="font-display font-semibold text-ink text-lg">Providencia 2155, Of. 702, Providencia, Santiago</span>
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Horario de atención</span>
                  <span className="font-display font-semibold text-ink text-base sm:text-lg">
                    Lun–Jue: 09:00–19:00 · Vie: 09:00–18:00 · Sáb: 09:00–14:00 · Dom: Cerrado
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-3xl bg-primary/5 border border-primary/15">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary-dark mb-2">
                Privacidad de tus datos
              </p>
              <p className="text-sm text-muted leading-relaxed">
                Tu información se usa solo para coordinar tu atención. Nunca la compartimos con terceros.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-surface border border-divider rounded-3xl p-6 sm:p-10 shadow-xl shadow-primary/5"
            >
              {status !== 'sent' ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Nombre" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                    <Field label="Correo electrónico" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <Field label="Teléfono" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                    <Field label="Comuna" value={form.zip} onChange={(v) => setForm({ ...form, zip: v })} />
                  </div>

                  <div className="mt-5">
                    <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
                      Cuéntanos qué necesitas *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      placeholder="Cuéntanos brevemente qué necesitas o qué te gustaría agendar..."
                      className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition resize-none font-body"
                    />
                  </div>

                  <div
                    ref={dropRef}
                    onDragOver={(e) => {
                      e.preventDefault()
                      dropRef.current?.classList.add('!border-primary', '!bg-primary/5')
                    }}
                    onDragLeave={() => {
                      dropRef.current?.classList.remove('!border-primary', '!bg-primary/5')
                    }}
                    onDrop={(e) => {
                      e.preventDefault()
                      dropRef.current?.classList.remove('!border-primary', '!bg-primary/5')
                      handleFiles(e.dataTransfer.files)
                    }}
                    className="mt-5 border-2 border-dashed border-divider rounded-3xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <input
                      type="file"
                      multiple
                      id="file-up"
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                      accept="image/*"
                    />
                    <label htmlFor="file-up" className="cursor-pointer block">
                      <Upload className="h-6 w-6 mx-auto text-primary-dark mb-2" strokeWidth={2.2} />
                      <p className="font-display font-semibold text-ink text-sm">
                        Adjunta una foto o radiografía si lo necesitas (opcional)
                      </p>
                      <p className="text-xs text-muted mt-1">
                        Haz clic o arrastra tus archivos aquí (máximo 5 imágenes)
                      </p>
                      {files.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                          {files.map((f, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1.5 bg-primary/10 text-primary-dark text-xs px-3 py-1.5 rounded-full font-mono"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              {f.name.length > 22 ? f.name.slice(0, 22) + '…' : f.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-xs text-muted">
                      Te contactaremos a la brevedad. Los campos marcados con * son obligatorios.
                    </p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30 disabled:opacity-50"
                    >
                      {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                      <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-primary-dark" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-ink mb-3">
                    ¡Listo!
                  </h3>
                  <p className="text-muted max-w-md mx-auto">
                    Recibimos tu mensaje y te contactaremos a la brevedad para coordinar tu hora.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Footer
---------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="relative bg-deep text-white rounded-t-3xl mt-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/20 blur-3xl" />

      <div className="relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-12 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
              <Smile className="h-5 w-5 text-white" strokeWidth={2.4} />
            </span>
            <span className="font-display font-bold text-lg">Dra. Catalina Morales</span>
          </div>
          <h2 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl font-medium text-white/85 max-w-2xl leading-snug">
            Sonrisas sanas, cuidadas con calidez, en el corazón de Providencia.
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
                Agenda abierta
              </span>
            </div>
            <a
              href="#contact"
              className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full self-start sm:self-auto"
            >
              Agenda tu hora
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Cirujana Dentista en Providencia, combinando técnica de excelencia con un trato cercano para que cada visita se sienta tranquila y en buenas manos.
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Servicios</p>
            <ul className="space-y-2.5">
              {SERVICES.map((s, i) => (
                <li key={i}>
                  <a href="#services" className="text-white/65 hover:text-primary transition text-sm">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Empresa</p>
            <ul className="space-y-2.5">
              <li><a href="#approach" className="text-white/65 hover:text-primary transition text-sm">Enfoque</a></li>
              <li><a href="#process" className="text-white/65 hover:text-primary transition text-sm">Proceso</a></li>
              <li><a href="#contact" className="text-white/65 hover:text-primary transition text-sm">Contacto</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Contacto</p>
            <ul className="space-y-2.5">
              <li>
                <a href="tel:+56965432187" className="text-white/65 hover:text-primary transition text-sm">
                  +56 9 6543 2187
                </a>
              </li>
              <li>
                <a href="mailto:contacto@clinicamorales.cl" className="text-white/65 hover:text-primary transition text-sm">
                  contacto@clinicamorales.cl
                </a>
              </li>
              <li className="text-white/65 text-sm">Providencia 2155, Of. 702, Providencia, Santiago</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <span className="text-white/50 text-xs font-mono">
            © 2026 Dra. Catalina Morales — Cirujana Dentista. Todos los derechos reservados.
          </span>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/50 text-xs font-mono">
            <Link to="/privacy" className="hover:text-primary transition">Privacidad</Link>
            <Link to="/terms" className="hover:text-primary transition">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------
   ChatbotWidget — asistente virtual conectado a n8n
---------------------------------------------------------------- */
function ChatbotWidget() {
  useEffect(() => {
    const chat = createChat({
      webhookUrl: CHATBOT_WEBHOOK_URL,
      mode: 'window',
      showWelcomeScreen: true,
      initialMessages: [
        '¡Hola! 👋',
        'Soy el asistente virtual de la Dra. Catalina Morales. ¿En qué puedo ayudarte? Puedo orientarte sobre nuestros servicios, horarios o ayudarte a agendar tu hora.',
      ],
      i18n: {
        en: {
          title: 'Asistente Dra. Catalina Morales',
          subtitle: 'Resolvemos tus dudas y te ayudamos a agendar tu hora, las 24 horas.',
          footer: '',
          getStarted: 'Iniciar conversación',
          inputPlaceholder: 'Escribe tu consulta…',
          closeButtonTooltip: 'Cerrar chat',
        },
      },
    })

    return () => chat.unmount()
  }, [])

  return null
}

/* ----------------------------------------------------------------
   App
---------------------------------------------------------------- */
export default function App() {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pillars />
        <Protocol />
        <ServicesGrid />
        <TrustSignals />
        <ContactForm />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  )
}
