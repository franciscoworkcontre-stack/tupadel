import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

const catNames: Record<number, string> = {
  1: "Competitivo",
  2: "Avanzado",
  3: "Intermedio alto",
  4: "Intermedio",
  5: "Intermedio bajo",
  6: "Iniciación",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, categoriaEstimada, areasMejora, confianza } = body;

    if (!email || !categoriaEstimada) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const token = randomBytes(32).toString("hex");

    // TODO: guardar en DB con Drizzle
    // await db.insert(diagnosticos).values({ token, email, categoriaEstimada, confianza, areasMejora, respuestasJson: body.respuestas });

    // TODO: enviar email con Resend
    // await resend.emails.send({ from: "tupadel <hola@tupadel.com>", to: email, subject: `Tu diagnóstico: Categoría ${categoriaEstimada}`, html: ... });

    const url = `/diagnostico/resultado?cat=${categoriaEstimada}&token=${token}`;

    return NextResponse.json({
      ok: true,
      token,
      categoria: categoriaEstimada,
      categoriaNombre: catNames[categoriaEstimada],
      url,
    });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
