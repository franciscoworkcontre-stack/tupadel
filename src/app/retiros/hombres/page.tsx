export const dynamic = "force-dynamic";

import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import { retiros, retiroEdiciones } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retiros de Pádel Masculinos | Pulso Pádel",
  description: "Retiros de pádel exclusivos para hombres. Chile, Argentina y más. Entrenamiento intensivo y comunidad.",
};

function formatPrice(n: number) { return "$" + n.toLocaleString("es-CL"); }

export default async function RetirosHombresPage() {
  const data = await db.select({
    id: retiros.id, slug: retiros.slug, titulo: retiros.titulo, subtitulo: retiros.subtitulo,
    pais: retiros.pais, ciudad: retiros.ciudad, nivelMin: retiros.nivelMin, nivelMax: retiros.nivelMax,
    diasDuracion: retiros.diasDuracion,
  }).from(retiros).where(and(eq(retiros.estado, "publicado"), eq(retiros.genero, "hombres")));

  const ediciones = await db.select({
    retiroId: retiroEdiciones.retiroId,
    minPrecio: sql<number>`min(${retiroEdiciones.precioClp})`,
  }).from(retiroEdiciones).where(eq(retiroEdiciones.estado, "abierta")).groupBy(retiroEdiciones.retiroId);
  const edMap = Object.fromEntries(ediciones.map(e => [e.retiroId, e.minPrecio]));

  const paisFlag: Record<string, string> = { CL: "🇨🇱", AR: "🇦🇷", CO: "🇨🇴" };

  return (
    <>
      <Navbar activeSection="/retiros" />
      <main>
        <section className="px-6 md:px-8 py-12 border-b border-line" style={{ background: "linear-gradient(135deg, #fff7f0 0%, #fff3ed 100%)" }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-[#EA580C] uppercase tracking-widest mb-4">← <Link href="/retiros" className="hover:underline">Retiros</Link> · Solo hombres</div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              Retiros <span className="italic font-normal text-[#EA580C]">masculinos</span>
            </h1>
            <p className="text-ink-muted text-xl mt-4 max-w-2xl leading-relaxed">
              Entrenamiento intensivo, destinos únicos y la comunidad de jugadores que estabas buscando.
            </p>
          </div>
        </section>
        <section className="px-6 md:px-8 py-10 max-w-[1400px] mx-auto">
          {data.length === 0 ? (
            <div className="text-center py-20 text-ink-muted">
              <div className="text-4xl mb-4">🔜</div>
              <p className="text-lg font-semibold">Próximamente</p>
              <p className="text-sm mt-2"><Link href="/retiros" className="text-[#EA580C] hover:underline">Ver todos los retiros →</Link></p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.map(r => (
                <Link key={r.slug} href={`/retiros/${r.slug}`} className="border border-line rounded-xl overflow-hidden bg-canvas hover:border-[#EA580C]/50 transition-colors">
                  <div className="aspect-[16/9] bg-gradient-to-br from-[#fff7f0] to-[#fff3ed] flex items-center justify-center text-4xl">
                    {paisFlag[r.pais] ?? "🌎"}
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
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
