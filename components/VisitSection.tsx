import Link from "next/link";
import Image from "next/image";

const steps = [
  { num: "01", title: "Eres bienvenido",   desc: "Nuestro equipo te recibirá y responderá tus preguntas desde el inicio." },
  { num: "02", title: "Vive el culto",     desc: "Música de adoración, un mensaje bíblico relevante y un ambiente cálido." },
  { num: "03", title: "Conéctate",         desc: "Quédate después, toma un café y conoce a nuestra familia." },
];

export default function VisitSection() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-last lg:order-first">
            <div className="absolute -left-6 -bottom-6 w-48 h-48 bg-primary-900 rounded-3xl -z-0" />
            <div className="absolute -right-3 -top-3 w-20 h-20 bg-primary-400 rounded-2xl -z-0 opacity-60" />
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/15">
              <Image
                src="https://images.unsplash.com/photo-1591522810850-58128c5fb089?w=800&q=80"
                alt="Primera visita" width={640} height={480} className="object-cover w-full"
              />
            </div>
            <div className="absolute -right-4 bottom-8 z-20 bg-white rounded-2xl px-5 py-4 shadow-lg"
              style={{ border: "1px solid rgba(26,10,36,0.05)" }}>
              <p className="font-display text-2xl font-semibold text-primary-500">100%</p>
              <p className="font-sans text-xs text-primary-900/60 mt-0.5 uppercase tracking-widest">Bienvenido</p>
            </div>
          </div>

          <div>
            <p className="eyebrow">Primera visita</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary-900 leading-tight mb-3">
              ¿Es tu primera vez? <span className="italic text-primary-500">Te esperamos</span>
            </h2>
            <div className="divider" />
            <p className="font-sans text-primary-900/60 leading-relaxed mb-10 text-base">
              Nueva Visión La Misericordia es un lugar donde Cristo es el centro de nuestras vidas. Él restaura tu interior, sana tus relaciones familiares y te da un propósito, todo para su gloria.
            </p>
            <div className="space-y-5 mb-10">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-5 group">
                  <span className="font-display text-3xl font-semibold text-primary-400/40 group-hover:text-primary-500 transition-colors duration-300 leading-none pt-0.5 shrink-0 w-10 text-right">
                    {step.num}
                  </span>
                  <div className="pt-0.5">
                    <h4 className="font-sans font-semibold text-primary-900 mb-1 text-sm uppercase tracking-wide">{step.title}</h4>
                    <p className="font-sans text-primary-900/55 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn-primary">
              Planifica tu primera visita
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
