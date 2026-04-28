export const dynamic = "force-dynamic";
"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { useRouter } from "next/navigation";

const PASOS = ["Datos básicos", "Credenciales", "Competencia", "Precios", "Disponibilidad", "Perfil público"];

const ESPECIALIDADES = [
  { value: "iniciacion_adulta", label: "Iniciación adulta" },
  { value: "juego_femenino", label: "Juego femenino" },
  { value: "ninos", label: "Niños / juveniles" },
  { value: "vibora", label: "Víbora" },
  { value: "tactica", label: "Táctica" },
  { value: "mental_game", label: "Mental game" },
  { value: "preparacion_fisica", label: "Preparación física" },
  { value: "tecnica_avanzada", label: "Técnica avanzada" },
  { value: "transicion_competitiva", label: "Transición competitiva" },
];

const MODALIDADES = [
  { value: "individual", label: "Individual" },
  { value: "pareja", label: "En pareja" },
  { value: "grupo_3_4", label: "Grupo 3–4" },
  { value: "clinica", label: "Clínica" },
  { value: "intensivo_fin_de_semana", label: "Intensivo fin de semana" },
  { value: "online_video_analisis", label: "Online / video análisis" },
];

const CERTIFICACIONES = ["FAP", "RFEP", "RPT", "AAP", "FUP", "Otra"];

type FormData = {
  // Paso 1
  nombre: string; apellido: string; ciudad: string; comuna: string; pais: string;
  genero: string; idiomas: string[]; anosExperiencia: string;
  // Paso 2
  certificaciones: string[]; exJugadorPro: boolean; exJugadorProCircuito: string;
  // Paso 3
  categoriasQueEnsena: number[]; especialidades: string[]; modalidades: string[];
  atiendeOnline: boolean;
  // Paso 4
  precioIndividual60min: string; precioPareja60min: string; precioGrupo60min: string;
  permitePaquetes: boolean; descuentoPaquete10Pct: string; monedaBase: string;
  // Paso 5
  disponibilidadJson: string; radioDesplazamientoKm: string;
  // Paso 6
  bioCorta: string; bioMd: string; metodologiaMd: string; whatsapp: string;
  instagram: string; email: string;
};

const FORM_INICIAL: FormData = {
  nombre: "", apellido: "", ciudad: "", comuna: "", pais: "CL",
  genero: "no_declarado", idiomas: ["es"], anosExperiencia: "",
  certificaciones: [], exJugadorPro: false, exJugadorProCircuito: "",
  categoriasQueEnsena: [], especialidades: [], modalidades: [],
  atiendeOnline: false,
  precioIndividual60min: "", precioPareja60min: "", precioGrupo60min: "",
  permitePaquetes: false, descuentoPaquete10Pct: "", monedaBase: "CLP",
  disponibilidadJson: "", radioDesplazamientoKm: "15",
  bioCorta: "", bioMd: "", metodologiaMd: "", whatsapp: "",
  instagram: "", email: "",
};

export default function OnboardingPage() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [form, setForm] = useState<FormData>(FORM_INICIAL);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleArr<T>(field: keyof FormData, val: T) {
    const arr = form[field] as T[];
    const next = arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
    setForm((f) => ({ ...f, [field]: next }));
  }

  async function guardarPaso() {
    setGuardando(true);
    setError("");
    try {
      const res = await fetch("/api/profe/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paso, form }),
      });
      if (!res.ok) throw new Error("Error al guardar");
      if (paso < PASOS.length - 1) {
        setPaso(paso + 1);
      } else {
        router.push("/profe?alta=ok");
      }
    } catch {
      setError("Hubo un error al guardar. Intentá de nuevo.");
    } finally {
      setGuardando(false);
    }
  }

  const catColors: Record<number, string> = {
    1: "#DC2626", 2: "#EA580C", 3: "#D97706", 4: "#65A30D", 5: "#0891B2", 6: "#7C3AED",
  };

  return (
    <>
      <Navbar />
      <main className="px-6 md:px-8 py-10 max-w-[680px] mx-auto">
        <div className="mb-8">
          <Link href="/profes" className="mono text-xs text-ink-muted hover:text-ink transition-colors">← Volver al directorio</Link>
          <h1 className="display text-3xl font-semibold mt-4 mb-1" style={{ letterSpacing: "-0.02em" }}>Alta como profe</h1>
          <p className="text-ink-muted text-sm">Listing gratuito. Verificación en 48h. Sin comisiones por contacto.</p>
        </div>

        {/* Stepper */}
        <div className="flex gap-1.5 mb-8">
          {PASOS.map((p, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full flex-1 transition-colors ${i <= paso ? "bg-[#A8E63A]" : "bg-line"}`}
            />
          ))}
        </div>
        <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-1">Paso {paso + 1} de {PASOS.length}</div>
        <h2 className="display text-xl font-semibold mb-6">{PASOS[paso]}</h2>

        {/* Paso 1: Datos básicos */}
        {paso === 0 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nombre *">
                <input required className={input} value={form.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Juan" />
              </Field>
              <Field label="Apellido *">
                <input required className={input} value={form.apellido} onChange={(e) => set("apellido", e.target.value)} placeholder="Pérez" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Ciudad *">
                <input required className={input} value={form.ciudad} onChange={(e) => set("ciudad", e.target.value)} placeholder="Santiago" />
              </Field>
              <Field label="Comuna">
                <input className={input} value={form.comuna} onChange={(e) => set("comuna", e.target.value)} placeholder="Providencia" />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="País *">
                <select className={input} value={form.pais} onChange={(e) => set("pais", e.target.value)}>
                  <option value="CL">Chile</option>
                  <option value="AR">Argentina</option>
                  <option value="UY">Uruguay</option>
                  <option value="PE">Perú</option>
                  <option value="MX">México</option>
                </select>
              </Field>
              <Field label="Género">
                <select className={input} value={form.genero} onChange={(e) => set("genero", e.target.value)}>
                  <option value="no_declarado">Prefiero no decir</option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                  <option value="no_binario">No binario</option>
                </select>
              </Field>
            </div>
            <Field label="Años de experiencia enseñando *">
              <input type="number" min="0" max="50" className={input} value={form.anosExperiencia} onChange={(e) => set("anosExperiencia", e.target.value)} placeholder="5" />
            </Field>
            <Field label="Idiomas de clase">
              <div className="flex gap-3">
                {["es", "en", "pt"].map((i) => (
                  <label key={i} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="checkbox" checked={form.idiomas.includes(i)} onChange={() => toggleArr("idiomas", i)} />
                    {i === "es" ? "Español" : i === "en" ? "Inglés" : "Portugués"}
                  </label>
                ))}
              </div>
            </Field>
          </div>
        )}

        {/* Paso 2: Credenciales */}
        {paso === 1 && (
          <div className="space-y-5">
            <Field label="Certificaciones (seleccioná las que tenés)">
              <div className="flex flex-wrap gap-2">
                {CERTIFICACIONES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleArr("certificaciones", c)}
                    className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${form.certificaciones.includes(c) ? "bg-[#0D1B2A] text-white border-[#0D1B2A]" : "border-line text-ink-muted hover:border-ink-muted"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.exJugadorPro} onChange={(e) => set("exJugadorPro", e.target.checked)} />
                <div>
                  <div className="font-medium text-sm">Ex-jugador / ex-jugadora profesional</div>
                  <div className="text-xs text-ink-muted">Activá si competiste en circuito nacional o internacional</div>
                </div>
              </label>
            </Field>
            {form.exJugadorPro && (
              <Field label="Circuito donde competiste">
                <input className={input} value={form.exJugadorProCircuito} onChange={(e) => set("exJugadorProCircuito", e.target.value)} placeholder="FPCH, WPT, A1 Padel, Premier Padel..." />
              </Field>
            )}
            <div className="p-4 border border-line rounded-xl bg-canvas-warm text-sm text-ink-muted leading-relaxed">
              <strong className="text-ink">Verificación:</strong> Vamos a revisar tus credenciales en 24–48h. Sin verificación tu perfil no aparece en el directorio. Podés subir una foto de tu certificación más adelante desde el perfil.
            </div>
          </div>
        )}

        {/* Paso 3: Competencia */}
        {paso === 2 && (
          <div className="space-y-6">
            <Field label="Categorías que enseñás (seleccioná todas)">
              <div className="flex gap-2 flex-wrap">
                {[6, 5, 4, 3, 2, 1].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleArr("categoriasQueEnsena", c)}
                    className={`w-11 h-11 rounded-full font-bold text-sm transition-all ${form.categoriasQueEnsena.includes(c) ? "text-white scale-110" : "text-white/60 opacity-40 hover:opacity-70"}`}
                    style={{ backgroundColor: catColors[c] }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Especialidades">
              <div className="flex flex-wrap gap-2">
                {ESPECIALIDADES.map((e) => (
                  <button
                    key={e.value}
                    type="button"
                    onClick={() => toggleArr("especialidades", e.value)}
                    className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${form.especialidades.includes(e.value) ? "bg-[#0D1B2A] text-white border-[#0D1B2A]" : "border-line text-ink-muted hover:border-ink-muted"}`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Modalidades que ofrecés">
              <div className="flex flex-wrap gap-2">
                {MODALIDADES.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => toggleArr("modalidades", m.value)}
                    className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${form.modalidades.includes(m.value) ? "bg-[#0D1B2A] text-white border-[#0D1B2A]" : "border-line text-ink-muted hover:border-ink-muted"}`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </Field>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.atiendeOnline} onChange={(e) => set("atiendeOnline", e.target.checked)} />
              <div>
                <div className="font-medium text-sm">Doy clases online o hago video análisis remoto</div>
                <div className="text-xs text-ink-muted">Aparecés en el listado de profes online</div>
              </div>
            </label>
          </div>
        )}

        {/* Paso 4: Precios */}
        {paso === 3 && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Individual 60 min">
                <input type="number" className={input} value={form.precioIndividual60min} onChange={(e) => set("precioIndividual60min", e.target.value)} placeholder="45000" />
              </Field>
              <Field label="En pareja 60 min (por persona)">
                <input type="number" className={input} value={form.precioPareja60min} onChange={(e) => set("precioPareja60min", e.target.value)} placeholder="30000" />
              </Field>
              <Field label="Grupo 3-4 (por persona)">
                <input type="number" className={input} value={form.precioGrupo60min} onChange={(e) => set("precioGrupo60min", e.target.value)} placeholder="22000" />
              </Field>
              <Field label="Moneda">
                <select className={input} value={form.monedaBase} onChange={(e) => set("monedaBase", e.target.value)}>
                  <option value="CLP">CLP (pesos chilenos)</option>
                  <option value="ARS">ARS (pesos argentinos)</option>
                  <option value="UYU">UYU (pesos uruguayos)</option>
                  <option value="USD">USD</option>
                </select>
              </Field>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.permitePaquetes} onChange={(e) => set("permitePaquetes", e.target.checked)} />
              <div className="text-sm font-medium">Ofrezco paquetes de 10 clases con descuento</div>
            </label>
            {form.permitePaquetes && (
              <Field label="% de descuento en paquete 10 clases">
                <input type="number" min="5" max="50" className={input} value={form.descuentoPaquete10Pct} onChange={(e) => set("descuentoPaquete10Pct", e.target.value)} placeholder="15" />
              </Field>
            )}
          </div>
        )}

        {/* Paso 5: Disponibilidad */}
        {paso === 4 && (
          <div className="space-y-5">
            <Field label="Radio de desplazamiento (km)">
              <input type="number" min="0" max="100" className={input} value={form.radioDesplazamientoKm} onChange={(e) => set("radioDesplazamientoKm", e.target.value)} />
              <div className="text-xs text-ink-muted mt-1">¿Hasta qué distancia te desplazás para dar clases?</div>
            </Field>
            <Field label="Horarios típicos (describí tu disponibilidad semanal)">
              <textarea
                rows={5}
                className={`${input} resize-none`}
                value={form.disponibilidadJson}
                onChange={(e) => set("disponibilidadJson", e.target.value)}
                placeholder="Ej: Lunes a viernes de 8:00 a 12:00 y 17:00 a 21:00. Sábados de 8:00 a 14:00. Domingo libre."
              />
              <div className="text-xs text-ink-muted mt-1">En el próximo paso podrás definir slots específicos desde el dashboard.</div>
            </Field>
          </div>
        )}

        {/* Paso 6: Perfil público */}
        {paso === 5 && (
          <div className="space-y-5">
            <Field label="Bio corta (máx. 200 caracteres) *">
              <textarea
                rows={3}
                maxLength={300}
                className={`${input} resize-none`}
                value={form.bioCorta}
                onChange={(e) => set("bioCorta", e.target.value)}
                placeholder="Profe certificado FAP. 8 años formando jugadores de Cat 5 a Cat 2 en Santiago."
              />
              <div className="text-xs text-ink-muted mt-1">{form.bioCorta.length}/300 caracteres</div>
            </Field>
            <Field label="Bio larga (contá tu historia)">
              <textarea
                rows={6}
                className={`${input} resize-none`}
                value={form.bioMd}
                onChange={(e) => set("bioMd", e.target.value)}
                placeholder="¿Cómo empezaste en el pádel? ¿Qué te llevó a enseñar? ¿Qué hacés diferente?"
              />
            </Field>
            <Field label="Tu metodología">
              <textarea
                rows={4}
                className={`${input} resize-none`}
                value={form.metodologiaMd}
                onChange={(e) => set("metodologiaMd", e.target.value)}
                placeholder="¿Cómo es una clase típica con vos? ¿Qué herramientas usás? ¿Cómo medís el progreso?"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="WhatsApp">
                <input className={input} value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="+56 9 1234 5678" />
              </Field>
              <Field label="Instagram">
                <input className={input} value={form.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="@tuperfil" />
              </Field>
            </div>
            <Field label="Email de contacto">
              <input type="email" className={input} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="tu@email.com" />
            </Field>
          </div>
        )}

        {error && <div className="text-red-600 text-sm mt-4">{error}</div>}

        {/* Navegación */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-line">
          {paso > 0 ? (
            <button onClick={() => setPaso(paso - 1)} className="border border-line px-5 py-2.5 rounded-lg text-sm hover:border-ink-muted transition-colors">
              ← Anterior
            </button>
          ) : <div />}
          <button
            onClick={guardarPaso}
            disabled={guardando}
            className="bg-[#0D1B2A] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#1a2f47] transition-colors disabled:opacity-50"
          >
            {guardando ? "Guardando..." : paso === PASOS.length - 1 ? "Enviar para revisión →" : "Siguiente →"}
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

const input = "w-full border border-line rounded-lg px-4 py-2.5 text-sm bg-canvas focus:outline-none focus:border-ink-muted";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      {label && <label className="mono text-[10px] text-ink-soft uppercase tracking-widest block mb-2">{label}</label>}
      {children}
    </div>
  );
}
