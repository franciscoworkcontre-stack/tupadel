# Design Direction — Admin Roles

**Principios:**
1. **Densidad funcional** — tabla densa, sin padding desperdiciado. Es una herramienta interna.
2. **Señales de rol claras** — cada rol tiene un color badge único, reconocible de un vistazo.
3. **Acción en contexto** — el selector de rol está inline en la fila, sin modal innecesario (excepto escalada a `admin`).
4. **Feedback inmediato** — el badge se actualiza optimistamente; error revierte.
5. **Jerarquía de peligro** — `admin` visualmente diferenciado (rojo) para prevenir cambios accidentales.

**Mood:** Admin tool, no marketing. Dark sidebar existente del layout `/admin`, contenido en `bg-canvas`.
