import type { Metadata } from "next";
import Link from "next/link";
import { initialLocations } from "@/lib/churches";

const provinceNames: Record<string, string> = {
  PA5: "Darién",
  PA8: "Panamá",
  PA10: "Panamá Oeste",
};

const churchContent: Record<
  string,
  {
    historia: string;
    pastor: string;
    cargo: string;
    fundacion: string;
  }
> = {
  "talitacumi": {
    historia:
      "Iglesia Talita Cumi nació con el propósito de llevar el evangelio a la comunidad de Panamá. Con un equipo comprometido, esta congregación ha sido un punto de encuentro para familias que buscan crecer en su fe.",
    pastor: "Por confirmar",
    cargo: "Pastor Principal",
    fundacion: "2020",
  },
  "cristo-vive-el-chungal": {
    historia:
      "Surgió de un avivamiento que comenzó con un pequeño grupo de jóvenes en la comunidad de El Chungal. Con el paso de los años creció hasta convertirse en una congregación que alcanza a familias de toda la región. Su nombre refleja el testimonio de vidas restauradas por el poder del Evangelio.",
    pastor: "Hno. Carlos Díaz",
    cargo: "Pastor Principal",
    fundacion: "2018",
  },
  garachine: {
    historia:
      "La iglesia en Garachiné nació del corazón de un grupo de familias que buscaban establecer una comunidad de fe en esta localidad costera del Darién. Desde sus inicios ha sido un faro de esperanza para las comunidades de la región. Hoy sirve fielmente a pescadores y familias de la costa.",
    pastor: "Hno. Manuel Rodríguez",
    cargo: "Pastor Principal",
    fundacion: "2012",
  },
  "calle-larga": {
    historia:
      "Fundada como respuesta a la necesidad espiritual de la zona, esta congregación ha crecido fielmente sirviendo a familias y jóvenes de la comunidad. La iglesia comenzó en el hogar de un matrimonio comprometido con ver su comunidad transformada. Hoy es un punto de referencia espiritual en Calle Larga.",
    pastor: "Hno. José Palma",
    cargo: "Pastor Principal",
    fundacion: "2015",
  },
  papayal: {
    historia:
      "Comenzó con reuniones en hogares hasta establecerse como una congregación local con identidad propia. El Señor levantó líderes locales que se comprometieron a servir a su comunidad. Su crecimiento es testimonio de la fidelidad de Dios en lugares remotos.",
    pastor: "Hno. Antonio Ríos",
    cargo: "Pastor Principal",
    fundacion: "2016",
  },
  "rio-de-jesus": {
    historia:
      "Su origen está marcado por la labor misionera de creyentes que viajaron río adentro con el propósito de plantar semillas de fe. La congregación creció alrededor de familias ribereñas que encontraron en el Evangelio esperanza y comunidad. El río que la bautiza es símbolo del fluir del Espíritu en este lugar.",
    pastor: "Hno. Santiago Flores",
    cargo: "Pastor Principal",
    fundacion: "2014",
  },
  daipuru: {
    historia:
      "La iglesia en Daipurú fue plantada en medio de una comunidad con el deseo de ver el Evangelio arraigarse en la cultura local. Desde sus primeros pasos ha trabajado para ser una iglesia relevante y contextualizada en su entorno. La comunidad ha encontrado en este espacio un lugar de encuentro con Dios.",
    pastor: "Hno. Pedro Cáceres",
    cargo: "Pastor Principal",
    fundacion: "2017",
  },
  "la-colonia": {
    historia:
      "Nació cuando un grupo de familias llegó a la región y se unió para adorar a Dios en su nueva tierra. Su historia es la de una comunidad que encontró unidad en Cristo. La iglesia es hoy un ejemplo de integración y servicio en La Colonia.",
    pastor: "Hno. Luis Guerrero",
    cargo: "Pastor Principal",
    fundacion: "2019",
  },
  sambu: {
    historia:
      "La iglesia en Sambú comenzó a orillas del río con un pequeño grupo de creyentes que se reunía bajo un árbol. Con el tiempo levantaron su primer techo y la congregación fue creciendo. Hoy es un testimonio de perseverancia y fe en el corazón del Darién.",
    pastor: "Hno. Roberto Chávez",
    cargo: "Pastor Principal",
    fundacion: "2013",
  },
  "la-chunga": {
    historia:
      "Surge de la visión de alcanzar comunidades remotas con el mensaje de esperanza de Jesucristo. Un pastor itinerante plantó la primera semilla y comunidades cercanas respondieron con fe. La iglesia en La Chunga es hoy una comunidad activa de discípulos comprometidos.",
    pastor: "Hno. Ernesto Morales",
    cargo: "Pastor Principal",
    fundacion: "2016",
  },
  taimati: {
    historia:
      "La congregación en Taimati fue levantada por hombres y mujeres que creyeron que su comunidad podía ser transformada. En medio de las dificultades propias de la región, la iglesia se mantuvo fiel y creció. Sus frutos son familias restauradas y jóvenes con propósito.",
    pastor: "Hno. Felipe Torres",
    cargo: "Pastor Principal",
    fundacion: "2015",
  },
  cemaco: {
    historia:
      "Cemaco es una de las congregaciones más jóvenes del ministerio, nacida del deseo de no dejar sin cobertura espiritual a esta comunidad. Su fundación fue el resultado de años de oración y trabajo misionero silencioso. Hoy celebra sus cultos con una comunidad unida y en crecimiento.",
    pastor: "Hno. Daniel Salas",
    cargo: "Pastor Principal",
    fundacion: "2020",
  },
  "rio-tigre": {
    historia:
      "La iglesia en Río Tigre es fruto de la obediencia de creyentes que respondieron al llamado de ir a las regiones más remotas del Darién. Sus comienzos fueron humildes pero la fidelidad de Dios la sostuvo. Hoy permanece como señal del alcance del amor de Cristo hasta los lugares más lejanos.",
    pastor: "Hno. Marcos Aizpurúa",
    cargo: "Pastor Principal",
    fundacion: "2018",
  },
};

export function generateStaticParams() {
  return initialLocations
    .filter((l) => l.id !== "arraijan")
    .map((l) => ({ id: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const loc = initialLocations.find((l) => l.id === id);
  return {
    title: loc?.name ?? id,
  };
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default async function IglesiaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const loc = initialLocations.find((l) => l.id === id);
  const content = churchContent[id];

  if (!loc || !content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-32 gap-6">
        <p className="font-display text-2xl text-primary-800">
          Iglesia no encontrada.
        </p>
        <Link
          href="/about"
          className="text-primary-500 hover:text-primary-700 font-sans text-sm font-medium transition-colors"
        >
          ← Volver a Nosotros
        </Link>
      </div>
    );
  }

  const provinceName = provinceNames[loc.province] ?? loc.province;

  return (
    <>
      <section className="bg-[#6b278b] pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/about"
            className="text-purple-200 hover:text-white font-sans text-sm font-medium transition-colors inline-block mb-8"
          >
            ← Volver a Nosotros
          </Link>
          <span className="inline-block text-purple-200 text-sm mb-4 border border-purple-400/40 rounded-full px-3 py-1">
            {provinceName}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white leading-tight">
            {loc.name}
          </h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-16">
        <section>
          <p className="eyebrow">Historia</p>
          <h2 className="font-display text-3xl font-semibold text-primary-800 leading-tight mb-4">
            Nuestra Historia
          </h2>
          <div className="w-12 h-1 bg-primary-400 rounded-full mb-6" />
          <p className="font-sans text-primary-800/60 leading-relaxed">
            {content.historia}
          </p>
        </section>

        <section>
          <p className="eyebrow">Liderazgo</p>
          <h2 className="font-display text-3xl font-semibold text-primary-800 leading-tight mb-8">
            Pastor de la iglesia
          </h2>
          <div
            className="flex items-center gap-6 p-6 rounded-2xl bg-white"
            style={{ border: "1px solid rgba(8,15,46,0.07)" }}
          >
            <div className="w-24 h-24 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
              <span className="font-display text-2xl text-stone-500">
                {getInitials(content.pastor)}
              </span>
            </div>
            <div>
              <p className="font-display text-xl font-semibold text-primary-800">
                {content.pastor}
              </p>
              <p className="font-sans text-primary-800/55 text-sm mt-1">
                {content.cargo}
              </p>
              <p className="font-sans text-primary-800/40 text-sm mt-1">
                Fundada en {content.fundacion}
              </p>
            </div>
          </div>
        </section>

        <section>
          <p className="eyebrow">Ubicación</p>
          <h2 className="font-display text-3xl font-semibold text-primary-800 leading-tight mb-6">
            Encuéntranos
          </h2>
          <a
            href={loc.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6b278b] text-white font-sans font-semibold text-sm hover:bg-[#5a1f76] transition-colors"
          >
            📍 Ver en Google Maps
          </a>
        </section>

        <div className="pt-4 border-t border-stone-200">
          <Link
            href="/about"
            className="text-primary-500 hover:text-primary-700 font-sans text-sm font-medium transition-colors"
          >
            ← Volver a Nosotros
          </Link>
        </div>
      </div>
    </>
  );
}
