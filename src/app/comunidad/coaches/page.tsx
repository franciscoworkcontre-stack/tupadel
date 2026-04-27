import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coaches de Pádel en Chile — Pulso Pádel",
  description: "Encontrá el coach de pádel ideal para tu nivel. Clases particulares y grupales en Santiago y todo Chile.",
};

const coaches = [
  {
    slug: "martin-garcia",
    nombre: "Martín García",
    ciudad: "Santiago",
    certificaciones: ["FEP Nivel 2", "PadelFIT"],
    nivelesQueTrabaja: [3, 4, 5, 6],
    modalidades: ["individual", "pareja", "grupal"],
    precioHoraClp: 35000,
    rating: 4.9,
    totalAlumnos: 48,
    destacado: true,
    bio: "Ex jugador de circuito nacional. Especialista en técnica y corrección de errores en niveles intermedios.",
  },
  {
    slug: "carolina-vidal",
    nombre: "Carolina Vidal",
    ciudad: "Santiago",
    certificaciones: ["RFEP Nivel 1"],
    nivelesQueTrabaja: [4, 5, 6],
    modalidades: ["individual", "grupal"],
    precioHoraClp: 28000,
    rating: 4.8,
    totalAlumnos: 35,
    destacado: true,
    bio: "Especialista en iniciación y jugadoras de nivel intermedio. Método progresivo y dinámico.",
  },
  {
    slug: "rodrigo-silva",
    nombre: "Rodrigo Silva",
    ciudad: "Santiago",
    certificaciones: ["FEP Nivel 3"],
    nivelesQueTrabaja: [1, 2, 3],
    modalidades: ["individual", "pareja"],
    precioHoraClp: 55000,
    rating: 5.0,
    totalAlumnos: 22,
    destacado: false,
    bio: "Coach de alto rendimiento. Ha preparado equipos para A1 Padel y Premier Padel.",
  },
  {
    slug: "sofia-morales",
    nombre: "Sofía Morales",
    ciudad: "Valparaíso",
    certificaciones: ["RFEP Nivel 1"],
    nivelesQueTrabaja: [4, 5, 6],
    modalidades: ["grupal"],
    precioHoraClp: 22000,
    rating: 4.7,
    totalAlumnos: 60,
    destacado: false,
    bio: "Entrenamientos grupales en Valparaíso. Ideal para comenzar o mejorar en ambiente divertido.",
  },
  {
    slug: "pablo-torres",
    nombre: "Pablo Torres",
    ciudad: "Santiago",
    certificaciones: ["PadelFIT", "FEP Nivel 2"],
    nivelesQueTrabaja: [2, 3, 4],
    modalidades: ["individual", "pareja", "grupal"],
    precioHoraClp: 40000,
    rating: 4.8,
    totalAlumnos: 41,
    destacado: false,
    bio: "Enfocado en táctica y estrategia de dobles. Ex top 50 ranking nacional.",
  },
];

const catColors: Record<number, string> = {
  1: "#DC2626", 2: "#EA580C", 3: "#D97706", 4: "#65A30D", 5: "#0891B2", 6: "#7C3AED",
};

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-CL");
}

export default function CoachesPage() {
  const destacados = coaches.filter(c => c.destacado);
  const resto = coaches.filter(c => !c.destacado);

  return (
    <>
      <Navbar activeSection="/comunidad/buscar-companero" />
      <main>
        <section className="px-6 md:px-8 py-10 md:py-14 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Directorio de coaches</div>
            <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>Coaches</h1>
            <p className="text-ink-muted text-xl mt-4 max-w-2xl leading-relaxed">
              Encontrá el profe ideal para tu nivel y ciudad. Clases individuales, en pareja o grupales.
            </p>
            <div className="flex items-center gap-3 mt-7 flex-wrap">
              {["Todos", "Santiago", "Valparaíso", "Concepción"].map(f => (
                <button key={f} className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${f === "Todos" ? "bg-ink text-white border-ink" : "border-line hover:border-ink"}`}>
                  {f}
                </button>
              ))}
              <div className="flex-1" />
              <select className="border border-line rounded-lg px-3 py-2 text-sm bg-canvas">
                <option>Todos los niveles</option>
                {[1,2,3,4,5,6].map(n => <option key={n}>Cat {n}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Destacados */}
        {destacados.length > 0 && (
          <section className="px-6 md:px-8 py-10 border-b border-line max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-5">→ Coaches destacados</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {destacados.map(c => (
                <div key={c.slug} className="border-2 border-[#A8E63A] rounded-2xl p-6 bg-canvas relative">
                  <span className="absolute top-4 right-4 bg-[#A8E63A] text-[#0D1B2A] text-[10px] font-bold px-2 py-0.5 rounded-full mono uppercase">Destacado</span>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0D1B2A] to-[#1a2f47] flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      {c.nombre.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="display text-xl font-semibold">{c.nombre}</h3>
                      <div className="mono text-xs text-ink-muted mt-0.5">{c.ciudad}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[#D97706]">{"★".repeat(Math.floor(c.rating))}</span>
                        <span className="mono text-xs font-semibold">{c.rating.toFixed(1)}</span>
                        <span className="text-xs text-ink-muted">({c.totalAlumnos} alumnos)</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-ink-muted mt-4 leading-relaxed">{c.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.nivelesQueTrabaja.map(n => (
                      <span key={n} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-line text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: catColors[n] }} />
                        Cat {n}
                      </span>
                    ))}
                    {c.modalidades.map(m => (
                      <span key={m} className="px-2 py-0.5 rounded-full border border-line text-[11px] capitalize">{m}</span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <div className="mono text-xs text-ink-soft uppercase">Precio/hora</div>
                      <div className="mono font-semibold">{formatPrice(c.precioHoraClp)}</div>
                    </div>
                    <button className="bg-[#A8E63A] text-[#0D1B2A] px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#7DB81E] transition-colors">
                      Contactar →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Resto */}
        <section className="px-6 md:px-8 py-10 max-w-[1400px] mx-auto">
          <div className="mono text-xs text-ink-soft uppercase tracking-wider mb-5">→ Todos los coaches</div>
          <div className="space-y-4">
            {resto.map(c => (
              <div key={c.slug} className="border border-line rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0D1B2A] to-[#1a2f47] flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {c.nombre.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="display font-semibold text-lg">{c.nombre}</h3>
                      <div className="mono text-xs text-ink-muted">{c.ciudad} · {c.certificaciones.join(", ")}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="mono font-semibold text-sm">{formatPrice(c.precioHoraClp)}/h</div>
                      <div className="mono text-xs text-ink-muted">{c.rating.toFixed(1)} ★</div>
                    </div>
                  </div>
                  <p className="text-sm text-ink-muted mt-2">{c.bio}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.nivelesQueTrabaja.map(n => (
                      <span key={n} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-line text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: catColors[n] }} />
                        Cat {n}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="border border-[#A8E63A] text-[#7DB81E] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#ECFCCB]/30 transition-colors flex-shrink-0">
                  Contactar →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA para coaches */}
        <section className="border-t border-line px-6 md:px-8 py-12 bg-canvas-warm">
          <div className="max-w-xl mx-auto text-center">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-3">→ ¿Sos coach?</div>
            <h2 className="display text-3xl font-semibold mb-3" style={{ letterSpacing: "-0.02em" }}>Sumá tu perfil al directorio</h2>
            <p className="text-ink-muted mb-6">Gratis para coaches certificados. Llegá a miles de jugadores en Chile y LATAM.</p>
            <button className="bg-[#0D1B2A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a2f47] transition-colors">
              Publicar mi perfil →
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
