export const dynamic = "force-dynamic";
import Link from "next/link";
import { db } from "@/db";
import { profes, profeAlumnoRelacion, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mis Alumnos — Portal Profe | Pulso Pádel" };

const catColors: Record<number, string> = {
  1: "#DC2626", 2: "#EA580C", 3: "#D97706", 4: "#65A30D", 5: "#0891B2", 6: "#7C3AED",
};

export default async function ProfeAlumnosPage() {
  const profe = await db.query.profes.findFirst({ where: eq(profes.estado, "activo") });
  if (!profe) {
    return (
      <div className="p-8">
        <p className="text-ink-muted">No encontramos tu perfil.</p>
        <Link href="/profe/onboarding" className="mt-4 inline-block underline">Crear mi perfil →</Link>
      </div>
    );
  }

  const relaciones = await db.query.profeAlumnoRelacion.findMany({
    where: eq(profeAlumnoRelacion.profeId, profe.id),
    orderBy: (r, { desc }) => [desc(r.ultimaClaseFecha)],
    with: { user: true },
  });

  return (
    <div className="p-6 md:p-8 max-w-[1000px]">
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">CRM</div>
          <h1 className="display text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Mis alumnos</h1>
        </div>
        <div className="text-sm text-ink-muted">
          <span className="font-semibold text-ink">{relaciones.filter((r) => r.activo).length}</span> activos ·{" "}
          <span className="font-semibold text-ink">{relaciones.length}</span> total
        </div>
      </div>

      {relaciones.length === 0 ? (
        <div className="border border-line rounded-xl p-12 text-center">
          <div className="text-4xl mb-4">👥</div>
          <div className="font-semibold mb-2">Todavía no tenés alumnos registrados</div>
          <p className="text-ink-muted text-sm max-w-sm mx-auto">
            Cuando un alumno tome clases con vos y las registremos, aparecerá acá con su historial y progresión.
          </p>
        </div>
      ) : (
        <div className="border border-line rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-line bg-canvas-warm">
                <th className="text-left px-5 py-3 text-xs text-ink-muted font-normal mono uppercase">Alumno</th>
                <th className="text-center px-4 py-3 text-xs text-ink-muted font-normal mono uppercase">Cat. inicial</th>
                <th className="text-center px-4 py-3 text-xs text-ink-muted font-normal mono uppercase">Cat. actual</th>
                <th className="text-center px-4 py-3 text-xs text-ink-muted font-normal mono uppercase">Clases</th>
                <th className="text-left px-4 py-3 text-xs text-ink-muted font-normal mono uppercase">Última clase</th>
                <th className="text-left px-4 py-3 text-xs text-ink-muted font-normal mono uppercase hidden md:table-cell">Objetivo</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {relaciones.map((r) => {
                const progreso = r.categoriaInicial !== null && r.categoriaActual !== null && r.categoriaInicial !== r.categoriaActual;
                const mejoro = (r.categoriaInicial ?? 99) > (r.categoriaActual ?? 99);
                return (
                  <tr key={r.id} className="border-b border-line last:border-0 hover:bg-canvas-warm transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0D1B2A] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {(r.user?.nombre ?? "?")[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{r.user?.nombre ?? "Alumno sin nombre"}</div>
                          <div className="text-xs text-ink-muted">{r.user?.ciudad ?? ""}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {r.categoriaInicial ? (
                        <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold mx-auto" style={{ backgroundColor: catColors[r.categoriaInicial] ?? "#888" }}>
                          {r.categoriaInicial}
                        </span>
                      ) : <span className="text-ink-muted text-sm">—</span>}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {r.categoriaActual ? (
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: catColors[r.categoriaActual] ?? "#888" }}>
                            {r.categoriaActual}
                          </span>
                          {progreso && <span className={`text-[9px] ${mejoro ? "text-green-600" : "text-red-500"}`}>{mejoro ? "▲" : "▼"}</span>}
                        </div>
                      ) : <span className="text-ink-muted text-sm">—</span>}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="font-semibold">{r.totalClases ?? 0}</span>
                    </td>
                    <td className="px-4 py-4 text-sm text-ink-muted">
                      {r.ultimaClaseFecha ? r.ultimaClaseFecha.toLocaleDateString("es-CL", { day: "2-digit", month: "short" }) : "—"}
                    </td>
                    <td className="px-4 py-4 text-sm text-ink-muted max-w-[200px] hidden md:table-cell">
                      <div className="line-clamp-1">{r.objetivoActualMd ?? "—"}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`mono text-[9px] px-2 py-0.5 rounded ${r.activo ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {r.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
