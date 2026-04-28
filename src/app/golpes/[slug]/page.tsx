import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Golpe = {
  slug: string;
  nombre: string;
  cat: number;
  nivel: string;
  desc: string;
  cuerpo: string;
  pasos: string[];
  errores: { error: string; fix: string }[];
  drills: { titulo: string; reps: string; desc: string }[];
  relacionados: string[];
};

const catColors: Record<number, string> = {
  1: "#DC2626", 2: "#EA580C", 3: "#D97706", 4: "#65A30D", 5: "#0891B2", 6: "#7C3AED",
};

const golpes: Record<string, Golpe> = {
  bandeja: {
    slug: "bandeja", nombre: "Bandeja", cat: 5, nivel: "Intermedio bajo",
    desc: "El golpe de salida de globo más importante. Base para la víbora.",
    cuerpo: "La bandeja es el golpe de ataque sobre globo del rival que más usarás en tu carrera. Se ejecuta sobre la cabeza, con el brazo extendido, y busca mantener la red con un golpe plano o ligeramente cortado. A diferencia del remate, no buscás ganar el punto directo — buscás mantener la presión y obligar otro globo.",
    pasos: [
      "Posicionarte de lado con hombro derecho al frente (diestros)",
      "Subir el codo al nivel de la oreja, pala atrás",
      "Contactar la pelota frente al hombro, brazo bien extendido",
      "Acompañar el golpe hacia adelante y abajo (no hacia abajo directo)",
      "Volver inmediatamente a posición en red",
    ],
    errores: [
      { error: "Contactar la pelota demasiado atrás del cuerpo", fix: "Empezar el movimiento anticipado. Si la pelota te pasa, entrenaste tarde el hombro." },
      { error: "Usar demasiada potencia y meter largo", fix: "La bandeja no es smash. Buscá dirección, no velocidad." },
      { error: "Quedarse quieto después del golpe", fix: "El movimiento termina cuando volvés a la red. No festejés antes." },
      { error: "Brazo doblado en el contacto", fix: "El codo debe estar casi extendido en el momento de impacto para tener control." },
    ],
    drills: [
      { titulo: "Bandeja al cuerpo", reps: "20 repeticiones", desc: "Compañero tira globos cortos. Objetivo: cada bandeja al cuerpo del rival. Primero lento, luego con presión." },
      { titulo: "Bandeja + cerrar red", reps: "15 minutos", desc: "Cada bandeja va seguida de un paso adelante para cerrar red. Trabajás el golpe + el movimiento post-golpe." },
      { titulo: "Bandeja cruzada vs paralela", reps: "30 reps alternadas", desc: "Alternás cruzada y paralela. Entrenás la toma de decisión además del golpe." },
    ],
    relacionados: ["vibora", "remate", "globo"],
  },
  vibora: {
    slug: "vibora", nombre: "Víbora", cat: 4, nivel: "Intermedio",
    desc: "Variación cortada de la bandeja. Efecto diferente, dirección al cuerpo.",
    cuerpo: "La víbora es la evolución de la bandeja. Usa el mismo punto de contacto pero el movimiento de muñeca es completamente diferente: en lugar de acompañar hacia adelante, hacés una pronación del antebrazo que genera un efecto cortado lateral. La pelota sale con una trayectoria baja, difícil de defender.",
    pasos: [
      "Mismo posicionamiento que la bandeja: hombro al frente, codo arriba",
      "En el inicio del golpe el movimiento es idéntico a la bandeja (para generar incertidumbre)",
      "En el momento del contacto, en lugar de acompañar, girar el antebrazo hacia afuera (pronación)",
      "La muñeca va de arriba-izquierda a abajo-derecha (diestros)",
      "El seguimiento del brazo termina corto, no largo como la bandeja",
    ],
    errores: [
      { error: "Telegrafiar la víbora desde el inicio", fix: "El engaño es parte del golpe. El rival no debe saber si viene bandeja o víbora hasta el momento del contacto." },
      { error: "Hacer el movimiento de muñeca demasiado pronto", fix: "La pronación ocurre EN el contacto, no antes. Si lo hacés antes, perdés potencia y control." },
      { error: "Poca extensión de brazo", fix: "Brazo extendido al contacto, igual que la bandeja. El cambio está en la muñeca, no en el brazo." },
    ],
    drills: [
      { titulo: "Bandeja-víbora alternada", reps: "20 series", desc: "Compañero tira globos. Vos decidís qué golpe hacer sin avisar. Trabajás el engaño." },
      { titulo: "Víbora al cuerpo del drive", reps: "30 repeticiones", desc: "Objetivo específico: víbora que vaya al cuerpo del jugador de drive. Ángulo cerrado, difícil de defender." },
      { titulo: "Shadow sin pelota", reps: "5 minutos", desc: "Movimiento de muñeca en slow motion. Sentir la pronación antes de ejecutar con pelota." },
    ],
    relacionados: ["bandeja", "remate", "x3"],
  },
  remate: {
    slug: "remate", nombre: "Remate / Smash", cat: 5, nivel: "Intermedio bajo",
    desc: "El ataque definitivo en pelotas altas dentro de cancha.",
    cuerpo: "El remate es el golpe más potente del pádel. A diferencia del tenis, en pádel el remate tiene restricciones: la pelota suele ser alta pero dentro de cancha, y si la mandás muy fuerte puede salir por el fondo (que no es malo necesariamente). El objetivo es terminar el punto con velocidad.",
    pasos: [
      "Identificar temprano que viene un globo corto o débil",
      "Posicionarte bajo la pelota, ligeramente detrás del punto de caída",
      "Levantar ambos brazos: el de la pala atrás, el libre señalando la pelota",
      "Bajar el brazo libre y subir el de la pala en un movimiento coordinado",
      "Contactar en el punto más alto posible, brazo extendido",
      "Seguir el golpe hacia adelante y abajo con toda la potencia",
    ],
    errores: [
      { error: "Posicionarte debajo de la pelota (demasiado adelante)", fix: "Si la pelota cae sobre tu cabeza, perdiste el punto de contacto ideal. Ir ligeramente detrás." },
      { error: "No usar el brazo libre", fix: "El brazo libre que señala la pelota mejora el timing y el equilibrio. No lo dejés caído." },
      { error: "Poca potencia en el seguimiento", fix: "El golpe termina cuando la pala llega al muslo contrario. Si parás antes, perdés fuerza." },
      { error: "Remate en zona de peligro (fondo propio)", fix: "Desde el fondo no se remata. La pelota puede salir demasiado alta y dar lugar a un x3 rival." },
    ],
    drills: [
      { titulo: "Remate fijo", reps: "50 repeticiones", desc: "Compañero lanza globos con la mano. Vos solo rematas al mismo punto. Trabajás mecánica." },
      { titulo: "Remate + punto", reps: "20 puntos", desc: "Cada drill termina en punto jugado. Después del remate, no paren. Trabajás lo que pasa después." },
      { titulo: "Remate al pasillo", reps: "15 minutos", desc: "Objetivo: remate al pasillo (espacio entre cuerpo y pared). Es el punto más difícil de defender." },
    ],
    relacionados: ["bandeja", "globo", "x3", "x4"],
  },
  globo: {
    slug: "globo", nombre: "Globo", cat: 6, nivel: "Iniciación",
    desc: "Defensivo o táctico. La herramienta más subestimada del pádel amateur.",
    cuerpo: "El globo es el arma más poderosa del jugador amateur y, paradójicamente, la más subestimada. Cuando el rival está en red, un globo alto y profundo los saca de su posición dominante y te da tiempo para reorganizarte. No es un golpe de rendición — es táctica pura.",
    pasos: [
      "Desde cualquier posición defensiva, abrir la cara de la pala hacia arriba",
      "Contactar la pelota debajo del centro, con un movimiento de abajo hacia arriba",
      "Objetivo: la pelota debe pasar a más de 3 metros de altura sobre la red",
      "Apuntá al fondo de la cancha rival, lo más cerca de la línea de fondo posible",
      "Inmediatamente después del globo, avanzar a red si es ofensivo o reorganizarse si es defensivo",
    ],
    errores: [
      { error: "Globo corto (que el rival puede atacar)", fix: "Prefiero globo largo que salga de cancha a globo corto que el rival remata. Errá largo, no corto." },
      { error: "Globo bajo (que el rival intercede en el aire)", fix: "Más altura. El globo ideal pasa mínimo 3m sobre la red. Si el rival puede saltar y tocarlo, fue bajo." },
      { error: "No volver a posición después del globo", fix: "El globo te da tiempo. Usalo para reposicionarte. El error es quedarse mirando." },
    ],
    drills: [
      { titulo: "Globo a la zona", reps: "30 repeticiones", desc: "Compañero en red. Vos desde el fondo hacés globos que caigan en el último metro de cancha rival. Precisión sobre altura." },
      { titulo: "Globo bajo presión", reps: "15 minutos", desc: "Punto jugado. Cada vez que el rival está en red, obligate a usar el globo al menos una vez por punto." },
    ],
    relacionados: ["bandeja", "contrapared", "salida-de-pared"],
  },
  x3: {
    slug: "x3", nombre: "X3 (por tres)", cat: 3, nivel: "Intermedio alto",
    desc: "Remate que sale de cancha por el lateral. Punto definitivo.",
    cuerpo: "El x3 es el remate más espectacular del pádel: la pelota sale de la cancha por el lateral cristal y vuelve al interior de la cancha rival con un bote imposible de defender. Requiere timing perfecto, potencia y un ángulo muy específico. Es el golpe que diferencia Cat 3 de Cat 4.",
    pasos: [
      "Posicionarte para el remate pero con un paso hacia el lateral",
      "Apuntar la pelota hacia el cristal lateral del rival, muy cerca de la red",
      "El ángulo debe ser de aproximadamente 45° hacia el cristal",
      "Impactar con potencia y efecto topspin para que la pelota bote bajo al salir del cristal",
      "El punto de contacto con el cristal debe ser en el primer tercio desde la red",
    ],
    errores: [
      { error: "Impactar el cristal demasiado lejos de la red", fix: "Si el cristal lo tocás en el medio o el fondo, la pelota vuelve suavemente. Tiene que ser cerca de la red." },
      { error: "Sin efecto, solo potencia", fix: "El topspin hace que la pelota bote bajo al salir. Sin efecto, el bote es alto y el rival puede defenderse." },
      { error: "Intentarlo desde posición desequilibrada", fix: "El x3 requiere equilibrio total. Si llegaste corriendo, no lo intentés. Mejor bandeja segura." },
    ],
    drills: [
      { titulo: "Practica el ángulo primero", reps: "20 rep sin potencia", desc: "Ejecutá el x3 a media potencia primero. Buscá el ángulo correcto antes de agregar velocidad." },
      { titulo: "X3 en punto controlado", reps: "15 minutos", desc: "Con un compañero que te da globos perfectos, practicás el x3. El compañero no defiende, solo alimenta." },
    ],
    relacionados: ["remate", "x4", "bandeja"],
  },
  x4: {
    slug: "x4", nombre: "X4 (por cuatro)", cat: 2, nivel: "Avanzado",
    desc: "Remate que sale por el fondo. La variante más técnica.",
    cuerpo: "El x4 es la variante más difícil del pádel. La pelota sale por el fondo de la cancha (la pared de cristal trasera del rival) y vuelve al interior con un bote muy bajo y lateral. Es prácticamente indefendible cuando se ejecuta bien, pero los márgenes de error son muy pequeños.",
    pasos: [
      "Posicionarte para el remate desde una posición muy avanzada en red",
      "Contactar la pelota con mucho topspin y dirección al fondo del rival",
      "La pelota debe pasar por encima del rival, tocar el suelo y luego el cristal de fondo",
      "El bote en el suelo debe ser cerca de la línea de fondo para que el efecto en el cristal sea máximo",
      "El ángulo de salida del cristal hace que la pelota vaya hacia el lateral, imposible de cubrir",
    ],
    errores: [
      { error: "Intentarlo sin el nivel técnico", fix: "El x4 es Cat 2. Si estás en Cat 3, primero dominá el x3." },
      { error: "Poco topspin", fix: "Sin efecto pronunciado, la pelota sale alta del cristal de fondo y es defendible." },
    ],
    drills: [
      { titulo: "Golpe al fondo controlado", reps: "Progresivo", desc: "Primero dominá el bote en el último metro de la cancha. Luego buscá que el cristal haga el trabajo." },
    ],
    relacionados: ["x3", "remate", "bandeja"],
  },
  contrapared: {
    slug: "contrapared", nombre: "Contrapared", cat: 5, nivel: "Intermedio bajo",
    desc: "Usar la pared lateral como aliada en defensa y ataque.",
    cuerpo: "La contrapared es el concepto de usar la pared lateral para golpear. En pádel, la pelota puede rebotar en la pared y vos podés golpearla después del rebote. Esto abre opciones defensivas y ofensivas que no existen en ningún otro deporte de raqueta.",
    pasos: [
      "Identificar que la pelota va hacia la pared lateral",
      "No interceptar antes de la pared — dejar que bote",
      "Posicionarte a un costado de la pared, no pegado a ella",
      "Después del bote en la pared, golpear con el movimiento normal",
      "El timing es diferente: la pelota viene de lado o de atrás, no de frente",
    ],
    errores: [
      { error: "Intentar interceptar antes de la pared", fix: "Dejá que la pared trabaje para vos. Si interceptás, perdés el efecto deflector de la pared." },
      { error: "Pegarse a la pared", fix: "Necesitás espacio para ejecutar el golpe. Posicionarte a 50-80 cm de la pared." },
      { error: "Mirar la pared en lugar de la pelota", fix: "Sabés que la pelota va a la pared. Mirá la pelota después del rebote." },
    ],
    drills: [
      { titulo: "Defensa desde contrapared", reps: "20 minutos", desc: "Compañero ataca al cuerpo contra el lateral. Vos dejás que bote en la pared y respondés. Trabajás el timing." },
      { titulo: "Contrapared ofensiva", reps: "15 minutos", desc: "Buscás usar la pared para hacer llegar la pelota a zonas difíciles del rival. La pared como aliada ofensiva." },
    ],
    relacionados: ["globo", "salida-de-pared", "bandeja"],
  },
  dejada: {
    slug: "dejada", nombre: "Dejada", cat: 3, nivel: "Intermedio alto",
    desc: "Golpe corto en red que cae al lado de la red del rival.",
    cuerpo: "La dejada es el golpe más delicado del pádel. Se ejecuta en red, con un movimiento cortado que hace caer la pelota muy cerca de la red del rival, con poco bote. Si el rival está atrás, no puede llegar. Si está en red, tiene muy poco tiempo de reacción.",
    pasos: [
      "Posicionarte en red cuando el rival está en una posición desfavorable",
      "Preparar el golpe como si fuera un drive o volea normal (engaño)",
      "En el contacto, cortar la pelota de arriba hacia abajo con la cara abierta",
      "Muy poco seguimiento — el movimiento se interrumpe en el contacto",
      "La pelota debe caer en el primer metro del lado rival",
    ],
    errores: [
      { error: "Hacerla cuando el rival está en red", fix: "La dejada funciona cuando el rival está lejos de la red. Si está cerca, va a llegar." },
      { error: "Demasiado bote", fix: "Cara más abierta, más efecto cortado. Si la pelota bota alto, el rival tiene tiempo." },
      { error: "Sin engaño previo", fix: "La dejada sorpresa es más efectiva que la anunciada. Preparar como si fuera otro golpe." },
    ],
    drills: [
      { titulo: "Dejada estática", reps: "30 repeticiones", desc: "Desde posición fija en red, con una canasta de pelotas, practicás la dejada apuntando al primer metro." },
      { titulo: "Dejada en punto", reps: "15 minutos", desc: "Punto libre. Cada vez que tenés la oportunidad en red (rival atrás), intentás la dejada." },
    ],
    relacionados: ["chiquita", "bandeja", "vibora"],
  },
  chiquita: {
    slug: "chiquita", nombre: "Chiquita", cat: 3, nivel: "Intermedio alto",
    desc: "Golpe de efecto cortado en red para crear apertura.",
    cuerpo: "La chiquita es similar a la dejada pero con un objetivo diferente: no terminar el punto sino crear una apertura. La pelota sale con efecto que la hace bajar rápido, obliga al rival a abrir y luego tiene que defender desde una posición abierta.",
    pasos: [
      "Desde red, identificar que el rival está en posición cerrada",
      "Golpear con efecto cortado pero con algo de dirección cruzada",
      "La pelota debe pasar muy cerca de la red (sin pasarla)",
      "El efecto cortado hace que baje rápido en el lado rival",
      "Inmediatamente posicionarte para el siguiente golpe que el rival va a devolver desde abajo",
    ],
    errores: [
      { error: "Confundir dejada con chiquita", fix: "La dejada busca el punto directo. La chiquita busca crear apertura para el siguiente golpe." },
      { error: "Darle demasiado ángulo", fix: "La chiquita cerca de la red es muy difícil de defender. Si le das mucho ángulo, puede caer fuera." },
    ],
    drills: [
      { titulo: "Chiquita + cierre", reps: "20 series", desc: "Chiquita cruzada + inmediatamente prepararte para recibir la devolución. Trabajás continuidad." },
    ],
    relacionados: ["dejada", "bandeja", "vibora"],
  },
  "salida-de-pared": {
    slug: "salida-de-pared", nombre: "Salida de pared", cat: 5, nivel: "Intermedio bajo",
    desc: "Técnica para salir de la pelota tras la pared trasera.",
    cuerpo: "La salida de pared es la habilidad de golpear efectivamente después de que la pelota rebota en la pared trasera. En pádel, esto ocurre todo el tiempo en situaciones defensivas. El error más común es no saber cómo posicionarse y terminar golpeando incómodo o directo a la red.",
    pasos: [
      "Cuando ves que la pelota va al fondo, salí hacia la esquina (no vayas directo a la pared)",
      "Dejá que la pelota pase y rebote en la pared",
      "Posicionarte de lado, con la pared a tu espalda",
      "Golpear cuando la pelota está a la altura del pecho o la cintura, en el camino de vuelta",
      "El movimiento es normal — la dificultad está en el posicionamiento previo",
    ],
    errores: [
      { error: "Ir directo a la pared en lugar de a la esquina", fix: "Si vas directo, la pelota te pasa y estás frente a la pared. Ir a la esquina primero." },
      { error: "Golpear cuando la pelota está muy cerca de la pared", fix: "Dejala alejarse de la pared antes de golpear. Necesitás espacio para ejecutar." },
      { error: "Golpear directo hacia adelante (a la red)", fix: "La salida de pared va en diagonal o al lateral. Raramente recto, porque el rival está en red esperando." },
    ],
    drills: [
      { titulo: "Salida controlada", reps: "20 minutos", desc: "Compañero te tira pelotas al fondo a distintas alturas y ángulos. Vos practicás el posicionamiento y la salida." },
      { titulo: "Salida + globo", reps: "20 repeticiones", desc: "Salida de pared + globo inmediato. La combinación más efectiva para reorganizarse." },
    ],
    relacionados: ["globo", "contrapared", "bandeja"],
  },
};

const slugToNombre: Record<string, string> = Object.fromEntries(
  Object.values(golpes).map(g => [g.slug, g.nombre])
);

export function generateStaticParams() {
  return Object.keys(golpes).map(slug => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = golpes[params.slug];
  if (!g) return {};
  return {
    title: `${g.nombre} en Pádel — Guía Técnica Completa`,
    description: g.desc,
  };
}

export default function GolpePage({ params }: { params: { slug: string } }) {
  const g = golpes[params.slug];
  if (!g) notFound();

  const color = catColors[g.cat];

  return (
    <>
      <Navbar activeSection="/aprender" />
      <main>
        {/* Hero */}
        <section className="px-6 md:px-8 py-10 md:py-14 border-b border-line" style={{ background: `linear-gradient(135deg, ${color}12 0%, transparent 60%)` }}>
          <div className="max-w-[900px] mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/golpes" className="mono text-xs text-ink-soft hover:text-ink">← Todos los golpes</Link>
              <span className="text-ink-soft">/</span>
              <span className="mono text-xs" style={{ color }}>{g.nombre}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs mono mb-5" style={{ borderColor: color, color }}>
              Cat {g.cat} · {g.nivel}
            </div>
            <h1 className="display text-5xl md:text-6xl font-semibold mb-4" style={{ letterSpacing: "-0.03em" }}>{g.nombre}</h1>
            <p className="text-xl text-ink-muted leading-relaxed max-w-2xl">{g.cuerpo}</p>
          </div>
        </section>

        <div className="max-w-[900px] mx-auto px-6 md:px-8 py-12 space-y-14">
          {/* Pasos */}
          <section>
            <h2 className="display text-2xl font-semibold mb-6" style={{ letterSpacing: "-0.02em" }}>Cómo ejecutarlo</h2>
            <ol className="space-y-3">
              {g.pasos.map((paso, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm text-white" style={{ backgroundColor: color }}>{i + 1}</div>
                  <span className="text-ink-muted pt-1 leading-relaxed">{paso}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Errores */}
          <section>
            <h2 className="display text-2xl font-semibold mb-6" style={{ letterSpacing: "-0.02em" }}>Errores más comunes</h2>
            <div className="space-y-4">
              {g.errores.map((e, i) => (
                <div key={i} className="border border-line rounded-xl p-5 bg-canvas">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-[#DC2626] font-bold text-lg leading-none mt-0.5">✗</span>
                    <div className="font-semibold">{e.error}</div>
                  </div>
                  <div className="ml-7 text-sm text-ink-muted flex items-start gap-2">
                    <span className="text-[#A8E63A] font-bold">→</span>
                    <span>{e.fix}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Drills */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="display text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Drills para practicar</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {g.drills.map((d, i) => (
                <div key={i} className="border border-line rounded-xl p-5 bg-canvas-warm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold">{d.titulo}</div>
                    <span className="mono text-[10px] text-ink-soft border border-line px-2 py-0.5 rounded">{d.reps}</span>
                  </div>
                  <p className="text-sm text-ink-muted leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Relacionados */}
          <section className="border-t border-line pt-10">
            <h2 className="display text-xl font-semibold mb-5" style={{ letterSpacing: "-0.02em" }}>Golpes relacionados</h2>
            <div className="flex flex-wrap gap-3">
              {g.relacionados.map(rel => (
                <Link
                  key={rel}
                  href={`/golpes/${rel}`}
                  className="border border-line rounded-lg px-4 py-2 text-sm font-medium hover:border-ink transition-colors"
                >
                  {slugToNombre[rel] ?? rel} →
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
