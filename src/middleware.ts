import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const PROTECTED: Record<string, string> = {
  "/profe": "profe",
  "/operador": "operador",
  "/club": "admin_cancha",
  "/admin": "admin",
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const protectedEntry = Object.entries(PROTECTED).find(([prefix]) =>
    pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (!protectedEntry) return NextResponse.next();

  const [, requiredRole] = protectedEntry;
  const token = req.cookies.get("tp_session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL(`/auth/login?redirect=${encodeURIComponent(pathname)}`, req.url));
  }

  const session = await verifyToken(token);
  if (!session) {
    const res = NextResponse.redirect(new URL(`/auth/login?redirect=${encodeURIComponent(pathname)}`, req.url));
    res.cookies.set({ name: "tp_session", value: "", maxAge: 0, path: "/" });
    return res;
  }

  if (session.rol !== requiredRole && session.rol !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profe/:path*", "/operador/:path*", "/club/:path*", "/admin/:path*"],
};
