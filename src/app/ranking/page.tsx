import { db } from "@/db";
import { users } from "@/db/schema";
import { desc, gt } from "drizzle-orm";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ranking de Jugadores | tupadel",
  description: "Ranking de jugadores de pádel por puntos y categoría. Compará tu nivel con el resto de la comunidad.",
};

export const dynamic = "force-dynamic";

const CAT_COLORS: Record<number, string> = {
  1: "#DC2626", 2: "#EA580C", 3: "#D97706", 4: "#65A30D", 5: "#0891B2", 6: "#7C3AED",
};
const CAT_NOMBRES: Record<number, string> = {
  1: "Competitivo", 2: "Avanzado", 3: "Intermedio alto", 4: "Intermedio", 5: "Intermedio bajo", 6: "Iniciación",
};

export default async function RankingPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const { cat } = await searchParams;
  const catFiltro = cat ? Number(cat) : null;

  const jugadores = await db
    .select({
      id: users.id,
      nombre: users.nombre,
      email: users.email,
      categoriaEstimada: users.categoriaEstimada,
      puntosRanking: users.puntosRanking,
      partidosJugados: users.partidosJugados,
      partidosGanados: users.partidosGanados,
      rachaActual: users.rachaActual,
    })
    .from(users)
    .where(gt(users.puntosRanking, 0))
    .orderBy(desc(users.puntosRanking));

  const filtered = catFiltro
    ? jugadores.filter((j) => j.categoriaEstimada === catFiltro)
    : jugadores;

  return (
    <>
      <Navbar activeSection="/ranking" />
      <main>
        {/* Hero */}
        <section className="px-6 md:px-8 py-14 border-b border-line bg-[#0D1B2A] text-white">
          <div className="max-w-[900px] mx-auto">
            <div className="mono text-xs text-[#A8E63A] uppercase tracking-widest mb-4">Ranking</div>
            <h1 className="display text-5xl md:text-6xl font-semibold mb-3" style={{ letterSpacing: "-0.03em" }}>
              Ranking<br />de jugadores
            </h1>
            <p className="text-white/60 text-lg max-w-xl">
              Registrá tus partidos, sumá puntos y subí de categoría. Cada victoria cuenta.
            </p>
          </div>
        </section>

        <section className="max-w-[900px] mx-auto px-6 md:px-8 py-10">
          {/* Filtros por cat */}
          <div className="flex gap-2 flex-wrap mb-8">
            <Link
              href="/ranking"
              className={`mono text-xs px-4 py-2 rounded-full border transition-colors ${!catFiltro ? "bg-[#0D1B2A] text-white border-[#0D1B2A]" : "border-line text-ink-muted hover:border-ink-muted"}`}
            >
              Todas
            </Link>
            {[1, 2, 3, 4, 5, 6].map((c) => (
              <Link
                key={c}
                href={`/ranking?cat=${c}`}
                className={`mono text-xs px-4 py-2 rounded-full border transition-colors ${catFiltro === c ? "text-white border-transparent" : "border-line text-ink-muted hover:border-ink-muted"}`}
                style={catFiltro === c ? { backgroundColor: CAT_COLORS[c] } : {}}
              >
                Cat {c}
              </Link>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-ink-muted">
              <p className="text-lg mb-2">Nadie en esta categoría todavía.</p>
              <Link href="/partidos/nuevo" className="mono text-xs text-[#0D1B2A] underline">Registrá el primer partido →</Link>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((jugador, i) => {
                const cat = jugador.categoriaEstimada ?? 6;
                const winRate = jugador.partidosJugados > 0
                  ? Math.round((jugador.partidosGanados / jugador.partidosJugados) * 100)
                  : 0;
                return (
                  <Link
                    key={jugador.id}
                    href={`/jugadores/${jugador.id}`}
                    className="flex items-center gap-4 border border-line rounded-xl px-5 py-4 bg-canvas hover:border-ink-muted transition-colors group"
                  >
                    <div className="w-8 text-right">
                      <span className={`mono text-sm font-bold ${i === 0 ? "text-[#D97706]" : i === 1 ? "text-[#6B7280]" : i === 2 ? "text-[#92400E]" : "text-ink-muted"}`}>
                        #{i + 1}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: CAT_COLORS[cat] }}>
                      {cat}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{jugador.nombre ?? jugador.email}</div>
                      <div className="text-xs text-ink-muted">{CAT_NOMBRES[cat]}</div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="font-bold text-lg">{jugador.puntosRanking.toLocaleString("es-CL")}</div>
                      <div className="mono text-xs text-ink-soft">pts</div>
                    </div>
                    <div className="text-right hidden md:block w-24">
                      <div className="text-sm font-medium">{winRate}%</div>
                      <div className="mono text-xs text-ink-soft">{jugador.partidosJugados}J</div>
                    </div>
                    {jugador.rachaActual >= 3 && (
                      <div className="mono text-xs text-[#A8E63A] bg-[#A8E63A]/10 border border-[#A8E63A]/30 px-2 py-0.5 rounded-full">
                        🔥 {jugador.rachaActual}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/partidos/nuevo"
              className="inline-flex items-center gap-2 bg-[#0D1B2A] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1a2f47] transition-colors"
            >
              Registrar partido →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
