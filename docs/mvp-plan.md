# MVP Plan

## Goal

Deliver a hosted MVP that routes inbound leads to the right reps and enables instant booking based on rep availability, with an admin dashboard for configuration and a rep dashboard for day-to-day visibility.

## Target users

- Sales/SDR managers who configure routing rules and teams
- Account executives/SDRs who receive allocations and manage availability

## Core MVP scope

- Authentication and org onboarding
  - Email + password sign-in, invite-based org creation
  - Basic RBAC: Admin vs Rep
- Team and user management
  - Create teams, add members, working hours
  - Personal calendar connection (Google OAuth)
- Calendar availability
  - Pull primary calendar events; respect Busy vs Free
  - Compute availability windows respecting working hours and timezone
- Routing rules engine (v1)
  - Rule groups defined by conditions (e.g., company size, region) with AND/OR
  - Catch-all team fallback
  - Weighted round-robin within team with sticky assignment for existing contacts
- Booking experience
  - Hosted booking page per event type and smart per-rep links
  - Real-time slot generation using availability and event duration
  - Booking confirmation emails and calendar invites
- Allocation log and dashboards
  - Append on booking; show rationale, ownership, status
  - Admin dashboard for queue visibility and rule testing
  - Rep dashboard for schedule and allocations
- Integrations (MVP)
  - Google Calendar (OAuth2, Calendar API)
  - CRM webhook connector surface (post-booking payload to URL)

## Nice-to-have (post-MVP)

- Multi-calendar support and buffer times
- Round-robin visibility and load balancing controls
- SLA windows and time-to-contact alerts
- Event rescheduling/cancellation flows
- Native CRM integrations (HubSpot, Salesforce)
- Audit trails and analytics
- SSO (Google, Okta)

## Architecture (MVP)

- Frontend: React + Tailwind (Vite), hosted on Vercel/Netlify
- Backend: Node (Express/Fastify) or NestJS, hosted on Fly.io/Render
- DB: Postgres (Supabase/RDS) + Prisma
- Auth: Clerk/Supabase Auth or custom JWT sessions
- Integrations: Google Calendar via OAuth2; webhook delivery via background worker
- Infra: Terraform-lite or IaC in repo, GitHub Actions for CI

## Data model (high-level)

- Organization(id, name)
- User(id, orgId, role, email, name, timezone)
- Team(id, orgId, name)
- TeamMember(teamId, userId, weight, workingHours)
- EventType(id, orgId, name, duration, config)
- RuleGroup(id, eventTypeId, teamId, conditionsJson)
- AllocationLog(id, orgId, lead, email, rationale, assignedToUserId, status, meetingAt)
- OAuthToken(userId, provider, accessToken, refreshToken, expiresAt)

## Milestones and timeline (indicative)

- M1 (Week 1-2): Project setup, auth, orgs, users, teams
- M2 (Week 3-4): Google Calendar integration, availability engine, event types
- M3 (Week 5): Routing rules v1 and weighted round-robin
- M4 (Week 6): Booking UI + slot generation + invites
- M5 (Week 7): Allocation log, dashboards, webhook payloads
- M6 (Week 8): Hardening, telemetry, onboarding guide, MVP launch

## Risks and mitigations

- Calendar complexity: start with primary calendar, Busy-only; add buffers later
- Timezones and DST: use user-level timezone, rely on Luxon/date-fns-tz
- OAuth quotas and errors: cache windows; graceful degradation and retries
- Routing correctness: add rule tester and decision logs early
- Data privacy: least-privilege scopes; encrypt tokens; strict PII handling

## Success metrics

- Time to first booking post-signup (< 15 minutes)
- Conversion rate from booking page to scheduled (> 40%)
- Lead assignment balance within ±20% across team members
- Setup completion rate in first session (> 70%)

## Rollout plan

- Private beta with 3-5 design partners
- Weekly release cadence; collect feedback via in-app prompts
- Documented onboarding checklist and loom walkthrough
