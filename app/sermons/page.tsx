import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Alabanza y Adoración",
  description: "Videos de alabanza y adoración cristiana en español. Adora a Dios desde donde estás.",
};

const featured = {
  title: "Grandes Cosas - Hillsong en Español",
  speaker: "Hillsong Worship",
  date: "2024",
  series: "Alabanza y Adoración",
  videoId: "pRLqRMDqEes",
  description: "Un poderoso tiempo de adoración para acercarte a la presencia de Dios.",
};

const sermons = [
  { title: "Oceans - Hillsong United en Español",  speaker: "Hillsong United",    date: "2024", series: "Adoración Contemporánea", videoId: "pRLqRMDqEes", duration: "" },
  { title: "Way Maker - Sinach en Español",         speaker: "Varios Artistas",    date: "2024", series: "Adoración Contemporánea", videoId: "3lLDDCDnMsI", duration: "" },
  { title: "Reckless Love en Español",              speaker: "Cory Asbury",        date: "2024", series: "Gracia y Amor",           videoId: "mLZ-saN2HkM", duration: "" },
  { title: "Goodness of God en Español",            speaker: "Bethel Music",       date: "2024", series: "Gracia y Amor",           videoId: "CEzFJ1PCrvo", duration: "" },
  { title: "Tu Fidelidad - Elevation Worship",      speaker: "Elevation Worship",  date: "2024", series: "Fe y Confianza",          videoId: "XFsJTMEyYLI", duration: "" },
  { title: "Worthy of It All en Español",           speaker: "David Brymer",       date: "2024", series: "Adoración Profunda",      videoId: "k3QCfBBsiyE", duration: "" },
];

export default function SermonsPage() {
  return (
    <>
      <section className="relative pt-40 pb-20 px-6 bg-primary-900 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary-500 to-transparent opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-primary-300 text-xs font-bold uppercase tracking-[0.35em] mb-5">Alabanza y adoración</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold text-white leading-none mb-5">Alabanza</h1>
          <div className="w-12 h-1 rounded-full bg-primary-500 mb-5" />
          <p className="font-sans text-white/55 text-lg max-w-2xl leading-relaxed">Adora a Dios desde donde estás. Videos de alabanza y adoración para acompañar tu tiempo con Él.</p>
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
          <SectionHeader eyebrow="Videos" title="Alabanza" italicPart="de alabanza" subtitle="Revive los mensajes que han impactado a nuestra congregación." />
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
        <Link href="/contact" className="btn-primary">Ven a adorar en persona</Link>
      </section>
    </>
  );
}
