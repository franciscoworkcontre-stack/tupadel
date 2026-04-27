import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golpes de Pádel — Guía Completa | tupadel",
  description: "Aprende todos los golpes del pádel: bandeja, víbora, remate, globo, x3, x4, contrapared, dejada y chiquita. Videos, errores comunes y drills.",
};

const golpes = [
  { slug: "bandeja", nombre: "Bandeja", cat: 5, nivel: "Intermedio bajo", desc: "El golpe de salida de globo más importante. Base para la víbora." },
  { slug: "vibora", nombre: "Víbora", cat: 4, nivel: "Intermedio", desc: "Variación cortada de la bandeja. Efecto diferente, dirección al cuerpo." },
  { slug: "remate", nombre: "Remate / Smash", cat: 5, nivel: "Intermedio bajo", desc: "El ataque definitivo en pelotas altas dentro de cancha." },
  { slug: "globo", nombre: "Globo", cat: 6, nivel: "Iniciación", desc: "Defensivo o táctico. La herramienta más subestimada del pádel amateur." },
  { slug: "x3", nombre: "X3 (por tres)", cat: 3, nivel: "Intermedio alto", desc: "Remate que sale de cancha por el lateral. Punto definitivo." },
  { slug: "x4", nombre: "X4 (por cuatro)", cat: 2, nivel: "Avanzado", desc: "Remate que sale por el fondo. La variante más técnica." },
  { slug: "contrapared", nombre: "Contrapared", cat: 5, nivel: "Intermedio bajo", desc: "Usar la pared lateral como aliada en defensa y ataque." },
  { slug: "dejada", nombre: "Dejada", cat: 3, nivel: "Intermedio alto", desc: "Golpe corto en red que cae al lado de la red del rival." },
  { slug: "chiquita", nombre: "Chiquita", cat: 3, nivel: "Intermedio alto", desc: "Golpe de efecto cortado en red para crear apertura." },
  { slug: "salida-de-pared", nombre: "Salida de pared", cat: 5, nivel: "Intermedio bajo", desc: "Técnica para salir de la pelota tras la pared trasera." },
];

const catColors: Record<number, string> = {
  1: "#DC2626", 2: "#EA580C", 3: "#D97706", 4: "#65A30D", 5: "#0891B2", 6: "#7C3AED",
};

export default function GolpesPage() {
  return (
    <>
      <Navbar activeSection="/golpes" />
      <main>
        <section className="px-6 md:px-8 py-10 md:py-14 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Biblioteca técnica</div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>Golpes de pádel</h1>
            <p className="text-ink-muted text-xl mt-4 max-w-2xl leading-relaxed">
              Guía completa de todos los golpes con videos, errores comunes y drills. Organizados por categoría de dificultad.
            </p>
          </div>
        </section>
        <section className="px-6 md:px-8 py-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {golpes.map((g) => (
              <Link key={g.slug} href={`/golpes/${g.slug}`} className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: catColors[g.cat] }} />
                  <span className="mono text-xs text-ink-soft">Desde Cat {g.cat} · {g.nivel}</span>
                </div>
                <div className="display text-xl font-semibold mb-2">{g.nombre}</div>
                <div className="text-sm text-ink-muted">{g.desc}</div>
                <div className="mt-4 text-sm font-semibold text-[#00B85C]">Ver guía →</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
