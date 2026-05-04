import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { matches, matchJugadores, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

const TIPO_VALIDOS = ["no_oficial", "torneo_amateur"] as const;

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  const body = await req.json();
  const { tipo, fechaJugado, cancha, torneoNombre, detalleSets, setsEquipoA, setsEquipoB, jugadores } = body;

  if (!TIPO_VALIDOS.includes(tipo)) return NextResponse.json({ error: "Tipo inválido." }, { status: 400 });
  if (!fechaJugado) return NextResponse.json({ error: "Fecha requerida." }, { status: 400 });
  if (typeof setsEquipoA !== "number" || typeof setsEquipoB !== "number") {
    return NextResponse.json({ error: "Resultado inválido." }, { status: 400 });
  }
  if (!Array.isArray(jugadores) || jugadores.length !== 4) {
    return NextResponse.json({ error: "Se requieren exactamente 4 jugadores." }, { status: 400 });
  }

  // Validar que el creador es uno de los jugadores
  const creadorEnJugadores = jugadores.some((j: { userId: string }) => j.userId === session.id);
  if (!creadorEnJugadores) return NextResponse.json({ error: "Debés ser uno de los jugadores." }, { status: 400 });

  // Validar que los 4 usuarios existen
  const userIds: string[] = jugadores.map((j: { userId: string }) => j.userId);
  const uniqueIds = [...new Set(userIds)];
  if (uniqueIds.length !== 4) return NextResponse.json({ error: "Los 4 jugadores deben ser distintos." }, { status: 400 });

  const dbUsers = await db.select({ id: users.id, categoriaEstimada: users.categoriaEstimada })
    .from(users).where(eq(users.id, uniqueIds[0])); // quick existence check first
  if (dbUsers.length === 0) return NextResponse.json({ error: "Jugador no encontrado." }, { status: 400 });

  const [match] = await db.insert(matches).values({
    tipo,
    estado: "pendiente",
    setsEquipoA,
    setsEquipoB,
    detalleSets,
    fechaJugado: new Date(fechaJugado),
    cancha,
    torneoNombre: tipo === "torneo_amateur" ? torneoNombre : null,
    creadoPorId: session.id,
  }).returning();

  const ganadorEquipo = setsEquipoA > setsEquipoB ? "A" : "B";

  await db.insert(matchJugadores).values(
    jugadores.map((j: { userId: string; equipo: "A" | "B" }) => ({
      matchId: match.id,
      userId: j.userId,
      equipo: j.equipo,
      gano: j.equipo === ganadorEquipo,
      puntosGanados: 0, // se calculan al confirmar
      categoriaAlMomentoDeJugar: 6, // se actualiza al confirmar
    }))
  );

  return NextResponse.json({ ok: true, matchId: match.id });
}
