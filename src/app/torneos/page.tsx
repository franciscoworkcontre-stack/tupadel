import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import { torneos } from "@/db/schema";
import { gte } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Torneos de Pádel en Chile — Calendario | Pulso Pádel",
  description: "Próximos torneos de pádel en Chile. Premier Padel, A1 Padel, FPCH y circuitos amateur. Filtrado por categoría y ciudad.",
};

const catColors: Record<number, string> = {
  1: "#DC2626", 2: "#EA580C", 3: "#D97706", 4: "#65A30D", 5: "#0891B2", 6: "#7C3AED",
};

const circuitoLabel: Record<string, string> = {
  "chile-amateur": "Amateur",
  fpch: "FPCH",
  "a1-padel": "A1 Padel",
  "premier-padel": "Premier Padel",
};

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

function formatFecha(d: Date) {
  const dia = d.getDate().toString();
  const mes = d.toLocaleString("es-CL", { month: "short" }).toUpperCase().replace(".", "");
  return { dia, mes };
}

export default async function TorneosPage() {
  const torneosDb = await db
    .select()
    .from(torneos)
    .where(gte(torneos.fechaInicio, new Date()))
    .orderBy(torneos.fechaInicio)
    .limit(20);

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

        <section className="px-6 md:px-8 py-3 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <span className="mono text-xs text-ink-soft uppercase">Filtrar:</span>
            {["Circuito ▾", "Categoría ▾", "Ciudad ▾"].map(f => (
              <button key={f} className="inline-flex px-3 py-1.5 rounded-full border border-line bg-canvas text-sm hover:border-ink transition-colors">
                {f}
              </button>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-8 py-10 max-w-[1400px] mx-auto">
          <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-5">
            → Próximos torneos ({torneosDb.length})
          </div>
          <div className="space-y-4">
            {torneosDb.map((t) => {
              const { dia, mes } = formatFecha(t.fechaInicio);
              const color = t.categoriaTarget ? catColors[t.categoriaTarget] : "#6B7280";
              const circuito = circuitoLabel[t.circuito] ?? t.circuito;
              const inscripcionOpen = t.estado === "abierto";
              return (
                <div key={t.slug} className="border border-line rounded-xl p-5 flex items-center gap-6 hover:border-ink-muted transition-colors">
                  <div className="text-center w-16 flex-shrink-0">
                    <div className="display text-2xl font-semibold leading-none">{dia}</div>
                    <div className="mono text-[10px] uppercase">{mes}</div>
                  </div>
                  <div className="flex-1 border-l border-line pl-6">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="display text-lg font-semibold">{t.nombre}</div>
                      {t.categoriaTarget && (
                        <>
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                          <span className="mono text-xs text-ink-soft">Cat {t.categoriaTarget}</span>
                        </>
                      )}
                    </div>
                    <div className="mono text-xs text-ink-soft">
                      {[t.ciudad, circuito, t.capacidadParejas ? `${t.capacidadParejas} parejas` : null, t.precioInscripcionClp ? formatPrice(t.precioInscripcionClp) + "/pareja" : null].filter(Boolean).join(" · ")}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                      inscripcionOpen ? "bg-[#ECFCCB] text-[#7DB81E]" : "bg-canvas-dim text-ink-muted"
                    }`}>
                      {inscripcionOpen ? "Inscripción abierta" : "Próximamente"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="border-t border-line px-6 md:px-8 py-12 bg-canvas-warm">
          <div className="max-w-xl mx-auto text-center">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-3">→ ¿Organizás un torneo?</div>
            <h2 className="display text-3xl font-semibold mb-3" style={{ letterSpacing: "-0.02em" }}>Publicá tu torneo gratis</h2>
            <p className="text-ink-muted mb-6">Llegá a miles de jugadores. Gestión de inscripciones y difusión incluidos.</p>
            <button className="bg-[#0D1B2A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a2f47] transition-colors">
              Publicar torneo →
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
