create extension if not exists pgcrypto with schema extensions;
create extension if not exists citext with schema extensions;

create table if not exists public.waitlist_signups (
  id uuid primary key default extensions.gen_random_uuid(),
  email extensions.citext not null unique,
  source text not null default 'landing',
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.waitlist_signups enable row level security;
