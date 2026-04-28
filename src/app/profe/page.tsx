import Link from "next/link";
import { db } from "@/db";
import { profes, profeConsultas, profeReservas } from "@/db/schema";
import { eq, and, count, gte } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard — Portal Profe | Pulso Pádel" };

export default async function ProfeDashboardPage() {
  // En MVP sin auth real, tomamos el primer profe activo como demo
  const profe = await db.query.profes.findFirst({
    where: eq(profes.estado, "activo"),
    orderBy: (p, { desc }) => [desc(p.publishedAt)],
  });

  if (!profe) {
    return (
      <div className="p-8 max-w-xl">
        <h1 className="display text-2xl font-semibold mb-4">Bienvenido al portal de profes</h1>
        <p className="text-ink-muted mb-6">Todavía no tenés un perfil activo. Completá el alta para aparecer en el directorio.</p>
        <Link href="/profe/onboarding" className="bg-[#A8E63A] text-[#0D1B2A] px-6 py-3 rounded-lg font-semibold hover:bg-[#7DB81E] transition-colors">
          Crear mi perfil →
        </Link>
      </div>
    );
  }

  const consultasPendientes = await db
    .select({ count: count() })
    .from(profeConsultas)
    .where(and(eq(profeConsultas.profeId, profe.id), eq(profeConsultas.respondida, false)));

  const reservasProximas = await db.query.profeReservas.findMany({
    where: and(
      eq(profeReservas.profeId, profe.id),
      gte(profeReservas.fechaClase, new Date()),
    ),
    orderBy: (r, { asc }) => [asc(r.fechaClase)],
    limit: 5,
  });

  const ultimas10Consultas = await db.query.profeConsultas.findMany({
    where: eq(profeConsultas.profeId, profe.id),
    orderBy: (c, { desc }) => [desc(c.createdAt)],
    limit: 10,
  });

  const pendientes = consultasPendientes[0]?.count ?? 0;
  const perfilPct = calcularPerfilPct(profe);

  return (
    <div className="p-6 md:p-8 max-w-[1200px]">
      <div className="mb-8">
        <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">Dashboard</div>
        <h1 className="display text-3xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
          Hola, {profe.nombre}
        </h1>
        <p className="text-ink-muted mt-1 text-sm">
          {profe.estado === "activo" ? "Tu perfil está activo y visible en el directorio." : `Estado: ${profe.estado}`}
        </p>
      </div>

      {/* Alerta perfil incompleto */}
      {perfilPct < 80 && (
        <div className="border border-amber-200 bg-amber-50 rounded-xl p-4 mb-6 flex items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-amber-800 text-sm">Tu perfil está al {perfilPct}%</div>
            <p className="text-amber-700 text-xs mt-0.5">Los perfiles completos reciben 3x más consultas. Agregá bio, metodología y precios.</p>
          </div>
          <Link href="/profe/perfil" className="bg-amber-600 text-white text-xs font-semibold px-4 py-2 rounded-lg whitespace-nowrap hover:bg-amber-700 transition-colors">
            Completar →
          </Link>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KPICard label="Consultas pendientes" value={String(pendientes)} alert={pendientes > 0} />
        <KPICard label="Próximas clases" value={String(reservasProximas.length)} />
        <KPICard label="Rating" value={profe.ratingPromedio ? profe.ratingPromedio.toFixed(1) : "—"} sub={profe.reviewsCount ? `${profe.reviewsCount} reviews` : "Sin reviews aún"} />
        <KPICard label="Clases dadas" value={String(profe.clasesDadasCount ?? 0)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consultas recientes */}
        <section className="border border-line rounded-xl">
          <div className="flex items-center justify-between px-5 py-4 border-b border-line">
            <div className="font-semibold">Consultas recientes</div>
            {pendientes > 0 && (
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">{pendientes} sin responder</span>
            )}
          </div>
          {ultimas10Consultas.length === 0 ? (
            <div className="px-5 py-8 text-center text-ink-muted text-sm">Todavía no recibiste consultas.</div>
          ) : (
            <div className="divide-y divide-line">
              {ultimas10Consultas.map((c) => (
                <Link key={c.id} href={`/profe/reservas?consulta=${c.id}`} className="flex items-start gap-3 px-5 py-4 hover:bg-canvas-warm transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!c.respondida ? "bg-red-500" : "bg-green-400"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{c.nombre}</div>
                    <div className="text-xs text-ink-muted truncate">{c.mensaje}</div>
                    <div className="mono text-[10px] text-ink-soft mt-1">{c.createdAt?.toLocaleDateString("es-CL")}</div>
                  </div>
                  {!c.respondida && <span className="mono text-[9px] text-red-600 bg-red-50 px-2 py-0.5 rounded flex-shrink-0">Pendiente</span>}
                </Link>
              ))}
            </div>
          )}
          <div className="px-5 py-3 border-t border-line">
            <Link href="/profe/reservas" className="text-xs text-ink-muted hover:text-ink">Ver todas las consultas →</Link>
          </div>
        </section>

        {/* Próximas clases */}
        <section className="border border-line rounded-xl">
          <div className="px-5 py-4 border-b border-line">
            <div className="font-semibold">Próximas clases</div>
          </div>
          {reservasProximas.length === 0 ? (
            <div className="px-5 py-8 text-center text-ink-muted text-sm">No hay clases agendadas próximamente.</div>
          ) : (
            <div className="divide-y divide-line">
              {reservasProximas.map((r) => (
                <div key={r.id} className="flex items-start gap-3 px-5 py-4">
                  <div className="bg-[#0D1B2A] text-white rounded-lg text-center px-3 py-2 flex-shrink-0">
                    <div className="mono text-[10px]">{r.fechaClase.toLocaleDateString("es-CL", { month: "short" }).toUpperCase()}</div>
                    <div className="font-bold text-lg leading-none">{r.fechaClase.getDate()}</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">{r.modalidad?.replace(/_/g, " ") ?? "Clase"}</div>
                    <div className="text-xs text-ink-muted">{r.fechaClase.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })} · {r.duracionMin} min</div>
                    {r.lugar && <div className="text-xs text-ink-muted">{r.lugar}</div>}
                    <span className={`mono text-[9px] px-2 py-0.5 rounded mt-1 inline-block ${r.estado === "confirmada" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>
                      {r.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="px-5 py-3 border-t border-line">
            <Link href="/profe/disponibilidad" className="text-xs text-ink-muted hover:text-ink">Gestionar disponibilidad →</Link>
          </div>
        </section>
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Link href="/profe/perfil" className="border border-line rounded-xl p-5 hover:border-ink-muted transition-colors">
          <div className="mono text-[10px] text-ink-soft uppercase mb-2">Perfil público</div>
          <div className="font-semibold text-sm">Editar mi ficha</div>
          <div className="w-full bg-line rounded-full h-1.5 mt-3">
            <div className="bg-[#A8E63A] h-1.5 rounded-full" style={{ width: `${perfilPct}%` }} />
          </div>
          <div className="text-xs text-ink-muted mt-1">{perfilPct}% completo</div>
        </Link>
        <Link href="/profe/alumnos" className="border border-line rounded-xl p-5 hover:border-ink-muted transition-colors">
          <div className="mono text-[10px] text-ink-soft uppercase mb-2">CRM</div>
          <div className="font-semibold text-sm">Mis alumnos</div>
          <div className="text-xs text-ink-muted mt-2">{profe.alumnosRecurrentesCount ?? 0} alumnos recurrentes</div>
        </Link>
        <Link href="/profe/destacar" className="border border-[#A8E63A] rounded-xl p-5 hover:bg-canvas-warm transition-colors">
          <div className="mono text-[10px] text-[#65A30D] uppercase mb-2">Monetización</div>
          <div className="font-semibold text-sm">Destacar mi perfil</div>
          <div className="text-xs text-ink-muted mt-2">Desde $25.000 CLP/mes. 3x más visibilidad.</div>
        </Link>
      </div>
    </div>
  );
}

function KPICard({ label, value, sub, alert }: { label: string; value: string; sub?: string; alert?: boolean }) {
  return (
    <div className={`border rounded-xl p-5 ${alert ? "border-red-200 bg-red-50" : "border-line bg-canvas"}`}>
      <div className={`mono text-[10px] uppercase tracking-widest mb-2 ${alert ? "text-red-400" : "text-ink-soft"}`}>{label}</div>
      <div className={`text-3xl font-bold ${alert ? "text-red-700" : ""}`}>{value}</div>
      {sub && <div className="text-xs text-ink-muted mt-1">{sub}</div>}
    </div>
  );
}

function calcularPerfilPct(profe: typeof profes.$inferSelect): number {
  const campos = [
    profe.fotoPrincipal,
    profe.bioCorta,
    profe.bioMd,
    profe.sobreMiMd,
    profe.metodologiaMd,
    profe.precioIndividual60min,
    profe.whatsapp || profe.email,
    (profe.especialidades ?? []).length > 0,
    (profe.categoriasQueEnsena ?? []).length > 0,
    (profe.certificaciones ?? []).length > 0,
  ];
  const completos = campos.filter(Boolean).length;
  return Math.round((completos / campos.length) * 100);
}
