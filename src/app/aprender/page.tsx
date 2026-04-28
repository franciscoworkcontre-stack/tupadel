import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aprender Pádel — Guías, Golpes, Tácticas y Drills | Pulso Pádel",
  description: "Todo lo que necesitás para mejorar en pádel: guías técnicas de golpes, tácticas por nivel, drills de entrenamiento y el sistema de categorías 1–6 explicado.",
};

const golpes = [
  { slug: "bandeja", nombre: "Bandeja", nivel: "Cat 5", color: "#0891B2", desc: "El golpe de salida de globo más importante. Base del juego en red." },
  { slug: "vibora", nombre: "Víbora", nivel: "Cat 4", color: "#65A30D", desc: "Variación cortada con pronación. Más agresiva y difícil de defender." },
  { slug: "remate", nombre: "Remate", nivel: "Cat 5", color: "#0891B2", desc: "El ataque definitivo en pelotas altas dentro de cancha." },
  { slug: "globo", nombre: "Globo", nivel: "Cat 6", color: "#7C3AED", desc: "La herramienta defensiva más subestimada. Táctica pura." },
  { slug: "x3", nombre: "X3", nivel: "Cat 3", color: "#D97706", desc: "Remate que sale de cancha por el lateral. Punto definitivo." },
  { slug: "x4", nombre: "X4", nivel: "Cat 2", color: "#EA580C", desc: "Remate que sale por el fondo. El golpe más técnico del pádel." },
  { slug: "contrapared", nombre: "Contrapared", nivel: "Cat 5", color: "#0891B2", desc: "Usar la pared lateral como aliada en defensa y ataque." },
  { slug: "dejada", nombre: "Dejada", nivel: "Cat 3", color: "#D97706", desc: "Golpe corto en red que cae al lado de la red del rival." },
  { slug: "chiquita", nombre: "Chiquita", nivel: "Cat 3", color: "#D97706", desc: "Efecto cortado en red para crear apertura al rival." },
  { slug: "salida-de-pared", nombre: "Salida de pared", nivel: "Cat 5", color: "#0891B2", desc: "Técnica para golpear efectivamente tras el rebote en el fondo." },
];

const tacticas = [
  { slug: "tres-cuartos", nombre: "El tres cuartos", nivel: "Cat 4", desc: "La posición en cancha que maximiza el control del punto desde la red." },
  { slug: "salida-de-globo", nombre: "Salida de globo", nivel: "Cat 5", desc: "Cómo defender un globo rival y no perder el punto defensivamente." },
  { slug: "presion-en-red", nombre: "Presión en red", nivel: "Cat 3", desc: "Cómo mantener la presión cuando tenés la red. El secreto del pádel moderno." },
  { slug: "el-lado-del-reves", nombre: "El lado del revés", nivel: "Cat 4", desc: "Por qué atacar siempre al revés del rival y cómo ejecutarlo." },
  { slug: "bajada-de-pared", nombre: "Bajada de pared", nivel: "Cat 4", desc: "Cómo usar la pared del rival para recuperar la red." },
  { slug: "rotura-de-parejas", nombre: "Rotura de parejas", nivel: "Cat 3", desc: "Crear descoordinación entre los rivales mediante diagonales y el cuerpo." },
];

const drillsDestacados = [
  { slug: "paralela-3-4", nombre: "Paralela 3-4", modalidad: "Pareja", duracion: "20 min", desc: "El fundamento del juego de fondo. Consistencia y dirección." },
  { slug: "red-fondo", nombre: "Red vs Fondo", modalidad: "Pareja", duracion: "15 min", desc: "Un jugador ataca en red, el otro defiende desde el fondo." },
  { slug: "globos-cruzados", nombre: "Globos cruzados", modalidad: "Pareja", duracion: "10 min", desc: "Consistencia defensiva: el globo que no falla nunca." },
  { slug: "bandeja-cierre", nombre: "Bandeja + cierre", modalidad: "Pareja", duracion: "15 min", desc: "Bandeja + inmediatamente cerrar red. El movimiento más importante." },
  { slug: "volea-baja", nombre: "Volea baja bajo presión", modalidad: "Pareja", duracion: "15 min", desc: "Recibir disparos en la red y neutralizar sin perder posición." },
  { slug: "cuadro-puntos", nombre: "Puntos por cuadros", modalidad: "Cuadro", duracion: "30 min", desc: "La forma más eficiente de entrenar en cuatro. Puntos cortos con objetivo." },
];

const cats = [
  { n: 6, nombre: "Iniciación", color: "#7C3AED", pct: "~18%", resumen: "Agarre, postura, drive y revés básicos. Primeras partidas." },
  { n: 5, nombre: "Intermedio bajo", color: "#0891B2", pct: "~28%", resumen: "Bandeja con dirección, globo defensivo, comunicación básica." },
  { n: 4, nombre: "Intermedio", color: "#65A30D", pct: "~24%", resumen: "Víbora, globo táctico, contrapared, bajadas de pared." },
  { n: 3, nombre: "Intermedio alto", color: "#D97706", pct: "~15%", resumen: "X3, dejada, chiquita, variación de ritmo, presión sistemática." },
  { n: 2, nombre: "Avanzado", color: "#EA580C", pct: "~10%", resumen: "X4, remate definitivo, presión mental, estrategia por rival." },
  { n: 1, nombre: "Competitivo", color: "#DC2626", pct: "~5%", resumen: "Ejecución bajo presión máxima, ajuste táctico en tiempo real." },
];

export default function AprenderPage() {
  return (
    <>
      <Navbar activeSection="/aprender" />
      <main>
        {/* Hero */}
        <section className="px-6 md:px-8 py-10 md:py-14 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Centro de aprendizaje</div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              Aprender pádel
            </h1>
            <p className="text-ink-muted text-xl mt-4 max-w-2xl leading-relaxed">
              Guías técnicas de golpes, tácticas por nivel, drills de entrenamiento y el sistema de categorías explicado. Todo lo que necesitás para subir de nivel.
            </p>
            <div className="flex items-center gap-3 mt-8 flex-wrap">
              <Link href="/diagnostico" className="bg-[#A8E63A] text-[#0D1B2A] px-6 py-3 rounded-lg font-semibold hover:bg-[#7DB81E] transition-colors">
                ¿Qué categoría soy? →
              </Link>
              <Link href="/categorias" className="border border-line px-5 py-3 rounded-lg font-medium text-sm hover:border-ink transition-colors">
                Sistema Cat 1–6
              </Link>
            </div>
          </div>
        </section>

        {/* Golpes */}
        <section className="px-6 md:px-8 py-12 max-w-[1400px] mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">→ Técnica</div>
              <h2 className="display text-3xl md:text-4xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Guías de golpes</h2>
            </div>
            <Link href="/golpes" className="mono text-xs text-ink-soft hover:text-ink transition-colors">Ver todos →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {golpes.map((g) => (
              <Link
                key={g.slug}
                href={`/golpes/${g.slug}`}
                className="border border-line rounded-xl p-5 bg-canvas hover:border-ink-muted transition-colors group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: g.color }} />
                  <span className="mono text-[10px] text-ink-soft uppercase">{g.nivel}</span>
                </div>
                <div className="display text-lg font-semibold mb-2 group-hover:text-ink transition-colors">{g.nombre}</div>
                <p className="text-sm text-ink-muted leading-relaxed">{g.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Tácticas */}
        <section className="px-6 md:px-8 py-12 border-t border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">→ Estrategia</div>
                <h2 className="display text-3xl md:text-4xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Tácticas</h2>
              </div>
              <Link href="/tacticas" className="mono text-xs text-ink-soft hover:text-ink transition-colors">Ver todas →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tacticas.map((t) => (
                <Link
                  key={t.slug}
                  href={`/tacticas/${t.slug}`}
                  className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors group"
                >
                  <div className="mono text-[10px] text-ink-soft uppercase mb-3">{t.nivel}</div>
                  <div className="display text-lg font-semibold mb-2">{t.nombre}</div>
                  <p className="text-sm text-ink-muted leading-relaxed">{t.desc}</p>
                  <div className="mt-4 text-xs text-ink-soft group-hover:text-ink transition-colors">Leer guía →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Drills */}
        <section className="px-6 md:px-8 py-12 max-w-[1400px] mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">→ Entrenamiento</div>
              <h2 className="display text-3xl md:text-4xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Drills</h2>
            </div>
            <Link href="/drills" className="mono text-xs text-ink-soft hover:text-ink transition-colors">Ver todos →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {drillsDestacados.map((d) => (
              <Link
                key={d.slug}
                href={`/drills/${d.slug}`}
                className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="mono text-[10px] border border-line px-2 py-0.5 rounded text-ink-soft">{d.modalidad}</span>
                  <span className="mono text-[10px] text-ink-soft">{d.duracion}</span>
                </div>
                <div className="display text-lg font-semibold mb-2">{d.nombre}</div>
                <p className="text-sm text-ink-muted leading-relaxed">{d.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Categorías */}
        <section className="px-6 md:px-8 py-12 border-t border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">→ Tu nivel</div>
                <h2 className="display text-3xl md:text-4xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Categorías 1–6</h2>
              </div>
              <Link href="/categorias" className="mono text-xs text-ink-soft hover:text-ink transition-colors">Ver sistema →</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {cats.map((cat) => (
                <Link
                  key={cat.n}
                  href={`/categorias/${cat.n}`}
                  className="border border-line rounded-xl p-5 bg-canvas hover:border-ink-muted transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mb-3" style={{ backgroundColor: cat.color }}>
                    {cat.n}
                  </div>
                  <div className="display text-base font-semibold mb-1">{cat.nombre}</div>
                  <div className="mono text-[10px] text-ink-soft mb-2">{cat.pct} de jugadores</div>
                  <p className="text-xs text-ink-muted leading-relaxed">{cat.resumen}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-8 py-12 border-t border-line max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/reglas" className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors">
              <div className="mono text-xs text-ink-soft uppercase mb-3">→ Reglas</div>
              <div className="display text-xl font-semibold mb-2">Reglamento oficial</div>
              <p className="text-sm text-ink-muted">Las reglas del pádel explicadas sin tecnicismos. Desde el saque hasta el reglamento de dobles.</p>
            </Link>
            <Link href="/glosario" className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors">
              <div className="mono text-xs text-ink-soft uppercase mb-3">→ Glosario</div>
              <div className="display text-xl font-semibold mb-2">Glosario de términos</div>
              <p className="text-sm text-ink-muted">Todos los términos del pádel explicados. De bandeja a víbora, de WPT a categoría.</p>
            </Link>
            <Link href="/diagnostico" className="border border-[#A8E63A] rounded-xl p-6 bg-canvas hover:bg-canvas-warm transition-colors">
              <div className="mono text-xs text-[#65A30D] uppercase mb-3">→ Test gratuito</div>
              <div className="display text-xl font-semibold mb-2">¿Qué categoría soy?</div>
              <p className="text-sm text-ink-muted">3 minutos. Respondés preguntas sobre tu juego y te decimos tu nivel con ruta de mejora personalizada.</p>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
