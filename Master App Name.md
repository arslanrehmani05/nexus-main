# NEXUS — Master Platform Document

> **Enterprise Business Work Management & Operations Platform**
> *"Software that can be shaped around the way a particular business operates."*

---

## EXECUTIVE SUMMARY & SYSTEM VISION

You are building **NEXUS** — a modern, enterprise-grade business work management and operations platform.

> **CRITICAL DIRECTIVES**
> - This is **NOT** a simple Kanban demo.
> - Do **NOT** build a toy CRUD application.
> - Do **NOT** build only a task manager.
> - Do **NOT** stop after making a visually impressive dashboard.

Build the foundation of a serious product combining the breadth of modern platforms such as Asana, Monday.com, Jira, Linear, ClickUp and similar work-management systems, while using completely original branding, visual design, components and implementation.

NEXUS should ultimately demonstrate this capability:

> *"Software that can be shaped around the way a particular business operates."*

The system should therefore be designed as a **configurable platform** rather than a hard-coded project-management application.

---

## TECH STACK

Use:
- **Next.js** (App Router, Server Actions, React Server Components)
- **TypeScript** (Strict Mode)
- **React**
- **Tailwind CSS**
- **Supabase**
- **PostgreSQL**
- **Supabase Auth**
- **Row Level Security (RLS)**
- Modern component architecture
- Server-side actions / API routes where appropriate

Structure the application so that future AI agents, integrations, automations and external APIs can be added without rewriting the core architecture.

The application must be responsive and **PWA-ready**.

---

## COMPLETE PLATFORM SPECIFICATIONS (SECTIONS 1 TO 58)

### 1. GLOBAL PRODUCT ARCHITECTURE
Nexus should have these fundamental concepts:
- Organization
- Workspace
- Team
- User
- Role
- Permission
- Project
- Portfolio
- Folder
- List
- Task
- Subtask
- Milestone
- Goal
- Status
- Workflow
- Custom Field
- View
- Dashboard
- Automation
- Integration
- Notification
- Comment
- Attachment
- Activity
- Time Entry
- Form
- Template
- Dependency
- Approval
- Audit Log

Design the database around these entities rather than creating a single giant "tasks" table.
The architecture must support multiple organizations and multiple users. Every organization must be isolated.
Do not rely solely on frontend filtering for security. Use PostgreSQL constraints, foreign keys, indexes, Supabase Auth, roles, grants and RLS appropriately.

### 2. APPLICATION SHELL
Create a polished application shell containing:

**LEFT SIDEBAR**
- Nexus logo
- Workspace selector
- Search
- Home
- Inbox
- My Work
- Favorites
- Recent
- Teams
- Projects
- Portfolios
- Goals
- Dashboards
- Reports
- Calendar
- Forms
- Automations
- Templates
- Time Tracking
- Integrations
- Settings

Sidebar capabilities: collapse/expand, nested navigation, favorites, recent items, drag-and-drop ordering where appropriate, workspace switching, team navigation.

**TOP BAR**
- Global search
- Command palette (`Cmd/Ctrl + K`)
- Create button
- Notifications
- Help
- Workspace / user menu

### 3. HOME
Create a personalized home dashboard including:
- Greeting
- Assigned tasks
- Overdue tasks
- Tasks due today
- Upcoming deadlines
- Recent projects
- Recent activity
- Goals
- Notifications
- Team updates
- Productivity summary
- Quick-create actions

Allow users to customize their home dashboard.

### 4. GLOBAL SEARCH
Build a global search system capable of searching:
- Tasks & Subtasks
- Projects & Lists
- Teams & Users
- Comments, Documents & Attachments
- Goals, Dashboards & Forms

Support: keyword search, filters, recent searches, keyboard navigation, command palette. Prepare architecture for future semantic/AI search.

### 5. COMMAND PALETTE
Create a command palette (`CMD/CTRL + K`) containing:
- Create task / project / workspace / list
- Search
- Open project / task
- Assign task / change status / change priority
- Add comment / move task / duplicate task / archive task
- Open settings / switch workspace / toggle sidebar

### 6. TASK SYSTEM
Tasks are the central object.
Attributes: title, description, rich text, assignee, multiple assignees, watchers/followers, status, priority, due date, start date, time estimate, time tracking, project, list, folder, parent task, subtasks, dependencies, tags, custom fields, attachments, comments, activity history, checklist, recurring schedule, approval status, created by, created date, updated date, completed date.
Support: duplicate, archive, delete, restore, move, bulk edit, bulk assign, bulk status change, bulk priority change, bulk delete, bulk archive.

### 7. SUBTASKS
Support unlimited practical nesting of subtasks where architecture permits.
Subtasks inherit useful context from parent tasks while remaining independently actionable: assignees, dates, status, priority, comments, attachments, custom fields.

### 8. TASK COMMENTS
Build a proper comment system: comments, threaded replies, @mentions, reactions, editing, deletion, timestamps, attachments, activity events. Prepare architecture for real-time updates.

### 9. TASK ACTIVITY
Every meaningful task change generates an activity event: created, assigned, reassigned, status changed, priority changed, due date changed, description changed, moved, archived, restored, comment added, attachment added, dependency added, custom field changed. Display chronological activity history.

### 10. TASK VIEWS
Every project/list should support multiple views:
1. List
2. Board
3. Calendar
4. Timeline
5. Gantt
6. Table
7. Dashboard
Switch views without changing underlying data.

### 11. LIST VIEW
Columns: task, status, assignee, priority, due date, start date, tags, custom fields.
Support: sorting, filtering, grouping, column resizing, column visibility, inline editing, bulk selection, bulk actions, drag-and-drop ordering. Custom columns allowed.

### 12. KANBAN / BOARD VIEW
Columns represent statuses.
Support: drag-and-drop tasks, drag between statuses, task cards, assignee avatars, priority, dates, tags, progress, subtasks, custom fields. Configure: grouping, card density, visible fields, WIP limits, ordering.

### 13. CALENDAR VIEW
Month view, week view, day view. Display tasks based on dates. Support drag-and-drop rescheduling, task creation, filtering, assignee/project/status filtering.

### 14. TIMELINE VIEW
Visual project timeline: tasks, milestones, start/end dates, dependencies, assignees. Support drag-to-reschedule, zoom, grouping, filtering.

### 15. GANTT
Functional Gantt-style planning interface: task bars, dependencies, milestones, critical dates, start/end dates, progress, grouping.

### 16. PORTFOLIOS
Group projects into portfolios showing projects, owners, status, progress, deadlines, health, budget fields, custom fields, milestones, with portfolio-level dashboards.

### 17. PROJECTS
Projects contain overview, tasks, lists, board, timeline, calendar, dashboards, goals, files, forms, automations, settings. Settings control members, permissions, statuses, workflows, custom fields, templates, automations.

### 18. FOLDERS AND LISTS
Support hierarchy: Organization -> Workspace -> Team -> Portfolio -> Folder -> Project -> List -> Task -> Subtask. Design system so businesses configure their own organizational structure.

### 19. CUSTOM FIELDS
Field types: text, long text, number, currency, percentage, date, datetime, checkbox, dropdown, multi-select, people, URL, email, phone, rating, formula where feasible. Reusable across projects/lists at org and project level.

### 20. CUSTOM STATUSES
Do not hard-code only Todo/In Progress/Done. Allow custom workflows (e.g. Lead -> Qualified -> Proposal -> Negotiation -> Won -> Fulfillment -> Completed, or Queued -> Cutting -> Sewing -> QC -> Packed -> Dispatched). Configurable per project/organization.

### 21. WORKFLOWS
Workflow configuration defining statuses, transitions, permissions, required fields, triggers, automations, approvals.

### 22. DEPENDENCIES
Support blocked by, blocks, relates to, duplicate, parent/child. Visualize in timeline/Gantt.

### 23. MILESTONES
Support milestones with dates, owners, linked tasks, progress, status on timelines.

### 24. GOALS / OKRs
Organization, team, project, individual goals with name, owner, timeframe, progress, status, metric, target, current value linked to projects and tasks.

### 25. DASHBOARDS
Configurable dashboard builder with task count, completed tasks, overdue tasks, workload, project progress, status/priority distribution, burndown, velocity, timeline, goals, numeric KPI, charts, tables, activity, time tracking widgets.

### 26. REPORTING
Reporting for workload, productivity, project health, task completion, overdue work, team performance, time tracking, custom KPIs with filters and date ranges.

### 27. FORMS
Form builder generating tasks upon submission with text, dropdown, multi-select, date, file, custom fields.

### 28. AUTOMATIONS
Automation engine: WHEN trigger IF conditions THEN actions. Triggers: task created/completed, status changed, due date approaching/passed, field changed, comment added, form submitted, task assigned, project created. Actions: change status, assign user, change priority, add tag, create task/subtask, move task, send notification/email, add comment, webhook.

### 29. NOTIFICATIONS
In-app notifications for mentions, assignments, due dates, comments, status changes, automations with granular preferences.

### 30. INBOX
Unified inbox for mentions, assignments, comments, approvals, notifications with mark read, archive, filter capabilities.

### 31. MY WORK
Personal work center showing today, upcoming, overdue, assigned tasks, delegated tasks, completed, recurring items with filtering.

### 32. TIME TRACKING
Start/stop timers, manual time entries, estimates, actual time, timesheets, reports associated with tasks/projects.

### 33. RECURRING TASKS
Daily, weekly, monthly, custom recurring tasks preserving templates/custom fields.

### 34. TEMPLATES
Templates for tasks, projects, workflows, dashboards, forms, automation rules.

### 35. FILES / ATTACHMENTS
Supabase Storage integration with upload, preview, download, delete, metadata, permissions.

### 36. USERS / TEAMS
Multi-tenant user, team, department structure with appropriate access.

### 37. ROLES AND PERMISSIONS
Granular RBAC: Owner, Admin, Manager, Member, Guest covering view, create, edit, delete, assign, settings, users, automations, integrations, billing enforced server-side.

### 38. AUDIT LOG
Immutable audit trail capturing actor, timestamp, organization, action, entity, entity ID, old/new values, IP/device metadata.

### 39. REAL-TIME
Selective Supabase Realtime subscriptions for task updates, comments, notifications, board movement.

### 40. INTEGRATIONS ARCHITECTURE
Provider abstractions for Slack, Teams, Google Drive, Calendar, Gmail, GitHub, GitLab, Jira, Shopify, Stripe, Zapier, Make, webhooks with availability indicators.

### 41. WEBHOOKS
Inbound/outbound webhook architecture with secret signing, events, delivery history, retry logic.

### 42. API ARCHITECTURE
RESTful/Server Action APIs for tasks, projects, users, teams, comments, dashboards, workflows, automations with schema validation.

### 43. AI ARCHITECTURE
Tool-controlled AI interaction model: search_tasks, get_project, get_project_metrics, get_team_workload, get_overdue_tasks, create_task, update_task, assign_task, change_status, create_project, summarize_project, analyze_workload, detect_risk, generate_report. Human approval for sensitive actions.

### 44. SECURITY
Enterprise posture: Supabase Auth, sessions, org isolation RLS, server-side authorization, input validation, audit logging.

### 45. DATABASE
Normalized PostgreSQL schema with primary keys, foreign keys, unique/check constraints, indexes, timestamps, soft deletion, audit relationships.

### 46. PERFORMANCE
Indexes, pagination, efficient queries, server-side filtering, lazy loading, optimistic UI, caching, avoiding unnecessary realtime subscriptions.

### 47. ERROR HANDLING
Proper loading, empty, error, retry states, validation messages, permission errors.

### 48. UX
Modern, clean, dense yet readable enterprise aesthetic with original visual identity.

### 49. RESPONSIVE DESIGN
Desktop full interface, Tablet adaptive sidebar/layouts, Mobile mobile-first task interaction.

### 50. PWA
Web App Manifest, custom icons, installability, responsive mobile experience.

### 51. DEMO DATA
Realistic demo workspaces:
1. **Acme Commerce** (Tech/E-commerce: Marketing, Engineering, Operations)
2. **Textile Manufacturing** (Industrial: Looms, Weaving, Quality Control, Dispatch)

### 52. ONBOARDING
Onboarding flow: Org name -> Industry -> Team size -> Template -> Invite team -> Configure workspace -> First project.

### 53. SETTINGS
Settings for Profile, Organization, Members, Teams, Roles, Permissions, Notifications, Security, Workflows, Custom Fields, Automations, Integrations, API, Webhooks, Billing.

### 54. BILLING ARCHITECTURE
Tier definitions: Free, Pro, Business, Enterprise with seat/usage tracking.

### 55. ENGINEERING QUALITY
Modular design, type safety, error boundaries, input validation, strict security boundaries.

### 56. DEVELOPMENT PROCESS
Incremental process: Architecture assessment -> Database & RLS -> Auth -> App Shell -> Task/Project primitives -> Major views & modules.

### 57. FINAL PRODUCT TEST
Verification of full end-to-end user workflows and organization data isolation.

### 58. MOST IMPORTANT PRODUCT PRINCIPLE
NEXUS is **software shaped around how a business operates**:
$$\text{BUSINESS} \longrightarrow \text{PROCESS} \longrightarrow \text{DATA} \longrightarrow \text{WORKFLOW} \longrightarrow \text{DASHBOARD} \longrightarrow \text{AUTOMATION} \longrightarrow \text{INTEGRATIONS} \longrightarrow \text{AI}$$

---

## CODE ARCHITECTURE & IMPLEMENTATION DETAILS

### Project Directory Layout
```
nexus-main/
├── public/
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   └── Topbar.tsx
│   │   ├── modals/
│   │   │   ├── CommandPalette.tsx
│   │   │   └── QuickCreateModal.tsx
│   │   └── views/
│   │       ├── AutomationsView.tsx
│   │       ├── BoardView.tsx
│   │       ├── CalendarView.tsx
│   │       ├── DashboardView.tsx
│   │       ├── FormsView.tsx
│   │       ├── GanttView.tsx
│   │       ├── GoalsView.tsx
│   │       ├── HomeView.tsx
│   │       ├── InboxView.tsx
│   │       ├── IntegrationsView.tsx
│   │       ├── ListView.tsx
│   │       ├── MyWorkView.tsx
│   │       ├── PortfoliosView.tsx
│   │       ├── SettingsView.tsx
│   │       ├── TimeTrackingView.tsx
│   │       └── TimelineView.tsx
│   ├── context/
│   │   └── NexusContext.tsx
│   ├── lib/
│   │   └── mock-data.ts
│   └── types/
│       └── nexus.ts
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tsconfig.json
├── README.md
├── SPECIFICATION.md
├── NEXUS_MASTER_SPECIFICATION.md
└── Master App Name.md
```

### Build & Verification Metrics
- **Build Engine:** Next.js 15.5.26 App Router
- **Type Checking:** 100% TypeScript Strict Mode Clean
- **Build Status:** `✓ Compiled successfully in 23.0s`
