import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { canchaAdmins, clubes } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function ClubLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session || (session.rol !== "admin_cancha" && session.rol !== "admin")) {
    redirect("/auth/login?redirect=/club");
  }

  const [adminEntry] = await db
    .select({ clubId: canchaAdmins.clubId, clubNombre: clubes.nombre })
    .from(canchaAdmins)
    .innerJoin(clubes, eq(canchaAdmins.clubId, clubes.id))
    .where(eq(canchaAdmins.userId, session.id))
    .limit(1);

  const nav = [
    { href: "/club", label: "Dashboard", icon: "◈" },
    { href: "/club/reservas", label: "Reservas", icon: "📅" },
    { href: "/club/horarios", label: "Horarios", icon: "⏰" },
    { href: "/club/perfil", label: "Perfil del club", icon: "🏢" },
  ];

  return (
    <div className="min-h-screen bg-canvas-warm flex">
      <aside className="w-60 border-r border-line bg-canvas flex-shrink-0 hidden md:flex flex-col">
        <div className="px-6 py-5 border-b border-line">
          <Link href="/" className="mono text-xs font-semibold text-[#A8E63A]">tupadel</Link>
          <div className="text-xs text-ink-muted mt-0.5 truncate">{adminEntry?.clubNombre ?? "Panel Club"}</div>
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
          <div className="text-xs text-ink-soft">{session.email}</div>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="text-xs text-ink-muted hover:text-ink mt-1 transition-colors">Cerrar sesión</button>
          </form>
        </div>
      </aside>

      <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-canvas border-b border-line px-4 py-3 flex items-center justify-between">
        <Link href="/" className="mono text-sm font-semibold">tupadel</Link>
        <div className="flex items-center gap-3">
          {nav.map(item => (
            <Link key={item.href} href={item.href} className="text-sm text-ink-muted hover:text-ink">{item.icon}</Link>
          ))}
        </div>
      </div>

      <main className="flex-1 md:p-8 p-4 pt-16 md:pt-8 min-w-0">
        {children}
      </main>
    </div>
  );
}
