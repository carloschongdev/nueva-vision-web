"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const steps = [
  { num: "01", title: "Eres bienvenido",   desc: "Nuestro equipo te recibirá y responderá tus preguntas desde el inicio." },
  { num: "02", title: "Vive el culto",     desc: "Música de adoración, un mensaje bíblico relevante y un ambiente cálido." },
  { num: "03", title: "Conéctate",         desc: "Quédate después, toma un café y conoce a nuestra familia." },
];

export default function VisitSection() {
  const [showDonation, setShowDonation] = useState(false);

  return (
    <>
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-last lg:order-first">
              <div className="absolute -left-6 -bottom-6 w-48 h-48 bg-primary-900 rounded-3xl -z-0" />
              <div className="absolute -right-3 -top-3 w-20 h-20 bg-primary-400 rounded-2xl -z-0 opacity-60" />
              <button
                onClick={() => setShowDonation(true)}
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/15 w-full cursor-pointer group block"
                aria-label="Ver información de donaciones"
              >
                <Image
                  src="https://images.unsplash.com/photo-1591522810850-58128c5fb089?w=800&q=80"
                  alt="Donaciones" width={640} height={480} className="object-cover w-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-primary-900 font-sans font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg">
                    Ver información de donaciones
                  </span>
                </div>
              </button>
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

      {/* Donations modal */}
      {showDonation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={() => setShowDonation(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDonation(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-primary-900/5 hover:bg-primary-900/10 transition-colors text-primary-900/60 hover:text-primary-900"
              aria-label="Cerrar"
            >
              ✕
            </button>

            <Image src="/mercy.svg" alt="" width={36} height={36} className="object-contain mb-4" />
            <h2 className="font-display text-2xl font-semibold text-primary-900 mb-1">
              Información para Donaciones
            </h2>
            <div className="w-10 h-1 rounded-full bg-primary-500 mb-6" />

            <div className="space-y-4">
              <div
                className="rounded-xl p-4"
                style={{ background: "#f5f0fa", border: "1px solid rgba(107,39,138,0.12)" }}
              >
                <p className="text-primary-500 text-xs font-bold uppercase tracking-widest mb-2">
                  Datos bancarios
                </p>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-sm text-primary-900/60">Banco</span>
                    <span className="font-sans font-semibold text-sm text-primary-900">Banco General</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-sm text-primary-900/60">Nombre</span>
                    <span className="font-sans font-semibold text-sm text-primary-900">La Misericordia</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-sm text-primary-900/60">Cuenta</span>
                    <span className="font-sans font-semibold text-sm text-primary-900 tracking-wider">
                      04-62-00-002262-0
                    </span>
                  </div>
                </div>
              </div>
              <p className="font-sans text-xs text-primary-900/40 text-center leading-relaxed">
                Gracias por apoyar la expansión del Evangelio en Panamá.
                Tu generosidad hace posible la obra en el Darién y más allá.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
