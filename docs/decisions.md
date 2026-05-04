# Decisiones de arquitectura

## 2026-05-03 — Roles como varchar, no enum

**Decisión:** `rol` en tabla `users` es `varchar(30)`, no un `pgEnum`.  
**Alternativas descartadas:** pgEnum requiere migración para agregar valores nuevos; varchar permite iteración rápida en MVP.  
**Razón:** El sistema de roles está en evolución activa; mejor flexibilidad ahora, migrar a enum cuando el set se estabilice.

## 2026-05-03 — Admin roles: PATCH endpoint + tabla admin_logs

**Decisión:** Cambios de rol via PATCH `/api/admin/usuarios/[id]/rol`, con log en tabla `admin_logs`.  
**Alternativas descartadas:** Server Action directo — no auditable con la misma facilidad.  
**Razón:** Auditabilidad. Cualquier cambio de rol debe quedar registrado con actor, timestamp y valor anterior/nuevo.

## 2026-05-03 — Dashboard profe usa force-dynamic (no SSG)

**Decisión:** Todas las páginas `/profe/*` y `/admin/*` son `force-dynamic`.  
**Razón:** Son páginas autenticadas y user-specific. Prerender no aplica.
