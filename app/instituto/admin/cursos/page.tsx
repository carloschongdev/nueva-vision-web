'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Curso {
  id: string
  titulo: string
  descripcion: string | null
  activo: boolean
  orden: number
  created_at: string
}

export default function AdminCursosPage() {
  const [cursos, setCursos] = useState<Curso[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ titulo: '', descripcion: '', orden: 0 })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const supabase = createClient()

  const load = async () => {
    const { data } = await supabase.from('cursos').select('*').order('orden')
    setCursos(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await supabase.from('cursos').insert({ ...form, activo: true })
    setForm({ titulo: '', descripcion: '', orden: 0 })
    setShowForm(false)
    await load()
    setSaving(false)
  }

  const toggleActivo = async (curso: Curso) => {
    await supabase.from('cursos').update({ activo: !curso.activo }).eq('id', curso.id)
    await load()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este curso? Se eliminarán también todos sus módulos y lecciones.')) return
    setDeleting(id)
    await supabase.from('cursos').delete().eq('id', id)
    await load()
    setDeleting(null)
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
          <div>
            <Link href="/instituto/admin" className="text-sm text-primary-600 hover:underline">
              ← Panel Admin
            </Link>
            <h1 className="font-display text-3xl font-bold text-primary-900 mt-3">Gestionar cursos</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary text-sm"
          >
            {showForm ? 'Cancelar' : '+ Nuevo curso'}
          </button>
        </div>

        {/* Formulario nuevo curso */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-primary-900/8 p-6 mb-6">
            <h2 className="font-display text-xl font-bold text-primary-900 mb-5">Nuevo curso</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-900 mb-1.5">Título *</label>
                <input
                  value={form.titulo}
                  onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
                  required
                  placeholder="Ej: Fundamentos de la Fe"
                  className="w-full px-4 py-3 rounded-xl border border-primary-900/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-900 mb-1.5">Descripción</label>
                <textarea
                  value={form.descripcion}
                  onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                  rows={3}
                  placeholder="Descripción breve del curso..."
                  className="w-full px-4 py-3 rounded-xl border border-primary-900/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
              <div className="w-32">
                <label className="block text-sm font-medium text-primary-900 mb-1.5">Orden</label>
                <input
                  type="number"
                  value={form.orden}
                  onChange={e => setForm(f => ({ ...f, orden: Number(e.target.value) }))}
                  min={0}
                  className="w-full px-4 py-3 rounded-xl border border-primary-900/15 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary text-sm disabled:opacity-60">
                  {saving ? 'Guardando...' : 'Crear curso'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline text-sm">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de cursos */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : cursos.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-primary-900/8">
            <p className="text-4xl mb-4">📚</p>
            <p className="text-primary-700/50">No hay cursos aún. Crea el primero.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cursos.map((curso) => (
              <div
                key={curso.id}
                className="bg-white rounded-2xl border border-primary-900/8 p-5 flex items-center gap-4 flex-wrap"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-primary-900">{curso.titulo}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      curso.activo ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-500'
                    }`}>
                      {curso.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  {curso.descripcion && (
                    <p className="text-sm text-primary-700/50 mt-1 line-clamp-1">{curso.descripcion}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActivo(curso)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-primary-900/15 hover:bg-stone-50 text-primary-700 transition-colors"
                  >
                    {curso.activo ? 'Desactivar' : 'Activar'}
                  </button>
                  <Link
                    href={`/instituto/admin/cursos/${curso.id}`}
                    className="text-xs px-3 py-1.5 rounded-lg border border-primary-900/15 hover:bg-stone-50 text-primary-700 transition-colors"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(curso.id)}
                    disabled={deleting === curso.id}
                    className="text-xs px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors disabled:opacity-60"
                  >
                    {deleting === curso.id ? '...' : 'Eliminar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
