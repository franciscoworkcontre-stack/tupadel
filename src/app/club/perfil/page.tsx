export const dynamic = "force-dynamic";

import { db } from "@/db";
import { canchaAdmins, clubes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ClubPerfilForm } from "@/components/club/perfil-form";

export default async function ClubPerfilPage() {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const [adminEntry] = await db.select({ clubId: canchaAdmins.clubId }).from(canchaAdmins).where(eq(canchaAdmins.userId, session.id)).limit(1);
  if (!adminEntry) redirect("/club");

  const [club] = await db.select().from(clubes).where(eq(clubes.id, adminEntry.clubId)).limit(1);
  if (!club) redirect("/club");

  return (
    <div className="max-w-[700px]">
      <div className="mb-8">
        <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-1">Club</div>
        <h1 className="display text-3xl font-semibold">Perfil del club</h1>
        <p className="text-ink-muted text-sm mt-1">Esta información es visible para los jugadores en el directorio.</p>
      </div>
      <ClubPerfilForm club={club} />
    </div>
  );
}
