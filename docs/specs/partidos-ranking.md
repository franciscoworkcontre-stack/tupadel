# Spec: Sistema de Partidos y Ranking

**Fecha:** 2026-05-03  
**Autor:** PM Agent  
**Estado:** APROBADO

---

## Problema

Los jugadores no tienen forma de registrar resultados de sus partidos ni ver cómo se comparan con otros en su categoría. Hoy el sistema solo tiene diagnóstico de nivel estático (cuestionario). No hay historial de juego ni ranking activo.

## Scope

### Incluye
- **Crear partido:** cualquier jugador registrado puede registrar un partido jugado (2v2)
- **Tipos:** `no_oficial` (partido entre amigos) | `torneo_amateur` (torneo oficial registrado en el sistema)
- **Confirmación dual:** el resultado lo carga un jugador, los otros 3 deben confirmar (o el admin del torneo si es oficial)
- **Sistema de puntos:** puntos por resultado según tipo y categoría
- **Ranking:** listado de jugadores ordenados por puntos, segmentado por categoría
- **Perfil de jugador:** historial de partidos, puntos, progresión de categoría
- **Categoría dinámica:** la categoría del jugador puede subir/bajar automáticamente según puntos acumulados

### No incluye (MVP)
- Gestión de torneos completos (brackets, llaves) — diferido
- Integración con federaciones (FPCH, etc.)
- Chat entre jugadores
- Sistema de apuestas

---

## Sistema de puntos

### Partido no oficial
| Resultado | Puntos ganador | Puntos perdedor |
|-----------|---------------|-----------------|
| Victoria  | +15           | +5 (por jugar)  |
| Derrota   | —             | +5              |

### Torneo amateur (partido oficial)
| Resultado | Puntos ganador | Puntos perdedor |
|-----------|---------------|-----------------|
| Victoria  | +30           | +10             |

### Bonificaciones
- Ganar a equipo de categoría superior: +10 extra
- Racha de 3 victorias seguidas: +5 extra por victoria

### Umbrales de categoría
| Puntos acumulados | Categoría |
|-------------------|-----------|
| 0–199             | Cat 6     |
| 200–499           | Cat 5     |
| 500–999           | Cat 4     |
| 1000–1999         | Cat 3     |
| 2000–3999         | Cat 2     |
| 4000+             | Cat 1     |

---

## Entidades nuevas

- `partidos` — cabecera del partido
- `partido_jugadores` — los 4 participantes (2 por equipo) + resultado + puntos ganados
- `partido_confirmaciones` — confirmación de cada participante
- `ranking_snapshots` — snapshot semanal del ranking (performance)

---

## Criterios de aceptación (testeables por QA)

1. Un jugador logueado puede crear un partido desde `/partidos/nuevo`
2. El partido queda en estado `pendiente` hasta que los otros 3 jugadores confirmen
3. Al confirmar todos, el estado pasa a `confirmado` y los puntos se acreditan automáticamente
4. La página `/ranking` muestra jugadores ordenados por puntos, filtrable por categoría
5. El perfil `/jugadores/[id]` muestra historial de partidos y puntos
6. Los puntos se calculan correctamente según la tabla (testeable con seed data)
7. La categoría del usuario en `users.categoriaEstimada` se actualiza cuando cruza un umbral
8. Solo jugadores participantes pueden confirmar un partido
9. Un partido no puede confirmarse si faltan confirmaciones
10. El admin puede anular un partido (estado `anulado`) desde `/admin`
11. Partidos de tipo `torneo_amateur` dan el doble de puntos que `no_oficial`
12. El ranking filtra correctamente por categoría

## Métricas de éxito
- Un jugador puede registrar un partido en < 2 minutos
- El ranking se actualiza en tiempo real (no batch)

## No-goals
- No gestionamos brackets de torneos
- No hay validación de cancha (el partido ocurre donde los jugadores digan)
