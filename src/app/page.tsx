import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
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

const topPalas = [
  { slug: "bullpadel-vertex-04", marca: "Bullpadel", modelo: "Vertex 04", anio: 2025, forma: "Diamante", score: "8.4", precio: "$219.990", tiendas: 4, colorFrom: "from-[#DC2626]", pot: 9, ctrl: 6, sal: 7 },
  { slug: "nox-at10-genius", marca: "Nox", modelo: "AT10 Genius", anio: 2025, forma: "Lágrima", score: "9.1", precio: "$254.990", variacion: "↓ 12%", colorFrom: "from-[#008F47]", pot: 8, ctrl: 8, sal: 8 },
  { slug: "adidas-metalbone-hrd", marca: "Adidas", modelo: "Metalbone HRD+", anio: 2025, forma: "Redonda", score: "7.9", precio: "$184.990", tiendas: 6, colorFrom: "from-[#0891B2]", pot: 6, ctrl: 9, sal: 8 },
  { slug: "head-delta-pro-2026", marca: "Head", modelo: "Delta Pro 2026", anio: 2025, forma: "Diamante", score: "8.7", precio: "$239.990", tiendas: 5, colorFrom: "from-[#E8590C]", pot: 9, ctrl: 7, sal: 7 },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="px-6 md:px-8 pt-16 md:pt-20 pb-20 md:pb-24 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-5 md:mb-6">
              ↗ El copiloto del jugador amateur
            </div>
            <h1 className="display text-5xl md:text-7xl font-semibold leading-[0.95] text-balance" style={{ letterSpacing: "-0.03em" }}>
              Tu pádel,
              <br />
              <span className="italic font-normal">en piloto</span> automático.
            </h1>
            <p className="text-lg md:text-xl text-ink-muted mt-6 md:mt-8 max-w-xl leading-relaxed">
              Descubrí tu categoría real, qué entrenar para subir, qué pala te conviene y dónde
              jugarla. Reviews honestas, precios reales, comunidad activa.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-8 md:mt-10">
              <Link
                href="/diagnostico"
                className="bg-[#00B85C] text-white px-7 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#008F47] transition-colors"
              >
                Hacer diagnóstico de nivel <span>→</span>
              </Link>
              <span className="mono text-xs text-ink-soft">3 min · gratis · 12.847 jugadores</span>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="bg-canvas-warm rounded-2xl p-5 md:p-6 border border-line">
              <div className="flex items-baseline justify-between mb-4">
                <span className="mono text-xs uppercase tracking-wider text-ink-soft">Comparador en vivo</span>
                <span className="mono text-xs text-[#00B85C]">↗ actualizado hoy</span>
              </div>
              <div className="display text-xl md:text-2xl font-semibold mb-1">Bullpadel Vertex 04</div>
              <div className="mono text-xs text-ink-soft mb-5">Diamante · 365–375g · 2025</div>
              <div className="space-y-0">
                {[
                  { tienda: "Padelnuestro", precio: "$219.990", mejor: true },
                  { tienda: "Decathlon CL", precio: "$229.990" },
                  { tienda: "MercadoLibre", precio: "$234.500" },
                  { tienda: "Time2Padel", precio: "$249.990" },
                ].map((row) => (
                  <div key={row.tienda} className="flex items-center justify-between py-2 border-b border-line last:border-0">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-line rounded-sm" />
                      <span className="text-sm">{row.tienda}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {row.mejor && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#D1FAE5] text-[#008F47]">
                          MEJOR
                        </span>
                      )}
                      <span className={`mono text-sm font-semibold ${row.mejor ? "text-[#008F47]" : ""}`}>{row.precio}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
                <span className="text-xs text-ink-soft">Mín. histórico: <span className="mono font-semibold text-ink">$199.990</span></span>
                <Link href="/palas/bullpadel-vertex-04" className="text-xs text-[#00B85C] font-semibold">Ver ficha completa →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-line py-8 bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "847", label: "palas con review" },
              { num: "312", label: "canchas indexadas" },
              { num: "14", label: "ciudades en Chile" },
              { num: "2.4K", label: "precios actualizados/día" },
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
            <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-2">→ Tres preguntas, una respuesta</div>
            <h2 className="display text-3xl md:text-4xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Lo que tupadel resuelve</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tag: "01 · ¿QUÉ PALA?", title: "Reviews honestas con precios reales", desc: "Comparamos cada pala en 6 tiendas. Histórico de 90 días, alertas de bajada, recomendador según tu juego.", href: "/palas" },
              { tag: "02 · ¿DÓNDE JUGAR?", title: "Canchas con precios y disponibilidad", desc: "Directorio de clubes filtrable por comuna, indoor/outdoor, precio por franja horaria y reseñas reales.", href: "/canchas" },
              { tag: "03 · ¿CÓMO MEJORAR?", title: "Ruta de aprendizaje según tu nivel", desc: "Diagnóstico de categoría 1–6 y plan personalizado: golpes, tácticas, drills semanales y profes en tu zona.", href: "/categorias" },
            ].map((p) => (
              <Link key={p.tag} href={p.href} className="border border-line rounded-xl p-7 bg-canvas hover:border-[#00B85C] transition-colors group">
                <div className="mono text-xs text-[#00B85C] mb-3">{p.tag}</div>
                <h3 className="display text-2xl font-semibold mb-3">{p.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed mb-5">{p.desc}</p>
                <span className="text-sm font-semibold text-[#00B85C]">Explorar →</span>
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
            {topPalas.map((p) => (
              <Link key={p.slug} href={`/palas/${p.slug}`} className="border border-line rounded-xl overflow-hidden bg-canvas hover:border-ink-muted transition-colors">
                <div className="aspect-[4/5] bg-gradient-to-br from-canvas-warm to-canvas-dim flex items-center justify-center relative">
                  <div className={`w-24 md:w-32 h-36 md:h-44 bg-gradient-to-b ${p.colorFrom} to-ink rounded-[40%/30%] shadow-xl`} />
                  <span className="absolute top-3 left-3 inline-flex items-center px-2 py-0.5 rounded text-[10px] border border-line bg-canvas">{p.forma}</span>
                  <span className="absolute top-3 right-3 mono text-xs font-semibold bg-ink text-white px-2 py-0.5 rounded">{p.score}</span>
                </div>
                <div className="p-4">
                  <div className="mono text-[10px] text-ink-soft uppercase">{p.marca} · {p.anio}</div>
                  <div className="display text-base md:text-lg font-semibold mt-1">{p.modelo}</div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="mono text-sm md:text-base font-semibold">{p.precio}</span>
                    {p.variacion ? (
                      <span className="mono text-xs text-[#E8590C]">{p.variacion}</span>
                    ) : (
                      <span className="mono text-xs text-ink-soft">en {p.tiendas} tiendas</span>
                    )}
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-1 text-[10px]">
                    <div className="text-center"><div className="text-ink-soft">POT</div><div className="font-semibold mono">{p.pot}</div></div>
                    <div className="text-center"><div className="text-ink-soft">CTRL</div><div className="font-semibold mono">{p.ctrl}</div></div>
                    <div className="text-center"><div className="text-ink-soft">SAL</div><div className="font-semibold mono">{p.sal}</div></div>
                  </div>
                </div>
              </Link>
            ))}
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
            <Link href="/diagnostico" className="inline-block mt-8 bg-[#00B85C] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#008F47] transition-colors">
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
