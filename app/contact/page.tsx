import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contáctanos o visítanos. Iglesia Nueva Visión La Misericordia en Arraiján, Panamá.",
};

const schedule = [
  { name: "Culto de Oración",     day: "Martes",  time: "7:00 PM – 9:00 PM" },
  { name: "Noche de Avivamiento", day: "Viernes", time: "7:00 PM – 9:00 PM" },
  { name: "Escuela Dominical",    day: "Domingo", time: "10:00 AM – 11:00 AM" },
  { name: "Culto Principal",      day: "Domingo", time: "11:00 AM – 1:00 PM" },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative pt-40 pb-20 px-6 bg-primary-900 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary-500 to-transparent opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-primary-300 text-xs font-bold uppercase tracking-[0.35em] mb-5">Estamos aquí para ti</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-white leading-none mb-5">Contáctanos</h1>
          <div className="w-12 h-1 rounded-full bg-primary-500 mb-5" />
          <p className="font-sans text-white/55 text-lg max-w-xl leading-relaxed">
            ¿Tienes preguntas, necesitas oración o quieres planificar tu primera visita? Escríbenos.
          </p>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-12 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "📍", label: "Dirección", value: "Arraiján, Panamá", sub: "Ver en mapa →",    href: "https://maps.app.goo.gl/JqhSGcCpx4qV5QRWA" },
            { icon: "📞", label: "Teléfono",  value: "+507 6000-0000",   sub: "Lun–Vie, 9AM–5PM",href: "tel:+50760000000" },
            { icon: "✉️", label: "Email",     value: "nuevavisionpty@gmail.com", sub: "Respondemos en 24h",href: "mailto:nuevavisionpty@gmail.com" },
            { icon: "💬", label: "WhatsApp",  value: "+507 6000-0000",   sub: "Escríbenos ahora", href: "https://wa.me/50760000000" },
          ].map((item) => (
            <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 group block shadow-sm"
              style={{ border: "1px solid rgba(26,10,36,0.07)" }}
            >
              <div className="mb-4">
                {item.label === "Dirección" ? (
                  <Image src="/mercy.svg" width={32} height={32} alt="Ubicación" className="object-contain" />
                ) : (
                  <span className="text-3xl">{item.icon}</span>
                )}
              </div>
              <p className="text-primary-900/40 text-xs font-bold uppercase tracking-widest mb-1">{item.label}</p>
              <p className="font-sans font-semibold text-primary-900 text-sm mb-1">{item.value}</p>
              <p className="font-sans text-primary-500 text-xs font-medium">{item.sub}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Form */}
          <div>
            <SectionHeader eyebrow="Escríbenos" title="Envía un" italicPart="mensaje" centered={false} />
            {/* Para producción conecta a Formspree: action="https://formspree.io/f/TU_ID" */}
            <form className="space-y-4" action="#" method="POST">
              <div className="grid grid-cols-2 gap-4">
                {["Nombre", "Apellido"].map((f) => (
                  <div key={f}>
                    <label className="block text-xs text-primary-900/50 uppercase tracking-widest mb-1.5">{f}</label>
                    <input type="text" name={f.toLowerCase()} placeholder={`Tu ${f.toLowerCase()}`}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 text-primary-900 placeholder-primary-900/30 text-sm outline-none focus:ring-2 focus:ring-primary-500/30 transition-all duration-200"
                      style={{ border: "1px solid rgba(26,10,36,0.12)" }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs text-primary-900/50 uppercase tracking-widest mb-1.5">Email</label>
                <input type="email" name="email" required placeholder="tu@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 text-primary-900 placeholder-primary-900/30 text-sm outline-none focus:ring-2 focus:ring-primary-500/30 transition-all duration-200"
                  style={{ border: "1px solid rgba(26,10,36,0.12)" }}
                />
              </div>
              <div>
                <label className="block text-xs text-primary-900/50 uppercase tracking-widest mb-1.5">Asunto</label>
                <select name="subject" className="w-full px-4 py-3 rounded-xl bg-stone-50 text-primary-900 text-sm outline-none focus:ring-2 focus:ring-primary-500/30 transition-all duration-200 appearance-none" style={{ border: "1px solid rgba(26,10,36,0.12)" }}>
                  <option value="">Selecciona un tema</option>
                  <option value="visit">Quiero visitar la iglesia</option>
                  <option value="prayer">Petición de oración</option>
                  <option value="groups">Grupos y ministerios</option>
                  <option value="general">Pregunta general</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-primary-900/50 uppercase tracking-widest mb-1.5">Mensaje</label>
                <textarea name="message" required rows={5} placeholder="¿En qué podemos servirte?"
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 text-primary-900 placeholder-primary-900/30 text-sm outline-none focus:ring-2 focus:ring-primary-500/30 transition-all duration-200 resize-none"
                  style={{ border: "1px solid rgba(26,10,36,0.12)" }}
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-4">Enviar mensaje</button>
              <p className="text-primary-900/30 text-xs text-center">⚠️ Conecta a Formspree o Resend para producción.</p>
            </form>
          </div>

          {/* Map + Schedule */}
          <div className="space-y-6">
            <div>
              <p className="text-primary-500 text-xs font-bold uppercase tracking-[0.35em] mb-4">Cómo llegar</p>
              <div className="space-y-4">
                <div>
                  <div className="rounded-2xl overflow-hidden h-48 shadow-sm" style={{ border: "1px solid rgba(26,10,36,0.08)" }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d490.4!2d-79.7279901636073!3d8.992472214531723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8faca1adb6eb2c9f%3A0xa2f6a7f194a8b1ce!2sNueva+Vision+La+Misericordia+Arraijan!5e0!3m2!1ses!2spa!4v1714000000000!5m2!1ses!2spa"
                      width="100%" height="100%" style={{ border: 0 }}
                      allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación Iglesia Nueva Visión - Arraiján"
                    />
                  </div>
                  <a href="https://www.google.com/maps?q=8.992472214531723,-79.7279901636073" target="_blank" rel="noopener noreferrer"
                    className="text-primary-900/40 text-xs mt-2 text-center block hover:text-primary-500 transition-colors duration-200">
                    📍 Iglesia Nueva Visión La Misericordia · Arraiján ↗
                  </a>
                </div>
                <div>
                  <div className="rounded-2xl overflow-hidden h-48 shadow-sm" style={{ border: "1px solid rgba(26,10,36,0.08)" }}>
                    <iframe
                      src="https://maps.google.com/maps?q=9.188834975184063,-79.6206907357167&z=15&output=embed"
                      width="100%" height="100%" style={{ border: 0 }}
                      allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación Talita Cumi"
                    />
                  </div>
                  <a href="https://www.google.com/maps?q=9.188834975184063,-79.6206907357167" target="_blank" rel="noopener noreferrer"
                    className="text-primary-900/40 text-xs mt-2 text-center block hover:text-primary-500 transition-colors duration-200">
                    📍 Talita Cumi · República de Panamá ↗
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-7 bg-primary-900">
              <h3 className="font-display text-xl font-semibold text-white mb-5">Horario semanal</h3>
              <div className="space-y-3">
                {schedule.map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div>
                      <p className="font-sans font-medium text-white text-sm">{s.name}</p>
                      <p className="font-sans text-white/40 text-xs">{s.day}</p>
                    </div>
                    <span className="font-sans font-semibold text-primary-300 text-sm">{s.time}</span>
                  </div>
                ))}
              </div>
              <a href="https://wa.me/50760000000" target="_blank" rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 text-[#25D366] font-sans font-bold text-sm transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
