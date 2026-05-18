import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Detalle del Curso' }

interface Props { params: Promise<{ id: string }> }

export default async function CursoDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/instituto/login')

  const { data: curso } = await supabase
    .from('cursos')
    .select(`
      id, titulo, descripcion, imagen_url,
      modulos(
        id, titulo, descripcion, orden,
        lecciones(id, titulo, orden, video_url),
        evaluaciones(id, titulo)
      )
    `)
    .eq('id', id)
    .single()

  if (!curso) notFound()

  const modulos = (curso.modulos || []).sort(
    (a: { orden: number }, b: { orden: number }) => a.orden - b.orden
  )

  const todasLasLecciones = modulos.flatMap(
    (m: { lecciones: { id: string }[] }) => (m.lecciones || []).map((l: { id: string }) => l.id)
  )

  const { data: progreso } = todasLasLecciones.length > 0
    ? await supabase
        .from('progreso')
        .select('leccion_id, completado')
        .eq('usuario_id', user.id)
        .in('leccion_id', todasLasLecciones)
    : { data: [] }

  const completadasSet = new Set(
    (progreso || []).filter(p => p.completado).map(p => p.leccion_id)
  )

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <Link href="/instituto/cursos" className="text-sm text-primary-600 hover:underline">
          ← Volver a cursos
        </Link>

        {/* Header del curso */}
        <div className="mt-6 mb-10">
          {curso.imagen_url && (
            <div className="h-48 md:h-64 rounded-2xl overflow-hidden mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={curso.imagen_url} alt={curso.titulo} className="w-full h-full object-cover" />
            </div>
          )}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-3">{curso.titulo}</h1>
          {curso.descripcion && (
            <p className="text-primary-700/70 font-sans leading-relaxed">{curso.descripcion}</p>
          )}
        </div>

        {/* Módulos y lecciones */}
        <div className="space-y-6">
          {modulos.map((modulo: {
            id: string
            titulo: string
            descripcion: string | null
            lecciones: { id: string; titulo: string; orden: number; video_url: string | null }[]
            evaluaciones: { id: string; titulo: string }[]
          }, idx: number) => {
            const lecciones = (modulo.lecciones || []).sort((a, b) => a.orden - b.orden)
            const completadasEnModulo = lecciones.filter(l => completadasSet.has(l.id)).length
            return (
              <div key={modulo.id} className="bg-white rounded-2xl border border-primary-900/8 overflow-hidden">
                <div className="px-6 py-5 border-b border-primary-900/5 bg-primary-900/2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary-400 mb-1 block">
                        Módulo {idx + 1}
                      </span>
                      <h2 className="font-display text-xl font-bold text-primary-900">{modulo.titulo}</h2>
                      {modulo.descripcion && (
                        <p className="text-primary-700/50 text-sm mt-1">{modulo.descripcion}</p>
                      )}
                    </div>
                    <span className="text-xs text-primary-700/50">
                      {completadasEnModulo}/{lecciones.length} completadas
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-primary-900/5">
                  {lecciones.map((leccion, lIdx) => {
                    const completada = completadasSet.has(leccion.id)
                    return (
                      <Link
                        key={leccion.id}
                        href={`/instituto/lecciones/${leccion.id}`}
                        className="flex items-center gap-4 px-6 py-4 hover:bg-stone-50 transition-colors duration-150 group"
                      >
                        <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          completada
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-primary-900/20 text-primary-900/30 group-hover:border-primary-500'
                        }`}>
                          {completada ? (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-xs font-bold">{lIdx + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-primary-900 group-hover:text-primary-600 transition-colors">
                            {leccion.titulo}
                          </p>
                        </div>
                        {leccion.video_url && (
                          <svg className="w-4 h-4 text-primary-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm14.553 1.106A1 1 0 0016 8v4a1 1 0 00.553.894l2 1A1 1 0 0020 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                        )}
                      </Link>
                    )
                  })}
                </div>

                {modulo.evaluaciones && modulo.evaluaciones.length > 0 && (
                  <div className="px-6 py-4 border-t border-primary-900/5 bg-amber-50/50">
                    {modulo.evaluaciones.map((ev: { id: string; titulo: string }) => (
                      <Link
                        key={ev.id}
                        href={`/instituto/evaluaciones/${ev.id}`}
                        className="flex items-center gap-3 text-sm font-medium text-amber-700 hover:text-amber-800 transition-colors"
                      >
                        <span>📝</span>
                        <span>Evaluación: {ev.titulo}</span>
                        <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {modulos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-primary-700/50 font-sans">Este curso aún no tiene contenido.</p>
          </div>
        )}
      </div>
    </div>
  )
}
