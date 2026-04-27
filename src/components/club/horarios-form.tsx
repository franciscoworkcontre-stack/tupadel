"use client";

import { useState } from "react";

const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export function ClubHorariosForm({ clubId }: { clubId: string }) {
  const [form, setForm] = useState({ diaSemana: "1", horaInicio: "09:00", horaFin: "21:00", canchaNumero: "1", tipo: "regular", precioClp: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function update(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/club/horarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, diaSemana: parseInt(form.diaSemana), canchaNumero: parseInt(form.canchaNumero), precioClp: parseInt(form.precioClp) }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Error al guardar."); return; }
      setSuccess(true);
      setForm(f => ({ ...f, precioClp: "" }));
      setTimeout(() => { setSuccess(false); window.location.reload(); }, 1500);
    } catch {
      setError("Error de conexión.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "border border-line rounded-lg px-3 py-2 text-sm bg-canvas focus:outline-none focus:border-ink transition-colors";

  return (
    <div>
      <h2 className="display text-xl font-semibold mb-4">Agregar franja horaria</h2>
      {error && <div className="text-sm text-[#E8590C] bg-[#FFE4D1] border border-[#E8590C]/20 rounded-lg px-4 py-3 mb-4">{error}</div>}
      {success && <div className="text-sm text-[#65A30D] bg-[#ECFCCB] border border-[#65A30D]/20 rounded-lg px-4 py-3 mb-4">✓ Horario guardado</div>}
      <form onSubmit={handleSubmit} className="border border-line rounded-xl p-5 bg-canvas space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5">Día</label>
            <select className={`w-full ${inputClass}`} value={form.diaSemana} onChange={e => update("diaSemana", e.target.value)}>
              {dias.map((d, i) => <option key={i} value={i}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5">Cancha #</label>
            <input type="number" min="1" max="20" className={`w-full ${inputClass}`} value={form.canchaNumero} onChange={e => update("canchaNumero", e.target.value)} />
          </div>
          <div>
            <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5">Tipo</label>
            <select className={`w-full ${inputClass}`} value={form.tipo} onChange={e => update("tipo", e.target.value)}>
              <option value="regular">Regular</option>
              <option value="prime">Prime</option>
              <option value="nocturno">Nocturno</option>
            </select>
          </div>
          <div>
            <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5">Desde</label>
            <input type="time" className={`w-full ${inputClass}`} value={form.horaInicio} onChange={e => update("horaInicio", e.target.value)} />
          </div>
          <div>
            <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5">Hasta</label>
            <input type="time" className={`w-full ${inputClass}`} value={form.horaFin} onChange={e => update("horaFin", e.target.value)} />
          </div>
          <div>
            <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5">Precio / hora (CLP)</label>
            <input type="number" min="0" step="500" className={`w-full ${inputClass}`} value={form.precioClp} onChange={e => update("precioClp", e.target.value)} required placeholder="15000" />
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="bg-[#A8E63A] text-[#0D1B2A] px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#7DB81E] transition-colors disabled:opacity-60">
          {loading ? "Guardando..." : "Agregar franja →"}
        </button>
      </form>
    </div>
  );
}
