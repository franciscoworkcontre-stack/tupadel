"use client";

import { useState } from "react";

export function ConfirmarButton({ matchId }: { matchId: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleAccion(confirma: boolean, motivoDisputa?: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/partidos/${matchId}/confirmar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirma, motivoDisputa }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Error al confirmar."); return; }
      setDone(true);
      window.location.reload();
    } finally {
      setLoading(false);
    }
  }

  if (done) return <p className="text-center text-sm text-[#065F46] font-medium">✓ Confirmación registrada</p>;

  return (
    <div className="space-y-3">
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}
      <div className="flex gap-3">
        <button
          onClick={() => handleAccion(false, "Disputo el resultado")}
          disabled={loading}
          className="flex-1 border border-red-200 text-red-700 rounded-lg py-3 text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
        >
          Disputar resultado
        </button>
        <button
          onClick={() => handleAccion(true)}
          disabled={loading}
          className="flex-1 bg-[#A8E63A] text-[#0D1B2A] rounded-lg py-3 text-sm font-bold hover:bg-[#7DB81E] transition-colors disabled:opacity-50"
        >
          {loading ? "Confirmando..." : "Confirmar resultado ✓"}
        </button>
      </div>
    </div>
  );
}
