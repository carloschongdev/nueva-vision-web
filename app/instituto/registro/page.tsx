'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function RegistroPage() {
  const router = useRouter()
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '', confirmar: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmar) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)
    const supabase = createClient()

    const { error: authError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { nombre: form.nombre, apellido: form.apellido },
      },
    })

    if (authError) {
      setError(authError.message === 'User already registered'
        ? 'Ya existe una cuenta con ese correo'
        : authError.message)
      setLoading(false)
      return
    }

    router.push('/instituto/dashboard')
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 pt-24 pb-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-primary-900/8 p-8 md:p-10">
          <div className="text-center mb-8">
            <p className="eyebrow">Instituto Bíblico</p>
            <h1 className="font-display text-3xl font-bold text-primary-900">Crear cuenta</h1>
            <p className="text-primary-700/60 text-sm mt-2 font-sans">Regístrate para acceder a los cursos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-900 mb-1.5">Nombre</label>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Juan"
                  className="w-full px-4 py-3 rounded-xl border border-primary-900/15 text-primary-900 placeholder-primary-900/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-900 mb-1.5">Apellido</label>
                <input
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  required
                  placeholder="García"
                  className="w-full px-4 py-3 rounded-xl border border-primary-900/15 text-primary-900 placeholder-primary-900/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
                />
              </div>
            </div>

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
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-3 rounded-xl border border-primary-900/15 text-primary-900 placeholder-primary-900/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-900 mb-1.5">Confirmar contraseña</label>
              <input
                name="confirmar"
                type="password"
                value={form.confirmar}
                onChange={handleChange}
                required
                placeholder="Repite tu contraseña"
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
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <p className="text-center text-sm text-primary-700/60 mt-6 font-sans">
            ¿Ya tienes cuenta?{' '}
            <Link href="/instituto/login" className="text-primary-600 font-medium hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
