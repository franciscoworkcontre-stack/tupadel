"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";

type Paso = { id: string; pregunta: string; opciones: { id: string; texto: string; desc?: string; vals: Record<string, number> }[] };

const pasos: Paso[] = [
  {
    id: "nivel",
    pregunta: "¿Cuál es tu categoría de juego?",
    opciones: [
      { id: "6", texto: "Iniciación · Cat 6", desc: "Llevo menos de un año jugando", vals: { nivel: 6 } },
      { id: "5", texto: "Intermedio bajo · Cat 5", desc: "Juego con cierta regularidad", vals: { nivel: 5 } },
      { id: "4", texto: "Intermedio · Cat 4", desc: "Incorporo víbora y globo táctico", vals: { nivel: 4 } },
      { id: "3", texto: "Intermedio alto · Cat 3", desc: "X3, dejada, juego táctico", vals: { nivel: 3 } },
      { id: "2-1", texto: "Avanzado / Competitivo · Cat 1–2", desc: "Juego torneos con regularidad", vals: { nivel: 2 } },
    ],
  },
  {
    id: "juego",
    pregunta: "¿Cómo describís tu estilo de juego?",
    opciones: [
      { id: "control", texto: "Juego de control", desc: "Me gusta manejar el punto, cometer pocos errores", vals: { estilo: 0 } },
      { id: "equilibrio", texto: "Equilibrado", desc: "Mezclo control y potencia según la situación", vals: { estilo: 1 } },
      { id: "potencia", texto: "Juego de potencia", desc: "Busco terminar el punto con el remate", vals: { estilo: 2 } },
    ],
  },
  {
    id: "lado",
    pregunta: "¿En qué lado de la cancha jugás habitualmente?",
    opciones: [
      { id: "reves", texto: "Revés (izquierda)", vals: { lado: 0 } },
      { id: "drive", texto: "Drive (derecha)", vals: { lado: 1 } },
      { id: "indistinto", texto: "Indistinto", vals: { lado: 0.5 } },
    ],
  },
  {
    id: "presupuesto",
    pregunta: "¿Cuál es tu presupuesto?",
    opciones: [
      { id: "bajo", texto: "Menos de $100.000", vals: { budget: 0 } },
      { id: "medio-bajo", texto: "$100.000 – $160.000", vals: { budget: 1 } },
      { id: "medio", texto: "$160.000 – $220.000", vals: { budget: 2 } },
      { id: "alto", texto: "Más de $220.000", vals: { budget: 3 } },
    ],
  },
  {
    id: "prioridad",
    pregunta: "¿Qué priorizás en una pala?",
    opciones: [
      { id: "control", texto: "Control y consistencia", desc: "Cometer pocos errores no forzados", vals: { prio: 0 } },
      { id: "salida", texto: "Salida de bola", desc: "Efecto y pegada en bandeja/víbora", vals: { prio: 1 } },
      { id: "potencia", texto: "Potencia en remate", desc: "Velocidad de salida en smash", vals: { prio: 2 } },
    ],
  },
];

type Recomendacion = { slug: string; marca: string; modelo: string; precio: string; score: string; forma: string; por_que: string; colorFrom: string };

function calcularRecomendaciones(respuestas: Record<string, Record<string, number>>): Recomendacion[] {
  const nivel = respuestas.nivel?.nivel ?? 4;
  const estilo = respuestas.juego?.estilo ?? 1;
  const budget = respuestas.presupuesto?.budget ?? 2;
  const prio = respuestas.prioridad?.prio ?? 1;

  const todas: (Recomendacion & { score_int: number })[] = [
    {
      slug: "bullpadel-hack-04", marca: "Bullpadel", modelo: "Hack 04", precio: "$149.990",
      score: "8.1", forma: "Redonda", colorFrom: "from-[#D97706]", score_int: 0,
      por_que: "Forma redonda ideal para iniciación y nivel intermedio bajo. Control máximo, perdona los errores.",
    },
    {
      slug: "adidas-metalbone-hrd", marca: "Adidas", modelo: "Metalbone HRD+", precio: "$184.990",
      score: "7.9", forma: "Redonda", colorFrom: "from-[#0891B2]", score_int: 0,
      por_que: "El mejor control del mercado en un precio accesible. Perfecta para Cat 3–5.",
    },
    {
      slug: "nox-ml10-pro-cup", marca: "Nox", modelo: "ML10 Pro Cup", precio: "$199.990",
      score: "8.0", forma: "Híbrida", colorFrom: "from-[#0891B2]", score_int: 0,
      por_que: "Forma híbrida que combina control de redonda con algo de potencia. Versátil.",
    },
    {
      slug: "nox-at10-genius", marca: "Nox", modelo: "AT10 Genius", precio: "$254.990",
      score: "9.1", forma: "Lágrima", colorFrom: "from-[#008F47]", score_int: 0,
      por_que: "La más equilibrada del mercado. Punto dulce amplio, funciona para todos los golpes.",
    },
    {
      slug: "babolat-air-veron", marca: "Babolat", modelo: "Air Veron", precio: "$209.990",
      score: "8.2", forma: "Diamante", colorFrom: "from-[#DC2626]", score_int: 0,
      por_que: "Diamante con buen punto dulce. Para quien quiere empezar a agregar potencia.",
    },
    {
      slug: "bullpadel-vertex-04", marca: "Bullpadel", modelo: "Vertex 04", precio: "$219.990",
      score: "8.4", forma: "Diamante", colorFrom: "from-[#DC2626]", score_int: 0,
      por_que: "La pala más potente del mercado para remates definitivos. Cat 2–3.",
    },
    {
      slug: "head-delta-pro-2026", marca: "Head", modelo: "Delta Pro 2026", precio: "$239.990",
      score: "8.7", forma: "Diamante", colorFrom: "from-[#E8590C]", score_int: 0,
      por_que: "Diamante de alto rendimiento. Para jugadores ofensivos de Cat 1–2.",
    },
  ];

  return todas.map(p => {
    let s = 0;
    // Por nivel
    if (nivel >= 5 && ["bullpadel-hack-04", "adidas-metalbone-hrd"].includes(p.slug)) s += 3;
    if (nivel === 4 && ["nox-ml10-pro-cup", "adidas-metalbone-hrd", "nox-at10-genius"].includes(p.slug)) s += 3;
    if (nivel === 3 && ["nox-at10-genius", "babolat-air-veron", "nox-ml10-pro-cup"].includes(p.slug)) s += 3;
    if (nivel <= 2 && ["bullpadel-vertex-04", "head-delta-pro-2026"].includes(p.slug)) s += 3;
    // Por estilo
    if (estilo === 0 && p.forma === "Redonda") s += 2;
    if (estilo === 1 && ["Lágrima", "Híbrida"].includes(p.forma)) s += 2;
    if (estilo === 2 && p.forma === "Diamante") s += 2;
    // Por presupuesto
    const precio = parseInt(p.precio.replace(/\D/g, ""));
    if (budget === 0 && precio < 100000) s += 2;
    if (budget === 1 && precio < 165000) s += 2;
    if (budget === 2 && precio < 225000) s += 2;
    if (budget === 3 && precio >= 220000) s += 1;
    // Por prioridad
    if (prio === 0 && p.forma === "Redonda") s += 2;
    if (prio === 1 && ["Lágrima", "Híbrida"].includes(p.forma)) s += 2;
    if (prio === 2 && p.forma === "Diamante") s += 2;

    return { ...p, score_int: s };
  })
    .sort((a, b) => b.score_int - a.score_int)
    .slice(0, 3);
}

export default function RecomendadorPage() {
  const [step, setStep] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, Record<string, number>>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const paso = pasos[step];
  const progreso = (step / pasos.length) * 100;

  const elegir = (opcion: (typeof paso.opciones)[number]) => {
    setSelected(opcion.id);
    setRespuestas(prev => ({ ...prev, [paso.id]: opcion.vals }));
  };

  const siguiente = () => {
    if (!selected) return;
    setSelected(null);
    if (step < pasos.length - 1) setStep(step + 1);
    else setDone(true);
  };

  const recomendaciones = done ? calcularRecomendaciones(respuestas) : [];

  if (done) {
    return (
      <>
        <nav className="px-6 md:px-8 py-4 flex items-center justify-between border-b border-line">
          <Link href="/" className="display text-lg font-semibold">tupadel</Link>
          <span className="mono text-xs text-ink-soft">Tu recomendación personalizada</span>
        </nav>
        <main className="max-w-[1000px] mx-auto px-6 py-14">
          <div className="mono text-xs uppercase tracking-widest text-ink-soft mb-4">→ Resultado personalizado</div>
          <h1 className="display text-4xl md:text-5xl font-semibold mb-3" style={{ letterSpacing: "-0.02em" }}>
            Estas son tus 3 palas
          </h1>
          <p className="text-ink-muted mb-10">Basado en tu nivel, estilo y presupuesto.</p>
          <div className="space-y-5">
            {recomendaciones.map((p, i) => (
              <Link
                key={p.slug}
                href={`/palas/${p.slug}`}
                className="flex items-center gap-6 border border-line rounded-2xl p-6 bg-canvas hover:border-ink-muted transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div className={`w-16 h-20 bg-gradient-to-b ${p.colorFrom} to-ink rounded-[40%/30%] shadow-lg flex-shrink-0`} />
                <div className="flex-1">
                  <div className="mono text-[10px] text-ink-soft uppercase">{p.marca}</div>
                  <div className="display text-xl font-semibold">{p.modelo}</div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-canvas-dim">{p.forma}</span>
                    <span className="mono text-xs font-semibold bg-ink text-white px-2 py-0.5 rounded">{p.score}</span>
                  </div>
                  <p className="text-sm text-ink-muted mt-2">{p.por_que}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="mono text-lg font-bold">{p.precio}</div>
                  <div className="text-[#00B85C] font-semibold text-sm mt-1">Ver →</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => { setDone(false); setStep(0); setRespuestas({}); setSelected(null); }}
              className="border border-line px-5 py-2.5 rounded-lg text-sm font-medium hover:border-ink transition-colors"
            >
              ← Repetir quiz
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <nav className="px-6 md:px-8 py-4 flex items-center justify-between border-b border-line">
        <Link href="/" className="display text-lg font-semibold">tupadel</Link>
        <div className="flex items-center gap-4">
          <span className="mono text-xs text-ink-soft">{step + 1} de {pasos.length}</span>
          <Link href="/palas" className="text-sm text-ink-muted">Salir</Link>
        </div>
      </nav>
      <div className="h-1 bg-canvas-dim"><div className="h-1 bg-[#00B85C] transition-all duration-300" style={{ width: `${progreso}%` }} /></div>

      <main className="max-w-[800px] mx-auto px-6 py-14">
        <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-5">→ Recomendador de pala</div>
        <h2 className="display text-3xl md:text-4xl font-semibold mb-10 text-balance" style={{ letterSpacing: "-0.02em" }}>
          {paso.pregunta}
        </h2>
        <div className="space-y-3">
          {paso.opciones.map(op => {
            const isSelected = selected === op.id;
            return (
              <button
                key={op.id}
                onClick={() => elegir(op)}
                className={`w-full border-2 rounded-xl p-5 text-left transition-all ${isSelected ? "border-[#00B85C] bg-[#D1FAE5]/30" : "border-line hover:border-ink"}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{op.texto}</div>
                    {op.desc && <div className="text-sm text-ink-muted mt-0.5">{op.desc}</div>}
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-4 ${isSelected ? "bg-[#00B85C] border-[#00B85C]" : "border-line"}`}>
                    {isSelected && <span className="text-white text-xs">✓</span>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </main>

      <div className="border-t border-line px-6 py-4 flex items-center justify-between bg-canvas-warm fixed bottom-0 left-0 right-0">
        <button
          onClick={() => { if (step > 0) { setStep(step - 1); setSelected(null); } }}
          disabled={step === 0}
          className="text-sm text-ink-muted disabled:opacity-30"
        >
          ← Anterior
        </button>
        <div className="flex items-center gap-1.5">
          {pasos.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i < step ? "bg-[#00B85C]" : i === step ? "bg-ink" : "border border-line"}`} />
          ))}
        </div>
        <button
          onClick={siguiente}
          disabled={!selected}
          className="bg-ink text-white text-sm font-medium px-5 py-2.5 rounded-lg disabled:opacity-40"
        >
          {step === pasos.length - 1 ? "Ver recomendación" : "Siguiente"} →
        </button>
      </div>
    </>
  );
}
