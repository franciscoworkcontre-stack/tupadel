export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { VideoIntro } from "@/components/video-intro";
import { db } from "@/db";
import { palas, preciosPalas } from "@/db/schema";
import { eq, desc, sql, and, isNotNull } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "tupadel — El copiloto del jugador amateur de pádel",
  description:
    "Reviews de palas con precios reales comparados en 6 tiendas, diagnóstico de nivel Cat 1–6, directorio de canchas y comunidad para jugadores de pádel en Chile y LATAM.",
};

const catColors: Record<number, string> = {
  1: "bg-[#DC2626]",
  2: "bg-[#EA580C]",
  3: "bg-[#D97706]",
  4: "bg-[#65A30D]",
  5: "bg-[#0891B2]",
  6: "bg-[#7C3AED]",
};

const categorias = [
  { num: 6, nombre: "Iniciación", resumen: "Drive y revés con bote, posición de espera, salida básica." },
  { num: 5, nombre: "Intermedio bajo", resumen: "Bandeja con dirección, globo defensivo, comunicación." },
  { num: 4, nombre: "Intermedio", resumen: "Víbora, globo táctico, bajadas de tres metros." },
  { num: 3, nombre: "Intermedio alto", resumen: "X3, x4, dejada tras globo, chiquitas, australiana." },
  { num: 2, nombre: "Avanzado", resumen: "Remate definitivo, presión sistemática, contraataque." },
  { num: 1, nombre: "Competitivo", resumen: "Ejecución bajo presión, estrategia por rival, mental game." },
];

const colorFromByMarca: Record<string, string> = {
  Bullpadel: "from-[#DC2626]",
  Nox: "from-[#7DB81E]",
  Adidas: "from-[#0891B2]",
  Head: "from-[#E8590C]",
  Babolat: "from-[#DC2626]",
  Siux: "from-[#7C3AED]",
};

const formaLabel: Record<string, string> = {
  diamante: "Diamante", lagrima: "Lágrima", redonda: "Redonda", hibrida: "Híbrida",
};

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

export default async function HomePage() {
  const topPalas = await db
    .select({
      id: palas.id,
      slug: palas.slug,
      marca: palas.marca,
      modelo: palas.modelo,
      anio: palas.anio,
      forma: palas.forma,
      scoreEditorial: palas.scoreEditorial,
      imagenPrincipal: palas.imagenPrincipal,
      perfilPotencia: palas.perfilPotencia,
      perfilControl: palas.perfilControl,
      perfilSalida: palas.perfilSalida,
    })
    .from(palas)
    .where(and(eq(palas.publicada, true), isNotNull(palas.imagenPrincipal)))
    .orderBy(desc(palas.scoreEditorial))
    .limit(4);

  const precios = await db
    .select({
      palaId: preciosPalas.palaId,
      minPrecio: sql<number>`min(${preciosPalas.precioClp})`,
    })
    .from(preciosPalas)
    .groupBy(preciosPalas.palaId);

  const precioMap = Object.fromEntries(precios.map(p => [p.palaId, p.minPrecio]));

  return (
    <>
      <VideoIntro />

      {/* Navbar flota sobre el hero */}
      <Navbar dark />

      <main>
        {/* Hero — dark full-bleed */}
        <section className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #0a1520 40%, #111d2b 100%)" }}>
          {/* Imagen: player stays right, left naturally dark */}
          <Image
            src="/hero-player.jpg"
            alt="Jugador de pádel en acción"
            fill
            priority
            className="object-cover object-right"
          />

          {/* Gradiente izquierda — refuerza el área de texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/70 to-transparent" />
          {/* Gradiente inferior — transición hacia el resto de la página */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />

          {/* Wrapper que centra verticalmente, con pt para clearear la navbar */}
          <div className="relative z-10 flex items-center min-h-screen w-full">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-8 pt-20">
              <div className="max-w-xl md:max-w-2xl">
                <div className="mono text-xs text-white/50 uppercase tracking-widest mb-5 md:mb-6">
                  ↗ Todo lo que necesitás para jugar mejor
                </div>
                <h1
                  className="display text-5xl md:text-7xl font-semibold leading-[0.93] text-white text-balance"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Un lugar para
                  <br />
                  <span className="italic font-normal" style={{ color: "#A8E63A" }}>todo</span> tu pádel.
                </h1>
                <p className="text-lg md:text-xl text-white/65 mt-6 md:mt-8 max-w-xl leading-relaxed">
                  Diagnóstico de nivel, ruta de mejora, comparador de palas, directorio de canchas y comunidad — en un solo lugar, para el jugador amateur de Chile y LATAM.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8 md:mt-10">
                  <Link
                    href="/diagnostico"
                    className="bg-[#A8E63A] text-[#0D1B2A] px-7 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#7DB81E] transition-colors"
                  >
                    Descubrí tu nivel real <span>→</span>
                  </Link>
                  <Link
                    href="/palas/recomendador"
                    className="border border-white/30 text-white px-7 py-4 rounded-lg font-semibold flex items-center gap-2 hover:border-white/60 transition-colors"
                  >
                    ¿Qué pala me conviene?
                  </Link>
                </div>
                <div className="mono text-xs text-white/35 mt-5">3 min · gratis · 12.847 jugadores</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-line py-8 bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "12.8K", label: "jugadores diagnosticados" },
              { num: "312", label: "canchas en Chile" },
              { num: "847", label: "palas comparadas" },
              { num: "14", label: "ciudades cubiertas" },
            ].map((s) => (
              <div key={s.label}>
                <div className="stat-num text-4xl md:text-5xl">{s.num}</div>
                <div className="text-sm text-ink-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Three pillars */}
        <section className="px-6 md:px-8 py-16 md:py-20 max-w-[1400px] mx-auto">
          <div className="mb-10">
            <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-2">→ El sistema completo</div>
            <h2 className="display text-3xl md:text-4xl font-semibold text-balance" style={{ letterSpacing: "-0.02em" }}>
              Todo lo que un jugador amateur necesita,<br className="hidden md:block" /> <span className="italic font-normal">en un solo lugar.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tag: "01 · NIVEL Y MEJORA", title: "Sabé exactamente dónde estás", desc: "Diagnóstico de categoría Cat 1–6 basado en tu juego real. Tu ruta personalizada: qué golpes dominar, qué tácticas incorporar, qué drills hacer esta semana.", href: "/diagnostico" },
              { tag: "02 · EQUIPO", title: "La pala correcta para tu juego", desc: "Reviews honestas comparadas en 6 tiendas. Recomendador según tu nivel y estilo. Histórico de precios, alertas de bajada, sin publicidad.", href: "/palas" },
              { tag: "03 · CANCHAS Y COMUNIDAD", title: "Jugá más y mejor", desc: "Directorio de clubes con precios reales por franja. Encontrá compañero de tu nivel y zona. Todo lo que necesitás para armar punto.", href: "/canchas" },
            ].map((p) => (
              <Link key={p.tag} href={p.href} className="border border-line rounded-xl p-7 bg-canvas hover:border-[#A8E63A] transition-colors group">
                <div className="mono text-xs text-[#A8E63A] mb-3">{p.tag}</div>
                <h3 className="display text-2xl font-semibold mb-3">{p.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed mb-5">{p.desc}</p>
                <span className="text-sm font-semibold text-[#A8E63A]">Explorar →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured palas */}
        <section className="px-6 md:px-8 py-14 md:py-16 border-t border-line max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-2">→ Top reviews esta semana</div>
              <h2 className="display text-3xl md:text-4xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Palas que estamos probando</h2>
            </div>
            <Link href="/palas" className="text-sm font-semibold hidden md:flex items-center gap-1">Ver todas →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {topPalas.map((p) => {
              const colorFrom = colorFromByMarca[p.marca] ?? "from-[#0D1B2A]";
              const precio = precioMap[p.id];
              return (
                <Link key={p.slug} href={`/palas/${p.slug}`} className="border border-line rounded-xl overflow-hidden bg-canvas hover:border-ink-muted transition-colors">
                  <div className="aspect-[4/5] bg-gradient-to-br from-canvas-warm to-canvas-dim flex items-center justify-center relative overflow-hidden">
                    {p.imagenPrincipal ? (
                      <Image
                        src={p.imagenPrincipal}
                        alt={`${p.marca} ${p.modelo}`}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className={`w-24 md:w-32 h-36 md:h-44 bg-gradient-to-b ${colorFrom} to-ink rounded-[40%/30%] shadow-xl`} />
                    )}
                    <span className="absolute top-3 left-3 inline-flex items-center px-2 py-0.5 rounded text-[10px] border border-line bg-canvas z-10">
                      {formaLabel[p.forma ?? ""] ?? p.forma}
                    </span>
                    {p.scoreEditorial && (
                      <span className="absolute top-3 right-3 mono text-xs font-semibold bg-ink text-white px-2 py-0.5 rounded z-10">
                        {p.scoreEditorial.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="mono text-[10px] text-ink-soft uppercase">{p.marca} · {p.anio}</div>
                    <div className="display text-base md:text-lg font-semibold mt-1">{p.modelo}</div>
                    {precio && (
                      <div className="mt-3">
                        <span className="mono text-sm md:text-base font-semibold">{formatPrice(precio)}</span>
                      </div>
                    )}
                    <div className="mt-3 grid grid-cols-3 gap-1 text-[10px]">
                      <div className="text-center"><div className="text-ink-soft">POT</div><div className="font-semibold mono">{p.perfilPotencia ?? "—"}</div></div>
                      <div className="text-center"><div className="text-ink-soft">CTRL</div><div className="font-semibold mono">{p.perfilControl ?? "—"}</div></div>
                      <div className="text-center"><div className="text-ink-soft">SAL</div><div className="font-semibold mono">{p.perfilSalida ?? "—"}</div></div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Categorías */}
        <section className="px-6 md:px-8 py-16 md:py-20 border-t border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-5">
              <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-3">→ Sistema de niveles</div>
              <h2 className="display text-4xl md:text-5xl font-semibold leading-tight text-balance" style={{ letterSpacing: "-0.02em" }}>
                Hay un orden para subir <span className="italic font-normal">de categoría.</span>
              </h2>
              <p className="text-ink-muted text-lg mt-6 leading-relaxed">
                No es talento. Es saber qué entrenar primero. Cada categoría tiene su lista: golpes que dominar, tácticas que incorporar, drills que repetir.
              </p>
              <Link href="/diagnostico" className="inline-block mt-8 bg-ink text-white px-6 py-3 rounded-lg font-semibold hover:bg-ink-muted transition-colors">
                Descubrir mi categoría →
              </Link>
            </div>
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categorias.map((cat) => (
                <Link key={cat.num} href={`/categorias/${cat.num}`} className="border border-line rounded-lg bg-canvas p-5 hover:border-ink-muted transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${catColors[cat.num]}`} />
                    <span className="mono text-xs">CATEGORÍA {cat.num}</span>
                  </div>
                  <div className="display text-lg font-semibold">{cat.nombre}</div>
                  <div className="text-xs text-ink-muted mt-2">{cat.resumen}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="px-6 md:px-8 py-20 md:py-24 border-t border-line">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-5">→ 12.847 jugadores ya lo hicieron</div>
            <h2 className="display text-4xl md:text-5xl font-semibold text-balance" style={{ letterSpacing: "-0.02em" }}>3 minutos. Tu categoría real.</h2>
            <p className="text-ink-muted text-lg mt-5 leading-relaxed">
              El diagnóstico analiza tu ejecución técnica, lectura de juego y experiencia competitiva para darte una categoría estimada de 1 a 6 con tu ruta personalizada.
            </p>
            <Link href="/diagnostico" className="inline-block mt-8 bg-[#A8E63A] text-[#0D1B2A] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#7DB81E] transition-colors">
              Hacer diagnóstico gratis →
            </Link>
            <div className="mono text-xs text-ink-soft mt-4">Sin registro · Resultado inmediato · Enviado a tu email</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
