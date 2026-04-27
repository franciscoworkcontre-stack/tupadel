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

export function Navbar({ activeSection }: { activeSection?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="px-6 md:px-8 py-4 md:py-5 flex items-center justify-between border-b border-line bg-canvas">
      <div className="flex items-center gap-8 md:gap-10">
        <Link href="/" className="display text-lg md:text-xl font-semibold tracking-tight">
          tupadel
        </Link>
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-padel ${
                activeSection === l.href ? "text-padel" : "text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <Link href="/auth/login" className="text-sm text-ink-muted hover:text-ink transition-colors">
          Iniciar sesión
        </Link>
        <Link
          href="/diagnostico"
          className="bg-ink text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-ink-muted transition-colors"
        >
          Hacer diagnóstico →
        </Link>
      </div>
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
      {open && (
        <div className="absolute top-[57px] left-0 right-0 bg-canvas border-b border-line z-50 px-6 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-sm font-medium py-2"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/diagnostico"
            className="block bg-padel text-white text-sm font-semibold px-4 py-3 rounded-lg text-center mt-2"
            onClick={() => setOpen(false)}
          >
            Hacer diagnóstico → 3 min
          </Link>
        </div>
      )}
    </nav>
  );
}
