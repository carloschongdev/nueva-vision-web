"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { initialLocations } from "@/lib/churches";

const WazeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="#33ccff" d="M20.5 6.2C19 3.2 16.2 1.3 13 1A11 11 0 001 13c.2 3.2 2.1 6.1 5 7.6L4.9 23l3.9-1.9A11 11 0 0023 13c-.2-2.6-1.2-5-2.5-6.8z"/>
    <circle fill="white" cx="9.2" cy="11.5" r="1.2"/>
    <circle fill="white" cx="14.8" cy="11.5" r="1.2"/>
    <path fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" d="M9.2 14.5c.7.8 1.6 1.2 2.8 1.2s2.1-.4 2.8-1.2"/>
  </svg>
);

const services = [
  {
    day: "Martes", tag: "Entre semana",
    schedule: [{ name: "Culto de oración", time: "7:00 PM – 9:00 PM" }],
    featured: false,
  },
  {
    day: "Viernes", tag: "Entre semana",
    schedule: [{ name: "Noche de avivamiento", time: "7:00 PM – 9:00 PM" }],
    featured: false,
  },
  {
    day: "Domingo", tag: "Culto principal",
    schedule: [
      { name: "Escuela Dominical", time: "10:00 AM – 11:00 AM" },
      { name: "Culto Principal",   time: "11:00 AM – 1:00 PM" },
    ],
    featured: true,
  },
];

// Strip the common long prefix for compact display
function shortName(name: string): string {
  return name.replace("Iglesia Nueva Visión La Misericordia ", "");
}

const MOBILE_LIMIT = 2;

export default function ServiceTimes() {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const hiddenCount = initialLocations.length - MOBILE_LIMIT;
  const mobileVisible = mobileExpanded ? initialLocations : initialLocations.slice(0, MOBILE_LIMIT);

  return (
    <section className="py-24 px-6 bg-stone-50 stripe-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="eyebrow">Encuéntranos</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary-900">Horarios de culto</h2>
          <div className="divider mx-auto" />
          <p className="text-primary-900/60 text-base max-w-md mx-auto font-sans">
            Tres oportunidades a la semana para adorar, aprender y crecer juntos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {services.map((s) => (
            <div key={s.day}
              className={`rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                s.featured ? "bg-primary-900 shadow-xl shadow-primary-900/20" : "bg-white shadow-sm hover:shadow-md"
              }`}
              style={!s.featured ? { border: "1px solid rgba(26,10,36,0.08)" } : {}}>
              <span className="sr-only">{s.tag}</span>
              <h3 className={`font-display text-3xl font-semibold mb-5 ${s.featured ? "text-white" : "text-primary-900"}`}>{s.day}</h3>
              <div className="space-y-3">
                {s.schedule.map((item) => (
                  <div key={item.name}
                    className={`flex flex-col gap-0.5 pb-3 border-b last:border-0 ${s.featured ? "border-white/10" : ""}`}
                    style={!s.featured ? { borderColor: "rgba(26,10,36,0.08)" } : {}}>
                    <span className={`font-sans font-medium text-sm ${s.featured ? "text-white/90" : "text-primary-900"}`}>{item.name}</span>
                    <span className={`font-sans font-semibold text-base ${s.featured ? "text-primary-300" : "text-primary-500"}`}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Location bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 py-4 bg-white rounded-2xl border shadow-sm"
          style={{ borderColor: "rgba(26,10,36,0.08)" }}
        >
          {/* Desktop: horizontal scroll */}
          <div
            className="hidden sm:block flex-1 overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            <div className="flex items-center gap-2 min-w-max pr-4">
              {initialLocations.map((loc, i) => (
                <div key={loc.id} className="flex items-center gap-2 shrink-0">
                  {i > 0 && <span className="text-navy-900/20 text-sm">·</span>}
                  <div className="flex items-center gap-1">
                    <Image src="/mercy.svg" alt="" width={14} height={14} className="object-contain shrink-0" />
                    <a
                      href={loc.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-xs text-navy-900/60 hover:text-primary-500 transition-colors whitespace-nowrap"
                    >
                      {shortName(loc.name)}
                    </a>
                    <a
                      href={`https://waze.com/ul?ll=${loc.coords[1]},${loc.coords[0]}&navigate=yes`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Waze: ${shortName(loc.name)}`}
                      className="shrink-0 hover:scale-110 transition-transform"
                    >
                      <WazeIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: stacked, limited */}
          <div className="sm:hidden flex flex-col gap-2 w-full">
            {mobileVisible.map((loc) => (
              <div key={loc.id} className="flex items-center gap-1.5">
                <Image src="/mercy.svg" alt="" width={14} height={14} className="object-contain shrink-0" />
                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs text-navy-900/60 hover:text-primary-500 transition-colors flex-1"
                >
                  {shortName(loc.name)}
                </a>
                <a
                  href={`https://waze.com/ul?ll=${loc.coords[1]},${loc.coords[0]}&navigate=yes`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Waze: ${shortName(loc.name)}`}
                  className="shrink-0 hover:scale-110 transition-transform"
                >
                  <WazeIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
            {!mobileExpanded && hiddenCount > 0 && (
              <button
                onClick={() => setMobileExpanded(true)}
                className="text-xs text-primary-500 font-sans font-medium text-left hover:text-primary-700 transition-colors"
              >
                ... y {hiddenCount} más
              </button>
            )}
          </div>

          <Link href="/contact" className="btn-primary text-xs py-2.5 shrink-0">Ver mapa →</Link>
        </div>
      </div>
    </section>
  );
}
