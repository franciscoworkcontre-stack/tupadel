import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { db } from "@/db";
import { profes } from "@/db/schema";
import { eq, and, arrayContains, ilike, or } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscar Profesor de Pádel — Filtros por Nivel y Ciudad | Pulso Pádel",
  description: "Encontrá tu profe de pádel con filtros por nivel, especialidad, modalidad, ciudad y precio. Todos verificados.",
};

const catColors: Record<number, string> = {
  1: "#DC2626", 2: "#EA580C", 3: "#D97706", 4: "#65A30D", 5: "#0891B2", 6: "#7C3AED",
};

const especialidadesOpciones = [
  { value: "vibora", label: "Víbora" },
  { value: "juego_femenino", label: "Juego femenino" },
  { value: "iniciacion_adulta", label: "Iniciación adulta" },
  { value: "ninos", label: "Niños" },
  { value: "mental_game", label: "Mental game" },
  { value: "tactica", label: "Táctica" },
  { value: "preparacion_fisica", label: "Prep. física" },
  { value: "tecnica_avanzada", label: "Técnica avanzada" },
  { value: "transicion_competitiva", label: "Transición competitiva" },
];

const modalidadesOpciones = [
  { value: "individual", label: "Individual" },
  { value: "pareja", label: "En pareja" },
  { value: "grupo_3_4", label: "Grupo 3-4" },
  { value: "clinica", label: "Clínica" },
  { value: "online_video_analisis", label: "Online / video análisis" },
  { value: "intensivo_fin_de_semana", label: "Intensivo fin de semana" },
];

const ciudadesOpciones = [
  "Santiago", "Buenos Aires", "Montevideo", "Córdoba", "Mendoza", "Rosario",
];

type SearchParams = {
  ciudad?: string;
  especialidad?: string;
  modalidad?: string;
  cat?: string;
  genero?: string;
  verificado?: string;
  online?: string;
  sort?: string;
};

export default async function BuscarProfesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  // Build query conditions
  const conditions = [eq(profes.estado, "activo")];

  if (params.ciudad) {
    conditions.push(ilike(profes.ciudad, `%${params.ciudad}%`));
  }
  if (params.genero && params.genero !== "cualquiera") {
    conditions.push(eq(profes.genero, params.genero as "hombre" | "mujer" | "no_binario" | "no_declarado"));
  }
  if (params.verificado === "true") {
    conditions.push(eq(profes.verificado, true));
  }
  if (params.online === "true") {
    conditions.push(eq(profes.atiendeOnline, true));
  }

  const resultados = await db.query.profes.findMany({
    where: and(...conditions),
    orderBy: (p, { desc, asc }) => {
      if (params.sort === "precio_asc") return [asc(p.precioIndividual60min)];
      if (params.sort === "precio_desc") return [desc(p.precioIndividual60min)];
      if (params.sort === "experiencia") return [desc(p.anosExperiencia)];
      if (params.sort === "clases") return [desc(p.clasesDadasCount)];
      return [desc(p.destacado), desc(p.ratingPromedio)];
    },
  });

  // Client-side filters (arrays — harder to do in Drizzle without raw SQL)
  const filtrados = resultados.filter((p) => {
    if (params.especialidad && !p.especialidades?.some((e) => e.includes(params.especialidad!.replace(/-/g, "_")))) return false;
    if (params.modalidad && !p.modalidades?.includes(params.modalidad)) return false;
    if (params.cat && !p.categoriasQueEnsena?.includes(parseInt(params.cat))) return false;
    return true;
  });

  const totalResultados = filtrados.length;
  const hayFiltros = Object.values(params).some(Boolean);

  return (
    <>
      <Navbar activeSection="/profes" />
      <main>
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-8">
          <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">
            <Link href="/profes" className="hover:text-ink transition-colors">← Profes</Link>
            <span className="mx-2">·</span>
            <span>Buscar</span>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filtros */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="border border-line rounded-xl p-5 bg-canvas sticky top-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="display text-base font-semibold">Filtros</span>
                  {hayFiltros && (
                    <Link href="/profes/buscar" className="mono text-[10px] text-ink-muted hover:text-ink">
                      Limpiar todo
                    </Link>
                  )}
                </div>

                {/* Ciudad */}
                <FilterSection label="Ciudad">
                  <div className="space-y-1">
                    {ciudadesOpciones.map((c) => (
                      <FilterLink
                        key={c}
                        params={params}
                        field="ciudad"
                        value={c}
                        label={c}
                      />
                    ))}
                  </div>
                </FilterSection>

                {/* Categoría */}
                <FilterSection label="Nivel que enseña">
                  <div className="space-y-1">
                    {[6, 5, 4, 3, 2, 1].map((n) => (
                      <FilterLink
                        key={n}
                        params={params}
                        field="cat"
                        value={String(n)}
                        label={`Cat ${n}`}
                        dot={catColors[n]}
                      />
                    ))}
                  </div>
                </FilterSection>

                {/* Especialidad */}
                <FilterSection label="Especialidad">
                  <div className="space-y-1">
                    {especialidadesOpciones.map((e) => (
                      <FilterLink
                        key={e.value}
                        params={params}
                        field="especialidad"
                        value={e.value}
                        label={e.label}
                      />
                    ))}
                  </div>
                </FilterSection>

                {/* Modalidad */}
                <FilterSection label="Modalidad">
                  <div className="space-y-1">
                    {modalidadesOpciones.map((m) => (
                      <FilterLink
                        key={m.value}
                        params={params}
                        field="modalidad"
                        value={m.value}
                        label={m.label}
                      />
                    ))}
                  </div>
                </FilterSection>

                {/* Género */}
                <FilterSection label="Género del profe">
                  <div className="space-y-1">
                    {[
                      { value: "mujer", label: "Mujer" },
                      { value: "hombre", label: "Hombre" },
                    ].map((g) => (
                      <FilterLink key={g.value} params={params} field="genero" value={g.value} label={g.label} />
                    ))}
                  </div>
                </FilterSection>

                {/* Toggles */}
                <FilterSection label="Opciones" last>
                  <div className="space-y-2">
                    <ToggleLink params={params} field="verificado" label="Solo verificados" />
                    <ToggleLink params={params} field="online" label="Atiende online" />
                  </div>
                </FilterSection>
              </div>
            </aside>

            {/* Resultados */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <span className="font-semibold">{totalResultados}</span>
                  <span className="text-ink-muted text-sm"> profe{totalResultados !== 1 ? "s" : ""} encontrado{totalResultados !== 1 ? "s" : ""}</span>
                  {params.ciudad && <span className="text-ink-muted text-sm"> en {params.ciudad}</span>}
                </div>
                <SortSelector params={params} />
              </div>

              {filtrados.length === 0 ? (
                <div className="border border-line rounded-xl p-12 text-center bg-canvas">
                  <div className="text-ink-muted mb-4">No encontramos profes con esos filtros.</div>
                  <Link href="/profes/buscar" className="text-sm underline hover:text-ink">Limpiar filtros</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {filtrados.map((p) => (
                    <ProfeCardFull key={p.id} profe={p} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function buildUrl(params: SearchParams, updates: Partial<SearchParams>): string {
  const next = { ...params, ...updates };
  const qs = Object.entries(next)
    .filter(([, v]) => v && v !== "")
    .map(([k, v]) => `${k}=${encodeURIComponent(v!)}`)
    .join("&");
  return `/profes/buscar${qs ? `?${qs}` : ""}`;
}

function FilterSection({ label, children, last = false }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={`${last ? "" : "mb-5 pb-5 border-b border-line"}`}>
      <div className="mono text-[10px] text-ink-soft uppercase tracking-widest mb-2">{label}</div>
      {children}
    </div>
  );
}

function FilterLink({ params, field, value, label, dot }: {
  params: SearchParams; field: keyof SearchParams; value: string; label: string; dot?: string;
}) {
  const active = params[field] === value;
  const href = active
    ? buildUrl(params, { [field]: undefined })
    : buildUrl(params, { [field]: value });

  return (
    <Link href={href} className={`flex items-center gap-2 text-sm py-0.5 transition-colors ${active ? "text-ink font-medium" : "text-ink-muted hover:text-ink"}`}>
      {dot && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dot }} />}
      <span>{label}</span>
      {active && <span className="ml-auto text-xs opacity-50">✕</span>}
    </Link>
  );
}

function ToggleLink({ params, field, label }: { params: SearchParams; field: keyof SearchParams; label: string }) {
  const active = params[field] === "true";
  const href = active ? buildUrl(params, { [field]: undefined }) : buildUrl(params, { [field]: "true" });
  return (
    <Link href={href} className="flex items-center gap-2 text-sm">
      <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${active ? "bg-[#0D1B2A] border-[#0D1B2A] text-white" : "border-line"}`}>
        {active && "✓"}
      </span>
      <span className={active ? "text-ink font-medium" : "text-ink-muted"}>{label}</span>
    </Link>
  );
}

function SortSelector({ params }: { params: SearchParams }) {
  const opciones = [
    { value: "", label: "Relevancia" },
    { value: "precio_asc", label: "Precio ↑" },
    { value: "precio_desc", label: "Precio ↓" },
    { value: "experiencia", label: "Más experiencia" },
    { value: "clases", label: "Más clases dadas" },
  ];
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-ink-muted">Ordenar:</span>
      <div className="flex gap-1">
        {opciones.map((o) => (
          <Link
            key={o.value}
            href={buildUrl(params, { sort: o.value || undefined })}
            className={`px-3 py-1 rounded text-xs border transition-colors ${(params.sort ?? "") === o.value ? "bg-[#0D1B2A] text-white border-[#0D1B2A]" : "border-line text-ink-muted hover:border-ink-muted"}`}
          >
            {o.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

type Profe = Awaited<ReturnType<typeof db.query.profes.findMany>>[number];

function ProfeCardFull({ profe }: { profe: Profe }) {
  const precio = profe.precioIndividual60min;
  const moneda = profe.monedaBase ?? "CLP";

  return (
    <Link
      href={`/profes/${profe.slug}`}
      className="border border-line rounded-xl p-6 bg-canvas hover:border-ink-muted transition-colors group flex gap-5"
    >
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0D1B2A] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
        {profe.nombre[0]}{profe.apellido[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="display text-xl font-semibold">{profe.nombre} {profe.apellido}</span>
              {profe.verificado && (
                <span className="mono text-[9px] bg-[#A8E63A]/10 text-[#65A30D] border border-[#A8E63A]/30 px-2 py-0.5 rounded">✓ Verificado</span>
              )}
              {profe.destacado && (
                <span className="mono text-[9px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded">Destacado</span>
              )}
            </div>
            <div className="text-sm text-ink-muted mt-0.5">
              {profe.ciudad}{profe.comuna ? `, ${profe.comuna}` : ""} · {profe.anosExperiencia} años de exp.
              {profe.atiendeOnline && " · Online disponible"}
            </div>
          </div>
          {precio && (
            <div className="text-right flex-shrink-0">
              <div className="font-semibold">${precio.toLocaleString("es-CL")}</div>
              <div className="mono text-[10px] text-ink-muted">{moneda} / clase</div>
            </div>
          )}
        </div>

        <p className="text-sm text-ink-muted mt-3 leading-relaxed line-clamp-2">{profe.bioCorta}</p>

        <div className="flex flex-wrap gap-3 mt-4 items-center">
          {profe.ratingPromedio && (
            <span className="text-sm font-medium">
              <span className="text-yellow-500">★</span> {profe.ratingPromedio.toFixed(1)}
              <span className="text-ink-muted font-normal"> ({profe.reviewsCount} reviews)</span>
            </span>
          )}
          {(profe.categoriasQueEnsena ?? []).length > 0 && (
            <div className="flex gap-1">
              {(profe.categoriasQueEnsena ?? []).sort().map((c) => (
                <span key={c} className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold" style={{ backgroundColor: catColors[c] ?? "#888" }}>
                  {c}
                </span>
              ))}
            </div>
          )}
          {(profe.especialidades ?? []).slice(0, 3).map((e) => (
            <span key={e} className="mono text-[10px] border border-line px-2 py-0.5 rounded text-ink-soft">
              {e.replace(/_/g, " ")}
            </span>
          ))}
          <span className="text-xs text-ink-soft ml-auto hidden md:block group-hover:text-ink transition-colors">Ver perfil →</span>
        </div>
      </div>
    </Link>
  );
}
