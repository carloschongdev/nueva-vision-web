import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Instituto Bíblico',
  description: 'Crece en el conocimiento de la Palabra de Dios con el Instituto Bíblico Nueva Visión.',
}

export default async function InstitutoPage() {
  const supabase = createServiceClient()
  const { data: cursos } = await supabase
    .from('cursos')
    .select('id, titulo, descripcion, imagen_url')
    .eq('activo', true)
    .order('orden')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        <div className="absolute inset-0 stripe-bg opacity-30" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="eyebrow text-primary-200">Formación Bíblica</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Instituto Bíblico<br />
            <span className="text-amber-300">Nueva Visión</span>
          </h1>
          <p className="text-primary-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-sans">
            Crece en el conocimiento de la Palabra de Dios. Estudia a tu propio ritmo con cursos diseñados
            para equiparte en tu fe y ministerio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/instituto/registro" className="btn-primary bg-amber-400 hover:bg-amber-300 text-primary-900 font-bold">
              Registrarme gratis
            </Link>
            <Link href="/instituto/login" className="btn-outline border-white text-white hover:bg-white hover:text-primary-900">
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-16 px-6 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow">¿Por qué estudiar con nosotros?</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900">
              Formación con propósito eterno
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📖',
                title: 'Fundado en la Palabra',
                desc: 'Todos nuestros cursos están fundamentados en las Sagradas Escrituras para tu edificación espiritual.',
              },
              {
                icon: '⏱️',
                title: 'A tu propio ritmo',
                desc: 'Estudia cuando puedas, desde donde estés. El acceso es completo y sin límite de tiempo.',
              },
              {
                icon: '🎓',
                title: 'Certificado oficial',
                desc: 'Al completar cada curso recibes un certificado del Instituto Bíblico Nueva Visión.',
              },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-8 shadow-sm border border-primary-900/5 text-center">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-display text-xl font-bold text-primary-900 mb-3">{f.title}</h3>
                <p className="text-primary-700/70 font-sans text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cursos disponibles */}
      {cursos && cursos.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="eyebrow">Oferta académica</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900">
                Cursos disponibles
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cursos.map((curso) => (
                <div key={curso.id} className="bg-white rounded-2xl border border-primary-900/8 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
                  {curso.imagen_url ? (
                    <div className="h-40 bg-primary-100 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={curso.imagen_url} alt={curso.titulo} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-40 bg-gradient-to-br from-primary-800 to-primary-600 flex items-center justify-center">
                      <span className="text-4xl">📚</span>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-lg font-bold text-primary-900 mb-2">{curso.titulo}</h3>
                    {curso.descripcion && (
                      <p className="text-primary-700/70 text-sm font-sans leading-relaxed flex-1">{curso.descripcion}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/instituto/registro" className="btn-primary">
                Inscribirme ahora
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="py-16 px-6 bg-primary-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Comienza tu formación hoy
          </h2>
          <p className="text-primary-200 mb-8 font-sans">
            Únete a la comunidad del Instituto Bíblico Nueva Visión y transforma tu vida a través del estudio de la Palabra.
          </p>
          <Link href="/instituto/registro" className="btn-primary bg-amber-400 hover:bg-amber-300 text-primary-900 font-bold">
            Crear cuenta gratuita
          </Link>
        </div>
      </section>
    </div>
  )
}
