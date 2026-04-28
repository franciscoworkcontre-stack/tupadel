export const dynamic = "force-dynamic";
import Link from "next/link";
import { db } from "@/db";
import { profes } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Profes | Pulso Pádel" };

const estadoStyle: Record<string, string> = {
  borrador: "bg-gray-100 text-gray-600",
  pendiente_verificacion: "bg-amber-100 text-amber-700",
  activo: "bg-green-100 text-green-700",
  pausado: "bg-blue-100 text-blue-700",
  suspendido: "bg-red-100 text-red-700",
};

export default async function AdminProfesPage() {
  const pendientes = await db.query.profes.findMany({
    where: eq(profes.estado, "pendiente_verificacion"),
    orderBy: (p, { asc }) => [asc(p.createdAt)],
  });

  const activos = await db.query.profes.findMany({
    where: eq(profes.estado, "activo"),
    orderBy: (p, { desc }) => [desc(p.publishedAt)],
  });

  const todos = await db.query.profes.findMany({
    orderBy: (p, { desc }) => [desc(p.createdAt)],
  });

  return (
    <div className="p-6 md:p-8 max-w-[1200px]">
      <div className="mb-6">
        <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">Admin</div>
        <h1 className="display text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Gestión de profes</h1>
      </div>

      {/* Stats rápidos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total registrados", val: todos.length },
          { label: "Pendientes verificación", val: pendientes.length, alert: pendientes.length > 0 },
          { label: "Activos", val: activos.length },
          { label: "Destacados", val: todos.filter((p) => p.destacado).length },
        ].map((s) => (
          <div key={s.label} className={`border rounded-xl p-4 ${s.alert ? "border-amber-200 bg-amber-50" : "border-line bg-canvas"}`}>
            <div className={`mono text-[10px] uppercase tracking-widest mb-1 ${s.alert ? "text-amber-500" : "text-ink-soft"}`}>{s.label}</div>
            <div className={`text-3xl font-bold ${s.alert ? "text-amber-700" : ""}`}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* Cola de verificación */}
      {pendientes.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <h2 className="font-semibold">Pendientes de verificación</h2>
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">{pendientes.length}</span>
          </div>
          <div className="border border-amber-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-amber-200 bg-amber-50">
                  <th className="text-left px-5 py-3 text-xs text-amber-700 font-normal mono uppercase">Profe</th>
                  <th className="text-left px-4 py-3 text-xs text-amber-700 font-normal mono uppercase">Ciudad</th>
                  <th className="text-left px-4 py-3 text-xs text-amber-700 font-normal mono uppercase">Certs.</th>
                  <th className="text-left px-4 py-3 text-xs text-amber-700 font-normal mono uppercase">Registrado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {pendientes.map((p) => (
                  <tr key={p.id} className="border-b border-amber-100 last:border-0">
                    <td className="px-5 py-4">
                      <div className="font-medium">{p.nombre} {p.apellido}</div>
                      <div className="text-xs text-ink-muted">{p.email ?? "—"}</div>
                    </td>
                    <td className="px-4 py-4 text-ink-muted">{p.ciudad}{p.comuna ? `, ${p.comuna}` : ""}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(p.certificaciones ?? []).map((c) => <span key={c} className="border border-line px-2 py-0.5 rounded text-xs">{c}</span>)}
                        {(p.certificaciones ?? []).length === 0 && <span className="text-ink-muted text-xs">Ninguna</span>}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-ink-muted text-xs">
                      {p.createdAt?.toLocaleDateString("es-CL")}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <VerificarBtn profeId={p.id} />
                        <SuspenderBtn profeId={p.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Todos los profes */}
      <section>
        <h2 className="font-semibold mb-4">Todos los profes ({todos.length})</h2>
        <div className="border border-line rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line bg-canvas-warm">
                <th className="text-left px-5 py-3 text-xs text-ink-muted font-normal mono uppercase">Profe</th>
                <th className="text-left px-4 py-3 text-xs text-ink-muted font-normal mono uppercase">Ciudad</th>
                <th className="text-center px-4 py-3 text-xs text-ink-muted font-normal mono uppercase">Estado</th>
                <th className="text-center px-4 py-3 text-xs text-ink-muted font-normal mono uppercase">Verificado</th>
                <th className="text-center px-4 py-3 text-xs text-ink-muted font-normal mono uppercase">Rating</th>
                <th className="text-center px-4 py-3 text-xs text-ink-muted font-normal mono uppercase">Reviews</th>
                <th className="text-left px-4 py-3 text-xs text-ink-muted font-normal mono uppercase">Alta</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {todos.map((p) => (
                <tr key={p.id} className="border-b border-line last:border-0 hover:bg-canvas-warm transition-colors">
                  <td className="px-5 py-3">
                    <div className="font-medium">{p.nombre} {p.apellido}</div>
                    <div className="text-xs text-ink-muted">{p.slug}</div>
                  </td>
                  <td className="px-4 py-3 text-ink-muted">{p.ciudad}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`mono text-[9px] px-2 py-0.5 rounded ${estadoStyle[p.estado] ?? "bg-gray-100 text-gray-600"}`}>
                      {p.estado.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">{p.verificado ? "✓" : "—"}</td>
                  <td className="px-4 py-3 text-center">{p.ratingPromedio ? p.ratingPromedio.toFixed(1) : "—"}</td>
                  <td className="px-4 py-3 text-center">{p.reviewsCount ?? 0}</td>
                  <td className="px-4 py-3 text-xs text-ink-muted">{p.createdAt?.toLocaleDateString("es-CL")}</td>
                  <td className="px-4 py-3">
                    <Link href={`/profes/${p.slug}`} target="_blank" className="mono text-[10px] text-ink-muted hover:text-ink transition-colors">
                      Ver →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// Estos serían Server Actions en producción — placeholder UI por ahora
function VerificarBtn({ profeId }: { profeId: string }) {
  return (
    <button className="bg-green-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors">
      Verificar
    </button>
  );
}
function SuspenderBtn({ profeId }: { profeId: string }) {
  return (
    <button className="border border-red-200 text-red-600 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
      Rechazar
    </button>
  );
}
