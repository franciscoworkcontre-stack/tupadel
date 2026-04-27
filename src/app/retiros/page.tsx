export const dynamic = "force-dynamic";

import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import { retiros, retiroEdiciones, operadores } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retiros y Camps de Pádel en Chile y LATAM | Pulso Pádel",
  description: "Encuentra y reserva retiros de pádel para todos los niveles. Chile, Argentina, Colombia y más. Mixtos, femeninos y masculinos.",
};

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

export default async function RetirosPage() {
  const retirosDb = await db
    .select({
      id: retiros.id,
      slug: retiros.slug,
      titulo: retiros.titulo,
      subtitulo: retiros.subtitulo,
      pais: retiros.pais,
      ciudad: retiros.ciudad,
      genero: retiros.genero,
      nivelMin: retiros.nivelMin,
      nivelMax: retiros.nivelMax,
      diasDuracion: retiros.diasDuracion,
      imagenPrincipal: retiros.imagenPrincipal,
      destacado: retiros.destacado,
    })
    .from(retiros)
    .where(eq(retiros.estado, "publicado"))
    .orderBy(sql`${retiros.destacado} desc, ${retiros.createdAt} desc`);

  const ediciones = await db
    .select({
      retiroId: retiroEdiciones.retiroId,
      minPrecio: sql<number>`min(${retiroEdiciones.precioClp})`,
      proxFecha: sql<Date>`min(${retiroEdiciones.fechaInicio})`,
    })
    .from(retiroEdiciones)
    .where(eq(retiroEdiciones.estado, "abierta"))
    .groupBy(retiroEdiciones.retiroId);

  const edicionMap = Object.fromEntries(ediciones.map(e => [e.retiroId, e]));

  const generoLabel: Record<string, { label: string; color: string }> = {
    mixto: { label: "Mixto", color: "bg-[#0891B2]/10 text-[#0891B2]" },
    mujeres: { label: "Femenino", color: "bg-[#7C3AED]/10 text-[#7C3AED]" },
    hombres: { label: "Masculino", color: "bg-[#EA580C]/10 text-[#EA580C]" },
  };

  const paisFlag: Record<string, string> = { CL: "🇨🇱", AR: "🇦🇷", CO: "🇨🇴", PE: "🇵🇪", UY: "🇺🇾", MX: "🇲🇽" };

  const destacados = retirosDb.filter(r => r.destacado);
  const resto = retirosDb.filter(r => !r.destacado);

  return (
    <>
      <Navbar activeSection="/retiros" />
      <main>
        {/* Hero */}
        <section className="px-6 md:px-8 py-12 md:py-16 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ {retirosDb.length} retiros disponibles</div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              Retiros & Camps<br className="hidden md:block" />
              <span className="italic font-normal"> de pádel</span>
            </h1>
            <p className="text-ink-muted text-xl mt-4 max-w-2xl leading-relaxed">
              Mejorá tu juego en destinos increíbles. Chile, Argentina, Colombia y más. Todos los niveles.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              {[
                { href: "/retiros/mujeres", label: "Solo mujeres", color: "bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20" },
                { href: "/retiros/hombres", label: "Solo hombres", color: "bg-[#EA580C]/10 text-[#EA580C] border-[#EA580C]/20" },
                { href: "/retiros/mixtos", label: "Mixtos", color: "bg-[#0891B2]/10 text-[#0891B2] border-[#0891B2]/20" },
                { href: "/retiros/buscar", label: "Buscar con filtros →", color: "bg-ink text-white border-ink" },
              ].map(c => (
                <Link key={c.href} href={c.href} className={`border px-5 py-2.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-80 ${c.color}`}>
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Destacados */}
        {destacados.length > 0 && (
          <section className="px-6 md:px-8 py-10 max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-6">→ Destacados</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {destacados.map(r => {
                const ed = edicionMap[r.id];
                const g = generoLabel[r.genero] ?? generoLabel.mixto;
                return (
                  <Link key={r.slug} href={`/retiros/${r.slug}`} className="border border-line rounded-xl overflow-hidden bg-canvas hover:border-ink-muted transition-colors group">
                    <div className="aspect-[16/9] bg-gradient-to-br from-canvas-warm to-canvas-dim flex items-center justify-center relative">
                      <div className="text-4xl">{paisFlag[r.pais] ?? "🌎"}</div>
                      <span className={`absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full font-medium ${g.color}`}>{g.label}</span>
                      {r.destacado && <span className="absolute top-3 right-3 mono text-[10px] bg-[#A8E63A] text-[#0D1B2A] px-2 py-0.5 rounded font-semibold">DESTACADO</span>}
                    </div>
                    <div className="p-5">
                      <div className="mono text-xs text-ink-soft uppercase mb-1">{r.ciudad}, {r.pais} · {r.diasDuracion} días</div>
                      <h3 className="display text-xl font-semibold leading-tight mb-1">{r.titulo}</h3>
                      <p className="text-ink-muted text-sm mb-4 line-clamp-2">{r.subtitulo}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          {ed ? (
                            <>
                              <div className="mono text-xs text-ink-soft">Desde</div>
                              <div className="mono text-lg font-semibold">{formatPrice(ed.minPrecio)}</div>
                            </>
                          ) : (
                            <div className="mono text-xs text-ink-soft">Sin fechas disponibles</div>
                          )}
                        </div>
                        <div className="mono text-xs text-ink-soft">Cat {r.nivelMax}–{r.nivelMin}</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Todos */}
        {resto.length > 0 && (
          <section className="px-6 md:px-8 pb-12 max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-6 border-t border-line pt-8">→ Todos los retiros</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resto.map(r => {
                const ed = edicionMap[r.id];
                const g = generoLabel[r.genero] ?? generoLabel.mixto;
                return (
                  <Link key={r.slug} href={`/retiros/${r.slug}`} className="border border-line rounded-xl p-5 bg-canvas hover:border-ink-muted transition-colors flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-canvas-warm flex items-center justify-center text-2xl flex-shrink-0">
                      {paisFlag[r.pais] ?? "🌎"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${g.color}`}>{g.label}</span>
                        <span className="mono text-[10px] text-ink-soft">{r.diasDuracion}d · Cat {r.nivelMax}–{r.nivelMin}</span>
                      </div>
                      <div className="display font-semibold text-sm leading-tight truncate">{r.titulo}</div>
                      <div className="mono text-xs text-ink-soft mt-0.5">{r.ciudad}</div>
                      {ed && <div className="mono text-xs font-semibold mt-1">{formatPrice(ed.minPrecio)}</div>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* CTA operadores */}
        <section className="border-t border-line px-6 md:px-8 py-12 bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-2">→ ¿Organizás retiros?</div>
              <h2 className="display text-2xl md:text-3xl font-semibold">Publicá tu retiro en nuestra plataforma</h2>
              <p className="text-ink-muted text-sm mt-2 max-w-lg">Sin comisiones en la fase beta. Acceso a miles de jugadores de Chile y LATAM que buscan su próxima experiencia.</p>
            </div>
            <Link href="/operador/onboarding" className="flex-shrink-0 bg-[#A8E63A] text-[#0D1B2A] px-7 py-3.5 rounded-lg font-semibold hover:bg-[#7DB81E] transition-colors">
              Comenzar gratis →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
