"use client";

import { useState } from "react";
import Image from "next/image";

export default function DonationsSection() {
  const [show, setShow] = useState(false);

  return (
    <>
      <section className="py-14 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-7 cursor-pointer hover:-translate-y-0.5 transition-all duration-300 group"
            style={{ background: "#f5f0fa", border: "1px solid rgba(107,39,138,0.15)" }}
            onClick={() => setShow(true)}
          >
            <div>
              <p className="text-primary-500 text-xs font-bold uppercase tracking-widest mb-1">
                Apoya el ministerio
              </p>
              <h3 className="font-display text-2xl font-semibold text-primary-900">
                Donaciones
              </h3>
              <p className="font-sans text-primary-900/55 text-sm mt-1">
                Tu ofrenda sostiene la obra de Dios en Panamá y el Darién.
              </p>
            </div>
            <button
              className="btn-primary shrink-0"
              onClick={(e) => { e.stopPropagation(); setShow(true); }}
            >
              Ver información
            </button>
          </div>
        </div>
      </section>

      {show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={() => setShow(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-primary-900/5 hover:bg-primary-900/10 transition-colors text-primary-900/60 hover:text-primary-900"
              aria-label="Cerrar"
            >
              ✕
            </button>

            <div className="mb-1">
              <Image src="/mercy.svg" alt="" width={36} height={36} className="object-contain mb-4" />
            </div>
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
