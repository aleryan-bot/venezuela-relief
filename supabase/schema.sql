-- Venezuela Relief MVP schema for Supabase/Postgres.
-- Public visitors can read approved organizations and submit suggestions.
-- Approved editors can manage organizations after Supabase email/password login.

create extension if not exists pgcrypto;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  display_name text not null,
  legal_name text,
  website_url text,
  logo_url text,
  donation_url text,
  ein text,
  us_tax_status text not null default 'unknown'
    check (us_tax_status in ('verified_501c3', 'not_tax_verified', 'not_deductible', 'unknown')),
  receipt_status text not null default 'unknown'
    check (receipt_status in ('yes', 'no', 'unknown')),
  help_types text[] not null default '{}',
  donor_regions text[] not null default '{}',
  trust_level text not null default 'needs_review'
    check (trust_level in ('verified_nonprofit', 'field_partner_verified', 'community_drive', 'needs_review')),
  priority_score integer not null default 50
    check (priority_score >= 0 and priority_score <= 100),
  priority_note text,
  summary_en text not null,
  summary_es text,
  what_they_do_en text,
  what_they_do_es text,
  who_can_help_en text,
  who_can_help_es text,
  where_aid_goes text,
  aid_route_en text,
  aid_route_es text,
  local_partners text,
  evidence_links jsonb not null default '[]'::jsonb,
  risk_notes_en text,
  risk_notes_es text,
  last_checked date,
  status text not null default 'review'
    check (status in ('approved', 'review', 'rejected', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.editor_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'editor'
    check (role in ('editor', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  submitter_name text,
  submitter_email text,
  organization_name text not null,
  organization_url text,
  organization_logo_url text,
  donation_or_signup_url text,
  ein text,
  help_type text not null,
  donor_region text,
  location_served text,
  trust_reason text not null,
  source_links text,
  status text not null default 'new'
    check (status in ('new', 'reviewing', 'approved', 'rejected', 'spam')),
  reviewer_notes text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create table if not exists public.organization_likes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  visitor_key text not null,
  created_at timestamptz not null default now(),
  unique (organization_id, visitor_key)
);

create or replace view public.organization_popularity as
select
  organization_id,
  count(*)::integer as like_count
from public.organization_likes
group by organization_id;

create or replace function public.is_editor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.editor_users
    where user_id = auth.uid()
  );
$$;

create index if not exists organizations_status_idx on public.organizations (status);
create index if not exists organizations_status_priority_idx on public.organizations (status, priority_score desc);
create index if not exists organizations_trust_level_idx on public.organizations (trust_level);
create index if not exists organizations_help_types_idx on public.organizations using gin (help_types);
create index if not exists organizations_donor_regions_idx on public.organizations using gin (donor_regions);
create index if not exists editor_users_email_idx on public.editor_users (email);
create index if not exists submissions_status_idx on public.submissions (status);
create index if not exists organization_likes_organization_idx on public.organization_likes (organization_id);

alter table public.organizations enable row level security;
alter table public.editor_users enable row level security;
alter table public.submissions enable row level security;
alter table public.organization_likes enable row level security;

drop policy if exists "Public can read approved organizations" on public.organizations;
create policy "Public can read approved organizations"
on public.organizations
for select
using (status = 'approved' or public.is_editor());

drop policy if exists "Editors can insert organizations" on public.organizations;
create policy "Editors can insert organizations"
on public.organizations
for insert
to authenticated
with check (public.is_editor());

drop policy if exists "Editors can update organizations" on public.organizations;
create policy "Editors can update organizations"
on public.organizations
for update
to authenticated
using (public.is_editor())
with check (public.is_editor());

drop policy if exists "Editors can delete organizations" on public.organizations;
create policy "Editors can delete organizations"
on public.organizations
for delete
to authenticated
using (public.is_editor());

drop policy if exists "Editors can read own editor status" on public.editor_users;
create policy "Editors can read own editor status"
on public.editor_users
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Public can create suggestions" on public.submissions;
create policy "Public can create suggestions"
on public.submissions
for insert
with check (status = 'new');

drop policy if exists "Editors can read suggestions" on public.submissions;
create policy "Editors can read suggestions"
on public.submissions
for select
to authenticated
using (public.is_editor());

drop policy if exists "Editors can update suggestions" on public.submissions;
create policy "Editors can update suggestions"
on public.submissions
for update
to authenticated
using (public.is_editor())
with check (public.is_editor());

drop policy if exists "Public can create likes" on public.organization_likes;
create policy "Public can create likes"
on public.organization_likes
for insert
with check (true);

-- To approve an editor:
-- 1. Create a user in Supabase Auth.
-- 2. Insert their auth user id into public.editor_users.
-- Example:
-- insert into public.editor_users (user_id, email, role)
-- values ('AUTH_USER_UUID', 'editor@example.com', 'admin');
-- Production likes should use a stable anonymous visitor_key generated by the app or an edge function.
