import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { canchaAdmins, canchaHorarios } from "@/db/schema";
import { requireSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  let session;
  try { session = await requireSession(); } catch { return NextResponse.json({ error: "No autenticado." }, { status: 401 }); }

  const [adminEntry] = await db.select({ clubId: canchaAdmins.clubId }).from(canchaAdmins).where(eq(canchaAdmins.userId, session.id)).limit(1);
  if (!adminEntry) return NextResponse.json({ error: "Sin club asignado." }, { status: 403 });

  const { diaSemana, horaInicio, horaFin, canchaNumero, tipo, precioClp } = await req.json();
  if (!precioClp || !horaInicio || !horaFin) {
    return NextResponse.json({ error: "Faltan campos requeridos." }, { status: 400 });
  }

  await db.insert(canchaHorarios).values({
    clubId: adminEntry.clubId,
    diaSemana,
    horaInicio,
    horaFin,
    canchaNumero: canchaNumero || 1,
    tipo: tipo || "regular",
    precioClp,
    disponible: true,
  });

  return NextResponse.json({ ok: true });
}
