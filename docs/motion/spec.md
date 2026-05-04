# Motion Spec — Admin Roles

## Badge update (rol cambiado)
Trigger: fetch 200  
Duration: 150ms  
Easing: ease-out  
Qué comunica: confirmación visual de cambio aplicado  
`prefers-reduced-motion`: sin transición, swap directo

## Modal enter
Trigger: selección de rol `admin`  
Duration: 120ms  
Easing: ease-out, scale 0.95→1 + opacity 0→1  
`prefers-reduced-motion`: opacity-only, sin scale

## Toast
Trigger: error de API  
Duration: 200ms in, fade 3s, 200ms out  
`prefers-reduced-motion`: sin animación, visible fijo 3s luego desaparece
