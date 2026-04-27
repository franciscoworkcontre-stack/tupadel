import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Directorio de Canchas de Pádel en Chile | tupadel",
  description: "Encuentra canchas de pádel en Santiago, Concepción, Viña del Mar y más. Precios por hora, horarios, indoor/outdoor, reseñas reales.",
};

const ciudades = [
  { slug: "santiago", nombre: "Santiago", clubes: 38, desde: 11000 },
  { slug: "concepcion", nombre: "Concepción", clubes: 14, desde: 9000 },
  { slug: "vina-del-mar", nombre: "Viña del Mar", clubes: 11, desde: 10000 },
  { slug: "antofagasta", nombre: "Antofagasta", clubes: 8, desde: 12000 },
  { slug: "la-serena", nombre: "La Serena", clubes: 6, desde: 9500 },
  { slug: "temuco", nombre: "Temuco", clubes: 7, desde: 8500 },
];

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

export default function CanchasPage() {
  return (
    <>
      <Navbar activeSection="/canchas" />
      <main>
        <section className="px-6 md:px-8 py-10 md:py-14 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Canchas en Chile</div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              Directorio de clubes
            </h1>
            <p className="text-ink-muted text-xl mt-4 max-w-2xl leading-relaxed">
              Precios comparados por franja horaria. Reviews reales de quien jugó. 312 canchas indexadas en 14 ciudades.
            </p>
          </div>
        </section>
        <section className="px-6 md:px-8 py-10 max-w-[1400px] mx-auto">
          <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-5">→ Elegí tu ciudad</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {ciudades.map((c) => (
              <Link key={c.slug} href={`/canchas/${c.slug}`} className="border border-line rounded-xl p-7 bg-canvas hover:border-ink-muted transition-colors group">
                <div className="display text-2xl font-semibold mb-2">{c.nombre}</div>
                <div className="mono text-sm text-ink-muted">{c.clubes} clubes</div>
                <div className="mono text-sm text-ink-muted mt-0.5">Desde {formatPrice(c.desde)}/h</div>
                <div className="mt-5 text-sm font-semibold text-[#00B85C]">Ver canchas →</div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
