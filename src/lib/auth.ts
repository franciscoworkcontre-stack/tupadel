import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const COOKIE = "tp_session";
const EXPIRES = 60 * 60 * 24 * 30; // 30 days

function getSecret() {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET not set");
  return new TextEncoder().encode(s);
}

export type SessionUser = {
  id: string;
  email: string;
  nombre: string | null;
  rol: string;
};

export async function signToken(payload: SessionUser): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRES}s`)
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as SessionUser;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function requireSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) throw new Error("UNAUTHENTICATED");
  return session;
}

export async function requireRole(role: string): Promise<SessionUser> {
  const session = await requireSession();
  if (session.rol !== role && session.rol !== "admin") {
    throw new Error("FORBIDDEN");
  }
  return session;
}

export function sessionCookieOptions(token: string) {
  return {
    name: COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: EXPIRES,
    path: "/",
  };
}

// Used in API routes
export async function loginUser(email: string, password: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email.toLowerCase().trim()))
    .limit(1);

  if (!user) return { error: "Email o contraseña incorrectos." };

  const match = await bcrypt.compare(password, (user as any).passwordHash ?? "");
  if (!match) return { error: "Email o contraseña incorrectos." };

  const token = await signToken({
    id: user.id,
    email: user.email,
    nombre: user.nombre ?? null,
    rol: user.rol,
  });

  return { token, user };
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}
