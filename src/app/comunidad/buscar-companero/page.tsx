"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";

type Jugador = {
  id: string;
  nombre: string;
  cat: number;
  ciudad: string;
  zona: string;
  disponibilidad: string[];
  nivel_busca: string;
  estilo: string;
  foto: string;
  miembro_desde: string;
  partidos: number;
};

const catColors: Record<number, string> = {
  1: "#DC2626", 2: "#EA580C", 3: "#D97706", 4: "#65A30D", 5: "#0891B2", 6: "#7C3AED",
};

const jugadores: Jugador[] = [
  { id: "1", nombre: "Martín R.", cat: 4, ciudad: "Santiago", zona: "Ñuñoa / Providencia", disponibilidad: ["Lunes tarde", "Miércoles tarde", "Sábado mañana"], nivel_busca: "Cat 3–5", estilo: "Equilibrado", foto: "MR", miembro_desde: "Ene 2025", partidos: 34 },
  { id: "2", nombre: "Sofía L.", cat: 5, ciudad: "Santiago", zona: "Las Condes / Vitacura", disponibilidad: ["Martes tarde", "Jueves tarde"], nivel_busca: "Cat 4–6", estilo: "Control", foto: "SL", miembro_desde: "Mar 2025", partidos: 18 },
  { id: "3", nombre: "Diego V.", cat: 3, ciudad: "Santiago", zona: "San Borja / Centro", disponibilidad: ["Sábado todo el día", "Domingo mañana"], nivel_busca: "Cat 2–4", estilo: "Potencia", foto: "DV", miembro_desde: "Oct 2024", partidos: 67 },
  { id: "4", nombre: "Camila F.", cat: 5, ciudad: "Concepción", zona: "Barrio Universitario", disponibilidad: ["Lunes y miércoles tarde", "Sábado mañana"], nivel_busca: "Cat 4–6", estilo: "Equilibrado", foto: "CF", miembro_desde: "Feb 2025", partidos: 22 },
  { id: "5", nombre: "Andrés M.", cat: 2, ciudad: "Santiago", zona: "Vitacura / Las Condes", disponibilidad: ["Martes mañana", "Jueves mañana", "Sábado tarde"], nivel_busca: "Cat 1–3", estilo: "Potencia", foto: "AM", miembro_desde: "Jun 2024", partidos: 112 },
  { id: "6", nombre: "Valentina S.", cat: 4, ciudad: "Viña del Mar", zona: "Cerro Castillo / Recreo", disponibilidad: ["Viernes tarde", "Sábado todo el día"], nivel_busca: "Cat 3–5", estilo: "Control", foto: "VS", miembro_desde: "Dic 2024", partidos: 41 },
  { id: "7", nombre: "Felipe C.", cat: 3, ciudad: "Santiago", zona: "Maipú / Pudahuel", disponibilidad: ["Lunes tarde", "Miércoles tarde", "Domingo tarde"], nivel_busca: "Cat 2–4", estilo: "Equilibrado", foto: "FC", miembro_desde: "Sep 2024", partidos: 58 },
  { id: "8", nombre: "Isidora P.", cat: 6, ciudad: "Santiago", zona: "Peñalolén / La Florida", disponibilidad: ["Sábado mañana", "Domingo mañana"], nivel_busca: "Cat 5–6", estilo: "Control", foto: "IP", miembro_desde: "Abr 2025", partidos: 9 },
];

const ciudades = ["Todas", "Santiago", "Concepción", "Viña del Mar"];
const categorias = ["Todas", "Cat 6", "Cat 5", "Cat 4", "Cat 3", "Cat 2", "Cat 1"];

export default function BuscarCompaneroPage() {
  const [ciudad, setCiudad] = useState("Todas");
  const [cat, setCat] = useState("Todas");
  const [showForm, setShowForm] = useState(false);
  const [contactado, setContactado] = useState<string | null>(null);

  const filtrados = jugadores.filter(j => {
    if (ciudad !== "Todas" && j.ciudad !== ciudad) return false;
    if (cat !== "Todas" && `Cat ${j.cat}` !== cat) return false;
    return true;
  });

  return (
    <>
      <Navbar activeSection="/comunidad" />
      <main>
        {/* Hero */}
        <section className="px-6 md:px-8 py-10 md:py-14 border-b border-line bg-canvas-warm">
          <div className="max-w-[1400px] mx-auto">
            <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">→ Comunidad</div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="display text-5xl md:text-6xl font-semibold" style={{ letterSpacing: "-0.03em" }}>Buscar compañero</h1>
                <p className="text-ink-muted text-xl mt-4 max-w-xl leading-relaxed">
                  Encontrá jugadores de tu nivel y zona para practicar, armar punto o jugar torneos.
                </p>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="bg-[#A8E63A] text-[#0D1B2A] font-semibold px-6 py-3 rounded-xl flex-shrink-0 hover:bg-[#7DB81E] transition-colors"
              >
                + Publicar mi perfil
              </button>
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section className="border-b border-line bg-canvas px-6 md:px-8 py-4">
          <div className="max-w-[1400px] mx-auto flex flex-wrap gap-3 items-center">
            <span className="mono text-xs text-ink-soft">Filtrar por:</span>
            <div className="flex flex-wrap gap-2">
              {ciudades.map(c => (
                <button
                  key={c}
                  onClick={() => setCiudad(c)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${ciudad === c ? "bg-ink text-white border-ink" : "border-line hover:border-ink-muted"}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="w-px h-5 bg-line mx-1 hidden md:block" />
            <div className="flex flex-wrap gap-2">
              {categorias.map(c => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${cat === c ? "bg-ink text-white border-ink" : "border-line hover:border-ink-muted"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Resultados */}
        <section className="px-6 md:px-8 py-10 max-w-[1400px] mx-auto">
          <div className="mono text-xs text-ink-soft mb-6">{filtrados.length} jugadores encontrados</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtrados.map(j => (
              <div key={j.id} className="border border-line rounded-2xl p-6 bg-canvas flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0" style={{ backgroundColor: catColors[j.cat] }}>
                    {j.foto}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{j.nombre}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold text-white" style={{ backgroundColor: catColors[j.cat] }}>
                        Cat {j.cat}
                      </span>
                      <span className="text-sm text-ink-muted">{j.ciudad}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="mono text-lg font-bold text-ink">{j.partidos}</div>
                    <div className="mono text-[10px] text-ink-soft">partidos</div>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2">
                    <span className="text-ink-soft w-20 flex-shrink-0">Zona</span>
                    <span className="text-ink font-medium">{j.zona}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-ink-soft w-20 flex-shrink-0">Busca</span>
                    <span className="text-ink font-medium">{j.nivel_busca}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-ink-soft w-20 flex-shrink-0">Estilo</span>
                    <span className="text-ink font-medium">{j.estilo}</span>
                  </div>
                </div>

                {/* Disponibilidad */}
                <div>
                  <div className="mono text-[10px] text-ink-soft uppercase mb-2">Disponibilidad</div>
                  <div className="flex flex-wrap gap-1.5">
                    {j.disponibilidad.map(d => (
                      <span key={d} className="px-2 py-0.5 rounded bg-canvas-dim text-xs">{d}</span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                {contactado === j.id ? (
                  <div className="mt-auto py-2 rounded-lg bg-[#ECFCCB] text-[#A8E63A] text-center text-sm font-semibold">
                    ✓ Solicitud enviada
                  </div>
                ) : (
                  <button
                    onClick={() => setContactado(j.id)}
                    className="mt-auto border-2 border-[#A8E63A] text-[#A8E63A] font-semibold py-2 rounded-xl text-sm hover:bg-[#A8E63A] hover:text-white transition-colors"
                  >
                    Contactar
                  </button>
                )}
              </div>
            ))}
          </div>

          {filtrados.length === 0 && (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">🎾</div>
              <div className="font-semibold text-lg mb-2">No hay jugadores en esta zona todavía</div>
              <div className="text-ink-muted mb-6">Sé el primero en publicar tu perfil</div>
              <button
                onClick={() => setShowForm(true)}
                className="bg-[#A8E63A] text-[#0D1B2A] font-semibold px-6 py-3 rounded-xl hover:bg-[#7DB81E] transition-colors"
              >
                Publicar mi perfil
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Modal publicar */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-canvas rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="display text-2xl font-semibold">Publicar mi perfil</h2>
              <button onClick={() => setShowForm(false)} className="text-ink-soft hover:text-ink text-2xl leading-none">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mono text-xs text-ink-soft uppercase block mb-1.5">Nombre (se mostrará inicial del apellido)</label>
                <input className="w-full border border-line rounded-lg px-3 py-2 text-sm" placeholder="Ej: Martín R." />
              </div>
              <div>
                <label className="mono text-xs text-ink-soft uppercase block mb-1.5">Tu categoría</label>
                <select className="w-full border border-line rounded-lg px-3 py-2 text-sm bg-canvas">
                  {[6,5,4,3,2,1].map(c => <option key={c}>Cat {c}</option>)}
                </select>
              </div>
              <div>
                <label className="mono text-xs text-ink-soft uppercase block mb-1.5">Ciudad</label>
                <select className="w-full border border-line rounded-lg px-3 py-2 text-sm bg-canvas">
                  {["Santiago", "Concepción", "Viña del Mar", "Valparaíso", "Temuco", "Otra"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="mono text-xs text-ink-soft uppercase block mb-1.5">Zona / Barrio</label>
                <input className="w-full border border-line rounded-lg px-3 py-2 text-sm" placeholder="Ej: Providencia / Ñuñoa" />
              </div>
              <div>
                <label className="mono text-xs text-ink-soft uppercase block mb-1.5">Disponibilidad</label>
                <input className="w-full border border-line rounded-lg px-3 py-2 text-sm" placeholder="Ej: Martes y jueves tarde, sábado mañana" />
              </div>
              <div>
                <label className="mono text-xs text-ink-soft uppercase block mb-1.5">Email (no se mostrará públicamente)</label>
                <input type="email" className="w-full border border-line rounded-lg px-3 py-2 text-sm" placeholder="tu@email.com" />
              </div>
              <button
                onClick={() => { setShowForm(false); }}
                className="w-full bg-[#A8E63A] text-[#0D1B2A] font-semibold py-3 rounded-xl hover:bg-[#7DB81E] transition-colors mt-2"
              >
                Publicar perfil
              </button>
              <p className="text-xs text-ink-soft text-center">Tu email solo se usa para conectarte con interesados. No se muestra.</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
