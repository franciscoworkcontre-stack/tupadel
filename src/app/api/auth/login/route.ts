import { NextRequest, NextResponse } from "next/server";
import { loginUser, sessionCookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email y contraseña requeridos." }, { status: 400 });
  }

  const result = await loginUser(email, password);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, rol: result.user.rol });
  res.cookies.set(sessionCookieOptions(result.token));
  return res;
}
