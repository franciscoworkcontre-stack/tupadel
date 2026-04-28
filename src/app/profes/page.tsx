import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profesores de Pádel — Encontrá tu Profe | Pulso Pádel",
  description: "Directorio de profesores de pádel verificados en Chile, Argentina y Uruguay. Filtrá por nivel, especialidad, ciudad y precio. Reviews reales de alumnos.",
};

const especialidades = [
  { slug: "iniciacion-adulta", label: "Iniciación adulta", icon: "🎯", desc: "Primera pala, primeros pasos." },
  { slug: "vibora", label: "Víbora", icon: "🌀", desc: "El golpe que más hace ganar partidos." },
  { slug: "juego-femenino", label: "Juego femenino", icon: "⚡", desc: "Técnica y táctica adaptada." },
  { slug: "para-ninos", label: "Niños", icon: "🏅", desc: "6 a 16 años, metodología lúdica." },
  { slug: "mental-game", label: "Mental game", icon: "🧠", desc: "Presión, concentración, resiliencia." },
  { slug: "preparacion-fisica", label: "Prep. física", icon: "💪", desc: "Pádel-específico: movilidad y potencia." },
];

const niveles = [
  { slug: "iniciacion", label: "Cat 5–6", nombre: "Iniciación / Intermedio bajo", color: "#7C3AED" },
  { slug: "intermedio", label: "Cat 4", nombre: "Intermedio", color: "#65A30D" },
  { slug: "avanzado", label: "Cat 2–3", nombre: "Intermedio alto / Avanzado", color: "#EA580C" },
  { slug: "competitivo", label: "Cat 1", nombre: "Competitivo", color: "#DC2626" },
];

const ciudades = [
  { slug: "santiago", label: "Santiago", pais: "🇨🇱" },
  { slug: "buenos-aires", label: "Buenos Aires", pais: "🇦🇷" },
  { slug: "montevideo", label: "Montevideo", pais: "🇺🇾" },
];

export default async function ProfesPage() {
  const featured = await db.query.profes.findMany({
    where: (p, { eq, and }) => and(eq(p.estado, "activo"), eq(p.destacado, true)),
    limit: 4,
    orderBy: (p, { desc }) => [desc(p.ratingPromedio)],
  });

  const recientes = await db.query.profes.findMany({
    where: (p, { eq }) => eq(p.estado, "activo"),
    limit: 4,
    orderBy: (p, { desc }) => [desc(p.publishedAt)],
  });

  return (
    <>
      <Navbar activeSection="/profes" />
      <main>
        {/* Hero */}
        <section className="px-6 md:px-8 py-12 md:py-20 border-b border-line bg-[#0D1B2A] text-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-white/40 uppercase tracking-widest mb-6">→ Directorio de profes</div>
            <h1 className="display text-5xl md:text-7xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              Encontrá tu<br />profe de pádel
            </h1>
            <p className="text-white/60 text-xl mt-5 max-w-2xl leading-relaxed">
              Directorio verificado de profesores en Chile, Argentina y Uruguay. Filtrá por nivel, especialidad y precio. Reviews reales de alumnos reales.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/profes/buscar" className="bg-[#A8E63A] text-[#0D1B2A] px-7 py-3.5 rounded-lg font-semibold hover:bg-[#7DB81E] transition-colors">
                Buscar profe →
              </Link>
              <Link href="/profes/buscar?verificado=true" className="border border-white/20 text-white px-5 py-3.5 rounded-lg text-sm font-medium hover:border-white/40 transition-colors">
                Solo verificados
              </Link>
              <Link href="/profes/online" className="border border-white/20 text-white px-5 py-3.5 rounded-lg text-sm font-medium hover:border-white/40 transition-colors">
                Clases online
              </Link>
            </div>
            {/* Stats */}
            <div className="flex gap-8 mt-12 flex-wrap">
              <div><div className="text-3xl font-bold text-[#A8E63A]">8+</div><div className="text-xs text-white/40 mt-1 mono uppercase">Profes verificados</div></div>
              <div><div className="text-3xl font-bold text-[#A8E63A]">3</div><div className="text-xs text-white/40 mt-1 mono uppercase">Países</div></div>
              <div><div className="text-3xl font-bold text-[#A8E63A]">4.8★</div><div className="text-xs text-white/40 mt-1 mono uppercase">Rating promedio</div></div>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="px-6 md:px-8 py-12 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-8">→ Cómo funciona</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="w-8 h-8 rounded-full bg-[#0D1B2A] text-white text-sm font-bold flex items-center justify-center mb-4">1</div>
                <div className="display text-lg font-semibold mb-2">Buscá y filtrá</div>
                <p className="text-sm text-ink-muted leading-relaxed">Filtrá por tu nivel actual, especialidad que necesitás, ciudad y precio. Todos los profes son verificados manualmente.</p>
              </div>
              <div>
                <div className="w-8 h-8 rounded-full bg-[#0D1B2A] text-white text-sm font-bold flex items-center justify-center mb-4">2</div>
                <div className="display text-lg font-semibold mb-2">Revisá el perfil</div>
                <p className="text-sm text-ink-muted leading-relaxed">Leé la metodología, mirá las reviews verificadas de alumnos reales y chequeá su disponibilidad.</p>
              </div>
              <div>
                <div className="w-8 h-8 rounded-full bg-[#0D1B2A] text-white text-sm font-bold flex items-center justify-center mb-4">3</div>
                <div className="display text-lg font-semibold mb-2">Escribile directo</div>
                <p className="text-sm text-ink-muted leading-relaxed">Mandá tu consulta con tu nivel y objetivo. El profe te responde en pocas horas y coordinan la primera clase.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured */}
        {featured.length > 0 && (
          <section className="px-6 md:px-8 py-12 border-b border-line max-w-[1400px] mx-auto">
            <div className="flex items-baseline justify-between mb-8">
              <div>
                <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">→ Destacados</div>
                <h2 className="display text-3xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Profes destacados</h2>
              </div>
              <Link href="/profes/buscar" className="mono text-xs text-ink-soft hover:text-ink transition-colors">Ver todos →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map((p) => (
                <ProfeCard key={p.id} profe={p} />
              ))}
            </div>
          </section>
        )}

        {/* Por especialidad */}
        <section className="px-6 md:px-8 py-12 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">→ Por especialidad</div>
            <h2 className="display text-3xl font-semibold mb-8" style={{ letterSpacing: "-0.02em" }}>¿Qué querés mejorar?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {especialidades.map((e) => (
                <Link
                  key={e.slug}
                  href={`/profes/buscar?especialidad=${e.slug}`}
                  className="border border-line rounded-xl p-5 bg-canvas hover:border-ink-muted transition-colors group text-center"
                >
                  <div className="text-3xl mb-3">{e.icon}</div>
                  <div className="display text-sm font-semibold mb-1">{e.label}</div>
                  <p className="text-xs text-ink-muted">{e.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Por nivel */}
        <section className="px-6 md:px-8 py-12 border-b border-line max-w-[1400px] mx-auto">
          <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">→ Por nivel</div>
          <h2 className="display text-3xl font-semibold mb-2" style={{ letterSpacing: "-0.02em" }}>Profes según tu categoría</h2>
          <p className="text-sm text-ink-muted mb-8">
            ¿Hiciste el diagnóstico? <Link href="/diagnostico" className="underline hover:text-ink">Descubrí tu categoría gratis →</Link>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {niveles.map((n) => (
              <Link
                key={n.slug}
                href={`/profes/por-nivel/${n.slug}`}
                className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors group"
              >
                <div className="w-3 h-3 rounded-full mb-4" style={{ backgroundColor: n.color }} />
                <div className="mono text-xs text-ink-soft mb-2">{n.label}</div>
                <div className="display text-lg font-semibold">{n.nombre}</div>
                <div className="mt-4 text-xs text-ink-soft group-hover:text-ink transition-colors">Ver profes →</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recientes */}
        {recientes.length > 0 && (
          <section className="px-6 md:px-8 py-12 border-b border-line bg-canvas-warm">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex items-baseline justify-between mb-8">
                <div>
                  <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">→ Directorio</div>
                  <h2 className="display text-3xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Todos los profes</h2>
                </div>
                <Link href="/profes/buscar" className="mono text-xs text-ink-soft hover:text-ink transition-colors">Ver listado completo →</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recientes.map((p) => (
                  <ProfeCardHorizontal key={p.id} profe={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Por ciudad */}
        <section className="px-6 md:px-8 py-12 border-b border-line max-w-[1400px] mx-auto">
          <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">→ Por ciudad</div>
          <h2 className="display text-3xl font-semibold mb-8" style={{ letterSpacing: "-0.02em" }}>Profes cerca tuyo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ciudades.map((c) => (
              <Link
                key={c.slug}
                href={`/profes/${c.slug}`}
                className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors group"
              >
                <div className="text-2xl mb-3">{c.pais}</div>
                <div className="display text-xl font-semibold">{c.label}</div>
                <div className="mt-4 text-xs text-ink-soft group-hover:text-ink transition-colors">Ver profes en {c.label} →</div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA para profes */}
        <section className="px-6 md:px-8 py-14 border-t border-line bg-[#0D1B2A] text-white">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="mono text-xs text-white/40 uppercase tracking-widest mb-3">→ ¿Sos profe?</div>
              <h2 className="display text-3xl md:text-4xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
                Sumate gratis al directorio
              </h2>
              <p className="text-white/60 mt-3 max-w-xl leading-relaxed">
                Listing gratuito, verificación en 48h. Sin comisiones por contacto. Pagás solo si querés aparecer destacado.
              </p>
            </div>
            <Link
              href="/profe/onboarding"
              className="bg-[#A8E63A] text-[#0D1B2A] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#7DB81E] transition-colors whitespace-nowrap"
            >
              Alta como profe →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

type Profe = Awaited<ReturnType<typeof db.query.profes.findMany>>[number];

function ProfeCard({ profe }: { profe: Profe }) {
  const precio = profe.precioIndividual60min;
  const moneda = profe.monedaBase ?? "CLP";

  return (
    <Link href={`/profes/${profe.slug}`} className="border border-line rounded-xl p-5 bg-canvas hover:border-ink-muted transition-colors group block">
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-full bg-[#0D1B2A] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {profe.nombre[0]}{profe.apellido[0]}
        </div>
        {profe.verificado && (
          <span className="mono text-[9px] bg-[#A8E63A]/10 text-[#65A30D] border border-[#A8E63A]/30 px-2 py-0.5 rounded">
            ✓ Verificado
          </span>
        )}
      </div>
      <div className="display text-lg font-semibold">{profe.nombre} {profe.apellido}</div>
      <div className="text-xs text-ink-muted mt-1">{profe.ciudad}{profe.comuna ? `, ${profe.comuna}` : ""}</div>
      {profe.ratingPromedio && (
        <div className="flex items-center gap-1 mt-2">
          <span className="text-yellow-500 text-sm">★</span>
          <span className="text-sm font-semibold">{profe.ratingPromedio.toFixed(1)}</span>
          <span className="text-xs text-ink-muted">({profe.reviewsCount} reviews)</span>
        </div>
      )}
      {profe.especialidades && profe.especialidades.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {profe.especialidades.slice(0, 2).map((e) => (
            <span key={e} className="mono text-[9px] border border-line px-2 py-0.5 rounded text-ink-soft">{e.replace(/_/g, " ")}</span>
          ))}
        </div>
      )}
      {precio && (
        <div className="mt-4 pt-4 border-t border-line">
          <span className="text-xs text-ink-muted">Desde </span>
          <span className="font-semibold">${precio.toLocaleString("es-CL")} {moneda}</span>
          <span className="text-xs text-ink-muted">/clase</span>
        </div>
      )}
    </Link>
  );
}

function ProfeCardHorizontal({ profe }: { profe: Profe }) {
  const precio = profe.precioIndividual60min;
  const moneda = profe.monedaBase ?? "CLP";

  return (
    <Link href={`/profes/${profe.slug}`} className="border border-line rounded-xl p-5 bg-canvas hover:border-ink-muted transition-colors group flex gap-4">
      <div className="w-16 h-16 rounded-full bg-[#0D1B2A] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
        {profe.nombre[0]}{profe.apellido[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="display text-lg font-semibold">{profe.nombre} {profe.apellido}</span>
          {profe.verificado && <span className="mono text-[9px] bg-[#A8E63A]/10 text-[#65A30D] border border-[#A8E63A]/30 px-2 py-0.5 rounded">✓ Verificado</span>}
        </div>
        <div className="text-xs text-ink-muted mt-0.5">{profe.ciudad}{profe.comuna ? `, ${profe.comuna}` : ""}</div>
        <p className="text-sm text-ink-muted mt-2 line-clamp-2 leading-relaxed">{profe.bioCorta}</p>
        <div className="flex items-center gap-4 mt-3">
          {profe.ratingPromedio && (
            <span className="text-sm"><span className="text-yellow-500">★</span> <span className="font-semibold">{profe.ratingPromedio.toFixed(1)}</span> <span className="text-ink-muted text-xs">({profe.reviewsCount})</span></span>
          )}
          {precio && (
            <span className="text-sm"><span className="text-ink-muted text-xs">Desde</span> <span className="font-semibold">${precio.toLocaleString("es-CL")} {moneda}</span></span>
          )}
        </div>
      </div>
    </Link>
  );
}
