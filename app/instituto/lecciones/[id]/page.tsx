'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface Leccion {
  id: string
  titulo: string
  contenido: string | null
  video_url: string | null
  orden: number
  modulo_id: string
  modulos: {
    id: string
    titulo: string
    orden: number
    curso_id: string
    cursos: { id: string; titulo: string }
    lecciones: { id: string; titulo: string; orden: number }[]
  }
  materiales: { id: string; nombre: string; archivo_url: string; tipo: string }[]
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export default function LeccionPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [leccion, setLeccion] = useState<Leccion | null>(null)
  const [completado, setCompletado] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const load = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/instituto/login'); return }

    const { data } = await supabase
      .from('lecciones')
      .select(`
        id, titulo, contenido, video_url, orden, modulo_id,
        modulos(
          id, titulo, orden, curso_id,
          cursos(id, titulo),
          lecciones(id, titulo, orden)
        ),
        materiales(id, nombre, archivo_url, tipo)
      `)
      .eq('id', id)
      .single()

    if (!data) { router.push('/instituto/cursos'); return }
    setLeccion(data as unknown as Leccion)

    const { data: prog } = await supabase
      .from('progreso')
      .select('completado')
      .eq('usuario_id', user.id)
      .eq('leccion_id', id)
      .maybeSingle()

    setCompletado(prog?.completado || false)
    setLoading(false)
  }, [id, router, supabase])

  useEffect(() => { load() }, [load])

  const toggleCompletado = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    setGuardando(true)
    const nuevoEstado = !completado
    await supabase.from('progreso').upsert({
      usuario_id: user.id,
      leccion_id: id,
      completado: nuevoEstado,
    }, { onConflict: 'usuario_id,leccion_id' })
    setCompletado(nuevoEstado)
    setGuardando(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!leccion) return null

  const modulo = leccion.modulos
  const curso = modulo?.cursos
  const lecciones = (modulo?.lecciones || []).sort((a, b) => a.orden - b.orden)
  const currentIdx = lecciones.findIndex(l => l.id === id)
  const prevLeccion = currentIdx > 0 ? lecciones[currentIdx - 1] : null
  const nextLeccion = currentIdx < lecciones.length - 1 ? lecciones[currentIdx + 1] : null
  const videoId = leccion.video_url ? getYouTubeId(leccion.video_url) : null

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-primary-700/50 mb-6 flex-wrap">
          <Link href="/instituto/cursos" className="hover:text-primary-700 transition-colors">Cursos</Link>
          <span>/</span>
          {curso && (
            <>
              <Link href={`/instituto/cursos/${curso.id}`} className="hover:text-primary-700 transition-colors">
                {curso.titulo}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-primary-900 font-medium truncate max-w-xs">{leccion.titulo}</span>
        </nav>

        <div className="bg-white rounded-2xl border border-primary-900/8 overflow-hidden">
          {/* Video */}
          {videoId && (
            <div className="aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={leccion.titulo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary-400 mb-1">
                  {modulo?.titulo}
                </p>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-primary-900">
                  {leccion.titulo}
                </h1>
              </div>
              <button
                onClick={toggleCompletado}
                disabled={guardando}
                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  completado
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100'
                }`}
              >
                {completado ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Completada
                  </>
                ) : (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-current block" />
                    Marcar completada
                  </>
                )}
              </button>
            </div>

            {/* Contenido */}
            {leccion.contenido && (
              <div
                className="prose prose-primary max-w-none text-primary-800 font-sans text-sm leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: leccion.contenido }}
              />
            )}

            {/* Materiales */}
            {leccion.materiales && leccion.materiales.length > 0 && (
              <div className="mb-8">
                <h2 className="font-display text-lg font-bold text-primary-900 mb-4">
                  Materiales de apoyo
                </h2>
                <div className="space-y-2">
                  {leccion.materiales.map((m) => (
                    <a
                      key={m.id}
                      href={m.archivo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-primary-900/10 hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group"
                    >
                      <span className="text-xl">📄</span>
                      <span className="text-sm font-medium text-primary-900 group-hover:text-primary-600 flex-1">
                        {m.nombre}
                      </span>
                      <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Navegación */}
            <div className="flex items-center justify-between pt-6 border-t border-primary-900/5">
              {prevLeccion ? (
                <Link
                  href={`/instituto/lecciones/${prevLeccion.id}`}
                  className="flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden sm:inline">Anterior: </span>
                  <span className="max-w-[160px] truncate">{prevLeccion.titulo}</span>
                </Link>
              ) : (
                <div />
              )}
              {nextLeccion ? (
                <Link
                  href={`/instituto/lecciones/${nextLeccion.id}`}
                  className="flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors"
                >
                  <span className="max-w-[160px] truncate">{nextLeccion.titulo}</span>
                  <span className="hidden sm:inline"> :Siguiente</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
