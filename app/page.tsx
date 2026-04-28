import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import ServiceTimes from "@/components/ServiceTimes";
import VisitSection from "@/components/VisitSection";
import SectionHeader from "@/components/SectionHeader";
import NextServiceCTA from "@/components/NextServiceCTA";

export const metadata: Metadata = {
  title: "Iglesia Nueva Visión La Misericordia",
  description:
    "Iglesia Nueva Visión La Misericordia en Panamá. Cultos martes, viernes y domingos. Un lugar donde puedes conocer a Dios.",
};

const values = [
  { icon: "✝️", title: "Palabra y Fe",  desc: "Creemos en la Biblia como Palabra viva. Cada mensaje está fundamentado en la verdad bíblica." },
  { icon: "🫂", title: "Comunidad",     desc: "No estás solo. Somos una familia que camina junta en las buenas y en los momentos difíciles." },
  { icon: "🕊️", title: "Misericordia", desc: "La gracia y el perdón de Dios están disponibles para todos. Nadie queda afuera de Su amor." },
  { icon: "🌎", title: "Impacto",       desc: "Somos llamados a ser luz en Panamá. Servimos a nuestra ciudad con acciones concretas de amor." },
];

const testimonies = [
  { name: "María R.",    role: "Miembro desde 2018",       text: "Llegué a esta iglesia en uno de los momentos más difíciles de mi vida. Encontré más que fe — encontré una familia que me sostuvo." },
  { name: "Carlos M.",   role: "Visitante que se quedó",   text: "Nunca había asistido a una iglesia antes. La primera vez que fui a Nueva Visión me sentí bienvenido desde el primer segundo." },
  { name: "Ana y Pedro", role: "Matrimonio en la iglesia", text: "Nuestra pareja creció y se fortaleció aquí. Los grupos de parejas y la enseñanza bíblica transformaron nuestro matrimonio." },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Mission strip */}
      <section className="py-16 px-6 bg-primary-900">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-display text-2xl md:text-3xl text-white/80 italic font-medium leading-relaxed">
            "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo
            unigénito, para que todo aquel que en él cree, no se pierda,
            mas tenga vida eterna."
          </p>
          <p className="font-sans text-primary-300 text-sm font-semibold mt-4 tracking-widest uppercase">
            Juan 3:16
          </p>
        </div>
      </section>

      <ServiceTimes />
      <VisitSection />

      {/* Values */}
      <section className="py-24 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Lo que nos define"
            title="Nuestros"
            italicPart="valores"
            subtitle="Pilares que guían cada aspecto de nuestra comunidad, semana a semana."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300"
                style={{ border: "1px solid rgba(26,10,36,0.07)", boxShadow: "0 1px 3px rgba(26,10,36,0.06)" }}
              >
                <span className="text-3xl block mb-5">{v.icon}</span>
                <h3 className="font-sans font-semibold text-primary-900 text-sm uppercase tracking-wide mb-2">{v.title}</h3>
                <p className="font-sans text-primary-900/55 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonies */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Historias reales"
            title="Lo que dicen"
            italicPart="nuestra familia"
            subtitle="Cada persona tiene una historia. Aquí hay algunas que nos inspiran."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonies.map((t) => (
              <div key={t.name} className="rounded-2xl p-8" style={{ background: "#faf9fb", border: "1px solid rgba(26,10,36,0.07)" }}>
                <p className="font-display text-5xl text-primary-400/30 leading-none mb-3">"</p>
                <p className="font-sans text-primary-900/70 text-sm leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "rgba(26,10,36,0.06)" }}>
                  <div className="w-9 h-9 rounded-full bg-primary-400/20 flex items-center justify-center">
                    <span className="font-display font-semibold text-primary-600 text-sm">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-primary-900 text-sm">{t.name}</p>
                    <p className="font-sans text-primary-900/40 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 px-6 bg-primary-900 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-primary-500/10 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border border-primary-500/10 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-primary-500/40 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-primary-300 text-xs font-bold uppercase tracking-[0.35em] mb-5">
            Da el primer paso
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
            Tu historia con Dios{" "}
            <span className="italic text-primary-400">empieza hoy</span>
          </h2>
          <div className="w-12 h-1 rounded-full bg-primary-500 mx-auto mb-7" />
          <p className="font-sans text-white/55 text-lg leading-relaxed mb-10">
            Sin importar dónde estás en la vida, en Iglesia Nueva Visión La
            Misericordia hay un lugar guardado especialmente para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NextServiceCTA variant="amber" showBadge={true} />
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/20 hover:border-primary-500/50 text-white hover:text-primary-300 font-sans font-semibold text-sm tracking-wide transition-all duration-300"
            >
              Conoce más sobre nosotros
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
