export const dynamic = "force-dynamic";
import Link from "next/link";
import { db } from "@/db";
import { profes } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Editar Mi Perfil — Portal Profe | Pulso Pádel" };

export default async function ProfePerfilPage() {
  const profe = await db.query.profes.findFirst({ where: eq(profes.estado, "activo") });

  if (!profe) {
    return (
      <div className="p-8">
        <p className="text-ink-muted">No encontramos tu perfil activo.</p>
        <Link href="/profe/onboarding" className="mt-4 inline-block underline hover:text-ink">Crear mi perfil →</Link>
      </div>
    );
  }

  const perfilUrl = `/profes/${profe.slug}`;

  return (
    <div className="p-6 md:p-8 max-w-[800px]">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">Mi perfil público</div>
          <h1 className="display text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
            {profe.nombre} {profe.apellido}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className={`mono text-[10px] px-2 py-0.5 rounded ${profe.estado === "activo" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
              {profe.estado}
            </span>
            {profe.verificado && <span className="mono text-[10px] bg-[#A8E63A]/10 text-[#65A30D] px-2 py-0.5 rounded">✓ Verificado</span>}
          </div>
        </div>
        <Link href={perfilUrl} target="_blank" className="text-sm border border-line px-4 py-2 rounded-lg hover:border-ink-muted transition-colors whitespace-nowrap">
          Ver perfil público →
        </Link>
      </div>

      {/* Secciones de edición */}
      <div className="space-y-6">
        <SeccionEdicion titulo="Identidad y ubicación" href="/profe/perfil/editar?seccion=basico">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-ink-muted">
            <InfoRow label="Ciudad" value={`${profe.ciudad}${profe.comuna ? `, ${profe.comuna}` : ""}`} />
            <InfoRow label="País" value={profe.pais} />
            <InfoRow label="Experiencia" value={`${profe.anosExperiencia} años`} />
            <InfoRow label="Idiomas" value={(profe.idiomas ?? []).join(", ")} />
            <InfoRow label="Radio" value={`${profe.radioDesplazamientoKm} km`} />
            <InfoRow label="Online" value={profe.atiendeOnline ? "Sí" : "No"} />
          </div>
        </SeccionEdicion>

        <SeccionEdicion titulo="Bio y metodología" href="/profe/perfil/editar?seccion=bio">
          <div className="space-y-3 text-sm">
            <div>
              <span className="mono text-[10px] text-ink-soft uppercase">Bio corta</span>
              <p className="text-ink-muted mt-1 leading-relaxed">{profe.bioCorta ?? "—"}</p>
            </div>
            <div>
              <span className="mono text-[10px] text-ink-soft uppercase">Metodología</span>
              <p className="text-ink-muted mt-1 leading-relaxed line-clamp-3">{profe.metodologiaMd ?? "—"}</p>
            </div>
          </div>
        </SeccionEdicion>

        <SeccionEdicion titulo="Especialidades y modalidades" href="/profe/perfil/editar?seccion=competencia">
          <div className="space-y-2 text-sm text-ink-muted">
            <InfoRow label="Cats. que enseña" value={(profe.categoriasQueEnsena ?? []).sort().map((c) => `Cat ${c}`).join(", ")} />
            <InfoRow label="Especialidades" value={(profe.especialidades ?? []).map((e) => e.replace(/_/g, " ")).join(", ") || "—"} />
            <InfoRow label="Modalidades" value={(profe.modalidades ?? []).map((m) => m.replace(/_/g, " ")).join(", ") || "—"} />
          </div>
        </SeccionEdicion>

        <SeccionEdicion titulo="Precios" href="/profe/perfil/editar?seccion=precios">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-ink-muted">
            <InfoRow label="Individual 60 min" value={profe.precioIndividual60min ? `$${profe.precioIndividual60min.toLocaleString("es-CL")} ${profe.monedaBase}` : "—"} />
            <InfoRow label="Pareja 60 min" value={profe.precioPareja60min ? `$${profe.precioPareja60min.toLocaleString("es-CL")} ${profe.monedaBase}` : "—"} />
            <InfoRow label="Grupo 60 min" value={profe.precioGrupo60min ? `$${profe.precioGrupo60min.toLocaleString("es-CL")} ${profe.monedaBase}` : "—"} />
            <InfoRow label="Paquetes" value={profe.permitePaquetes ? `Sí (${profe.descuentoPaquete10Pct}% dto.)` : "No"} />
          </div>
        </SeccionEdicion>

        <SeccionEdicion titulo="Contacto" href="/profe/perfil/editar?seccion=contacto">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-ink-muted">
            <InfoRow label="WhatsApp" value={profe.whatsapp ?? "—"} />
            <InfoRow label="Instagram" value={profe.instagram ? `@${profe.instagram}` : "—"} />
            <InfoRow label="Email" value={profe.email ?? "—"} />
          </div>
        </SeccionEdicion>

        <SeccionEdicion titulo="Certificaciones" href="/profe/perfil/editar?seccion=credenciales">
          <div className="flex flex-wrap gap-2">
            {(profe.certificaciones ?? []).length === 0 ? (
              <span className="text-ink-muted text-sm">Sin certificaciones cargadas.</span>
            ) : (
              (profe.certificaciones ?? []).map((c) => (
                <span key={c} className="border border-line px-3 py-1 rounded text-sm">
                  {c} {profe.certificacionVerificada && <span className="text-[#65A30D] text-xs">✓</span>}
                </span>
              ))
            )}
          </div>
        </SeccionEdicion>
      </div>

      {/* CTA destacar */}
      {!profe.destacado && (
        <div className="mt-8 border border-[#A8E63A] rounded-xl p-5 flex items-center justify-between gap-4 bg-canvas-warm flex-wrap">
          <div>
            <div className="font-semibold">¿Querés más visibilidad?</div>
            <p className="text-sm text-ink-muted mt-0.5">Los perfiles destacados aparecen primero en búsquedas y en el hub de profes.</p>
          </div>
          <Link href="/profe/destacar" className="bg-[#A8E63A] text-[#0D1B2A] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#7DB81E] transition-colors whitespace-nowrap">
            Destacar mi perfil →
          </Link>
        </div>
      )}
    </div>
  );
}

function SeccionEdicion({ titulo, href, children }: { titulo: string; href: string; children: React.ReactNode }) {
  return (
    <div className="border border-line rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold text-sm">{titulo}</div>
        <Link href={href} className="mono text-[10px] text-ink-muted hover:text-ink transition-colors">Editar →</Link>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="mono text-[10px] text-ink-soft uppercase">{label}:</span>
      <span className="ml-2">{value}</span>
    </div>
  );
}
