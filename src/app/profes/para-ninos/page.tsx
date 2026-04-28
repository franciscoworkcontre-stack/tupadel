import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profesores de Pádel para Niños — Clases Infantiles | Pulso Pádel",
  description: "Encontrá profesores especializados en pádel para niños y adolescentes. Metodología lúdica, grupos por edad y seguimiento de progresión.",
};

export default async function ProfesParaNinosPage() {
  let listado: Awaited<ReturnType<typeof db.query.profes.findMany>> = [];
  try {
    const todos = await db.query.profes.findMany({
      where: (p, { eq: eqF }) => eqF(p.estado, "activo"),
      orderBy: (p, { desc }) => [desc(p.destacado), desc(p.ratingPromedio)],
    });
    listado = todos.filter((p) => (p.especialidades ?? []).includes("ninos"));
  } catch {
    // table may not exist yet
  }

  return (
    <>
      <Navbar activeSection="/profes" />
      <main>
        <section className="px-6 md:px-8 py-12 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-5">
              <Link href="/profes" className="hover:text-ink transition-colors">← Profes</Link>
              <span className="mx-2">·</span>
              <span>Para niños</span>
            </div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              Pádel para niños
            </h1>
            <p className="text-ink-muted text-xl mt-4 max-w-2xl leading-relaxed">
              Profesores especializados en iniciación infantil. Metodología lúdica, progresión por edad y grupos que se divierten aprendiendo.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-8 py-12 border-b border-line bg-canvas max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-line rounded-xl p-6">
              <div className="text-3xl mb-3">🎮</div>
              <div className="display text-lg font-semibold mb-2">Método lúdico</div>
              <p className="text-sm text-ink-muted leading-relaxed">Los mejores profes de niños enseñan a través del juego. No copia de movimientos de adultos, sino actividades adaptadas a cada edad.</p>
            </div>
            <div className="border border-line rounded-xl p-6">
              <div className="text-3xl mb-3">📊</div>
              <div className="display text-lg font-semibold mb-2">Progresión medible</div>
              <p className="text-sm text-ink-muted leading-relaxed">Buscá profes que tengan un sistema de niveles para niños (mini-pádel, pádel adaptado, pádel estándar) y que comuniquen el avance a los padres.</p>
            </div>
            <div className="border border-line rounded-xl p-6">
              <div className="text-3xl mb-3">👥</div>
              <div className="display text-lg font-semibold mb-2">Grupos por edad</div>
              <p className="text-sm text-ink-muted leading-relaxed">6-9 años, 10-13 años y 14-17 años son grupos muy distintos en términos de capacidad física y atención. Un buen profe los separa.</p>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-8 py-12 max-w-[1400px] mx-auto">
          <div className="mb-6">
            <span className="font-semibold">{listado.length}</span>
            <span className="text-ink-muted text-sm"> profe{listado.length !== 1 ? "s" : ""} especializados en niños</span>
          </div>

          {listado.length === 0 ? (
            <div className="text-center py-20 text-ink-muted">
              <p className="mb-4">Todavía no hay profes de niños registrados.</p>
              <Link href="/profe/onboarding" className="underline hover:text-ink">¿Sos profe especializado en niños? Sumate →</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {listado.map((p) => {
                const precio = p.precioGrupo60min ?? p.precioIndividual60min;
                return (
                  <Link key={p.id} href={`/profes/${p.slug}`} className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors group flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#0D1B2A] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {p.nombre[0]}{p.apellido[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="display text-lg font-semibold">{p.nombre} {p.apellido}</span>
                        {p.verificado && <span className="mono text-[9px] bg-[#A8E63A]/10 text-[#65A30D] border border-[#A8E63A]/30 px-2 py-0.5 rounded">✓ Verificado</span>}
                      </div>
                      <div className="text-xs text-ink-muted">{p.ciudad}{p.comuna ? `, ${p.comuna}` : ""}</div>
                      <p className="text-sm text-ink-muted mt-2 line-clamp-2">{p.bioCorta}</p>
                      {precio && <div className="text-sm mt-2 text-ink-muted">Desde <span className="font-semibold text-ink">${precio.toLocaleString("es-CL")} {p.monedaBase ?? "CLP"}</span> / clase</div>}
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
