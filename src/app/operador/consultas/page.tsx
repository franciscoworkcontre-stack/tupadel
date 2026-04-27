export const dynamic = "force-dynamic";

import { db } from "@/db";
import { retiroConsultas, retiros, retiroEdiciones, operadores } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

function formatDate(d: Date) {
  return new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(d));
}

export default async function OperadorConsultasPage() {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const [operador] = await db.select({ id: operadores.id }).from(operadores).where(eq(operadores.userId, session.id)).limit(1);
  if (!operador) redirect("/operador/onboarding");

  const consultas = await db
    .select({
      id: retiroConsultas.id,
      nombre: retiroConsultas.nombre,
      email: retiroConsultas.email,
      telefono: retiroConsultas.telefono,
      mensaje: retiroConsultas.mensaje,
      participantes: retiroConsultas.participantes,
      estado: retiroConsultas.estado,
      createdAt: retiroConsultas.createdAt,
      retiroTitulo: retiros.titulo,
      retiroSlug: retiros.slug,
    })
    .from(retiroConsultas)
    .innerJoin(retiros, eq(retiroConsultas.retiroId, retiros.id))
    .where(eq(retiros.operadorId, operador.id))
    .orderBy(desc(retiroConsultas.createdAt));

  const estadoColor: Record<string, string> = {
    nueva: "bg-[#FEF3C7] text-[#D97706]",
    respondida: "bg-[#ECFCCB] text-[#65A30D]",
    convertida: "bg-[#0891B2]/10 text-[#0891B2]",
    descartada: "bg-canvas-dim text-ink-soft",
  };

  return (
    <div className="max-w-[900px]">
      <div className="mb-8">
        <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-1">Operador</div>
        <h1 className="display text-3xl font-semibold">Consultas</h1>
        <p className="text-ink-muted text-sm mt-1">{consultas.length} consultas totales · {consultas.filter(c => c.estado === "nueva").length} sin responder</p>
      </div>

      {consultas.length === 0 ? (
        <div className="border border-line rounded-xl p-10 text-center text-ink-muted">
          <div className="text-3xl mb-3">📭</div>
          <div className="font-semibold mb-1">Todavía no hay consultas</div>
          <p className="text-sm">Cuando alguien consulte por tus retiros, aparecerá aquí.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {consultas.map(c => (
            <div key={c.id} className="border border-line rounded-xl p-5 bg-canvas">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="font-semibold">{c.nombre}</div>
                  <div className="mono text-xs text-ink-soft">{c.email}{c.telefono ? ` · ${c.telefono}` : ""}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${estadoColor[c.estado] ?? estadoColor.nueva}`}>
                    {c.estado}
                  </span>
                  <span className="mono text-xs text-ink-soft">{c.createdAt ? formatDate(c.createdAt) : ""}</span>
                </div>
              </div>
              <div className="text-xs text-ink-muted mb-2">
                Retiro: <span className="font-semibold text-ink">{c.retiroTitulo}</span>
                {c.participantes && c.participantes > 1 && <span> · {c.participantes} participantes</span>}
              </div>
              {c.mensaje && (
                <p className="text-sm text-ink-muted bg-canvas-warm rounded-lg px-4 py-3">{c.mensaje}</p>
              )}
              <div className="flex items-center gap-3 mt-3">
                <a href={`mailto:${c.email}?subject=Re: ${c.retiroTitulo}`}
                  className="text-xs font-semibold text-[#A8E63A] hover:underline">
                  Responder por email →
                </a>
                {c.telefono && (
                  <a href={`https://wa.me/${c.telefono.replace(/[^0-9]/g, "")}?text=Hola ${c.nombre}, te contactamos de ${c.retiroTitulo}`}
                    target="_blank" rel="noopener" className="text-xs font-semibold text-ink-muted hover:text-ink">
                    WhatsApp →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
