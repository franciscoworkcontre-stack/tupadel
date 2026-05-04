"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";

const links = [
  { href: "/palas", label: "Palas" },
  { href: "/retiros", label: "Retiros" },
  { href: "/canchas", label: "Canchas" },
  { href: "/profes", label: "Profes" },
  { href: "/aprender", label: "Aprender" },
  { href: "/ranking", label: "Ranking" },
  { href: "/torneos", label: "Torneos" },
  { href: "/comunidad/buscar-companero", label: "Comunidad" },
];

export function Navbar({ activeSection, dark }: { activeSection?: string; dark?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`px-6 md:px-8 py-3 md:py-4 flex items-center justify-between z-50 ${
      dark
        ? "fixed top-0 left-0 right-0 bg-[#0D1B2A]/60 backdrop-blur-md border-b border-white/10"
        : "relative border-b border-line bg-canvas"
    }`}>
      <div className="flex items-center gap-8 md:gap-10">
        <Link href="/">
          <Logo dark={dark} />
        </Link>
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                dark
                  ? activeSection === l.href ? "text-[#A8E63A]" : "text-white/70 hover:text-white"
                  : activeSection === l.href ? "text-padel" : "text-ink-muted hover:text-ink"
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
          className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
            dark
              ? "bg-[#A8E63A] text-[#0D1B2A] hover:bg-[#7DB81E]"
              : "bg-[#0D1B2A] text-white hover:bg-[#1a2f47]"
          }`}
        >
          Hacer diagnóstico →
        </Link>
      </div>
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        {open
          ? <X className={`w-5 h-5 ${dark ? "text-white" : "text-ink"}`} />
          : <Menu className={`w-5 h-5 ${dark ? "text-white" : "text-ink"}`} />
        }
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#0D1B2A] border-b border-white/10 z-50 px-6 py-5 space-y-3">
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
            className="block bg-[#A8E63A] text-[#0D1B2A] text-sm font-bold px-4 py-3 rounded-lg text-center mt-3"
            onClick={() => setOpen(false)}
          >
            Hacer diagnóstico → 3 min
          </Link>
        </div>
      )}
    </nav>
  );
}
