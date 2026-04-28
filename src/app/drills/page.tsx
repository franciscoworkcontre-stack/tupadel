import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drills de Pádel — Ejercicios por Nivel y Modalidad | Pulso Pádel",
  description: "Drills de entrenamiento de pádel organizados por modalidad (pareja, cuadro, solo) y nivel. Con duración, objetivo y variantes para cada ejercicio.",
};

const catColors: Record<number, string> = {
  1: "#DC2626", 2: "#EA580C", 3: "#D97706", 4: "#65A30D", 5: "#0891B2", 6: "#7C3AED",
};

const drills = [
  {
    slug: "paralela-3-4",
    nombre: "Paralela 3–4",
    modalidad: "Pareja",
    duracion: "20 min",
    cat: 5,
    intensidad: "Media",
    desc: "El fundamento del juego de fondo. Consistencia y dirección en paralela desde el fondo de cancha.",
    objetivo: "Construir confianza en el golpe base y mantener la pelota en juego.",
  },
  {
    slug: "red-fondo",
    nombre: "Red vs Fondo",
    modalidad: "Pareja",
    duracion: "15 min",
    cat: 5,
    intensidad: "Media",
    desc: "Un jugador ataca en red, el otro defiende desde el fondo con globos y bajadas.",
    objetivo: "Entrenar la transición y la presión de red contra defensa.",
  },
  {
    slug: "globos-cruzados",
    nombre: "Globos cruzados",
    modalidad: "Pareja",
    duracion: "10 min",
    cat: 6,
    intensidad: "Baja",
    desc: "Consistencia defensiva: los dos jugadores se envían globos cruzados sin dejar caer.",
    objetivo: "Control de globo, timing y profundidad.",
  },
  {
    slug: "bandeja-cierre",
    nombre: "Bandeja + cierre",
    modalidad: "Pareja",
    duracion: "15 min",
    cat: 5,
    intensidad: "Alta",
    desc: "Bandeja y cierre inmediato de red. El movimiento más importante del pádel ofensivo.",
    objetivo: "Automatizar la secuencia bandeja–paso adelante–volea de cierre.",
  },
  {
    slug: "volea-baja",
    nombre: "Volea baja bajo presión",
    modalidad: "Pareja",
    duracion: "15 min",
    cat: 4,
    intensidad: "Alta",
    desc: "Recibir disparos duros y bajos en la red, neutralizar y mantener la posición.",
    objetivo: "Volea baja controlada sin retroceder ni cometer errores no forzados.",
  },
  {
    slug: "cuadro-puntos",
    nombre: "Puntos por cuadros",
    modalidad: "Cuadro",
    duracion: "30 min",
    cat: 4,
    intensidad: "Alta",
    desc: "La forma más eficiente de entrenar en cuatro. Puntos cortos de 3–5 golpes con objetivo definido.",
    objetivo: "Aplicar táctica bajo presión de partido en bloques cortos.",
  },
  {
    slug: "diagonales-fondo",
    nombre: "Diagonales de fondo",
    modalidad: "Pareja",
    duracion: "20 min",
    cat: 5,
    intensidad: "Media",
    desc: "Cruce de diagonales desde el fondo. El patrón que más se repite en un partido.",
    objetivo: "Control de dirección y profundidad en diagonal.",
  },
  {
    slug: "lob-smash",
    nombre: "Globo–Remate",
    modalidad: "Pareja",
    duracion: "15 min",
    cat: 5,
    intensidad: "Media",
    desc: "Un jugador lanza globos, el otro practica el remate con salida de pared.",
    objetivo: "Decisión rápida entre rematar dentro o dejar salir a la pared.",
  },
  {
    slug: "tres-en-red",
    nombre: "Tres en red (1 vs 2)",
    modalidad: "Cuadro",
    duracion: "20 min",
    cat: 3,
    intensidad: "Alta",
    desc: "Dos jugadores en red contra uno que defiende desde el fondo. Rotación cada punto.",
    objetivo: "Presión de red coordinada y cobertura de diagonal.",
  },
  {
    slug: "pared-contrapared",
    nombre: "Pared y contrapared",
    modalidad: "Pareja",
    duracion: "15 min",
    cat: 4,
    intensidad: "Media",
    desc: "Jugar pelotas que rebotan en las paredes laterales y aprender a salir de cada una.",
    objetivo: "Timing en contrapared y salida constructiva.",
  },
  {
    slug: "vibora-cruzada",
    nombre: "Víbora cruzada",
    modalidad: "Pareja",
    duracion: "15 min",
    cat: 4,
    intensidad: "Alta",
    desc: "Repetición de víboras cruzadas desde posición de red, con globo de vuelta del defensor.",
    objetivo: "Automatizar la pronación y la dirección cruzada de la víbora.",
  },
  {
    slug: "puntos-desde-saque",
    nombre: "Puntos desde saque",
    modalidad: "Cuadro",
    duracion: "30 min",
    cat: 3,
    intensidad: "Alta",
    desc: "Puntos completos desde saque. Énfasis en las primeras 3–5 pelotas y la toma de red.",
    objetivo: "Aplicar el plan de juego desde el primer golpe.",
  },
];

const modalidades = ["Pareja", "Cuadro", "Solo"] as const;
type Modalidad = typeof modalidades[number];

const modalidadDesc: Record<Modalidad, string> = {
  Pareja: "Ejercicios para dos jugadores. Ideal para entrenamiento diario.",
  Cuadro: "Ejercicios para cuatro. Más dinámico y con presión de partido.",
  Solo: "Para trabajar técnica sin compañero. Con pared o máquina.",
};

export default function DrillsPage() {
  const porModalidad = (m: string) => drills.filter((d) => d.modalidad === m);

  return (
    <>
      <Navbar activeSection="/aprender" />
      <main>
        <section className="px-6 md:px-8 py-10 md:py-14 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">
              <Link href="/aprender" className="hover:text-ink transition-colors">← Aprender</Link>
              <span className="mx-2">·</span>
              <span>Drills</span>
            </div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              Drills de entrenamiento
            </h1>
            <p className="text-ink-muted text-xl mt-4 max-w-2xl leading-relaxed">
              Ejercicios concretos organizados por modalidad y nivel. Cada drill tiene objetivo claro, duración y variantes.
            </p>
          </div>
        </section>

        {(["Pareja", "Cuadro"] as Modalidad[]).map((modalidad) => {
          const lista = porModalidad(modalidad);
          if (!lista.length) return null;
          return (
            <section key={modalidad} className="px-6 md:px-8 py-12 max-w-[1400px] mx-auto border-b border-line last:border-0">
              <div className="mb-8">
                <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">→ {modalidad}</div>
                <h2 className="display text-2xl md:text-3xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
                  {modalidad === "Pareja" ? "En pareja" : "En cuadro (4 jugadores)"}
                </h2>
                <p className="text-sm text-ink-muted mt-2">{modalidadDesc[modalidad]}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lista.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/drills/${d.slug}`}
                    className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: catColors[d.cat] }} />
                        <span className="mono text-[10px] text-ink-soft uppercase">Cat {d.cat}+</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="mono text-[10px] border border-line px-2 py-0.5 rounded text-ink-soft">{d.duracion}</span>
                        <span className="mono text-[10px] border border-line px-2 py-0.5 rounded text-ink-soft">{d.intensidad}</span>
                      </div>
                    </div>
                    <div className="display text-lg font-semibold mb-2 group-hover:text-ink transition-colors">
                      {d.nombre}
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed mb-3">{d.desc}</p>
                    <div className="text-xs text-ink-soft">
                      <span className="font-semibold text-ink-muted">Objetivo:</span> {d.objetivo}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <section className="px-6 md:px-8 py-10 border-t border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/golpes" className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors">
                <div className="mono text-xs text-ink-soft uppercase mb-3">→ Técnica</div>
                <div className="display text-xl font-semibold mb-2">Guías de golpes</div>
                <p className="text-sm text-ink-muted">Bandeja, víbora, remate, globo, X3, X4 y más. Antes del drill, dominá el golpe.</p>
              </Link>
              <Link href="/tacticas" className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors">
                <div className="mono text-xs text-ink-soft uppercase mb-3">→ Estrategia</div>
                <div className="display text-xl font-semibold mb-2">Tácticas de partido</div>
                <p className="text-sm text-ink-muted">Presión en red, bajada de pared, rotura de parejas. Los principios detrás de los drills.</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
