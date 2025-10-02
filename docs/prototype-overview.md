# Prototype Overview

## Product summary
Fairly is a lead allocation and booking experience that routes inbound demo requests to the right team member based on rules (e.g., company size) and rep availability (working hours, calendar blocks), and provides a rep dashboard.

## Scope of the prototype
This prototype is a static front-end implemented in a single `index.html` that demonstrates:
- Admin Dashboard with:
  - Live pop-up simulation trigger
  - Live Allocation Queue visualization per team
  - Allocation Log with status editing
  - Team Working Hours editor
  - Routing Rules overview
- Rep Dashboard with:
  - Availability/status card
  - Weekly schedule visualization (working hours, busy/free events, booked demos)
  - Recent allocations table
  - Smart booking link copy UX

## Key assumptions and simplifications
- Mock data only; no backend or persistence beyond in-memory state and localStorage for rotation index.
- Google Calendar integration is simulated with `mockCalendarEvents` and `gcalStatus` flags.
- Lead routing logic is explanatory; no real-time rule engine—rules are visualized from `globalState.eventTypes`.
- Booking widget is a stub via `window.showBookingWidget` alert.
- Authentication and authorization are not implemented; `appState.loggedInRepId` is hardcoded.
- Timezone handling is simplified using a fixed `currentDate`.
- UI is built with Tailwind via CDN and custom styles.

## Prototype architecture
- Single-page app rendered with DOM APIs in `index.html` (no framework).
- `globalState` contains teams, events, mock CRM, allocation log, mock calendar events.
- `appState` tracks current view, the logged-in rep, and the current date.
- Rendering functions create sections/cards and re-render on state changes.

## What’s demonstrable
- How routing rules could map segments (e.g., company size) to teams.
- How availability considers working hours, OOO, meetings (busy vs free), and booked demos.
- How an allocation log might be reviewed and updated for outcomes.

## Out-of-scope (for the prototype)
- Real API integrations (Google, HubSpot/Salesforce, Calendly/Cal.com).
- Multi-tenant accounts, user management, and SSO.
- Data storage, analytics, audit logs.
- Role-based access control and permissions.
- Webhooks and background jobs.

## Next steps toward MVP
See `mvp-plan.md` for a pragmatic path to an initial product release.
