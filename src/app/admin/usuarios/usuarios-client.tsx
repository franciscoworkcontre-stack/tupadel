"use client";

import { useState, useTransition, useRef } from "react";
import Link from "next/link";

const ROLES = [
  { value: "jugador",      label: "Jugador",          bg: "#F1F5F9", text: "#475569", border: "#CBD5E1" },
  { value: "profe",        label: "Profe",             bg: "#ECFDF5", text: "#065F46", border: "#6EE7B7" },
  { value: "operador",     label: "Operador Retiros",  bg: "#EFF6FF", text: "#1E40AF", border: "#93C5FD" },
  { value: "admin_cancha", label: "Admin Cancha",      bg: "#FFF7ED", text: "#9A3412", border: "#FDBA74" },
  { value: "admin",        label: "Administrador",     bg: "#FEF2F2", text: "#991B1B", border: "#FCA5A5" },
] as const;

type RolValue = typeof ROLES[number]["value"];

type User = {
  id: string;
  email: string;
  nombre: string | null;
  rol: string;
  createdAt: Date | null;
};

function RoleBadge({ rol }: { rol: string }) {
  const cfg = ROLES.find((r) => r.value === rol) ?? ROLES[0];
  const descs: Record<string, string> = {
    jugador: "Jugador → /mi-padel",
    profe: "Profe → /profe",
    operador: "Operador de Retiros → /operador",
    admin_cancha: "Admin de Cancha → /club",
    admin: "Administrador completo → /admin",
  };
  return (
    <span
      title={descs[rol] ?? rol}
      className="mono text-[11px] px-2 py-0.5 rounded-full font-medium border"
      style={{ backgroundColor: cfg.bg, color: cfg.text, borderColor: cfg.border }}
    >
      {cfg.label}
    </span>
  );
}

function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium border ${
        type === "error"
          ? "bg-red-50 text-red-800 border-red-200"
          : "bg-green-50 text-green-800 border-green-200"
      }`}
    >
      {message}
      <button onClick={onClose} className="ml-3 opacity-60 hover:opacity-100" aria-label="Cerrar">×</button>
    </div>
  );
}

function ConfirmModal({ email, onConfirm, onCancel }: { email: string; onConfirm: () => void; onCancel: () => void }) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      onKeyDown={(e) => e.key === "Escape" && onCancel()}
    >
      <div className="bg-canvas border border-line rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <h2 id="confirm-modal-title" className="display text-lg font-semibold mb-2" style={{ letterSpacing: "-0.02em" }}>
          ¿Dar acceso de administrador?
        </h2>
        <p className="text-ink-muted text-sm mb-6 leading-relaxed">
          Vas a dar acceso de <strong>administrador completo</strong> a <strong>{email}</strong>. Esta persona podrá gestionar todos los módulos del sistema.
        </p>
        <div className="flex gap-3">
          <button
            ref={cancelRef}
            autoFocus
            onClick={onCancel}
            className="flex-1 border border-line rounded-lg py-3 text-sm font-medium hover:border-ink-muted transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-[#991B1B] text-white rounded-lg py-3 text-sm font-semibold hover:bg-[#7F1D1D] transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

function RoleSelector({
  user,
  onRolChanged,
}: {
  user: User;
  onRolChanged: (userId: string, newRol: string) => void;
}) {
  const [pending, startTransition] = useTransition();
  const [confirm, setConfirm] = useState<{ rol: RolValue } | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newRol = e.target.value as RolValue;
    if (newRol === "admin") {
      setConfirm({ rol: newRol });
    } else {
      applyChange(newRol);
    }
  }

  function applyChange(rol: RolValue) {
    setConfirm(null);
    startTransition(async () => {
      const res = await fetch(`/api/admin/usuarios/${user.id}/rol`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rol }),
      });
      if (res.ok) {
        onRolChanged(user.id, rol);
      } else {
        const data = await res.json();
        onRolChanged(user.id, "__error__:" + (data.error ?? "Error"));
      }
    });
  }

  return (
    <>
      <label htmlFor={`rol-${user.id}`} className="sr-only">Cambiar rol de {user.email}</label>
      <select
        id={`rol-${user.id}`}
        value={user.rol}
        onChange={handleChange}
        disabled={pending}
        aria-busy={pending}
        className="border border-line rounded-lg px-2 py-1.5 text-xs bg-canvas focus:outline-none focus:border-ink transition-colors disabled:opacity-50 min-h-[44px]"
      >
        {ROLES.map((r) => (
          <option key={r.value} value={r.value}>{r.label}</option>
        ))}
      </select>
      {confirm && (
        <ConfirmModal
          email={user.email}
          onConfirm={() => applyChange(confirm.rol)}
          onCancel={() => setConfirm(null)}
        />
      )}
    </>
  );
}

export function UsuariosClient({
  users: initialUsers,
  profeSlugByUserId,
}: {
  users: User[];
  profeSlugByUserId: Record<string, string>;
}) {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const filtered = users.filter(
    (u) =>
      !query ||
      u.email.toLowerCase().includes(query.toLowerCase()) ||
      (u.nombre ?? "").toLowerCase().includes(query.toLowerCase())
  );

  function handleRolChanged(userId: string, newRol: string) {
    if (newRol.startsWith("__error__:")) {
      setToast({ message: newRol.replace("__error__:", ""), type: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, rol: newRol } : u)));
    setToast({ message: "Rol actualizado correctamente.", type: "success" });
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <>
      {/* Search */}
      <div role="search" className="mb-5">
        <label htmlFor="user-search" className="sr-only">Buscar usuarios</label>
        <div className="relative max-w-sm">
          <input
            id="user-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por email o nombre..."
            className="w-full border border-line rounded-lg pl-4 pr-9 py-2.5 text-sm bg-canvas focus:outline-none focus:border-ink transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink text-lg leading-none"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border border-line rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-canvas-warm border-b border-line">
            <tr>
              <th className="text-left px-4 py-3 mono text-xs text-ink-soft uppercase tracking-wider">Usuario</th>
              <th className="text-left px-4 py-3 mono text-xs text-ink-soft uppercase tracking-wider hidden md:table-cell">Registrado</th>
              <th className="text-left px-4 py-3 mono text-xs text-ink-soft uppercase tracking-wider">Rol actual</th>
              <th className="text-left px-4 py-3 mono text-xs text-ink-soft uppercase tracking-wider">Cambiar rol</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-ink-muted text-sm">
                  No encontramos usuarios con ese criterio.
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u.id} className="hover:bg-canvas-warm transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-sm">{u.email}</div>
                    {u.nombre && <div className="text-xs text-ink-muted mt-0.5">{u.nombre}</div>}
                    {profeSlugByUserId[u.id] && (
                      <Link
                        href={`/profes/${profeSlugByUserId[u.id]}`}
                        className="mono text-[10px] text-[#065F46] hover:underline mt-0.5 inline-block"
                        target="_blank"
                      >
                        Ver perfil profe →
                      </Link>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-ink-muted hidden md:table-cell">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString("es-CL") : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <RoleBadge rol={u.rol} />
                  </td>
                  <td className="px-4 py-3">
                    <RoleSelector user={u} onRolChanged={handleRolChanged} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </>
  );
}
