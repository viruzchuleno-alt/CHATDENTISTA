import { Link } from 'react-router-dom'
import { ArrowLeft, Smile } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 py-20 sm:py-28">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary lift-on-hover mb-10">
          <ArrowLeft className="h-4 w-4" /> Volver al inicio
        </Link>
        <div className="flex items-center gap-2 mb-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <Smile className="h-5 w-5 text-white" strokeWidth={2.4} />
          </span>
          <span className="font-display font-bold tracking-tight text-lg">Dra. Catalina Morales</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tighter mb-8">Política de privacidad</h1>
        <div className="space-y-6 text-muted leading-relaxed text-sm sm:text-base">
          <p>
            En la consulta de la Dra. Catalina Morales valoramos tu confianza. Esta política explica
            de forma simple qué información recopilamos cuando agendas una hora o nos escribís a
            través de este sitio, y cómo la usamos.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink pt-4">Qué información recopilamos</h2>
          <p>
            Cuando completás el formulario de contacto guardamos tu nombre, correo electrónico,
            teléfono y el mensaje que nos enviás, junto con cualquier imagen que adjuntes
            voluntariamente para que podamos evaluar tu consulta.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink pt-4">Cómo la usamos</h2>
          <p>
            Usamos tus datos exclusivamente para responder tu consulta, coordinar tu hora y dar
            seguimiento a tu tratamiento. No vendemos ni compartimos tu información con terceros
            con fines comerciales.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink pt-4">Tus derechos</h2>
          <p>
            Podés solicitar en cualquier momento que actualicemos o eliminemos tus datos
            escribiéndonos a{' '}
            <a href="mailto:contacto@clinicamorales.cl" className="text-primary font-medium">
              contacto@clinicamorales.cl
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
