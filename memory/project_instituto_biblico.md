---
name: Instituto Bíblico - Supabase LMS
description: Instituto Bíblico Nueva Visión — LMS completo con Supabase Auth, rutas protegidas y panel admin
type: project
---

El proyecto tiene un LMS completo en `/app/instituto/` con Supabase.

**Why:** El usuario quería una plataforma de formación bíblica integrada al sitio principal.

**Estructura implementada:**
- `lib/supabase/client.ts` — cliente browser (SSR)
- `lib/supabase/server.ts` — cliente server + `createServiceClient()` con service_role
- `supabase/schema.sql` — tablas: profiles, cursos, modulos, lecciones, materiales, evaluaciones, calificaciones, progreso, certificados
- `middleware.ts` — protege `/instituto/dashboard`, `/instituto/cursos`, `/instituto/lecciones`, `/instituto/admin`
- `app/api/instituto/logout/route.ts` — POST logout con redirect

**Páginas:**
- `/instituto` — pública, muestra cursos con service_role
- `/instituto/login` + `/registro` — formularios client-side
- `/instituto/dashboard` — progreso, cursos, calificaciones, certificados
- `/instituto/cursos` + `/cursos/[id]` — lista y detalle con progreso por lección
- `/instituto/lecciones/[id]` — video YouTube embed, contenido, materiales, prev/next
- `/instituto/admin` — panel admin (requiere rol='admin' en profiles)
- `/instituto/admin/cursos` — CRUD cursos
- `/instituto/admin/cursos/[id]` — editar curso + gestionar módulos y lecciones

**Pendiente:**
- Ejecutar `supabase/schema.sql` en Supabase SQL Editor antes de usar
- Agregar variables en Vercel Settings → Environment Variables
- El storage de Supabase para materiales PDF debe configurarse manualmente

**How to apply:** Al modificar cualquier página del instituto, respetar el patrón: server components para datos con `createClient()`, client components para formularios e interactividad con `createClient()` del browser.
