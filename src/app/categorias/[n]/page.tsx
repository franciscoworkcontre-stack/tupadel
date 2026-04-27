import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const catData = {
  1: {
    nombre: "Competitivo",
    color: "#DC2626",
    bg: "bg-[#DC2626]",
    pct: "~5%",
    tiempo: "Indefinido",
    frecuencia: "5+ veces/sem",
    domina: [
      { golpe: "Ejecución técnica completa", desc: "Todos los golpes con variación bajo presión." },
      { golpe: "Lectura anticipatoria", desc: "Anticipa intención antes de que el rival golpee." },
      { golpe: "Smash definitivo", desc: "X3 y X4 fiables en situación de partido." },
      { golpe: "Defensa de alta intensidad", desc: "Mantiene nivel técnico en tercer set." },
    ],
    faltan: [
      { golpe: "Estrategia por rival", desc: "Adaptar plan de juego según debilidades del oponente.", prio: 1 },
      { golpe: "Mental game", desc: "Gestión de presión en puntos decisivos.", prio: 1 },
      { golpe: "Preparación física específica", desc: "Trabajo físico orientado al pádel.", prio: 2 },
    ],
  },
  2: {
    nombre: "Avanzado",
    color: "#EA580C",
    bg: "bg-[#EA580C]",
    pct: "~10%",
    tiempo: "12–36 meses en Cat 3",
    frecuencia: "4+ veces/sem",
    domina: [
      { golpe: "Víbora consistente", desc: "Con control de dirección y efecto." },
      { golpe: "X3 básico", desc: "Sale de cancha en situaciones favorables." },
      { golpe: "Variación de ritmo", desc: "Sabe cuándo acelerar y cuándo controlar." },
      { golpe: "Chiquita y dejada", desc: "Las incorpora con consistencia en la red." },
      { golpe: "Contrapared ofensiva", desc: "Usa la pared lateral como arma." },
    ],
    faltan: [
      { golpe: "Remate definitivo", desc: "Cerrar puntos con smash en situación de ventaja.", prio: 1 },
      { golpe: "Presión sistemática en red", desc: "Sostener presión durante rallies largos.", prio: 1 },
      { golpe: "Contraataque organizado", desc: "Respuesta táctica ante equipos que presionan.", prio: 2 },
    ],
  },
  3: {
    nombre: "Intermedio alto",
    color: "#D97706",
    bg: "bg-[#D97706]",
    pct: "~15%",
    tiempo: "12–24 meses en Cat 4",
    frecuencia: "3–4 veces/sem",
    domina: [
      { golpe: "Víbora con dirección", desc: "Cruzada o paralela según posición del rival." },
      { golpe: "Globo táctico al revés", desc: "Para ganar la red en el momento justo." },
      { golpe: "Bajada de tres metros", desc: "Control en pelotas difíciles sobre la cabeza." },
      { golpe: "Contrapared básica", desc: "Sale de la situación sin perder posición." },
      { golpe: "Comunicación eficaz", desc: "Pareja sincronizada en subidas y bajadas." },
    ],
    faltan: [
      { golpe: "X3 y X4", desc: "Remates que salen de la cancha en situaciones favorables.", prio: 1 },
      { golpe: "Dejada tras globo", desc: "Aprovechar la subida a red con dejada al cuerpo.", prio: 1 },
      { golpe: "Chiquita", desc: "Golpe corto con efecto para abrir huecos en red.", prio: 2 },
      { golpe: "Anticipación", desc: "Leer el golpe del rival antes de que lo ejecute.", prio: 2 },
      { golpe: "Variación de ritmo", desc: "Saber cuándo acelerar y cuándo frenar el punto.", prio: 3 },
      { golpe: "Australiana básica", desc: "Formación en el saque para presionar desde el inicio.", prio: 3 },
    ],
  },
  4: {
    nombre: "Intermedio",
    color: "#65A30D",
    bg: "bg-[#65A30D]",
    pct: "~24%",
    tiempo: "8–18 meses",
    frecuencia: "2–3 veces/sem",
    domina: [
      { golpe: "Drive y revés con bote consistentes", desc: "Profundidad y altura controladas, pocos errores no forzados." },
      { golpe: "Salida de pared en ambos lados", desc: "Drive y revés tras pared sin perder altura ni dirección." },
      { golpe: "Bandeja con dirección", desc: "Cruzada o paralela, profunda al fondo, sin cortarte el codo." },
      { golpe: "Globo defensivo bajo presión", desc: "Con altura suficiente para volver a posición." },
      { golpe: "Smash plano simple", desc: "En pelotas que no salen de cancha, sin pretender x3." },
      { golpe: "Comunicación básica con la pareja", desc: "\"Mía\", \"tuya\", subir y bajar juntos, dividir cancha." },
    ],
    faltan: [
      { golpe: "Víbora", desc: "Variación de bandeja con efecto cortado y dirección al cuerpo.", prio: 1 },
      { golpe: "Globo táctico", desc: "Al revés del rival, profundo, para ganar la red.", prio: 1 },
      { golpe: "Bajada de tres metros", desc: "Devolver pelotas altas con control sin levantar globo.", prio: 2 },
      { golpe: "Contrapared ofensiva", desc: "Usar la pared lateral como ofensa, no solo defensa.", prio: 2 },
      { golpe: "Lectura de altura", desc: "Decidir subir o quedarse según altura del bote en pared.", prio: 3 },
      { golpe: "Smash por tres (x3) básico", desc: "Sacar pelota por arriba del muro lateral en remates altos.", prio: 3 },
    ],
  },
  5: {
    nombre: "Intermedio bajo",
    color: "#0891B2",
    bg: "bg-[#0891B2]",
    pct: "~28%",
    tiempo: "6–12 meses",
    frecuencia: "1–2 veces/sem",
    domina: [
      { golpe: "Drive y revés con bote", desc: "Los mete en cancha con altura y dirección básicas." },
      { golpe: "Posición de espera", desc: "Sabe dónde pararse y cuándo moverse." },
      { golpe: "Bandeja básica defensiva", desc: "Sin dirección definida pero en cancha." },
      { golpe: "Salida de pared sin presión", desc: "Puede salir cuando la bola es cómoda." },
    ],
    faltan: [
      { golpe: "Bandeja con dirección", desc: "Cruzada o paralela, profunda, con intención.", prio: 1 },
      { golpe: "Globo defensivo", desc: "Que llegue al fondo con altura suficiente.", prio: 1 },
      { golpe: "Salida de pared con cambio de altura", desc: "Adaptarse cuando la pared la devuelve diferente.", prio: 2 },
      { golpe: "Smash plano simple", desc: "En pelotas fáciles dentro de cancha.", prio: 2 },
      { golpe: "Comunicación con la pareja", desc: "\"Mía\", \"tuya\", subir y bajar coordinados.", prio: 3 },
    ],
  },
  6: {
    nombre: "Iniciación",
    color: "#7C3AED",
    bg: "bg-[#7C3AED]",
    pct: "~18%",
    tiempo: "Primeros 6–12 meses",
    frecuencia: "1 vez/sem o más",
    domina: [
      { golpe: "Regla básica del pádel", desc: "Entiende cómo se juega, el saque, los puntos, las paredes." },
      { golpe: "Agarre y postura básica", desc: "Sostiene la pala correctamente, posición de espera básica." },
    ],
    faltan: [
      { golpe: "Drive y revés con bote consistentes", desc: "Meter en cancha con altura suficiente.", prio: 1 },
      { golpe: "Posición de espera", desc: "Saber dónde pararse y cuándo moverse.", prio: 1 },
      { golpe: "Bandeja básica defensiva", desc: "Salida de globo o defensiva cuando la pelota es alta.", prio: 2 },
      { golpe: "Salida de pared simple", desc: "No asustarse con las paredes, saber esperar la bola.", prio: 2 },
      { golpe: "Regla de subir/bajar juntos", desc: "Moverse coordinado con la pareja, no dejar espacios.", prio: 3 },
    ],
  },
};

type Props = { params: Promise<{ n: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { n } = await params;
  const cat = catData[parseInt(n) as keyof typeof catData];
  if (!cat) return {};
  return {
    title: `Categoría ${n} — ${cat.nombre} | tupadel`,
    description: `Qué domina un jugador de Categoría ${n} y qué necesita para subir a Cat ${parseInt(n) - 1}. Drills, palas recomendadas y torneos en tupadel.`,
  };
}

export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6].map((n) => ({ n: String(n) }));
}

export default async function CategoriaPage({ params }: Props) {
  const { n } = await params;
  const num = parseInt(n);
  const cat = catData[num as keyof typeof catData];
  if (!cat || num < 1 || num > 6) notFound();

  const siguiente = num > 1 ? catData[(num - 1) as keyof typeof catData] : null;

  return (
    <>
      <Navbar activeSection="/golpes" />
      <main>
        {/* Hero */}
        <section className="px-6 md:px-8 py-10 md:py-12 border-b border-line bg-gradient-to-b from-canvas-warm to-canvas">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="mono text-xs uppercase tracking-widest text-ink-soft">CATEGORÍA · {n} DE 6</span>
              </div>
              <h1 className="display text-6xl md:text-7xl font-semibold" style={{ letterSpacing: "-0.03em", lineHeight: "0.9" }}>
                {cat.nombre}
              </h1>
              <div className="flex items-center gap-6 mt-7 mono text-sm flex-wrap">
                <div><span className="text-ink-soft uppercase text-xs">Jugadores</span> <span className="font-bold ml-1">{cat.pct}</span></div>
                <div><span className="text-ink-soft uppercase text-xs">Tiempo promedio</span> <span className="font-bold ml-1">{cat.tiempo}</span></div>
                <div><span className="text-ink-soft uppercase text-xs">Frecuencia recomendada</span> <span className="font-bold ml-1">{cat.frecuencia}</span></div>
              </div>
            </div>
            {siguiente && (
              <div className="md:col-span-4">
                <div className="border-2 rounded-2xl p-5" style={{ borderColor: cat.color }}>
                  <div className="mono text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: cat.color }}>→ Próximo nivel</div>
                  <div className="display text-xl font-semibold mb-2">Categoría {num - 1} · {siguiente.nombre}</div>
                  <Link href={`/categorias/${num - 1}`} className="text-sm font-semibold" style={{ color: cat.color }}>
                    Ver Cat {num - 1} →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Domina / Falta */}
        <section className="px-6 md:px-8 py-12 md:py-14 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="mono text-xs uppercase tracking-widest text-[#00B85C] font-semibold mb-3">✓ LO QUE YA DOMINÁS</div>
            <h2 className="display text-2xl md:text-3xl font-semibold mb-6" style={{ letterSpacing: "-0.02em" }}>
              Si estás en Cat {n}, esto debería estar consolidado.
            </h2>
            <div className="space-y-3">
              {cat.domina.map((g) => (
                <div key={g.golpe} className="border border-line rounded-lg p-4 bg-[#D1FAE5]/20">
                  <div className="flex items-start gap-3">
                    <span className="text-[#008F47] font-bold mt-0.5">✓</span>
                    <div>
                      <div className="font-semibold text-sm">{g.golpe}</div>
                      <div className="text-xs text-ink-muted mt-0.5">{g.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mono text-xs uppercase tracking-widest text-[#E8590C] font-semibold mb-3">→ LO QUE TE FALTA PARA SUBIR</div>
            <h2 className="display text-2xl md:text-3xl font-semibold mb-6" style={{ letterSpacing: "-0.02em" }}>
              Estos movimientos te llevan a Cat {num - 1}.
            </h2>
            <div className="space-y-3">
              {cat.faltan.map((g) => (
                <div key={g.golpe} className="border border-line rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-[#E8590C] font-bold mt-0.5">→</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-sm">{g.golpe}</div>
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                          g.prio === 1 ? "bg-[#FFE4D1] text-[#E8590C]" : g.prio === 2 ? "bg-[#FFE4D1] text-[#E8590C] opacity-70" : "bg-canvas-dim text-ink-muted"
                        }`}>
                          P{g.prio}
                        </span>
                      </div>
                      <div className="text-xs text-ink-muted mt-0.5">{g.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-line bg-canvas-warm px-6 md:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mono text-xs uppercase tracking-widest text-ink-soft mb-4">→ ¿No sabés en qué categoría estás?</div>
            <h2 className="display text-3xl md:text-4xl font-semibold mb-4" style={{ letterSpacing: "-0.02em" }}>Hacé el diagnóstico en 3 minutos</h2>
            <p className="text-ink-muted mb-6">14 preguntas que analizan tu ejecución técnica, lectura de juego y experiencia. Resultado inmediato.</p>
            <Link href="/diagnostico" className="inline-block bg-[#00B85C] text-white px-7 py-4 rounded-lg font-semibold hover:bg-[#008F47] transition-colors">
              Hacer diagnóstico gratis →
            </Link>
          </div>
        </section>

        {/* Nav entre categorías */}
        <section className="border-t border-line px-6 md:px-8 py-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs uppercase tracking-wider text-ink-soft mb-4">Otras categorías</div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map((c) => (
                <Link
                  key={c}
                  href={`/categorias/${c}`}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                    c === num ? "border-ink bg-ink text-white" : "border-line hover:border-ink"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: catData[c as keyof typeof catData].color }} />
                  Cat {c} · {catData[c as keyof typeof catData].nombre}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
