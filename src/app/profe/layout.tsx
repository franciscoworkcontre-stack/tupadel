import Link from "next/link";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "/profe", label: "Dashboard" },
  { href: "/profe/reservas", label: "Reservas" },
  { href: "/profe/alumnos", label: "Alumnos" },
  { href: "/profe/disponibilidad", label: "Disponibilidad" },
  { href: "/profe/perfil", label: "Mi perfil" },
];

export default function ProfeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-56 flex-col border-r border-line bg-[#0D1B2A] fixed top-0 left-0 h-full">
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/">
            <Logo dark />
          </Link>
          <div className="mono text-[10px] text-white/30 uppercase tracking-widest mt-2">Portal profe</div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-3 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-white/10">
          <Link href="/profe/destacar" className="block text-center bg-[#A8E63A] text-[#0D1B2A] text-xs font-semibold px-3 py-2 rounded-lg hover:bg-[#7DB81E] transition-colors">
            Destacar mi perfil →
          </Link>
          <Link href="/profes" className="block text-center text-xs text-white/30 hover:text-white/60 mt-2 transition-colors">
            Ver mi perfil público
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 md:ml-56">
        {/* Mobile nav */}
        <div className="md:hidden border-b border-line bg-[#0D1B2A] px-4 py-3 flex items-center gap-4 overflow-x-auto">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-white/60 text-sm whitespace-nowrap hover:text-white">
              {l.label}
            </Link>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
}
