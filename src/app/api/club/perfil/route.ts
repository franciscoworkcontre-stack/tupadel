import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { canchaAdmins, clubes } from "@/db/schema";
import { requireSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest) {
  let session;
  try { session = await requireSession(); } catch { return NextResponse.json({ error: "No autenticado." }, { status: 401 }); }

  const [adminEntry] = await db.select({ clubId: canchaAdmins.clubId }).from(canchaAdmins).where(eq(canchaAdmins.userId, session.id)).limit(1);
  if (!adminEntry) return NextResponse.json({ error: "Sin club asignado." }, { status: 403 });

  const { nombre, ciudad, comuna, direccion, telefono, whatsapp, instagram, website, cantidadCanchas, indoor, outdoor } = await req.json();

  await db.update(clubes).set({
    nombre, ciudad,
    comuna: comuna || null,
    direccion: direccion || null,
    telefono: telefono || null,
    whatsapp: whatsapp || null,
    instagram: instagram || null,
    website: website || null,
    cantidadCanchas: cantidadCanchas || null,
    indoor: indoor ?? false,
    outdoor: outdoor ?? false,
  }).where(eq(clubes.id, adminEntry.clubId));

  return NextResponse.json({ ok: true });
}
