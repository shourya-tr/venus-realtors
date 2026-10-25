-- Run this if you already have the properties table and need to add the name column.
alter table public.properties add column if not exists name text not null default '';
