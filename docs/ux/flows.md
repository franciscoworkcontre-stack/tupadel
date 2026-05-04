# UX Flows — Admin Roles

## Flujo 1: Ver listado de usuarios
1. Admin navega a `/admin/usuarios`
2. Middleware verifica `rol = admin` → OK, carga página
3. Página renderiza tabla con todos los users (server-side, ordenados por `createdAt` desc)
4. Admin ve: email, nombre, badge de rol, fecha registro, acción
5. **Estado éxito:** tabla visible con datos reales

## Flujo 2: Buscar usuario
1. Admin tipea en campo de búsqueda
2. Debounce 300ms → filtra tabla client-side por email o nombre
3. Si no hay resultados → estado vacío "No encontramos usuarios con ese criterio"
4. **Estado éxito:** tabla filtrada muestra solo matches

## Flujo 3: Cambiar rol (no-admin)
1. Admin hace click en selector de rol de una fila
2. Dropdown muestra los 5 roles
3. Admin selecciona nuevo rol
4. Badge cambia optimistamente a "guardando..."
5. PATCH `/api/admin/usuarios/[id]/rol` → 200
6. Badge actualiza al nuevo rol con color correcto
7. **Estado éxito:** badge muestra nuevo rol
8. **Estado error:** badge revierte al rol anterior + toast "Error al cambiar rol"

## Flujo 4: Cambiar rol a `admin` (confirmación)
1. Admin selecciona `admin` en dropdown
2. Modal de confirmación: "¿Dar acceso de administrador completo a [email]? Esta acción es irreversible."
3. Botones: "Cancelar" / "Confirmar"
4. Si confirma → igual que Flujo 3 paso 4-7
5. **Estado éxito:** usuario ahora es admin

## Friction log
- **Cambio accidental de rol:** mitigado con dropdown (no un click directo) + confirmación para admin
- **No saber qué hace cada rol:** tooltip en cada badge describiendo a dónde redirige
- **Pérdida de estado al refrescar:** tabla server-side, siempre fresh
