import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Mi Dashboard' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/instituto/login')

  const [{ data: profile }, { data: cursos }, { data: calificaciones }, { data: certificados }] = await Promise.all([
    supabase.from('profiles').select('nombre, apellido, rol').eq('id', user.id).single(),
    supabase.from('cursos').select(`
      id, titulo, descripcion, imagen_url,
      modulos(id, lecciones(id))
    `).eq('activo', true).order('orden'),
    supabase.from('calificaciones').select(`
      puntaje, created_at,
      evaluaciones(titulo, modulos(cursos(titulo)))
    `).eq('usuario_id', user.id).order('created_at', { ascending: false }).limit(5),
    supabase.from('certificados').select('id, fecha_emision, cursos(titulo)').eq('usuario_id', user.id),
  ])

  const progresoData = await Promise.all(
    (cursos || []).map(async (curso) => {
      const totalLecciones = (curso.modulos || []).reduce(
        (acc: number, m: { lecciones: { id: string }[] }) => acc + (m.lecciones?.length || 0), 0
      )
      const leccionIds = (curso.modulos || []).flatMap(
        (m: { lecciones: { id: string }[] }) => (m.lecciones || []).map((l: { id: string }) => l.id)
      )
      if (leccionIds.length === 0) return { cursoId: curso.id, completadas: 0, total: 0 }
      const { count } = await supabase
        .from('progreso')
        .select('id', { count: 'exact', head: true })
        .eq('usuario_id', user.id)
        .eq('completado', true)
        .in('leccion_id', leccionIds)
      return { cursoId: curso.id, completadas: count || 0, total: totalLecciones }
    })
  )
  const progresoMap = Object.fromEntries(progresoData.map(p => [p.cursoId, p]))

  const isAdmin = profile?.rol === 'admin'
  const nombre = profile?.nombre || user?.email?.split('@')[0] || 'Estudiante'

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="eyebrow">Panel del Estudiante</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-900">
              Bienvenido/a, {nombre}
            </h1>
          </div>
          <div className="flex gap-3">
            {isAdmin && (
              <Link href="/instituto/admin" className="btn-outline text-sm py-2 px-5">
                Panel Admin
              </Link>
            )}
            <LogoutButton />
          </div>
        </div>

        {/* Certificados */}
        {certificados && certificados.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-xl font-bold text-primary-900 mb-4">🎓 Mis certificados</h2>
            <div className="flex flex-wrap gap-3">
              {certificados.map((cert) => (
                <div key={cert.id} className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3">
                  <p className="font-semibold text-primary-900 text-sm">
                    {(cert.cursos as unknown as { titulo: string } | null)?.titulo}
                  </p>
                  <p className="text-xs text-primary-700/60 mt-0.5">
                    {new Date(cert.fecha_emision).toLocaleDateString('es-PA')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mis cursos */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-xl font-bold text-primary-900">📚 Mis cursos</h2>
            <Link href="/instituto/cursos" className="text-sm text-primary-600 hover:underline font-medium">
              Ver todos →
            </Link>
          </div>
          {cursos && cursos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cursos.map((curso) => {
                const p = progresoMap[curso.id]
                const pct = p?.total > 0 ? Math.round((p.completadas / p.total) * 100) : 0
                return (
                  <Link
                    key={curso.id}
                    href={`/instituto/cursos/${curso.id}`}
                    className="bg-white rounded-2xl border border-primary-900/8 p-6 hover:shadow-md transition-shadow duration-300 flex gap-4"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary-900 flex items-center justify-center shrink-0">
                      <span className="text-2xl">📖</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-primary-900 text-sm mb-1 leading-snug">{curso.titulo}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 bg-primary-100 rounded-full h-1.5">
                          <div
                            className="bg-primary-600 rounded-full h-1.5 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-primary-700/60 font-medium shrink-0">{pct}%</span>
                      </div>
                      <p className="text-xs text-primary-700/50">
                        {p?.completadas || 0}/{p?.total || 0} lecciones
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-primary-900/8 p-10 text-center">
              <p className="text-primary-700/50 mb-4">No hay cursos disponibles aún.</p>
              {isAdmin && (
                <Link href="/instituto/admin/cursos" className="btn-primary text-sm">
                  Crear primer curso
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Últimas calificaciones */}
        {calificaciones && calificaciones.length > 0 && (
          <div>
            <h2 className="font-display text-xl font-bold text-primary-900 mb-5">📊 Mis calificaciones</h2>
            <div className="bg-white rounded-2xl border border-primary-900/8 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-primary-900/5 bg-stone-50">
                    <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary-700/50">Evaluación</th>
                    <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary-700/50">Puntaje</th>
                    <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-primary-700/50">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {calificaciones.map((c) => (
                    <tr key={`${c.evaluaciones}`} className="border-b border-primary-900/5 last:border-0">
                      <td className="px-6 py-4 text-primary-900 font-medium">
                        {(c.evaluaciones as unknown as { titulo: string } | null)?.titulo || 'Evaluación'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`font-bold ${c.puntaje >= 70 ? 'text-green-600' : 'text-red-500'}`}>
                          {c.puntaje}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-primary-700/50">
                        {new Date(c.created_at).toLocaleDateString('es-PA')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function LogoutButton() {
  return (
    <form action="/api/instituto/logout" method="POST">
      <button type="submit" className="text-sm text-primary-700/60 hover:text-primary-900 transition-colors px-3 py-2">
        Cerrar sesión
      </button>
    </form>
  )
}
