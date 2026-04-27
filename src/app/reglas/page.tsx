import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reglas del Pádel — Reglamento Oficial Completo",
  description: "Reglas oficiales del pádel explicadas en lenguaje simple: campo, saque, pelota en juego, faltas, puntuación y casos especiales.",
};

type Seccion = { id: string; titulo: string; reglas: { titulo: string; texto: string }[] };

const secciones: Seccion[] = [
  {
    id: "campo",
    titulo: "El campo de juego",
    reglas: [
      { titulo: "Dimensiones oficiales", texto: "El campo mide 20m de largo × 10m de ancho. Está dividido por una red a 88cm en los laterales y 92cm en el centro. Las paredes (cristal o cemento) son parte del campo." },
      { titulo: "Líneas", texto: "Hay línea de saque a 6.95m de la red en cada lado. La línea de saque divide la cancha en dos mitades. No hay líneas laterales de saque: el saque puede caer en todo el ancho del cuadro de saque." },
      { titulo: "Paredes", texto: "Las paredes traseras miden 4m de alto. Las laterales miden 3m de alto (4m en el fondo). Son metálicas en la parte superior y cristal en la inferior (o cemento en canchas outdoor)." },
    ],
  },
  {
    id: "saque",
    titulo: "El saque",
    reglas: [
      { titulo: "Posición del sacador", texto: "El sacador debe estar detrás de la línea de saque, entre la línea central y la pared lateral derecha (primer saque desde el lado derecho)." },
      { titulo: "Ejecución", texto: "El sacador debe dejar caer la pelota y golpearla cuando esté a la altura de la cintura o por debajo. No se puede tirar la pelota hacia arriba para sacar como en tenis." },
      { titulo: "La pelota debe", texto: "Tocar el suelo del lado del sacador y, sin tocar la red, aterrizar en el cuadro de saque diagonal del oponente. Puede tocar la pared trasera y/o lateral del receptor antes de que éste la devuelva." },
      { titulo: "Faltas de saque", texto: "Pisar o pasar la línea de saque. Golpear la pelota por encima de la cintura. La pelota cae fuera del cuadro de saque. La pelota toca la red. El sacador pierde el pie de apoyo. Dos faltas = punto para el receptor." },
      { titulo: "Let de saque", texto: "Si la pelota toca la red y cae correctamente en el cuadro de saque, se repite el saque sin penalización. No hay límite de lets en el saque." },
    ],
  },
  {
    id: "pelota",
    titulo: "Pelota en juego",
    reglas: [
      { titulo: "Bote antes de golpear", texto: "La pelota puede (y debe en la mayoría de casos) botar una vez antes de ser golpeada. No es obligatorio golpearla al vuelo, pero podés hacerlo." },
      { titulo: "Paredes propias", texto: "Podés dejar que la pelota rebote en las paredes de tu propio lado (laterales y trasera) y luego golpearla. Esta es una característica única del pádel." },
      { titulo: "Paredes rivales", texto: "La pelota que golpeás puede tocar paredes del lado del rival DESPUÉS de haber botado en el suelo rival. Si toca la pared rival antes de botar en el suelo, es falta." },
      { titulo: "La pelota sale de cancha", texto: "Si la pelota sale por encima o por el lateral del campo después de botar en el suelo rival, el punto continúa. El jugador puede salir de la cancha para devolver la pelota (regla especial del pádel)." },
      { titulo: "Salir de cancha", texto: "Los jugadores pueden salir de la cancha por las puertas y devolver la pelota. La pelota debe volver al campo contrario de forma válida. Es válido y muy táctico." },
    ],
  },
  {
    id: "faltas",
    titulo: "Faltas y puntos",
    reglas: [
      { titulo: "Pierdes el punto si", texto: "La pelota bota dos veces antes de que la golpees. La pelota que golpeás toca una pared del lado rival antes de botar en el suelo. La pelota va directamente a la pared sin cruzar la red. Tocás la red. Golpeás la pelota dos veces." },
      { titulo: "Doble golpe", texto: "Solo podés golpear la pelota una vez. Si tocás la pelota dos veces con la misma palada, es falta. Si dos compañeros tocan la pelota, también es falta." },
      { titulo: "Interferencia del cuerpo", texto: "Si la pelota toca cualquier parte de tu cuerpo o ropa, es falta y el punto es para el rival." },
      { titulo: "Interferir al rival", texto: "Si obstruís intencionalmente al rival que intenta golpear la pelota, el árbitro puede llamar let o darte el punto al rival." },
    ],
  },
  {
    id: "puntuacion",
    titulo: "Puntuación",
    reglas: [
      { titulo: "Sistema de puntos", texto: "Igual que el tenis: 15-30-40-juego. En deuce (40-40), hay que ganar dos puntos consecutivos." },
      { titulo: "Juegos y sets", texto: "Se juega al mejor de 3 sets (o en torneos profesionales al mejor de 5). Para ganar un set hay que ganar 6 juegos con 2 de diferencia." },
      { titulo: "Tie break", texto: "Con 6-6 en juegos, se juega un tie break a 7 puntos (con 2 de diferencia). Se saca una vez al inicio y luego alternando cada 2 puntos." },
      { titulo: "Super tie break", texto: "En muchos torneos amateurs, el tercer set se reemplaza por un super tie break a 10 puntos (con 2 de diferencia)." },
    ],
  },
  {
    id: "casos",
    titulo: "Casos especiales",
    reglas: [
      { titulo: "Pelota en la línea", texto: "La pelota que toca la línea es buena. La línea cuenta como parte del cuadro o del campo." },
      { titulo: "Red o poste", texto: "Si la pelota toca la red o el poste y cae al campo contrario de forma válida, es un punto válido (golpe de red o 'cord')." },
      { titulo: "Pelota rota", texto: "Si una pelota se rompe durante el juego, se repite el punto." },
      { titulo: "Obstáculo externo", texto: "Si algún objeto externo interrumpe el juego (pelota de otra cancha, etc.), se repite el punto." },
      { titulo: "La pelota toca al árbitro", texto: "Si la pelota toca al árbitro o silla de árbitro, se repite el punto." },
    ],
  },
];

export default function ReglasPage() {
  return (
    <>
      <Navbar activeSection="/reglas" />
      <main>
        <section className="px-6 md:px-8 py-10 md:py-14 border-b border-line bg-canvas-warm">
          <div className="max-w-[900px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Aprender</div>
            <h1 className="display text-5xl md:text-6xl font-semibold mb-4" style={{ letterSpacing: "-0.03em" }}>Reglas del pádel</h1>
            <p className="text-xl text-ink-muted leading-relaxed max-w-2xl">
              El reglamento oficial explicado en lenguaje simple. Sin tecnicismos innecesarios.
            </p>
            {/* Índice */}
            <div className="flex flex-wrap gap-2 mt-8">
              {secciones.map(s => (
                <a key={s.id} href={`#${s.id}`} className="px-3 py-1.5 border border-line rounded-lg text-sm hover:border-ink transition-colors">
                  {s.titulo}
                </a>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-[900px] mx-auto px-6 md:px-8 py-12 space-y-14">
          {secciones.map((sec, si) => (
            <section key={sec.id} id={sec.id}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#A8E63A] text-[#0D1B2A] flex items-center justify-center font-bold flex-shrink-0 text-sm">{si + 1}</div>
                <h2 className="display text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>{sec.titulo}</h2>
              </div>
              <div className="space-y-4 pl-12">
                {sec.reglas.map((r, ri) => (
                  <div key={ri} className="border border-line rounded-xl p-5 bg-canvas">
                    <div className="font-semibold mb-1.5">{r.titulo}</div>
                    <p className="text-sm text-ink-muted leading-relaxed">{r.texto}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Nota final */}
          <div className="border border-[#D97706] bg-[#FEF3C7]/30 rounded-xl p-6">
            <div className="font-semibold mb-2">Nota sobre las reglas oficiales</div>
            <p className="text-sm text-ink-muted leading-relaxed">
              Estas reglas están basadas en el reglamento oficial de la Federación Internacional de Pádel (FIP). Para uso en torneos oficiales, siempre consultá el reglamento completo en el sitio de la FIP o tu federación nacional.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
