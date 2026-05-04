// Lógica de puntos server-side — nunca llamar desde el cliente

export const PUNTOS = {
  no_oficial:    { victoria: 15, derrota: 5 },
  torneo_amateur: { victoria: 30, derrota: 10 },
  bonusCatSuperior: 10,
  bonusRacha: 5,      // por victoria cuando racha >= 3
} as const;

export const UMBRALES_CATEGORIA: { min: number; max: number; cat: number }[] = [
  { min: 0,    max: 199,  cat: 6 },
  { min: 200,  max: 499,  cat: 5 },
  { min: 500,  max: 999,  cat: 4 },
  { min: 1000, max: 1999, cat: 3 },
  { min: 2000, max: 3999, cat: 2 },
  { min: 4000, max: Infinity, cat: 1 },
];

export function categoriaFromPuntos(puntos: number): number {
  return UMBRALES_CATEGORIA.find((u) => puntos >= u.min && puntos <= u.max)?.cat ?? 6;
}

export function puntosParaSiguienteCategoria(puntos: number): { siguiente: number | null; faltantes: number } {
  const actual = UMBRALES_CATEGORIA.find((u) => puntos >= u.min && puntos <= u.max);
  if (!actual || actual.cat === 1) return { siguiente: null, faltantes: 0 };
  const idx = UMBRALES_CATEGORIA.indexOf(actual);
  const siguiente = UMBRALES_CATEGORIA[idx - 1]; // cats van 6→1, así que -1 es la siguiente más alta
  return { siguiente: siguiente?.cat ?? null, faltantes: (siguiente?.min ?? 0) - puntos };
}

export type MatchTipo = "no_oficial" | "torneo_amateur";

export function calcularPuntos({
  tipo,
  gano,
  catPropia,
  catRivales,
  rachaActual,
}: {
  tipo: MatchTipo;
  gano: boolean;
  catPropia: number;
  catRivales: number[]; // categorías de los 2 rivales
  rachaActual: number;
}): number {
  const base = gano ? PUNTOS[tipo].victoria : PUNTOS[tipo].derrota;

  let bonus = 0;

  // Bonus por ganar a categoría superior (número menor = mejor)
  if (gano) {
    const catRivalPromedio = catRivales.reduce((a, b) => a + b, 0) / catRivales.length;
    if (catRivalPromedio < catPropia) bonus += PUNTOS.bonusCatSuperior;
  }

  // Bonus racha (3+ victorias consecutivas)
  if (gano && rachaActual >= 2) bonus += PUNTOS.bonusRacha; // racha se incrementa despues, aqui es racha previa

  return base + bonus;
}
