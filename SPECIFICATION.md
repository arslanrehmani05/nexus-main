# NEXUS — Modern Enterprise Business Work Management & Operations Platform

You are building **NEXUS** — a modern, enterprise-grade business work management and operations platform.

> **IMPORTANT**
> - This is **NOT** a simple Kanban demo.
> - Do **NOT** build a toy CRUD application.
> - Do **NOT** build only a task manager.
> - Do **NOT** stop after making a visually impressive dashboard.

Build the foundation of a serious product combining the breadth of modern platforms such as Asana, Monday.com, Jira, Linear, ClickUp, and similar work-management systems, while using completely original branding, visual design, components, and implementation.

NEXUS should ultimately demonstrate this capability:

> *"Software that can be shaped around the way a particular business operates."*

The system should therefore be designed as a **configurable platform** rather than a hard-coded project-management application.

Use the existing project/codebase as the starting point if one exists. Preserve useful existing functionality where appropriate, but refactor aggressively when necessary. Do not blindly preserve bad architecture.

---

## Tech Stack

Use:
- **Next.js**
- **TypeScript**
- **React**
- **Tailwind CSS**
- **Supabase**
- **PostgreSQL**
- **Supabase Auth**
- **Row Level Security (RLS)**
- Modern component architecture
- Server-side actions / API routes where appropriate

Structure the application so that future AI agents, integrations, automations, and external APIs can be added without rewriting the core architecture.

The application must be responsive and **PWA-ready**.

---

## 1. Global Product Architecture

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

Do not rely solely on frontend filtering for security. Use PostgreSQL constraints, foreign keys, indexes, Supabase Auth, roles, grants, and RLS appropriately.

---

## 2. Application Shell

Create a polished application shell containing:

### Left Sidebar
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

**Sidebar capabilities:**
- Collapse / expand
- Nested navigation
- Favorites & recent items
- Drag-and-drop ordering where appropriate
- Workspace switching
- Team navigation

### Top Bar
- Global search
- Command palette (`Cmd/Ctrl + K`)
- Create button (`+ Task`, `+ Project`, etc.)
- Notifications badge & popover
- Help & documentation
- Workspace / user profile menu

---

## 3. Home

Create a personalized home dashboard including:
- Greeting (time-aware, personalized)
- Assigned tasks
- Overdue tasks
- Tasks due today
- Upcoming deadlines
- Recent projects & recent activity
- Goals progress summary
- Notifications & team updates
- Productivity summary
- Quick-create actions

Allow users to customize their home dashboard widgets and layout.

---

## 4. Global Search

Build a global search system capable of searching across:
- Tasks & Subtasks
- Projects & Lists
- Teams & Users
- Comments, Documents & Attachments
- Goals, Dashboards & Forms

**Features:**
- Keyword search with high-lighting
- Advanced filters (by assignee, status, date, tag, project)
- Recent search history
- Full keyboard navigation
- Integration with Command Palette
- Architectural readiness for future semantic / vector AI search

---

## 5. Command Palette

Create a command palette (`CMD/CTRL + K`) inspired by modern productivity tools.

**Supported Commands:**
- Create task / project / workspace / list
- Search entities
- Open project / task
- Assign task / change status / change priority
- Add comment / move task / duplicate task / archive task
- Open settings / switch workspace / toggle sidebar

---

## 6. Task System

Tasks are the central object of the platform.

**Task Attributes:**
- Title & Description (Rich Text support)
- Assignee & Multiple Assignees (where appropriate)
- Watchers / Followers
- Status & Priority
- Due date & Start date
- Time estimate & Time tracking logs
- Project, List, Folder context
- Parent task & Subtasks
- Dependencies (blocked by / blocks / relates to)
- Tags & Custom fields
- Attachments & Comments
- Activity history & Checklist
- Recurring schedule configuration
- Approval status (Pending / Approved / Rejected)
- Timestamps (`created_at`, `updated_at`, `completed_at`) & Creator ID

**Operations:**
- Duplicate, Archive, Delete, Restore, Move
- Bulk actions: Edit, Assign, Status change, Priority change, Delete, Archive

---

## 7. Subtasks

- Support unlimited practical nesting of subtasks where architecture permits.
- Subtasks inherit useful parent context while remaining independently actionable.
- Independent attributes: assignees, dates, status, priority, comments, attachments, custom fields.

---

## 8. Task Comments

- Rich text comments with threaded replies
- User `@mentions` with notification triggers
- Emoji reactions
- Comment editing and deletion history
- File attachments directly in comments
- Activity events linked to comments
- Prepared for real-time updates via Supabase Realtime

---

## 9. Task Activity

Every meaningful task change generates an immutable activity log entry:
- Created, Assigned, Reassigned
- Status / Priority changed
- Due date / Start date changed
- Description updated
- Moved, Archived, Restored
- Comment / Attachment / Dependency added
- Custom field value changed

Display chronological activity feeds on tasks.

---

## 10. Task Views

Every project/list must support seamless view switching over identical data:
1. **List View** (High-density table)
2. **Board View** (Kanban with status columns)
3. **Calendar View** (Month / Week / Day planning)
4. **Timeline View** (Gantt / Roadmap layout)
5. **Gantt View** (Milestones & critical path)
6. **Table View** (Spreadsheet style custom field grid)
7. **Dashboard View** (Project-specific metrics)

---

## 11. List View

- Columns: Task, Status, Assignee, Priority, Due Date, Start Date, Tags, Custom Fields
- Features: Sorting, filtering, multi-level grouping, column resizing/visibility, inline cell editing, bulk selection, drag-and-drop reordering.

---

## 12. Kanban / Board View

- Columns represent statuses (or custom fields like priority/assignee).
- Drag-and-drop task movement between statuses.
- Rich cards showing assignees, priority, dates, progress, subtask badges, tags.
- Configurations: Grouping options, card density (compact/comfortable), visible field toggles, Work-In-Progress (WIP) limits.

---

## 13. Calendar View

- Month, Week, and Day views.
- Render tasks based on start and due dates.
- Interactive drag-and-drop rescheduling.
- Filters: Assignee, project, status, priority.

---

## 14. Timeline View

- Visual project roadmap.
- Interactive bars displaying tasks, milestones, start/end dates, dependencies, and assignees.
- Zoom levels (Days, Weeks, Months, Quarters) and task grouping.

---

## 15. Gantt

- Functional Gantt planning interface.
- Features: Interactive task bars, visual dependency lines, milestones, critical dates, progress tracking, and group headers.

---

## 16. Portfolios

Group related projects into Portfolios for executive oversight:
- High-level view of projects, owners, overall status, progress metrics, deadlines, health indicators (On Track, At Risk, Off Track), budget fields, custom fields, and major milestones.
- Dedicated Portfolio-level dashboards.

---

## 17. Projects

Projects container features:
- Overview tab (Brief, Key Roles, Resources, Milestones)
- Multi-view task engine (List, Board, Timeline, Calendar, Gantt, Table)
- Embedded Dashboards, Goals, Files, Forms, Automations, Settings
- Project Settings: Member permissions, custom status workflows, custom field mappings, project templates.

---

## 18. Folders and Lists

Flexible organizational hierarchy:
$$\text{Organization} \rightarrow \text{Workspace} \rightarrow \text{Team} \rightarrow \text{Portfolio} \rightarrow \text{Folder} \rightarrow \text{Project} \rightarrow \text{List} \rightarrow \text{Task} \rightarrow \text{Subtask}$$
*Note: The platform structure must remain configurable so organizations can adapt the hierarchy to their unique operating model.*

---

## 19. Custom Fields

A core capability of Nexus allowing administrators to define custom data fields across projects:
- **Field Types:** Text, Long Text, Number, Currency, Percentage, Date, DateTime, Checkbox, Dropdown, Multi-select, People, URL, Email, Phone, Rating, Formula.
- Scope: Shared organization-level fields and project-specific fields.

---

## 20. Custom Statuses

Avoid hardcoded statuses (`Todo`, `In Progress`, `Done`). Support custom workflow pipelines, for example:
- **Sales Pipeline:** `Lead` $\rightarrow$ `Qualified` $\rightarrow$ `Proposal` $\rightarrow$ `Negotiation` $\rightarrow$ `Won` $\rightarrow$ `Fulfillment` $\rightarrow$ `Completed`
- **Manufacturing Pipeline:** `Queued` $\rightarrow$ `Cutting` $\rightarrow$ `Sewing` $\rightarrow$ `Quality Control` $\rightarrow$ `Packed` $\rightarrow$ `Dispatched`

---

## 21. Workflows

Define state machine configurations:
- Allowed status transitions
- Role-based transition permissions
- Required fields upon entering status
- Automated triggers & approvals

---

## 22. Dependencies

- Dependency relationships: `Blocked By`, `Blocks`, `Relates To`, `Duplicate Of`, `Parent / Child`.
- Graphical visualization in Timeline and Gantt views.

---

## 23. Milestones

- Fixed deadline checkpoints with owners, linked tasks, completion progress, and status indicators.

---

## 24. Goals / OKRs

- Multi-level goal hierarchy: Organization, Team, Project, and Individual goals.
- Attributes: Target metric, current value, timeframe, progress bar, owner, linked projects & tasks.

---

## 25. Dashboards

Configurable widget-based dashboard builder:
- **Widgets:** Task counts, completion rates, workload distribution, project progress, status/priority distribution charts, burndown/velocity charts, KPI cards, activity feeds, time tracking summaries.
- Drag-and-drop grid customization, widget resizing, layout saving, and sharing.

---

## 26. Reporting

Comprehensive report generation for workload balancing, project health, team velocity, time tracking, custom KPIs, with date ranges and export options.

---

## 27. Forms

Dynamic form builder generating tasks upon submission:
- Form fields linked to standard and custom task fields.
- Example flow: Customer support request submitted via public form $\rightarrow$ Task created in Support Project $\rightarrow$ Auto-assigned based on workload $\rightarrow$ Status set to `New`.

---

## 28. Automations

Rule-based automation engine:
$$\text{WHEN } \langle\text{Trigger}\rangle \quad \text{IF } \langle\text{Conditions}\rangle \quad \text{THEN } \langle\text{Actions}\rangle$$
- **Triggers:** Task created, status changed, due date approaching/passed, field updated, comment added, form submitted.
- **Actions:** Change status, reassign task, update priority, add tags, create subtask, send notification/email, call webhook.

---

## 29. Notifications

- In-app notification center for mentions, assignments, due dates, comments, status changes, and automation triggers.
- Granular user notification preferences.
- Architecture ready for Email, Web Push, Slack, and WhatsApp channels.

---

## 30. Inbox

Unified inbox displaying mentions, assignments, approvals, and system alerts with quick actions (Mark Read, Archive, Filter, Jump to item).

---

## 31. My Work

Personal workspace displaying tasks partitioned into Today, Upcoming, Overdue, Assigned by Me, Completed, and Recurring items.

---

## 32. Time Tracking

Built-in time tracker: Live timer start/stop, manual time entry logs, estimates vs actual time comparisons, timesheets, and exportable project time reports.

---

## 33. Recurring Tasks

Flexible recurrence schedules (Daily, Weekly, Monthly, Custom intervals) retaining task descriptions, subtask templates, and custom field values.

---

## 34. Templates

Reusable templates for Projects, Tasks, Workflows, Dashboards, Forms, and Automations. Ability to save existing projects as templates.

---

## 35. Files / Attachments

Supabase Storage integration with secure signed URLs, file previewing, versioning, and access control matching project permissions.

---

## 36. Users / Teams

Multi-tenant user directory with Department structures, Teams, Roles, and explicit permission grants.

---

## 37. Roles and Permissions

Granular RBAC (Role-Based Access Control):
- **Default Roles:** Owner, Admin, Manager, Member, Guest.
- **Permissions:** View, Create, Edit, Delete, Assign, Settings, Users, Automations, Billing.
- Enforced on database (RLS) and server layer.

---

## 38. Audit Log

Immutable event record capturing Actor ID, Timestamp, Organization ID, Action, Entity, Entity ID, Old/New values, IP address, and User Agent metadata.

---

## 39. Real-Time

Selective Supabase Realtime subscriptions for task state, comments, notifications, and Kanban board movements.

---

## 40. Integrations Architecture

Provider abstraction layer supporting configuration interfaces for Slack, Teams, Google Drive, Calendar, GitHub, Jira, Zapier, Make, and Webhooks. Clearly marked availability indicators.

---

## 41. Webhooks

Inbound and outbound webhook system with endpoint configuration, signing secrets, event subscription filters, delivery logs, and exponential backoff retries.

---

## 42. API Architecture

RESTful and Server Action endpoints for core resources using Zod schema validation, strict authentication, and rate limiting.

---

## 43. AI Architecture

Tool-assisted AI integration model (no unguided DB access):
$$\text{AI Agent} \rightarrow \text{Tool Definition} \rightarrow \text{Auth/Validation} \rightarrow \text{Business Logic} \rightarrow \text{Database} \rightarrow \text{Audit Log} \rightarrow \text{Result}$$
Tools include `search_tasks`, `get_project_metrics`, `create_task`, `summarize_project`, `analyze_workload`, `detect_risk`.

---

## 44. Security

Enterprise security posture: Supabase Auth, session handling, isolated org RLS policies, input sanitization, non-privileged client bundle, secure key management.

---

## 45. Database

Normalized PostgreSQL schema with PKs, FK constraints, indexes on foreign keys and queried columns, timestamps, soft-deletions, and JSONB reserved strictly for flexible field schemas.

---

## 46. Performance

Designed for high-scale environments: Server-side pagination, indexed queries, optimistic UI updates, lazy-loaded components, and optimized bundle size.

---

## 47. Error Handling

Comprehensive UI states: Loading skeletons, empty states, error boundaries, network offline indicators, and user-friendly validation feedback.

---

## 48. UX & Visual Identity

Modern, clean, dense yet readable enterprise aesthetic. Inspired by top-tier work platforms while retaining 100% original visual branding, typography, color palettes, and custom UI components.

---

## 49. Responsive Design

- **Desktop:** Full multi-pane productivity interface.
- **Tablet:** Adaptive collapsable sidebars and dynamic grids.
- **Mobile:** Mobile-first navigation, quick action sheets, and simplified task views.

---

## 50. PWA Capability

Web App Manifest, custom icons, service worker baseline, PWA install prompt, iOS full-screen meta configurations.

---

## 51. Demo Data

Rich, realistic pre-populated demo data:
1. **Acme Commerce** (Tech/E-commerce: Marketing, Engineering, Operations projects)
2. **Textile Manufacturing** (Industrial: Looms, Quality Control, Dispatch workflows)

---

## 52. Onboarding Flow

Interactive setup flow: Organization creation $\rightarrow$ Industry selection $\rightarrow$ Team size $\rightarrow$ Template picker $\rightarrow$ Member invites $\rightarrow$ First project workspace.

---

## 53. Settings

System settings panels for Profile, Organization, Members, Roles/Permissions, Workflows, Custom Fields, Automations, Webhooks, API keys, and Billing.

---

## 54. Billing Architecture

Prepared tier definitions: **Free**, **Pro**, **Business**, **Enterprise** with usage metrics tracking (seats, storage, automations).

---

## 55. Engineering Quality

Modular design patterns, typed contracts, error boundaries, input validation, strict separation of concerns, and clean file organization.

---

## 56. Development Process

Incremental roadmap:
1. Architecture assessment & directory structure
2. Database schema & RLS policy implementation
3. Auth & multi-tenant isolation setup
4. App shell & layout primitives
5. Core Task & Project engine
6. Views (List, Board, Timeline, Calendar, Gantt, Dashboards)
7. Automations, Forms, Integrations, and Settings

---

## 57. Verification & Testing

Verify full flow: Org creation $\rightarrow$ Team invite $\rightarrow$ Project creation $\rightarrow$ Task workflow $\rightarrow$ Subtasks & Dependencies $\rightarrow$ Board drag-and-drop $\rightarrow$ Real-time comments $\rightarrow$ Dashboard customization $\rightarrow$ Security boundary enforcement.

---

## 58. Core Differentiator

NEXUS is **software shaped around how a business operates**.
$$\text{BUSINESS} \rightarrow \text{PROCESS} \rightarrow \text{DATA} \rightarrow \text{WORKFLOW} \rightarrow \text{DASHBOARD} \rightarrow \text{AUTOMATION} \rightarrow \text{INTEGRATIONS} \rightarrow \text{AI}$$
