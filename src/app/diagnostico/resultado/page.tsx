import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tu resultado de diagnóstico | tupadel",
  robots: { index: false },
};

const catData: Record<string, {
  nombre: string; color: string; pct: string; tiempo: string;
  descripcion: string;
  faltan: { golpe: string; prio: number }[];
  palas: { marca: string; modelo: string; precio: string; colorFrom: string }[];
  drill: { nombre: string; duracion: string; desc: string };
}> = {
  "1": {
    nombre: "Competitivo", color: "#DC2626", pct: "~5%", tiempo: "Indefinido",
    descripcion: "Ejecutás a un nivel donde el deporte se convierte en estrategia pura. El margen de error que te falta es mental, no técnico.",
    faltan: [{ golpe: "Estrategia por rival", prio: 1 }, { golpe: "Mental game bajo presión", prio: 1 }, { golpe: "Preparación física específica", prio: 2 }],
    palas: [
      { marca: "Bullpadel", modelo: "Vertex 04", precio: "$219.990", colorFrom: "from-[#DC2626]" },
      { marca: "Nox", modelo: "AT10 Genius", precio: "$254.990", colorFrom: "from-[#7DB81E]" },
      { marca: "Siux", modelo: "Diablo RX", precio: "$289.990", colorFrom: "from-[#7C3AED]" },
    ],
    drill: { nombre: "Punto táctico bajo presión", duracion: "45 min · en cuadro", desc: "Jugás puntos con reglas restrictivas que obligan a decidir rápido bajo presión competitiva." },
  },
  "2": {
    nombre: "Avanzado", color: "#EA580C", pct: "~10%", tiempo: "12–36 meses en Cat 3",
    descripcion: "Dominás todos los golpes base. El salto a Cat 1 pasa por consistencia en remate definitivo y presión sistemática.",
    faltan: [{ golpe: "Remate definitivo", prio: 1 }, { golpe: "Presión sistemática en red", prio: 1 }, { golpe: "Contraataque organizado", prio: 2 }],
    palas: [
      { marca: "Head", modelo: "Delta Pro 2026", precio: "$239.990", colorFrom: "from-[#E8590C]" },
      { marca: "Babolat", modelo: "Air Veron", precio: "$209.990", colorFrom: "from-[#DC2626]" },
      { marca: "Nox", modelo: "AT10 Genius", precio: "$254.990", colorFrom: "from-[#7DB81E]" },
    ],
    drill: { nombre: "Remate + presión red", duracion: "35 min · en pareja", desc: "Uno ataca con smash, el otro defiende y contraataca. Rotación cada 10 minutos." },
  },
  "3": {
    nombre: "Intermedio alto", color: "#D97706", pct: "~15%", tiempo: "12–24 meses en Cat 4",
    descripcion: "Manejás el juego con criterio. El siguiente nivel pasa por x3 consistente, dejada y anticipación.",
    faltan: [{ golpe: "X3 y X4", prio: 1 }, { golpe: "Dejada tras globo", prio: 1 }, { golpe: "Chiquita", prio: 2 }, { golpe: "Anticipación", prio: 2 }],
    palas: [
      { marca: "Nox", modelo: "ML10 Pro Cup", precio: "$199.990", colorFrom: "from-[#0891B2]" },
      { marca: "Adidas", modelo: "Metalbone HRD+", precio: "$184.990", colorFrom: "from-[#0891B2]" },
      { marca: "Bullpadel", modelo: "Hack 04", precio: "$149.990", colorFrom: "from-[#D97706]" },
    ],
    drill: { nombre: "X3 + posición", duracion: "40 min · en pareja", desc: "Uno sube globos, el otro practica el x3 desde diferentes posiciones." },
  },
  "4": {
    nombre: "Intermedio", color: "#65A30D", pct: "~24%", tiempo: "8–18 meses",
    descripcion: "El nivel donde el pádel se vuelve un juego de decisiones. Sabés cómo pegarle; ahora toca aprender cuándo y por qué.",
    faltan: [{ golpe: "Víbora", prio: 1 }, { golpe: "Globo táctico", prio: 1 }, { golpe: "Bajada de tres metros", prio: 2 }, { golpe: "Contrapared ofensiva", prio: 2 }],
    palas: [
      { marca: "Nox", modelo: "AT10 Genius", precio: "$254.990", colorFrom: "from-[#7DB81E]" },
      { marca: "Adidas", modelo: "Metalbone HRD+", precio: "$184.990", colorFrom: "from-[#0891B2]" },
      { marca: "Nox", modelo: "ML10 Pro Cup", precio: "$199.990", colorFrom: "from-[#0891B2]" },
    ],
    drill: { nombre: "Bandeja cruzada → globo táctico", duracion: "35 min · en pareja", desc: "Trabajás los dos golpes prioridad 1 de Cat 4 en secuencia táctica realista." },
  },
  "5": {
    nombre: "Intermedio bajo", color: "#0891B2", pct: "~28%", tiempo: "6–12 meses",
    descripcion: "Tenés la base. El salto a Cat 4 pasa por darle dirección a tu bandeja y aprender a usar el globo tácticamente.",
    faltan: [{ golpe: "Bandeja con dirección", prio: 1 }, { golpe: "Globo defensivo profundo", prio: 1 }, { golpe: "Smash plano simple", prio: 2 }, { golpe: "Comunicación con pareja", prio: 2 }],
    palas: [
      { marca: "Bullpadel", modelo: "Hack 04", precio: "$149.990", colorFrom: "from-[#D97706]" },
      { marca: "Adidas", modelo: "Metalbone HRD+", precio: "$184.990", colorFrom: "from-[#0891B2]" },
      { marca: "Nox", modelo: "ML10 Pro Cup", precio: "$199.990", colorFrom: "from-[#0891B2]" },
    ],
    drill: { nombre: "Bandeja profunda al fondo", duracion: "30 min · en pareja", desc: "Pareja en red lanza globo, vos salís con bandeja cruzada o paralela al fondo." },
  },
  "6": {
    nombre: "Iniciación", color: "#7C3AED", pct: "~18%", tiempo: "Primeros 6–12 meses",
    descripcion: "Estás empezando. El camino más corto a Cat 5 pasa por consistencia en drive/revés y no temerle a las paredes.",
    faltan: [{ golpe: "Drive y revés con bote", prio: 1 }, { golpe: "Posición de espera", prio: 1 }, { golpe: "Bandeja básica", prio: 2 }, { golpe: "Salida de pared simple", prio: 2 }],
    palas: [
      { marca: "Bullpadel", modelo: "Hack 04", precio: "$149.990", colorFrom: "from-[#D97706]" },
      { marca: "Adidas", modelo: "Metalbone HRD+", precio: "$184.990", colorFrom: "from-[#0891B2]" },
    ],
    drill: { nombre: "Drive y revés cross-court", duracion: "25 min · en pareja", desc: "Peloteo desde el fondo buscando consistencia y altura sobre la red." },
  },
};

export default function ResultadoPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; email?: string }>;
}) {
  return (
    <ResultadoContent searchParams={searchParams} />
  );
}

async function ResultadoContent({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; email?: string }>;
}) {
  const params = await searchParams;
  const cat = params.cat ?? "4";
  const email = params.email;
  const data = catData[cat] ?? catData["4"];
  const catNum = parseInt(cat);
  const siguiente = catNum > 1 ? catData[String(catNum - 1)] : null;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero resultado */}
        <section className="px-6 md:px-8 py-14 md:py-20 border-b border-line" style={{ background: `${data.color}08` }}>
          <div className="max-w-[1000px] mx-auto text-center">
            <div className="mono text-xs uppercase tracking-widest text-ink-soft mb-6">→ Tu diagnóstico de nivel</div>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: data.color }} />
              <span className="mono text-sm uppercase tracking-wider font-semibold" style={{ color: data.color }}>
                CATEGORÍA {cat} DE 6
              </span>
            </div>
            <h1
              className="display text-7xl md:text-9xl font-semibold"
              style={{ letterSpacing: "-0.04em", lineHeight: "0.9", color: data.color }}
            >
              {data.nombre}
            </h1>
            <p className="text-lg md:text-xl text-ink-muted mt-8 max-w-2xl mx-auto leading-relaxed">
              {data.descripcion}
            </p>
            {email && (
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-canvas border border-line mono text-xs">
                <span className="text-[#A8E63A]">✓</span> Enviado a {email}
              </div>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-line bg-canvas-warm">
          <div className="max-w-[1000px] mx-auto px-6 md:px-8 py-8 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="stat-num text-4xl md:text-5xl">{cat}</div>
              <div className="text-sm text-ink-muted mt-1">tu categoría</div>
            </div>
            <div>
              <div className="stat-num text-4xl md:text-5xl">{data.pct}</div>
              <div className="text-sm text-ink-muted mt-1">de jugadores aquí</div>
            </div>
            <div>
              <div className="stat-num text-4xl md:text-5xl">{data.tiempo.split(" ")[0]}</div>
              <div className="text-sm text-ink-muted mt-1">{data.tiempo.split(" ").slice(1).join(" ")} para subir</div>
            </div>
          </div>
        </section>

        {/* Lo que te falta */}
        <section className="px-6 md:px-8 py-12 md:py-16 max-w-[1000px] mx-auto">
          <div className="mono text-xs uppercase tracking-widest text-[#E8590C] font-semibold mb-3">
            → LO QUE TE FALTA PARA SUBIR A CAT {catNum - 1}
          </div>
          <h2 className="display text-3xl md:text-4xl font-semibold mb-8" style={{ letterSpacing: "-0.02em" }}>
            Tu plan de los próximos 3 meses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.faltan.map((g, i) => (
              <div key={g.golpe} className="border border-line rounded-xl p-5 flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: g.prio === 1 ? "#E8590C" : "#D4D4D4" }}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="font-semibold">{g.golpe}</div>
                  <div className="mono text-xs mt-1" style={{ color: g.prio === 1 ? "#E8590C" : "#737373" }}>
                    {g.prio === 1 ? "Prioridad alta" : "Prioridad media"}
                  </div>
                </div>
                <Link
                  href={`/golpes/${g.golpe.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "")}`}
                  className="ml-auto text-[#A8E63A] font-semibold text-sm flex-shrink-0"
                >
                  Ver guía →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href={`/categorias/${cat}`}
              className="inline-block border-2 px-7 py-3 rounded-lg font-semibold text-sm hover:opacity-80 transition-opacity"
              style={{ borderColor: data.color, color: data.color }}
            >
              Ver ruta completa Cat {cat} →
            </Link>
          </div>
        </section>

        {/* Drill de la semana */}
        <section className="border-t border-line bg-canvas-warm px-6 md:px-8 py-12">
          <div className="max-w-[1000px] mx-auto">
            <div className="mono text-xs uppercase tracking-wider text-ink-soft font-semibold mb-2">→ Empezá esta semana</div>
            <div className="bg-canvas border border-line rounded-2xl p-7 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="mono text-xs uppercase tracking-wider text-ink-soft">Drill recomendado · Cat {cat}</div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#ECFCCB] text-[#7DB81E]">
                  {data.drill.duracion}
                </span>
              </div>
              <h3 className="display text-2xl md:text-3xl font-semibold mb-3 leading-tight">
                {data.drill.nombre}
              </h3>
              <p className="text-ink-muted leading-relaxed">{data.drill.desc}</p>
              <div className="mt-6 flex items-center gap-4">
                <Link href="/drills" className="bg-[#A8E63A] text-[#0D1B2A] px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#7DB81E] transition-colors">
                  Ver todos los drills →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Palas recomendadas */}
        <section className="px-6 md:px-8 py-12 md:py-16 max-w-[1000px] mx-auto">
          <div className="mono text-xs uppercase tracking-wider text-ink-soft mb-2">→ Palas para tu nivel</div>
          <h2 className="display text-2xl md:text-3xl font-semibold mb-6" style={{ letterSpacing: "-0.02em" }}>
            Las mejores opciones para Cat {cat}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.palas.map((p) => (
              <Link
                key={p.modelo}
                href={`/palas/${p.marca.toLowerCase()}-${p.modelo.toLowerCase().replace(/[\s+]/g, "-")}`}
                className="border border-line rounded-xl overflow-hidden bg-canvas hover:border-ink-muted transition-colors"
              >
                <div className="aspect-[4/5] bg-gradient-to-br from-canvas-warm to-canvas-dim flex items-center justify-center">
                  <div className={`w-20 h-28 bg-gradient-to-b ${p.colorFrom} to-ink rounded-[40%/30%] shadow-lg`} />
                </div>
                <div className="p-4">
                  <div className="mono text-[10px] text-ink-soft uppercase">{p.marca}</div>
                  <div className="display text-base font-semibold mt-0.5">{p.modelo}</div>
                  <div className="mono text-sm font-semibold mt-2">{p.precio}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-5 text-center">
            <Link href="/palas/recomendador" className="text-sm font-semibold text-[#A8E63A]">
              Quiz de pala personalizado →
            </Link>
          </div>
        </section>

        {/* Next level preview */}
        {siguiente && (
          <section className="border-t border-line bg-canvas-warm px-6 md:px-8 py-10">
            <div className="max-w-[1000px] mx-auto flex items-center justify-between gap-6">
              <div>
                <div className="mono text-xs uppercase tracking-wider text-ink-soft mb-2">→ Tu próximo objetivo</div>
                <div className="display text-2xl font-semibold">
                  Categoría {catNum - 1} · {siguiente.nombre}
                </div>
                <div className="text-sm text-ink-muted mt-1">{siguiente.pct} de jugadores</div>
              </div>
              <Link
                href={`/categorias/${catNum - 1}`}
                className="flex-shrink-0 border-2 px-5 py-3 rounded-lg font-semibold text-sm hover:opacity-80 transition-opacity"
                style={{ borderColor: siguiente.color, color: siguiente.color }}
              >
                Ver Cat {catNum - 1} →
              </Link>
            </div>
          </section>
        )}

        {/* CTA compartir */}
        <section className="border-t border-line px-6 md:px-8 py-12">
          <div className="max-w-[1000px] mx-auto text-center">
            <div className="mono text-xs uppercase tracking-widest text-ink-soft mb-4">→ ¿Querés saber de verdad?</div>
            <h2 className="display text-2xl md:text-3xl font-semibold mb-3" style={{ letterSpacing: "-0.02em" }}>
              Repetí el diagnóstico en 6 meses.
            </h2>
            <p className="text-ink-muted mb-6 max-w-xl mx-auto">
              El diagnóstico es una foto del momento. Si entrenás con el plan, en 6 meses vas a ver el salto de categoría reflejado.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/diagnostico"
                className="border border-line px-5 py-2.5 rounded-lg text-sm font-medium hover:border-ink transition-colors"
              >
                Hacer de nuevo →
              </Link>
              <Link
                href="/"
                className="bg-ink text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-ink-muted transition-colors"
              >
                Ir al inicio →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
