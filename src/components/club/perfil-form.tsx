"use client";

import { useState } from "react";

type Club = {
  id: string;
  nombre: string;
  ciudad: string;
  comuna: string | null;
  direccion: string | null;
  telefono: string | null;
  whatsapp: string | null;
  instagram: string | null;
  website: string | null;
  indoor: boolean | null;
  outdoor: boolean | null;
  cantidadCanchas: number | null;
};

export function ClubPerfilForm({ club }: { club: Club }) {
  const [form, setForm] = useState({
    nombre: club.nombre,
    ciudad: club.ciudad,
    comuna: club.comuna ?? "",
    direccion: club.direccion ?? "",
    telefono: club.telefono ?? "",
    whatsapp: club.whatsapp ?? "",
    instagram: club.instagram ?? "",
    website: club.website ?? "",
    cantidadCanchas: String(club.cantidadCanchas ?? ""),
    indoor: club.indoor ?? false,
    outdoor: club.outdoor ?? false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function update(k: string, v: string | boolean) { setForm(f => ({ ...f, [k]: v })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/club/perfil", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, cantidadCanchas: parseInt(form.cantidadCanchas) || null }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Error al guardar."); return; }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Error de conexión.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full border border-line rounded-lg px-4 py-2.5 text-sm bg-canvas focus:outline-none focus:border-ink transition-colors";
  const labelClass = "mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="text-sm text-[#E8590C] bg-[#FFE4D1] border border-[#E8590C]/20 rounded-lg px-4 py-3">{error}</div>}
      {success && <div className="text-sm text-[#65A30D] bg-[#ECFCCB] border border-[#65A30D]/20 rounded-lg px-4 py-3">✓ Perfil actualizado</div>}

      <div className="border border-line rounded-xl p-5 bg-canvas space-y-4">
        <h3 className="font-semibold text-sm">Información básica</h3>
        <div>
          <label className={labelClass}>Nombre del club</label>
          <input className={inputClass} value={form.nombre} onChange={e => update("nombre", e.target.value)} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Ciudad</label>
            <input className={inputClass} value={form.ciudad} onChange={e => update("ciudad", e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>Comuna</label>
            <input className={inputClass} value={form.comuna} onChange={e => update("comuna", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Dirección</label>
          <input className={inputClass} value={form.direccion} onChange={e => update("direccion", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Cantidad de canchas</label>
          <input type="number" min="1" max="50" className={inputClass} value={form.cantidadCanchas} onChange={e => update("cantidadCanchas", e.target.value)} />
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.indoor} onChange={e => update("indoor", e.target.checked)} className="w-4 h-4 rounded" />
            <span className="text-sm">Indoor</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.outdoor} onChange={e => update("outdoor", e.target.checked)} className="w-4 h-4 rounded" />
            <span className="text-sm">Outdoor</span>
          </label>
        </div>
      </div>

      <div className="border border-line rounded-xl p-5 bg-canvas space-y-4">
        <h3 className="font-semibold text-sm">Contacto</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Teléfono</label>
            <input type="tel" className={inputClass} value={form.telefono} onChange={e => update("telefono", e.target.value)} placeholder="+56 2 XXXX XXXX" />
          </div>
          <div>
            <label className={labelClass}>WhatsApp</label>
            <input type="tel" className={inputClass} value={form.whatsapp} onChange={e => update("whatsapp", e.target.value)} placeholder="+56 9 XXXX XXXX" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Instagram</label>
          <div className="flex">
            <span className="border border-r-0 border-line rounded-l-lg px-3 py-2.5 text-sm text-ink-muted bg-canvas-warm">@</span>
            <input className="flex-1 border border-line rounded-r-lg px-4 py-2.5 text-sm bg-canvas focus:outline-none focus:border-ink transition-colors" value={form.instagram} onChange={e => update("instagram", e.target.value)} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Sitio web</label>
          <input type="url" className={inputClass} value={form.website} onChange={e => update("website", e.target.value)} placeholder="https://" />
        </div>
      </div>

      <button type="submit" disabled={loading}
        className="bg-[#A8E63A] text-[#0D1B2A] px-7 py-3 rounded-lg font-semibold text-sm hover:bg-[#7DB81E] transition-colors disabled:opacity-60">
        {loading ? "Guardando..." : "Guardar cambios →"}
      </button>
    </form>
  );
}
