"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/nav/navbar";
import { Footer } from "@/components/nav/footer";
import Link from "next/link";

type Jugador = { userId: string; email: string; equipo: "A" | "B" };

export default function NuevoPartidoPage() {
  const router = useRouter();
  const [paso, setPaso] = useState(1);
  const [tipo, setTipo] = useState<"no_oficial" | "torneo_amateur">("no_oficial");
  const [fecha, setFecha] = useState("");
  const [cancha, setCancha] = useState("");
  const [torneoNombre, setTorneoNombre] = useState("");
  const [setsA, setSetsA] = useState(0);
  const [setsB, setSetsB] = useState(0);
  const [detalleSets, setDetalleSets] = useState("");
  const [emails, setEmails] = useState({ A2: "", B1: "", B2: "" });
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function resolverJugadores() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/usuarios/buscar-por-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails: [emails.A2, emails.B1, emails.B2] }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Error buscando jugadores."); return; }

      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();

      const resolved: Jugador[] = [
        { userId: meData.id, email: meData.email, equipo: "A" },
        { userId: data.users[0]?.id, email: emails.A2, equipo: "A" },
        { userId: data.users[1]?.id, email: emails.B1, equipo: "B" },
        { userId: data.users[2]?.id, email: emails.B2, equipo: "B" },
      ];

      const notFound = resolved.find((j) => !j.userId);
      if (notFound) { setError(`Email no registrado: ${notFound.email}`); return; }

      setJugadores(resolved);
      setPaso(3);
    } finally {
      setLoading(false);
    }
  }

  async function submitPartido() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/partidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo, fechaJugado: fecha, cancha, torneoNombre,
          setsEquipoA: setsA, setsEquipoB: setsB, detalleSets,
          jugadores: jugadores.map(({ userId, equipo }) => ({ userId, equipo })),
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Error al crear partido."); return; }
      router.push(`/partidos/${data.matchId}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="max-w-[600px] mx-auto px-6 py-12">
        <Link href="/mi-padel" className="mono text-xs text-ink-soft hover:text-ink mb-8 inline-block">← Mi pádel</Link>
        <h1 className="display text-3xl font-semibold mb-2" style={{ letterSpacing: "-0.02em" }}>Registrar partido</h1>
        <p className="text-ink-muted text-sm mb-8">Los otros 3 jugadores deben confirmar el resultado para que los puntos se acrediten.</p>

        {/* Stepper */}
        <div className="flex items-center gap-2 mb-10">
          {["Tipo y fecha", "Equipos", "Resultado"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${paso >= i + 1 ? "bg-[#0D1B2A] text-white" : "bg-canvas-warm text-ink-soft border border-line"}`}>
                {i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${paso === i + 1 ? "font-semibold text-ink" : "text-ink-soft"}`}>{label}</span>
              {i < 2 && <div className="w-8 h-px bg-line" />}
            </div>
          ))}
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-5">{error}</div>}

        {/* Paso 1 */}
        {paso === 1 && (
          <div className="space-y-5">
            <div>
              <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-2">Tipo de partido</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "no_oficial", label: "Partido amistoso", desc: "+15 pts victoria" },
                  { value: "torneo_amateur", label: "Torneo amateur", desc: "+30 pts victoria" },
                ].map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setTipo(t.value as "no_oficial" | "torneo_amateur")}
                    className={`border rounded-xl p-4 text-left transition-colors ${tipo === t.value ? "border-[#0D1B2A] bg-[#0D1B2A] text-white" : "border-line hover:border-ink-muted bg-canvas"}`}
                  >
                    <div className="font-semibold text-sm">{t.label}</div>
                    <div className={`text-xs mt-0.5 ${tipo === t.value ? "text-white/70" : "text-ink-muted"}`}>{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            {tipo === "torneo_amateur" && (
              <div>
                <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-2">Nombre del torneo</label>
                <input value={torneoNombre} onChange={(e) => setTorneoNombre(e.target.value)} placeholder="Abierto de Providencia 2026" className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-canvas focus:outline-none focus:border-ink" />
              </div>
            )}
            <div>
              <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-2">Fecha y hora</label>
              <input type="datetime-local" value={fecha} onChange={(e) => setFecha(e.target.value)} required className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-canvas focus:outline-none focus:border-ink" />
            </div>
            <div>
              <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-2">Cancha (opcional)</label>
              <input value={cancha} onChange={(e) => setCancha(e.target.value)} placeholder="Club XYZ, Cancha 3" className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-canvas focus:outline-none focus:border-ink" />
            </div>
            <button onClick={() => { if (!fecha) { setError("La fecha es requerida."); return; } setError(""); setPaso(2); }} className="w-full bg-[#0D1B2A] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#1a2f47] transition-colors">
              Siguiente →
            </button>
          </div>
        )}

        {/* Paso 2 */}
        {paso === 2 && (
          <div className="space-y-5">
            <div className="border border-line rounded-xl p-5 bg-canvas-warm">
              <div className="mono text-xs text-[#A8E63A] uppercase tracking-wider mb-3">Equipo A</div>
              <div className="text-sm font-medium text-ink-muted mb-3">Vos (Jugador A1)</div>
              <div>
                <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-2">Compañero A2 — email</label>
                <input type="email" value={emails.A2} onChange={(e) => setEmails({ ...emails, A2: e.target.value })} placeholder="companero@email.com" className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-canvas focus:outline-none focus:border-ink" />
              </div>
            </div>
            <div className="text-center text-ink-soft font-bold">VS</div>
            <div className="border border-line rounded-xl p-5 bg-canvas-warm">
              <div className="mono text-xs text-[#E8590C] uppercase tracking-wider mb-3">Equipo B</div>
              {["B1", "B2"].map((k) => (
                <div key={k} className="mb-3">
                  <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-2">Rival {k} — email</label>
                  <input type="email" value={emails[k as "B1" | "B2"]} onChange={(e) => setEmails({ ...emails, [k]: e.target.value })} placeholder="rival@email.com" className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-canvas focus:outline-none focus:border-ink" />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setPaso(1)} className="flex-1 border border-line rounded-lg py-3 text-sm font-medium hover:border-ink-muted transition-colors">← Atrás</button>
              <button onClick={resolverJugadores} disabled={loading || !emails.A2 || !emails.B1 || !emails.B2} className="flex-1 bg-[#0D1B2A] text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#1a2f47] transition-colors disabled:opacity-50">
                {loading ? "Buscando..." : "Siguiente →"}
              </button>
            </div>
          </div>
        )}

        {/* Paso 3 */}
        {paso === 3 && (
          <div className="space-y-5">
            <div className="grid grid-cols-5 items-center gap-3">
              <div className="col-span-2 border border-line rounded-xl p-4 bg-canvas-warm text-center">
                <div className="mono text-xs text-[#A8E63A] uppercase mb-1">Equipo A</div>
                <input type="number" min={0} max={3} value={setsA} onChange={(e) => setSetsA(Number(e.target.value))}
                  className="w-16 text-3xl font-bold text-center border-b-2 border-[#0D1B2A] bg-transparent focus:outline-none mx-auto block" />
              </div>
              <div className="text-center text-ink-soft font-bold text-lg">VS</div>
              <div className="col-span-2 border border-line rounded-xl p-4 bg-canvas-warm text-center">
                <div className="mono text-xs text-[#E8590C] uppercase mb-1">Equipo B</div>
                <input type="number" min={0} max={3} value={setsB} onChange={(e) => setSetsB(Number(e.target.value))}
                  className="w-16 text-3xl font-bold text-center border-b-2 border-[#0D1B2A] bg-transparent focus:outline-none mx-auto block" />
              </div>
            </div>
            <div>
              <label className="mono text-xs uppercase tracking-wider text-ink-soft block mb-2">Detalle de sets (opcional)</label>
              <input value={detalleSets} onChange={(e) => setDetalleSets(e.target.value)} placeholder="6-4, 3-6, 6-3" className="w-full border border-line rounded-lg px-4 py-3 text-sm bg-canvas focus:outline-none focus:border-ink" />
            </div>
            {setsA === setsB && <p className="text-amber-600 text-xs">El resultado está empatado. En pádel uno de los equipos debe ganar más sets.</p>}
            <div className="flex gap-3">
              <button onClick={() => setPaso(2)} className="flex-1 border border-line rounded-lg py-3 text-sm font-medium hover:border-ink-muted transition-colors">← Atrás</button>
              <button onClick={submitPartido} disabled={loading || setsA === setsB} className="flex-1 bg-[#A8E63A] text-[#0D1B2A] py-3 rounded-lg font-bold text-sm hover:bg-[#7DB81E] transition-colors disabled:opacity-50">
                {loading ? "Registrando..." : "Registrar partido →"}
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
