export const dynamic = "force-dynamic";

import { db } from "@/db";
import { canchaAdmins, canchaHorarios } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ClubHorariosForm } from "@/components/club/horarios-form";

export default async function ClubHorariosPage() {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const [adminEntry] = await db.select({ clubId: canchaAdmins.clubId }).from(canchaAdmins).where(eq(canchaAdmins.userId, session.id)).limit(1);
  if (!adminEntry) redirect("/club");

  const horarios = await db
    .select()
    .from(canchaHorarios)
    .where(eq(canchaHorarios.clubId, adminEntry.clubId))
    .orderBy(canchaHorarios.diaSemana, canchaHorarios.horaInicio);

  const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const tipoColor: Record<string, string> = {
    regular: "text-ink bg-canvas-warm",
    prime: "text-[#D97706] bg-[#FEF3C7]",
    nocturno: "text-[#0891B2] bg-[#0891B2]/10",
  };

  function formatPrice(n: number) { return "$" + n.toLocaleString("es-CL"); }

  return (
    <div className="max-w-[800px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-1">Club</div>
          <h1 className="display text-3xl font-semibold">Horarios y precios</h1>
          <p className="text-ink-muted text-sm mt-1">Configurá la disponibilidad y tarifas de tus canchas.</p>
        </div>
      </div>

      {horarios.length === 0 ? (
        <div className="border border-dashed border-line rounded-xl p-8 text-center mb-6">
          <div className="text-3xl mb-3">⏰</div>
          <div className="font-semibold mb-1">Sin horarios configurados</div>
          <p className="text-sm text-ink-muted">Agregá franjas horarias para que los jugadores sepan tu disponibilidad.</p>
        </div>
      ) : (
        <div className="border border-line rounded-xl overflow-hidden bg-canvas mb-6">
          <div className="grid grid-cols-5 px-5 py-2 bg-canvas-warm border-b border-line text-xs mono text-ink-soft uppercase tracking-wider">
            <div>Día</div><div>Horario</div><div>Cancha</div><div>Tipo</div><div>Precio/hr</div>
          </div>
          {horarios.map((h, i) => (
            <div key={h.id} className={`grid grid-cols-5 items-center px-5 py-3 text-sm ${i > 0 ? "border-t border-line" : ""}`}>
              <div className="font-semibold">{dias[h.diaSemana]}</div>
              <div className="mono text-xs">{h.horaInicio}–{h.horaFin}</div>
              <div className="mono text-xs">#{h.canchaNumero}</div>
              <div><span className={`text-xs px-1.5 py-0.5 rounded ${tipoColor[h.tipo] ?? tipoColor.regular}`}>{h.tipo}</span></div>
              <div className="mono text-sm font-semibold">{formatPrice(h.precioClp)}</div>
            </div>
          ))}
        </div>
      )}

      <ClubHorariosForm clubId={adminEntry.clubId} />
    </div>
  );
}
