export const dynamic = "force-dynamic";

import Link from "next/link";
import { db } from "@/db";
import { operadores, retiros, retiroEdiciones, retiroConsultas } from "@/db/schema";
import { eq, sql, and, count } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

function formatPrice(n: number) { return "$" + n.toLocaleString("es-CL"); }

export default async function OperadorDashboard() {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const [operador] = await db
    .select()
    .from(operadores)
    .where(eq(operadores.userId, session.id))
    .limit(1);

  if (!operador) {
    return (
      <div className="max-w-xl">
        <h1 className="display text-3xl font-semibold mb-2">Bienvenido/a</h1>
        <p className="text-ink-muted mb-6">Antes de crear retiros, completá tu perfil de operador.</p>
        <Link href="/operador/onboarding" className="bg-[#A8E63A] text-[#0D1B2A] px-6 py-3 rounded-lg font-semibold hover:bg-[#7DB81E] transition-colors">
          Completar perfil →
        </Link>
      </div>
    );
  }

  const retirosData = await db
    .select({
      id: retiros.id,
      slug: retiros.slug,
      titulo: retiros.titulo,
      estado: retiros.estado,
      genero: retiros.genero,
      ciudad: retiros.ciudad,
    })
    .from(retiros)
    .where(eq(retiros.operadorId, operador.id));

  const consultasNuevas = await db
    .select({ count: count() })
    .from(retiroConsultas)
    .where(and(
      eq(retiroConsultas.retiroId, retiros.id),
      eq(retiroConsultas.estado, "nueva")
    ));

  const totalConsultas = await db
    .select({ count: count() })
    .from(retiroConsultas)
    .innerJoin(retiros, eq(retiroConsultas.retiroId, retiros.id))
    .where(eq(retiros.operadorId, operador.id));

  const totalConsultasNuevas = await db
    .select({ count: count() })
    .from(retiroConsultas)
    .innerJoin(retiros, eq(retiroConsultas.retiroId, retiros.id))
    .where(and(eq(retiros.operadorId, operador.id), eq(retiroConsultas.estado, "nueva")));

  const retirosPublicados = retirosData.filter(r => r.estado === "publicado").length;

  const estadoLabel: Record<string, { label: string; color: string }> = {
    borrador: { label: "Borrador", color: "text-ink-soft bg-canvas-warm" },
    en_revision: { label: "En revisión", color: "text-[#D97706] bg-[#FEF3C7]" },
    publicado: { label: "Publicado", color: "text-[#65A30D] bg-[#ECFCCB]" },
    pausado: { label: "Pausado", color: "text-ink-muted bg-canvas-dim" },
  };

  return (
    <div className="max-w-[1200px]">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-1">Panel Operador</div>
          <h1 className="display text-3xl md:text-4xl font-semibold" style={{ letterSpacing: "-0.02em" }}>{operador.nombreEmpresa}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${operador.estado === "verificado" ? "text-[#65A30D] bg-[#ECFCCB]" : "text-[#D97706] bg-[#FEF3C7]"}`}>
              {operador.estado === "verificado" ? "✓ Verificado" : "Pendiente verificación"}
            </span>
          </div>
        </div>
        <Link href="/operador/retiros/nuevo" className="bg-[#A8E63A] text-[#0D1B2A] px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#7DB81E] transition-colors">
          + Crear retiro
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { num: retirosData.length, label: "Retiros totales" },
          { num: retirosPublicados, label: "Publicados" },
          { num: totalConsultas[0]?.count ?? 0, label: "Consultas" },
          { num: totalConsultasNuevas[0]?.count ?? 0, label: "Sin responder", alert: (totalConsultasNuevas[0]?.count ?? 0) > 0 },
        ].map(s => (
          <div key={s.label} className={`border rounded-xl p-5 bg-canvas ${s.alert ? "border-[#E8590C]/30" : "border-line"}`}>
            <div className={`stat-num text-3xl ${s.alert ? "text-[#E8590C]" : ""}`}>{s.num}</div>
            <div className="text-xs text-ink-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Consultas pendientes alert */}
      {(totalConsultasNuevas[0]?.count ?? 0) > 0 && (
        <div className="bg-[#FEF3C7] border border-[#D97706]/30 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <div className="font-semibold text-sm">Tenés {totalConsultasNuevas[0]?.count} consulta{(totalConsultasNuevas[0]?.count ?? 0) > 1 ? "s" : ""} sin responder</div>
              <div className="text-xs text-ink-muted">Responder rápido mejora tu tasa de conversión</div>
            </div>
          </div>
          <Link href="/operador/consultas" className="text-sm font-semibold hover:underline">Ver consultas →</Link>
        </div>
      )}

      {/* Lista de retiros */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="display text-xl font-semibold">Mis retiros</h2>
          <Link href="/operador/retiros/nuevo" className="text-sm text-[#A8E63A] font-semibold hover:underline">+ Agregar</Link>
        </div>

        {retirosData.length === 0 ? (
          <div className="border border-dashed border-line rounded-xl p-10 text-center">
            <div className="text-3xl mb-3">🏝️</div>
            <div className="font-semibold mb-1">Todavía no tenés retiros</div>
            <p className="text-sm text-ink-muted mb-4">Creá tu primer retiro y empezá a recibir consultas.</p>
            <Link href="/operador/retiros/nuevo" className="inline-block bg-[#A8E63A] text-[#0D1B2A] px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#7DB81E] transition-colors">
              Crear primer retiro →
            </Link>
          </div>
        ) : (
          <div className="border border-line rounded-xl overflow-hidden bg-canvas">
            {retirosData.map((r, i) => {
              const est = estadoLabel[r.estado] ?? estadoLabel.borrador;
              return (
                <div key={r.id} className={`flex items-center gap-4 px-5 py-4 ${i > 0 ? "border-t border-line" : ""}`}>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{r.titulo}</div>
                    <div className="mono text-xs text-ink-soft">{r.ciudad} · {r.genero}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium flex-shrink-0 ${est.color}`}>{est.label}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link href={`/retiros/${r.slug}`} target="_blank" className="text-xs text-ink-muted hover:text-ink transition-colors">Ver →</Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
