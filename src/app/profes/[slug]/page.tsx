import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import { profes } from "@/db/schema";
import { eq, ilike } from "drizzle-orm";
import type { Metadata } from "next";

// ============================================================
// CIUDAD CONFIG — slugs que resuelven a páginas de ciudad
// ============================================================
const ciudadConfig: Record<string, { label: string; pais: string; comunas: string[] }> = {
  santiago: { label: "Santiago", pais: "Chile", comunas: ["Providencia", "Las Condes", "Ñuñoa", "Vitacura", "Miraflores", "San Miguel"] },
  "buenos-aires": { label: "Buenos Aires", pais: "Argentina", comunas: ["Palermo", "Belgrano", "Recoleta", "Caballito", "San Telmo"] },
  montevideo: { label: "Montevideo", pais: "Uruguay", comunas: ["Pocitos", "Carrasco", "Punta Carretas", "Malvín"] },
};

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

export async function generateStaticParams() {
  const allProfes = await db.query.profes.findMany({ where: eq(profes.estado, "activo") });
  const profeParams = allProfes.map((p) => ({ slug: p.slug }));
  const ciudadParams = Object.keys(ciudadConfig).map((c) => ({ slug: c }));
  return [...profeParams, ...ciudadParams];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ciudad = ciudadConfig[slug];
  if (ciudad) {
    return {
      title: `Profesores de Pádel en ${ciudad.label} — Directorio Verificado | Pulso Pádel`,
      description: `Directorio verificado de profes de pádel en ${ciudad.label}, ${ciudad.pais}. Filtrá por nivel, especialidad y precio.`,
    };
  }
  const profe = await db.query.profes.findFirst({ where: eq(profes.slug, slug) });
  if (!profe) return { title: "Profe no encontrado" };
  return {
    title: profe.metaTitulo ?? `${profe.nombre} ${profe.apellido} — Profe de Pádel en ${profe.ciudad} | Pulso Pádel`,
    description: profe.metaDescripcion ?? profe.bioCorta ?? undefined,
  };
}

export default async function ProfeOCiudadPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Si el slug coincide con una ciudad conocida → renderizar página de ciudad
  const ciudadCfg = ciudadConfig[slug];
  if (ciudadCfg) {
    return <CiudadPage slug={slug} cfg={ciudadCfg} />;
  }

  // Si no → renderizar ficha del profe
  const profe = await db.query.profes.findFirst({ where: eq(profes.slug, slug) });
  if (!profe || profe.estado !== "activo") notFound();
  return <ProfePerfilPage profe={profe} />;
}

// ============================================================
// PÁGINA DE CIUDAD
// ============================================================
async function CiudadPage({ slug, cfg }: { slug: string; cfg: { label: string; pais: string; comunas: string[] } }) {
  const listado = await db.query.profes.findMany({
    where: (p, { eq: eqF, and: andF }) => andF(eqF(p.estado, "activo"), ilike(p.ciudad, cfg.label)),
    orderBy: (p, { desc }) => [desc(p.destacado), desc(p.ratingPromedio)],
  });

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
              Directorio verificado de profes en {cfg.label}, {cfg.pais}. Filtrá por nivel, especialidad y precio.
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

// ============================================================
// FICHA DEL PROFE
// ============================================================
type Profe = Awaited<ReturnType<typeof db.query.profes.findFirst>>;

async function ProfePerfilPage({ profe }: { profe: NonNullable<Profe> }) {
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
    "address": { "@type": "PostalAddress", "addressLocality": profe.ciudad, "addressCountry": profe.pais },
    ...(profe.ratingPromedio && profe.reviewsCount && profe.reviewsCount > 0 ? {
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": profe.ratingPromedio, "reviewCount": profe.reviewsCount, "bestRating": 5, "worstRating": 1 },
    } : {}),
    ...(precio ? { "offers": { "@type": "Offer", "price": precio, "priceCurrency": moneda, "name": "Clase individual 60 minutos" } } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar activeSection="/profes" />
      <main>
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
                  {profe.verificado && <span className="mono text-[10px] bg-[#A8E63A]/10 text-[#65A30D] border border-[#A8E63A]/30 px-2 py-0.5 rounded">✓ Verificado</span>}
                  {profe.destacado && <span className="mono text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded">Destacado</span>}
                  {profe.nuevo && <span className="mono text-[10px] bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded">Nuevo</span>}
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

        <section className="px-6 md:px-8 py-6 border-b border-line bg-canvas">
          <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="border border-line rounded-xl p-4">
              <div className="mono text-[10px] text-ink-soft uppercase mb-2">Enseña</div>
              <div className="flex flex-wrap gap-1">
                {(profe.categoriasQueEnsena ?? []).sort().map((c) => (
                  <span key={c} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: catColors[c] ?? "#888" }}>{c}</span>
                ))}
              </div>
              <div className="text-xs text-ink-muted mt-1">{(profe.categoriasQueEnsena ?? []).sort().map((c) => catNombres[c]).join(", ")}</div>
            </div>
            <div className="border border-line rounded-xl p-4">
              <div className="mono text-[10px] text-ink-soft uppercase mb-2">Precio desde</div>
              <div className="font-semibold text-lg">{precio ? `$${precio.toLocaleString("es-CL")}` : "Consultar"}</div>
              {precio && <div className="text-xs text-ink-muted">{moneda} / clase individual</div>}
            </div>
            <div className="border border-line rounded-xl p-4">
              <div className="mono text-[10px] text-ink-soft uppercase mb-2">Modalidades</div>
              <div className="text-sm text-ink-muted leading-relaxed">{(profe.modalidades ?? []).map((m) => m.replace(/_/g, " ")).join(", ")}</div>
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
            <div className="lg:col-span-2 space-y-10">
              {(profe.sobreMiMd || profe.bioCorta) && (
                <section>
                  <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Sobre mí</div>
                  <p className="text-base text-ink-muted leading-relaxed whitespace-pre-line">{profe.sobreMiMd || profe.bioCorta}</p>
                </section>
              )}
              {profe.metodologiaMd && (
                <section>
                  <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Metodología</div>
                  <p className="text-base text-ink-muted leading-relaxed whitespace-pre-line">{profe.metodologiaMd}</p>
                </section>
              )}
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
                      {profe.precioIndividual60min && <tr className="border-b border-line"><td className="px-5 py-3">Individual — 60 min</td><td className="px-5 py-3 text-right font-semibold">${profe.precioIndividual60min.toLocaleString("es-CL")} {moneda}</td></tr>}
                      {profe.precioIndividual90min && <tr className="border-b border-line"><td className="px-5 py-3">Individual — 90 min</td><td className="px-5 py-3 text-right font-semibold">${profe.precioIndividual90min.toLocaleString("es-CL")} {moneda}</td></tr>}
                      {profe.precioPareja60min && <tr className="border-b border-line"><td className="px-5 py-3">En pareja — 60 min <span className="text-ink-muted text-xs">(por persona)</span></td><td className="px-5 py-3 text-right font-semibold">${profe.precioPareja60min.toLocaleString("es-CL")} {moneda}</td></tr>}
                      {profe.precioGrupo60min && <tr className="border-b border-line"><td className="px-5 py-3">Grupo 3–4 — 60 min <span className="text-ink-muted text-xs">(por persona)</span></td><td className="px-5 py-3 text-right font-semibold">${profe.precioGrupo60min.toLocaleString("es-CL")} {moneda}</td></tr>}
                      {profe.precioClinica60min && <tr className="border-b border-line"><td className="px-5 py-3">Clínica — 60 min <span className="text-ink-muted text-xs">(por persona)</span></td><td className="px-5 py-3 text-right font-semibold">${profe.precioClinica60min.toLocaleString("es-CL")} {moneda}</td></tr>}
                      {profe.precioVideoAnalisis && <tr><td className="px-5 py-3">Video análisis</td><td className="px-5 py-3 text-right font-semibold">${profe.precioVideoAnalisis.toLocaleString("es-CL")} {moneda}</td></tr>}
                    </tbody>
                  </table>
                </div>
                {profe.permitePaquetes && profe.descuentoPaquete10Pct && (
                  <div className="mt-3 text-sm text-ink-muted border border-[#A8E63A]/30 bg-[#A8E63A]/5 rounded-lg px-4 py-3">
                    Paquete 10 clases: <span className="font-semibold text-[#65A30D]">{profe.descuentoPaquete10Pct}% de descuento</span>. Consultalo directamente.
                  </div>
                )}
              </section>
              <section>
                <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Experiencia y formación</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-canvas-warm border border-line flex items-center justify-center text-sm">🏆</div><span className="text-sm">{profe.anosExperiencia} años enseñando pádel</span></div>
                  {profe.exJugadorPro && <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-canvas-warm border border-line flex items-center justify-center text-sm">🎾</div><span className="text-sm">Ex-jugador profesional{profe.exJugadorProCircuito ? ` — ${profe.exJugadorProCircuito}` : ""}</span></div>}
                  {(profe.certificaciones ?? []).map((cert) => (
                    <div key={cert} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-canvas-warm border border-line flex items-center justify-center text-sm">{profe.certificacionVerificada ? "✓" : "📋"}</div>
                      <span className="text-sm">{cert}{profe.certificacionVerificada && <span className="ml-1 text-[#65A30D] text-xs">(verificada)</span>}</span>
                    </div>
                  ))}
                  {(profe.idiomas ?? []).length > 0 && <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-canvas-warm border border-line flex items-center justify-center text-sm">🌐</div><span className="text-sm">Clases en {(profe.idiomas ?? []).join(", ")}</span></div>}
                </div>
              </section>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-6 space-y-4">
                <div className="border border-[#A8E63A] rounded-xl p-6 bg-canvas">
                  <div className="display text-xl font-semibold mb-1">Primera clase</div>
                  {precio && <div className="text-3xl font-bold mt-2">${precio.toLocaleString("es-CL")}<span className="text-sm font-normal text-ink-muted ml-1">{moneda}</span></div>}
                  <div className="text-xs text-ink-muted mb-5">clase individual · 60 minutos</div>
                  <Link href={`/profes/${profe.slug}/contactar`} className="block w-full bg-[#A8E63A] text-[#0D1B2A] text-center py-3 rounded-lg font-semibold hover:bg-[#7DB81E] transition-colors">
                    Escribirle →
                  </Link>
                  {profe.whatsapp && (
                    <a href={`https://wa.me/${profe.whatsapp.replace(/[^0-9]/g, "")}?text=Hola%20${profe.nombre}%2C%20te%20encontré%20en%20tupadel.com%20y%20me%20gustaría%20saber%20más%20sobre%20tus%20clases.`} target="_blank" rel="noopener noreferrer" className="block w-full border border-line text-center py-3 rounded-lg text-sm font-medium hover:border-ink-muted transition-colors mt-3">
                      WhatsApp directo
                    </a>
                  )}
                  <div className="mt-4 pt-4 border-t border-line space-y-2 text-xs text-ink-muted">
                    {profe.respuestaPromedioHoras && <div>Responde en ~{profe.respuestaPromedioHoras}h promedio</div>}
                    <div>Listing verificado por Pulso Pádel</div>
                  </div>
                </div>
                {profe.instagram && (
                  <div className="border border-line rounded-xl p-4">
                    <div className="mono text-[10px] text-ink-soft uppercase mb-3">Redes sociales</div>
                    <a href={`https://instagram.com/${profe.instagram}`} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-muted hover:text-ink transition-colors">
                      @{profe.instagram} (Instagram) →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {relacionados.length > 0 && (
          <section className="px-6 md:px-8 py-12 border-t border-line bg-canvas-warm">
            <div className="max-w-[1400px] mx-auto">
              <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">→ También en {profe.ciudad}</div>
              <h2 className="display text-2xl font-semibold mb-6" style={{ letterSpacing: "-0.02em" }}>Otros profes en la zona</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relacionados.map((r) => (
                  <Link key={r.id} href={`/profes/${r.slug}`} className="border border-line rounded-xl p-5 bg-canvas hover:border-ink-muted transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#0D1B2A] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{r.nombre[0]}{r.apellido[0]}</div>
                      <div><div className="font-semibold text-sm">{r.nombre} {r.apellido}</div><div className="text-xs text-ink-muted">{r.ciudad}{r.comuna ? `, ${r.comuna}` : ""}</div></div>
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
