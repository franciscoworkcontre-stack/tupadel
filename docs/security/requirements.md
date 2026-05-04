# Security Requirements — Admin Roles

## Datos que toca
- `users.rol` — campo sensible de autorización
- `users.email`, `users.nombre` — PII básico
- Nueva tabla `admin_logs` — audit trail

## Controles requeridos

1. **Auth doble:** layout `/admin` ya verifica `rol = admin` via `getSession()`. El endpoint PATCH debe verificar independientemente — no confiar solo en el middleware.
2. **Validación de rol en backend:** el valor de `rol` enviado en el PATCH debe estar en la lista fija `ALLOWED_ROLES`. Rechazar cualquier otro con 400.
3. **Audit log obligatorio:** cada cambio de rol registra: `adminId`, `targetUserId`, `rolAnterior`, `rolNuevo`, `timestamp`. En tabla `admin_logs`.
4. **Rate limiting:** endpoint PATCH máximo 20 requests/minuto por IP (protección contra fuerza bruta de cambios masivos).
5. **No PII en logs de consola:** el log estructurado puede contener IDs, no emails en texto claro.
6. **CORS:** ya cubierto globalmente por Next.js App Router.
7. **Secrets:** ninguno nuevo requerido para este módulo.

## Threat model (STRIDE rápido)

**Elevation of Privilege:** Un jugador intenta hacer PATCH a su propio rol. Mitigación: endpoint verifica `session.rol === "admin"` independiente del middleware.

**Tampering:** Admin malintencionado asigna roles arbitrarios. Mitigación: lista fija de roles permitidos + audit log para trazabilidad.

**Repudiation:** Admin niega haber cambiado un rol. Mitigación: tabla `admin_logs` con `adminId` + timestamp inmutable.

**Information Disclosure:** Listado de usuarios expone emails. Mitigación: ruta protegida por auth de admin, no indexable (robots.txt ya cubre /admin).

## Veredicto
**OK — pasa a Coder** con todos los controles implementados.
