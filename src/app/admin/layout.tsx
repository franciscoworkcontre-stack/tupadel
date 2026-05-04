import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || session.rol !== "admin") {
    redirect("/auth/login?redirect=/admin");
  }

  const nav = [
    { href: "/admin", label: "Dashboard", icon: "◈" },
    { href: "/admin/usuarios", label: "Usuarios y roles", icon: "👥" },
    { href: "/admin/profes", label: "Profes", icon: "🎾" },
    { href: "/admin/operadores", label: "Operadores", icon: "🏢" },
    { href: "/admin/retiros", label: "Retiros", icon: "🏝️" },
  ];

  return (
    <div className="min-h-screen bg-canvas-warm flex">
      <aside className="w-60 border-r border-line bg-canvas flex-shrink-0 hidden md:flex flex-col">
        <div className="px-6 py-5 border-b border-line">
          <Link href="/" className="mono text-xs font-semibold text-[#A8E63A]">tupadel</Link>
          <div className="text-xs text-ink-muted mt-0.5">Admin Interno</div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {nav.map(item => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink-muted hover:bg-canvas-warm hover:text-ink transition-colors">
              <span className="text-sm w-5 text-center">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-line">
          <div className="text-xs font-semibold text-[#DC2626]">ADMIN</div>
          <div className="text-xs text-ink-soft mt-0.5">{session.email}</div>
        </div>
      </aside>
      <main className="flex-1 md:p-8 p-4 min-w-0">{children}</main>
    </div>
  );
}
