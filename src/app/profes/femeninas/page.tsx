import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import { profes } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profesoras de Pádel — Directorio Verificado | Pulso Pádel",
  description: "Directorio de profesoras de pádel verificadas en Chile, Argentina y Uruguay. Especialistas en juego femenino e iniciación adulta.",
};

export default async function ProfesFemininasPage() {
  const listado = await db.query.profes.findMany({
    where: (p, { eq: eqF, and: andF }) => andF(eqF(p.estado, "activo"), eqF(p.genero, "mujer")),
    orderBy: (p, { desc }) => [desc(p.destacado), desc(p.ratingPromedio)],
  });

  return (
    <>
      <Navbar activeSection="/profes" />
      <main>
        <section className="px-6 md:px-8 py-12 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-5">
              <Link href="/profes" className="hover:text-ink transition-colors">← Profes</Link>
              <span className="mx-2">·</span>
              <span>Profesoras</span>
            </div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              Profesoras de pádel
            </h1>
            <p className="text-ink-muted text-xl mt-4 max-w-2xl leading-relaxed">
              Directorio verificado de profesoras. Si preferís entrenar con una profe mujer, acá las encontrás. Sin filtros extra.
            </p>
            <div className="mt-6 p-4 border border-line rounded-xl bg-canvas max-w-lg">
              <p className="text-sm text-ink-muted leading-relaxed">
                <strong className="text-ink">Nota:</strong> La especialidad "juego femenino" no es exclusiva de profesoras. Un profe hombre puede tenerla. Si querés filtrar por especialidad,{" "}
                <Link href="/profes/buscar?especialidad=juego_femenino" className="underline hover:text-ink">mirá acá</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-8 py-12 max-w-[1400px] mx-auto">
          <div className="mb-6">
            <span className="font-semibold">{listado.length}</span>
            <span className="text-ink-muted text-sm"> profesora{listado.length !== 1 ? "s" : ""} registrada{listado.length !== 1 ? "s" : ""}</span>
          </div>

          {listado.length === 0 ? (
            <div className="text-center py-20 text-ink-muted">
              <p className="mb-4">Todavía no hay profesoras registradas.</p>
              <Link href="/profe/onboarding" className="underline hover:text-ink">¿Sos profe? Sumate gratis →</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {listado.map((p) => {
                const precio = p.precioIndividual60min;
                return (
                  <Link key={p.id} href={`/profes/${p.slug}`} className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors group flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#0D1B2A] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {p.nombre[0]}{p.apellido[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="display text-lg font-semibold">{p.nombre} {p.apellido}</span>
                        {p.verificado && <span className="mono text-[9px] bg-[#A8E63A]/10 text-[#65A30D] border border-[#A8E63A]/30 px-2 py-0.5 rounded">✓ Verificada</span>}
                      </div>
                      <div className="text-xs text-ink-muted">{p.ciudad}{p.comuna ? `, ${p.comuna}` : ""} · {p.anosExperiencia} años de exp.</div>
                      <p className="text-sm text-ink-muted mt-2 line-clamp-2">{p.bioCorta}</p>
                      <div className="flex items-center gap-3 mt-2">
                        {p.ratingPromedio && <span className="text-sm"><span className="text-yellow-500">★</span> {p.ratingPromedio.toFixed(1)} <span className="text-ink-muted">({p.reviewsCount})</span></span>}
                        {precio && <span className="text-sm text-ink-muted">Desde <span className="font-semibold text-ink">${precio.toLocaleString("es-CL")} {p.monedaBase ?? "CLP"}</span></span>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
