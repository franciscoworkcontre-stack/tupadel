import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { inArray } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado." }, { status: 401 });

  const { emails } = await req.json();
  if (!Array.isArray(emails) || emails.length === 0) {
    return NextResponse.json({ error: "Emails requeridos." }, { status: 400 });
  }

  const normalizedEmails = emails.map((e: string) => e.toLowerCase().trim());
  const found = await db
    .select({ id: users.id, email: users.email, nombre: users.nombre })
    .from(users)
    .where(inArray(users.email, normalizedEmails));

  // Retorna en el mismo orden que los emails pedidos
  const ordered = normalizedEmails.map((email) => found.find((u) => u.email === email) ?? null);
  const notFound = ordered.filter((u) => u === null);
  if (notFound.length > 0) {
    const missing = normalizedEmails.filter((e) => !found.find((u) => u.email === e));
    return NextResponse.json({ error: `Email no registrado: ${missing[0]}` }, { status: 404 });
  }

  return NextResponse.json({ users: ordered });
}
