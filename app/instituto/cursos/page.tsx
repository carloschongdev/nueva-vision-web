import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Cursos' }

export default async function CursosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/instituto/login')

  const { data: cursos } = await supabase
    .from('cursos')
    .select(`
      id, titulo, descripcion, imagen_url,
      modulos(id, lecciones(id))
    `)
    .eq('activo', true)
    .order('orden')

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10">
          <Link href="/instituto/dashboard" className="text-sm text-primary-600 hover:underline">
            ← Volver al dashboard
          </Link>
          <div className="mt-4">
            <p className="eyebrow">Formación Bíblica</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-900">Todos los cursos</h1>
          </div>
        </div>

        {cursos && cursos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cursos.map((curso) => {
              const totalModulos = curso.modulos?.length || 0
              const totalLecciones = (curso.modulos || []).reduce(
                (acc: number, m: { lecciones: { id: string }[] }) => acc + (m.lecciones?.length || 0), 0
              )
              return (
                <div key={curso.id} className="bg-white rounded-2xl border border-primary-900/8 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
                  {curso.imagen_url ? (
                    <div className="h-44 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={curso.imagen_url} alt={curso.titulo} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-44 bg-gradient-to-br from-primary-800 to-primary-600 flex items-center justify-center">
                      <span className="text-5xl">📚</span>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-display text-lg font-bold text-primary-900 mb-2">{curso.titulo}</h2>
                    {curso.descripcion && (
                      <p className="text-primary-700/60 text-sm font-sans leading-relaxed mb-4 flex-1">
                        {curso.descripcion}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-primary-700/50 mb-5">
                      <span>{totalModulos} módulo{totalModulos !== 1 ? 's' : ''}</span>
                      <span>·</span>
                      <span>{totalLecciones} lección{totalLecciones !== 1 ? 'es' : ''}</span>
                    </div>
                    <Link
                      href={`/instituto/cursos/${curso.id}`}
                      className="btn-primary text-sm py-2.5 px-5 justify-center"
                    >
                      Ver curso
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">📚</p>
            <p className="text-primary-700/50 font-sans">No hay cursos disponibles aún.</p>
          </div>
        )}
      </div>
    </div>
  )
}
