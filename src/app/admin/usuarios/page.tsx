export const dynamic = "force-dynamic";

import { db } from "@/db";
import { users, profes } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import type { Metadata } from "next";
import { UsuariosClient } from "./usuarios-client";

export const metadata: Metadata = { title: "Gestión de Usuarios — Admin | tupadel" };

export default async function AdminUsuariosPage() {
  const allUsers = await db
    .select({
      id: users.id,
      email: users.email,
      nombre: users.nombre,
      rol: users.rol,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(desc(users.createdAt));

  const profesActivos = await db
    .select({ userId: profes.userId, slug: profes.slug })
    .from(profes)
    .where(eq(profes.estado, "activo"));

  const profeSlugByUserId = Object.fromEntries(
    profesActivos.filter((p) => p.userId).map((p) => [p.userId!, p.slug])
  );

  return (
    <div className="p-6 md:p-8 max-w-[1100px]">
      <div className="mb-6">
        <div className="mono text-xs text-[#DC2626] uppercase tracking-wider mb-1">Admin</div>
        <h1 className="display text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
          Gestión de usuarios
        </h1>
        <p className="text-ink-muted text-sm mt-1">{allUsers.length} usuarios registrados</p>
      </div>
      <UsuariosClient users={allUsers} profeSlugByUserId={profeSlugByUserId} />
    </div>
  );
}
