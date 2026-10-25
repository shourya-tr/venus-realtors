-- Run this in the Supabase SQL Editor (Project -> SQL Editor -> New query).

-- Properties table -----------------------------------------------------

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  price numeric not null,
  address text not null,
  bedrooms smallint not null default 0,
  bathrooms numeric not null default 0,
  sqft integer not null default 0,
  description text not null default '',
  youtube_url text,
  photo_urls text[] not null default '{}',
  is_active boolean not null default true
);

alter table public.properties enable row level security;

-- Anyone (the public site, using the anon key) can read active listings.
create policy "Public can view active properties"
  on public.properties
  for select
  to anon
  using (is_active = true);

-- Leads table -----------------------------------------------------------

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  property_id uuid references public.properties (id) on delete cascade,
  name text not null,
  phone text not null
);

alter table public.leads enable row level security;

-- Anyone can submit the "I'm Interested" form, but nobody using the anon
-- key can read leads back (only the admin pages, via the service role
-- key, can see them).
create policy "Public can submit leads"
  on public.leads
  for insert
  to anon
  with check (true);
