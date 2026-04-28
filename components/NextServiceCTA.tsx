"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ServiceInfo = {
  label: string;       // "Visítanos este martes"
  day: string;         // "Martes"
  time: string;        // "7:00 PM"
  daysUntil: number;   // 0 = hoy, 1 = mañana, etc.
};

/**
 * Horarios:
 *  Martes   19:00 – 21:00
 *  Viernes  19:00 – 21:00
 *  Domingo  10:00 – 13:00  (escuela 10AM, culto 11AM–1PM)
 *
 * Lógica "próximo culto":
 *  - Dom después de 13:00 → Martes
 *  - Lun → Martes
 *  - Mar antes de 19:00 → Martes (hoy)
 *  - Mar después de 19:00 → Viernes
 *  - Mié → Viernes
 *  - Jue → Viernes
 *  - Vie antes de 19:00 → Viernes (hoy)
 *  - Vie después de 19:00 → Domingo
 *  - Sáb → Domingo
 *  - Dom antes de 10:00 → Domingo (hoy)
 *  - Dom 10:00–13:00 → Domingo (en curso)
 */
function getNextService(): ServiceInfo {
  const now = new Date();
  const day = now.getDay();   // 0=Dom, 1=Lun, 2=Mar, 3=Mié, 4=Jue, 5=Vie, 6=Sáb
  const hour = now.getHours();
  const min  = now.getMinutes();
  const timeNum = hour * 60 + min; // minutos desde medianoche

  const T19 = 19 * 60; // 19:00
  const T10 = 10 * 60; // 10:00
  const T13 = 13 * 60; // 13:00

  // Domingo
  if (day === 0) {
    if (timeNum < T13) {
      // Antes de la 1PM — domingo en curso o próximo
      const label = timeNum < T10
        ? "Visítanos este domingo"
        : "Estamos en culto — únete";
      return { label, day: "Domingo", time: "10:00 AM", daysUntil: 0 };
    }
    // Después de 1PM del domingo → próximo es martes
    return { label: "Visítanos este martes", day: "Martes", time: "7:00 PM", daysUntil: 2 };
  }

  // Lunes
  if (day === 1) {
    return { label: "Visítanos este martes", day: "Martes", time: "7:00 PM", daysUntil: 1 };
  }

  // Martes
  if (day === 2) {
    if (timeNum < T19) {
      return { label: "Visítanos esta noche", day: "Martes", time: "7:00 PM", daysUntil: 0 };
    }
    return { label: "Visítanos este viernes", day: "Viernes", time: "7:00 PM", daysUntil: 3 };
  }

  // Miércoles
  if (day === 3) {
    return { label: "Visítanos este viernes", day: "Viernes", time: "7:00 PM", daysUntil: 2 };
  }

  // Jueves
  if (day === 4) {
    return { label: "Visítanos este viernes", day: "Viernes", time: "7:00 PM", daysUntil: 1 };
  }

  // Viernes
  if (day === 5) {
    if (timeNum < T19) {
      return { label: "Visítanos esta noche", day: "Viernes", time: "7:00 PM", daysUntil: 0 };
    }
    return { label: "Visítanos este domingo", day: "Domingo", time: "10:00 AM", daysUntil: 2 };
  }

  // Sábado
  return { label: "Visítanos este domingo", day: "Domingo", time: "10:00 AM", daysUntil: 1 };
}

interface Props {
  className?: string;
  variant?: "amber" | "outline-white" | "outline-dark";
  showBadge?: boolean;
}

export default function NextServiceCTA({
  className = "",
  variant = "amber",
  showBadge = true,
}: Props) {
  const [service, setService] = useState<ServiceInfo | null>(null);

  useEffect(() => {
    setService(getNextService());
  }, []);

  const href = "/contact";

  if (!service) {
    // SSR placeholder — sin hidration mismatch
    const base =
      variant === "primary"
        ? "btn-primary"
        : variant === "outline-white"
        ? "inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/30 hover:border-white/60 text-white font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-white/5"
        : "btn-outline";

    return (
      <Link href={href} className={`${base} ${className}`}>
        Visítanos →
      </Link>
    );
  }

  const isToday   = service.daysUntil === 0;
  const isTomorrow = service.daysUntil === 1;

  const baseClasses =
    variant === "primary"
      ? "btn-primary"
      : variant === "outline-white"
      ? "inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/30 hover:border-white/60 text-white font-sans font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-white/5"
      : "btn-outline";

  return (
    <Link
      href={href}
      className={`${baseClasses} ${className} relative`}
    >
      {/* Live badge for today's service */}
      {showBadge && isToday && (
        <span className="flex items-center gap-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
        </span>
      )}

      <span>
        {service.label}
        {showBadge && (
          <span className={`ml-1.5 text-xs font-normal opacity-70`}>
            · {service.time}
          </span>
        )}
      </span>

      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </Link>
  );
}