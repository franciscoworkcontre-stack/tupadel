# UX Flows — Partidos & Ranking

## Flujo 1: Crear partido
1. Jugador logueado va a `/partidos/nuevo`
2. Paso 1 — Tipo y fecha: selecciona `no_oficial` o `torneo_amateur`, fecha, cancha (texto libre)
3. Paso 2 — Equipos: ingresa emails de los otros 3 jugadores (autocomplete por email)
4. Paso 3 — Resultado: sets ganados equipo A vs equipo B (ej. 6-4, 6-3)
5. Submit → partido creado en estado `pendiente`, se envía notificación (en-app) a los otros 3
6. Éxito: redirect a `/partidos/[id]` con estado pendiente de confirmaciones

## Flujo 2: Confirmar partido
1. Jugador recibe notificación en su `/mi-padel` o `/partidos`
2. Ve el partido pendiente con el resultado cargado
3. Hace click en "Confirmar resultado" o "Disputar"
4. Si confirma → su confirmación queda registrada
5. Si los 4 confirman → estado pasa a `confirmado`, puntos acreditados
6. Éxito: puntos aparecen en el perfil, categoría se recalcula

## Flujo 3: Ver ranking
1. Cualquier visitante (sin login) va a `/ranking`
2. Ve tabla con jugadores: posición, nombre, categoría, puntos, partidos jugados
3. Filtra por categoría (tabs: Cat 1-6 / Todas)
4. Click en jugador → `/jugadores/[id]`
5. Éxito: ranking visible y filtrado correctamente

## Flujo 4: Ver perfil de jugador
1. Visitante o jugador va a `/jugadores/[id]`
2. Ve: nombre, categoría actual, puntos, racha actual, partidos W/L
3. Ve barra de progreso hacia siguiente categoría
4. Ve historial de últimos 10 partidos (fecha, rival, resultado, puntos ganados)
5. Éxito: perfil completo cargado

## Friction log
- **Resultado disputado:** si un jugador disputa el resultado, el partido queda en `en_disputa` y el admin puede resolverlo — previene resultados falsos
- **Email no registrado en paso 2:** mostrar error inline "este email no está registrado" antes de submit
- **Olvido de confirmar:** badge de pendientes en navbar y en /mi-padel
