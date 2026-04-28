export const dynamic = "force-dynamic";
import Link from "next/link";
import { db } from "@/db";
import { profes, profeConsultas } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Reservas e Inquiries — Portal Profe | Pulso Pádel" };

const estadoStyle: Record<string, string> = {
  nueva: "bg-red-50 text-red-700",
  respondida: "bg-green-50 text-green-700",
  convertida: "bg-blue-50 text-blue-700",
  descartada: "bg-gray-100 text-gray-500",
};

export default async function ProfeReservasPage() {
  const profe = await db.query.profes.findFirst({ where: eq(profes.estado, "activo") });
  if (!profe) return <NoPerfilAlert />;

  const consultas = await db.query.profeConsultas.findMany({
    where: eq(profeConsultas.profeId, profe.id),
    orderBy: (c, { desc }) => [desc(c.createdAt)],
  });

  const pendientes = consultas.filter((c) => !c.respondida);
  const respondidas = consultas.filter((c) => c.respondida);

  return (
    <div className="p-6 md:p-8 max-w-[900px]">
      <div className="mb-6">
        <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-2">Consultas y reservas</div>
        <h1 className="display text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Inbox</h1>
      </div>

      {consultas.length === 0 ? (
        <div className="border border-line rounded-xl p-12 text-center">
          <div className="text-4xl mb-4">📬</div>
          <div className="font-semibold mb-2">Todavía no recibiste consultas</div>
          <p className="text-ink-muted text-sm max-w-sm mx-auto">Cuando un alumno te escriba desde tu ficha pública, aparecerá acá.</p>
          <Link href={`/profes/${profe.slug}`} className="inline-block mt-5 text-sm underline hover:text-ink">Ver mi perfil público →</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {pendientes.length > 0 && (
            <section>
              <div className="mono text-xs text-red-500 uppercase tracking-widest mb-3">Pendientes de respuesta ({pendientes.length})</div>
              <div className="space-y-3">
                {pendientes.map((c) => <ConsultaCard key={c.id} c={c} />)}
              </div>
            </section>
          )}
          {respondidas.length > 0 && (
            <section>
              <div className="mono text-xs text-ink-soft uppercase tracking-widest mb-3">Respondidas ({respondidas.length})</div>
              <div className="space-y-3">
                {respondidas.map((c) => <ConsultaCard key={c.id} c={c} />)}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

type Consulta = Awaited<ReturnType<typeof db.query.profeConsultas.findMany>>[number];

function ConsultaCard({ c }: { c: Consulta }) {
  const catLabels: Record<number, string> = {
    1: "Cat 1", 2: "Cat 2", 3: "Cat 3", 4: "Cat 4", 5: "Cat 5", 6: "Cat 6",
  };
  return (
    <div className={`border rounded-xl p-5 ${!c.respondida ? "border-red-200 bg-red-50/30" : "border-line bg-canvas"}`}>
      <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
        <div>
          <span className="font-semibold">{c.nombre}</span>
          <span className="text-ink-muted text-sm ml-2">{c.email}</span>
          {c.telefono && <span className="text-ink-muted text-sm ml-2">· {c.telefono}</span>}
        </div>
        <div className="flex items-center gap-2">
          {c.categoriaAlumno && (
            <span className="mono text-[9px] border border-line px-2 py-0.5 rounded text-ink-soft">
              {catLabels[c.categoriaAlumno]}
            </span>
          )}
          <span className={`mono text-[9px] px-2 py-0.5 rounded ${!c.respondida ? "bg-red-100 text-red-700" : "bg-green-50 text-green-700"}`}>
            {!c.respondida ? "Pendiente" : "Respondida"}
          </span>
        </div>
      </div>
      {c.modalidadSolicitada && (
        <div className="mono text-[10px] text-ink-soft mb-2">Modalidad: {c.modalidadSolicitada.replace(/_/g, " ")}</div>
      )}
      <p className="text-sm text-ink-muted leading-relaxed mb-4">{c.mensaje}</p>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="mono text-[10px] text-ink-soft">{c.createdAt?.toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" })}</div>
        {!c.respondida && c.email && (
          <a
            href={`mailto:${c.email}?subject=Re: Consulta clase de pádel&body=Hola ${c.nombre}, gracias por tu consulta. `}
            className="text-xs bg-[#0D1B2A] text-white px-4 py-1.5 rounded-lg hover:bg-[#1a2f47] transition-colors"
          >
            Responder por email →
          </a>
        )}
        {!c.respondida && c.telefono && (
          <a
            href={`https://wa.me/${c.telefono.replace(/[^0-9]/g, "")}?text=Hola ${c.nombre}!`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs border border-line px-4 py-1.5 rounded-lg hover:border-ink-muted transition-colors"
          >
            WhatsApp →
          </a>
        )}
      </div>
    </div>
  );
}

function NoPerfilAlert() {
  return (
    <div className="p-8">
      <p className="text-ink-muted">No encontramos tu perfil de profe.</p>
      <Link href="/profe/onboarding" className="mt-4 inline-block underline hover:text-ink">Crear mi perfil →</Link>
    </div>
  );
}
