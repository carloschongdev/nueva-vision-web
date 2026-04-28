import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-4 mb-5">
            <Image
              src="/mercy.svg"
              alt="Logo"
              width={64}
              height={64}
              className="object-contain brightness-0 invert opacity-90"
            />
            <div>
              <p className="font-display font-semibold text-xl leading-tight text-white">Nueva Visión</p>
              <p className="text-primary-300 text-xs font-sans uppercase tracking-widest mt-0.5">La Misericordia</p>
            </div>
          </div>
          <p className="font-sans text-white/50 text-sm leading-relaxed max-w-xs">
            Una comunidad cristiana en Panamá donde cada persona es bienvenida para conocer a Dios y crecer en fe auténtica.
          </p>
          <div className="flex gap-3 mt-6">
            {[{ label: "Facebook", short: "fb" }, { label: "Instagram", short: "ig" }, { label: "YouTube", short: "yt" }].map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/50 hover:border-primary-500/50 hover:text-primary-300 transition-all duration-200 text-xs font-bold">
                {s.short}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-sans font-semibold text-xs uppercase tracking-widest mb-5">Secciones</h4>
          <ul className="space-y-2.5">
            {[{ label: "Inicio", href: "/" }, { label: "Nosotros", href: "/about" }, { label: "Predicaciones", href: "/sermons" }, { label: "Contacto", href: "/contact" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="font-sans text-sm text-white/50 hover:text-primary-300 transition-colors duration-200">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-sans font-semibold text-xs uppercase tracking-widest mb-5">Horarios</h4>
          <ul className="space-y-3 text-sm">
            {[{ day: "Martes", time: "7:00 – 9:00 PM" }, { day: "Viernes", time: "7:00 – 9:00 PM" }, { day: "Domingo", time: "10:00 AM – 1:00 PM" }].map((h) => (
              <li key={h.day} className="flex justify-between gap-3">
                <span className="text-white/50">{h.day}</span>
                <span className="text-primary-300 font-medium">{h.time}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-5 border-t border-white/5 space-y-1">
            <p className="text-white/40 text-xs">📍 Arraiján, Panamá</p>
            <a href="tel:+50760000000" className="text-white/40 text-xs hover:text-primary-300 transition-colors block">📞 +507 6000-0000</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 px-6 text-center">
        <p className="font-sans text-white/25 text-xs">© {year} Iglesia Nueva Visión La Misericordia — Arraiján, Panamá.</p>
      </div>
    </footer>
  );
}
