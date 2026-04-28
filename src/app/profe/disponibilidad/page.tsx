export const dynamic = "force-dynamic";
"use client";

import { useState } from "react";
import type { Metadata } from "next";

const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const HORAS = Array.from({ length: 28 }, (_, i) => {
  const h = Math.floor(i / 2) + 7;
  const m = i % 2 === 0 ? "00" : "30";
  return `${h.toString().padStart(2, "0")}:${m}`;
});

type Slot = { dia: number; hora: string; activo: boolean };

const SLOTS_INICIALES: Slot[] = [];
for (let d = 1; d <= 6; d++) {
  for (const h of HORAS.slice(2, 22)) {
    SLOTS_INICIALES.push({ dia: d, hora: h, activo: false });
  }
}

export default function ProfeDisponibilidadPage() {
  const [slots, setSlots] = useState<Slot[]>(SLOTS_INICIALES);
  const [guardado, setGuardado] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [pintando, setPintando] = useState<boolean | null>(null);

  function toggleSlot(dia: number, hora: string) {
    setSlots((prev) =>
      prev.map((s) => {
        if (s.dia === dia && s.hora === hora) return { ...s, activo: !s.activo };
        return s;
      })
    );
  }

  function brushSlot(dia: number, hora: string) {
    if (!mouseDown || pintando === null) return;
    setSlots((prev) =>
      prev.map((s) => {
        if (s.dia === dia && s.hora === hora) return { ...s, activo: pintando };
        return s;
      })
    );
  }

  function startBrush(dia: number, hora: string) {
    const actual = slots.find((s) => s.dia === dia && s.hora === hora)?.activo ?? false;
    setMouseDown(true);
    setPintando(!actual);
    toggleSlot(dia, hora);
  }

  function getSlot(dia: number, hora: string) {
    return slots.find((s) => s.dia === dia && s.hora === hora);
  }

  const activosCount = slots.filter((s) => s.activo).length;

  return (
    <div
      className="p-6 md:p-8 select-none"
      onMouseUp={() => { setMouseDown(false); setPintando(null); }}
      onMouseLeave={() => { setMouseDown(false); setPintando(null); }}
    >
      <div className="mb-6 flex items-baseline justify-between flex-wrap gap-4">
        <div>
          <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">Disponibilidad</div>
          <h1 className="display text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Horarios semanales</h1>
          <p className="text-sm text-ink-muted mt-1">Hacé clic y arrastré para marcar los bloques en los que estás disponible.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-ink-muted">{activosCount} slots activos</span>
          <button
            onClick={() => setGuardado(true)}
            className="bg-[#A8E63A] text-[#0D1B2A] px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#7DB81E] transition-colors"
          >
            {guardado ? "Guardado ✓" : "Guardar horarios"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header días */}
          <div className="grid gap-px mb-px" style={{ gridTemplateColumns: "64px repeat(6, 1fr)" }}>
            <div />
            {DIAS.slice(1).map((d) => (
              <div key={d} className="text-center mono text-[10px] text-ink-soft uppercase py-2 bg-canvas-warm">{d}</div>
            ))}
          </div>

          {/* Grid de slots */}
          {HORAS.slice(2, 22).map((hora) => (
            <div key={hora} className="grid gap-px mb-px" style={{ gridTemplateColumns: "64px repeat(6, 1fr)" }}>
              <div className="mono text-[10px] text-ink-soft flex items-center justify-end pr-3">{hora}</div>
              {[1, 2, 3, 4, 5, 6].map((dia) => {
                const slot = getSlot(dia, hora);
                return (
                  <div
                    key={dia}
                    className={`h-7 rounded cursor-pointer transition-colors ${slot?.activo ? "bg-[#A8E63A]" : "bg-line hover:bg-[#A8E63A]/30"}`}
                    onMouseDown={() => startBrush(dia, hora)}
                    onMouseEnter={() => brushSlot(dia, hora)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-4 flex-wrap text-sm text-ink-muted">
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-[#A8E63A]" /> Disponible</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-line" /> No disponible</div>
      </div>

      <div className="mt-8 border-t border-line pt-6">
        <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-4">Bloquear fechas específicas</div>
        <div className="border border-line rounded-xl p-5 bg-canvas max-w-md">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="mono text-[10px] text-ink-soft uppercase block mb-1">Desde</label>
              <input type="date" className="w-full border border-line rounded-lg px-3 py-2 text-sm bg-canvas focus:outline-none focus:border-ink-muted" />
            </div>
            <div>
              <label className="mono text-[10px] text-ink-soft uppercase block mb-1">Hasta</label>
              <input type="date" className="w-full border border-line rounded-lg px-3 py-2 text-sm bg-canvas focus:outline-none focus:border-ink-muted" />
            </div>
          </div>
          <input className="w-full border border-line rounded-lg px-3 py-2 text-sm bg-canvas mb-3 focus:outline-none focus:border-ink-muted" placeholder="Motivo (vacaciones, lesión, etc.)" />
          <button className="border border-line px-4 py-2 rounded-lg text-sm hover:border-ink-muted transition-colors">Agregar bloqueo</button>
        </div>
      </div>
    </div>
  );
}
