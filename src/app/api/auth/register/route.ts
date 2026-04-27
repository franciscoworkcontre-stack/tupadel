import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, signToken, sessionCookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password, nombre, rol } = await req.json();
  if (!email || !password || !nombre) {
    return NextResponse.json({ error: "Todos los campos son requeridos." }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "La contraseña debe tener al menos 8 caracteres." }, { status: 400 });
  }

  const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email.toLowerCase().trim())).limit(1);
  if (existing.length > 0) {
    return NextResponse.json({ error: "Ya existe una cuenta con ese email." }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);
  const userRol = rol === "operador" ? "operador" : "jugador";

  const [user] = await db.insert(users).values({
    id: crypto.randomUUID(),
    email: email.toLowerCase().trim(),
    nombre,
    passwordHash,
    rol: userRol,
  }).returning();

  const token = await signToken({ id: user.id, email: user.email, nombre: user.nombre ?? null, rol: user.rol });
  const res = NextResponse.json({ ok: true, rol: user.rol });
  res.cookies.set(sessionCookieOptions(token));
  return res;
}
