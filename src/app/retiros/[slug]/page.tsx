export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import { retiros, retiroEdiciones, retiroItinerario, retiroCoaches, retiroServiciosExtras, operadores } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { RetiroInquiryForm } from "@/components/retiros/inquiry-form";
import type { Metadata } from "next";

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long", year: "numeric" }).format(new Date(d));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [r] = await db.select({ titulo: retiros.titulo, subtitulo: retiros.subtitulo }).from(retiros).where(eq(retiros.slug, slug)).limit(1);
  if (!r) return { title: "Retiro no encontrado" };
  return { title: `${r.titulo} | Pulso Pádel`, description: r.subtitulo ?? undefined };
}

export default async function RetiroDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [retiro] = await db
    .select()
    .from(retiros)
    .where(eq(retiros.slug, slug))
    .limit(1);

  if (!retiro || retiro.estado !== "publicado") notFound();

  const [operador] = await db
    .select({ nombreEmpresa: operadores.nombreEmpresa, instagram: operadores.instagram, slug: operadores.slug })
    .from(operadores)
    .where(eq(operadores.id, retiro.operadorId))
    .limit(1);

  const edicionesData = await db
    .select()
    .from(retiroEdiciones)
    .where(eq(retiroEdiciones.retiroId, retiro.id))
    .orderBy(asc(retiroEdiciones.fechaInicio));

  const itinerarioData = await db
    .select()
    .from(retiroItinerario)
    .where(eq(retiroItinerario.retiroId, retiro.id))
    .orderBy(asc(retiroItinerario.dia), asc(retiroItinerario.orden));

  const coachesData = await db
    .select()
    .from(retiroCoaches)
    .where(eq(retiroCoaches.retiroId, retiro.id));

  const extrasData = await db
    .select()
    .from(retiroServiciosExtras)
    .where(eq(retiroServiciosExtras.retiroId, retiro.id));

  const edicionesAbiertas = edicionesData.filter(e => e.estado === "abierta");
  const minPrecio = edicionesAbiertas.length > 0 ? Math.min(...edicionesAbiertas.map(e => e.precioClp)) : null;

  const generoLabel: Record<string, string> = { mixto: "Mixto", mujeres: "Solo mujeres", hombres: "Solo hombres" };
  const paisFlag: Record<string, string> = { CL: "🇨🇱", AR: "🇦🇷", CO: "🇨🇴", PE: "🇵🇪", UY: "🇺🇾", MX: "🇲🇽" };

  const diasItinerario = [...new Set(itinerarioData.map(i => i.dia))].sort((a, b) => a - b);

  return (
    <>
      <Navbar activeSection="/retiros" />
      <main>
        {/* Header */}
        <section className="px-6 md:px-8 py-10 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">
              <Link href="/retiros" className="hover:text-ink transition-colors">← Retiros</Link>
              {" · "}
              {paisFlag[retiro.pais] ?? "🌎"} {retiro.ciudad}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="mono text-xs bg-canvas border border-line px-2 py-1 rounded">{generoLabel[retiro.genero]}</span>
                  <span className="mono text-xs bg-canvas border border-line px-2 py-1 rounded">{retiro.diasDuracion} días</span>
                  <span className="mono text-xs bg-canvas border border-line px-2 py-1 rounded">Cat {retiro.nivelMax}–{retiro.nivelMin}</span>
                  {retiro.destacado && <span className="mono text-xs bg-[#A8E63A] text-[#0D1B2A] px-2 py-1 rounded font-semibold">DESTACADO</span>}
                </div>
                <h1 className="display text-4xl md:text-5xl font-semibold" style={{ letterSpacing: "-0.03em" }}>{retiro.titulo}</h1>
                {retiro.subtitulo && <p className="text-ink-muted text-xl mt-3 leading-relaxed">{retiro.subtitulo}</p>}
                {retiro.lugarNombre && (
                  <div className="flex items-center gap-2 mt-4 text-sm text-ink-muted">
                    <span>📍</span>
                    <span>{retiro.lugarNombre}{retiro.lugarDireccion ? `, ${retiro.lugarDireccion}` : ""}</span>
                  </div>
                )}
                {operador && (
                  <div className="flex items-center gap-2 mt-2 text-sm text-ink-muted">
                    <span>🏢</span>
                    <span>Organiza: <span className="font-semibold text-ink">{operador.nombreEmpresa}</span></span>
                    {operador.instagram && <a href={`https://instagram.com/${operador.instagram}`} target="_blank" rel="noopener" className="text-[#A8E63A] hover:underline">@{operador.instagram}</a>}
                  </div>
                )}
              </div>
              {minPrecio && (
                <div className="lg:col-span-4">
                  <div className="border border-line rounded-xl p-6 bg-canvas sticky top-24">
                    <div className="mono text-xs text-ink-soft mb-1">Desde</div>
                    <div className="display text-3xl font-semibold">{formatPrice(minPrecio)}</div>
                    <div className="mono text-xs text-ink-soft mt-1 mb-5">por persona · {retiro.diasDuracion} días</div>
                    <a href="#fechas" className="block w-full bg-[#A8E63A] text-[#0D1B2A] py-3 rounded-lg font-semibold text-center text-sm hover:bg-[#7DB81E] transition-colors">
                      Ver fechas disponibles →
                    </a>
                    <a href="#consultar" className="block w-full border border-line py-3 rounded-lg font-semibold text-center text-sm hover:border-ink transition-colors mt-2">
                      Hacer una consulta
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">

            {/* Incluye / No incluye */}
            {(!!retiro.incluyeJson || !!retiro.noIncluyeJson) && (
              <section>
                <h2 className="display text-2xl font-semibold mb-4" style={{ letterSpacing: "-0.02em" }}>¿Qué incluye?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {!!retiro.incluyeJson && (
                    <div className="border border-line rounded-xl p-5 bg-canvas">
                      <div className="mono text-xs text-[#65A30D] font-semibold mb-3">✓ INCLUYE</div>
                      <ul className="space-y-2">
                        {(retiro.incluyeJson as unknown as Array<{icono: string; texto: string}>).map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span>{item.icono}</span>
                            <span>{item.texto}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {!!retiro.noIncluyeJson && (
                    <div className="border border-line rounded-xl p-5 bg-canvas-warm">
                      <div className="mono text-xs text-ink-soft font-semibold mb-3">✗ NO INCLUYE</div>
                      <ul className="space-y-2">
                        {(retiro.noIncluyeJson as unknown as Array<{icono: string; texto: string}>).map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-ink-muted">
                            <span>{item.icono}</span>
                            <span>{item.texto}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Descripción */}
            {retiro.descripcionMd && (
              <section>
                <h2 className="display text-2xl font-semibold mb-4" style={{ letterSpacing: "-0.02em" }}>Sobre este retiro</h2>
                <div className="prose prose-sm max-w-none text-ink-muted leading-relaxed whitespace-pre-line">
                  {retiro.descripcionMd}
                </div>
              </section>
            )}

            {/* Itinerario */}
            {itinerarioData.length > 0 && (
              <section>
                <h2 className="display text-2xl font-semibold mb-4" style={{ letterSpacing: "-0.02em" }}>Itinerario</h2>
                <div className="space-y-4">
                  {diasItinerario.map(dia => (
                    <div key={dia} className="border border-line rounded-xl overflow-hidden">
                      <div className="px-5 py-3 bg-canvas-warm border-b border-line">
                        <span className="mono text-xs font-semibold uppercase">Día {dia}</span>
                      </div>
                      <div className="divide-y divide-line">
                        {itinerarioData.filter(i => i.dia === dia).map(item => (
                          <div key={item.id} className="px-5 py-3 flex items-start gap-4">
                            {item.horaInicio && (
                              <span className="mono text-xs text-ink-soft w-20 flex-shrink-0 pt-0.5">{item.horaInicio}{item.horaFin ? `–${item.horaFin}` : ""}</span>
                            )}
                            <div>
                              <div className="text-sm font-semibold">{item.titulo}</div>
                              {item.descripcion && <div className="text-xs text-ink-muted mt-0.5">{item.descripcion}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Coaches */}
            {coachesData.length > 0 && (
              <section>
                <h2 className="display text-2xl font-semibold mb-4" style={{ letterSpacing: "-0.02em" }}>Coaches</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {coachesData.map(c => (
                    <div key={c.id} className="border border-line rounded-xl p-5 bg-canvas flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-canvas-warm flex items-center justify-center text-xl flex-shrink-0">
                        👤
                      </div>
                      <div>
                        <div className="font-semibold">{c.nombreExterno}</div>
                        {c.rolEnRetiro && <div className="mono text-xs text-ink-soft">{c.rolEnRetiro}</div>}
                        {c.bioCorta && <div className="text-sm text-ink-muted mt-1">{c.bioCorta}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Extras */}
            {extrasData.length > 0 && (
              <section>
                <h2 className="display text-2xl font-semibold mb-4" style={{ letterSpacing: "-0.02em" }}>Servicios adicionales</h2>
                <div className="space-y-2">
                  {extrasData.map(e => (
                    <div key={e.id} className="border border-line rounded-lg px-5 py-3 bg-canvas flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold">{e.nombre}</div>
                        {e.descripcion && <div className="text-xs text-ink-muted">{e.descripcion}</div>}
                      </div>
                      <div className="mono text-sm font-semibold">{formatPrice(e.precioClp)}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Fechas */}
            <section id="fechas">
              <h2 className="display text-2xl font-semibold mb-4" style={{ letterSpacing: "-0.02em" }}>Fechas disponibles</h2>
              {edicionesAbiertas.length === 0 ? (
                <div className="border border-line rounded-xl p-6 text-center text-ink-muted">
                  No hay fechas disponibles en este momento. Consultá al organizador.
                </div>
              ) : (
                <div className="space-y-3">
                  {edicionesAbiertas.map(e => (
                    <div key={e.id} className="border border-line rounded-xl p-5 bg-canvas flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        {e.nombre && <div className="mono text-xs text-ink-soft mb-1">{e.nombre}</div>}
                        <div className="font-semibold">{formatDate(e.fechaInicio)} — {formatDate(e.fechaFin)}</div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="mono text-xs text-ink-soft">{e.cupoDisponible} cupos disponibles</span>
                          {e.habitacionTipo && <span className="mono text-xs text-ink-soft">· Hab. {e.habitacionTipo}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="mono text-xs text-ink-soft">por persona</div>
                          <div className="display text-xl font-semibold">{formatPrice(e.precioClp)}</div>
                        </div>
                        <a href="#consultar" className="bg-[#A8E63A] text-[#0D1B2A] px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#7DB81E] transition-colors whitespace-nowrap">
                          Reservar →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Formulario consulta */}
            <section id="consultar">
              <h2 className="display text-2xl font-semibold mb-2" style={{ letterSpacing: "-0.02em" }}>Hacer una consulta</h2>
              <p className="text-ink-muted text-sm mb-6">El organizador te responde en menos de 24 horas.</p>
              <RetiroInquiryForm retiroId={retiro.id} ediciones={edicionesAbiertas.map(e => ({ id: e.id, nombre: e.nombre ?? formatDate(e.fechaInicio) }))} />
            </section>
          </div>

          {/* Sidebar sticky en desktop */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="border border-line rounded-xl p-5 bg-canvas">
                <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-3">Resumen</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-ink-muted">Destino</span><span className="font-semibold">{retiro.ciudad}, {retiro.pais}</span></div>
                  <div className="flex justify-between"><span className="text-ink-muted">Duración</span><span className="font-semibold">{retiro.diasDuracion} días / {retiro.nochesDuracion} noches</span></div>
                  <div className="flex justify-between"><span className="text-ink-muted">Género</span><span className="font-semibold">{generoLabel[retiro.genero]}</span></div>
                  <div className="flex justify-between"><span className="text-ink-muted">Nivel</span><span className="font-semibold">Cat {retiro.nivelMax}–{retiro.nivelMin}</span></div>
                  {minPrecio && <div className="flex justify-between pt-2 border-t border-line"><span className="text-ink-muted">Desde</span><span className="mono font-semibold text-base">{formatPrice(minPrecio)}</span></div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
