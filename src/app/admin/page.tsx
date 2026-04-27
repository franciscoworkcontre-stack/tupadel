export const dynamic = "force-dynamic";

import Link from "next/link";
import { db } from "@/db";
import { users, operadores, retiros, clubes } from "@/db/schema";
import { eq, count } from "drizzle-orm";

export default async function AdminDashboard() {
  const [totalUsers] = await db.select({ count: count() }).from(users);
  const [totalOperadores] = await db.select({ count: count() }).from(operadores);
  const [pendientes] = await db.select({ count: count() }).from(operadores).where(eq(operadores.estado, "pendiente"));
  const [totalRetiros] = await db.select({ count: count() }).from(retiros);
  const [enRevision] = await db.select({ count: count() }).from(retiros).where(eq(retiros.estado, "en_revision"));
  const [totalClubes] = await db.select({ count: count() }).from(clubes);

  const operadoresPendientes = await db.select().from(operadores).where(eq(operadores.estado, "pendiente")).limit(10);
  const retirosEnRevision = await db.select({ id: retiros.id, titulo: retiros.titulo, slug: retiros.slug }).from(retiros).where(eq(retiros.estado, "en_revision")).limit(10);

  return (
    <div className="max-w-[1000px]">
      <div className="mb-8">
        <div className="mono text-xs text-[#DC2626] uppercase tracking-wider mb-1">Admin Interno</div>
        <h1 className="display text-3xl font-semibold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { num: totalUsers?.count ?? 0, label: "Usuarios totales" },
          { num: totalOperadores?.count ?? 0, label: "Operadores" },
          { num: pendientes?.count ?? 0, label: "Pendientes verificación", alert: (pendientes?.count ?? 0) > 0 },
          { num: totalRetiros?.count ?? 0, label: "Retiros" },
          { num: enRevision?.count ?? 0, label: "En revisión", alert: (enRevision?.count ?? 0) > 0 },
          { num: totalClubes?.count ?? 0, label: "Clubes" },
        ].map(s => (
          <div key={s.label} className={`border rounded-xl p-5 bg-canvas ${s.alert ? "border-[#E8590C]/30" : "border-line"}`}>
            <div className={`stat-num text-3xl ${s.alert ? "text-[#E8590C]" : ""}`}>{s.num}</div>
            <div className="text-xs text-ink-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="display text-xl font-semibold">Operadores pendientes</h2>
            <Link href="/admin/operadores" className="text-sm text-[#A8E63A] font-semibold hover:underline">Ver todos →</Link>
          </div>
          {operadoresPendientes.length === 0 ? (
            <div className="border border-line rounded-xl p-6 text-center text-ink-muted text-sm">Ninguno pendiente ✓</div>
          ) : (
            <div className="border border-line rounded-xl overflow-hidden bg-canvas">
              {operadoresPendientes.map((op, i) => (
                <div key={op.id} className={`px-5 py-3.5 flex items-center justify-between ${i > 0 ? "border-t border-line" : ""}`}>
                  <div>
                    <div className="font-semibold text-sm">{op.nombreEmpresa}</div>
                    <div className="mono text-xs text-ink-soft">{op.paisBase}</div>
                  </div>
                  <form action={`/api/admin/operador/${op.id}/verificar`} method="POST">
                    <button type="submit" className="text-xs bg-[#ECFCCB] text-[#65A30D] px-3 py-1.5 rounded font-semibold hover:bg-[#A8E63A] hover:text-[#0D1B2A] transition-colors">
                      Verificar →
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="display text-xl font-semibold">Retiros en revisión</h2>
            <Link href="/admin/retiros" className="text-sm text-[#A8E63A] font-semibold hover:underline">Ver todos →</Link>
          </div>
          {retirosEnRevision.length === 0 ? (
            <div className="border border-line rounded-xl p-6 text-center text-ink-muted text-sm">Ninguno en revisión ✓</div>
          ) : (
            <div className="border border-line rounded-xl overflow-hidden bg-canvas">
              {retirosEnRevision.map((r, i) => (
                <div key={r.id} className={`px-5 py-3.5 flex items-center justify-between ${i > 0 ? "border-t border-line" : ""}`}>
                  <div className="font-semibold text-sm truncate">{r.titulo}</div>
                  <Link href={`/retiros/${r.slug}`} target="_blank" className="text-xs text-ink-muted hover:text-ink">Ver →</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
