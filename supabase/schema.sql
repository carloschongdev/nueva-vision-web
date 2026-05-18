-- Profiles (extiende auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  nombre text not null,
  apellido text not null,
  email text not null,
  rol text not null default 'estudiante', -- 'estudiante' | 'admin'
  created_at timestamp with time zone default now()
);

-- Cursos
create table public.cursos (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  descripcion text,
  imagen_url text,
  activo boolean default true,
  orden integer default 0,
  created_at timestamp with time zone default now()
);

-- Módulos
create table public.modulos (
  id uuid default gen_random_uuid() primary key,
  curso_id uuid references public.cursos(id) on delete cascade,
  titulo text not null,
  descripcion text,
  orden integer default 0,
  created_at timestamp with time zone default now()
);

-- Lecciones
create table public.lecciones (
  id uuid default gen_random_uuid() primary key,
  modulo_id uuid references public.modulos(id) on delete cascade,
  titulo text not null,
  contenido text,
  video_url text,
  orden integer default 0,
  created_at timestamp with time zone default now()
);

-- Materiales descargables
create table public.materiales (
  id uuid default gen_random_uuid() primary key,
  leccion_id uuid references public.lecciones(id) on delete cascade,
  nombre text not null,
  archivo_url text not null,
  tipo text default 'pdf',
  created_at timestamp with time zone default now()
);

-- Evaluaciones
create table public.evaluaciones (
  id uuid default gen_random_uuid() primary key,
  modulo_id uuid references public.modulos(id) on delete cascade,
  titulo text not null,
  preguntas jsonb not null default '[]',
  puntaje_minimo integer default 70,
  created_at timestamp with time zone default now()
);

-- Calificaciones
create table public.calificaciones (
  id uuid default gen_random_uuid() primary key,
  usuario_id uuid references public.profiles(id) on delete cascade,
  evaluacion_id uuid references public.evaluaciones(id) on delete cascade,
  puntaje integer not null,
  respuestas jsonb,
  created_at timestamp with time zone default now(),
  unique(usuario_id, evaluacion_id)
);

-- Progreso de lecciones
create table public.progreso (
  id uuid default gen_random_uuid() primary key,
  usuario_id uuid references public.profiles(id) on delete cascade,
  leccion_id uuid references public.lecciones(id) on delete cascade,
  completado boolean default false,
  created_at timestamp with time zone default now(),
  unique(usuario_id, leccion_id)
);

-- Certificados
create table public.certificados (
  id uuid default gen_random_uuid() primary key,
  usuario_id uuid references public.profiles(id) on delete cascade,
  curso_id uuid references public.cursos(id) on delete cascade,
  fecha_emision timestamp with time zone default now(),
  unique(usuario_id, curso_id)
);

-- RLS (Row Level Security)
alter table public.profiles enable row level security;
alter table public.cursos enable row level security;
alter table public.modulos enable row level security;
alter table public.lecciones enable row level security;
alter table public.materiales enable row level security;
alter table public.evaluaciones enable row level security;
alter table public.calificaciones enable row level security;
alter table public.progreso enable row level security;
alter table public.certificados enable row level security;

-- Políticas básicas
create policy "Profiles visibles para el dueño"
  on public.profiles for select using (auth.uid() = id);

create policy "Cursos visibles para autenticados"
  on public.cursos for select using (auth.role() = 'authenticated');

create policy "Módulos visibles para autenticados"
  on public.modulos for select using (auth.role() = 'authenticated');

create policy "Lecciones visibles para autenticados"
  on public.lecciones for select using (auth.role() = 'authenticated');

create policy "Materiales visibles para autenticados"
  on public.materiales for select using (auth.role() = 'authenticated');

create policy "Evaluaciones visibles para autenticados"
  on public.evaluaciones for select using (auth.role() = 'authenticated');

create policy "Calificaciones propias"
  on public.calificaciones for all using (auth.uid() = usuario_id);

create policy "Progreso propio"
  on public.progreso for all using (auth.uid() = usuario_id);

create policy "Certificados propios"
  on public.certificados for select using (auth.uid() = usuario_id);

-- Admin policies (service role bypasses RLS, but we also allow admins)
create policy "Admins pueden todo en cursos"
  on public.cursos for all using (
    exists (select 1 from public.profiles where id = auth.uid() and rol = 'admin')
  );

create policy "Admins pueden todo en modulos"
  on public.modulos for all using (
    exists (select 1 from public.profiles where id = auth.uid() and rol = 'admin')
  );

create policy "Admins pueden todo en lecciones"
  on public.lecciones for all using (
    exists (select 1 from public.profiles where id = auth.uid() and rol = 'admin')
  );

create policy "Admins pueden todo en materiales"
  on public.materiales for all using (
    exists (select 1 from public.profiles where id = auth.uid() and rol = 'admin')
  );

create policy "Admins pueden todo en evaluaciones"
  on public.evaluaciones for all using (
    exists (select 1 from public.profiles where id = auth.uid() and rol = 'admin')
  );

create policy "Admins pueden todo en calificaciones"
  on public.calificaciones for all using (
    exists (select 1 from public.profiles where id = auth.uid() and rol = 'admin')
  );

create policy "Admins pueden ver todos los certificados"
  on public.certificados for all using (
    exists (select 1 from public.profiles where id = auth.uid() and rol = 'admin')
  );

-- Función SECURITY DEFINER para evitar recursión infinita en RLS
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and rol = 'admin'
  );
$$;

create policy "Admins pueden ver todos los perfiles"
  on public.profiles for all using (public.is_admin());

-- Trigger para crear profile al registrarse
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nombre, apellido, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nombre', ''),
    coalesce(new.raw_user_meta_data->>'apellido', ''),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
