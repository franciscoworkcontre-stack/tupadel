export const dynamic = "force-dynamic";

import Link from "next/link";
import { db } from "@/db";
import { canchaAdmins, canchaReservas } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

function formatPrice(n: number) { return "$" + n.toLocaleString("es-CL"); }
function formatDate(d: Date) {
  return new Intl.DateTimeFormat("es-CL", { weekday: "short", day: "numeric", month: "short" }).format(new Date(d));
}

export default async function ClubReservasPage() {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const [adminEntry] = await db.select({ clubId: canchaAdmins.clubId }).from(canchaAdmins).where(eq(canchaAdmins.userId, session.id)).limit(1);
  if (!adminEntry) redirect("/club");

  const reservas = await db
    .select()
    .from(canchaReservas)
    .where(eq(canchaReservas.clubId, adminEntry.clubId))
    .orderBy(desc(canchaReservas.fecha))
    .limit(100);

  const estadoReserva: Record<string, string> = {
    confirmada: "text-[#65A30D] bg-[#ECFCCB]",
    cancelada: "text-ink-soft bg-canvas-dim",
    no_presentado: "text-[#E8590C] bg-[#FFE4D1]",
  };
  const estadoPago: Record<string, string> = {
    pendiente: "text-[#D97706] bg-[#FEF3C7]",
    pagado: "text-[#65A30D] bg-[#ECFCCB]",
    reembolsado: "text-[#0891B2] bg-[#0891B2]/10",
  };

  return (
    <div className="max-w-[1000px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-1">Club</div>
          <h1 className="display text-3xl font-semibold">Reservas</h1>
          <p className="text-ink-muted text-sm mt-1">{reservas.length} reservas registradas</p>
        </div>
        <button className="bg-[#A8E63A] text-[#0D1B2A] px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#7DB81E] transition-colors">
          + Nueva reserva
        </button>
      </div>

      {reservas.length === 0 ? (
        <div className="border border-line rounded-xl p-10 text-center text-ink-muted">
          <div className="text-3xl mb-3">📅</div>
          <div className="font-semibold mb-1">Sin reservas todavía</div>
          <p className="text-sm">Las reservas de tus canchas aparecerán aquí.</p>
        </div>
      ) : (
        <div className="border border-line rounded-xl overflow-hidden bg-canvas">
          <div className="grid grid-cols-6 px-5 py-2 bg-canvas-warm border-b border-line text-xs mono text-ink-soft uppercase tracking-wider">
            <div className="col-span-2">Jugador</div>
            <div>Fecha</div>
            <div>Cancha</div>
            <div>Pago</div>
            <div>Estado</div>
          </div>
          {reservas.map((r, i) => (
            <div key={r.id} className={`grid grid-cols-6 items-center px-5 py-3.5 ${i > 0 ? "border-t border-line" : ""}`}>
              <div className="col-span-2">
                <div className="font-semibold text-sm">{r.nombre}</div>
                <div className="mono text-xs text-ink-soft">{r.horaInicio}–{r.horaFin} · {formatPrice(r.precioClp)}</div>
              </div>
              <div className="mono text-xs">{r.fecha ? formatDate(r.fecha) : "—"}</div>
              <div className="mono text-xs">#{r.canchaNumero}</div>
              <div><span className={`text-xs px-1.5 py-0.5 rounded font-medium ${estadoPago[r.estadoPago] ?? estadoPago.pendiente}`}>{r.estadoPago}</span></div>
              <div><span className={`text-xs px-1.5 py-0.5 rounded font-medium ${estadoReserva[r.estadoReserva] ?? estadoReserva.confirmada}`}>{r.estadoReserva}</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
