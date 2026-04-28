"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import { useParams } from "next/navigation";

const catLabels: Record<string, string> = {
  "6": "Cat 6 — Iniciación",
  "5": "Cat 5 — Intermedio bajo",
  "4": "Cat 4 — Intermedio",
  "3": "Cat 3 — Intermedio alto",
  "2": "Cat 2 — Avanzado",
  "1": "Cat 1 — Competitivo",
};

const modalidadesOpciones = [
  { value: "individual", label: "Individual" },
  { value: "pareja", label: "En pareja" },
  { value: "grupo_3_4", label: "Grupo 3-4" },
  { value: "clinica", label: "Clínica" },
  { value: "online_video_analisis", label: "Online / video análisis" },
];

export default function ContactarProfePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    categoriaAlumno: "",
    modalidadSolicitada: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    try {
      const res = await fetch(`/api/profes/${slug}/consulta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setEnviado(true);
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <>
        <Navbar activeSection="/profes" />
        <main className="min-h-[60vh] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-6">✓</div>
            <div className="display text-3xl font-semibold mb-3">Consulta enviada</div>
            <p className="text-ink-muted mb-8">El profe va a recibir tu mensaje y te responde pronto. Revisá tu email también.</p>
            <Link href={`/profes/${slug}`} className="border border-line px-6 py-3 rounded-lg text-sm font-medium hover:border-ink-muted transition-colors">
              Volver al perfil
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar activeSection="/profes" />
      <main className="px-6 md:px-8 py-10 max-w-[640px] mx-auto">
        <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-6">
          <Link href={`/profes/${slug}`} className="hover:text-ink transition-colors">← Perfil del profe</Link>
          <span className="mx-2">·</span>
          <span>Contactar</span>
        </div>
        <h1 className="display text-3xl font-semibold mb-2" style={{ letterSpacing: "-0.02em" }}>Enviá tu consulta</h1>
        <p className="text-ink-muted mb-8 text-sm leading-relaxed">
          El profe recibe tu mensaje y te responde. No hay intermediarios. La primera clase la coordinan directo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="mono text-[10px] text-ink-soft uppercase tracking-widest block mb-2">Tu nombre</label>
              <input
                required
                className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-canvas focus:outline-none focus:border-ink-muted"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Nombre y apellido"
              />
            </div>
            <div>
              <label className="mono text-[10px] text-ink-soft uppercase tracking-widest block mb-2">Email</label>
              <input
                required
                type="email"
                className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-canvas focus:outline-none focus:border-ink-muted"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="mono text-[10px] text-ink-soft uppercase tracking-widest block mb-2">WhatsApp / Teléfono <span className="text-ink-soft">(opcional)</span></label>
            <input
              className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-canvas focus:outline-none focus:border-ink-muted"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              placeholder="+56 9 1234 5678"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="mono text-[10px] text-ink-soft uppercase tracking-widest block mb-2">Tu categoría actual</label>
              <select
                className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-canvas focus:outline-none focus:border-ink-muted"
                value={form.categoriaAlumno}
                onChange={(e) => setForm({ ...form, categoriaAlumno: e.target.value })}
              >
                <option value="">No sé / no hice diagnóstico</option>
                {Object.entries(catLabels).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mono text-[10px] text-ink-soft uppercase tracking-widest block mb-2">Modalidad que buscás</label>
              <select
                className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-canvas focus:outline-none focus:border-ink-muted"
                value={form.modalidadSolicitada}
                onChange={(e) => setForm({ ...form, modalidadSolicitada: e.target.value })}
              >
                <option value="">Sin preferencia</option>
                {modalidadesOpciones.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mono text-[10px] text-ink-soft uppercase tracking-widest block mb-2">Mensaje</label>
            <textarea
              required
              rows={5}
              className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-canvas focus:outline-none focus:border-ink-muted resize-none"
              value={form.mensaje}
              onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
              placeholder="Contale en qué querés trabajar, cuándo podés, si tenés pareja de entrenamiento, etc."
            />
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="w-full bg-[#0D1B2A] text-white py-3.5 rounded-lg font-semibold hover:bg-[#1a2f47] transition-colors disabled:opacity-50"
          >
            {enviando ? "Enviando..." : "Enviar consulta →"}
          </button>
          <p className="text-xs text-ink-muted text-center">
            Al enviar, aceptás que compartimos tu contacto con el profe para coordinar la clase.
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
}
