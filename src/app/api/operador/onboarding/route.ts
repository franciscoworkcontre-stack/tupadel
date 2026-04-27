import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { operadores, users } from "@/db/schema";
import { requireSession } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  let session;
  try { session = await requireSession(); } catch { return NextResponse.json({ error: "No autenticado." }, { status: 401 }); }

  const { nombreEmpresa, rut, descripcionMd, instagram, sitioWeb, telefono, paisBase } = await req.json();
  if (!nombreEmpresa || !descripcionMd) {
    return NextResponse.json({ error: "Nombre y descripción son requeridos." }, { status: 400 });
  }

  const slug = nombreEmpresa.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const existing = await db.select({ id: operadores.id }).from(operadores).where(eq(operadores.userId, session.id)).limit(1);
  if (existing.length > 0) {
    return NextResponse.json({ error: "Ya tenés un perfil de operador." }, { status: 409 });
  }

  await db.insert(operadores).values({
    userId: session.id,
    slug: `${slug}-${Date.now()}`,
    nombreEmpresa,
    rut: rut || null,
    descripcionMd,
    instagram: instagram || null,
    sitioWeb: sitioWeb || null,
    telefono: telefono || null,
    paisBase: paisBase || "CL",
    estado: "pendiente",
  });

  await db.update(users).set({ rol: "operador" }).where(eq(users.id, session.id));

  return NextResponse.json({ ok: true });
}
