export const dynamic = "force-dynamic";

import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import { retiros, retiroEdiciones } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retiros de Pádel Mixtos | Pulso Pádel",
  description: "Retiros de pádel mixtos para hombres y mujeres. Los mejores destinos de Chile y LATAM.",
};

function formatPrice(n: number) { return "$" + n.toLocaleString("es-CL"); }

export default async function RetirosmixtosPage() {
  const data = await db.select({
    id: retiros.id, slug: retiros.slug, titulo: retiros.titulo, subtitulo: retiros.subtitulo,
    pais: retiros.pais, ciudad: retiros.ciudad, nivelMin: retiros.nivelMin, nivelMax: retiros.nivelMax,
    diasDuracion: retiros.diasDuracion, destacado: retiros.destacado,
  }).from(retiros).where(and(eq(retiros.estado, "publicado"), eq(retiros.genero, "mixto")));

  const ediciones = await db.select({
    retiroId: retiroEdiciones.retiroId,
    minPrecio: sql<number>`min(${retiroEdiciones.precioClp})`,
  }).from(retiroEdiciones).where(eq(retiroEdiciones.estado, "abierta")).groupBy(retiroEdiciones.retiroId);
  const edMap = Object.fromEntries(ediciones.map(e => [e.retiroId, e.minPrecio]));

  const paisFlag: Record<string, string> = { CL: "🇨🇱", AR: "🇦🇷", CO: "🇨🇴", PE: "🇵🇪" };

  return (
    <>
      <Navbar activeSection="/retiros" />
      <main>
        <section className="px-6 md:px-8 py-12 border-b border-line" style={{ background: "linear-gradient(135deg, #f0fbff 0%, #ecfeff 100%)" }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-[#0891B2] uppercase tracking-widest mb-4">← <Link href="/retiros" className="hover:underline">Retiros</Link> · Mixtos</div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              Retiros <span className="italic font-normal text-[#0891B2]">mixtos</span>
            </h1>
            <p className="text-ink-muted text-xl mt-4 max-w-2xl leading-relaxed">
              Para hombres y mujeres. La mejor forma de conocer jugadores de tu nivel en destinos increíbles.
            </p>
          </div>
        </section>
        <section className="px-6 md:px-8 py-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.map(r => (
              <Link key={r.slug} href={`/retiros/${r.slug}`} className="border border-line rounded-xl overflow-hidden bg-canvas hover:border-[#0891B2]/50 transition-colors">
                <div className="aspect-[16/9] bg-gradient-to-br from-[#f0fbff] to-[#ecfeff] flex items-center justify-center relative text-4xl">
                  {paisFlag[r.pais] ?? "🌎"}
                  {r.destacado && <span className="absolute top-3 right-3 mono text-[10px] bg-[#A8E63A] text-[#0D1B2A] px-2 py-0.5 rounded font-semibold">DESTACADO</span>}
                </div>
                <div className="p-5">
                  <div className="mono text-xs text-ink-soft mb-1">{r.ciudad}, {r.pais} · {r.diasDuracion} días · Cat {r.nivelMax}–{r.nivelMin}</div>
                  <h3 className="display text-lg font-semibold mb-1">{r.titulo}</h3>
                  {r.subtitulo && <p className="text-sm text-ink-muted line-clamp-2">{r.subtitulo}</p>}
                  {edMap[r.id] && <div className="mono text-base font-semibold mt-3">{formatPrice(edMap[r.id])}<span className="text-xs text-ink-soft font-normal"> / persona</span></div>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
