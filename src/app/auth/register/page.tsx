"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { useState } from "react";

const ciudades = ["Santiago", "Valparaíso", "Concepción", "La Serena", "Antofagasta", "Temuco", "Otra"];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ nombre: "", email: "", password: "", ciudad: "", cat: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(k: string, v: string) {
    setForm(f => ({ ...f, [k]: v }));
  }

  async function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    setStep(2);
  }

  async function handleStep2(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password, nombre: form.nombre }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Error al crear cuenta."); return; }
      window.location.href = "/mi-padel";
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-canvas-warm flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <Link href="/" className="mb-10">
          <Logo />
        </Link>

        <div className="w-full max-w-md">
          <div className="bg-canvas border border-line rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              {[1, 2].map(n => (
                <div key={n} className={`h-1 flex-1 rounded-full transition-colors ${step >= n ? "bg-[#A8E63A]" : "bg-line"}`} />
              ))}
            </div>

            <h1 className="display text-3xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>
              {step === 1 ? "Crear cuenta" : "Tu perfil de juego"}
            </h1>
            <p className="text-ink-muted text-sm mb-7">
              {step === 1
                ? "Gratis. Sin tarjeta. Listo en 2 minutos."
                : "Opcional, pero te ayuda a personalizar tu experiencia."}
            </p>

            {error && (
              <div className="bg-[#FFE4D1] border border-[#E8590C]/30 text-[#E8590C] text-sm px-4 py-3 rounded-lg mb-5">
                {error}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleStep1} className="space-y-4">
                <div>
                  <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5">Nombre</label>
                  <input
                    type="text"
                    value={form.nombre}
                    onChange={e => update("nombre", e.target.value)}
                    required
                    placeholder="Francisco"
                    className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-canvas focus:outline-none focus:border-ink transition-colors"
                  />
                </div>
                <div>
                  <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => update("email", e.target.value)}
                    required
                    placeholder="tu@email.com"
                    className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-canvas focus:outline-none focus:border-ink transition-colors"
                  />
                </div>
                <div>
                  <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5">Contraseña</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={e => update("password", e.target.value)}
                    required
                    minLength={8}
                    placeholder="Mínimo 8 caracteres"
                    className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-canvas focus:outline-none focus:border-ink transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0D1B2A] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#1a2f47] transition-colors mt-2"
                >
                  Continuar →
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-line" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-canvas px-3 text-xs text-ink-muted">o continuá con</span>
                  </div>
                </div>

                <button type="button" className="w-full border border-line rounded-lg py-3 text-sm font-medium flex items-center justify-center gap-3 hover:border-ink-muted transition-colors">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continuar con Google
                </button>
              </form>
            ) : (
              <form onSubmit={handleStep2} className="space-y-4">
                <div>
                  <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-1.5">Ciudad</label>
                  <select
                    value={form.ciudad}
                    onChange={e => update("ciudad", e.target.value)}
                    className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-canvas focus:outline-none focus:border-ink transition-colors"
                  >
                    <option value="">Seleccioná tu ciudad</option>
                    {ciudades.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-2">Tu categoría estimada</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { n: "6", label: "Iniciación" },
                      { n: "5", label: "Intermedio bajo" },
                      { n: "4", label: "Intermedio" },
                      { n: "3", label: "Intermedio alto" },
                      { n: "2", label: "Avanzado" },
                      { n: "1", label: "Competitivo" },
                    ].map(c => (
                      <button
                        key={c.n}
                        type="button"
                        onClick={() => update("cat", c.n)}
                        className={`border rounded-lg p-2 text-center transition-colors ${
                          form.cat === c.n
                            ? "border-[#A8E63A] bg-[#ECFCCB]/50"
                            : "border-line hover:border-ink-muted"
                        }`}
                      >
                        <div className="mono text-base font-semibold">Cat {c.n}</div>
                        <div className="text-[10px] text-ink-muted">{c.label}</div>
                      </button>
                    ))}
                  </div>
                  <Link href="/diagnostico" className="block text-xs text-[#A8E63A] font-semibold mt-2">
                    ¿No sabés tu categoría? Hacer diagnóstico →
                  </Link>
                </div>
                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border border-line py-3 rounded-lg font-semibold text-sm hover:border-ink transition-colors"
                  >
                    ← Volver
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#A8E63A] text-[#0D1B2A] py-3 rounded-lg font-semibold text-sm hover:bg-[#7DB81E] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Creando cuenta..." : "Crear cuenta gratis"}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleStep2({ preventDefault: () => {} } as React.FormEvent)}
                  className="w-full text-xs text-ink-muted hover:text-ink transition-colors"
                >
                  Omitir por ahora
                </button>
              </form>
            )}
          </div>

          <p className="text-center text-sm text-ink-muted mt-5">
            ¿Ya tenés cuenta?{" "}
            <Link href="/auth/login" className="font-semibold text-ink hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>

      <footer className="py-6 text-center">
        <p className="text-xs text-ink-soft">
          Al crear tu cuenta aceptás los{" "}
          <Link href="/terminos" className="hover:underline">Términos de uso</Link>
          {" "}y la{" "}
          <Link href="/privacidad" className="hover:underline">Política de privacidad</Link>.
        </p>
      </footer>
    </div>
  );
}
