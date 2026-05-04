# Mobile Adaptation — Admin Roles

Esta es una pantalla de admin interno — acceso mayormente desde desktop.  
Igual se garantiza usabilidad en 375px.

## Tabla en mobile
- Columnas visibles: Email + Rol + selector (las más críticas)
- Nombre y Registrado se colapsan debajo del email en texto pequeño
- Selector de rol como `<select>` nativo → touch target OK por OS

## Search
- Input full-width, teclado virtual no desplaza la tabla fuera del viewport (sticky search arriba)

## Modal de confirmación
- Full-width en mobile, max-width 400px en desktop
- Botones full-width en mobile, stack vertical

## Touch targets
- Selector de rol: mínimo 44px de alto (padding vertical garantizado)
- Botones del modal: 48px de alto
