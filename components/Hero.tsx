"use client";

import Image from "next/image";
import Link from "next/link";
import NextServiceCTA from "@/components/NextServiceCTA";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <Image
        src="/church-interior.jpg"
        alt="Congregación en culto"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/70 to-primary-950/20" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary-500 to-transparent opacity-60" />

      <div className="relative z-10 w-full pb-24 pt-40 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 animate-slide-up opacity-0 delay-100">
              <div className="w-8 h-px bg-primary-500" />
              <span className="text-primary-300 text-xs font-semibold uppercase tracking-[0.35em]">
                Iglesia Nueva Visión La Misericordia · Panamá
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white leading-none mb-8 animate-slide-up opacity-0 delay-200">
              Un refugio en la
              <br />
              <span className="italic text-primary-300">presencia</span>
              <br />
              de Dios
            </h1>

            <p className="font-sans text-lg text-white/70 max-w-lg mb-10 leading-relaxed animate-slide-up opacity-0 delay-300">
              Somos una iglesia en Panamá donde puedes encontrarte con Dios
              y ser transformado(a), y donde lo imposible comienza a tomar
              forma en la presencia de Dios.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up opacity-0 delay-400">
            <NextServiceCTA
              variant="amber"
              showBadge={true}
              className="shadow-lg shadow-amber-500/30"
            />
              <Link
                href="/sermons"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/30 hover:border-white/60 text-white font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-white/5"
              >
                Ver predicaciones
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden max-w-2xl animate-fade-in opacity-0 delay-600">
            {[
              { num: "3",     label: "Cultos semanales" },
              { num: "+30",   label: "Años de ministerio" },
              { num: "Todos", label: "Son bienvenidos" },
            ].map((s) => (
              <div key={s.label} className="bg-primary-950/60 backdrop-blur-sm px-6 py-5 text-center">
                <p className="font-display text-2xl font-semibold text-primary-300">{s.num}</p>
                <p className="text-white/60 text-xs font-sans mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 animate-float">
        <div className="w-px h-10 bg-gradient-to-b from-primary-500/60 to-transparent" />
        <span className="text-white/40 text-[10px] uppercase tracking-widest rotate-90 origin-center translate-x-3">scroll</span>
      </div>
    </section>
  );
}
