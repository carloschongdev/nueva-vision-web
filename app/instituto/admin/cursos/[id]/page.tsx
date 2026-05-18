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
}

interface Evaluacion {
  id: string
  titulo: string
  puntaje_minimo: number
}

interface Modulo {
  id: string
  titulo: string
  descripcion: string | null
  orden: number
  lecciones: Leccion[]
  evaluaciones: Evaluacion[]
}

interface Curso {
  id: string
  titulo: string
  descripcion: string | null
  imagen_url: string | null
  activo: boolean
  orden: number
  modulos: Modulo[]
}

export default function AdminCursoEditPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [curso, setCurso] = useState<Curso | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [cursoForm, setCursoForm] = useState({ titulo: '', descripcion: '', imagen_url: '', activo: true, orden: 0 })
  const [newModulo, setNewModulo] = useState({ titulo: '', descripcion: '', orden: 0 })
  const [addingModulo, setAddingModulo] = useState(false)
  const [newLeccion, setNewLeccion] = useState<Record<string, { titulo: string; video_url: string; contenido: string; orden: number }>>({})
  const [addingLeccion, setAddingLeccion] = useState<string | null>(null)
  const supabase = createClient()

  const load = useCallback(async () => {
    const { data } = await supabase
      .from('cursos')
      .select(`
        id, titulo, descripcion, imagen_url, activo, orden,
        modulos(
          id, titulo, descripcion, orden,
          lecciones(id, titulo, contenido, video_url, orden),
          evaluaciones(id, titulo, puntaje_minimo)
        )
      `)
      .eq('id', id)
      .single()

    if (!data) { router.push('/instituto/admin/cursos'); return }
    setCurso(data as unknown as Curso)
    setCursoForm({
      titulo: data.titulo,
      descripcion: data.descripcion || '',
      imagen_url: data.imagen_url || '',
      activo: data.activo,
      orden: data.orden,
    })
    setLoading(false)
  }, [id, router, supabase])

  useEffect(() => { load() }, [load])

  const saveCurso = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await supabase.from('cursos').update(cursoForm).eq('id', id)
    await load()
    setSaving(false)
  }

  const addModulo = async (e: React.FormEvent) => {
    e.preventDefault()
    await supabase.from('modulos').insert({ ...newModulo, curso_id: id })
    setNewModulo({ titulo: '', descripcion: '', orden: 0 })
    setAddingModulo(false)
    await load()
  }

  const deleteModulo = async (moduloId: string) => {
    if (!confirm('¿Eliminar este módulo y todas sus lecciones?')) return
    await supabase.from('modulos').delete().eq('id', moduloId)
    await load()
  }

  const addLeccion = async (e: React.FormEvent, moduloId: string) => {
    e.preventDefault()
    const l = newLeccion[moduloId]
    if (!l) return
    await supabase.from('lecciones').insert({ ...l, modulo_id: moduloId })
    setNewLeccion(prev => ({ ...prev, [moduloId]: { titulo: '', video_url: '', contenido: '', orden: 0 } }))
    setAddingLeccion(null)
    await load()
  }

  const deleteLeccion = async (leccionId: string) => {
    if (!confirm('¿Eliminar esta lección?')) return
    await supabase.from('lecciones').delete().eq('id', leccionId)
    await load()
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!curso) return null

  const modulos = (curso.modulos || []).sort((a, b) => a.orden - b.orden)

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <Link href="/instituto/admin/cursos" className="text-sm text-primary-600 hover:underline">
            ← Volver a cursos
          </Link>
          <h1 className="font-display text-3xl font-bold text-primary-900 mt-3">
            Editar: {curso.titulo}
          </h1>
        </div>

        {/* Editar info del curso */}
        <div className="bg-white rounded-2xl border border-primary-900/8 p-6 mb-6">
          <h2 className="font-display text-xl font-bold text-primary-900 mb-5">Información del curso</h2>
          <form onSubmit={saveCurso} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-900 mb-1.5">Título *</label>
              <input
                value={cursoForm.titulo}
                onChange={e => setCursoForm(f => ({ ...f, titulo: e.target.value }))}
                required
                className="w-full px-4 py-3 rounded-xl border border-primary-900/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-900 mb-1.5">Descripción</label>
              <textarea
                value={cursoForm.descripcion}
                onChange={e => setCursoForm(f => ({ ...f, descripcion: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-primary-900/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-900 mb-1.5">URL de imagen</label>
              <input
                value={cursoForm.imagen_url}
                onChange={e => setCursoForm(f => ({ ...f, imagen_url: e.target.value }))}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl border border-primary-900/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center gap-6">
              <div className="w-32">
                <label className="block text-sm font-medium text-primary-900 mb-1.5">Orden</label>
                <input
                  type="number"
                  value={cursoForm.orden}
                  onChange={e => setCursoForm(f => ({ ...f, orden: Number(e.target.value) }))}
                  className="w-full px-4 py-3 rounded-xl border border-primary-900/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="activo"
                  checked={cursoForm.activo}
                  onChange={e => setCursoForm(f => ({ ...f, activo: e.target.checked }))}
                  className="w-4 h-4 accent-primary-600"
                />
                <label htmlFor="activo" className="text-sm font-medium text-primary-900">Activo</label>
              </div>
            </div>
            <button type="submit" disabled={saving} className="btn-primary text-sm disabled:opacity-60">
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </form>
        </div>

        {/* Módulos */}
        <div className="bg-white rounded-2xl border border-primary-900/8 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-bold text-primary-900">Módulos y lecciones</h2>
            <button
              onClick={() => setAddingModulo(!addingModulo)}
              className="btn-outline text-sm py-2 px-4"
            >
              {addingModulo ? 'Cancelar' : '+ Módulo'}
            </button>
          </div>

          {/* Nuevo módulo */}
          {addingModulo && (
            <form onSubmit={addModulo} className="bg-stone-50 rounded-xl p-4 mb-6 space-y-3">
              <h3 className="text-sm font-bold text-primary-900">Nuevo módulo</h3>
              <input
                value={newModulo.titulo}
                onChange={e => setNewModulo(f => ({ ...f, titulo: e.target.value }))}
                required
                placeholder="Título del módulo"
                className="w-full px-3 py-2 rounded-lg border border-primary-900/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                value={newModulo.descripcion}
                onChange={e => setNewModulo(f => ({ ...f, descripcion: e.target.value }))}
                placeholder="Descripción (opcional)"
                className="w-full px-3 py-2 rounded-lg border border-primary-900/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newModulo.orden}
                  onChange={e => setNewModulo(f => ({ ...f, orden: Number(e.target.value) }))}
                  placeholder="Orden"
                  className="w-24 px-3 py-2 rounded-lg border border-primary-900/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button type="submit" className="btn-primary text-xs py-2 px-4">Agregar</button>
              </div>
            </form>
          )}

          {/* Lista de módulos */}
          <div className="space-y-4">
            {modulos.map((modulo, mIdx) => {
              const lecciones = (modulo.lecciones || []).sort((a, b) => a.orden - b.orden)
              const isAddingLeccion = addingLeccion === modulo.id
              const lecForm = newLeccion[modulo.id] || { titulo: '', video_url: '', contenido: '', orden: 0 }

              return (
                <div key={modulo.id} className="border border-primary-900/8 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-primary-50/50">
                    <div>
                      <span className="text-xs text-primary-400 font-bold uppercase">Módulo {mIdx + 1}</span>
                      <h3 className="font-semibold text-primary-900 text-sm">{modulo.titulo}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAddingLeccion(isAddingLeccion ? null : modulo.id)}
                        className="text-xs px-2.5 py-1 rounded-lg border border-primary-900/15 hover:bg-white text-primary-700 transition-colors"
                      >
                        + Lección
                      </button>
                      <button
                        onClick={() => deleteModulo(modulo.id)}
                        className="text-xs px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>

                  {/* Lecciones */}
                  {lecciones.length > 0 && (
                    <div className="divide-y divide-primary-900/5">
                      {lecciones.map((lec, lIdx) => (
                        <div key={lec.id} className="flex items-center gap-3 px-4 py-3">
                          <span className="text-xs font-bold text-primary-400 w-5 text-center">{lIdx + 1}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-primary-900 truncate">{lec.titulo}</p>
                            {lec.video_url && (
                              <p className="text-xs text-primary-400 truncate">{lec.video_url}</p>
                            )}
                          </div>
                          <button
                            onClick={() => deleteLeccion(lec.id)}
                            className="text-xs text-red-500 hover:text-red-700 transition-colors shrink-0"
                          >
                            Eliminar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Formulario nueva lección */}
                  {isAddingLeccion && (
                    <form onSubmit={e => addLeccion(e, modulo.id)} className="px-4 py-4 bg-stone-50 border-t border-primary-900/5 space-y-3">
                      <h4 className="text-xs font-bold text-primary-700 uppercase">Nueva lección</h4>
                      <input
                        value={lecForm.titulo}
                        onChange={e => setNewLeccion(prev => ({ ...prev, [modulo.id]: { ...lecForm, titulo: e.target.value } }))}
                        required
                        placeholder="Título de la lección"
                        className="w-full px-3 py-2 rounded-lg border border-primary-900/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <input
                        value={lecForm.video_url}
                        onChange={e => setNewLeccion(prev => ({ ...prev, [modulo.id]: { ...lecForm, video_url: e.target.value } }))}
                        placeholder="URL de YouTube (opcional)"
                        className="w-full px-3 py-2 rounded-lg border border-primary-900/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <textarea
                        value={lecForm.contenido}
                        onChange={e => setNewLeccion(prev => ({ ...prev, [modulo.id]: { ...lecForm, contenido: e.target.value } }))}
                        placeholder="Contenido (texto o HTML)"
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-primary-900/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      />
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={lecForm.orden}
                          onChange={e => setNewLeccion(prev => ({ ...prev, [modulo.id]: { ...lecForm, orden: Number(e.target.value) } }))}
                          placeholder="Orden"
                          className="w-20 px-3 py-2 rounded-lg border border-primary-900/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <button type="submit" className="btn-primary text-xs py-2 px-4">Agregar</button>
                        <button type="button" onClick={() => setAddingLeccion(null)} className="btn-outline text-xs py-2 px-3">
                          Cancelar
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )
            })}
          </div>

          {modulos.length === 0 && (
            <div className="text-center py-10 text-primary-700/40 text-sm">
              No hay módulos. Agrega el primero.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
