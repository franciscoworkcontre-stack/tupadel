export const dynamic = "force-dynamic";

import { db } from "@/db";
import { users, matchJugadores, matches } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import Link from "next/link";
import { puntosParaSiguienteCategoria } from "@/lib/puntos";
import type { Metadata } from "next";

const CAT_COLORS: Record<number, string> = {
  1: "#DC2626", 2: "#EA580C", 3: "#D97706", 4: "#65A30D", 5: "#0891B2", 6: "#7C3AED",
};
const CAT_NOMBRES: Record<number, string> = {
  1: "Competitivo", 2: "Avanzado", 3: "Intermedio alto", 4: "Intermedio", 5: "Intermedio bajo", 6: "Iniciación",
};
const UMBRALES = [0, 200, 500, 1000, 2000, 4000];

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const [jugador] = await db.select({ nombre: users.nombre, email: users.email }).from(users).where(eq(users.id, id)).limit(1);
  if (!jugador) return {};
  return { title: `${jugador.nombre ?? jugador.email} — Perfil | tupadel` };
}

export default async function JugadorPerfilPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [jugador] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  if (!jugador) notFound();

  const historial = await db
    .select({
      jug: matchJugadores,
      match: {
        id: matches.id,
        tipo: matches.tipo,
        estado: matches.estado,
        fechaJugado: matches.fechaJugado,
        setsEquipoA: matches.setsEquipoA,
        setsEquipoB: matches.setsEquipoB,
        torneoNombre: matches.torneoNombre,
      },
    })
    .from(matchJugadores)
    .innerJoin(matches, eq(matchJugadores.matchId, matches.id))
    .where(eq(matchJugadores.userId, id))
    .orderBy(desc(matches.fechaJugado))
    .limit(15);

  const cat = jugador.categoriaEstimada ?? 6;
  const puntos = jugador.puntosRanking ?? 0;
  const { siguiente, faltantes } = puntosParaSiguienteCategoria(puntos);

  const catMinPuntos = UMBRALES[6 - cat] ?? 0;
  const catMaxPuntos = UMBRALES[6 - cat + 1] ?? puntos;
  const progresoPct = catMaxPuntos > catMinPuntos
    ? Math.min(100, Math.round(((puntos - catMinPuntos) / (catMaxPuntos - catMinPuntos)) * 100))
    : 100;

  const winRate = jugador.partidosJugados > 0
    ? Math.round((jugador.partidosGanados / jugador.partidosJugados) * 100)
    : 0;

  return (
    <>
      <Navbar />
      <main className="max-w-[800px] mx-auto px-6 py-12">
        <Link href="/ranking" className="mono text-xs text-ink-soft hover:text-ink mb-8 inline-block">← Ranking</Link>

        {/* Header */}
        <div className="flex items-start gap-5 mb-10">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
            style={{ backgroundColor: CAT_COLORS[cat] }}>
            {cat}
          </div>
          <div>
            <h1 className="display text-3xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
              {jugador.nombre ?? "Jugador"}
            </h1>
            <div className="text-ink-muted text-sm mt-0.5">{CAT_NOMBRES[cat]}</div>
            {jugador.ciudad && <div className="mono text-xs text-ink-soft mt-1">{jugador.ciudad}</div>}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Puntos", value: puntos.toLocaleString("es-CL") },
            { label: "Partidos", value: jugador.partidosJugados },
            { label: "Win rate", value: `${winRate}%` },
            { label: "Racha", value: jugador.rachaActual > 0 ? `🔥 ${jugador.rachaActual}` : "—" },
          ].map((s) => (
            <div key={s.label} className="border border-line rounded-xl p-4 bg-canvas text-center">
              <div className="text-2xl font-bold display">{s.value}</div>
              <div className="mono text-xs text-ink-soft mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Progreso hacia siguiente cat */}
        {siguiente && (
          <div className="border border-line rounded-xl p-5 bg-canvas-warm mb-8">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm font-medium">Progreso hacia Cat {siguiente}</div>
              <div className="mono text-xs text-ink-muted">{faltantes} pts para subir</div>
            </div>
            <div className="h-2 bg-line rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progresoPct}%`, backgroundColor: CAT_COLORS[cat] }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="mono text-xs text-ink-soft">Cat {cat}</span>
              <span className="mono text-xs text-ink-soft">Cat {siguiente}</span>
            </div>
          </div>
        )}

        {/* Historial */}
        <div>
          <h2 className="display text-xl font-semibold mb-4" style={{ letterSpacing: "-0.02em" }}>Últimos partidos</h2>
          {historial.length === 0 ? (
            <p className="text-ink-muted text-sm">Todavía no hay partidos registrados.</p>
          ) : (
            <div className="space-y-2">
              {historial.map(({ jug, match }) => {
                const gano = jug.gano;
                const confirmado = match.estado === "confirmado";
                return (
                  <Link
                    key={match.id}
                    href={`/partidos/${match.id}`}
                    className="flex items-center gap-4 border border-line rounded-xl px-4 py-3 bg-canvas hover:border-ink-muted transition-colors"
                  >
                    <div className={`w-2 h-8 rounded-full flex-shrink-0 ${confirmado ? (gano ? "bg-[#A8E63A]" : "bg-[#E8590C]") : "bg-amber-400"}`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {new Date(match.fechaJugado).toLocaleDateString("es-CL", { day: "numeric", month: "short" })}
                        {match.tipo === "torneo_amateur" && <span className="mono text-xs text-[#1E40AF] ml-2">{match.torneoNombre ?? "Torneo"}</span>}
                      </div>
                      <div className="mono text-xs text-ink-muted">
                        {confirmado ? (gano ? "Victoria" : "Derrota") : "Pendiente"} · Sets {match.setsEquipoA}–{match.setsEquipoB}
                      </div>
                    </div>
                    {confirmado && jug.puntosGanados > 0 && (
                      <div className="mono text-xs font-semibold text-[#065F46]">+{jug.puntosGanados} pts</div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
