import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { initialLocations } from "@/lib/churches";

const provinceNames: Record<string, string> = {
  PA5: "Darién", PA8: "Panamá", PA10: "Panamá Oeste",
  PA1: "Bocas del Toro", PA2: "Coclé", PA3: "Colón",
  PA4: "Chiriquí", PA6: "Herrera", PA7: "Los Santos",
  PA9: "Veraguas",
};

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce la historia, misión y visión del Ministerio Iglesia Nueva Visión La Misericordia en Panamá.",
};

const beliefs = [
  { title: "La Trinidad",    desc: "Creemos y proclamamos la doctrina de la Trinidad: Dios Padre, Dios Hijo y Dios Espíritu Santo como fundamento de nuestra fe." },
  { title: "Las Escrituras", desc: "Firmemente fundamentados en la Palabra de Dios, enseñamos y practicamos el servicio a Dios y la predicación del Santo Evangelio." },
  { title: "La Salvación",   desc: "Proclamamos a Jesucristo como único y verdadero Salvador, Su muerte, Su resurrección y Su pronto regreso por Su Iglesia." },
  { title: "La Fe Activa",   desc: "Creemos en una fe que confía plenamente en Dios y depende de Su provisión. Dios es quien suple toda necesidad y abre puertas." },
  { title: "El Reino",       desc: "Formamos a niños, jóvenes y adultos en los principios del Reino, cultivando una profunda pasión por Su obra." },
  { title: "La Misericordia",desc: "Guiados por Miqueas 6:8: hacer justicia, amar misericordia y humillarnos ante nuestro Dios en todo lo que hacemos." },
];

const misionItems = [
  {
    num: "01",
    title: "Expansión del Evangelio",
    desc: "Ser una iglesia dedicada y comprometida con la expansión del Evangelio de Jesucristo, compartiendo las Buenas Nuevas con fidelidad y pasión.",
  },
  {
    num: "02",
    title: "Testigos hasta lo último de la tierra",
    desc: "Testificar de Cristo, amando, sirviendo y proclamando Su nombre, desde nuestras puertas hasta los confines de la tierra, conforme a Hechos 1:8.",
  },
  {
    num: "03",
    title: "Valores del Reino",
    desc: "Confesar y vivir el amor hacia el prójimo, la unidad del cuerpo de Cristo, la santidad, el perdón, la restauración y la fidelidad como valores esenciales.",
  },
  {
    num: "04",
    title: "Transformación integral",
    desc: "Fomentar el evangelismo, las misiones, la unidad familiar y la asistencia a los necesitados como expresión tangible del Evangelio dentro y fuera de la iglesia.",
  },
];

const team = [
  {
    name: "Pastor Principal",
    role: "Liderazgo pastoral",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Apasionado por ver vidas transformadas por la Palabra de Dios. Sirve a la congregación con humildad y visión.",
  },
  {
    name: "Pastora de Damas",
    role: "Ministerio femenino",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    bio: "Lidera el ministerio de mujeres con amor práctico, enseñanza bíblica y un corazón de servicio.",
  },
  {
    name: "Director de Alabanza",
    role: "Ministerio de música",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "Guía a la congregación en experiencias de adoración genuina, preparando cada culto con excelencia.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden bg-navy-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=70"
            alt=""
            fill
            className="object-cover opacity-10"
            sizes="100vw"
          />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.35em] mb-5">
            Quiénes somos
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold text-white leading-none mb-5">
            Ministerio <span className="italic text-amber-400">N.V.L.M.</span>
          </h1>
          <div className="w-12 h-1 rounded-full bg-amber-500 mb-6" />
          <p className="font-sans text-white/60 text-lg max-w-2xl leading-relaxed">
            Somos un ministerio de iglesias asociadas, legalmente organizadas en
            Panamá con personería jurídica. Nuestro emblema — una ubicación con
            una M — refleja un lugar de misericordia de Dios donde quiera que sea
            visible.
          </p>
        </div>
      </section>

      {/* ── EMBLEMA + NOMBRE ──────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="eyebrow">Nuestra identidad</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-navy-900 leading-tight mb-3">
              Un lugar de <span className="italic text-amber-500">misericordia</span>
            </h2>
            <div className="divider-amber" />
            <p className="font-sans text-navy-900/60 leading-relaxed mb-4">
              El nombre <strong className="text-navy-900">Nueva Visión La Misericordia</strong> — N.V.L.M. — representa un
              ministerio de iglesias asociadas, legalmente organizadas en Panamá
              con personería jurídica.
            </p>
            <p className="font-sans text-navy-900/60 leading-relaxed mb-4">
              Nuestro emblema es un logo de ubicación con una M dentro: símbolo
              de un lugar de misericordia de Dios. Donde quiera que sea visible
              este logo, refleja la bienaventuranza de ser misericordioso con
              todos y un lugar de Palabra de Dios.
            </p>

            {/* Sede */}
            <div className="mt-6 p-5 rounded-2xl bg-stone-50 border" style={{ borderColor: "rgba(8,15,46,0.07)" }}>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">Sede Nacional</p>
              <p className="font-sans text-navy-900 font-medium">Ciudad de Panamá · Darién · Garachiné</p>
            </div>

            {/* Versículo */}
            <div className="mt-5 p-5 rounded-2xl bg-navy-900">
              <p className="font-display text-white/80 italic text-lg leading-relaxed">
                &ldquo;Por tanto, id, y haced discípulos a todas las naciones,
                bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu
                Santo.&rdquo;
              </p>
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mt-3">
                Mateo 28:19 — La Gran Comisión
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-amber-400/15 rounded-3xl -z-0" />
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-xl shadow-navy-900/10 flex items-center justify-center bg-stone-50 p-12" style={{ minHeight: 320 }}>
              <Image
                src="/iglesia.svg"
                alt="Logo Iglesia Nueva Visión La Misericordia"
                width={720}
                height={620}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── VISIÓN ────────────────────────────────────── */}
      <section className="py-24 px-6 bg-stone-50 stripe-bg">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Visión"
            title="Hacia dónde"
            italicPart="vamos"
            subtitle="Una iglesia firmemente fundamentada en la Palabra de Dios, creciendo en el conocimiento de la verdad."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "✝️",
                title: "Fundamentados en la Trinidad",
                desc: "Reconocemos y proclamamos la doctrina de la Trinidad: Dios Padre, Dios Hijo y Dios Espíritu Santo. Enseñamos y practicamos el servicio a Dios y la predicación del Santo Evangelio utilizando todos los medios disponibles.",
              },
              {
                icon: "🙏",
                title: "Fe que confía en Dios",
                desc: "Promovemos una fe activa que confía plenamente en Dios y depende de Su provisión y dirección. Creemos que Dios es quien suple toda necesidad y abre puertas que sostienen y fortalecen a Su Iglesia.",
              },
              {
                icon: "📖",
                title: "Formando generaciones",
                desc: "Ser una iglesia que crece en el conocimiento de la verdad, formando a niños, jóvenes y adultos en los principios del Reino. Buscamos reflejar una entrega total a Dios y cultivar una profunda pasión por Su obra.",
              },
              {
                icon: "⚖️",
                title: "Miqueas 6:8",
                desc: "&ldquo;Oh hombre, él te ha declarado lo que es bueno. ¿Y qué pide Jehová de ti? Solamente hacer justicia, amar misericordia, y humillarte ante tu Dios.&rdquo; Este versículo guía nuestro llamado profético.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                style={{ border: "1px solid rgba(8,15,46,0.07)" }}
              >
                <span className="text-3xl block mb-4">{v.icon}</span>
                <h3 className="font-sans font-semibold text-navy-900 text-sm uppercase tracking-wide mb-3">
                  {v.title}
                </h3>
                <p
                  className="font-sans text-navy-900/55 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: v.desc }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISIÓN ────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="eyebrow">Misión</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-navy-900 leading-tight mb-3">
              Lo que hacemos <span className="italic text-amber-500">cada día</span>
            </h2>
            <div className="divider-amber" />
            <p className="font-sans text-navy-900/60 leading-relaxed mb-4">
              Somos testigos de Cristo, amando, sirviendo y proclamando Su nombre
              desde nuestras puertas hasta los confines de la tierra.
            </p>
            <div className="p-5 rounded-2xl bg-navy-900 mt-6">
              <p className="font-display text-white/80 italic text-lg leading-relaxed">
                &ldquo;Pero recibiréis poder cuando el Espíritu Santo venga sobre
                vosotros, y me seréis testigos en Jerusalén, en toda Judea y
                Samaria, y hasta los confines de la tierra.&rdquo;
              </p>
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mt-3">
                Hechos 1:8
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {misionItems.map((item) => (
              <div
                key={item.num}
                className="flex gap-5 group p-5 rounded-2xl hover:bg-stone-50 transition-all duration-300"
                style={{ border: "1px solid rgba(8,15,46,0.06)" }}
              >
                <span className="font-display text-3xl font-semibold text-amber-400/40 group-hover:text-amber-500 transition-colors duration-300 leading-none pt-0.5 shrink-0 w-10 text-right">
                  {item.num}
                </span>
                <div className="pt-0.5">
                  <h4 className="font-sans font-semibold text-navy-900 mb-1 text-sm uppercase tracking-wide">
                    {item.title}
                  </h4>
                  <p className="font-sans text-navy-900/55 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREENCIAS ─────────────────────────────────── */}
      <section className="py-24 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Doctrina"
            title="Lo que"
            italicPart="creemos"
            subtitle="Fundamentos bíblicos que guían nuestra fe y práctica como comunidad."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {beliefs.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300"
                style={{ background: "#fafaf9", border: "1px solid rgba(8,15,46,0.07)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <h3 className="font-sans font-semibold text-navy-900 text-sm uppercase tracking-wide">
                    {b.title}
                  </h3>
                </div>
                <p className="font-sans text-navy-900/55 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EQUIPO ────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Liderazgo"
            title="Nuestro"
            italicPart="equipo pastoral"
            subtitle="Siervos llamados y apasionados por ver a la iglesia crecer en amor y madurez."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((p) => (
              <div
                key={p.name}
                className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-sm group"
                style={{ border: "1px solid rgba(8,15,46,0.07)" }}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                </div>
                <div className="p-7">
                  <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-1">{p.role}</p>
                  <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">{p.name}</h3>
                  <p className="font-sans text-navy-900/55 text-sm leading-relaxed">{p.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NUESTRAS IGLESIAS ─────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Red de iglesias"
            title="Nuestras"
            italicPart="iglesias"
            subtitle="Un ministerio en expansión, llevando el Evangelio a cada comunidad de Panamá."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {initialLocations
              .filter((loc) => loc.id !== "arraijan")
              .map((loc) => (
                <div
                  key={loc.id}
                  className="bg-white rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4"
                  style={{ border: "1px solid rgba(8,15,46,0.08)" }}
                >
                  <div className="flex items-start gap-3">
                    <Image src="/mercy.svg" alt="" width={40} height={40} className="object-contain shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="font-sans font-semibold text-sm text-navy-900 leading-snug">{loc.name}</p>
                      <p className="font-sans text-xs text-navy-900/50 mt-0.5">{provinceNames[loc.province] ?? loc.province}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full ${
                      loc.active
                        ? "bg-primary-100 text-primary-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {loc.active ? "Activa" : "Próximamente"}
                    </span>
                    <Link
                      href={`/iglesias/${loc.id}`}
                      className="text-xs font-sans font-semibold text-primary-500 hover:text-primary-700 transition-colors"
                    >
                      Ver historia →
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="py-20 px-6 bg-navy-900 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mb-5">
          Sé parte de <span className="italic text-amber-400">esta familia</span>
        </h2>
        <div className="w-12 h-1 rounded-full bg-amber-500 mx-auto mb-6" />
        <p className="font-sans text-white/55 text-lg mb-8 max-w-xl mx-auto">
          Nuestra puerta siempre está abierta. Visítanos cualquier martes, viernes o domingo.
        </p>
        <Link href="/contact" className="btn-amber">
          Contactar a la iglesia
        </Link>
      </section>
    </>
  );
}