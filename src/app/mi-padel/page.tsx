import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";

export default function MiPadelPage() {
  // TODO: verificar sesión con Supabase SSR
  // const supabase = createServerComponentClient({ cookies });
  // const { data: { session } } = await supabase.auth.getSession();
  // if (!session) redirect("/auth/login");

  return (
    <>
      <Navbar />
      <main className="max-w-[1400px] mx-auto px-6 md:px-8 py-10">
        {/* Bienvenida */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="md:col-span-8">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">→ Domingo, 26 de abril</div>
            <h1 className="display text-4xl md:text-5xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
              Buenas, <span className="italic font-normal">Francisco</span>.
            </h1>
            <p className="text-lg text-ink-muted mt-3">Esta semana toca trabajar la víbora. Dos alertas activas bajaron de precio.</p>
          </div>
          <div className="md:col-span-4">
            <div className="border-2 border-[#65A30D] rounded-2xl p-5" style={{ background: "rgba(101,163,13,0.06)" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="mono text-xs uppercase tracking-wider font-semibold">→ Tu nivel</div>
                <span className="w-2.5 h-2.5 rounded-full bg-[#65A30D]" />
              </div>
              <div className="display text-3xl font-semibold">Categoría 4</div>
              <div className="text-xs text-ink-muted mt-1">Intermedio · diagnosticado hace 6 semanas</div>
              <div className="mt-4">
                <div className="flex items-center justify-between mono text-[11px] mb-1.5">
                  <span className="text-ink-soft uppercase">Progreso a Cat 3</span>
                  <span className="font-semibold">32%</span>
                </div>
                <div className="h-2 bg-canvas-dim rounded-full overflow-hidden">
                  <div className="h-full bg-[#65A30D] rounded-full" style={{ width: "32%" }} />
                </div>
              </div>
              <Link href="/categorias/4" className="block mt-4 text-[#65A30D] font-semibold text-sm">Ver mi ruta completa →</Link>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Drill semanal */}
          <div className="md:col-span-8 bg-canvas-warm border border-line rounded-2xl p-7">
            <div className="flex items-center justify-between mb-3">
              <div className="mono text-xs uppercase tracking-wider text-ink-soft font-semibold">→ Drill de la semana</div>
              <span className="mono text-xs text-[#00B85C] font-semibold">↗ 1 de 3 sesiones</span>
            </div>
            <h3 className="display text-2xl md:text-3xl font-semibold mb-3 leading-tight">Bandeja cruzada → globo táctico</h3>
            <p className="text-ink-muted mb-5">Trabajás los dos golpes prioridad 1 de Cat 4 en una secuencia táctica realista.</p>
            <div className="flex items-center gap-4">
              <button className="bg-[#00B85C] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#008F47] transition-colors">Marcar sesión completada</button>
              <Link href="/drills/bandeja-cruzada-globo-tactico" className="text-sm font-semibold text-[#00B85C]">Ver detalle →</Link>
            </div>
          </div>

          {/* Alertas */}
          <div className="md:col-span-4 bg-canvas border border-line rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="mono text-xs uppercase tracking-wider text-ink-soft font-semibold">→ Alertas de precio</div>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FFE4D1] text-[#E8590C]">2 NUEVAS</span>
            </div>
            <div className="space-y-3">
              {[
                { nombre: "Bullpadel Vertex 04", bajada: "$30.000", tienda: "Padelnuestro" },
                { nombre: "Nox AT10 Genius", bajada: "$20.000", tienda: "MercadoLibre" },
              ].map((a) => (
                <div key={a.nombre} className="flex items-center gap-3 pb-3 border-b border-line last:border-0">
                  <div className="w-10 h-12 bg-gradient-to-b from-[#DC2626] to-ink rounded-md flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{a.nombre}</div>
                    <div className="mono text-xs text-[#00B85C]">↓ {a.bajada} ({a.tienda})</div>
                  </div>
                  <button className="mono text-[11px] text-[#00B85C] font-semibold">Ver →</button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm font-semibold text-[#00B85C] border border-[#00B85C]/30 py-2 rounded-lg hover:bg-[#D1FAE5]/30 transition-colors">
              + Nueva alerta
            </button>
          </div>

          {/* Bitácora */}
          <div className="md:col-span-7 bg-canvas border border-line rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="display text-xl font-semibold">Bitácora de partidos</h3>
              <button className="text-sm font-semibold">+ Reportar partido</button>
            </div>
            <div className="space-y-0">
              {[
                { dia: "23", mes: "ABR", cancha: "Club Las Condes · cancha 3", pareja: "con Diego · vs Pablo / Andrés", resultado: "6-3 / 6-4", gano: true },
                { dia: "20", mes: "ABR", cancha: "PadelArena · cancha 1", pareja: "con Diego · vs Tomás / Felipe", resultado: "3-6 / 6-3 / 4-6", gano: false },
                { dia: "17", mes: "ABR", cancha: "Club Las Condes · cancha 5", pareja: "con Rodrigo · vs Sebastián / Cristián", resultado: "7-5 / 6-2", gano: true },
              ].map((p) => (
                <div key={`${p.dia}${p.mes}`} className="flex items-center gap-4 py-3 border-b border-line last:border-0">
                  <div className="text-center w-12">
                    <div className="display text-lg font-semibold leading-none">{p.dia}</div>
                    <div className="mono text-[9px] uppercase">{p.mes}</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{p.cancha}</div>
                    <div className="mono text-xs text-ink-muted">{p.pareja}</div>
                  </div>
                  <div className="text-right">
                    <div className={`mono text-sm font-semibold ${p.gano ? "text-[#008F47]" : ""}`}>{p.resultado}</div>
                    <div className={`mono text-[10px] ${p.gano ? "text-[#008F47]" : "text-[#E8590C]"}`}>{p.gano ? "VICTORIA" : "DERROTA"}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-line grid grid-cols-4 gap-4">
              {[{ label: "Últimos 30d", val: "12" }, { label: "Wins", val: "8", color: "#008F47" }, { label: "Losses", val: "4", color: "#E8590C" }, { label: "Win rate", val: "67%" }].map((s) => (
                <div key={s.label}>
                  <div className="mono text-[10px] text-ink-soft uppercase">{s.label}</div>
                  <div className="stat-num text-2xl" style={s.color ? { color: s.color } : {}}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Torneos */}
          <div className="md:col-span-5 bg-canvas border border-line rounded-2xl p-6">
            <h3 className="display text-xl font-semibold mb-4">Próximos torneos Cat 4</h3>
            <div className="space-y-3">
              {[
                { dia: "14", mes: "DIC", nombre: "Open Las Condes", info: "16 parejas · $30.000" },
                { dia: "21", mes: "DIC", nombre: "Copa Verano La Reina", info: "24 parejas · $45.000" },
                { dia: "11", mes: "ENE", nombre: "Verano Cup Vitacura", info: "32 parejas · $55.000" },
              ].map((t) => (
                <div key={t.nombre} className="border border-line rounded-lg p-3 flex gap-3">
                  <div className="text-center w-10">
                    <div className="display text-lg font-semibold leading-none">{t.dia}</div>
                    <div className="mono text-[9px]">{t.mes}</div>
                  </div>
                  <div className="flex-1 border-l border-line pl-3">
                    <div className="font-semibold text-sm">{t.nombre}</div>
                    <div className="text-xs text-ink-muted">{t.info}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/torneos" className="block mt-4 text-[#00B85C] font-semibold text-sm">Ver todos los torneos →</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
