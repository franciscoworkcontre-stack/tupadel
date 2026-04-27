import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const palasData: Record<string, {
  slug: string; marca: string; modelo: string; anio: number; forma: string;
  nivelMin: number; nivelMax: number; pesoMin: number; pesoMax: number;
  balance: string; nucleo: string; cara: string; perfil: number;
  pot: number; ctrl: number; sal: number; score: number;
  descripcion: string; jugadoresPro: string[];
  pros: string[]; contras: string[];
  precioActual: number; tiendas: { nombre: string; precio: number; descuento?: number; envio: string; stock: boolean; mejor?: boolean }[];
  minHistorico: number; maxHistorico: number;
  colorFrom: string;
}> = {
  "bullpadel-vertex-04": {
    slug: "bullpadel-vertex-04", marca: "Bullpadel", modelo: "Vertex 04", anio: 2025,
    forma: "Diamante", nivelMin: 2, nivelMax: 3, pesoMin: 365, pesoMax: 375,
    balance: "Cabeza", nucleo: "MultiEva soft", cara: "Carbono 12K", perfil: 38,
    pot: 9, ctrl: 6, sal: 7, score: 8.4,
    descripcion: "La pala de cabecera del circuito Premier Padel. Diamante puro, equilibrio en cabeza, salida explosiva. Para jugadores que ya saben qué quieren del remate.",
    jugadoresPro: ["Ale Galán", "Pablo Coello"],
    pros: ["Salida de bola explosiva en remate", "Efectos limpios y predecibles", "Construcción robusta para uso intensivo"],
    contras: ["Castiga el codo si tu técnica falla", "Punto dulce reducido", "Precio alto para vida útil de 6–8 meses"],
    precioActual: 219990,
    tiendas: [
      { nombre: "Padelnuestro CL", precio: 219990, descuento: 18, envio: "3 días", stock: true, mejor: true },
      { nombre: "Decathlon CL", precio: 229990, descuento: 12, envio: "2 días", stock: true },
      { nombre: "MercadoLibre", precio: 234500, envio: "5 días", stock: true },
      { nombre: "Time2Padel", precio: 249990, envio: "15 días (desde ES)", stock: true },
      { nombre: "PadelPoint", precio: 0, envio: "—", stock: false },
    ],
    minHistorico: 199990, maxHistorico: 269990,
    colorFrom: "from-[#DC2626]",
  },
  "nox-at10-genius": {
    slug: "nox-at10-genius", marca: "Nox", modelo: "AT10 Genius", anio: 2025,
    forma: "Lágrima", nivelMin: 2, nivelMax: 4, pesoMin: 360, pesoMax: 375,
    balance: "Medio-cabeza", nucleo: "HR3 Carbon", cara: "Carbono 18K", perfil: 38,
    pot: 8, ctrl: 8, sal: 8, score: 9.1,
    descripcion: "La pala más equilibrada del mercado en 2025. Lágrima con balance medio-cabeza que premia tanto el control como la potencia. La favorita de Agustín Tapia.",
    jugadoresPro: ["Agustín Tapia"],
    pros: ["Punto dulce amplio", "Versatilidad: funciona para drive y revés", "Excelente salida de bola en bandeja y víbora"],
    contras: ["Precio elevado", "No es la más potente del mercado en remate"],
    precioActual: 254990,
    tiendas: [
      { nombre: "Padelnuestro CL", precio: 254990, descuento: 12, envio: "3 días", stock: true, mejor: true },
      { nombre: "Time2Padel", precio: 259990, envio: "15 días", stock: true },
      { nombre: "MercadoLibre", precio: 269500, envio: "5 días", stock: true },
    ],
    minHistorico: 229990, maxHistorico: 289990,
    colorFrom: "from-[#008F47]",
  },
};

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pala = palasData[slug];
  if (!pala) return {};
  return {
    title: `${pala.marca} ${pala.modelo} ${pala.anio} — Precio y Review | tupadel`,
    description: `Review completa de la ${pala.marca} ${pala.modelo}. Comparamos precio en ${pala.tiendas.length} tiendas de Chile. Score editorial: ${pala.score}/10. Cat ${pala.nivelMin}–${pala.nivelMax}.`,
  };
}

export default async function PalaPage({ params }: Props) {
  const { slug } = await params;
  const pala = palasData[slug];
  if (!pala) notFound();

  return (
    <>
      <Navbar activeSection="/palas" />
      <div className="px-6 py-2 border-b border-line bg-canvas-warm">
        <div className="max-w-[1400px] mx-auto mono text-xs text-ink-soft">
          <Link href="/palas" className="hover:text-ink">Palas</Link> · {pala.marca} · {pala.modelo}
        </div>
      </div>
      <main>
        {/* Hero */}
        <section className="px-6 md:px-8 py-10 md:py-12 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="aspect-[4/5] bg-gradient-to-br from-canvas-warm to-canvas-dim rounded-2xl flex items-center justify-center relative border border-line">
              <div className={`w-44 md:w-56 h-64 md:h-80 bg-gradient-to-b ${pala.colorFrom} to-ink rounded-[40%/30%] shadow-2xl`} />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] border border-line bg-canvas font-medium">{pala.forma}</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-canvas-dim font-medium">CAT {pala.nivelMin}–{pala.nivelMax}</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-2">{pala.marca} · {pala.anio}</div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em", lineHeight: "1" }}>{pala.modelo}</h1>
            <p className="text-lg text-ink-muted mt-4 leading-relaxed max-w-2xl">{pala.descripcion}</p>

            {/* Score */}
            <div className="mt-7 flex items-center gap-8 pb-7 border-b border-line">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="stat-num text-7xl">{pala.score.toFixed(1)}</span>
                  <span className="text-xl text-ink-soft">/10</span>
                </div>
                <div className="mono text-xs text-ink-soft uppercase mt-1">Score editorial</div>
              </div>
              <div className="grid grid-cols-3 gap-6 flex-1">
                {[
                  { label: "Potencia", val: pala.pot, color: "#E8590C" },
                  { label: "Control", val: pala.ctrl, color: "#00B85C" },
                  { label: "Salida", val: pala.sal, color: "#0891B2" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="mono text-xs text-ink-soft uppercase mb-1">{s.label}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-canvas-dim rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${s.val * 10}%`, backgroundColor: s.color }} />
                      </div>
                      <span className="mono text-sm font-semibold">{s.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="mt-6 grid grid-cols-4 gap-4">
              {[
                { label: "Forma", val: pala.forma },
                { label: "Peso", val: `${pala.pesoMin}–${pala.pesoMax} g` },
                { label: "Balance", val: pala.balance },
                { label: "Núcleo", val: pala.nucleo },
                { label: "Cara", val: pala.cara },
                { label: "Perfil", val: `${pala.perfil} mm` },
                { label: "Nivel", val: `Cat ${pala.nivelMin}–${pala.nivelMax}` },
                { label: "Pro", val: pala.jugadoresPro[0] },
              ].map((s) => (
                <div key={s.label}>
                  <div className="mono text-[10px] text-ink-soft uppercase">{s.label}</div>
                  <div className="font-semibold mt-0.5 text-sm">{s.val}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button className="bg-[#00B85C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#008F47] transition-colors">
                Ver mejor precio: {formatPrice(pala.precioActual)}
              </button>
              <button className="border border-line px-5 py-3 rounded-lg font-medium text-sm hover:border-ink transition-colors">
                🔔 Configurar alerta
              </button>
              <button className="border border-line px-5 py-3 rounded-lg font-medium text-sm hover:border-ink transition-colors">
                ⇄ Comparar
              </button>
            </div>
          </div>
        </section>

        {/* Comparador */}
        <section className="px-6 md:px-8 py-10 border-t border-line max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="display text-2xl md:text-3xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
                Precios en {pala.tiendas.filter((t) => t.stock).length} tiendas
              </h2>
              <p className="text-sm text-ink-muted mt-1">
                Mín. histórico (90d): <span className="mono font-semibold text-ink">{formatPrice(pala.minHistorico)}</span> · Máx: <span className="mono font-semibold text-ink">{formatPrice(pala.maxHistorico)}</span>
              </p>
            </div>
            <button className="text-sm font-semibold text-[#00B85C]">🔔 Avisame si baja de {formatPrice(pala.minHistorico)}</button>
          </div>
          <div className="border border-line rounded-xl overflow-hidden">
            <div className="bg-canvas-warm border-b border-line grid grid-cols-[1.5fr_1fr_0.8fr_1fr_0.6fr] gap-3 px-4 py-3 mono text-[10px] uppercase tracking-wider text-ink-soft font-semibold">
              <div>Tienda</div><div>Precio actual</div><div>Descuento</div><div>Envío</div><div></div>
            </div>
            {pala.tiendas.map((t) => (
              <div key={t.nombre} className={`grid grid-cols-[1.5fr_1fr_0.8fr_1fr_0.6fr] gap-3 items-center px-4 py-3 border-b border-line last:border-0 text-sm ${!t.stock ? "opacity-50" : ""}`}>
                <div className="font-semibold">{t.nombre}</div>
                <div className="flex items-center gap-2">
                  {t.stock ? (
                    <>
                      <span className={`mono font-bold ${t.mejor ? "text-[#008F47]" : ""}`}>{formatPrice(t.precio)}</span>
                      {t.mejor && <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#D1FAE5] text-[#008F47]">MEJOR</span>}
                    </>
                  ) : (
                    <span className="mono text-ink-muted">Sin stock</span>
                  )}
                </div>
                <div className="mono text-xs text-[#E8590C]">{t.descuento ? `↓ ${t.descuento}%` : "—"}</div>
                <div className="mono text-xs">{t.envio}</div>
                <div>
                  {t.stock ? (
                    <span className="text-[#00B85C] font-semibold cursor-pointer">Ver →</span>
                  ) : (
                    <span className="text-ink-soft text-xs">Avisar →</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pros/Contras */}
        <section className="px-6 md:px-8 py-12 border-t border-line bg-canvas-warm max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mono text-[11px] text-[#008F47] uppercase mb-3 font-semibold">A FAVOR</div>
              <div className="space-y-2">
                {pala.pros.map((p) => (
                  <div key={p} className="flex items-start gap-2 text-sm">
                    <span className="text-[#00B85C] font-bold mt-0.5">✓</span>{p}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mono text-[11px] text-[#E8590C] uppercase mb-3 font-semibold">EN CONTRA</div>
              <div className="space-y-2">
                {pala.contras.map((c) => (
                  <div key={c} className="flex items-start gap-2 text-sm">
                    <span className="text-[#E8590C] font-bold mt-0.5">→</span>{c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom sticky on mobile */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-line bg-canvas/95 backdrop-blur px-4 py-3 flex items-center gap-3">
          <div className="flex-1">
            <div className="mono text-[10px] text-ink-soft uppercase">Mejor precio</div>
            <div className="mono text-base font-bold text-[#008F47]">{formatPrice(pala.precioActual)}</div>
          </div>
          <button className="bg-[#00B85C] text-white px-5 py-2.5 rounded-lg font-semibold text-sm">Ver →</button>
        </div>
      </main>
      <Footer />
    </>
  );
}
