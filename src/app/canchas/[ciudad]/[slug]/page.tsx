import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Franja = { tipo: string; dias: string; horario: string; precio: number };
type Club = {
  nombre: string; comuna: string; direccion: string; telefono: string;
  whatsapp: string; instagram: string; website?: string;
  rating: number; reviews: number; indoor: boolean; outdoor: boolean;
  canchas: number; muro: string; cesped: string; servicios: string[];
  descripcion: string; franjas: Franja[];
  opiniones: { autor: string; rating: number; fecha: string; texto: string }[];
};

const clubesData: Record<string, Record<string, Club>> = {
  santiago: {
    "club-padel-las-condes": {
      nombre: "Club de Pádel Las Condes",
      comuna: "Las Condes", direccion: "Av. Apoquindo 4500", telefono: "+56 2 2345 6789",
      whatsapp: "+56912345678", instagram: "@padellacondes",
      rating: 4.7, reviews: 127, indoor: true, outdoor: false, canchas: 6,
      muro: "Cristal panorámica", cesped: "Mondo sintético",
      servicios: ["Estacionamiento", "Cafetería", "Vestuarios", "Pro shop", "Clases particulares", "Arriendo de palas"],
      descripcion: "El club de pádel más completo de Las Condes. 6 canchas de cristal panorámico indoor con climatización. Cafetería con menú ejecutivo y pro shop con todas las marcas.",
      franjas: [
        { tipo: "Valle", dias: "Lun–Vie", horario: "08:00–17:00", precio: 15000 },
        { tipo: "Prime", dias: "Lun–Vie", horario: "17:00–22:00", precio: 22000 },
        { tipo: "Fin de semana", dias: "Sáb–Dom", horario: "08:00–22:00", precio: 20000 },
      ],
      opiniones: [
        { autor: "Rodrigo V.", rating: 5, fecha: "Abr 2026", texto: "Las mejores canchas de Santiago. El piso de Mondo es perfecto, las pelotas rebotan justo. Cafetería muy buena." },
        { autor: "Camila R.", rating: 4, fecha: "Mar 2026", texto: "Excelente instalación, un poco caro en horario prime pero vale la pena la calidad." },
        { autor: "Diego M.", rating: 5, fecha: "Feb 2026", texto: "Jugamos torneo interno acá. Organización impecable y el staff muy atento." },
      ],
    },
    "padelarena-vitacura": {
      nombre: "PadelArena Vitacura",
      comuna: "Vitacura", direccion: "Av. Vitacura 8800", telefono: "+56 2 2987 6543",
      whatsapp: "+56987654321", instagram: "@padelarena",
      rating: 4.5, reviews: 89, indoor: true, outdoor: true, canchas: 8,
      muro: "Cristal", cesped: "Césped sintético",
      servicios: ["Pro shop", "Vestuarios", "Estacionamiento", "Clases grupales"],
      descripcion: "8 canchas en Vitacura: 6 indoor y 2 outdoor con iluminación LED. La cancha outdoor es perfecta para el verano. Clases grupales todos los días.",
      franjas: [
        { tipo: "Valle", dias: "Lun–Vie", horario: "08:00–17:00", precio: 13000 },
        { tipo: "Prime", dias: "Lun–Vie", horario: "17:00–22:00", precio: 19000 },
        { tipo: "Fin de semana", dias: "Sáb–Dom", horario: "08:00–22:00", precio: 17000 },
      ],
      opiniones: [
        { autor: "Fernanda P.", rating: 5, fecha: "Abr 2026", texto: "Las canchas outdoor en verano son increíbles. Muy buen ambiente." },
        { autor: "Matías L.", rating: 4, fecha: "Mar 2026", texto: "Buena relación precio-calidad. El pro shop tiene buenas opciones." },
      ],
    },
    "padel-stadium-la-reina": {
      nombre: "Pádel Stadium La Reina",
      comuna: "La Reina", direccion: "Av. Larraín 5950", telefono: "+56 2 2765 4321",
      whatsapp: "+56976543210", instagram: "@padelstadiumpadelreina",
      rating: 4.6, reviews: 203, indoor: false, outdoor: true, canchas: 4,
      muro: "Cristal", cesped: "Césped sintético largo",
      servicios: ["Iluminación LED", "Vestuarios", "Estacionamiento"],
      descripcion: "4 canchas outdoor con iluminación LED potente. Las canchas más económicas de La Reina con buena calidad de superficie. Perfectas para jugar hasta las 23:00.",
      franjas: [
        { tipo: "Valle", dias: "Lun–Vie", horario: "08:00–17:00", precio: 11000 },
        { tipo: "Prime", dias: "Lun–Vie", horario: "17:00–23:00", precio: 17000 },
        { tipo: "Fin de semana", dias: "Sáb–Dom", horario: "08:00–23:00", precio: 15000 },
      ],
      opiniones: [
        { autor: "Pablo C.", rating: 5, fecha: "Abr 2026", texto: "La mejor relación calidad-precio de la zona. Las canchas están en buen estado." },
        { autor: "Ana G.", rating: 4, fecha: "Mar 2026", texto: "Buen iluminado para jugar de noche. Outdoor pero cómodo." },
      ],
    },
    "padelplay-nunoa": {
      nombre: "Padelplay Ñuñoa",
      comuna: "Ñuñoa", direccion: "Av. Irarrázaval 3300", telefono: "+56 2 2543 2100",
      whatsapp: "+56943210987", instagram: "@padelplaynunoa",
      rating: 4.4, reviews: 156, indoor: true, outdoor: false, canchas: 5,
      muro: "Cristal", cesped: "Césped sintético",
      servicios: ["Vestuarios", "Cafetería", "Clases particulares"],
      descripcion: "5 canchas indoor en Ñuñoa. El club más grande del sector oriente. Precios accesibles y buena frecuencia de clases para todos los niveles.",
      franjas: [
        { tipo: "Valle", dias: "Lun–Vie", horario: "08:00–17:00", precio: 10000 },
        { tipo: "Prime", dias: "Lun–Vie", horario: "17:00–22:00", precio: 16000 },
        { tipo: "Fin de semana", dias: "Sáb–Dom", horario: "08:00–22:00", precio: 14000 },
      ],
      opiniones: [
        { autor: "Sofía M.", rating: 4, fecha: "Abr 2026", texto: "Muy accesible en precio. Las canchas están limpias y bien mantenidas." },
        { autor: "Cristián B.", rating: 5, fecha: "Feb 2026", texto: "El mejor precio indoor de Ñuñoa. Nada más que pedir." },
      ],
    },
  },
};

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

type Props = { params: Promise<{ ciudad: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ciudad, slug } = await params;
  const club = clubesData[ciudad]?.[slug];
  if (!club) return {};
  return {
    title: `${club.nombre} — Precios y Reviews | tupadel`,
    description: `${club.canchas} canchas de pádel en ${club.comuna}. Precio desde ${formatPrice(Math.min(...club.franjas.map(f => f.precio)))}/h. ${club.indoor ? "Indoor" : ""}${club.outdoor ? " Outdoor" : ""}. ★ ${club.rating} (${club.reviews} reseñas).`,
  };
}

export default async function ClubPage({ params }: Props) {
  const { ciudad, slug } = await params;
  const club = clubesData[ciudad]?.[slug];
  if (!club) notFound();

  const precioMin = Math.min(...club.franjas.map(f => f.precio));
  const precioMax = Math.max(...club.franjas.map(f => f.precio));

  return (
    <>
      <Navbar activeSection="/canchas" />
      <main>
        {/* Breadcrumb */}
        <div className="px-6 md:px-8 py-2.5 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto mono text-xs text-ink-soft">
            <Link href="/canchas" className="hover:text-ink">Canchas</Link>
            {" · "}
            <Link href={`/canchas/${ciudad}`} className="hover:text-ink capitalize">{ciudad.replace("-", " ")}</Link>
            {" · "}
            {club.nombre}
          </div>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-8 py-10 md:py-12 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Imagen / mapa placeholder */}
          <div className="md:col-span-5">
            <div className="aspect-[4/3] bg-gradient-to-br from-canvas-warm to-canvas-dim rounded-2xl border border-line flex items-center justify-center relative overflow-hidden">
              {/* Court diagram */}
              <div className="w-48 h-32 border-2 border-ink rounded relative bg-[#ECFCCB]/30">
                <div className="absolute inset-x-0 top-1/2 h-px bg-ink" />
                <div className="absolute inset-y-0 left-1/2 w-px bg-ink" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-ink rounded-full" />
              </div>
              <div className="absolute top-3 left-3 flex gap-1.5">
                {club.indoor && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-canvas border border-line font-medium">Indoor</span>}
                {club.outdoor && <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-canvas border border-line font-medium">Outdoor</span>}
              </div>
              <div className="absolute bottom-3 right-3 mono text-[10px] text-ink-soft">{club.canchas} canchas</div>
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-7">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <h1 className="display text-3xl md:text-4xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
                  {club.nombre}
                </h1>
                <div className="mono text-xs text-ink-soft mt-2">
                  {club.comuna} · {club.direccion} · ★ {club.rating} ({club.reviews} reseñas)
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="mono text-2xl font-bold">{formatPrice(precioMin)}</div>
                <div className="mono text-[10px] text-ink-soft uppercase">/ hora · desde</div>
              </div>
            </div>

            <p className="text-ink-muted text-base leading-relaxed mt-3 mb-5">{club.descripcion}</p>

            {/* Servicios */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              <span className="inline-flex items-center px-2.5 py-1 rounded text-xs bg-canvas-dim font-medium">
                {club.muro}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded text-xs bg-canvas-dim font-medium">
                {club.cesped}
              </span>
              {club.servicios.map(s => (
                <span key={s} className="inline-flex items-center px-2.5 py-1 rounded text-xs bg-canvas-dim font-medium">{s}</span>
              ))}
            </div>

            {/* Precios por franja */}
            <div className="border border-line rounded-xl overflow-hidden mb-6">
              <div className="bg-canvas-warm border-b border-line px-4 py-2.5 mono text-[10px] uppercase tracking-wider text-ink-soft font-semibold">
                Precios por franja horaria
              </div>
              {club.franjas.map((f, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-line last:border-0 text-sm">
                  <div>
                    <span className="font-semibold">{f.tipo}</span>
                    <span className="text-ink-muted ml-2 text-xs">{f.dias} · {f.horario}</span>
                  </div>
                  <span className={`mono font-bold ${f.precio === precioMax ? "text-[#E8590C]" : f.precio === precioMin ? "text-[#7DB81E]" : ""}`}>
                    {formatPrice(f.precio)}<span className="text-ink-soft font-normal text-xs">/h</span>
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              {club.whatsapp && (
                <a
                  href={`https://wa.me/${club.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#A8E63A] text-[#0D1B2A] px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#7DB81E] transition-colors"
                >
                  Reservar por WhatsApp →
                </a>
              )}
              {club.telefono && (
                <a href={`tel:${club.telefono}`} className="border border-line px-5 py-3 rounded-lg font-medium text-sm hover:border-ink transition-colors">
                  {club.telefono}
                </a>
              )}
              {club.instagram && (
                <a
                  href={`https://instagram.com/${club.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-line px-5 py-3 rounded-lg font-medium text-sm hover:border-ink transition-colors"
                >
                  {club.instagram}
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Opiniones */}
        <section className="border-t border-line px-6 md:px-8 py-12 bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="mono text-xs uppercase tracking-wider text-ink-soft mb-1">→ Reseñas</div>
                <h2 className="display text-2xl font-semibold">
                  ★ {club.rating} · {club.reviews} opiniones
                </h2>
              </div>
              <button className="border border-line px-4 py-2 rounded-lg text-sm font-medium hover:border-ink transition-colors">
                + Dejar reseña
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {club.opiniones.map((op, i) => (
                <div key={i} className="border border-line rounded-xl p-5 bg-canvas">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A8E63A] to-[#0891B2] flex items-center justify-center text-white text-xs font-bold">
                        {op.autor[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{op.autor}</div>
                        <div className="mono text-[10px] text-ink-soft">{op.fecha}</div>
                      </div>
                    </div>
                    <div className="mono text-sm font-semibold">{"★".repeat(op.rating)}</div>
                  </div>
                  <p className="text-sm text-ink-muted leading-relaxed">{op.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ubicación */}
        <section className="border-t border-line px-6 md:px-8 py-10">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs uppercase tracking-wider text-ink-soft mb-4">→ Ubicación</div>
            <div className="bg-canvas-warm border border-line rounded-xl p-6 flex items-center gap-6">
              <div className="flex-1">
                <div className="display text-lg font-semibold mb-1">{club.direccion}, {club.comuna}</div>
                <div className="text-sm text-ink-muted">Santiago, Chile</div>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(club.direccion + ", " + club.comuna + ", Santiago")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line px-5 py-2.5 rounded-lg text-sm font-medium hover:border-ink transition-colors"
              >
                Ver en Google Maps →
              </a>
            </div>
          </div>
        </section>

        {/* Back */}
        <section className="border-t border-line px-6 md:px-8 py-6">
          <div className="max-w-[1400px] mx-auto">
            <Link href={`/canchas/${ciudad}`} className="text-sm font-medium text-ink-muted hover:text-ink transition-colors">
              ← Volver a canchas en {ciudad.charAt(0).toUpperCase() + ciudad.slice(1).replace("-", " ")}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
