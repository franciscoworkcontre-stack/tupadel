# Spec: Módulo Admin — Gestión de Roles y Usuarios

**Fecha:** 2026-05-03  
**Autor:** PM Agent  
**Estado:** APROBADO

---

## Problema

El admin no tiene forma de ver qué usuarios existen ni cambiar sus roles. Hoy para convertir a alguien en `profe` u `operador` hay que correr un script manual en la DB. Esto es inoperable en producción.

## Scope

**Incluye:**
- Listado de todos los usuarios con rol actual, email, fecha de registro
- Cambio de rol desde la UI (jugador ↔ profe ↔ operador ↔ admin_cancha ↔ admin)
- Buscador por email / nombre
- Badge visual por rol
- Confirmación antes de cambiar rol a `admin`
- Link a perfil de profe si rol = profe y existe registro en tabla profes

**No incluye:**
- Edición de datos del usuario (nombre, ciudad, etc.) — scope futuro
- Eliminación de cuentas — requiere flujo ARCO separado
- Impersonación / login-as — seguridad fuera de alcance MVP

## Criterios de aceptación (testeables por QA)

1. La página `/admin/usuarios` lista todos los users con email, nombre, rol, fecha de creación
2. El buscador filtra por email o nombre con debounce ≤ 300ms
3. El selector de rol muestra los 5 roles disponibles; al cambiar, hace PATCH `/api/admin/usuarios/[id]/rol`
4. Cambiar rol a `admin` muestra un modal de confirmación con el email del usuario
5. Un cambio de rol exitoso actualiza el badge en la tabla sin reload de página
6. Un error de la API muestra toast de error con mensaje concreto
7. Solo usuarios con `rol = admin` pueden acceder — cualquier otro recibe redirect a `/auth/login`
8. La columna de profes muestra link a `/profes/[slug]` si existe registro vinculado
9. El endpoint PATCH valida que el rol enviado esté en la lista permitida (no acepta strings arbitrarios)
10. El endpoint PATCH logea el cambio (quién cambió qué, cuándo) en tabla `admin_logs` o equivalente

## Métrica de éxito

- Admin puede cambiar rol de un usuario en < 10 segundos sin abrir una terminal

## Roles existentes

| Valor DB      | Label visible | Redirige a  |
|---------------|---------------|-------------|
| `jugador`     | Jugador       | /mi-padel   |
| `profe`       | Profe         | /profe      |
| `operador`    | Operador Retiros | /operador |
| `admin_cancha`| Admin Cancha  | /club       |
| `admin`       | Administrador | /admin      |
