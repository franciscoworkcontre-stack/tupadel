import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glosario de Pádel — Diccionario Completo",
  description: "Todos los términos del pádel explicados: golpes, posiciones, tácticas, equipamiento y vocabulario del circuito profesional.",
};

type Termino = { termino: string; tipo: "golpe" | "táctica" | "equipo" | "regla" | "jerga"; definicion: string; relacionado?: string };

const terminos: Termino[] = [
  { termino: "Bandeja", tipo: "golpe", definicion: "Golpe de ataque sobre globo alto. Se ejecuta con el brazo extendido sobre la cabeza y busca mantener la red.", relacionado: "/golpes/bandeja" },
  { termino: "Víbora", tipo: "golpe", definicion: "Variación de la bandeja con efecto cortado. La pronación del antebrazo en el contacto cambia la dirección de salida.", relacionado: "/golpes/vibora" },
  { termino: "Remate", tipo: "golpe", definicion: "Golpe de máxima potencia sobre pelotas altas. Busca terminar el punto directamente.", relacionado: "/golpes/remate" },
  { termino: "Globo", tipo: "golpe", definicion: "Golpe defensivo o táctico que lanza la pelota por encima del rival. Herramienta fundamental del jugador amateur.", relacionado: "/golpes/globo" },
  { termino: "X3", tipo: "golpe", definicion: "Remate que hace salir la pelota de la cancha por el lateral cristal y vuelve con un bote difícil. Punto casi seguro.", relacionado: "/golpes/x3" },
  { termino: "X4", tipo: "golpe", definicion: "Remate que hace salir la pelota por el cristal de fondo. La variante más difícil y espectacular.", relacionado: "/golpes/x4" },
  { termino: "Dejada", tipo: "golpe", definicion: "Golpe corto desde red que cae muy cerca de la red del rival con efecto cortado.", relacionado: "/golpes/dejada" },
  { termino: "Chiquita", tipo: "golpe", definicion: "Golpe cortado en red similar a la dejada pero con objetivo táctico de abrir cancha, no terminar el punto.", relacionado: "/golpes/chiquita" },
  { termino: "Contrapared", tipo: "golpe", definicion: "Uso de la pared lateral como aliada: dejar que la pelota rebote y golpearla después.", relacionado: "/golpes/contrapared" },
  { termino: "Salida de pared", tipo: "golpe", definicion: "Técnica para posicionarse y golpear correctamente después de que la pelota rebota en la pared trasera.", relacionado: "/golpes/salida-de-pared" },
  { termino: "Volea", tipo: "golpe", definicion: "Golpe al vuelo en la red sin dejar botar la pelota. Golpe ofensivo fundamental de la posición en red." },
  { termino: "Liftada", tipo: "golpe", definicion: "Pelota golpeada con efecto topspin que sube rápido y baja rápido. Difícil de atacar para quien está en red." },
  { termino: "Cortada", tipo: "golpe", definicion: "Pelota con efecto backspin. Bota bajo y acelera rápido al salir del suelo. Usada en dejadas y defensas." },
  { termino: "Drive", tipo: "táctica", definicion: "Lado derecho de la cancha (para jugador diestro parado mirando hacia la red). El jugador de drive usa principalmente el golpe de derecha." },
  { termino: "Revés", tipo: "táctica", definicion: "Lado izquierdo de la cancha (para jugador diestro). El jugador de revés usa principalmente el golpe de revés y la bandeja." },
  { termino: "Punto", tipo: "táctica", definicion: "En argot de pádel, 'punto' significa buscar cuarta persona para jugar. 'Falta punto' = falta un jugador para completar el partido." },
  { termino: "Cierre de red", tipo: "táctica", definicion: "Movimiento de avanzar hacia la red para cortar ángulos y ejercer presión. Posición dominante en pádel." },
  { termino: "Rotura de net", tipo: "táctica", definicion: "Estrategia para alejar al rival de la red mediante globos, dejadas o chiquitas que los obliguen a retroceder." },
  { termino: "Triángulo", tipo: "táctica", definicion: "Formación táctica en la que los dos jugadores de un equipo forman un triángulo imaginario con la red para cubrir el máximo de cancha." },
  { termino: "Cancha paralela", tipo: "táctica", definicion: "Pelota que va en dirección paralela a la pared lateral. Opuesto a cruzada." },
  { termino: "Cancha cruzada", tipo: "táctica", definicion: "Pelota que va en diagonal, de un lado de la cancha al otro. Recorre más distancia que la paralela." },
  { termino: "Al cuerpo", tipo: "táctica", definicion: "Pelota dirigida al torso del rival. Obliga a una devolución incómoda porque no hay tiempo de preparar el golpe correctamente." },
  { termino: "Let", tipo: "regla", definicion: "Interrupción del juego que implica repetir el punto. Ocurre en el saque cuando la pelota toca la red y cae correctamente." },
  { termino: "Deuce", tipo: "regla", definicion: "Empate en 40-40. Hay que ganar dos puntos consecutivos para ganar el juego." },
  { termino: "Ventaja", tipo: "regla", definicion: "Primer punto después del deuce. Si el equipo que tiene ventaja gana el siguiente punto, se lleva el juego; si lo pierde, vuelve a deuce." },
  { termino: "Tie break", tipo: "regla", definicion: "Juego especial a 7 puntos (con 2 de diferencia) que se juega cuando el set está 6-6." },
  { termino: "Super tie break", tipo: "regla", definicion: "Juego especial a 10 puntos que en muchos torneos amateurs reemplaza el tercer set." },
  { termino: "Pala", tipo: "equipo", definicion: "La raqueta del pádel. Es sólida (sin cuerdas) con agujeros y hecha de materiales como fibra de carbono, fibra de vidrio y núcleo de foam o EVA." },
  { termino: "Núcleo EVA", tipo: "equipo", definicion: "Material del interior de la pala. Más duro y potente que el foam. Preferido por jugadores intermedios-avanzados." },
  { termino: "Núcleo foam", tipo: "equipo", definicion: "Material más suave del interior de la pala. Más control y perdón. Ideal para iniciación e intermedios." },
  { termino: "Fibra de carbono", tipo: "equipo", definicion: "Material de la cara de la pala. Más rígido, potente y menor control. Usado en palas de alto rendimiento." },
  { termino: "Fibra de vidrio", tipo: "equipo", definicion: "Material de la cara de la pala. Más flexible, mayor control y salida de bola. Versátil y económico." },
  { termino: "Forma redonda", tipo: "equipo", definicion: "Pala con el punto dulce bajo y amplio, centrado en la zona media. Máximo control, ideal para iniciación." },
  { termino: "Forma diamante", tipo: "equipo", definicion: "Pala con el punto dulce en la punta. Máxima potencia, menor área de control. Para jugadores avanzados." },
  { termino: "Forma lágrima / híbrida", tipo: "equipo", definicion: "Pala con el punto dulce entre el diamante y la redonda. Equilibrio control-potencia. La más versátil." },
  { termino: "Punto dulce", tipo: "equipo", definicion: "Zona de la pala donde el golpe tiene mejor transmisión de energía. Golpear en el punto dulce da más control y potencia." },
  { termino: "Balance", tipo: "equipo", definicion: "Centro de gravedad de la pala. Bajo balance = más control. Alto balance = más potencia." },
  { termino: "Categoría (Cat)", tipo: "jerga", definicion: "Sistema de clasificación del nivel en pádel amateur. Va de Cat 6 (iniciación) a Cat 1 (jugador de alto rendimiento)." },
  { termino: "Falta punto", tipo: "jerga", definicion: "Expresión para indicar que falta un jugador para completar un partido. 'Falta punto en Club Pádel las 19:00'" },
  { termino: "Armar punto", tipo: "jerga", definicion: "Organizar un partido con cuatro jugadores." },
  { termino: "Peloteo", tipo: "jerga", definicion: "Calentamiento o práctica informal sin contar puntos." },
  { termino: "Gol de pádel", tipo: "jerga", definicion: "Expresión coloquial cuando la pelota pasa por un espacio imposible o hace una trayectoria improbable." },
  { termino: "La pasamos", tipo: "jerga", definicion: "Expresión argentina para 'dejamos pasar la pelota' en situaciones de contrapared o salida de pared." },
  { termino: "Copa", tipo: "jerga", definicion: "Copa de juego. En torneos por parejas fijas, se juegan 6 juegos y el ganador avanza. Informal pero muy usado en Chile." },
];

const tipos = ["golpe", "táctica", "regla", "equipo", "jerga"] as const;
const letras = [...new Set(terminos.map(t => t.termino[0].toUpperCase()))].sort();

const tipoColors: Record<string, string> = {
  golpe: "#0891B2", táctica: "#A8E63A", equipo: "#D97706", regla: "#DC2626", jerga: "#7C3AED",
};

export default function GlosarioPage() {
  return (
    <>
      <Navbar activeSection="/glosario" />
      <main>
        <section className="px-6 md:px-8 py-10 md:py-14 border-b border-line bg-canvas-warm">
          <div className="max-w-[1000px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Aprender</div>
            <h1 className="display text-5xl md:text-6xl font-semibold mb-4" style={{ letterSpacing: "-0.03em" }}>Glosario de pádel</h1>
            <p className="text-xl text-ink-muted leading-relaxed max-w-2xl">
              {terminos.length} términos explicados: golpes, tácticas, equipamiento, reglas y jerga del circuito.
            </p>
            {/* Leyenda */}
            <div className="flex flex-wrap gap-2 mt-8">
              {tipos.map(t => (
                <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border" style={{ borderColor: tipoColors[t], color: tipoColors[t] }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tipoColors[t] }} />
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              ))}
            </div>
            {/* Nav alfabético */}
            <div className="flex flex-wrap gap-1 mt-6">
              {letras.map(l => (
                <a key={l} href={`#letra-${l}`} className="w-7 h-7 flex items-center justify-center rounded text-xs font-mono border border-line hover:border-ink transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-[1000px] mx-auto px-6 md:px-8 py-12">
          {letras.map(letra => {
            const grupo = terminos.filter(t => t.termino[0].toUpperCase() === letra);
            if (!grupo.length) return null;
            return (
              <div key={letra} id={`letra-${letra}`} className="mb-10">
                <div className="mono text-2xl font-bold text-ink mb-4 border-b border-line pb-2">{letra}</div>
                <div className="space-y-3">
                  {grupo.map(t => (
                    <div key={t.termino} className="flex gap-4 items-start py-3 border-b border-line/50 last:border-0">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {t.relacionado ? (
                            <Link href={t.relacionado} className="font-semibold hover:text-[#A8E63A] transition-colors">{t.termino}</Link>
                          ) : (
                            <span className="font-semibold">{t.termino}</span>
                          )}
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium" style={{ color: tipoColors[t.tipo], backgroundColor: `${tipoColors[t.tipo]}15` }}>
                            {t.tipo}
                          </span>
                        </div>
                        <p className="text-sm text-ink-muted leading-relaxed">{t.definicion}</p>
                        {t.relacionado && (
                          <Link href={t.relacionado} className="text-xs text-[#A8E63A] font-medium mt-1 inline-block">Ver guía completa →</Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
