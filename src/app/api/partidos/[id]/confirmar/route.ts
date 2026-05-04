import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { matches, matchJugadores, matchConfirmaciones, users } from "@/db/schema";
import { eq, and, inArray, sql } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { calcularPuntos, categoriaFromPuntos } from "@/lib/puntos";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  const { id: matchId } = await params;
  const body = await req.json();
  const confirma: boolean = body.confirma ?? true;
  const motivoDisputa: string | undefined = body.motivoDisputa;

  // Cargar partido
  const [match] = await db.select().from(matches).where(eq(matches.id, matchId)).limit(1);
  if (!match) return NextResponse.json({ error: "Partido no encontrado." }, { status: 404 });
  if (match.estado === "confirmado") return NextResponse.json({ error: "Ya confirmado." }, { status: 400 });
  if (match.estado === "anulado") return NextResponse.json({ error: "Partido anulado." }, { status: 400 });

  // Verificar que el usuario es participante
  const jugadores = await db.select().from(matchJugadores).where(eq(matchJugadores.matchId, matchId));
  const esParticipante = jugadores.some((j) => j.userId === session.id);
  if (!esParticipante) return NextResponse.json({ error: "No sos participante de este partido." }, { status: 403 });

  // Idempotencia: no confirmar dos veces
  const yaConfirmo = await db.select({ id: matchConfirmaciones.id })
    .from(matchConfirmaciones)
    .where(and(eq(matchConfirmaciones.matchId, matchId), eq(matchConfirmaciones.userId, session.id)))
    .limit(1);
  if (yaConfirmo.length > 0) return NextResponse.json({ error: "Ya confirmaste este partido." }, { status: 400 });

  // Registrar confirmación
  await db.insert(matchConfirmaciones).values({ matchId, userId: session.id, confirma, motivoDisputa });

  // Si alguien disputa → partido en_disputa
  if (!confirma) {
    await db.update(matches).set({ estado: "en_disputa" }).where(eq(matches.id, matchId));
    return NextResponse.json({ ok: true, estado: "en_disputa" });
  }

  // Ver si ya confirmaron todos
  const confirmaciones = await db.select().from(matchConfirmaciones)
    .where(and(eq(matchConfirmaciones.matchId, matchId), eq(matchConfirmaciones.confirma, true)));

  if (confirmaciones.length < jugadores.length) {
    return NextResponse.json({ ok: true, estado: "pendiente", confirmaciones: confirmaciones.length, total: jugadores.length });
  }

  // Todos confirmaron → acreditar puntos
  const ganadorEquipo = match.setsEquipoA > match.setsEquipoB ? "A" : "B";
  const userIds = jugadores.map((j) => j.userId);
  const dbUsers = await db.select({ id: users.id, categoriaEstimada: users.categoriaEstimada, puntosRanking: users.puntosRanking, rachaActual: users.rachaActual })
    .from(users).where(inArray(users.id, userIds));

  const userMap = Object.fromEntries(dbUsers.map((u) => [u.id, u]));

  for (const jugador of jugadores) {
    const u = userMap[jugador.userId];
    if (!u) continue;

    const rivalEquipo = jugador.equipo === "A" ? "B" : "A";
    const rivales = jugadores.filter((j) => j.equipo === rivalEquipo);
    const catRivales = rivales.map((r) => userMap[r.userId]?.categoriaEstimada ?? 6);

    const gano = jugador.equipo === ganadorEquipo;
    const puntos = calcularPuntos({
      tipo: match.tipo as "no_oficial" | "torneo_amateur",
      gano,
      catPropia: u.categoriaEstimada ?? 6,
      catRivales,
      rachaActual: u.rachaActual,
    });

    const nuevosPuntos = (u.puntosRanking ?? 0) + puntos;
    const nuevaCategoria = categoriaFromPuntos(nuevosPuntos);
    const nuevaRacha = gano ? (u.rachaActual ?? 0) + 1 : 0;

    await db.update(matchJugadores)
      .set({ puntosGanados: puntos, gano, categoriaAlMomentoDeJugar: u.categoriaEstimada ?? 6 })
      .where(and(eq(matchJugadores.matchId, matchId), eq(matchJugadores.userId, jugador.userId)));

    await db.update(users).set({
      puntosRanking: nuevosPuntos,
      categoriaEstimada: nuevaCategoria,
      rachaActual: nuevaRacha,
      partidosJugados: sql`${users.partidosJugados} + 1`,
      partidosGanados: gano ? sql`${users.partidosGanados} + 1` : users.partidosGanados,
    }).where(eq(users.id, jugador.userId));
  }

  await db.update(matches).set({ estado: "confirmado" }).where(eq(matches.id, matchId));
  return NextResponse.json({ ok: true, estado: "confirmado" });
}
