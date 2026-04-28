import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description: "Conoce la historia, misión y visión de Iglesia Nueva Visión La Misericordia en Panamá.",
};

const beliefs = [
  { title: "Las Escrituras", desc: "La Biblia es la Palabra inspirada de Dios, nuestra autoridad suprema en fe y práctica." },
  { title: "La Trinidad",    desc: "Creemos en un solo Dios en tres personas: Padre, Hijo y Espíritu Santo." },
  { title: "Jesucristo",     desc: "Dios hecho hombre. Murió en la cruz, resucitó al tercer día y volverá en gloria." },
  { title: "La Salvación",   desc: "Un regalo gratuito de Dios recibido por gracia mediante la fe en Jesucristo." },
  { title: "Espíritu Santo", desc: "Habita en cada creyente, otorgando poder, guía y dones para servir." },
  { title: "La Iglesia",     desc: "El cuerpo de Cristo, llamado a crecer, discipular y transformar su entorno." },
];

const team = [
  { name: "Pastor Principal",      role: "Liderazgo pastoral",  img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", bio: "Apasionado por ver vidas transformadas por la Palabra de Dios." },
  { name: "Pastora de Damas",      role: "Ministerio femenino", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80", bio: "Lidera el ministerio de mujeres con amor práctico y enseñanza bíblica." },
  { name: "Director de Alabanza",  role: "Ministerio de música",img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", bio: "Guía a la congregación en experiencias de adoración genuina." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-40 pb-24 px-6 overflow-hidden bg-primary-900">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=70" alt="" fill className="object-cover opacity-10" sizes="100vw" />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary-500 to-transparent opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-primary-300 text-xs font-bold uppercase tracking-[0.35em] mb-5">Quiénes somos</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold text-white leading-none mb-5">
            Una familia de <span className="italic text-primary-300">fe</span><br />en Panamá
          </h1>
          <div className="w-12 h-1 rounded-full bg-primary-500 mb-6" />
          <p className="font-sans text-white/60 text-lg max-w-2xl leading-relaxed">
            Somos Iglesia Nueva Visión La Misericordia — una comunidad que cree en el poder transformador de Dios.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="eyebrow">Nuestra historia</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary-900 leading-tight mb-3">
              Todo comenzó con <span className="italic text-primary-500">una visión</span>
            </h2>
            <div className="divider" />
            <p className="font-sans text-primary-900/60 leading-relaxed mb-4">
              Iglesia Nueva Visión La Misericordia nació del corazón de un grupo de creyentes que sintieron el llamado de establecer una comunidad de fe en Panamá, donde la gracia de Dios fuera el centro de todo.
            </p>
            <p className="font-sans text-primary-900/60 leading-relaxed mb-8">
              Hoy, semana a semana, nos reunimos con el mismo fervor del primer día: adorar a Dios, crecer en Su Palabra y ser luz en nuestra ciudad.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[{ val: "+15", label: "Años" }, { val: "3", label: "Cultos / sem." }, { val: "∞", label: "Misericordia" }].map((s) => (
                <div key={s.label} className="text-center py-4 rounded-xl bg-stone-50 border" style={{ borderColor: "rgba(26,10,36,0.06)" }}>
                  <p className="font-display text-2xl font-semibold text-primary-500">{s.val}</p>
                  <p className="font-sans text-primary-900/50 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-primary-400/15 rounded-3xl -z-0" />
            <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" alt="Historia" width={600} height={450} className="relative z-10 rounded-3xl object-cover w-full shadow-xl shadow-primary-900/10" />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-stone-50 stripe-bg">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Propósito" title="Misión y" italicPart="Visión" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-10 shadow-sm" style={{ border: "1px solid rgba(26,10,36,0.07)" }}>
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-6"><span className="text-2xl">🎯</span></div>
              <h3 className="font-display text-2xl font-semibold text-primary-900 mb-4">Misión</h3>
              <p className="font-sans text-primary-900/60 leading-relaxed">Alcanzar a toda persona en Panamá con el evangelio de Jesucristo, haciendo discípulos que transformen su familia, trabajo y comunidad con el amor y la verdad de Dios.</p>
            </div>
            <div className="bg-primary-900 rounded-2xl p-10 shadow-xl shadow-primary-900/20">
              <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center mb-6"><span className="text-2xl">🌟</span></div>
              <h3 className="font-display text-2xl font-semibold text-white mb-4">Visión</h3>
              <p className="font-sans text-white/60 leading-relaxed">Ser una iglesia de impacto en Panamá donde cada creyente viva su fe de forma integral, siendo instrumento de la misericordia de Dios en cada esfera de la sociedad.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Doctrina" title="Lo que" italicPart="creemos" subtitle="Fundamentos bíblicos que guían nuestra fe y práctica como comunidad." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {beliefs.map((b) => (
              <div key={b.title} className="rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300" style={{ background: "#faf9fb", border: "1px solid rgba(26,10,36,0.07)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
                  <h3 className="font-sans font-semibold text-primary-900 text-sm uppercase tracking-wide">{b.title}</h3>
                </div>
                <p className="font-sans text-primary-900/55 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader eyebrow="Liderazgo" title="Nuestro" italicPart="equipo pastoral" subtitle="Siervos llamados y apasionados por ver a la iglesia crecer en amor y madurez." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-sm group" style={{ border: "1px solid rgba(26,10,36,0.07)" }}>
                <div className="relative h-56 overflow-hidden">
                  <Image src={p.img} alt={p.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                </div>
                <div className="p-7">
                  <p className="text-primary-500 text-xs font-bold uppercase tracking-widest mb-1">{p.role}</p>
                  <h3 className="font-display text-xl font-semibold text-primary-900 mb-3">{p.name}</h3>
                  <p className="font-sans text-primary-900/55 text-sm leading-relaxed">{p.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-primary-900 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-5">
          Sé parte de <span className="italic text-primary-300">esta familia</span>
        </h2>
        <div className="w-12 h-1 rounded-full bg-primary-500 mx-auto mb-6" />
        <p className="font-sans text-white/55 text-lg mb-8 max-w-xl mx-auto">Nuestra puerta siempre está abierta. Visítanos cualquier martes, viernes o domingo.</p>
        <Link href="/contact" className="btn-primary">Contactar a la iglesia</Link>
      </section>
    </>
  );
}
