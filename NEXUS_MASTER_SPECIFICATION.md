# NEXUS — Master Platform Specification & System Architecture

> **Enterprise Business Work Management & Operations Platform**
> *"Software that can be shaped around the way a particular business operates."*

---

## 1. Executive Overview & Core Philosophy

**NEXUS** is a modern, enterprise-grade business work management and operations platform. It combines the breadth of modern platforms (such as Asana, Monday.com, Jira, Linear, ClickUp) with completely original branding, dynamic visual design, robust architecture, and highly configurable primitives.

### Primary Differentiator
Unlike rigid project management tools that force a company into pre-baked task structures, NEXUS operates as a **configurable business OS**:
$$\text{BUSINESS} \longrightarrow \text{PROCESS} \longrightarrow \text{DATA} \longrightarrow \text{WORKFLOW} \longrightarrow \text{DASHBOARD} \longrightarrow \text{AUTOMATION} \longrightarrow \text{INTEGRATIONS} \longrightarrow \text{AI}$$

---

## 2. Technical Stack & Foundation

- **Framework:** Next.js (App Router, Server Actions, React Server Components)
- **Language:** TypeScript (Strict Mode, 100% Type Safety)
- **UI & Styling:** React 19 / 18, Tailwind CSS, Lucide Icons, Modern Component Architecture
- **Backend & Database:** Supabase, PostgreSQL, Row Level Security (RLS)
- **Authentication:** Supabase Auth with Organization & Workspace Isolation
- **Real-Time:** Supabase Realtime (Selective subscriptions for tasks, comments, boards)
- **Progressive Web App (PWA):** Service Worker caching, Web Manifest, iOS meta tags, Install prompts

---

## 3. Core Entity Architecture (Database Domain Model)

NEXUS database domain model avoids flat "tasks" table schemas and defines 31 core entities:

1. **Organization** (Isolated multi-tenant boundaries)
2. **Workspace** (Sub-division within an organization)
3. **Team / Department** (User groupings with role mappings)
4. **User** (Global identity & metadata)
5. **Role & Permission** (Granular RBAC: Owner, Admin, Manager, Member, Guest)
6. **Portfolio** (Executive grouping of related projects)
7. **Project** (Container with custom workflows, fields, and permissions)
8. **Folder & List** (Hierarchical organization nodes)
9. **Task** (Central entity with rich attributes, subtasks, checklists)
10. **Subtask** (Recursively nested actionable child tasks)
11. **Milestone** (Fixed deadline checkpoints with linked items)
12. **Goal / OKR** (Org, Team, Project, and Individual targets)
13. **Status** (Configurable pipeline states)
14. **Workflow** (State transitions, required fields, approval flows)
15. **Custom Field** (Text, Currency, Formula, Date, Dropdown, Multi-select, Rating)
16. **View** (List, Board/Kanban, Calendar, Timeline, Gantt, Table, Dashboard)
17. **Dashboard & Widget** (Configurable drag-and-drop analytics grid)
18. **Automation** (WHEN Trigger -> IF Conditions -> THEN Actions engine)
19. **Integration** (Provider abstractions for Slack, GitHub, Teams, Webhooks)
20. **Notification** (In-app, push, email notification queues)
21. **Comment** (Threaded rich text, @mentions, reactions)
22. **Attachment** (Supabase Storage integration with access controls)
23. **Activity Log** (Immutable audit trail of state changes)
24. **Time Entry** (Timers, manual logs, timesheets)
25. **Form** (Public/internal intake forms generating tasks)
26. **Template** (Reusable project, task, and workflow structures)
27. **Dependency** (Blocked By, Blocks, Relates To, Duplicate)
28. **Approval** (Multi-stage review states)
29. **Audit Log** (Immutable security & compliance event log)
30. **Webhook** (Inbound/Outbound signature-verified event hooks)
31. **AI Agent Tool Spec** (Controlled tool interfaces for AI interaction)

---

## 4. Key Platform Features & Modules

### 4.1 Application Shell & Navigation
- **Left Sidebar:** Logo, Workspace Selector, Quick Search, Home, Inbox, My Work, Favorites, Recent, Teams, Projects, Portfolios, Goals, Dashboards, Reports, Calendar, Forms, Automations, Templates, Time Tracking, Integrations, Settings.
- **Top Bar:** Search, Command Palette trigger (`Cmd+K`), Global Quick Create button, Notifications Popover, User Profile.

### 4.2 Home & Personal Work Center
- Personalized time-aware greeting
- Task widgets: Assigned, Overdue, Due Today, Upcoming
- Recent projects & activity stream
- Personal Goal summary & productivity metrics

### 4.3 Command Palette (`Cmd+K`)
- Rapid creation actions (Task, Project, Workspace, List)
- Direct navigation across projects, tasks, settings
- Quick status, priority, and assignment mutation shortcuts

### 4.4 Multi-View Task Engine
- **List View:** High-density spreadsheet-like inline editing, column resizing, sorting, grouping.
- **Kanban Board View:** Drag-and-drop status lanes, WIP limits, customizable card density.
- **Calendar View:** Month, week, day views with drag-and-drop rescheduling.
- **Timeline / Roadmap View:** Interactive project schedule bars with dependency lines.
- **Gantt View:** Critical path visualization, milestones, progress bars.
- **Table View:** Dense custom field grid.
- **Dashboard View:** Project-specific KPI charts.

### 4.5 Configurable Workflows & Custom Fields
- Unlimited custom field types: Text, Long Text, Number, Currency, Date, Multi-select, Formula, Rating.
- Custom status pipelines tailored per industry (e.g. Sales, E-Commerce, Manufacturing, Software).

### 4.6 Rule Engine Automations & Public Forms
- Trigger-Condition-Action automation builder.
- Public intake forms mapping responses directly into workflow tasks.

### 4.7 Audit Trail, Security & RBAC
- Organization isolation enforced at Row Level Security (RLS) layer.
- Immutable audit logging for security and compliance monitoring.

---

## 5. Implementation & Development Roadmap

1. **Phase 1:** Core Next.js application structure, Tailwind CSS design system, and state engine.
2. **Phase 2:** Database schema definitions, Supabase RLS policies, and Auth integration.
3. **Phase 3:** App shell layout (Sidebar, Topbar, Workspace switcher, Command Palette).
4. **Phase 4:** Task & Project core primitives, Multi-view engine (List, Board, Calendar, Timeline, Gantt).
5. **Phase 5:** Custom fields, Custom status workflow state machine, and Portfolios.
6. **Phase 6:** Dashboard builder, Forms, Time Tracking, and Automations.
7. **Phase 7:** Demo workspaces ("Acme Commerce" & "Textile Manufacturing") and PWA polish.

---

*This document serves as the canonical source of truth for NEXUS engineering and architecture.*
