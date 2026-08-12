# CLAUDE.md — REVOLUTIVA.TRAVEL

## Qué es este proyecto

**REVOLUTIVA.TRAVEL** es un marketplace curado de experiencias, hospedajes y operadores regenerativos. Es una iniciativa de la **IGTR (Iniciativa Global de Turismo Regenerativo)** con sede en `turismoregenerativo.org`.

Tagline: *"Viajes que regeneran relaciones: contigo, con las comunidades y con la naturaleza."*

El proyecto es una app **Next.js 14 (App Router) + Supabase** (Postgres, Auth, RLS), pensada para producción: SSR/ISR real para SEO, admin panel con autenticación, y leads/postulaciones persistidos en base de datos en vez de `localStorage`.

> El archivo original `revolutiva-travel.html` (SPA de un solo archivo, sin backend) se conserva en el repo como referencia histórica del diseño y contenido, pero **ya no es la fuente de verdad** — todo el contenido vive ahora en Supabase.

---

## Estructura del proyecto

```
Revolutiva-/
├── src/
│   ├── app/
│   │   ├── layout.tsx, page.tsx, globals.css   ← root layout (fonts, header, footer) + home
│   │   ├── explorar/                            ← buscador/filtrador (client component)
│   │   ├── experiencias/ hospedajes/ operadores/ ← páginas de categoría (SSR)
│   │   ├── [cat]/[slug]/                         ← detalle de listing (SSR + ISR 3600s)
│   │   ├── principios/ niveles/ indicadores/ mentoria/  ← páginas estáticas de contenido IGTR
│   │   ├── postular/                             ← formulario de postulación
│   │   ├── admin/                                ← panel admin (auth-gated por middleware)
│   │   ├── sitemap.ts, robots.ts
│   ├── components/          ← ListingCard, RPanel, RChips, BookingSidebar, LeadFormModal, admin/*, etc.
│   ├── lib/
│   │   ├── supabase/        ← client.ts (browser), server.ts (RSC), admin.ts (service role), middleware.ts
│   │   ├── constants.ts     ← TIPOS_EXP, RELACIONES, R_DIMS, NIVELES, ST, CAT_META
│   │   ├── types.ts         ← tipos TS que reflejan el schema de `listings`
│   │   └── queries.ts       ← queries server-side reusables
│   └── middleware.ts        ← gate de /admin/*
├── supabase/
│   ├── seed.sql              ← seed generado (11 listings + tipos_experiencia)
│   └── migrations/           ← (schema ya aplicado directamente vía Supabase MCP)
├── scripts/
│   ├── seed-data.mjs         ← genera supabase/seed.sql a partir de los datos legacy
│   ├── sync-assets.mjs       ← copia las carpetas de imágenes (en la raíz del repo) a public/
│   └── migrate-images.ts     ← (pendiente) optimización + subida a Supabase Storage
├── public/                   ← GENERADO por sync-assets.mjs (gitignored), no versionado
├── Amalurra/ "Cerro Guido/" KodKod/ "La Baita/" "Llama Trek/" Malinali/
│   "Nueva carpeta/" ONCE/ "Selva Bananito/" Yachaqs/  ← imágenes fuente (tracked en git)
├── Dockerfile                ← build para EasyPanel (standalone output)
├── revolutiva-travel.html    ← versión legacy de referencia (no se sirve en producción)
└── CLAUDE.md
```

---

## Backend: Supabase

Proyecto Supabase: **Revolutiva** (`bcnuuqhytnqqetjqkpra`, org `hndrjlnobxthtlijtdkh`, región `us-east-1`).

### Tablas (schema en `public`)
- **`listings`** — todos los proyectos (experiencia/hospedaje/guiado). Campos comunes a nivel de columna + `category_data JSONB` para lo específico de cada categoría (ver abajo). RLS: lectura pública solo si `published = true`; admin (`is_admin()`) lee/escribe todo.
- **`leads`** — consultas de visitantes (botones "Pedir cotización", etc. en el detalle). Cualquiera puede insertar (`INSERT`); solo admin lee/actualiza.
- **`postulations`** — postulaciones del formulario `/postular`. Mismo patrón de RLS que `leads`.
- **`tipos_experiencia`** — catálogo de tipos (lookup), poblado con los 17 valores de `TIPOS_EXP`.

`is_admin()` es una función `SECURITY DEFINER` que chequea `raw_user_meta_data->>'role' = 'admin'` sobre `auth.uid()`. **No hay usuarios públicos** — solo 1-2 cuentas admin de la IGTR, creadas manualmente en el Supabase Dashboard con `role: 'admin'` en los metadata del usuario.

### `category_data` por categoría
**Hospedaje**: `tipoAloj, habitaciones, alimentacion, proveedores, agua, energia, residuos, comunidad, conservacion, filosofia, experienciasAsoc[]`
**Guiado**: `especialidad, historiaPersonal, relTerritorio, tiposGuiado[], saberes, cuidaRitmo, interpreta, seguridad, acuerdos, limites, tarifa`
**Experiencia**: sin campos adicionales (todo vive en columnas).

### Variables de entorno
Ver `.env.example`. En producción (EasyPanel) hace falta además `SUPABASE_SERVICE_ROLE_KEY` (para scripts de migración de imágenes / operaciones admin fuera de RLS) y, si se activan notificaciones por email, `RESEND_API_KEY`.

---

## Conceptos clave del negocio

### Las 3 relaciones (base filosófica)
Todo listing se clasifica por su relación principal (`listings.relacion`):
- `conmigo` — Reconexión personal
- `comunidad` — Comunidad y economía local
- `naturaleza` — Regeneración de la naturaleza
- `integral` — Las 3 relaciones juntas (máxima integración)

### Las 5 dimensiones R
Cada listing es evaluado en 5 dimensiones (`listings.r1`…`r5`) con estado `inicial | desarrollo | enraizado`:

| Código | Nombre | Pregunta clave |
|--------|--------|----------------|
| R1 | Reconexión personal | ¿Qué cambia o se despierta en el viajero? |
| R2 | Relaciones comunitarias | ¿A quién fortalece esta experiencia en el territorio? |
| R3 | Regeneración de naturaleza | ¿Qué sistema natural cuida o mejora? |
| R4 | Ritmos del lugar | ¿Cuándo y cómo es sano visitar este lugar? |
| R5 | Reciprocidad y evolución | ¿Qué devuelve el proyecto y cómo evoluciona? |

### Niveles evolutivos de un proyecto (`listings.nivel`)
- **Nivel 1 — En incubación** (terracota): proyecto nuevo, en desarrollo inicial
- **Nivel 2 — En transición** (ámbar): avanzando, con compromisos parciales
- **Nivel 3 — Enraizado** (verde): compromisos maduros y evidencia sólida

---

## Listados actuales (11, sembrados en Supabase)

### Experiencias
| slug | Nombre | País | Nivel |
|---|---|---|---|
| `once-viaje-mujeres-oaxaca` | Once · Viaje de mujeres por Oaxaca | México | 3 |
| `tierra-yachaqs-valle-sagrado` | La Tierra de los Yachaqs · Valle Sagrado | Perú | 3 |
| `llama-trek-olleros-chavin` | Llama Trek Olleros–Chavín | Perú | 2 |
| `malinali-viaje-biocultural-mexico` | Malinali · Viaje biocultural por México | México | 3 |

### Hospedajes
| slug | Nombre | País | Nivel |
|---|---|---|---|
| `estancia-cerro-guido` | Estancia Cerro Guido | Chile | 3 |
| `selva-bananito-lodge` | Selva Bananito Lodge | Costa Rica | 3 |
| `la-baita-conguillio` | La Baita Conguillío | Chile | 2 |
| `lodge-kodkod` | Lodge Kodkod | Chile | 2 |
| `amalurra-ecohotel-centro-retiro` | Amalurra | España | 2 |

### Operadores guiados
| slug | Nombre | País | Nivel |
|---|---|---|---|
| `arrieros-guias-comunitarios-olleros` | Arrieros y guías comunitarios de Olleros | Perú | 2 |
| `tejedoras-guia-patabamba-red-yachaqs` | Tejedoras-guía de Patabamba · Red Yachaqs | Perú | 3 |

---

## Cómo trabajar en este proyecto

### Editar contenido de un listing
Vía `/admin/listings/[id]` (requiere cuenta admin), o directo en Supabase (`execute_sql` / dashboard). El formulario admin cubre todos los campos de columna; `category_data` se edita como JSON crudo.

### Agregar un nuevo listing
1. Preparar las imágenes en `public/{Carpeta}/` (o subirlas a Supabase Storage cuando el pipeline de `migrate-images.ts` esté activo)
2. Crear el listing desde `/admin/listings/new`, o insertar directo en `listings` con un `slug` único
3. Publicar (`published = true`) cuando esté listo

### Agregar una nueva página estática
1. Crear `src/app/{ruta}/page.tsx` (Server Component)
2. Agregar el link en `src/components/Header.tsx` y/o `Footer.tsx`

### Imágenes
- Las carpetas de imágenes viven en la **raíz del repo** (igual que en el HTML original) y son la fuente versionada en git
- `scripts/sync-assets.mjs` las copia a `public/` (gitignored, generado) antes de `dev`/`build` — así Next.js las sirve en las mismas rutas relativas que tenía el HTML original (p. ej. `/Yachaqs/portada.jpeg`, `/Once head.jpg`). El `Dockerfile` dispara esto automáticamente vía el hook `prebuild` de npm
- Los listings `guiado` originales usaban IDs de Unsplash — se resolvieron a URLs completas de `images.unsplash.com` en el seed
- Migración a Supabase Storage con optimización WebP: pendiente (`scripts/migrate-images.ts`), requiere `SUPABASE_SERVICE_ROLE_KEY`

---

## Convenciones de diseño

- **No usar colores hardcoded** — siempre usar variables CSS (`var(--forest)`, etc.), definidas en `src/app/globals.css` (portado verbatim del HTML original)
- **Clases utilitarias disponibles**: `.wrap`, `.eyebrow`, `.lead`, `.muted`, `.center`, `.serif-it`
- **Botones**: `.btn .btn-primary` | `.btn .btn-terra` | `.btn .btn-ghost` + modificadores `.btn-sm`, `.btn-block`
- **Animaciones de entrada**: agregar clase `.reveal` a un elemento y montar `<RevealOnScroll />` en la página — convierte a `.reveal.in` al entrar al viewport
- **Toast notifications**: `showToast("mensaje")` desde `@/components/Toast`
- Tipografía: **Fraunces** (serif, títulos/quotes) + **Inter** (sans-serif), cargadas self-hosted vía `next/font/google` en `layout.tsx`

---

## Deploy

- **Target**: VPS vía EasyPanel + Docker (`Dockerfile` multi-stage, `output: 'standalone'`)
- Variables de entorno requeridas en EasyPanel: ver `.env.example`
- Dominio: apuntar `revolutiva.travel` al servicio de EasyPanel (HTTPS automático vía Let's Encrypt)
- El build de producción (`npm run build`) fue verificado localmente y compila sin errores; el smoke test end-to-end contra Supabase no pudo correrse desde este entorno de desarrollo por restricciones de red del sandbox (el host de Supabase no está en el allowlist de egress) — probar en el entorno real de deploy.

---

## Repositorio GitHub

- **URL**: https://github.com/martinaraneda-creator/Revolutiva-.git
- **Rama principal**: `main`

---

## Contexto de la IGTR

La **Iniciativa Global de Turismo Regenerativo (IGTR)** es la organización detrás de REVOLUTIVA.TRAVEL. Su misión es promover el turismo que va más allá de la sostenibilidad hacia la regeneración activa de las tres relaciones fundamentales: la relación con uno mismo, con las comunidades y con la naturaleza.

Sitio web: [turismoregenerativo.org](https://turismoregenerativo.org/)
