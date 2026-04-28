import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Cat = {
  n: number;
  nombre: string;
  color: string;
  pct: string;
  descripcion: string;
  tiempoPromedio: string;
  frecuencia: string;
  golpesDomina: { nombre: string; slug: string; desc: string }[];
  golpesParaSubir: { nombre: string; slug: string; desc: string; prioridad: "alta" | "media" }[];
  tacticasClave: string[];
  erroresComunes: string[];
  palaRecomendada: { forma: string; nivel: string; ejemplos: string[] };
  siguiente?: number;
  anterior?: number;
};

const cats: Record<number, Cat> = {
  6: {
    n: 6, nombre: "Iniciación", color: "#7C3AED", pct: "~18%",
    tiempoPromedio: "0–6 meses", frecuencia: "1–2 veces por semana",
    descripcion: "El inicio de todo. En Cat 6 estás aprendiendo las mecánicas básicas: cómo agarrar la pala, posicionarte en cancha y hacer contacto consistente. Los golpes son simples pero hay que ejecutarlos bien desde el principio para no adquirir vicios.",
    golpesDomina: [
      { nombre: "Drive básico", slug: "drive", desc: "Golpe de derecha de fondo de cancha. El golpe más básico del pádel." },
      { nombre: "Revés básico", slug: "reves", desc: "Golpe de revés desde el fondo. Muchos empiezan con dos manos." },
      { nombre: "Saque", slug: "saque", desc: "El saque en pádel se ejecuta por debajo de la cintura, diferente al tenis." },
    ],
    golpesParaSubir: [
      { nombre: "Globo", slug: "globo", desc: "El primer golpe defensivo real. Sin globo no hay pádel — es la herramienta que da tiempo para reorganizarse.", prioridad: "alta" },
      { nombre: "Volea básica", slug: "volea", desc: "Golpear en el aire en la red. Fundamental para empezar a jugar en posición de ataque.", prioridad: "alta" },
      { nombre: "Contrapared", slug: "contrapared", desc: "Saber usar la pared lateral para no perder puntos cuando la pelota va al costado.", prioridad: "media" },
    ],
    tacticasClave: [
      "Siempre intentar llegar a la red después de un buen golpe de fondo",
      "En duda, globo. Nunca meter en la red por querer atacar",
      "Comunicarse con la pareja: ¿mío o tuyo?",
    ],
    erroresComunes: [
      "Agarrar la pala demasiado fuerte — mata el tacto y cansa el brazo",
      "Mirar la pala en lugar de la pelota en el momento del contacto",
      "Quedarse siempre en el fondo de la cancha",
      "Intentar remates que aún no se pueden ejecutar",
      "No rotar con la pareja",
    ],
    palaRecomendada: {
      forma: "Redonda",
      nivel: "Iniciación — núcleo EVA blando, sin carbono",
      ejemplos: ["Bullpadel Neuron", "Nox X-ONE", "Head Alpha Pro", "Babolat Counter Veron"],
    },
    siguiente: 5,
  },
  5: {
    n: 5, nombre: "Intermedio bajo", color: "#0891B2", pct: "~28%",
    tiempoPromedio: "6–18 meses", frecuencia: "2 veces por semana",
    descripcion: "El nivel más común en Chile. En Cat 5 ya sabés jugar: tenés drives y reveses, entrás a la red y conocés las reglas. Pero falta consistencia y las salidas de pared aún cuestan. La bandeja es la llave para pasar a Cat 4.",
    golpesDomina: [
      { nombre: "Drive consistente", slug: "drive", desc: "Drive de fondo que no falla en el 80% de los casos." },
      { nombre: "Revés de fondo", slug: "reves", desc: "Revés cruzado y paralelo con dirección." },
      { nombre: "Globo defensivo", slug: "globo", desc: "Globo que sube y llega al fondo del rival." },
      { nombre: "Volea básica", slug: "volea", desc: "Volea de control en red, sin remate." },
      { nombre: "Salida de pared lateral", slug: "salida-de-pared", desc: "Salir de la pared del lateral sin perder el punto." },
    ],
    golpesParaSubir: [
      { nombre: "Bandeja", slug: "bandeja", desc: "La bandeja con dirección es el golpe que define el salto Cat 5 → Cat 4. Sin bandeja no se puede mantener la red.", prioridad: "alta" },
      { nombre: "Remate", slug: "remate", desc: "Rematar pelotas altas en cancha. No tiene que ser perfecto, solo consistente.", prioridad: "alta" },
      { nombre: "Contrapared completa", slug: "contrapared", desc: "Usar la pared lateral para crear ángulos, no solo para sacar la pelota.", prioridad: "media" },
    ],
    tacticasClave: [
      "Atacar siempre al revés del rival — es el lado más débil en Cat 5",
      "En red, cubrir el pasillo: no dejar espacio entre los dos jugadores",
      "Después de defender con globo, avanzar a la red inmediatamente",
    ],
    erroresComunes: [
      "Remate fuera de tiempo — pelota detrás del cuerpo",
      "Bandeja sin dirección, al centro, sin ángulo",
      "Quedarse en el fondo después de defender",
      "No comunicarse cuando el globo va al centro",
      "Intentar la víbora antes de dominar la bandeja",
    ],
    palaRecomendada: {
      forma: "Redonda o lágrima",
      nivel: "Intermedio — EVA media densidad, fibra reforzada o carbono básico",
      ejemplos: ["Bullpadel Hack 04", "Nox ML10 Pro Cup", "Head Speed Motion", "Babolat Technical Veron"],
    },
    siguiente: 4,
    anterior: 6,
  },
  4: {
    n: 4, nombre: "Intermedio", color: "#65A30D", pct: "~24%",
    tiempoPromedio: "18 meses–3 años", frecuencia: "2–3 veces por semana",
    descripcion: "En Cat 4 sos un jugador completo en lo básico: tenés bandeja, globo táctico y sabés moverte en cancha. La diferencia con Cat 3 está en la víbora, las bajadas de pared y crear situaciones de ataque de forma sistemática.",
    golpesDomina: [
      { nombre: "Bandeja", slug: "bandeja", desc: "Bandeja con dirección cruzada y paralela." },
      { nombre: "Remate", slug: "remate", desc: "Remate consistente en posición favorable." },
      { nombre: "Globo táctico", slug: "globo", desc: "Globo usado para recuperar la red, no solo para defender." },
      { nombre: "Contrapared", slug: "contrapared", desc: "Contrapared lateral con dirección." },
      { nombre: "Salida de pared", slug: "salida-de-pared", desc: "Salida de pared trasera con control." },
      { nombre: "Volea de control", slug: "volea", desc: "Volea baja que no da ángulo al rival." },
    ],
    golpesParaSubir: [
      { nombre: "Víbora", slug: "vibora", desc: "La víbora es el golpe que define Cat 3. Cambia completamente la dinámica del juego en red.", prioridad: "alta" },
      { nombre: "Dejada", slug: "dejada", desc: "La dejada cuando el rival está en posición desfavorable. Crea oportunidades imposibles de cubrir.", prioridad: "alta" },
      { nombre: "X3 (por tres)", slug: "x3", desc: "El remate que sale por el lateral. Punto definitivo cuando se domina.", prioridad: "media" },
    ],
    tacticasClave: [
      "Presión sistemática: dos en red, globos respondidos con bandeja + cerrar",
      "Bajada de pared: usar la contrapared rival para hacer el punto",
      "Cambio de ritmo: no siempre rápido — combinar globos y ataques",
    ],
    erroresComunes: [
      "Víbora telegrafíada — el rival ya sabe qué viene",
      "Contrapared que da demasiado ángulo y el rival intercede",
      "No rotar cuando la pareja está en el fondo",
      "Demasiados remates, poca bandeja — el rival espera y contraataca",
    ],
    palaRecomendada: {
      forma: "Lágrima o híbrida",
      nivel: "Intermedio-avanzado — carbono en cara, EVA media-alta densidad",
      ejemplos: ["Bullpadel Vertex 03", "Nox AT10 Genius 12K", "Head Extreme Pro", "Adidas Metalbone 3.3"],
    },
    siguiente: 3,
    anterior: 5,
  },
  3: {
    n: 3, nombre: "Intermedio alto", color: "#D97706", pct: "~15%",
    tiempoPromedio: "3–6 años", frecuencia: "3 veces por semana",
    descripcion: "Cat 3 separa el jugador amateur del amateur avanzado. Tenés víbora, lees el juego y creás situaciones de ataque en lugar de solo reaccionar. La diferencia con Cat 2 está en la presión sostenida y los golpes definitivos como el x3.",
    golpesDomina: [
      { nombre: "Víbora", slug: "vibora", desc: "Víbora con dirección y efecto real." },
      { nombre: "Dejada", slug: "dejada", desc: "Dejada en situaciones de apertura." },
      { nombre: "Chiquita", slug: "chiquita", desc: "Chiquita para crear apertura al rival." },
      { nombre: "Bandeja con dirección", slug: "bandeja", desc: "Bandeja seleccionando dirección según posición rival." },
      { nombre: "X3 básico", slug: "x3", desc: "X3 en situaciones favorables." },
    ],
    golpesParaSubir: [
      { nombre: "X3 consistente", slug: "x3", desc: "El x3 tiene que funcionar en un 60%+ para ser una amenaza real en el partido.", prioridad: "alta" },
      { nombre: "Remate definitivo", slug: "remate", desc: "Remate que termina el punto, no solo que mantiene presión.", prioridad: "alta" },
      { nombre: "X4", slug: "x4", desc: "El x4 es el golpe diferenciador de Cat 2. Muy pocos en Cat 3 lo dominan.", prioridad: "media" },
    ],
    tacticasClave: [
      "Ataque sistemático: globo del rival = bandeja/víbora + cerrar red + siguiente golpe ganador",
      "Rotura de pareja: atacar siempre al mismo jugador para crear descoordinación",
      "El juego por el cuerpo: la zona entre los dos rivales donde ninguno se siente dueño",
    ],
    erroresComunes: [
      "Víbora sin engaño previo — el rival ya se preparó",
      "X3 cuando el rival está bien posicionado — situación no favorable",
      "Bajar el ritmo cuando se tiene ventaja",
      "No comunicarse en la devolución del saque",
    ],
    palaRecomendada: {
      forma: "Diamante o lágrima potente",
      nivel: "Avanzado — carbono 12K, EVA alta densidad",
      ejemplos: ["Bullpadel Vertex 04", "Nox AT10 Genius 18K", "Head Coello Pro", "Adidas Metalbone HRD"],
    },
    siguiente: 2,
    anterior: 4,
  },
  2: {
    n: 2, nombre: "Avanzado", color: "#EA580C", pct: "~10%",
    tiempoPromedio: "6–10 años", frecuencia: "3–4 veces por semana",
    descripcion: "Cat 2 es el nivel del jugador que juega torneos regularmente con un juego completo. La diferencia con Cat 1 no está en los golpes — todos ya están — sino en la ejecución bajo presión máxima y en la capacidad de leer y ajustar la táctica durante el partido.",
    golpesDomina: [
      { nombre: "Repertorio ofensivo completo", slug: "x3", desc: "X3, x4, víbora, dejada, chiquita — todos con consistencia." },
      { nombre: "Remate definitivo", slug: "remate", desc: "Remate que termina el punto en posición favorable." },
      { nombre: "X4", slug: "x4", desc: "X4 en situaciones específicas." },
      { nombre: "Defensa de elite", slug: "salida-de-pared", desc: "Salida de pared trasera con contraataque." },
    ],
    golpesParaSubir: [
      { nombre: "X3 y X4 bajo presión", slug: "x3", desc: "No en situación ideal, sino cuando el rival te presiona y el tiempo es mínimo.", prioridad: "alta" },
      { nombre: "Remate a 2 paredes", slug: "remate", desc: "El punto sin red donde la pelota bota en dos paredes — el punto definitivo de Cat 1.", prioridad: "media" },
    ],
    tacticasClave: [
      "Lectura del rival: identificar sus patrones y anticipar antes de que ejecute",
      "Ajuste táctico durante el partido: si algo no funciona, cambiarlo",
      "Control mental: no bajar el nivel cuando el rival baja el suyo",
    ],
    erroresComunes: [
      "Jugar siempre al mismo lado — el rival lo anticipa rápido",
      "Demasiado riesgo en puntos de ventaja",
      "Perder la concentración en los games de saque del rival",
    ],
    palaRecomendada: {
      forma: "Diamante, alta densidad",
      nivel: "Elite — carbono 12K/18K, perfil máximamente ofensivo",
      ejemplos: ["Bullpadel Vertex 05", "Nox AT10 18K Tapia", "Head Delta Pro", "Adidas Metalbone HRD+"],
    },
    siguiente: 1,
    anterior: 3,
  },
  1: {
    n: 1, nombre: "Competitivo", color: "#DC2626", pct: "~5%",
    tiempoPromedio: "10+ años", frecuencia: "4–5 veces por semana",
    descripcion: "Cat 1 es la elite del pádel amateur y el umbral del semi-profesional. En este nivel la diferencia no es técnica — todos tienen los golpes — es mental, física y táctica. Torneos FPCH abiertos, algunos con sponsor o entrenador.",
    golpesDomina: [
      { nombre: "Repertorio completo bajo presión", slug: "x4", desc: "Todos los golpes ejecutados con consistencia en situaciones de máxima presión." },
      { nombre: "Anticipación en tiempo real", slug: "bandeja", desc: "Lectura y anticipación de los movimientos rivales antes de que los ejecuten." },
    ],
    golpesParaSubir: [
      { nombre: "Consistencia en partido tras partido", slug: "remate", desc: "La diferencia con el pádel profesional es mantener el nivel máximo durante horas y torneos completos.", prioridad: "alta" },
    ],
    tacticasClave: [
      "Game plan específico para cada pareja rival — no hay plan genérico",
      "Gestión del partido: los primeros 4 juegos marcan la tendencia del set",
      "Comunicación táctica en tiempo real con la pareja",
    ],
    erroresComunes: [
      "Sobrepensar en puntos clave — la automatización debe tomar el control",
      "No adaptar la táctica cuando el plan A no funciona",
      "Perder energía mental en decisiones arbitrales",
    ],
    palaRecomendada: {
      forma: "Diamante o lágrima de alto rendimiento",
      nivel: "Profesional — lo mejor del mercado sin restricciones",
      ejemplos: ["Bullpadel Vertex 05 Catabre", "Nox AT10 18K", "Head Coello Pro", "StarVie Triton Pro"],
    },
    anterior: 2,
  },
};

export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6].map(n => ({ n: String(n) }));
}

export function generateMetadata({ params }: { params: { n: string } }): Metadata {
  const cat = cats[Number(params.n)];
  if (!cat) return {};
  return {
    title: `Categoría ${cat.n} — ${cat.nombre} en Pádel | Pulso Pádel`,
    description: `Todo sobre Cat ${cat.n} (${cat.nombre}): golpes que dominás, qué trabajar para subir y pala recomendada. ${cat.pct} de los jugadores en Chile.`,
  };
}

export default function CategoriaPage({ params }: { params: { n: string } }) {
  const cat = cats[Number(params.n)];
  if (!cat) notFound();

  const prioridadAlta = cat.golpesParaSubir.filter(g => g.prioridad === "alta");
  const prioridadMedia = cat.golpesParaSubir.filter(g => g.prioridad === "media");

  return (
    <>
      <Navbar activeSection="/aprender" />
      <main>
        {/* Hero */}
        <section
          className="px-6 md:px-8 py-10 md:py-14 border-b border-line"
          style={{ background: `linear-gradient(135deg, ${cat.color}12 0%, transparent 60%)` }}
        >
          <div className="max-w-[1000px] mx-auto">
            <Link href="/categorias" className="mono text-xs text-ink-soft hover:text-ink mb-6 inline-block">← Todas las categorías</Link>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0" style={{ backgroundColor: cat.color }}>
                {cat.n}
              </div>
              <div>
                <div className="mono text-xs text-ink-soft uppercase mb-1">{cat.pct} de jugadores en Chile</div>
                <h1 className="display text-4xl md:text-5xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
                  Cat {cat.n} — {cat.nombre}
                </h1>
              </div>
            </div>
            <p className="text-xl text-ink-muted leading-relaxed max-w-2xl">{cat.descripcion}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="border border-line rounded-lg px-4 py-2 bg-canvas text-sm">
                <span className="text-ink-soft">Tiempo promedio: </span>
                <span className="font-medium">{cat.tiempoPromedio}</span>
              </div>
              <div className="border border-line rounded-lg px-4 py-2 bg-canvas text-sm">
                <span className="text-ink-soft">Frecuencia recomendada: </span>
                <span className="font-medium">{cat.frecuencia}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-[1000px] mx-auto px-6 md:px-8 py-12 space-y-14">

          {/* Golpes que ya dominás */}
          <section>
            <h2 className="display text-2xl font-semibold mb-6" style={{ letterSpacing: "-0.02em" }}>
              Golpes que dominás en Cat {cat.n}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cat.golpesDomina.map((g) => (
                <Link
                  key={g.slug}
                  href={`/golpes/${g.slug}`}
                  className="flex items-start gap-3 border border-line rounded-xl p-4 bg-canvas hover:border-ink-muted transition-colors"
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ backgroundColor: cat.color }} />
                  <div>
                    <div className="font-semibold mb-0.5">{g.nombre}</div>
                    <div className="text-sm text-ink-muted">{g.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Para subir */}
          {cat.siguiente && (
            <section>
              <h2 className="display text-2xl font-semibold mb-2" style={{ letterSpacing: "-0.02em" }}>
                Para subir a Cat {cat.n - 1}
              </h2>
              <p className="text-ink-muted mb-7">Los golpes y habilidades que te separan del siguiente nivel.</p>

              {prioridadAlta.length > 0 && (
                <div className="mb-6">
                  <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-4">Prioridad alta</div>
                  <div className="space-y-3">
                    {prioridadAlta.map((g) => (
                      <Link
                        key={g.slug}
                        href={`/golpes/${g.slug}`}
                        className="flex items-start gap-4 border-l-2 border-[#DC2626] pl-5 py-2 group hover:pl-6 transition-all"
                      >
                        <div>
                          <div className="font-semibold mb-1">{g.nombre} <span className="text-ink-soft font-normal text-sm">→</span></div>
                          <div className="text-sm text-ink-muted">{g.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {prioridadMedia.length > 0 && (
                <div>
                  <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-4">Prioridad media</div>
                  <div className="space-y-3">
                    {prioridadMedia.map((g) => (
                      <Link
                        key={g.slug}
                        href={`/golpes/${g.slug}`}
                        className="flex items-start gap-4 border-l-2 border-line pl-5 py-2 group hover:pl-6 transition-all"
                      >
                        <div>
                          <div className="font-semibold mb-1">{g.nombre} <span className="text-ink-soft font-normal text-sm">→</span></div>
                          <div className="text-sm text-ink-muted">{g.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Tácticas clave */}
          <section>
            <h2 className="display text-2xl font-semibold mb-6" style={{ letterSpacing: "-0.02em" }}>Tácticas clave en este nivel</h2>
            <ul className="space-y-4">
              {cat.tacticasClave.map((t, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mono text-xs text-ink-soft mt-1 flex-shrink-0">0{i + 1}</span>
                  <span className="text-ink-muted leading-relaxed">{t}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Errores comunes */}
          <section>
            <h2 className="display text-2xl font-semibold mb-6" style={{ letterSpacing: "-0.02em" }}>Errores más comunes en Cat {cat.n}</h2>
            <div className="space-y-0">
              {cat.erroresComunes.map((e, i) => (
                <div key={i} className="flex items-start gap-3 py-3 border-b border-line last:border-0">
                  <span className="text-[#DC2626] font-bold flex-shrink-0 mt-0.5">✗</span>
                  <span className="text-ink-muted">{e}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Pala recomendada */}
          <section className="border border-line rounded-xl p-6 bg-canvas-warm">
            <h2 className="display text-xl font-semibold mb-4" style={{ letterSpacing: "-0.02em" }}>Pala recomendada para Cat {cat.n}</h2>
            <div className="flex flex-wrap gap-4 mb-4 text-sm">
              <div><span className="text-ink-soft">Forma: </span><span className="font-medium">{cat.palaRecomendada.forma}</span></div>
              <div><span className="text-ink-soft">Perfil: </span><span className="font-medium">{cat.palaRecomendada.nivel}</span></div>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {cat.palaRecomendada.ejemplos.map((e) => (
                <span key={e} className="border border-line px-3 py-1 rounded-full text-sm bg-canvas">{e}</span>
              ))}
            </div>
            <Link
              href={`/palas?nivel=${cat.n <= 2 ? "1-2" : cat.n <= 4 ? "3-4" : "5-6"}`}
              className="inline-flex items-center gap-2 bg-ink text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-ink/90 transition-colors"
            >
              Ver palas para Cat {cat.n} →
            </Link>
          </section>

          {/* Navegación */}
          <section className="flex items-center justify-between pt-4 border-t border-line">
            {cat.anterior ? (
              <Link href={`/categorias/${cat.anterior}`} className="text-sm text-ink-muted hover:text-ink transition-colors">
                ← Cat {cat.anterior} — {cats[cat.anterior].nombre}
              </Link>
            ) : <div />}
            <Link href="/categorias" className="mono text-xs text-ink-soft hover:text-ink transition-colors">
              Todas las categorías
            </Link>
            {cat.siguiente ? (
              <Link href={`/categorias/${cat.siguiente}`} className="text-sm text-ink-muted hover:text-ink transition-colors">
                Cat {cat.siguiente} — {cats[cat.siguiente].nombre} →
              </Link>
            ) : <div />}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
