import { Link } from 'react-router-dom'
import { ArrowLeft, Smile } from 'lucide-react'

export default function Terms() {
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
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tighter mb-8">Términos y condiciones</h1>
        <div className="space-y-6 text-muted leading-relaxed text-sm sm:text-base">
          <p>
            Al agendar una hora o utilizar este sitio web aceptás las siguientes condiciones de
            la consulta odontológica de la Dra. Catalina Morales, ubicada en Providencia 2155,
            Of. 702, Providencia, Santiago.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink pt-4">Reservas y horarios</h2>
          <p>
            Las horas se confirman por correo o teléfono dentro de nuestro horario de atención
            (lunes a jueves de 09:00 a 19:00, viernes de 09:00 a 18:00 y sábados de 09:00 a 14:00).
            Te pedimos avisar con al menos 24 horas de anticipación si necesitás reagendar.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink pt-4">Información del sitio</h2>
          <p>
            El contenido de este sitio tiene fines informativos y no reemplaza una evaluación
            clínica presencial. Cada plan de tratamiento se define en consulta directa con la
            Dra. Morales según el caso de cada paciente.
          </p>
          <h2 className="font-display text-xl font-semibold text-ink pt-4">Contacto</h2>
          <p>
            Ante cualquier duda sobre estos términos podés escribirnos a{' '}
            <a href="mailto:contacto@clinicamorales.cl" className="text-primary font-medium">
              contacto@clinicamorales.cl
            </a>{' '}
            o llamarnos al{' '}
            <a href="tel:+56965432187" className="text-primary font-medium">
              +56 9 6543 2187
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
