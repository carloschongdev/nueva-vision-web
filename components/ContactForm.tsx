"use client";

import emailjs from "@emailjs/browser";
import { useState } from "react";
import SectionHeader from "./SectionHeader";

const EMAILJS_SERVICE_ID = "service_f5quipi";
const EMAILJS_TEMPLATE_ID = "template_8jpquv2";
const EMAILJS_PUBLIC_KEY = "Acj6zZNRHMNDxvDoB";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn("Resend falló, intentando EmailJS...", err);
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: `${data.name} ${data.lastName}`,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS también falló:", err);
      setError(
        "No se pudo enviar el mensaje. Por favor escríbenos directamente a nuevavisionpty@gmail.com"
      );
    }

    setLoading(false);
  };

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
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-primary-900/50 uppercase tracking-widest mb-1.5">Nombre</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Tu nombre"
              className="w-full px-4 py-3 rounded-xl bg-stone-50 text-primary-900 placeholder-primary-900/30 text-sm outline-none focus:ring-2 focus:ring-primary-500/30 transition-all duration-200"
              style={{ border: "1px solid rgba(26,10,36,0.12)" }}
            />
          </div>
          <div>
            <label className="block text-xs text-primary-900/50 uppercase tracking-widest mb-1.5">Apellido</label>
            <input
              type="text"
              name="lastName"
              required
              placeholder="Tu apellido"
              className="w-full px-4 py-3 rounded-xl bg-stone-50 text-primary-900 placeholder-primary-900/30 text-sm outline-none focus:ring-2 focus:ring-primary-500/30 transition-all duration-200"
              style={{ border: "1px solid rgba(26,10,36,0.12)" }}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-primary-900/50 uppercase tracking-widest mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            required
            placeholder="tu@email.com"
            className="w-full px-4 py-3 rounded-xl bg-stone-50 text-primary-900 placeholder-primary-900/30 text-sm outline-none focus:ring-2 focus:ring-primary-500/30 transition-all duration-200"
            style={{ border: "1px solid rgba(26,10,36,0.12)" }}
          />
        </div>
        <div>
          <label className="block text-xs text-primary-900/50 uppercase tracking-widest mb-1.5">Asunto</label>
          <select
            name="subject"
            required
            className="w-full px-4 py-3 rounded-xl bg-stone-50 text-primary-900 text-sm outline-none focus:ring-2 focus:ring-primary-500/30 transition-all duration-200 appearance-none"
            style={{ border: "1px solid rgba(26,10,36,0.12)" }}
          >
            <option value="">Selecciona un tema</option>
            <option value="Quiero visitar la iglesia">Quiero visitar la iglesia</option>
            <option value="Petición de oración">Petición de oración</option>
            <option value="Grupos y ministerios">Grupos y ministerios</option>
            <option value="Pregunta general">Pregunta general</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-primary-900/50 uppercase tracking-widest mb-1.5">Mensaje</label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="¿En qué podemos servirte?"
            className="w-full px-4 py-3 rounded-xl bg-stone-50 text-primary-900 placeholder-primary-900/30 text-sm outline-none focus:ring-2 focus:ring-primary-500/30 transition-all duration-200 resize-none"
            style={{ border: "1px solid rgba(26,10,36,0.12)" }}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center py-4 disabled:opacity-60"
        >
          {loading ? "Enviando..." : "Enviar mensaje"}
        </button>
      </form>
    </div>
  );
}
