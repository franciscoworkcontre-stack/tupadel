"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";

type Respuesta = {
  preguntaId: number;
  opcion: string;
  valor: number;
};

const preguntas = [
  {
    id: 1,
    bloque: "Calibración",
    texto: "¿Cuántos años llevás jugando pádel de forma regular?",
    opciones: [
      { id: "A", texto: "Menos de 6 meses", valor: 1 },
      { id: "B", texto: "6 meses a 2 años", valor: 2 },
      { id: "C", texto: "2 a 5 años", valor: 3 },
      { id: "D", texto: "Más de 5 años", valor: 4 },
    ],
  },
  {
    id: 2,
    bloque: "Frecuencia",
    texto: "¿Con qué frecuencia jugás actualmente?",
    opciones: [
      { id: "A", texto: "Una vez al mes o menos", valor: 1 },
      { id: "B", texto: "Una o dos veces por semana", valor: 2 },
      { id: "C", texto: "Tres o cuatro veces por semana", valor: 3 },
      { id: "D", texto: "Cinco o más veces por semana", valor: 4 },
    ],
  },
  {
    id: 3,
    bloque: "Ejecución técnica",
    texto: "Tu drive y revés con bote desde el fondo de la cancha:",
    opciones: [
      { id: "A", texto: "No los controlo bien, cometo muchos errores no forzados", valor: 1 },
      { id: "B", texto: "Los meto en cancha pero sin dirección definida", valor: 2 },
      { id: "C", texto: "Los dirijo cruzado o paralelo con consistencia", valor: 3 },
      { id: "D", texto: "Los varío en altura, velocidad y efecto según la situación", valor: 4 },
    ],
  },
  {
    id: 4,
    bloque: "Ejecución técnica",
    texto: "Cuando salís de la pared con la bandeja, ¿qué pasa habitualmente?",
    opciones: [
      { id: "A", texto: "No la domino, vuelvo de globo", valor: 1 },
      { id: "B", texto: "La hago plana al medio sin mucha intención", valor: 2 },
      { id: "C", texto: "Elijo dirección y profundidad consistente", valor: 3 },
      { id: "D", texto: "Varío entre bandeja, víbora y plana según rival", valor: 4 },
    ],
  },
  {
    id: 5,
    bloque: "Ejecución técnica",
    texto: "¿Cuál es el estado de tu víbora?",
    opciones: [
      { id: "A", texto: "No la conozco o no la ejecuto", valor: 1 },
      { id: "B", texto: "La intento pero sin consistencia", valor: 2 },
      { id: "C", texto: "La uso como alternativa a la bandeja con cierta consistencia", valor: 3 },
      { id: "D", texto: "La ejecuto con control de dirección y efecto", valor: 4 },
    ],
  },
  {
    id: 6,
    bloque: "Ejecución técnica",
    texto: "Cuando tenés que restar por la pared lateral, ¿qué hacés?",
    opciones: [
      { id: "A", texto: "No sé cómo salir, la bola me sorprende", valor: 1 },
      { id: "B", texto: "Salgo hacia adentro pero sin dirección", valor: 3 },
      { id: "C", texto: "Elijo salir por pared o directo según la pelota", valor: 3 },
      { id: "D", texto: "Aprovecho la pared como arma ofensiva", valor: 4 },
    ],
  },
  {
    id: 7,
    bloque: "Golpes aéreos",
    texto: "Tus remates en globo alto dentro de la cancha:",
    opciones: [
      { id: "A", texto: "Los golpeo hacia adentro sin intentar x3 o x4", valor: 1 },
      { id: "B", texto: "Intento el x3 pero no siempre salgo de la cancha", valor: 2 },
      { id: "C", texto: "El x3 es consistente, el x4 lo incorporo", valor: 3 },
      { id: "D", texto: "Elijo x3 o x4 según posición del rival", valor: 4 },
    ],
  },
  {
    id: 8,
    bloque: "Lectura de juego",
    texto: "Tu pareja levanta un globo profundo y vos estás en la red. ¿Qué hacés?",
    opciones: [
      { id: "A", texto: "Bajo y espero el contragolpe", valor: 1 },
      { id: "B", texto: "Subo con mi pareja pero sin estrategia clara", valor: 2 },
      { id: "C", texto: "Subo, cubro mi lado y presiono en cuanto tenemos red", valor: 3 },
      { id: "D", texto: "Subo, anticipo el globo del rival y decido si atacar o defender", valor: 4 },
    ],
  },
  {
    id: 9,
    bloque: "Lectura de juego",
    texto: "Tu rival tiene la pelota fácil en el centro de la red. ¿Qué hacés?",
    opciones: [
      { id: "A", texto: "Me quedo quieto y espero", valor: 1 },
      { id: "B", texto: "Bajo un poco por si ataca", valor: 2 },
      { id: "C", texto: "Bajo y cubro el passing más probable", valor: 3 },
      { id: "D", texto: "Bajo, leo su postura corporal y anticipo la dirección", valor: 4 },
    ],
  },
  {
    id: 10,
    bloque: "Táctica",
    texto: "¿Cómo describís tu estrategia con tu pareja durante el partido?",
    opciones: [
      { id: "A", texto: "No tenemos estrategia, cada uno hace lo que puede", valor: 1 },
      { id: "B", texto: "Subimos y bajamos juntos, nos avisamos 'mía' o 'tuya'", valor: 2 },
      { id: "C", texto: "Tenemos patrones básicos: globo al revés, presión en red, cambios de ritmo", valor: 3 },
      { id: "D", texto: "Ajustamos el juego según las debilidades del rival en cada set", valor: 4 },
    ],
  },
  {
    id: 11,
    bloque: "Globo y defensa",
    texto: "Cuando el rival remata y no podés devolver más que un globo:",
    opciones: [
      { id: "A", texto: "La bola me sale corta o a la red con frecuencia", valor: 1 },
      { id: "B", texto: "El globo llega pero sin control de profundidad", valor: 2 },
      { id: "C", texto: "El globo llega profundo al revés del rival la mayoría de veces", valor: 3 },
      { id: "D", texto: "Controlo profundidad, dirección y decido si ralo o con efecto", valor: 4 },
    ],
  },
  {
    id: 12,
    bloque: "Competencia",
    texto: "¿Jugás o has jugado torneos organizados?",
    opciones: [
      { id: "A", texto: "Nunca, solo partidos amistosos", valor: 1 },
      { id: "B", texto: "Alguna vez en torneos internos o de club", valor: 2 },
      { id: "C", texto: "Torneos amateur regulares (FPCH u otros circuitos)", valor: 3 },
      { id: "D", texto: "Torneos regulares, clasifico en categorías top del circuito", valor: 4 },
    ],
  },
  {
    id: 13,
    bloque: "Condición física",
    texto: "Después de 1h30 de partido exigido, ¿cómo es tu rendimiento técnico?",
    opciones: [
      { id: "A", texto: "Bajo mucho: más errores, menos capacidad de decidir", valor: 1 },
      { id: "B", texto: "Baja algo, noto el cansancio pero puedo seguir", valor: 2 },
      { id: "C", texto: "Se mantiene razonablemente en el tercer set", valor: 3 },
      { id: "D", texto: "Puedo sostener el nivel técnico sin problema físico", valor: 4 },
    ],
  },
  {
    id: 14,
    bloque: "Mental",
    texto: "Cuando perdés tres juegos seguidos, ¿qué pasa?",
    opciones: [
      { id: "A", texto: "Me trabo, me frustro y el juego empeora bastante", valor: 1 },
      { id: "B", texto: "Me cuesta, pero encuentro la forma de resetear", valor: 2 },
      { id: "C", texto: "Analizo qué está saliendo mal y ajusto algo concreto", valor: 3 },
      { id: "D", texto: "Lo proceso rápido, comunico con mi pareja y atacamos el problema", valor: 4 },
    ],
  },
];

function calcularCategoria(respuestas: Respuesta[]): { categoria: number; confianza: number; areas: string[] } {
  const total = respuestas.reduce((sum, r) => sum + r.valor, 0);
  const max = preguntas.length * 4;
  const pct = total / max;

  let categoria: number;
  if (pct >= 0.85) categoria = 1;
  else if (pct >= 0.70) categoria = 2;
  else if (pct >= 0.55) categoria = 3;
  else if (pct >= 0.40) categoria = 4;
  else if (pct >= 0.25) categoria = 5;
  else categoria = 6;

  const confianza = Math.min(0.95, 0.5 + respuestas.length * 0.04);

  const bajos = respuestas
    .filter((r) => r.valor <= 2)
    .map((r) => preguntas.find((p) => p.id === r.preguntaId)?.bloque ?? "")
    .filter(Boolean);

  const areasMap: Record<string, number> = {};
  bajos.forEach((b) => { areasMap[b] = (areasMap[b] || 0) + 1; });
  const areas = Object.entries(areasMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k);

  return { categoria, confianza, areas };
}

export default function DiagnosticoPage() {
  const [current, setCurrent] = useState(0);
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);

  const pregunta = preguntas[current];
  const progreso = ((current) / preguntas.length) * 100;

  const elegir = (opcion: string, valor: number) => {
    setSelected(opcion);
    const nuevas = [...respuestas.filter((r) => r.preguntaId !== pregunta.id), { preguntaId: pregunta.id, opcion, valor }];
    setRespuestas(nuevas);
  };

  const siguiente = () => {
    if (!selected) return;
    setSelected(null);
    if (current < preguntas.length - 1) {
      setCurrent(current + 1);
    } else {
      setDone(true);
    }
  };

  const resultado = done ? calcularCategoria(respuestas) : null;

  const enviar = async () => {
    if (!email || !resultado) return;
    setEnviando(true);
    await fetch("/api/diagnostico", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, respuestas, ...resultado }),
    });
    window.location.href = `/diagnostico/resultado?cat=${resultado.categoria}&email=${encodeURIComponent(email)}`;
  };

  if (done && resultado) {
    return (
      <>
        <nav className="px-6 md:px-8 py-4 md:py-5 flex items-center justify-between border-b border-line bg-canvas">
          <Link href="/" className="display text-lg md:text-xl font-semibold tracking-tight">tupadel</Link>
          <span className="mono text-xs text-ink-soft">Diagnóstico completo</span>
        </nav>
        <div className="max-w-2xl mx-auto px-6 py-16 text-center">
          <div className="mono text-xs uppercase tracking-widest text-ink-soft mb-4">→ Tu resultado</div>
          <h1 className="display text-6xl md:text-8xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
            Categoría {resultado.categoria}
          </h1>
          <p className="text-ink-muted text-lg mt-4">
            {["", "Competitivo", "Avanzado", "Intermedio alto", "Intermedio", "Intermedio bajo", "Iniciación"][resultado.categoria]}
          </p>
          <div className="mt-8 p-5 bg-canvas-warm border border-line rounded-xl text-left">
            <div className="mono text-xs uppercase tracking-wider text-ink-soft mb-2">Áreas a mejorar prioritarias</div>
            <ul className="space-y-1">
              {resultado.areas.map((a) => (
                <li key={a} className="text-sm flex items-center gap-2">
                  <span className="text-[#E8590C] font-bold">→</span> {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <div className="mono text-xs text-ink-soft mb-3">Enviamos tu ruta personalizada a tu email</div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border border-line rounded-lg px-4 py-3 text-sm outline-none focus:border-[#A8E63A]"
              />
              <button
                onClick={enviar}
                disabled={enviando || !email}
                className="bg-[#A8E63A] text-[#0D1B2A] px-5 py-3 rounded-lg font-semibold text-sm disabled:opacity-50"
              >
                {enviando ? "Enviando..." : "Ver ruta →"}
              </button>
            </div>
          </div>
          <Link href={`/categorias/${resultado.categoria}`} className="inline-block mt-6 text-sm text-[#A8E63A] font-semibold">
            Ver ruta Cat {resultado.categoria} sin registrarme →
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <nav className="px-6 md:px-8 py-4 md:py-5 flex items-center justify-between border-b border-line bg-canvas">
        <Link href="/" className="display text-lg md:text-xl font-semibold tracking-tight">tupadel</Link>
        <div className="flex items-center gap-4">
          <span className="mono text-xs text-ink-soft">Pregunta {current + 1} de {preguntas.length}</span>
          <Link href="/" className="text-sm text-ink-muted">Salir</Link>
        </div>
      </nav>
      <div className="h-1 bg-canvas-dim"><div className="h-1 bg-[#A8E63A] transition-all duration-300" style={{ width: `${progreso}%` }} /></div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Bloque: {pregunta.bloque}</div>
          <h2 className="display text-2xl md:text-4xl font-semibold leading-tight text-balance" style={{ letterSpacing: "-0.02em" }}>
            {pregunta.texto}
          </h2>
          <p className="text-ink-muted mt-5 text-sm leading-relaxed">Sé honesto. La sobreestimación es el enemigo número uno del progreso en pádel.</p>
        </div>
        <div className="md:col-span-8 space-y-3">
          {pregunta.opciones.map((op) => {
            const isSelected = selected === op.id;
            return (
              <button
                key={op.id}
                onClick={() => elegir(op.id, op.valor)}
                className={`w-full border-2 rounded-xl p-4 md:p-5 text-left transition-all ${
                  isSelected
                    ? "border-[#A8E63A] bg-[#ECFCCB]/30"
                    : "border-line hover:border-ink"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className={`mono text-xs px-2 py-0.5 rounded ${isSelected ? "bg-[#A8E63A] text-[#0D1B2A]" : "bg-canvas-dim"}`}>
                        {op.id}
                      </span>
                      <span className="font-semibold text-sm md:text-base">{op.texto}</span>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-3 ${isSelected ? "bg-[#A8E63A] border-[#A8E63A]" : "border-line"}`}>
                    {isSelected && <span className="text-white text-xs">✓</span>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-line px-6 md:px-8 py-4 md:py-5 flex items-center justify-between bg-canvas-warm">
        <button
          onClick={() => { if (current > 0) { setCurrent(current - 1); setSelected(null); } }}
          className="text-sm text-ink-muted flex items-center gap-2 disabled:opacity-30"
          disabled={current === 0}
        >
          ← Anterior
        </button>
        <div className="flex items-center gap-1.5">
          {preguntas.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i < current ? "bg-[#A8E63A]" : i === current ? "bg-ink" : "border border-line"}`} />
          ))}
        </div>
        <button
          onClick={siguiente}
          disabled={!selected}
          className="bg-ink text-white text-sm font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {current === preguntas.length - 1 ? "Ver resultado" : "Siguiente"} →
        </button>
      </div>
    </>
  );
}
