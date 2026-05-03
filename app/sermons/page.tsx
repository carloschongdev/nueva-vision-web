import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Predicaciones",
  description: "Mensajes de vida para edificar tu fe. Escucha la Palabra de Dios y crece espiritualmente.",
};

const featured = {
  title: "Tú Lo Vas a Alcanzar",
  speaker: "Pastor Juan Carlos Harrigan",
  date: "2024",
  series: "Predicaciones",
  videoId: "L4sVHFQIWxI",
  description: "Un mensaje poderoso del Pastor Juan Carlos Harrigan para fortalecer tu fe y creer en las promesas de Dios.",
};

const sermons = [
  { title: "Tú Lo Vas a Alcanzar",   speaker: "Pastor Juan Carlos Harrigan", date: "2024", series: "Predicaciones", videoId: "L4sVHFQIWxI",  duration: "" },
  { title: "No Sigas Escogiendo Mal", speaker: "Juan Pablo Lerman",           date: "2024", series: "Predicaciones", videoId: "Wj3mSE3JjsU",  duration: "" },
  { title: "Ordena Tu Casa",          speaker: "Pastor Ernesto Cuevas",       date: "2025", series: "Predicaciones", videoId: "8LTlVQAiVfU",  duration: "" },
  { title: "Dios Te Levantará",       speaker: "Juan Pablo Lerman",           date: "2025", series: "Predicaciones", videoId: "VuA2JFt0OAg",  duration: "" },
  { title: "El Favor de Dios",        speaker: "Predicación Cristiana",       date: "2025", series: "Predicaciones", videoId: "N1TpuBs5RnI",  duration: "" },
  { title: "Confía en el Señor",      speaker: "Predicación Cristiana",       date: "2025", series: "Predicaciones", videoId: "9oJqFUuGp2E",  duration: "" },
];

export default function SermonsPage() {
  return (
    <>
      <section className="relative pt-40 pb-20 px-6 bg-primary-900 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary-500 to-transparent opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-primary-300 text-xs font-bold uppercase tracking-[0.35em] mb-5">Predicaciones</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-white leading-none mb-5">Predicaciones</h1>
          <div className="w-12 h-1 rounded-full bg-primary-500 mb-5" />
          <p className="font-sans text-white/55 text-lg max-w-2xl leading-relaxed">
            Mensajes de vida para edificar tu fe. Escucha la Palabra de Dios y crece espiritualmente.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-primary-500 text-xs font-bold uppercase tracking-[0.35em] mb-8">Último mensaje</p>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3 rounded-2xl overflow-hidden aspect-video shadow-2xl shadow-primary-900/15" style={{ border: "1px solid rgba(26,10,36,0.08)" }}>
              <iframe
                src={`https://www.youtube.com/embed/${featured.videoId}?rel=0&modestbranding=1`}
                title={featured.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen className="w-full h-full" loading="lazy"
              />
            </div>
            <div className="lg:col-span-2 pt-2">
              <span className="inline-block mb-4 px-3 py-1 rounded-full bg-primary-500/10 text-primary-600 text-xs font-bold uppercase tracking-wider">{featured.series}</span>
              <h2 className="font-display text-3xl font-semibold text-primary-900 leading-tight mb-4">{featured.title}</h2>
              <div className="flex flex-wrap gap-4 text-xs text-primary-900/50 mb-4">
                <span>👤 {featured.speaker}</span>
                <span>📅 {featured.date}</span>
              </div>
              <div className="w-10 h-1 rounded-full bg-primary-500 mb-5" />
              <p className="font-sans text-primary-900/60 leading-relaxed text-sm mb-6">{featured.description}</p>
              <a href={`https://www.youtube.com/watch?v=${featured.videoId}`} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm">
                Ver en YouTube →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-stone-50 stripe-bg">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Videos" title="Predicaciones" italicPart="recientes" subtitle="Mensajes que han impactado a nuestra congregación." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sermons.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 group shadow-sm" style={{ border: "1px solid rgba(26,10,36,0.07)" }}>
                <div className="relative aspect-video overflow-hidden">
                  <Image src={`https://img.youtube.com/vi/${s.videoId}/mqdefault.jpg`} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-primary-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                  {s.duration && <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-primary-950/80 text-white text-xs">{s.duration}</span>}
                </div>
                <div className="p-6">
                  <p className="text-primary-500 text-xs font-bold uppercase tracking-wider mb-2">{s.series}</p>
                  <h3 className="font-display text-lg font-semibold text-primary-900 leading-snug mb-3">{s.title}</h3>
                  <div className="flex justify-between text-xs text-primary-900/40 mb-4">
                    <span>{s.speaker}</span><span>{s.date}</span>
                  </div>
                  <a href={`https://www.youtube.com/watch?v=${s.videoId}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary-500 text-sm font-semibold hover:text-primary-600 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                    Ver en YouTube
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href="https://youtube.com/@iglesianuevavisión" target="_blank" rel="noopener noreferrer" className="btn-primary">Suscribirse en YouTube</a>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white text-center">
        <h2 className="font-display text-4xl font-semibold text-primary-900 mb-4">
          Acompáñanos en <span className="italic text-primary-500">persona</span>
        </h2>
        <div className="w-12 h-1 rounded-full bg-primary-500 mx-auto mb-5" />
        <p className="font-sans text-primary-900/55 text-base mb-8 max-w-md mx-auto">Nada reemplaza estar presente en comunidad.</p>
        <Link href="/contact" className="btn-primary">Ven a escuchar la Palabra en persona</Link>
      </section>
    </>
  );
}
