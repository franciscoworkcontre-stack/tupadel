import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import { profes } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

const catColors: Record<number, string> = {
  1: "#DC2626", 2: "#EA580C", 3: "#D97706", 4: "#65A30D", 5: "#0891B2", 6: "#7C3AED",
};
const catNombres: Record<number, string> = {
  1: "Competitivo", 2: "Avanzado", 3: "Intermedio alto", 4: "Intermedio", 5: "Intermedio bajo", 6: "Iniciación",
};
const especialidadLabels: Record<string, string> = {
  vibora: "Víbora", juego_femenino: "Juego femenino", iniciacion_adulta: "Iniciación adulta",
  ninos: "Niños", mental_game: "Mental game", tactica: "Táctica", preparacion_fisica: "Preparación física",
  tecnica_avanzada: "Técnica avanzada", transicion_competitiva: "Transición competitiva",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const profe = await db.query.profes.findFirst({ where: eq(profes.slug, slug) });
  if (!profe) return { title: "Profe no encontrado" };
  return {
    title: profe.metaTitulo ?? `${profe.nombre} ${profe.apellido} — Profe de Pádel en ${profe.ciudad} | Pulso Pádel`,
    description: profe.metaDescripcion ?? profe.bioCorta ?? undefined,
  };
}

export default async function ProfePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profe = await db.query.profes.findFirst({ where: eq(profes.slug, slug) });
  if (!profe || profe.estado !== "activo") notFound();

  const relacionados = await db.query.profes.findMany({
    where: (p, { eq: eqF, and: andF, ne }) => andF(eqF(p.ciudad, profe.ciudad), eqF(p.estado, "activo"), ne(p.id, profe.id)),
    limit: 3,
    orderBy: (p, { desc }) => [desc(p.ratingPromedio)],
  });

  const precio = profe.precioIndividual60min;
  const moneda = profe.monedaBase ?? "CLP";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": `${profe.nombre} ${profe.apellido}`,
    "jobTitle": "Padel Coach",
    "description": profe.bioCorta,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": profe.ciudad,
      "addressCountry": profe.pais,
    },
    ...(profe.ratingPromedio && profe.reviewsCount && profe.reviewsCount > 0 ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": profe.ratingPromedio,
        "reviewCount": profe.reviewsCount,
        "bestRating": 5,
        "worstRating": 1,
      },
    } : {}),
    ...(precio ? {
      "offers": {
        "@type": "Offer",
        "price": precio,
        "priceCurrency": moneda,
        "name": "Clase individual 60 minutos",
      },
    } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar activeSection="/profes" />
      <main>
        {/* Hero */}
        <section className="px-6 md:px-8 py-10 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-5">
              <Link href="/profes" className="hover:text-ink transition-colors">← Profes</Link>
              <span className="mx-2">·</span>
              <span>{profe.ciudad}</span>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-[#0D1B2A] flex items-center justify-center text-white font-bold text-4xl flex-shrink-0">
                {profe.nombre[0]}{profe.apellido[0]}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center mb-2">
                  {profe.verificado && (
                    <span className="mono text-[10px] bg-[#A8E63A]/10 text-[#65A30D] border border-[#A8E63A]/30 px-2 py-0.5 rounded">✓ Verificado</span>
                  )}
                  {profe.destacado && (
                    <span className="mono text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded">Destacado</span>
                  )}
                  {profe.nuevo && (
                    <span className="mono text-[10px] bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded">Nuevo</span>
                  )}
                </div>
                <h1 className="display text-4xl md:text-5xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
                  {profe.nombre} {profe.apellido}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-ink-muted">
                  <span>{profe.ciudad}{profe.comuna ? `, ${profe.comuna}` : ""}</span>
                  <span>{profe.anosExperiencia} años de experiencia</span>
                  {profe.exJugadorPro && <span>Ex-jugador pro {profe.exJugadorProCircuito ? `(${profe.exJugadorProCircuito})` : ""}</span>}
                  {profe.atiendeOnline && <span>Atiende online</span>}
                </div>
                {profe.ratingPromedio && (
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className={`text-lg ${s <= Math.round(profe.ratingPromedio!) ? "text-yellow-400" : "text-gray-200"}`}>★</span>
                      ))}
                    </div>
                    <span className="font-semibold">{profe.ratingPromedio.toFixed(1)}</span>
                    <span className="text-ink-muted">({profe.reviewsCount} reviews · {profe.clasesDadasCount} clases dadas)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Quick stats */}
        <section className="px-6 md:px-8 py-6 border-b border-line bg-canvas">
          <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-line rounded-xl p-4">
              <div className="mono text-[10px] text-ink-soft uppercase mb-2">Enseña</div>
              <div className="flex flex-wrap gap-1">
                {(profe.categoriasQueEnsena ?? []).sort().map((c) => (
                  <span key={c} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: catColors[c] ?? "#888" }}>
                    {c}
                  </span>
                ))}
              </div>
              <div className="text-xs text-ink-muted mt-1">
                {(profe.categoriasQueEnsena ?? []).sort().map((c) => catNombres[c]).join(", ")}
              </div>
            </div>
            <div className="border border-line rounded-xl p-4">
              <div className="mono text-[10px] text-ink-soft uppercase mb-2">Precio desde</div>
              <div className="font-semibold text-lg">{precio ? `$${precio.toLocaleString("es-CL")}` : "Consultar"}</div>
              {precio && <div className="text-xs text-ink-muted">{moneda} / clase individual</div>}
            </div>
            <div className="border border-line rounded-xl p-4">
              <div className="mono text-[10px] text-ink-soft uppercase mb-2">Modalidades</div>
              <div className="text-sm text-ink-muted leading-relaxed">
                {(profe.modalidades ?? []).map((m) => m.replace(/_/g, " ")).join(", ")}
              </div>
            </div>
            <div className="border border-line rounded-xl p-4">
              <div className="mono text-[10px] text-ink-soft uppercase mb-2">Responde en</div>
              <div className="font-semibold">{profe.respuestaPromedioHoras ? `~${profe.respuestaPromedioHoras}h` : "Pronto"}</div>
              <div className="text-xs text-ink-muted">tiempo promedio</div>
            </div>
          </div>
        </section>

        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contenido principal */}
            <div className="lg:col-span-2 space-y-10">
              {/* Sobre mí */}
              {(profe.sobreMiMd || profe.bioCorta) && (
                <section>
                  <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Sobre mí</div>
                  <p className="text-base text-ink-muted leading-relaxed whitespace-pre-line">
                    {profe.sobreMiMd || profe.bioCorta}
                  </p>
                </section>
              )}

              {/* Metodología */}
              {profe.metodologiaMd && (
                <section>
                  <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Metodología</div>
                  <p className="text-base text-ink-muted leading-relaxed whitespace-pre-line">{profe.metodologiaMd}</p>
                </section>
              )}

              {/* Especialidades */}
              {(profe.especialidades ?? []).length > 0 && (
                <section>
                  <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Especialidades</div>
                  <div className="flex flex-wrap gap-2">
                    {(profe.especialidades ?? []).map((e) => (
                      <span key={e} className="border border-line px-4 py-2 rounded-lg text-sm font-medium">
                        {especialidadLabels[e] ?? e.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Precios */}
              <section>
                <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Precios y modalidades</div>
                <div className="border border-line rounded-xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-line bg-canvas-warm">
                        <th className="text-left px-5 py-3 text-ink-muted font-normal mono text-xs">Modalidad</th>
                        <th className="text-right px-5 py-3 text-ink-muted font-normal mono text-xs">Precio / persona</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profe.precioIndividual60min && (
                        <tr className="border-b border-line">
                          <td className="px-5 py-3">Individual — 60 min</td>
                          <td className="px-5 py-3 text-right font-semibold">${profe.precioIndividual60min.toLocaleString("es-CL")} {moneda}</td>
                        </tr>
                      )}
                      {profe.precioIndividual90min && (
                        <tr className="border-b border-line">
                          <td className="px-5 py-3">Individual — 90 min</td>
                          <td className="px-5 py-3 text-right font-semibold">${profe.precioIndividual90min.toLocaleString("es-CL")} {moneda}</td>
                        </tr>
                      )}
                      {profe.precioPareja60min && (
                        <tr className="border-b border-line">
                          <td className="px-5 py-3">En pareja — 60 min <span className="text-ink-muted text-xs">(por persona)</span></td>
                          <td className="px-5 py-3 text-right font-semibold">${profe.precioPareja60min.toLocaleString("es-CL")} {moneda}</td>
                        </tr>
                      )}
                      {profe.precioGrupo60min && (
                        <tr className="border-b border-line">
                          <td className="px-5 py-3">Grupo 3–4 — 60 min <span className="text-ink-muted text-xs">(por persona)</span></td>
                          <td className="px-5 py-3 text-right font-semibold">${profe.precioGrupo60min.toLocaleString("es-CL")} {moneda}</td>
                        </tr>
                      )}
                      {profe.precioClinica60min && (
                        <tr className="border-b border-line">
                          <td className="px-5 py-3">Clínica — 60 min <span className="text-ink-muted text-xs">(por persona)</span></td>
                          <td className="px-5 py-3 text-right font-semibold">${profe.precioClinica60min.toLocaleString("es-CL")} {moneda}</td>
                        </tr>
                      )}
                      {profe.precioVideoAnalisis && (
                        <tr>
                          <td className="px-5 py-3">Video análisis</td>
                          <td className="px-5 py-3 text-right font-semibold">${profe.precioVideoAnalisis.toLocaleString("es-CL")} {moneda}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {profe.permitePaquetes && profe.descuentoPaquete10Pct && (
                  <div className="mt-3 text-sm text-ink-muted border border-[#A8E63A]/30 bg-[#A8E63A]/5 rounded-lg px-4 py-3">
                    Paquete 10 clases: <span className="font-semibold text-[#65A30D]">{profe.descuentoPaquete10Pct}% de descuento</span>. Consultalo directamente.
                  </div>
                )}
              </section>

              {/* Experiencia y certificaciones */}
              <section>
                <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Experiencia y formación</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-canvas-warm border border-line flex items-center justify-center text-sm">🏆</div>
                    <span className="text-sm">{profe.anosExperiencia} años enseñando pádel</span>
                  </div>
                  {profe.exJugadorPro && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-canvas-warm border border-line flex items-center justify-center text-sm">🎾</div>
                      <span className="text-sm">Ex-jugador profesional{profe.exJugadorProCircuito ? ` — ${profe.exJugadorProCircuito}` : ""}</span>
                    </div>
                  )}
                  {(profe.certificaciones ?? []).map((cert) => (
                    <div key={cert} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-canvas-warm border border-line flex items-center justify-center text-sm">
                        {profe.certificacionVerificada ? "✓" : "📋"}
                      </div>
                      <span className="text-sm">{cert}{profe.certificacionVerificada && <span className="ml-1 text-[#65A30D] text-xs">(verificada)</span>}</span>
                    </div>
                  ))}
                  {(profe.idiomas ?? []).length > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-canvas-warm border border-line flex items-center justify-center text-sm">🌐</div>
                      <span className="text-sm">Clases en {(profe.idiomas ?? []).join(", ")}</span>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar de contacto */}
            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                {/* Card de contacto */}
                <div className="border border-[#A8E63A] rounded-xl p-6 bg-canvas">
                  <div className="display text-xl font-semibold mb-1">Primera clase</div>
                  {precio && (
                    <div className="text-3xl font-bold mt-2">${precio.toLocaleString("es-CL")}<span className="text-sm font-normal text-ink-muted ml-1">{moneda}</span></div>
                  )}
                  <div className="text-xs text-ink-muted mb-5">clase individual · 60 minutos</div>

                  <Link
                    href={`/profes/${profe.slug}/contactar`}
                    className="block w-full bg-[#A8E63A] text-[#0D1B2A] text-center py-3 rounded-lg font-semibold hover:bg-[#7DB81E] transition-colors"
                  >
                    Escribirle →
                  </Link>

                  {profe.whatsapp && (
                    <a
                      href={`https://wa.me/${profe.whatsapp.replace(/[^0-9]/g, "")}?text=Hola%20${profe.nombre}%2C%20te%20encontré%20en%20tupadel.com%20y%20me%20gustaría%20saber%20más%20sobre%20tus%20clases.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full border border-line text-center py-3 rounded-lg text-sm font-medium hover:border-ink-muted transition-colors mt-3"
                    >
                      WhatsApp directo
                    </a>
                  )}

                  <div className="mt-4 pt-4 border-t border-line space-y-2 text-xs text-ink-muted">
                    {profe.respuestaPromedioHoras && (
                      <div>Responde en ~{profe.respuestaPromedioHoras}h promedio</div>
                    )}
                    <div>Listing verificado por Pulso Pádel</div>
                  </div>
                </div>

                {/* Contacto */}
                {profe.instagram && (
                  <div className="border border-line rounded-xl p-4">
                    <div className="mono text-[10px] text-ink-soft uppercase mb-3">Redes sociales</div>
                    <a
                      href={`https://instagram.com/${profe.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink-muted hover:text-ink transition-colors"
                    >
                      @{profe.instagram} (Instagram) →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profes relacionados */}
        {relacionados.length > 0 && (
          <section className="px-6 md:px-8 py-12 border-t border-line bg-canvas-warm">
            <div className="max-w-[1400px] mx-auto">
              <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">→ También en {profe.ciudad}</div>
              <h2 className="display text-2xl font-semibold mb-6" style={{ letterSpacing: "-0.02em" }}>Otros profes en la zona</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relacionados.map((r) => (
                  <Link key={r.id} href={`/profes/${r.slug}`} className="border border-line rounded-xl p-5 bg-canvas hover:border-ink-muted transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#0D1B2A] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {r.nombre[0]}{r.apellido[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{r.nombre} {r.apellido}</div>
                        <div className="text-xs text-ink-muted">{r.ciudad}{r.comuna ? `, ${r.comuna}` : ""}</div>
                      </div>
                    </div>
                    <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed">{r.bioCorta}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
