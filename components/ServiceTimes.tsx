import Link from "next/link";
import Image from "next/image";

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

export default function ServiceTimes() {
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
              <span className={`text-xs font-semibold uppercase tracking-widest mb-2 block ${s.featured ? "text-primary-300" : "text-primary-500"}`}>
                {s.tag}
              </span>
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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-7 py-5 bg-white rounded-2xl border shadow-sm"
          style={{ borderColor: "rgba(26,10,36,0.08)" }}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a href="https://www.google.com/maps?q=8.992472214531723,-79.7279901636073" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
              <Image src="/mercy.svg" alt="Ubicación" width={20} height={20} className="object-contain shrink-0" />
              <span className="font-sans text-sm text-navy-900/60 group-hover:text-primary-500 transition-colors duration-200">Arraiján, República de Panamá</span>
            </a>
            <span className="hidden sm:block text-navy-900/20 text-sm">•</span>
            <a href="https://www.google.com/maps?q=9.188834975184063,-79.6206907357167" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
              <Image src="/mercy.svg" alt="Ubicación" width={20} height={20} className="object-contain shrink-0" />
              <span className="font-sans text-sm text-navy-900/60 group-hover:text-primary-500 transition-colors duration-200">Talita Cumi, República de Panamá</span>
            </a>
          </div>
          <Link href="/contact" className="btn-primary text-xs py-2.5">Ver mapa →</Link>
        </div>
      </div>
    </section>
  );
}
