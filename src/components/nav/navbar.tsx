"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/palas", label: "Palas" },
  { href: "/canchas", label: "Canchas" },
  { href: "/golpes", label: "Aprender" },
  { href: "/torneos", label: "Torneos" },
  { href: "/comunidad/buscar-companero", label: "Comunidad" },
];

export function Navbar({ activeSection, dark }: { activeSection?: string; dark?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`px-6 md:px-8 py-4 md:py-5 flex items-center justify-between relative z-20 ${
      dark
        ? "absolute top-0 left-0 right-0 bg-transparent border-b border-white/10"
        : "border-b border-line bg-canvas"
    }`}>
      <div className="flex items-center gap-8 md:gap-10">
        <Link href="/" className={`display text-lg md:text-xl font-semibold tracking-tight ${dark ? "text-white" : "text-ink"}`}>
          tupadel
        </Link>
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                dark
                  ? activeSection === l.href ? "text-[#00B85C]" : "text-white/70 hover:text-white"
                  : activeSection === l.href ? "text-padel" : "text-ink hover:text-padel"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <Link
          href="/auth/login"
          className={`text-sm transition-colors ${dark ? "text-white/50 hover:text-white" : "text-ink-muted hover:text-ink"}`}
        >
          Iniciar sesión
        </Link>
        <Link
          href="/diagnostico"
          className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
            dark
              ? "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20"
              : "bg-ink text-white hover:bg-ink-muted"
          }`}
        >
          Hacer diagnóstico →
        </Link>
      </div>
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        {open
          ? <X className={`w-5 h-5 ${dark ? "text-white" : ""}`} />
          : <Menu className={`w-5 h-5 ${dark ? "text-white" : ""}`} />
        }
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#0A0A0A] border-b border-white/10 z-50 px-6 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-sm font-medium py-2 text-white/80 hover:text-white"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/diagnostico"
            className="block bg-[#00B85C] text-white text-sm font-semibold px-4 py-3 rounded-lg text-center mt-2"
            onClick={() => setOpen(false)}
          >
            Hacer diagnóstico → 3 min
          </Link>
        </div>
      )}
    </nav>
  );
}
