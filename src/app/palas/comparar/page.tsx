"use client";

import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { useState } from "react";

const palasDisponibles = [
  { slug: "bullpadel-vertex-04", marca: "Bullpadel", modelo: "Vertex 04", anio: 2025, forma: "Diamante", nivel: "Cat 2–3", score: 8.4, precio: 219990, pot: 9, ctrl: 6, sal: 7, peso: "365–375g", balance: "Cabeza", nucleo: "MultiEva soft", cara: "Carbono 12K", perfil: "38mm", colorFrom: "from-[#DC2626]" },
  { slug: "nox-at10-genius", marca: "Nox", modelo: "AT10 Genius", anio: 2025, forma: "Lágrima", nivel: "Cat 2–4", score: 9.1, precio: 254990, pot: 8, ctrl: 8, sal: 8, peso: "360–375g", balance: "Medio-cabeza", nucleo: "HR3 Carbon", cara: "Carbono 18K", perfil: "38mm", colorFrom: "from-[#7DB81E]" },
  { slug: "adidas-metalbone-hrd", marca: "Adidas", modelo: "Metalbone HRD+", anio: 2025, forma: "Redonda", nivel: "Cat 3–5", score: 7.9, precio: 184990, pot: 6, ctrl: 9, sal: 8, peso: "360–375g", balance: "Medio", nucleo: "EVA Soft", cara: "Carbono 12K", perfil: "36mm", colorFrom: "from-[#0891B2]" },
  { slug: "head-delta-pro-2026", marca: "Head", modelo: "Delta Pro 2026", anio: 2025, forma: "Diamante", nivel: "Cat 1–2", score: 8.7, precio: 239990, pot: 9, ctrl: 7, sal: 7, peso: "365–375g", balance: "Cabeza", nucleo: "EVA Comfort", cara: "Carbono", perfil: "38mm", colorFrom: "from-[#E8590C]" },
  { slug: "bullpadel-hack-04", marca: "Bullpadel", modelo: "Hack 04", anio: 2025, forma: "Redonda", nivel: "Cat 4–6", score: 8.1, precio: 149990, pot: 6, ctrl: 9, sal: 7, peso: "355–370g", balance: "Mango", nucleo: "MultiEva", cara: "Fibra de vidrio", perfil: "36mm", colorFrom: "from-[#D97706]" },
  { slug: "babolat-air-veron", marca: "Babolat", modelo: "Air Veron", anio: 2025, forma: "Diamante", nivel: "Cat 2–3", score: 8.2, precio: 209990, pot: 8, ctrl: 7, sal: 8, peso: "355–375g", balance: "Cabeza", nucleo: "HR3", cara: "Carbono", perfil: "38mm", colorFrom: "from-[#DC2626]" },
  { slug: "siux-diablo-rx", marca: "Siux", modelo: "Diablo RX", anio: 2025, forma: "Diamante", nivel: "Cat 1–2", score: 8.5, precio: 289990, pot: 9, ctrl: 6, sal: 8, peso: "365–380g", balance: "Cabeza", nucleo: "EVA Ultra Soft", cara: "Carbono 12K", perfil: "40mm", colorFrom: "from-[#7C3AED]" },
  { slug: "nox-ml10-pro-cup", marca: "Nox", modelo: "ML10 Pro Cup", anio: 2025, forma: "Híbrida", nivel: "Cat 3–5", score: 8.0, precio: 199990, pot: 7, ctrl: 8, sal: 8, peso: "355–375g", balance: "Medio", nucleo: "Hesacore", cara: "Carbono", perfil: "38mm", colorFrom: "from-[#0891B2]" },
];

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

const attrs = [
  { key: "precio", label: "Precio min.", format: (p: typeof palasDisponibles[0]) => formatPrice(p.precio) },
  { key: "forma", label: "Forma", format: (p: typeof palasDisponibles[0]) => p.forma },
  { key: "nivel", label: "Nivel", format: (p: typeof palasDisponibles[0]) => p.nivel },
  { key: "peso", label: "Peso", format: (p: typeof palasDisponibles[0]) => p.peso },
  { key: "balance", label: "Balance", format: (p: typeof palasDisponibles[0]) => p.balance },
  { key: "nucleo", label: "Núcleo", format: (p: typeof palasDisponibles[0]) => p.nucleo },
  { key: "cara", label: "Cara", format: (p: typeof palasDisponibles[0]) => p.cara },
  { key: "perfil", label: "Perfil", format: (p: typeof palasDisponibles[0]) => p.perfil },
];

export default function CompararPage() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(slug: string) {
    setSelected(prev => {
      if (prev.includes(slug)) return prev.filter(s => s !== slug);
      if (prev.length >= 3) return prev;
      return [...prev, slug];
    });
  }

  const comparadas = palasDisponibles.filter(p => selected.includes(p.slug));

  return (
    <>
      <Navbar activeSection="/palas" />
      <main>
        <section className="px-6 md:px-8 py-10 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-3">→ Comparador</div>
            <h1 className="display text-4xl md:text-5xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              Comparar palas
            </h1>
            <p className="text-ink-muted mt-3 max-w-xl">Seleccioná hasta 3 palas para comparar sus specs, potencia, control y precio.</p>
          </div>
        </section>

        {/* Selector */}
        <section className="px-6 md:px-8 py-8 border-b border-line">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-4">
              → Elegí hasta 3 palas ({selected.length}/3 seleccionadas)
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {palasDisponibles.map(p => {
                const isSelected = selected.includes(p.slug);
                const isDisabled = !isSelected && selected.length >= 3;
                return (
                  <button
                    key={p.slug}
                    onClick={() => toggle(p.slug)}
                    disabled={isDisabled}
                    className={`border rounded-xl p-3 text-left transition-all ${
                      isSelected
                        ? "border-[#A8E63A] bg-[#ECFCCB]/30"
                        : isDisabled
                        ? "border-line opacity-40 cursor-not-allowed"
                        : "border-line hover:border-ink-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-10 bg-gradient-to-b ${p.colorFrom} to-ink rounded-lg`} />
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[#A8E63A] flex items-center justify-center text-[#0D1B2A] text-xs font-bold">✓</span>
                      )}
                    </div>
                    <div className="mono text-[10px] text-ink-soft uppercase">{p.marca}</div>
                    <div className="font-semibold text-sm">{p.modelo}</div>
                    <div className="mono text-xs text-ink-muted mt-0.5">{formatPrice(p.precio)}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tabla comparativa */}
        {comparadas.length >= 2 && (
          <section className="px-6 md:px-8 py-10 max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-6">→ Comparación</div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left w-32 pb-4 text-xs text-ink-soft font-normal mono uppercase">Atributo</th>
                    {comparadas.map(p => (
                      <th key={p.slug} className="pb-4 px-4">
                        <div className={`w-16 h-20 bg-gradient-to-b ${p.colorFrom} to-ink rounded-xl mx-auto mb-2`} />
                        <div className="mono text-[10px] uppercase text-ink-soft">{p.marca}</div>
                        <div className="display font-semibold text-sm">{p.modelo}</div>
                        <div className="mono text-xs mt-1 font-semibold">{p.score.toFixed(1)}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Scores */}
                  <tr className="border-t border-line">
                    <td className="py-4 text-xs text-ink-soft mono uppercase">Potencia</td>
                    {comparadas.map(p => (
                      <td key={p.slug} className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <div className="h-2 bg-line rounded-full w-16 overflow-hidden">
                            <div className="h-full bg-[#DC2626] rounded-full" style={{ width: `${p.pot * 10}%` }} />
                          </div>
                          <span className="mono text-xs font-semibold">{p.pot}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-line">
                    <td className="py-4 text-xs text-ink-soft mono uppercase">Control</td>
                    {comparadas.map(p => (
                      <td key={p.slug} className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <div className="h-2 bg-line rounded-full w-16 overflow-hidden">
                            <div className="h-full bg-[#0891B2] rounded-full" style={{ width: `${p.ctrl * 10}%` }} />
                          </div>
                          <span className="mono text-xs font-semibold">{p.ctrl}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-line">
                    <td className="py-4 text-xs text-ink-soft mono uppercase">Salida</td>
                    {comparadas.map(p => (
                      <td key={p.slug} className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <div className="h-2 bg-line rounded-full w-16 overflow-hidden">
                            <div className="h-full bg-[#A8E63A] rounded-full" style={{ width: `${p.sal * 10}%` }} />
                          </div>
                          <span className="mono text-xs font-semibold">{p.sal}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                  {/* Attrs */}
                  {attrs.map(a => (
                    <tr key={a.key} className="border-t border-line">
                      <td className="py-3.5 text-xs text-ink-soft mono uppercase">{a.label}</td>
                      {comparadas.map((p, i) => {
                        const vals = comparadas.map(c => a.key === "precio" ? c.precio : "");
                        const isMin = a.key === "precio" && comparadas.length > 1 && p.precio === Math.min(...comparadas.map(c => c.precio));
                        return (
                          <td key={p.slug} className={`py-3.5 px-4 text-center text-sm ${isMin ? "text-[#7DB81E] font-semibold" : ""}`}>
                            {a.format(p)}
                            {isMin && <span className="ml-1 mono text-[10px]">↓</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {/* Score editorial */}
                  <tr className="border-t border-line bg-canvas-warm">
                    <td className="py-4 text-xs text-ink-soft mono uppercase font-semibold">Score editorial</td>
                    {comparadas.map(p => {
                      const isMax = p.score === Math.max(...comparadas.map(c => c.score));
                      return (
                        <td key={p.slug} className="py-4 px-4 text-center">
                          <span className={`inline-block px-3 py-1 rounded mono text-sm font-semibold ${isMax ? "bg-ink text-white" : "bg-canvas-dim text-ink"}`}>
                            {p.score.toFixed(1)}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                  {/* CTA */}
                  <tr className="border-t border-line">
                    <td className="py-4" />
                    {comparadas.map(p => (
                      <td key={p.slug} className="py-4 px-4 text-center">
                        <Link href={`/palas/${p.slug}`} className="inline-block bg-[#A8E63A] text-[#0D1B2A] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#7DB81E] transition-colors">
                          Ver pala →
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {comparadas.length < 2 && (
          <section className="px-6 md:px-8 py-20 text-center">
            <div className="text-4xl mb-4">🏓</div>
            <p className="text-ink-muted">Seleccioná al menos 2 palas para ver la comparación.</p>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
