import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistema de Categorías 1–6 | tupadel",
  description: "Entendé el sistema de niveles del pádel amateur en Chile. Qué domina cada categoría y cómo subir de nivel.",
};

const cats = [
  { n: 6, nombre: "Iniciación", color: "#7C3AED", pct: "~18%", desc: "Primeros pasos: agarre, postura, drive y revés básicos." },
  { n: 5, nombre: "Intermedio bajo", color: "#0891B2", pct: "~28%", desc: "Bandeja con dirección, globo defensivo, comunicación básica." },
  { n: 4, nombre: "Intermedio", color: "#65A30D", pct: "~24%", desc: "Víbora, globo táctico, bajadas, contrapared básica." },
  { n: 3, nombre: "Intermedio alto", color: "#D97706", pct: "~15%", desc: "X3, x4, dejada, chiquita, variación de ritmo." },
  { n: 2, nombre: "Avanzado", color: "#EA580C", pct: "~10%", desc: "Remate definitivo, presión sistemática, contraataque." },
  { n: 1, nombre: "Competitivo", color: "#DC2626", pct: "~5%", desc: "Ejecución bajo presión, estrategia por rival, mental game." },
];

export default function CategoriasPage() {
  return (
    <>
      <Navbar activeSection="/golpes" />
      <main>
        <section className="px-6 md:px-8 py-12 md:py-16 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Sistema de niveles</div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>Categorías 1–6</h1>
            <p className="text-ink-muted text-xl mt-5 max-w-2xl leading-relaxed">
              El sistema FPCH define 6 categorías de nivel para el pádel amateur. Cada una tiene golpes específicos que dominar y una ruta clara para subir.
            </p>
            <Link href="/diagnostico" className="inline-block mt-8 bg-[#00B85C] text-white px-7 py-4 rounded-lg font-semibold hover:bg-[#008F47] transition-colors">
              Descubrir mi categoría en 3 min →
            </Link>
          </div>
        </section>
        <section className="px-6 md:px-8 py-12 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cats.map((cat) => (
              <Link key={cat.n} href={`/categorias/${cat.n}`} className="border border-line rounded-xl p-7 bg-canvas hover:border-ink-muted transition-colors group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="mono text-xs">CATEGORÍA {cat.n}</span>
                  <span className="mono text-xs text-ink-soft ml-auto">{cat.pct} de jugadores</span>
                </div>
                <div className="display text-2xl font-semibold mb-2">{cat.nombre}</div>
                <div className="text-sm text-ink-muted">{cat.desc}</div>
                <div className="mt-5 text-sm font-semibold" style={{ color: cat.color }}>
                  Ver ruta Cat {cat.n} →
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
