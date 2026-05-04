# QA Report — Partidos & Ranking — 2026-05-03

## Funcionalidad
- [x] Flujo 1 (crear partido): 3 pasos, tipo/fecha → equipos → resultado, redirect a /partidos/[id] — PASS
- [x] Flujo 2 (confirmar): PATCH con verificación de participante, idempotencia, todos confirman → puntos acreditados — PASS
- [x] Flujo 3 (ranking): /ranking lista por puntos, filtra por cat, link a perfil — PASS
- [x] Flujo 4 (perfil jugador): stats, barra de progreso, historial últimos 15 — PASS
- [x] Estado en_disputa: si confirma=false → partido queda en_disputa — PASS
- [x] Puntos calculados server-side — PASS
- [x] categoriaEstimada actualizada automáticamente según umbrales — PASS

## Seguridad
- [x] POST /api/partidos verifica sesión — PASS
- [x] PATCH /api/partidos/[id]/confirmar verifica que userId es participante — PASS
- [x] Idempotencia: no puede confirmar dos veces el mismo partido — PASS
- [x] Validación de 4 jugadores distintos — PASS
- [x] Puntos calculados solo en servidor — PASS

## Visual / Tokens
- [x] Colores de categoría consistentes en ranking y perfil — PASS
- [x] Estados de partido con color semántico (pendiente amber, confirmado green, disputa red) — PASS
- [x] Barra de progreso con color de categoría actual — PASS

## Accesibilidad
- [x] Labels en inputs de formulario — PASS
- [x] Botones con texto descriptivo — PASS

## WARN (deuda técnica aceptada)
- [i18n] Strings hardcodeados — no hay sistema i18n activo aún
- [rate-limiting] No implementado en MVP (requiere Redis/middleware adicional)
- [notificaciones] No hay push notifications — el jugador debe ir a /mi-padel a ver pendientes

## VEREDICTO: SHIP ✓
