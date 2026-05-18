import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Administración' }

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/instituto/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('rol, nombre, apellido')
    .eq('id', user.id)
    .single()

  if (profile?.rol !== 'admin') redirect('/instituto/dashboard')

  const [{ count: totalCursos }, { count: totalEstudiantes }, { count: totalCalificaciones }] = await Promise.all([
    supabase.from('cursos').select('id', { count: 'exact', head: true }),
    supabase.from('profiles').select('id', { count: 'exact', head: true }).eq('rol', 'estudiante'),
    supabase.from('calificaciones').select('id', { count: 'exact', head: true }),
  ])

  const adminCards = [
    {
      href: '/instituto/admin/cursos',
      icon: '📚',
      title: 'Gestionar cursos',
      desc: 'Crear, editar y eliminar cursos, módulos y lecciones.',
      stat: `${totalCursos || 0} cursos`,
    },
    {
      href: '/instituto/admin/estudiantes',
      icon: '👥',
      title: 'Ver estudiantes',
      desc: 'Lista de todos los estudiantes registrados.',
      stat: `${totalEstudiantes || 0} estudiantes`,
    },
    {
      href: '/instituto/admin/calificaciones',
      icon: '📊',
      title: 'Ver calificaciones',
      desc: 'Reporte de calificaciones de todos los estudiantes.',
      stat: `${totalCalificaciones || 0} evaluaciones`,
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Instituto Bíblico</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-900">
              Panel de Administración
            </h1>
            <p className="text-primary-700/60 mt-2 font-sans text-sm">
              Hola, {profile?.nombre} {profile?.apellido}
            </p>
          </div>
          <Link href="/instituto/dashboard" className="btn-outline text-sm py-2 px-5">
            ← Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {adminCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="bg-white rounded-2xl border border-primary-900/8 p-6 hover:shadow-md transition-shadow duration-300 flex flex-col gap-4"
            >
              <div className="text-4xl">{card.icon}</div>
              <div>
                <h2 className="font-display text-lg font-bold text-primary-900 mb-1">{card.title}</h2>
                <p className="text-primary-700/60 text-sm font-sans">{card.desc}</p>
              </div>
              <div className="mt-auto">
                <span className="inline-block bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1 rounded-full">
                  {card.stat}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
