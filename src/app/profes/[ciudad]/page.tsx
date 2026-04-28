import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import { profes } from "@/db/schema";
import { eq, and, ilike } from "drizzle-orm";
import type { Metadata } from "next";

const ciudadConfig: Record<string, { label: string; pais: string; comunas: string[] }> = {
  santiago: {
    label: "Santiago",
    pais: "Chile",
    comunas: ["Providencia", "Las Condes", "Ñuñoa", "Vitacura", "Miraflores", "San Miguel"],
  },
  "buenos-aires": {
    label: "Buenos Aires",
    pais: "Argentina",
    comunas: ["Palermo", "Belgrano", "Recoleta", "Caballito", "San Telmo"],
  },
  montevideo: {
    label: "Montevideo",
    pais: "Uruguay",
    comunas: ["Pocitos", "Carrasco", "Punta Carretas", "Malvín"],
  },
};

export function generateStaticParams() {
  return Object.keys(ciudadConfig).map((slug) => ({ ciudad: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string }> }): Promise<Metadata> {
  const { ciudad } = await params;
  const cfg = ciudadConfig[ciudad];
  if (!cfg) return {};
  return {
    title: `Profesores de Pádel en ${cfg.label} — Directorio Verificado | Pulso Pádel`,
    description: `Encontrá profesores de pádel verificados en ${cfg.label}, ${cfg.pais}. Filtrá por especialidad, nivel y precio. Clases individuales, en pareja y grupales.`,
  };
}

export default async function ProfesEnCiudadPage({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params;
  const cfg = ciudadConfig[ciudad];
  if (!cfg) notFound();

  const listado = await db.query.profes.findMany({
    where: (p, { eq: eqF, and: andF }) => andF(eqF(p.estado, "activo"), ilike(p.ciudad, cfg.label)),
    orderBy: (p, { desc }) => [desc(p.destacado), desc(p.ratingPromedio)],
  });

  const catColors: Record<number, string> = {
    1: "#DC2626", 2: "#EA580C", 3: "#D97706", 4: "#65A30D", 5: "#0891B2", 6: "#7C3AED",
  };

  return (
    <>
      <Navbar activeSection="/profes" />
      <main>
        <section className="px-6 md:px-8 py-12 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-5">
              <Link href="/profes" className="hover:text-ink transition-colors">← Profes</Link>
              <span className="mx-2">·</span>
              <span>{cfg.label}</span>
            </div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              Profesores de pádel<br />en {cfg.label}
            </h1>
            <p className="text-ink-muted text-xl mt-4 max-w-2xl leading-relaxed">
              Directorio verificado de profes de pádel en {cfg.label}, {cfg.pais}. Filtrá por nivel, especialidad y precio.
            </p>
            <div className="flex gap-3 mt-8 flex-wrap">
              <Link href={`/profes/buscar?ciudad=${cfg.label}`} className="bg-[#0D1B2A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a2f47] transition-colors">
                Ver con filtros →
              </Link>
              {cfg.comunas.map((c) => (
                <span key={c} className="border border-line px-4 py-2 rounded-lg text-sm text-ink-muted">{c}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-8 py-12 max-w-[1400px] mx-auto">
          {listado.length === 0 ? (
            <div className="text-center py-20 text-ink-muted">
              <p className="mb-4">Todavía no hay profes registrados en {cfg.label}.</p>
              <Link href="/profe/onboarding" className="underline hover:text-ink">¿Sos profe en {cfg.label}? Sumate gratis →</Link>
            </div>
          ) : (
            <>
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-ink-muted text-sm"><span className="font-semibold text-ink">{listado.length}</span> profe{listado.length !== 1 ? "s" : ""} en {cfg.label}</span>
                <Link href={`/profes/buscar?ciudad=${cfg.label}`} className="mono text-xs text-ink-soft hover:text-ink">Ver con filtros →</Link>
              </div>
              <div className="space-y-4">
                {listado.map((p) => (
                  <Link key={p.id} href={`/profes/${p.slug}`} className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors group flex gap-5">
                    <div className="w-16 h-16 rounded-full bg-[#0D1B2A] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {p.nombre[0]}{p.apellido[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="display text-xl font-semibold">{p.nombre} {p.apellido}</span>
                        {p.verificado && <span className="mono text-[9px] bg-[#A8E63A]/10 text-[#65A30D] border border-[#A8E63A]/30 px-2 py-0.5 rounded">✓ Verificado</span>}
                      </div>
                      <div className="text-xs text-ink-muted mt-0.5">{p.ciudad}{p.comuna ? `, ${p.comuna}` : ""} · {p.anosExperiencia} años de exp.</div>
                      <p className="text-sm text-ink-muted mt-2 line-clamp-2 leading-relaxed">{p.bioCorta}</p>
                      <div className="flex items-center gap-4 mt-3 flex-wrap">
                        {p.ratingPromedio && (
                          <span className="text-sm"><span className="text-yellow-500">★</span> <span className="font-semibold">{p.ratingPromedio.toFixed(1)}</span> <span className="text-ink-muted">({p.reviewsCount})</span></span>
                        )}
                        <div className="flex gap-1">
                          {(p.categoriasQueEnsena ?? []).sort().map((c) => (
                            <span key={c} className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold" style={{ backgroundColor: catColors[c] ?? "#888" }}>{c}</span>
                          ))}
                        </div>
                        {p.precioIndividual60min && (
                          <span className="text-sm text-ink-muted">Desde <span className="font-semibold text-ink">${p.precioIndividual60min.toLocaleString("es-CL")} {p.monedaBase ?? "CLP"}</span></span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>

        {/* CTA profe */}
        <section className="px-6 md:px-8 py-10 border-t border-line bg-[#0D1B2A] text-white">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="mono text-xs text-white/40 uppercase mb-2">¿Sos profe en {cfg.label}?</div>
              <div className="display text-2xl font-semibold">Sumate gratis al directorio</div>
              <p className="text-white/60 text-sm mt-1">Verificación en 48h. Sin comisiones por contacto.</p>
            </div>
            <Link href="/profe/onboarding" className="bg-[#A8E63A] text-[#0D1B2A] px-6 py-3 rounded-lg font-semibold hover:bg-[#7DB81E] transition-colors whitespace-nowrap">
              Alta como profe →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
