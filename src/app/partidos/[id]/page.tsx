export const dynamic = "force-dynamic";

import { db } from "@/db";
import { matches, matchJugadores, matchConfirmaciones, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { ConfirmarButton } from "./confirmar-button";

const ESTADO_STYLE: Record<string, { label: string; bg: string; text: string }> = {
  pendiente:   { label: "Pendiente confirmación", bg: "#FFF7ED", text: "#D97706" },
  confirmado:  { label: "Confirmado",              bg: "#ECFDF5", text: "#065F46" },
  en_disputa:  { label: "En disputa",              bg: "#FEF2F2", text: "#991B1B" },
  anulado:     { label: "Anulado",                 bg: "#F9FAFB", text: "#6B7280" },
};

export default async function PartidoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();

  const [match] = await db.select().from(matches).where(eq(matches.id, id)).limit(1);
  if (!match) notFound();

  const jugadores = await db
    .select({ jug: matchJugadores, user: { id: users.id, nombre: users.nombre, email: users.email, categoriaEstimada: users.categoriaEstimada } })
    .from(matchJugadores)
    .innerJoin(users, eq(matchJugadores.userId, users.id))
    .where(eq(matchJugadores.matchId, id));

  const confirmaciones = await db.select().from(matchConfirmaciones).where(eq(matchConfirmaciones.matchId, id));

  const esParticipante = session ? jugadores.some((j) => j.user.id === session.id) : false;
  const yaConfirmo = session ? confirmaciones.some((c) => c.userId === session.id) : false;

  const equipoA = jugadores.filter((j) => j.jug.equipo === "A");
  const equipoB = jugadores.filter((j) => j.jug.equipo === "B");
  const estado = ESTADO_STYLE[match.estado] ?? ESTADO_STYLE.pendiente;

  return (
    <>
      <Navbar />
      <main className="max-w-[700px] mx-auto px-6 py-12">
        <Link href="/mi-padel" className="mono text-xs text-ink-soft hover:text-ink mb-8 inline-block">← Mi pádel</Link>

        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-1">
              {match.tipo === "torneo_amateur" ? `Torneo: ${match.torneoNombre ?? "Amateur"}` : "Partido amistoso"}
            </div>
            <h1 className="display text-3xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
              {new Date(match.fechaJugado).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" })}
            </h1>
            {match.cancha && <p className="text-ink-muted text-sm mt-1">{match.cancha}</p>}
          </div>
          <span className="mono text-xs px-3 py-1.5 rounded-full font-medium border" style={{ backgroundColor: estado.bg, color: estado.text, borderColor: estado.text + "40" }}>
            {estado.label}
          </span>
        </div>

        {/* Resultado */}
        <div className="border border-line rounded-2xl p-6 bg-canvas mb-6">
          <div className="grid grid-cols-5 items-center gap-4">
            <div className="col-span-2 text-center">
              <div className="mono text-xs text-[#A8E63A] uppercase mb-2">Equipo A</div>
              <div className="text-5xl font-bold display">{match.setsEquipoA}</div>
              <div className="mt-3 space-y-1">
                {equipoA.map(({ user, jug }) => (
                  <div key={user.id} className="flex items-center justify-center gap-2 text-sm">
                    <span className="font-medium">{user.nombre ?? user.email}</span>
                    {match.estado === "confirmado" && jug.puntosGanados > 0 && (
                      <span className="mono text-xs text-[#065F46]">+{jug.puntosGanados}pts</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="text-ink-soft font-bold text-xl">VS</div>
              {match.detalleSets && <div className="mono text-xs text-ink-muted mt-2">{match.detalleSets}</div>}
            </div>
            <div className="col-span-2 text-center">
              <div className="mono text-xs text-[#E8590C] uppercase mb-2">Equipo B</div>
              <div className="text-5xl font-bold display">{match.setsEquipoB}</div>
              <div className="mt-3 space-y-1">
                {equipoB.map(({ user, jug }) => (
                  <div key={user.id} className="flex items-center justify-center gap-2 text-sm">
                    <span className="font-medium">{user.nombre ?? user.email}</span>
                    {match.estado === "confirmado" && jug.puntosGanados > 0 && (
                      <span className="mono text-xs text-[#065F46]">+{jug.puntosGanados}pts</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Confirmaciones */}
        <div className="border border-line rounded-xl p-5 bg-canvas-warm mb-6">
          <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-4">
            Confirmaciones — {confirmaciones.filter((c) => c.confirma).length}/{jugadores.length}
          </div>
          <div className="space-y-2">
            {jugadores.map(({ user }) => {
              const conf = confirmaciones.find((c) => c.userId === user.id);
              return (
                <div key={user.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{user.nombre ?? user.email}</span>
                  {conf ? (
                    <span className={`mono text-xs ${conf.confirma ? "text-[#065F46]" : "text-[#991B1B]"}`}>
                      {conf.confirma ? "✓ Confirmó" : "✗ Disputó"}
                    </span>
                  ) : (
                    <span className="mono text-xs text-amber-600">Pendiente</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA confirmar */}
        {esParticipante && match.estado === "pendiente" && !yaConfirmo && (
          <ConfirmarButton matchId={match.id} />
        )}
        {yaConfirmo && match.estado === "pendiente" && (
          <p className="text-center text-sm text-ink-muted">Ya confirmaste este partido. Esperando a los demás.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
