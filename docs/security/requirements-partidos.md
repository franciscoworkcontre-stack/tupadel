# Security Requirements — Partidos & Ranking

## Datos que toca
- `partidos`, `partido_jugadores`, `partido_confirmaciones` — datos de juego, no PII adicional
- `users.categoriaEstimada`, `users.puntosRanking` — campos de juego, sensibles a manipulación

## Controles requeridos

1. **Auth en crear partido:** solo usuarios con sesión activa. Verificar server-side, no solo middleware.
2. **Validación de participantes:** los 4 jugadores deben existir en la DB. Rechazar IDs/emails inexistentes.
3. **Anti-fraude confirmaciones:** solo los jugadores listados en `partido_jugadores` pueden confirmar. Verificar `session.id` está en el partido.
4. **Puntos calculados server-side:** NUNCA aceptar puntos del cliente. Toda la lógica de puntos vive en el servidor.
5. **Categoría actualizada server-side:** el update de `categoriaEstimada` ocurre en el mismo transaction que la confirmación.
6. **Anulación solo admin:** el endpoint de anular verifica `session.rol === "admin"`.
7. **Idempotencia:** un jugador no puede confirmar el mismo partido dos veces.
8. **Rate limiting:** POST /api/partidos máximo 10/hora por usuario (anti-spam de partidos falsos).

## Threat model (STRIDE)

**Tampering:** Un jugador carga un resultado falso y presiona a los demás a confirmar. Mitigación: cualquier participante puede "disputar" el resultado, bloqueando la acreditación automática de puntos.

**Elevation of Privilege:** Un usuario intenta confirmar un partido en el que no participó. Mitigación: verificación server-side de participación antes de registrar confirmación.

**Spoofing:** Un jugador registra un partido poniendo el email de alguien que no jugó. Mitigación: los otros 3 deben confirmar activamente — sin confirmación no hay puntos.

**Repudiation:** Jugador dice que no confirmó. Mitigación: `partido_confirmaciones` guarda `userId` + `timestamp` + IP.

## Veredicto: OK — pasa a Coder
