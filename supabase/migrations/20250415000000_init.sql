-- =============================================================
-- 0001_init.sql — Orator initial schema
-- =============================================================

-- ─── EXTENSIONS ───────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── TABLES ───────────────────────────────────────────────────

create table public.blocks (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text,
  order_index int  not null default 0
);

create table public.topics (
  id          uuid primary key default uuid_generate_v4(),
  block_id    uuid not null references public.blocks(id) on delete cascade,
  title       text not null,
  description text,
  order_index int  not null default 0
);

create table public.exercises (
  id               uuid    primary key default uuid_generate_v4(),
  topic_id         uuid    not null references public.topics(id) on delete cascade,
  title            text    not null,
  instruction      text    not null,
  animation_type   text,
  default_duration int     not null,
  default_params   jsonb   not null default '{}',
  is_active        boolean not null default true,
  order_index      int     not null default 0
);

create table public.recommendations (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  body        text not null,
  url         text,
  image_url   text,
  exercise_id uuid references public.exercises(id) on delete set null
);

create table public.profiles (
  id               uuid        primary key references auth.users(id) on delete cascade,
  phone            text,
  has_subscription boolean     not null default false,
  created_at       timestamptz not null default now()
);

create table public.completions (
  id           uuid        primary key default uuid_generate_v4(),
  user_id      uuid        not null references auth.users(id) on delete cascade,
  exercise_id  uuid        not null references public.exercises(id) on delete cascade,
  duration     int         not null,
  params       jsonb       not null default '{}',
  completed_at timestamptz not null default now()
);

-- ─── INDEXES ──────────────────────────────────────────────────

create index on public.topics(block_id);
create index on public.exercises(topic_id);
create index on public.completions(user_id);
create index on public.completions(exercise_id);
create index on public.completions(user_id, completed_at);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────

alter table public.blocks          enable row level security;
alter table public.topics          enable row level security;
alter table public.exercises       enable row level security;
alter table public.recommendations enable row level security;
alter table public.profiles        enable row level security;
alter table public.completions     enable row level security;

-- blocks: public read
create policy "blocks_select_all"
  on public.blocks for select
  using (true);

-- topics: public read
create policy "topics_select_all"
  on public.topics for select
  using (true);

-- exercises: public read
create policy "exercises_select_all"
  on public.exercises for select
  using (true);

-- recommendations: public read
create policy "recommendations_select_all"
  on public.recommendations for select
  using (true);

-- profiles: own row only
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- completions: own rows only
create policy "completions_select_own"
  on public.completions for select
  using (auth.uid() = user_id);

create policy "completions_insert_own"
  on public.completions for insert
  with check (auth.uid() = user_id);

-- ─── TRIGGER: auto-create profile on sign-up ──────────────────

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
