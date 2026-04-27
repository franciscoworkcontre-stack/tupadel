export const dynamic = "force-dynamic";

import { db } from "@/db";
import { operadores, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";

function formatDate(d: Date | null) {
  if (!d) return "—";
  return new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "short", year: "numeric" }).format(new Date(d));
}

export default async function AdminOperadoresPage() {
  const data = await db
    .select({
      id: operadores.id, slug: operadores.slug, nombreEmpresa: operadores.nombreEmpresa,
      estado: operadores.estado, paisBase: operadores.paisBase, createdAt: operadores.createdAt,
      userEmail: users.email,
    })
    .from(operadores)
    .innerJoin(users, eq(operadores.userId, users.id))
    .orderBy(desc(operadores.createdAt));

  const estadoColor: Record<string, string> = {
    pendiente: "text-[#D97706] bg-[#FEF3C7]",
    verificado: "text-[#65A30D] bg-[#ECFCCB]",
    suspendido: "text-[#DC2626] bg-[#FFE4D1]",
  };

  return (
    <div className="max-w-[1000px]">
      <div className="mb-8">
        <h1 className="display text-3xl font-semibold">Operadores</h1>
        <p className="text-ink-muted text-sm mt-1">{data.length} operadores registrados</p>
      </div>

      <div className="border border-line rounded-xl overflow-hidden bg-canvas">
        <div className="grid grid-cols-5 px-5 py-2 bg-canvas-warm border-b border-line text-xs mono text-ink-soft uppercase tracking-wider">
          <div className="col-span-2">Empresa</div><div>País</div><div>Estado</div><div>Registro</div>
        </div>
        {data.map((op, i) => (
          <div key={op.id} className={`grid grid-cols-5 items-center px-5 py-3.5 ${i > 0 ? "border-t border-line" : ""}`}>
            <div className="col-span-2">
              <div className="font-semibold text-sm">{op.nombreEmpresa}</div>
              <div className="mono text-xs text-ink-soft">{op.userEmail}</div>
            </div>
            <div className="mono text-xs">{op.paisBase}</div>
            <div>
              <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${estadoColor[op.estado] ?? estadoColor.pendiente}`}>{op.estado}</span>
            </div>
            <div className="mono text-xs text-ink-soft">{formatDate(op.createdAt)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
