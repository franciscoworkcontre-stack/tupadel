# tupadel

El copiloto del jugador amateur de pádel en LATAM. Reviews de palas con comparador de precios, diagnóstico de nivel Cat 1–6, directorio de canchas y comunidad.

## Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Estilos**: Tailwind CSS v4 + shadcn/ui
- **DB**: Postgres en Supabase con Drizzle ORM
- **Email**: Resend (newsletter + alertas de precio)
- **Hosting**: Vercel
- **Scrapers**: Vercel Cron + Inngest

## Setup

```bash
cp .env.local.example .env.local
# Rellenar variables en .env.local

npm install
npm run dev
```

## Variables de entorno

Ver `.env.local.example` para la lista completa.

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Postgres (Supabase) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key de Supabase |
| `RESEND_API_KEY` | Para emails de alertas y newsletter |

## Comandos

```bash
# Desarrollo
npm run dev

# Migraciones DB
npx drizzle-kit generate
npx drizzle-kit push

# Seed inicial
DATABASE_URL=... npx tsx scripts/seed.ts

# Scrapers (ejecutar manualmente o vía cron)
npx tsx scripts/scraper-padelnuestro.ts
npx tsx scripts/scraper-mercadolibre.ts

# Build
npm run build
```

## Rutas

```
/                          Landing
/diagnostico               Quiz de nivel (14 preguntas)
/palas                     Listado + filtros
/palas/[slug]              Ficha + comparador + histórico
/canchas                   Directorio de ciudades
/canchas/[ciudad]          Lista + mapa
/golpes                    Hub de técnica
/golpes/[slug]             Guía de cada golpe
/categorias                Hub Cat 1–6
/categorias/[n]            Ruta de aprendizaje
/torneos                   Calendario
/mi-padel                  Dashboard usuario
```

## Diseño

- **Tipografía**: Fraunces (display) + DM Sans (UI) + JetBrains Mono (datos)
- **Paleta**: Canvas blanco, verde pádel (#00B85C), naranja court (#E8590C)
- **Referencia visual**: mockup en `tupadel-mockups.html`

## Monetización

1. Afiliados: Padelnuestro, Decathlon, Time2Padel, MercadoLibre
2. Listados destacados: canchas y coaches
3. Contenido patrocinado: marcas (Bullpadel, Adidas, Nox, Head, Babolat)
4. Newsletter premium
