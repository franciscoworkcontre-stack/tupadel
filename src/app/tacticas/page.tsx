import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tácticas de Pádel — Estrategia por Nivel | Pulso Pádel",
  description: "Tácticas y estrategias de pádel explicadas por nivel: presión en red, salida de globo, el lado del revés, bajada de pared y más. Del Cat 6 al Cat 1.",
};

const catColors: Record<number, string> = {
  1: "#DC2626", 2: "#EA580C", 3: "#D97706", 4: "#65A30D", 5: "#0891B2", 6: "#7C3AED",
};

const tacticas = [
  {
    slug: "presion-en-red",
    nombre: "Presión en red",
    cat: 3,
    nivel: "Intermedio alto",
    desc: "Cómo mantener la presión cuando tenés la red. El secreto del pádel moderno.",
    pilares: ["Posición adelantada", "Volea baja al pie", "Cierre rápido"],
  },
  {
    slug: "salida-de-globo",
    nombre: "Salida de globo",
    cat: 5,
    nivel: "Intermedio bajo",
    desc: "Cómo defender un globo rival y no perder el punto defensivamente.",
    pilares: ["Lectura temprana", "Posición de espera", "Golpe de salida"],
  },
  {
    slug: "tres-cuartos",
    nombre: "El tres cuartos",
    cat: 4,
    nivel: "Intermedio",
    desc: "La posición en cancha que maximiza el control del punto desde la red.",
    pilares: ["Línea de tres cuartos", "Cobertura de diagonal", "Transición"],
  },
  {
    slug: "el-lado-del-reves",
    nombre: "El lado del revés",
    cat: 4,
    nivel: "Intermedio",
    desc: "Por qué atacar siempre al revés del rival y cómo ejecutarlo sistemáticamente.",
    pilares: ["Dirección de ataque", "Diagonal al revés", "Cambio de ritmo"],
  },
  {
    slug: "bajada-de-pared",
    nombre: "Bajada de pared",
    cat: 4,
    nivel: "Intermedio",
    desc: "Cómo usar la pared del rival para recuperar la red. La clave de la defensa activa.",
    pilares: ["Lectura del rebote", "Timing de golpe", "Recuperación de posición"],
  },
  {
    slug: "rotura-de-parejas",
    nombre: "Rotura de parejas",
    cat: 3,
    nivel: "Intermedio alto",
    desc: "Crear descoordinación entre los rivales mediante diagonales y el cuerpo.",
    pilares: ["Pelota al cuerpo", "Diagonal cruzada", "Cambio de objetivo"],
  },
];

const grupos = [
  { label: "Fundamentos", cats: [5, 6], desc: "Posición, comunicación y primeros conceptos tácticos" },
  { label: "Desarrollo", cats: [4], desc: "Principios del juego moderno en red" },
  { label: "Avance", cats: [3], desc: "Presión sistemática, variación y rotura" },
  { label: "Élite", cats: [1, 2], desc: "Ajuste mental, lectura del rival, estrategia por partido" },
];

export default function TacticasPage() {
  return (
    <>
      <Navbar activeSection="/aprender" />
      <main>
        <section className="px-6 md:px-8 py-10 md:py-14 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">
              <Link href="/aprender" className="hover:text-ink transition-colors">← Aprender</Link>
              <span className="mx-2">·</span>
              <span>Tácticas</span>
            </div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              Tácticas de pádel
            </h1>
            <p className="text-ink-muted text-xl mt-4 max-w-2xl leading-relaxed">
              Estrategia organizada por nivel. Desde los principios básicos de posición hasta la presión sistemática en red.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-8 py-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tacticas.map((t) => (
              <Link
                key={t.slug}
                href={`/tacticas/${t.slug}`}
                className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: catColors[t.cat] }} />
                  <span className="mono text-xs text-ink-soft">Desde Cat {t.cat} · {t.nivel}</span>
                </div>
                <div className="display text-xl font-semibold mb-2 group-hover:text-ink transition-colors">
                  {t.nombre}
                </div>
                <p className="text-sm text-ink-muted leading-relaxed mb-4">{t.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {t.pilares.map((p) => (
                    <span key={p} className="mono text-[10px] border border-line px-2 py-1 rounded text-ink-soft">
                      {p}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-xs font-semibold text-[#A8E63A]">Leer guía →</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-8 py-12 border-t border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-6">→ Por nivel</div>
            <h2 className="display text-2xl font-semibold mb-8" style={{ letterSpacing: "-0.02em" }}>
              Camino táctico según tu categoría
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {grupos.map((g) => (
                <div key={g.label} className="border border-line rounded-xl p-5 bg-canvas">
                  <div className="flex gap-2 mb-3">
                    {g.cats.map((c) => (
                      <span
                        key={c}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: catColors[c] }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="display text-base font-semibold mb-1">{g.label}</div>
                  <p className="text-xs text-ink-muted leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-8 py-10 border-t border-line max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/golpes" className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors">
              <div className="mono text-xs text-ink-soft uppercase mb-3">→ Técnica</div>
              <div className="display text-xl font-semibold mb-2">Guías de golpes</div>
              <p className="text-sm text-ink-muted">Bandeja, víbora, remate, globo, X3, X4 y más. Guía técnica con errores comunes.</p>
            </Link>
            <Link href="/drills" className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors">
              <div className="mono text-xs text-ink-soft uppercase mb-3">→ Entrenamiento</div>
              <div className="display text-xl font-semibold mb-2">Drills de práctica</div>
              <p className="text-sm text-ink-muted">Ejercicios concretos para entrenar en pareja o cuadro. Con duración y objetivo.</p>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
