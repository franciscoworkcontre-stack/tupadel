import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import { profes } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

const nivelConfig: Record<string, { label: string; cats: number[]; color: string; desc: string; longDesc: string }> = {
  iniciacion: {
    label: "Iniciación",
    cats: [5, 6],
    color: "#7C3AED",
    desc: "Cat 5 y Cat 6 — Primeras clases y consolidación de fundamentos.",
    longDesc: "Si nunca tocaste una pala o llevás menos de 1 año jugando, este es tu nivel. Un buen profe de iniciación te enseña el agarre correcto, la postura base, el drive y el revés sin malos hábitos. El Cat 6 pasa a Cat 5 en 6–12 meses con buena guía.",
  },
  intermedio: {
    label: "Intermedio",
    cats: [4],
    color: "#65A30D",
    desc: "Cat 4 — Red, bandeja, víbora y juego táctico básico.",
    longDesc: "Cat 4 es donde pasa la magia: aprendés a usar la red de verdad, dominás la bandeja, empieza la víbora y el juego deja de ser solo peloteo. Un profe que trabaje Cat 4 sabe que el ritmo y la transición defensa-red son la clave.",
  },
  avanzado: {
    label: "Avanzado",
    cats: [2, 3],
    color: "#EA580C",
    desc: "Cat 2–3 — X3, X4, presión de red y variación táctica.",
    longDesc: "Los jugadores Cat 2-3 ya tienen base técnica. Lo que buscan es consistencia bajo presión, variación táctica y el salto a torneos. Los profes de este segmento trabajan mental game, análisis de video y situaciones de partido específicas.",
  },
  competitivo: {
    label: "Competitivo",
    cats: [1],
    color: "#DC2626",
    desc: "Cat 1 — Torneos, ajuste táctico en tiempo real, rendimiento pico.",
    longDesc: "El nivel Cat 1 requiere un profe que juegue o haya jugado a nivel competitivo. El trabajo es por partido: analizar al rival, ajustar el plan en tiempo real, controlar la presión. Pocos profes trabajan este segmento; los que hay son ex-jugadores.",
  },
};

export function generateStaticParams() {
  return Object.keys(nivelConfig).map((n) => ({ nivel: n }));
}

export async function generateMetadata({ params }: { params: Promise<{ nivel: string }> }): Promise<Metadata> {
  const { nivel } = await params;
  const cfg = nivelConfig[nivel];
  if (!cfg) return {};
  return {
    title: `Profes de Pádel para ${cfg.label} (${cfg.cats.map((c) => `Cat ${c}`).join("–")}) | Pulso Pádel`,
    description: cfg.desc,
  };
}

export default async function ProfesNivelPage({ params }: { params: Promise<{ nivel: string }> }) {
  const { nivel } = await params;
  const cfg = nivelConfig[nivel];
  if (!cfg) notFound();

  const todos = await db.query.profes.findMany({
    where: (p, { eq: eqF }) => eqF(p.estado, "activo"),
    orderBy: (p, { desc }) => [desc(p.destacado), desc(p.ratingPromedio)],
  });

  // Filtrar en JS porque arrayContains con múltiples valores requiere OR complejo
  const listado = todos.filter((p) =>
    (p.categoriasQueEnsena ?? []).some((c) => cfg.cats.includes(c))
  );

  return (
    <>
      <Navbar activeSection="/profes" />
      <main>
        <section className="px-6 md:px-8 py-12 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-5">
              <Link href="/profes" className="hover:text-ink transition-colors">← Profes</Link>
              <span className="mx-2">·</span>
              <span>Por nivel</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              {cfg.cats.map((c) => (
                <div key={c} className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: cfg.color }}>
                  {c}
                </div>
              ))}
            </div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              Profes para {cfg.label}
            </h1>
            <p className="text-ink-muted text-lg mt-4 max-w-2xl leading-relaxed">{cfg.longDesc}</p>
            <div className="flex gap-3 mt-8">
              {Object.entries(nivelConfig).filter(([k]) => k !== nivel).map(([k, c]) => (
                <Link key={k} href={`/profes/por-nivel/${k}`} className="border border-line px-4 py-2 rounded-lg text-sm text-ink-muted hover:border-ink-muted transition-colors">
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-8 py-12 max-w-[1400px] mx-auto">
          <div className="mb-6">
            <span className="font-semibold">{listado.length}</span>
            <span className="text-ink-muted text-sm"> profe{listado.length !== 1 ? "s" : ""} que enseña{listado.length !== 1 ? "n" : ""} nivel {cfg.label}</span>
          </div>

          {listado.length === 0 ? (
            <div className="text-center py-20 text-ink-muted">
              <p className="mb-4">Todavía no hay profes registrados para este nivel.</p>
              <Link href="/profe/onboarding" className="underline hover:text-ink">¿Sos profe? Sumate gratis →</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {listado.map((p) => {
                const precio = p.precioIndividual60min;
                return (
                  <Link key={p.id} href={`/profes/${p.slug}`} className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors group flex gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#0D1B2A] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {p.nombre[0]}{p.apellido[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="display text-lg font-semibold">{p.nombre} {p.apellido}</span>
                        {p.verificado && <span className="mono text-[9px] bg-[#A8E63A]/10 text-[#65A30D] border border-[#A8E63A]/30 px-2 py-0.5 rounded">✓ Verificado</span>}
                      </div>
                      <div className="text-xs text-ink-muted">{p.ciudad}{p.comuna ? `, ${p.comuna}` : ""}</div>
                      <p className="text-sm text-ink-muted mt-2 line-clamp-2 leading-relaxed">{p.bioCorta}</p>
                      {precio && <div className="text-sm mt-2">Desde <span className="font-semibold">${precio.toLocaleString("es-CL")} {p.monedaBase ?? "CLP"}</span></div>}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section className="px-6 md:px-8 py-10 border-t border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase mb-4">→ Relacionado</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href={`/categorias/${cfg.cats[0]}`} className="border border-line rounded-xl p-5 bg-canvas hover:border-ink-muted transition-colors">
                <div className="mono text-xs text-ink-soft mb-2">Sistema de categorías</div>
                <div className="display text-lg font-semibold">¿Qué domina Cat {cfg.cats[0]}?</div>
                <p className="text-sm text-ink-muted mt-1">Golpes, tácticas y errores comunes del nivel.</p>
              </Link>
              <Link href="/diagnostico" className="border border-[#A8E63A] rounded-xl p-5 bg-canvas hover:bg-canvas-warm transition-colors">
                <div className="mono text-xs text-[#65A30D] mb-2">Test gratuito</div>
                <div className="display text-lg font-semibold">¿Cuál es tu categoría real?</div>
                <p className="text-sm text-ink-muted mt-1">3 minutos. Diagnóstico preciso con ruta de mejora.</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
