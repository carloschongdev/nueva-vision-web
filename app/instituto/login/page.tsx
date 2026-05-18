'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (authError) {
      setError('Correo o contraseña incorrectos')
      setLoading(false)
      return
    }

    router.push('/instituto/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 pt-24 pb-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-primary-900/8 p-8 md:p-10">
          <div className="text-center mb-8">
            <p className="eyebrow">Instituto Bíblico</p>
            <h1 className="font-display text-3xl font-bold text-primary-900">Iniciar sesión</h1>
            <p className="text-primary-700/60 text-sm mt-2 font-sans">Accede a tus cursos y progreso</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-900 mb-1.5">Correo electrónico</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="juan@ejemplo.com"
                className="w-full px-4 py-3 rounded-xl border border-primary-900/15 text-primary-900 placeholder-primary-900/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-900 mb-1.5">Contraseña</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Tu contraseña"
                className="w-full px-4 py-3 rounded-xl border border-primary-900/15 text-primary-900 placeholder-primary-900/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary justify-center py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <p className="text-center text-sm text-primary-700/60 mt-6 font-sans">
            ¿No tienes cuenta?{' '}
            <Link href="/instituto/registro" className="text-primary-600 font-medium hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
