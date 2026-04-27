"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OperadorOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nombreEmpresa: "", rut: "", descripcionMd: "", instagram: "", sitioWeb: "", telefono: "", paisBase: "CL",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/operador/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Error al guardar."); return; }
      router.push("/operador");
    } catch {
      setError("Error de conexión.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full border border-line rounded-lg px-4 py-2.5 text-sm bg-canvas focus:outline-none focus:border-ink transition-colors";
  const labelClass = "mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5";

  return (
    <div className="min-h-screen bg-canvas-warm flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        <Link href="/" className="mono text-sm font-semibold text-[#A8E63A] block mb-8">tupadel</Link>

        <div className="flex items-center gap-2 mb-6">
          {[1, 2].map(n => (
            <div key={n} className={`h-1 flex-1 rounded-full transition-colors ${step >= n ? "bg-[#A8E63A]" : "bg-line"}`} />
          ))}
        </div>

        <h1 className="display text-3xl font-semibold mb-1">Perfil de operador</h1>
        <p className="text-ink-muted text-sm mb-7">
          {step === 1 ? "Contanos sobre tu empresa u organización." : "¿Cómo pueden encontrarte?"}
        </p>

        {error && <div className="text-sm text-[#E8590C] bg-[#FFE4D1] border border-[#E8590C]/20 rounded-lg px-4 py-3 mb-5">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 bg-canvas border border-line rounded-2xl p-7">
          {step === 1 ? (
            <>
              <div>
                <label className={labelClass}>Nombre de empresa / organización *</label>
                <input className={inputClass} value={form.nombreEmpresa} onChange={e => update("nombreEmpresa", e.target.value)} required placeholder="Pádel Retiros SPA" />
              </div>
              <div>
                <label className={labelClass}>RUT (opcional)</label>
                <input className={inputClass} value={form.rut} onChange={e => update("rut", e.target.value)} placeholder="12.345.678-9" />
              </div>
              <div>
                <label className={labelClass}>País base</label>
                <select className={inputClass} value={form.paisBase} onChange={e => update("paisBase", e.target.value)}>
                  <option value="CL">Chile 🇨🇱</option>
                  <option value="AR">Argentina 🇦🇷</option>
                  <option value="CO">Colombia 🇨🇴</option>
                  <option value="PE">Perú 🇵🇪</option>
                  <option value="UY">Uruguay 🇺🇾</option>
                  <option value="MX">México 🇲🇽</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Descripción breve *</label>
                <textarea className={inputClass} value={form.descripcionMd} onChange={e => update("descripcionMd", e.target.value)} required rows={4} placeholder="Contá quiénes son, qué tipo de retiros organizan, qué los diferencia..." />
              </div>
              <button type="submit" className="w-full bg-[#0D1B2A] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#1a2f47] transition-colors">
                Continuar →
              </button>
            </>
          ) : (
            <>
              <div>
                <label className={labelClass}>Instagram</label>
                <div className="flex">
                  <span className="border border-r-0 border-line rounded-l-lg px-3 py-2.5 text-sm text-ink-muted bg-canvas-warm">@</span>
                  <input className="flex-1 border border-line rounded-r-lg px-4 py-2.5 text-sm bg-canvas focus:outline-none focus:border-ink transition-colors" value={form.instagram} onChange={e => update("instagram", e.target.value)} placeholder="tuoperadora" />
                </div>
              </div>
              <div>
                <label className={labelClass}>Sitio web</label>
                <input className={inputClass} value={form.sitioWeb} onChange={e => update("sitioWeb", e.target.value)} placeholder="https://tuempresa.cl" type="url" />
              </div>
              <div>
                <label className={labelClass}>Teléfono / WhatsApp</label>
                <input className={inputClass} value={form.telefono} onChange={e => update("telefono", e.target.value)} placeholder="+56 9 XXXX XXXX" type="tel" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(1)} className="flex-1 border border-line py-3 rounded-lg font-semibold text-sm hover:border-ink transition-colors">
                  ← Volver
                </button>
                <button type="submit" disabled={loading} className="flex-1 bg-[#A8E63A] text-[#0D1B2A] py-3 rounded-lg font-semibold text-sm hover:bg-[#7DB81E] transition-colors disabled:opacity-60">
                  {loading ? "Guardando..." : "Crear perfil →"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
