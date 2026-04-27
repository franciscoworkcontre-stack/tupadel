import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const ciudadesData: Record<string, {
  nombre: string;
  total: number;
  clubes: {
    slug: string; nombre: string; comuna: string; direccion: string;
    rating: number; reviews: number; indoor: boolean; outdoor: boolean;
    canchas: number; servicios: string[]; muro: string;
    precioRegular: number; precioPrime: number; precioFinde: number;
    verificado?: boolean; subio?: boolean;
  }[];
}> = {
  santiago: {
    nombre: "Santiago",
    total: 38,
    clubes: [
      {
        slug: "club-padel-las-condes", nombre: "Club de Pádel Las Condes", comuna: "Las Condes",
        direccion: "Av. Apoquindo 4500", rating: 4.7, reviews: 127,
        indoor: true, outdoor: false, canchas: 6, muro: "Cristal panorámica",
        servicios: ["Estacionamiento", "Cafetería", "Vestuarios", "Pro shop"],
        precioRegular: 15000, precioPrime: 22000, precioFinde: 20000, verificado: true,
      },
      {
        slug: "padelarena-vitacura", nombre: "PadelArena Vitacura", comuna: "Vitacura",
        direccion: "Av. Vitacura 8800", rating: 4.5, reviews: 89,
        indoor: true, outdoor: true, canchas: 8, muro: "Cristal",
        servicios: ["Pro shop", "Vestuarios"],
        precioRegular: 13000, precioPrime: 19000, precioFinde: 17000,
      },
      {
        slug: "padel-stadium-la-reina", nombre: "Pádel Stadium La Reina", comuna: "La Reina",
        direccion: "Av. Larraín 5950", rating: 4.6, reviews: 203,
        indoor: false, outdoor: true, canchas: 4, muro: "Cristal",
        servicios: ["Iluminación LED", "Vestuarios"],
        precioRegular: 11000, precioPrime: 17000, precioFinde: 15000, subio: true,
      },
      {
        slug: "padelplay-nunoa", nombre: "Padelplay Ñuñoa", comuna: "Ñuñoa",
        direccion: "Av. Irarrázaval 3300", rating: 4.4, reviews: 156,
        indoor: true, outdoor: false, canchas: 5, muro: "Cristal",
        servicios: ["Vestuarios", "Cafetería"],
        precioRegular: 10000, precioPrime: 16000, precioFinde: 14000,
      },
    ],
  },
  concepcion: {
    nombre: "Concepción",
    total: 14,
    clubes: [
      {
        slug: "padel-concepcion-center", nombre: "Pádel Concepción Center", comuna: "Concepción",
        direccion: "Av. O'Higgins 680", rating: 4.3, reviews: 45,
        indoor: true, outdoor: false, canchas: 4, muro: "Cristal",
        servicios: ["Vestuarios", "Estacionamiento"],
        precioRegular: 9000, precioPrime: 14000, precioFinde: 12000,
      },
    ],
  },
};

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

type Props = { params: Promise<{ ciudad: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ciudad } = await params;
  const data = ciudadesData[ciudad];
  if (!data) return {};
  return {
    title: `Canchas de Pádel en ${data.nombre} — Precios y Reviews | tupadel`,
    description: `${data.total} clubes de pádel en ${data.nombre}. Precios por hora comparados, horarios, indoor/outdoor. Encontrá la cancha ideal en tu comuna.`,
  };
}

export function generateStaticParams() {
  return Object.keys(ciudadesData).map((c) => ({ ciudad: c }));
}

export default async function CiudadPage({ params }: Props) {
  const { ciudad } = await params;
  const data = ciudadesData[ciudad];
  if (!data) notFound();

  return (
    <>
      <Navbar activeSection="/canchas" />
      <main>
        {/* Header */}
        <section className="px-6 md:px-8 py-10 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft mb-3">
              <Link href="/canchas" className="hover:text-ink">Canchas</Link> · {data.nombre}
            </div>
            <h1 className="display text-4xl md:text-5xl font-semibold" style={{ letterSpacing: "-0.03em" }}>
              {data.total} clubes en {data.nombre}
            </h1>
            <p className="text-ink-muted text-lg mt-3">Precios actualizados, comparados por franja horaria. Reseñas reales de quien jugó.</p>
          </div>
        </section>

        {/* Filters */}
        <section className="px-6 md:px-8 py-3 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto flex items-center gap-2 overflow-x-auto whitespace-nowrap">
            <span className="mono text-xs text-ink-soft uppercase">Filtrar:</span>
            {["Comuna ▾", "Indoor / Outdoor ▾", "Día y hora ▾", "Precio ▾"].map((f) => (
              <button key={f} className="inline-flex px-3 py-1.5 rounded-full border border-line bg-canvas text-sm hover:border-ink transition-colors">
                {f}
              </button>
            ))}
            <div className="flex-1" />
            <button className="inline-flex px-3 py-1.5 rounded-full bg-ink text-white text-sm">Mejor precio ▾</button>
          </div>
        </section>

        {/* Lista + Mapa */}
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-7 px-6 md:px-8 py-6 space-y-4 md:border-r border-line">
            {data.clubes.map((club) => (
              <Link key={club.slug} href={`/canchas/${ciudad}/${club.slug}`} className="block border border-line rounded-xl overflow-hidden hover:border-ink transition-colors">
                <div className="flex">
                  <div className="w-32 md:w-48 bg-gradient-to-br from-canvas-warm to-canvas-dim flex items-center justify-center flex-shrink-0">
                    <div className="w-20 md:w-32 h-14 md:h-20 border-2 border-ink rounded relative bg-[#ECFCCB]/30">
                      <div className="absolute inset-x-0 top-1/2 h-px bg-ink" />
                      <div className="absolute inset-y-0 left-1/2 w-px bg-ink" />
                    </div>
                  </div>
                  <div className="flex-1 p-4 md:p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="display text-base md:text-xl font-semibold">{club.nombre}</h3>
                          {club.verificado && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#ECFCCB] text-[#7DB81E]">VERIF.</span>
                          )}
                          {club.subio && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FFE4D1] text-[#E8590C]">↑ PRECIO</span>
                          )}
                        </div>
                        <div className="mono text-xs text-ink-soft">{club.comuna} · {club.direccion} · ★ {club.rating} ({club.reviews})</div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-2">
                        <div className="mono text-lg md:text-2xl font-bold">{formatPrice(club.precioRegular)}</div>
                        <div className="mono text-[10px] text-ink-soft uppercase">/ hora · regular</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 mb-3 flex-wrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-canvas-dim">
                        {[club.indoor && "Indoor", club.outdoor && "Outdoor"].filter(Boolean).join(" / ")} · {club.canchas} canchas
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-canvas-dim">{club.muro}</span>
                      {club.servicios.slice(0, 2).map((s) => (
                        <span key={s} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-canvas-dim">{s}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-line text-[11px]">
                      <div><span className="text-ink-soft">Lun-Vie 8-17h</span> <span className="mono font-semibold">{formatPrice(club.precioRegular)}</span></div>
                      <div><span className="text-ink-soft">Prime</span> <span className="mono font-semibold text-[#E8590C]">{formatPrice(club.precioPrime)}</span></div>
                      <div><span className="text-ink-soft">Finde</span> <span className="mono font-semibold">{formatPrice(club.precioFinde)}</span></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mapa placeholder */}
          <div className="hidden md:block md:col-span-5 sticky top-0 h-[700px] bg-canvas-warm relative border-l border-line">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-2">Mapa de {data.nombre}</div>
                <p className="text-sm text-ink-muted">Integración con Google Maps disponible con API key configurada</p>
              </div>
            </div>
            {/* Pins */}
            {data.clubes.map((club, i) => (
              <div
                key={club.slug}
                className="absolute"
                style={{ top: `${20 + i * 20}%`, left: `${25 + (i % 3) * 25}%` }}
              >
                <div className={`px-2.5 py-1 rounded-full mono text-xs font-bold shadow-lg text-white ${i === 0 ? "bg-[#A8E63A]" : "bg-ink"}`}>
                  {formatPrice(club.precioRegular)}
                </div>
              </div>
            ))}
            <div className="absolute bottom-4 left-4 right-4 bg-canvas border border-line rounded-lg p-3 shadow-lg">
              <div className="mono text-[10px] uppercase text-ink-soft mb-1">Leyenda</div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#A8E63A]" />Mejor precio</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-ink" />Otros clubes</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
