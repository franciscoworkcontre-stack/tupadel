export const dynamic = "force-dynamic";

import { db } from "@/db";
import { retiros, operadores } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";

export default async function AdminRetirosPage() {
  const data = await db
    .select({
      id: retiros.id, slug: retiros.slug, titulo: retiros.titulo,
      estado: retiros.estado, genero: retiros.genero, pais: retiros.pais,
      createdAt: retiros.createdAt, operadorNombre: operadores.nombreEmpresa,
    })
    .from(retiros)
    .innerJoin(operadores, eq(retiros.operadorId, operadores.id))
    .orderBy(desc(retiros.createdAt));

  const estadoColor: Record<string, string> = {
    borrador: "text-ink-soft bg-canvas-dim",
    en_revision: "text-[#D97706] bg-[#FEF3C7]",
    publicado: "text-[#65A30D] bg-[#ECFCCB]",
    pausado: "text-ink-muted bg-canvas-warm",
    archivado: "text-ink-soft bg-canvas-dim",
  };

  return (
    <div className="max-w-[1100px]">
      <div className="mb-8">
        <h1 className="display text-3xl font-semibold">Retiros</h1>
        <p className="text-ink-muted text-sm mt-1">{data.length} retiros totales</p>
      </div>

      <div className="border border-line rounded-xl overflow-hidden bg-canvas">
        <div className="grid grid-cols-6 px-5 py-2 bg-canvas-warm border-b border-line text-xs mono text-ink-soft uppercase tracking-wider">
          <div className="col-span-2">Retiro</div><div>Operador</div><div>País</div><div>Estado</div><div>Acciones</div>
        </div>
        {data.map((r, i) => (
          <div key={r.id} className={`grid grid-cols-6 items-center px-5 py-3.5 ${i > 0 ? "border-t border-line" : ""}`}>
            <div className="col-span-2">
              <div className="font-semibold text-sm truncate">{r.titulo}</div>
              <div className="mono text-xs text-ink-soft">{r.genero}</div>
            </div>
            <div className="text-sm text-ink-muted">{r.operadorNombre}</div>
            <div className="mono text-xs">{r.pais}</div>
            <div><span className={`text-xs px-1.5 py-0.5 rounded font-medium ${estadoColor[r.estado] ?? estadoColor.borrador}`}>{r.estado}</span></div>
            <div>
              <Link href={`/retiros/${r.slug}`} target="_blank" className="text-xs text-ink-muted hover:text-ink">Ver →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
