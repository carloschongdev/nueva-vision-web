"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div>
        <SectionHeader eyebrow="Escríbenos" title="Envía un" italicPart="mensaje" centered={false} />
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: "#f5f0fa", border: "1px solid rgba(107,39,138,0.15)" }}
        >
          <div className="text-4xl mb-4">✅</div>
          <h3 className="font-display text-xl font-semibold text-primary-900 mb-2">
            ¡Mensaje recibido!
          </h3>
          <p className="font-sans text-primary-900/60 text-sm leading-relaxed">
            Gracias por escribirnos. Te responderemos en las próximas 24 horas.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 text-xs font-sans text-primary-500 hover:text-primary-700 transition-colors underline underline-offset-2"
          >
            Enviar otro mensaje
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader eyebrow="Escríbenos" title="Envía un" italicPart="mensaje" centered={false} />
      <form
        className="space-y-4"
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      >
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
      </form>
    </div>
  );
}
