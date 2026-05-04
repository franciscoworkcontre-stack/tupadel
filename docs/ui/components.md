# UI Components — Admin Roles

## RoleBadge
Props: `rol: string`  
Estados: idle  
Variantes: jugador | profe | operador | admin_cancha | admin  
Colores: de `tokens.json > roles`  
Accesibilidad: `title` con descripción del rol (tooltip nativo)

## RoleSelector
Props: `userId: string, currentRol: string, onSuccess: (newRol) => void`  
Estados: idle | loading | error  
Variante única: `<select>` con las 5 opciones. Si el nuevo valor es `admin` → abre ConfirmModal antes de hacer fetch.  
Accesibilidad: `<label>` asociado con `htmlFor`, `aria-busy` en loading.

## ConfirmModal
Props: `email: string, onConfirm: () => void, onCancel: () => void`  
Estados: open | closed  
Variante única. Trap focus cuando abierto. Cierra con Escape.  
Accesibilidad: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.

## UserTable
Props: `users: User[]`  
Estados: empty | populated  
Columnas: Email · Nombre · Rol · Registrado · Acciones  
Mobile: colapsa Nombre y Registrado en una segunda línea bajo Email.

## SearchInput
Props: `value: string, onChange: (v: string) => void`  
Debounce 300ms en el componente padre.  
Estados: idle | has-value (muestra botón de clear ×)  
Accesibilidad: `role="search"`, `aria-label="Buscar usuarios"`.

## Toast (reutilizar patrón existente o crear mínimo)
Props: `message: string, type: "success" | "error"`  
Duración: 3s. Posición: bottom-right.  
`prefers-reduced-motion`: sin slide-in, aparece directo.
