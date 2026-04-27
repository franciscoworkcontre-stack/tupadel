export const dynamic = "force-dynamic";

import Link from "next/link";
import { db } from "@/db";
import { canchaAdmins, clubes, canchaReservas, reviewsCanchas, canchaHorarios } from "@/db/schema";
import { eq, count, gte, and } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

function formatPrice(n: number) { return "$" + n.toLocaleString("es-CL"); }

export default async function ClubDashboard() {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const [adminEntry] = await db
    .select({ clubId: canchaAdmins.clubId, cargo: canchaAdmins.cargo, permisos: canchaAdmins.permisos })
    .from(canchaAdmins)
    .where(eq(canchaAdmins.userId, session.id))
    .limit(1);

  if (!adminEntry) {
    return (
      <div className="max-w-xl">
        <h1 className="display text-3xl font-semibold mb-2">Sin club asignado</h1>
        <p className="text-ink-muted mb-4 text-sm">Tu cuenta admin_cancha no tiene un club asignado. Contactá al administrador de la plataforma.</p>
        <Link href="/" className="text-sm text-[#A8E63A] hover:underline">← Volver al inicio</Link>
      </div>
    );
  }

  const [club] = await db.select().from(clubes).where(eq(clubes.id, adminEntry.clubId)).limit(1);
  if (!club) redirect("/");

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const manana = new Date(hoy);
  manana.setDate(manana.getDate() + 1);

  const [totalReservas] = await db.select({ count: count() }).from(canchaReservas).where(eq(canchaReservas.clubId, club.id));
  const [reservasHoy] = await db.select({ count: count() }).from(canchaReservas).where(and(eq(canchaReservas.clubId, club.id), gte(canchaReservas.fecha, hoy)));
  const [totalReviews] = await db.select({ count: count() }).from(reviewsCanchas).where(eq(reviewsCanchas.clubId, club.id));
  const [horariosCount] = await db.select({ count: count() }).from(canchaHorarios).where(eq(canchaHorarios.clubId, club.id));

  const reservasProximas = await db
    .select()
    .from(canchaReservas)
    .where(and(eq(canchaReservas.clubId, club.id), gte(canchaReservas.fecha, hoy)))
    .orderBy(canchaReservas.fecha)
    .limit(5);

  function formatDateTime(d: Date) {
    return new Intl.DateTimeFormat("es-CL", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(d));
  }

  const estadoReserva: Record<string, string> = {
    confirmada: "text-[#65A30D] bg-[#ECFCCB]",
    cancelada: "text-ink-soft bg-canvas-dim",
    no_presentado: "text-[#E8590C] bg-[#FFE4D1]",
  };

  return (
    <div className="max-w-[1100px]">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-1">Panel Club</div>
          <h1 className="display text-3xl md:text-4xl font-semibold">{club.nombre}</h1>
          <div className="flex items-center gap-2 mt-1 text-sm text-ink-muted">
            <span>📍 {club.ciudad}{club.comuna ? `, ${club.comuna}` : ""}</span>
            {club.verificado && <span className="text-xs text-[#65A30D] font-semibold">✓ Verificado</span>}
          </div>
        </div>
        <Link href={`/canchas/${club.slug}`} target="_blank" className="border border-line px-4 py-2 rounded-lg text-sm hover:border-ink transition-colors">
          Ver en directorio →
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { num: reservasHoy?.count ?? 0, label: "Reservas hoy" },
          { num: totalReservas?.count ?? 0, label: "Total reservas" },
          { num: club.ratingPromedio ? club.ratingPromedio.toFixed(1) : "—", label: "Rating promedio" },
          { num: totalReviews?.count ?? 0, label: "Reviews" },
        ].map(s => (
          <div key={s.label} className="border border-line rounded-xl p-5 bg-canvas">
            <div className="stat-num text-3xl">{s.num}</div>
            <div className="text-xs text-ink-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Próximas reservas */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="display text-xl font-semibold">Próximas reservas</h2>
            <Link href="/club/reservas" className="text-sm text-[#A8E63A] font-semibold hover:underline">Ver todas →</Link>
          </div>
          {reservasProximas.length === 0 ? (
            <div className="border border-dashed border-line rounded-xl p-6 text-center text-ink-muted text-sm">
              No hay reservas próximas
            </div>
          ) : (
            <div className="border border-line rounded-xl overflow-hidden bg-canvas">
              {reservasProximas.map((r, i) => (
                <div key={r.id} className={`px-5 py-3.5 ${i > 0 ? "border-t border-line" : ""} flex items-center justify-between`}>
                  <div>
                    <div className="font-semibold text-sm">{r.nombre}</div>
                    <div className="mono text-xs text-ink-soft">{r.fecha ? formatDateTime(r.fecha) : ""} · {r.horaInicio}–{r.horaFin}</div>
                    <div className="mono text-xs text-ink-soft">Cancha {r.canchaNumero}</div>
                  </div>
                  <div className="text-right">
                    <div className="mono text-sm font-semibold">{formatPrice(r.precioClp)}</div>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${estadoReserva[r.estadoReserva] ?? estadoReserva.confirmada}`}>{r.estadoReserva}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info del club */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="display text-xl font-semibold">Estado del club</h2>
            <Link href="/club/perfil" className="text-sm text-[#A8E63A] font-semibold hover:underline">Editar →</Link>
          </div>
          <div className="border border-line rounded-xl p-5 bg-canvas space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-ink-muted">Canchas</span><span className="font-semibold">{club.cantidadCanchas ?? "—"}</span></div>
            <div className="flex justify-between"><span className="text-ink-muted">Indoor</span><span className="font-semibold">{club.indoor ? "Sí" : "No"}</span></div>
            <div className="flex justify-between"><span className="text-ink-muted">Outdoor</span><span className="font-semibold">{club.outdoor ? "Sí" : "No"}</span></div>
            <div className="flex justify-between"><span className="text-ink-muted">Horarios configurados</span><span className="font-semibold">{horariosCount?.count ?? 0} franjas</span></div>
            <div className="flex justify-between"><span className="text-ink-muted">WhatsApp</span><span className="font-semibold">{club.whatsapp ?? "—"}</span></div>
          </div>

          {(horariosCount?.count ?? 0) === 0 && (
            <div className="mt-3 bg-[#FEF3C7] border border-[#D97706]/30 rounded-xl p-4">
              <div className="text-sm font-semibold mb-1">⚠️ Configurá tus horarios</div>
              <div className="text-xs text-ink-muted mb-2">Sin horarios publicados, los jugadores no pueden ver cuándo tienen disponibilidad.</div>
              <Link href="/club/horarios" className="text-xs font-semibold text-[#D97706] hover:underline">Agregar horarios →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
