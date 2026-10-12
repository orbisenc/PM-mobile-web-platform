-- 세대원 전자 동의 플랫폼 운영 DB 초안
-- 실제 운영 전 법률·보안 검토, 보존/파기 정책, 본인인증 공급자 명세를 반영해야 합니다.
create extension if not exists pgcrypto;

create type public.consent_decision as enum ('agree', 'disagree');
create type public.submission_status as enum ('draft', 'submitted', 'withdrawn', 'superseded');

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  location text,
  scale text,
  summary text,
  purpose text,
  period_text text,
  hero_image_url text,
  contact_text text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_models (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects on delete cascade,
  model_key text not null,
  label text not null,
  sketchfab_uid text check (sketchfab_uid is null or sketchfab_uid ~ '^[A-Za-z0-9]{20,40}$'),
  description text,
  thumbnail_url text,
  sort_order integer not null default 0,
  unique(project_id, model_key)
);

create table public.project_videos (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects on delete cascade,
  video_type text not null check (video_type in ('youtube', 'mp4')),
  source_value text not null,
  title text not null,
  description text,
  thumbnail_url text,
  sort_order integer not null default 0
);

create table public.project_comparisons (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects on delete cascade,
  category text not null,
  before_value text not null,
  after_value text not null,
  sort_order integer not null default 0
);

create table public.project_documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects on delete cascade,
  title text not null,
  file_url text not null,
  file_type text,
  sort_order integer not null default 0
);

create table public.households (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects on delete cascade,
  building text not null,
  unit text not null,
  external_reference text,
  created_at timestamptz not null default now(),
  unique(project_id, building, unit)
);

create table public.consent_subjects (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.households on delete cascade,
  display_name text not null,
  phone_ciphertext text,
  invite_token_hash text unique,
  identity_status text not null default 'unverified',
  created_at timestamptz not null default now()
);

create table public.consent_document_versions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects on delete restrict,
  version_label text not null,
  body text not null,
  body_sha256 text not null,
  published_at timestamptz,
  retired_at timestamptz,
  created_at timestamptz not null default now(),
  unique(project_id, version_label)
);

create table public.consent_submissions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects on delete restrict,
  subject_id uuid not null references public.consent_subjects on delete restrict,
  document_version_id uuid not null references public.consent_document_versions on delete restrict,
  status public.submission_status not null default 'submitted',
  decision public.consent_decision not null,
  required_privacy_accepted boolean not null,
  optional_marketing_accepted boolean not null default false,
  identity_provider text,
  identity_result jsonb,
  signature_provider text,
  signature_evidence_ref text,
  receipt_number text not null unique,
  submitted_at timestamptz not null default now(),
  supersedes_submission_id uuid references public.consent_submissions on delete restrict,
  client_metadata jsonb not null default '{}'::jsonb
);

create table public.consent_audit_events (
  id bigint generated always as identity primary key,
  project_id uuid not null references public.projects on delete restrict,
  submission_id uuid references public.consent_submissions on delete restrict,
  subject_id uuid references public.consent_subjects on delete restrict,
  event_type text not null,
  actor_type text not null,
  actor_id text,
  event_data jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null default now(),
  previous_event_hash text,
  event_hash text not null
);

create table public.admin_users (
  user_id uuid primary key references auth.users on delete cascade,
  display_name text not null,
  role text not null check (role in ('owner', 'manager', 'viewer')),
  project_id uuid references public.projects on delete cascade,
  created_at timestamptz not null default now()
);

create index consent_submissions_project_idx on public.consent_submissions(project_id, submitted_at desc);
create index consent_submissions_subject_idx on public.consent_submissions(subject_id, submitted_at desc);
create index audit_submission_idx on public.consent_audit_events(submission_id, occurred_at);

alter table public.projects enable row level security;
alter table public.project_models enable row level security;
alter table public.project_videos enable row level security;
alter table public.project_comparisons enable row level security;
alter table public.project_documents enable row level security;
alter table public.households enable row level security;
alter table public.consent_subjects enable row level security;
alter table public.consent_document_versions enable row level security;
alter table public.consent_submissions enable row level security;
alter table public.consent_audit_events enable row level security;
alter table public.admin_users enable row level security;

-- 공개 사업 정보는 발행된 프로젝트에 한해 읽기 허용.
create policy "published projects are readable" on public.projects for select using (is_published = true);
create policy "published project models are readable" on public.project_models for select using (exists (select 1 from public.projects p where p.id = project_id and p.is_published));
create policy "published project videos are readable" on public.project_videos for select using (exists (select 1 from public.projects p where p.id = project_id and p.is_published));
create policy "published comparisons are readable" on public.project_comparisons for select using (exists (select 1 from public.projects p where p.id = project_id and p.is_published));
create policy "published documents are readable" on public.project_documents for select using (exists (select 1 from public.projects p where p.id = project_id and p.is_published));
create policy "published consent versions are readable" on public.consent_document_versions for select using (published_at is not null and retired_at is null);

-- 개인정보/제출/관리 데이터는 익명 클라이언트 정책을 만들지 않습니다.
-- 검증된 서버 API 또는 별도 인증 컨텍스트에서만 서비스 역할/세분화 정책으로 접근합니다.
