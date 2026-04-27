"use client";

import { useState } from "react";

type Edicion = { id: string; nombre: string };

export function RetiroInquiryForm({ retiroId, ediciones }: { retiroId: string; ediciones: Edicion[] }) {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", edicionId: ediciones[0]?.id ?? "", participantes: "1", mensaje: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function update(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/retiros/consulta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, retiroId }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setSent(true);
    } catch {
      setError("Error al enviar la consulta. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="border border-[#65A30D]/30 bg-[#ECFCCB]/30 rounded-xl p-6 text-center">
        <div className="text-2xl mb-2">✓</div>
        <div className="display text-xl font-semibold mb-1">¡Consulta enviada!</div>
        <p className="text-ink-muted text-sm">El organizador te responderá en menos de 24 horas al email que indicaste.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line rounded-xl p-6 bg-canvas space-y-4">
      {error && <div className="text-sm text-[#E8590C] bg-[#FFE4D1] border border-[#E8590C]/20 rounded-lg px-4 py-3">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5">Nombre *</label>
          <input type="text" value={form.nombre} onChange={e => update("nombre", e.target.value)} required placeholder="Tu nombre"
            className="w-full border border-line rounded-lg px-4 py-2.5 text-sm bg-canvas focus:outline-none focus:border-ink transition-colors" />
        </div>
        <div>
          <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5">Email *</label>
          <input type="email" value={form.email} onChange={e => update("email", e.target.value)} required placeholder="tu@email.com"
            className="w-full border border-line rounded-lg px-4 py-2.5 text-sm bg-canvas focus:outline-none focus:border-ink transition-colors" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5">Teléfono / WhatsApp</label>
          <input type="tel" value={form.telefono} onChange={e => update("telefono", e.target.value)} placeholder="+56 9 XXXX XXXX"
            className="w-full border border-line rounded-lg px-4 py-2.5 text-sm bg-canvas focus:outline-none focus:border-ink transition-colors" />
        </div>
        <div>
          <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5">Participantes</label>
          <select value={form.participantes} onChange={e => update("participantes", e.target.value)}
            className="w-full border border-line rounded-lg px-4 py-2.5 text-sm bg-canvas focus:outline-none focus:border-ink transition-colors">
            {[1,2,3,4].map(n => <option key={n} value={n}>{n} persona{n > 1 ? "s" : ""}</option>)}
          </select>
        </div>
      </div>

      {ediciones.length > 0 && (
        <div>
          <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5">Fecha de interés</label>
          <select value={form.edicionId} onChange={e => update("edicionId", e.target.value)}
            className="w-full border border-line rounded-lg px-4 py-2.5 text-sm bg-canvas focus:outline-none focus:border-ink transition-colors">
            {ediciones.map(ed => <option key={ed.id} value={ed.id}>{ed.nombre}</option>)}
          </select>
        </div>
      )}

      <div>
        <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5">Mensaje</label>
        <textarea value={form.mensaje} onChange={e => update("mensaje", e.target.value)} rows={3} placeholder="Preguntá lo que quieras..."
          className="w-full border border-line rounded-lg px-4 py-2.5 text-sm bg-canvas focus:outline-none focus:border-ink transition-colors resize-none" />
      </div>

      <button type="submit" disabled={loading}
        className="w-full bg-ink text-white py-3 rounded-lg font-semibold text-sm hover:bg-ink-muted transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? "Enviando..." : "Enviar consulta →"}
      </button>

      <p className="text-xs text-ink-soft text-center">Sin compromiso. El organizador te responde directo.</p>
    </form>
  );
}
