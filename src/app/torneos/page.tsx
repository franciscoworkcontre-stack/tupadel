import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Torneos de Pádel en Chile — Calendario | tupadel",
  description: "Próximos torneos de pádel en Chile. Premier Padel, A1 Padel, FPCH y circuitos amateur. Filtrado por categoría y ciudad.",
};

const torneos = [
  { nombre: "Open Las Condes Cat 4", circuito: "Amateur", ciudad: "Las Condes", fecha: "14 DIC", cat: 4, precio: 30000, parejas: 16, inscripcion: "Abierta" },
  { nombre: "Copa Verano La Reina Cat 4–5", circuito: "Amateur", ciudad: "La Reina", fecha: "21 DIC", cat: 4, precio: 45000, parejas: 24, inscripcion: "Abierta" },
  { nombre: "Verano Cup Vitacura", circuito: "Amateur", ciudad: "Vitacura", fecha: "11 ENE", cat: 3, precio: 55000, parejas: 32, inscripcion: "Próxima" },
  { nombre: "FPCH Categórico Santiago Cat 3", circuito: "FPCH", ciudad: "Santiago", fecha: "18 ENE", cat: 3, precio: 60000, parejas: 48, inscripcion: "Próxima" },
];

const catColors: Record<number, string> = {
  1: "#DC2626", 2: "#EA580C", 3: "#D97706", 4: "#65A30D", 5: "#0891B2", 6: "#7C3AED",
};

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

export default function TorneosPage() {
  return (
    <>
      <Navbar activeSection="/torneos" />
      <main>
        <section className="px-6 md:px-8 py-10 md:py-14 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Calendario 2025–2026</div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>Torneos</h1>
            <p className="text-ink-muted text-xl mt-4 max-w-2xl leading-relaxed">
              Premier Padel, A1 Padel, FPCH y torneos amateur cerca tuyo. Filtrado por categoría y ciudad.
            </p>
          </div>
        </section>
        <section className="px-6 md:px-8 py-10 max-w-[1400px] mx-auto">
          <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-5">→ Próximos torneos</div>
          <div className="space-y-4">
            {torneos.map((t) => (
              <div key={t.nombre} className="border border-line rounded-xl p-5 flex items-center gap-6">
                <div className="text-center w-16 flex-shrink-0">
                  <div className="display text-2xl font-semibold leading-none">{t.fecha.split(" ")[0]}</div>
                  <div className="mono text-[10px] uppercase">{t.fecha.split(" ")[1]}</div>
                </div>
                <div className="flex-1 border-l border-line pl-6">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="display text-lg font-semibold">{t.nombre}</div>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: catColors[t.cat] }} />
                    <span className="mono text-xs text-ink-soft">Cat {t.cat}</span>
                  </div>
                  <div className="mono text-xs text-ink-soft">{t.ciudad} · {t.circuito} · {t.parejas} parejas · {formatPrice(t.precio)}/pareja</div>
                </div>
                <div className="flex-shrink-0">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                    t.inscripcion === "Abierta" ? "bg-[#ECFCCB] text-[#7DB81E]" : "bg-canvas-dim text-ink-muted"
                  }`}>
                    {t.inscripcion}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
