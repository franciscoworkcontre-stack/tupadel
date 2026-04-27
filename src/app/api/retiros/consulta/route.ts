import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { retiroConsultas } from "@/db/schema";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { retiroId, edicionId, nombre, email, telefono, participantes, mensaje } = await req.json();

  if (!retiroId || !edicionId || !nombre || !email) {
    return NextResponse.json({ error: "Faltan campos requeridos." }, { status: 400 });
  }

  const session = await getSession();

  await db.insert(retiroConsultas).values({
    edicionId,
    retiroId,
    nombre,
    email,
    telefono: telefono || null,
    mensaje: mensaje || null,
    participantes: parseInt(participantes) || 1,
    userId: session?.id ?? null,
    estado: "nueva",
  });

  return NextResponse.json({ ok: true });
}
