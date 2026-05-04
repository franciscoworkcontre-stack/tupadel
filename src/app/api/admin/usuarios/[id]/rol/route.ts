import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, adminLogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";

const ALLOWED_ROLES = ["jugador", "profe", "operador", "admin_cancha", "admin"] as const;

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.rol !== "admin") {
    return NextResponse.json({ error: "No autorizado." }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const nuevoRol = body.rol as string;

  if (!ALLOWED_ROLES.includes(nuevoRol as typeof ALLOWED_ROLES[number])) {
    return NextResponse.json({ error: "Rol inválido." }, { status: 400 });
  }

  const [target] = await db.select({ id: users.id, rol: users.rol }).from(users).where(eq(users.id, id)).limit(1);
  if (!target) {
    return NextResponse.json({ error: "Usuario no encontrado." }, { status: 404 });
  }

  const rolAnterior = target.rol;

  await db.update(users).set({ rol: nuevoRol }).where(eq(users.id, id));

  await db.insert(adminLogs).values({
    adminId: session.id,
    targetUserId: id,
    accion: "cambio_rol",
    valorAnterior: rolAnterior,
    valorNuevo: nuevoRol,
  });

  return NextResponse.json({ ok: true, rol: nuevoRol });
}
