export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import { palas, preciosPalas, tiendas, reviewsPalas } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import type { Metadata } from "next";

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

function timeAgo(d: Date | null) {
  if (!d) return "";
  const mins = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
  if (mins < 60) return `hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  return `hace ${Math.floor(hrs / 24)} días`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [p] = await db.select({ marca: palas.marca, modelo: palas.modelo, descripcionMd: palas.descripcionMd })
    .from(palas).where(eq(palas.slug, slug)).limit(1);
  if (!p) return { title: "Pala no encontrada" };
  return {
    title: `${p.marca} ${p.modelo} — Precios en Chile | Pulso Pádel`,
    description: p.descripcionMd?.slice(0, 160) ?? `Precios y review de la ${p.marca} ${p.modelo} en Chile.`,
  };
}

export default async function PalaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [pala] = await db.select().from(palas).where(eq(palas.slug, slug)).limit(1);
  if (!pala || !pala.publicada) notFound();

  const preciosData = await db
    .select({
      id: preciosPalas.id,
      precioClp: preciosPalas.precioClp,
      precioOriginalClp: preciosPalas.precioOriginalClp,
      descuentoPct: preciosPalas.descuentoPct,
      stock: preciosPalas.stock,
      url: preciosPalas.url,
      scrapeadoAt: preciosPalas.scrapeadoAt,
      tiendaNombre: tiendas.nombre,
      tiendaDominio: tiendas.dominio,
      tiendaConfiabilidad: tiendas.confiabilidad,
    })
    .from(preciosPalas)
    .innerJoin(tiendas, eq(preciosPalas.tiendaId, tiendas.id))
    .where(eq(preciosPalas.palaId, pala.id))
    .orderBy(asc(preciosPalas.precioClp));

  const reviews = await db.select().from(reviewsPalas).where(eq(reviewsPalas.palaId, pala.id)).limit(3);

  const preciosConStock = preciosData.filter(p => p.stock !== false);
  const minPrecio = preciosConStock[0];

  const formaLabel: Record<string, string> = {
    diamante: "Diamante", lagrima: "Lágrima", redonda: "Redonda", hibrida: "Híbrida",
  };
  const balanceLabel: Record<string, string> = {
    cabeza: "Alto (potencia)", medio: "Medio (equilibrio)", mango: "Bajo (control)",
  };
  const colorFromByMarca: Record<string, string> = {
    Bullpadel: "from-[#DC2626]", Nox: "from-[#7DB81E]", Adidas: "from-[#0891B2]",
    Head: "from-[#E8590C]", Babolat: "from-[#DC2626]", Siux: "from-[#7C3AED]",
  };
  const colorFrom = colorFromByMarca[pala.marca] ?? "from-[#0D1B2A]";

  return (
    <>
      <Navbar activeSection="/palas" />
      <main>
        {/* Header */}
        <section className="px-6 md:px-8 py-8 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-6">
              <Link href="/palas" className="hover:text-ink transition-colors">← Palas</Link>
              {" · "}
              <Link href={`/palas?marca=${pala.marca}`} className="hover:text-ink transition-colors">{pala.marca}</Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Imagen */}
              <div className="lg:col-span-4">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-canvas-warm to-canvas-dim flex items-center justify-center relative overflow-hidden border border-line">
                  {pala.imagenPrincipal ? (
                    <Image
                      src={pala.imagenPrincipal}
                      alt={`${pala.marca} ${pala.modelo}`}
                      fill
                      className="object-contain p-8"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      priority
                    />
                  ) : (
                    <div className={`w-32 h-52 bg-gradient-to-b ${colorFrom} to-ink rounded-[40%/30%] shadow-2xl`} />
                  )}
                </div>
                {pala.imagenes && pala.imagenes.length > 1 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto">
                    {pala.imagenes.slice(0, 5).map((img, i) => (
                      <div key={i} className="w-14 h-14 rounded-lg border border-line overflow-hidden flex-shrink-0 relative bg-canvas-warm">
                        <Image src={img} alt={`${pala.modelo} ${i + 1}`} fill className="object-contain p-1" sizes="56px" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Info principal */}
              <div className="lg:col-span-5">
                <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-2">{pala.marca} · {pala.anio}</div>
                <h1 className="display text-4xl md:text-5xl font-semibold" style={{ letterSpacing: "-0.03em" }}>{pala.modelo}</h1>

                <div className="flex items-center gap-3 mt-4 flex-wrap">
                  {pala.scoreEditorial && (
                    <span className="mono text-lg font-semibold bg-ink text-white px-3 py-1 rounded">
                      {pala.scoreEditorial.toFixed(1)} / 10
                    </span>
                  )}
                  <span className="border border-line px-3 py-1 rounded text-sm">{formaLabel[pala.forma] ?? pala.forma}</span>
                  <span className="border border-line px-3 py-1 rounded text-sm">Cat {pala.nivelMax}–{pala.nivelMin}</span>
                  {pala.anio === 2026 && (
                    <span className="bg-[#A8E63A] text-[#0D1B2A] px-3 py-1 rounded text-xs font-semibold">NUEVO 2026</span>
                  )}
                </div>

                {/* Barras potencia / control / salida */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    { label: "Potencia", val: pala.perfilPotencia },
                    { label: "Control", val: pala.perfilControl },
                    { label: "Salida", val: pala.perfilSalida },
                  ].map(s => s.val != null && (
                    <div key={s.label} className="border border-line rounded-xl p-3 text-center bg-canvas">
                      <div className="mono text-2xl font-semibold">{s.val}</div>
                      <div className="text-[10px] text-ink-muted mt-1">{s.label}</div>
                      <div className="h-1 rounded-full bg-line mt-2">
                        <div className="h-1 rounded-full bg-ink transition-all" style={{ width: `${(s.val / 10) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Specs */}
                <div className="mt-6 space-y-2 text-sm">
                  {([
                    { label: "Forma", val: formaLabel[pala.forma] ?? pala.forma },
                    { label: "Balance", val: pala.balance ? (balanceLabel[pala.balance] ?? pala.balance) : null },
                    { label: "Núcleo", val: pala.nucleo },
                    { label: "Cara", val: pala.cara },
                    { label: "Perfil", val: pala.perfil ? `${pala.perfil} mm` : null },
                    { label: "Peso", val: pala.pesoMin && pala.pesoMax ? `${pala.pesoMin}–${pala.pesoMax} g` : null },
                  ] as { label: string; val: string | null | undefined }[]).filter(r => r.val).map(row => (
                    <div key={row.label} className="flex justify-between border-b border-line pb-2">
                      <span className="text-ink-muted">{row.label}</span>
                      <span className="font-semibold">{row.val}</span>
                    </div>
                  ))}
                </div>

                {pala.jugadoresPro && pala.jugadoresPro.length > 0 && (
                  <div className="mt-5">
                    <div className="mono text-xs text-ink-soft uppercase mb-2">Usada por</div>
                    <div className="flex flex-wrap gap-2">
                      {pala.jugadoresPro.map(j => (
                        <span key={j} className="border border-line rounded-full px-3 py-1 text-xs font-medium">{j}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA precio */}
              <div className="lg:col-span-3">
                <div className="border border-line rounded-2xl p-5 bg-canvas sticky top-24">
                  {minPrecio ? (
                    <>
                      <div className="mono text-xs text-ink-soft mb-1">Mejor precio</div>
                      <div className="display text-3xl font-semibold">{formatPrice(minPrecio.precioClp)}</div>
                      <div className="mono text-xs text-ink-soft mt-0.5">en {minPrecio.tiendaNombre}</div>
                      {minPrecio.precioOriginalClp && minPrecio.precioOriginalClp > minPrecio.precioClp && (
                        <div className="flex items-center gap-2 mt-1 mb-1">
                          <span className="mono text-xs line-through text-ink-soft">{formatPrice(minPrecio.precioOriginalClp)}</span>
                          <span className="mono text-xs text-[#65A30D] font-semibold">
                            -{Math.round(((minPrecio.precioOriginalClp - minPrecio.precioClp) / minPrecio.precioOriginalClp) * 100)}%
                          </span>
                        </div>
                      )}
                      <a
                        href={minPrecio.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-[#A8E63A] text-[#0D1B2A] py-3 rounded-lg font-semibold text-center text-sm hover:bg-[#7DB81E] transition-colors mt-4"
                      >
                        Comprar en {minPrecio.tiendaNombre} →
                      </a>
                      <div className="mono text-[10px] text-ink-soft text-center mt-2">
                        Actualizado {timeAgo(minPrecio.scrapeadoAt)}
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-sm text-ink-muted py-2">
                      <div className="text-2xl mb-2">😔</div>
                      Sin stock disponible
                    </div>
                  )}
                  {preciosConStock.length > 1 && (
                    <a href="#precios" className="block text-center text-xs text-ink-muted hover:text-ink mt-3 transition-colors">
                      Ver en {preciosConStock.length} tiendas ↓
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">

            {/* Descripción */}
            {pala.descripcionMd && (
              <section>
                <h2 className="display text-2xl font-semibold mb-4" style={{ letterSpacing: "-0.02em" }}>Sobre esta pala</h2>
                <div className="text-ink-muted leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {pala.descripcionMd}
                </div>
              </section>
            )}

            {/* Pros y contras */}
            {((pala.pros && pala.pros.length > 0) || (pala.contras && pala.contras.length > 0)) && (
              <section>
                <h2 className="display text-2xl font-semibold mb-4" style={{ letterSpacing: "-0.02em" }}>Pros y contras</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pala.pros && pala.pros.length > 0 && (
                    <div className="border border-[#65A30D]/30 rounded-xl p-5 bg-[#ECFCCB]/20">
                      <div className="mono text-xs text-[#65A30D] font-semibold mb-3">✓ PROS</div>
                      <ul className="space-y-2">
                        {pala.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-[#65A30D] flex-shrink-0 mt-0.5">+</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pala.contras && pala.contras.length > 0 && (
                    <div className="border border-line rounded-xl p-5 bg-canvas-warm">
                      <div className="mono text-xs text-ink-soft font-semibold mb-3">✗ CONTRAS</div>
                      <ul className="space-y-2">
                        {pala.contras.map((contra, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-ink-muted">
                            <span className="flex-shrink-0 mt-0.5">−</span>
                            <span>{contra}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Precios */}
            <section id="precios">
              <h2 className="display text-2xl font-semibold mb-2" style={{ letterSpacing: "-0.02em" }}>Dónde comprar</h2>
              <p className="text-ink-muted text-sm mb-5">
                {preciosConStock.length > 0
                  ? `Disponible en ${preciosConStock.length} tienda${preciosConStock.length > 1 ? "s" : ""}. Precios actualizados diariamente.`
                  : "Sin stock disponible en este momento."}
              </p>

              {preciosData.length === 0 ? (
                <div className="border border-line rounded-xl p-6 text-center text-ink-muted text-sm">
                  No hay precios registrados para esta pala todavía.
                </div>
              ) : (
                <div className="space-y-3">
                  {preciosData.map((p, i) => {
                    const isBest = i === 0 && p.stock !== false;
                    const sinStock = p.stock === false;
                    const descPct = p.precioOriginalClp && p.precioOriginalClp > p.precioClp
                      ? Math.round(((p.precioOriginalClp - p.precioClp) / p.precioOriginalClp) * 100)
                      : null;
                    return (
                      <div
                        key={p.id}
                        className={`border rounded-xl p-4 md:p-5 flex items-center justify-between gap-4 transition-colors ${
                          isBest ? "border-[#A8E63A] bg-[#ECFCCB]/20" : sinStock ? "border-line opacity-50" : "border-line bg-canvas hover:border-ink-muted"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span className="font-semibold text-sm">{p.tiendaNombre}</span>
                            {isBest && (
                              <span className="mono text-[10px] bg-[#A8E63A] text-[#0D1B2A] px-1.5 py-0.5 rounded font-semibold">
                                MEJOR PRECIO
                              </span>
                            )}
                            {sinStock && (
                              <span className="mono text-[10px] text-ink-soft border border-line px-1.5 py-0.5 rounded">
                                Sin stock
                              </span>
                            )}
                          </div>
                          <div className="mono text-xs text-ink-soft">{p.tiendaDominio}</div>
                          <div className="mono text-[10px] text-ink-soft">{timeAgo(p.scrapeadoAt)}</div>
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="text-right">
                            {p.precioOriginalClp && p.precioOriginalClp > p.precioClp && (
                              <div className="mono text-xs line-through text-ink-soft">{formatPrice(p.precioOriginalClp)}</div>
                            )}
                            <div className="mono text-lg md:text-xl font-semibold">{formatPrice(p.precioClp)}</div>
                            {descPct && (
                              <div className="mono text-xs text-[#65A30D] font-semibold">-{descPct}% OFF</div>
                            )}
                          </div>
                          {!sinStock && (
                            <a
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap ${
                                isBest
                                  ? "bg-[#A8E63A] text-[#0D1B2A] hover:bg-[#7DB81E]"
                                  : "border border-line hover:border-ink"
                              }`}
                            >
                              Ver →
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Reviews */}
            {reviews.length > 0 && (
              <section>
                <h2 className="display text-2xl font-semibold mb-4" style={{ letterSpacing: "-0.02em" }}>Review editorial</h2>
                {reviews.map(r => (
                  <div key={r.id} className="border border-line rounded-xl p-5 bg-canvas">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="mono text-3xl font-semibold">{r.scoreTotal.toFixed(1)}</span>
                      <div>
                        <div className="text-sm font-semibold">Puntuación editorial</div>
                        <div className="mono text-xs text-ink-soft">
                          {r.testeoHoras && `${r.testeoHoras}h testeada`}
                          {r.testeoSuperficie && ` · ${r.testeoSuperficie}`}
                        </div>
                      </div>
                    </div>
                    {r.veredictoMd && <p className="text-sm text-ink-muted leading-relaxed">{r.veredictoMd}</p>}
                    <div className="grid grid-cols-3 gap-3 mt-4 text-center text-xs">
                      {r.scorePotencia != null && <div className="border border-line rounded-lg p-2"><div className="mono font-semibold">{r.scorePotencia}</div><div className="text-ink-soft">Potencia</div></div>}
                      {r.scoreControl != null && <div className="border border-line rounded-lg p-2"><div className="mono font-semibold">{r.scoreControl}</div><div className="text-ink-soft">Control</div></div>}
                      {r.scoreSalida != null && <div className="border border-line rounded-lg p-2"><div className="mono font-semibold">{r.scoreSalida}</div><div className="text-ink-soft">Salida</div></div>}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="border border-line rounded-xl p-5 bg-canvas">
                <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-3">Ficha técnica</div>
                <div className="space-y-2 text-sm">
                  {([
                    { label: "Marca", val: pala.marca },
                    { label: "Modelo", val: pala.modelo },
                    { label: "Año", val: String(pala.anio) },
                    { label: "Forma", val: formaLabel[pala.forma] ?? pala.forma },
                    { label: "Nivel", val: `Cat ${pala.nivelMax}–${pala.nivelMin}` },
                    { label: "Balance", val: pala.balance ? (balanceLabel[pala.balance] ?? pala.balance) : null },
                    { label: "Núcleo", val: pala.nucleo },
                    { label: "Cara", val: pala.cara },
                    { label: "Perfil", val: pala.perfil ? `${pala.perfil} mm` : null },
                    { label: "Peso", val: pala.pesoMin && pala.pesoMax ? `${pala.pesoMin}–${pala.pesoMax} g` : null },
                  ] as { label: string; val: string | null | undefined }[]).filter(r => r.val).map(row => (
                    <div key={row.label} className="flex justify-between border-b border-line pb-2">
                      <span className="text-ink-muted">{row.label}</span>
                      <span className="font-semibold">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-line rounded-xl p-5 bg-canvas">
                <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-2">¿Para quién es?</div>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {pala.nivelMax >= 5
                    ? "Ideal para jugadores en iniciación y desarrollo. Fácil de manejar, tolera errores y ayuda a construir golpes sólidos."
                    : pala.nivelMax >= 3
                    ? "Pensada para jugadores intermedios que ya dominan los golpes básicos y quieren mejorar tácticas."
                    : "Pala de alto rendimiento para avanzados y competitivos. Exige buena técnica para sacarle el máximo."}
                </p>
                <Link
                  href={`/palas?nivel=${pala.nivelMax >= 5 ? "5-6" : pala.nivelMax >= 3 ? "3-4" : "1-2"}`}
                  className="block text-xs text-[#A8E63A] font-semibold mt-3 hover:underline"
                >
                  Ver otras palas de este nivel →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
