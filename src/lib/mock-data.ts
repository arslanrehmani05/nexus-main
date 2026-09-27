import {
  Organization,
  Workspace,
  User,
  Team,
  CustomFieldDefinition,
  WorkflowConfig,
  Project,
  Task,
  Portfolio,
  Goal,
  Dashboard,
  AutomationRule,
  IntakeForm,
  IntegrationProvider,
  NotificationItem,
  AuditLogEntry,
  TimeEntry,
  TaskActivity,
  TaskComment
} from '../types/nexus';

// ----------------------------------------------------
// ORGANIZATIONS & USERS
// ----------------------------------------------------

export const MOCK_ORGANIZATIONS: Organization[] = [
  {
    id: 'org-acme',
    name: 'Acme Commerce Inc.',
    slug: 'acme-commerce',
    industry: 'E-Commerce & Digital Products',
    plan: 'Enterprise'
  },
  {
    id: 'org-textile',
    name: 'Heritage Loom Manufacturing',
    slug: 'heritage-loom',
    industry: 'Textile & Industrial Operations',
    plan: 'Business'
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Arslan Rehmani',
    email: 'arslan@nexus.platform',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Owner',
    department: 'Executive',
    title: 'Chief Technology Officer'
  },
  {
    id: 'usr-2',
    name: 'Elena Rostova',
    email: 'elena@acme.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'Admin',
    department: 'Product Strategy',
    title: 'VP of Operations'
  },
  {
    id: 'usr-3',
    name: 'Marcus Vance',
    email: 'marcus@acme.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Manager',
    department: 'Engineering',
    title: 'Lead Architect'
  },
  {
    id: 'usr-4',
    name: 'Sarah Chen',
    email: 'sarah@heritage.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    role: 'Manager',
    department: 'Quality Assurance',
    title: 'Factory Operations Director'
  },
  {
    id: 'usr-5',
    name: 'David Kim',
    email: 'david@acme.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Member',
    department: 'Marketing',
    title: 'Growth Specialist'
  }
];

export const MOCK_WORKSPACES: Workspace[] = [
  {
    id: 'ws-acme-main',
    organizationId: 'org-acme',
    name: 'Acme Digital HQ',
    icon: '⚡',
    description: 'E-commerce platform operations, marketing campaigns, software engineering'
  },
  {
    id: 'ws-textile-factory',
    organizationId: 'org-textile',
    name: 'Mill & Weaving Ops',
    icon: '🧵',
    description: 'Industrial loom management, yarn batch tracking, QC & fulfillment dispatch'
  }
];

export const MOCK_TEAMS: Team[] = [
  {
    id: 'team-eng',
    workspaceId: 'ws-acme-main',
    name: 'Engineering & Tech',
    description: 'Core web apps, backend APIs, mobile development',
    color: '#6366f1',
    memberIds: ['usr-1', 'usr-3']
  },
  {
    id: 'team-growth',
    workspaceId: 'ws-acme-main',
    name: 'Growth & Marketing',
    description: 'Q4 campaigns, SEO strategy, customer retention',
    color: '#ec4899',
    memberIds: ['usr-2', 'usr-5']
  },
  {
    id: 'team-textile-prod',
    workspaceId: 'ws-textile-factory',
    name: 'Loom Production Floor',
    description: 'Air-jet looms, yarn spinning, pattern cutting',
    color: '#10b981',
    memberIds: ['usr-4']
  },
  {
    id: 'team-qc',
    workspaceId: 'ws-textile-factory',
    name: 'Quality & Dispatch',
    description: 'Tensile inspection, packing, logistics shipping',
    color: '#f59e0b',
    memberIds: ['usr-4']
  }
];

// ----------------------------------------------------
// CUSTOM FIELDS & WORKFLOWS
// ----------------------------------------------------

export const MOCK_CUSTOM_FIELDS: CustomFieldDefinition[] = [
  {
    id: 'cf-budget',
    name: 'Estimated Cost ($)',
    type: 'currency',
    defaultValue: 5000,
    required: false
  },
  {
    id: 'cf-risk',
    name: 'Risk Factor',
    type: 'dropdown',
    options: ['Low', 'Medium', 'High', 'Critical'],
    defaultValue: 'Low'
  },
  {
    id: 'cf-loom-number',
    name: 'Loom Station #',
    type: 'dropdown',
    options: ['Loom Alpha-01', 'Loom Alpha-02', 'Loom Beta-05', 'Loom Gamma-09'],
    defaultValue: 'Loom Alpha-01'
  },
  {
    id: 'cf-yarn-density',
    name: 'Yarn Thread Count (GSM)',
    type: 'number',
    defaultValue: 350
  },
  {
    id: 'cf-qc-passed',
    name: 'Passed ISO Quality Inspection',
    type: 'checkbox',
    defaultValue: true
  }
];

export const MOCK_WORKFLOWS: WorkflowConfig[] = [
  {
    id: 'wf-software',
    name: 'Software Development Pipeline',
    statuses: [
      { id: 'st-backlog', name: 'Backlog', color: '#64748b', category: 'todo', order: 1 },
      { id: 'st-in-dev', name: 'In Development', color: '#3b82f6', category: 'in_progress', order: 2 },
      { id: 'st-code-review', name: 'Code Review', color: '#8b5cf6', category: 'review', order: 3 },
      { id: 'st-qa', name: 'QA Testing', color: '#f59e0b', category: 'review', order: 4 },
      { id: 'st-deployed', name: 'Deployed to Production', color: '#10b981', category: 'done', order: 5 }
    ]
  },
  {
    id: 'wf-textile',
    name: 'Textile Manufacturing Pipeline',
    statuses: [
      { id: 'st-queued', name: 'Raw Material Queued', color: '#64748b', category: 'todo', order: 1 },
      { id: 'st-cutting', name: 'Pattern Cutting & Loom Setup', color: '#0284c7', category: 'in_progress', order: 2 },
      { id: 'st-weaving', name: 'Active Weaving Phase', color: '#6366f1', category: 'in_progress', order: 3 },
      { id: 'st-qc-check', name: 'Quality Control Inspection', color: '#d97706', category: 'review', order: 4 },
      { id: 'st-packed', name: 'Packed & Dispatched', color: '#10b981', category: 'done', order: 5 }
    ]
  }
];

// ----------------------------------------------------
// PORTFOLIOS & PROJECTS
// ----------------------------------------------------

export const MOCK_PORTFOLIOS: Portfolio[] = [
  {
    id: 'port-ecom-revamp',
    workspaceId: 'ws-acme-main',
    name: 'E-Commerce NextGen Upgrade',
    description: 'Strategic push to increase mobile conversion rate by 35% in Q4',
    color: '#8b5cf6',
    ownerId: 'usr-1',
    projectIds: ['prj-web-redesign', 'prj-inventory-opt'],
    health: 'on_track'
  },
  {
    id: 'port-industrial-export',
    workspaceId: 'ws-textile-factory',
    name: 'Global Linen Export 2026',
    description: 'High-density linen batch production contracts for European retailers',
    color: '#10b981',
    ownerId: 'usr-4',
    projectIds: ['prj-textile-batch-409'],
    health: 'at_risk'
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'prj-web-redesign',
    workspaceId: 'ws-acme-main',
    portfolioId: 'port-ecom-revamp',
    name: 'Acme Storefront Redesign',
    code: 'ACME-WEB',
    description: 'Complete design overhaul using Next.js, Tailwind CSS, and serverless edge functions',
    icon: '💻',
    color: '#6366f1',
    ownerId: 'usr-1',
    status: 'active',
    health: 'on_track',
    startDate: '2026-09-01',
    dueDate: '2026-11-15',
    budget: 85000,
    spent: 32000,
    workflowId: 'wf-software',
    customFieldIds: ['cf-budget', 'cf-risk'],
    memberIds: ['usr-1', 'usr-2', 'usr-3', 'usr-5']
  },
  {
    id: 'prj-inventory-opt',
    workspaceId: 'ws-acme-main',
    portfolioId: 'port-ecom-revamp',
    name: 'Real-Time Inventory Sync',
    code: 'INV-SYNC',
    description: 'Automated warehouse tracking with low-stock webhooks and instant cart reservation',
    icon: '📦',
    color: '#0284c7',
    ownerId: 'usr-3',
    status: 'active',
    health: 'on_track',
    startDate: '2026-09-10',
    dueDate: '2026-10-30',
    budget: 45000,
    spent: 18000,
    workflowId: 'wf-software',
    customFieldIds: ['cf-budget', 'cf-risk'],
    memberIds: ['usr-1', 'usr-3']
  },
  {
    id: 'prj-textile-batch-409',
    workspaceId: 'ws-textile-factory',
    portfolioId: 'port-industrial-export',
    name: 'Luxury Cotton Linen Batch #409',
    code: 'TEX-409',
    description: 'High-speed weaving run on Loom Alpha-01 for 10,000 meters of Jacquard cotton weave',
    icon: '🏭',
    color: '#10b981',
    ownerId: 'usr-4',
    status: 'active',
    health: 'at_risk',
    startDate: '2026-09-15',
    dueDate: '2026-10-10',
    budget: 120000,
    spent: 65000,
    workflowId: 'wf-textile',
    customFieldIds: ['cf-loom-number', 'cf-yarn-density', 'cf-qc-passed'],
    memberIds: ['usr-4']
  }
];

// ----------------------------------------------------
// TASKS & SUBTASKS
// ----------------------------------------------------

export const MOCK_TASKS: Task[] = [
  {
    id: 'task-101',
    projectId: 'prj-web-redesign',
    title: 'Build Responsive App Shell & Glassmorphic Navigation Header',
    description: 'Implement modern application sidebar, command palette modal trigger, and high-contrast responsive layout tokens.',
    statusId: 'st-in-dev',
    priority: 'urgent',
    assigneeIds: ['usr-1', 'usr-3'],
    watcherIds: ['usr-2'],
    startDate: '2026-09-20',
    dueDate: '2026-09-30',
    timeEstimateHours: 32,
    timeSpentMinutes: 1140,
    tags: ['UI/UX', 'Next.js', 'Core'],
    customFields: [
      { fieldId: 'cf-budget', value: 12000 },
      { fieldId: 'cf-risk', value: 'Low' }
    ],
    subtasks: [
      { id: 'sub-1', taskId: 'task-101', title: 'Collapsible Sidebar component', completed: true, assigneeId: 'usr-1' },
      { id: 'sub-2', taskId: 'task-101', title: 'Keyboard listener for Cmd+K palette', completed: true, assigneeId: 'usr-3' },
      { id: 'sub-3', taskId: 'task-101', title: 'Mobile drawer drawer drawer responsive test', completed: false, assigneeId: 'usr-1' }
    ],
    dependencies: [],
    attachmentsCount: 3,
    commentsCount: 4,
    createdBy: 'usr-2',
    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-09-27T18:00:00Z'
  },
  {
    id: 'task-102',
    projectId: 'prj-web-redesign',
    title: 'Integrate Supabase Auth & Multi-Tenant Row Level Security Policies',
    description: 'Write PostgreSQL schema functions and RLS policies ensuring workspace and org data isolation.',
    statusId: 'st-code-review',
    priority: 'high',
    assigneeIds: ['usr-3'],
    watcherIds: ['usr-1'],
    startDate: '2026-09-22',
    dueDate: '2026-10-02',
    timeEstimateHours: 24,
    timeSpentMinutes: 960,
    tags: ['Security', 'PostgreSQL', 'Supabase'],
    customFields: [
      { fieldId: 'cf-budget', value: 8000 },
      { fieldId: 'cf-risk', value: 'High' }
    ],
    subtasks: [
      { id: 'sub-4', taskId: 'task-102', title: 'Draft RLS SQL policy migrations', completed: true },
      { id: 'sub-5', taskId: 'task-102', title: 'Perform cross-org security unit testing', completed: true }
    ],
    dependencies: [{ id: 'dep-1', taskId: 'task-102', dependsOnTaskId: 'task-101', type: 'blocked_by' }],
    attachmentsCount: 1,
    commentsCount: 2,
    createdBy: 'usr-1',
    createdAt: '2026-09-22T14:30:00Z',
    updatedAt: '2026-09-27T16:20:00Z'
  },
  {
    id: 'task-103',
    projectId: 'prj-web-redesign',
    title: 'Optimize Product Catalog Image Lazy Loading & WebP Conversion',
    description: 'Ensure rapid first contentful paint (FCP) on mobile networks via CDN image optimization.',
    statusId: 'st-backlog',
    priority: 'medium',
    assigneeIds: ['usr-5'],
    watcherIds: [],
    dueDate: '2026-10-15',
    timeEstimateHours: 16,
    timeSpentMinutes: 0,
    tags: ['Performance', 'Frontend'],
    customFields: [{ fieldId: 'cf-risk', value: 'Low' }],
    subtasks: [],
    dependencies: [],
    attachmentsCount: 0,
    commentsCount: 0,
    createdBy: 'usr-2',
    createdAt: '2026-09-25T09:00:00Z',
    updatedAt: '2026-09-25T09:00:00Z'
  },
  {
    id: 'task-201',
    projectId: 'prj-textile-batch-409',
    title: 'Loom Alpha-01 Threading Calibration & Speed Adjustment',
    description: 'Calibrate warp tensioners for 350 GSM combed cotton batch. Maintain loom speed at 750 RPM.',
    statusId: 'st-weaving',
    priority: 'urgent',
    assigneeIds: ['usr-4'],
    watcherIds: [],
    startDate: '2026-09-24',
    dueDate: '2026-09-29',
    timeEstimateHours: 40,
    timeSpentMinutes: 1800,
    tags: ['Loom Ops', 'Weaving', 'Batch-409'],
    customFields: [
      { fieldId: 'cf-loom-number', value: 'Loom Alpha-01' },
      { fieldId: 'cf-yarn-density', value: 350 },
      { fieldId: 'cf-qc-passed', value: true }
    ],
    subtasks: [
      { id: 'sub-6', taskId: 'task-201', title: 'Verify reed width alignment', completed: true },
      { id: 'sub-7', taskId: 'task-201', title: 'Inspect heddle wire wear and tear', completed: true }
    ],
    dependencies: [],
    attachmentsCount: 2,
    commentsCount: 3,
    createdBy: 'usr-4',
    createdAt: '2026-09-24T08:00:00Z',
    updatedAt: '2026-09-27T17:45:00Z'
  },
  {
    id: 'task-202',
    projectId: 'prj-textile-batch-409',
    title: 'ISO-9001 Fabric Tensile & Tear Resistance Quality Audit',
    description: 'Extract 5-meter sample from finished roll #14 and submit to stress lab for compliance certificate.',
    statusId: 'st-qc-check',
    priority: 'high',
    assigneeIds: ['usr-4'],
    watcherIds: [],
    startDate: '2026-09-28',
    dueDate: '2026-10-02',
    timeEstimateHours: 12,
    timeSpentMinutes: 240,
    tags: ['Quality Assurance', 'ISO Compliance'],
    customFields: [
      { fieldId: 'cf-loom-number', value: 'Loom Alpha-01' },
      { fieldId: 'cf-qc-passed', value: true }
    ],
    subtasks: [],
    dependencies: [{ id: 'dep-2', taskId: 'task-202', dependsOnTaskId: 'task-201', type: 'blocked_by' }],
    attachmentsCount: 1,
    commentsCount: 1,
    createdBy: 'usr-4',
    createdAt: '2026-09-26T11:00:00Z',
    updatedAt: '2026-09-27T12:00:00Z'
  }
];

// ----------------------------------------------------
// GOALS / OKRs
// ----------------------------------------------------

export const MOCK_GOALS: Goal[] = [
  {
    id: 'goal-1',
    workspaceId: 'ws-acme-main',
    title: 'Achieve $2.5M Monthly Recurring Revenue (MRR)',
    description: 'Scale organic funnel and launch sub-second storefront checkout experience.',
    ownerId: 'usr-1',
    level: 'organization',
    targetValue: 2500000,
    currentValue: 1980000,
    unit: 'USD',
    timeframe: 'Q4 2026',
    status: 'on_track',
    linkedProjectIds: ['prj-web-redesign', 'prj-inventory-opt']
  },
  {
    id: 'goal-2',
    workspaceId: 'ws-acme-main',
    title: 'Sub-100ms API Latency for Cart Operations',
    description: 'Zero cart dropouts due to server timeouts or database locks.',
    ownerId: 'usr-3',
    level: 'team',
    targetValue: 100,
    currentValue: 85,
    unit: 'ms',
    timeframe: 'Q4 2026',
    status: 'achieved',
    linkedProjectIds: ['prj-inventory-opt']
  },
  {
    id: 'goal-3',
    workspaceId: 'ws-textile-factory',
    title: 'Zero Defect Rate in Export Jacquard Batches',
    description: 'Ensure 100% compliance with ISO-9001 tensile standards before container loading.',
    ownerId: 'usr-4',
    level: 'organization',
    targetValue: 100,
    currentValue: 98.2,
    unit: '%',
    timeframe: 'Q4 2026',
    status: 'at_risk',
    linkedProjectIds: ['prj-textile-batch-409']
  }
];

// ----------------------------------------------------
// DASHBOARDS & WIDGETS
// ----------------------------------------------------

export const MOCK_DASHBOARDS: Dashboard[] = [
  {
    id: 'dash-exec',
    workspaceId: 'ws-acme-main',
    name: 'Executive Engineering & Product Pulse',
    description: 'High-level real-time health metrics, task velocity, and team workload',
    isGlobal: true,
    widgets: [
      { id: 'w-1', type: 'task_count', title: 'Total Active Work Items', w: 3, h: 1 },
      { id: 'w-2', type: 'status_distribution', title: 'Tasks by Status Pipeline', w: 6, h: 2 },
      { id: 'w-3', type: 'priority_distribution', title: 'Priority Matrix Breakdown', w: 3, h: 2 },
      { id: 'w-4', type: 'workload', title: 'Team Capacity & Workload', w: 6, h: 2 },
      { id: 'w-5', type: 'goals_summary', title: 'Q4 OKR Strategic Progress', w: 6, h: 2 }
    ]
  }
];

// ----------------------------------------------------
// AUTOMATIONS
// ----------------------------------------------------

export const MOCK_AUTOMATIONS: AutomationRule[] = [
  {
    id: 'auto-1',
    workspaceId: 'ws-acme-main',
    name: 'Auto-Assign Urgent Dev Tasks to Lead Architect',
    enabled: true,
    trigger: { type: 'task_created' },
    conditions: [
      { field: 'priority', operator: 'equals', value: 'urgent' }
    ],
    actions: [
      { type: 'assign_user', config: { userId: 'usr-3' } },
      { type: 'add_tag', config: { tag: 'Needs-Immediate-Triage' } }
    ]
  },
  {
    id: 'auto-2',
    workspaceId: 'ws-textile-factory',
    name: 'Flag QC Inspection Status to Senior Manager',
    enabled: true,
    trigger: { type: 'status_changed', config: { targetStatusId: 'st-qc-check' } },
    conditions: [],
    actions: [
      { type: 'send_notification', config: { message: 'Batch entered QC inspection phase' } }
    ]
  }
];

// ----------------------------------------------------
// INTAKE FORMS
// ----------------------------------------------------

export const MOCK_FORMS: IntakeForm[] = [
  {
    id: 'form-bug-report',
    workspaceId: 'ws-acme-main',
    title: 'Internal Engineering Issue & Bug Submission',
    description: 'Use this form to log platform incidents, UI glitches, or API latency anomalies.',
    targetProjectId: 'prj-web-redesign',
    targetStatusId: 'st-backlog',
    fields: [
      { id: 'f-1', label: 'Issue Summary', type: 'text', required: true, mapsTo: 'title' },
      { id: 'f-2', label: 'Detailed Steps to Reproduce', type: 'long_text', required: true, mapsTo: 'description' },
      { id: 'f-3', label: 'Priority Level', type: 'dropdown', required: true, options: ['low', 'medium', 'high', 'urgent'], mapsTo: 'priority' }
    ]
  }
];

// ----------------------------------------------------
// INTEGRATIONS
// ----------------------------------------------------

export const MOCK_INTEGRATIONS: IntegrationProvider[] = [
  {
    id: 'int-slack',
    name: 'Slack Workspaces',
    category: 'Communication',
    icon: '💬',
    connected: true,
    statusText: 'Connected to #engineering-feed',
    description: 'Broadcast task updates, @mentions, and automated workflow triggers directly into Slack channels.'
  },
  {
    id: 'int-github',
    name: 'GitHub Repositories',
    category: 'Development',
    icon: '🐙',
    connected: true,
    statusText: 'Linked to 3 repositories',
    description: 'Automatically link pull requests, commits, and issue closures to NEXUS task statuses.'
  },
  {
    id: 'int-jira',
    name: 'Jira Software Synced',
    category: 'Development',
    icon: '🔷',
    connected: false,
    statusText: 'Not Connected',
    description: 'Bi-directional issue sync with Atlassian Jira Cloud instances.'
  },
  {
    id: 'int-webhook',
    name: 'Outbound Webhooks',
    category: 'Automation',
    icon: '⚡',
    connected: true,
    statusText: '2 Endpoints Active',
    description: 'Deliver HMAC-signed JSON payloads on task, project, and comment state changes.'
  }
];

// ----------------------------------------------------
// NOTIFICATIONS
// ----------------------------------------------------

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'usr-1',
    title: 'Task Assigned to You',
    message: 'Elena Rostova assigned you to "Build Responsive App Shell & Glassmorphic Navigation Header"',
    type: 'assignment',
    read: false,
    createdAt: '2026-09-27T17:30:00Z'
  },
  {
    id: 'notif-2',
    userId: 'usr-1',
    title: 'QC Passed Certification',
    message: 'Loom Alpha-01 Jacquard sample passed tensile strength ISO audit.',
    type: 'status',
    read: true,
    createdAt: '2026-09-27T12:00:00Z'
  }
];

// ----------------------------------------------------
// TIME LOGS & AUDIT LOGS
// ----------------------------------------------------

export const MOCK_TIME_ENTRIES: TimeEntry[] = [
  {
    id: 'te-1',
    taskId: 'task-101',
    userId: 'usr-1',
    description: 'Crafting responsive sidebar navigation state engine and layout tokens',
    durationMinutes: 240,
    date: '2026-09-27'
  },
  {
    id: 'te-2',
    taskId: 'task-201',
    userId: 'usr-4',
    description: 'Aligning warp tension on Loom Alpha-01',
    durationMinutes: 180,
    date: '2026-09-26'
  }
];

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'audit-1',
    organizationId: 'org-acme',
    actorName: 'Arslan Rehmani',
    actorEmail: 'arslan@nexus.platform',
    action: 'CREATE_ORGANIZATION',
    entity: 'Organization',
    entityId: 'org-acme',
    details: 'Created organization Acme Commerce Inc. with Enterprise tier',
    timestamp: '2026-09-27T08:00:00Z',
    ipAddress: '192.168.1.1'
  },
  {
    id: 'audit-2',
    organizationId: 'org-acme',
    actorName: 'Elena Rostova',
    actorEmail: 'elena@acme.com',
    action: 'UPDATE_ROLE_PERMISSIONS',
    entity: 'Role',
    entityId: 'role-manager',
    details: 'Updated Manager role to allow custom workflow creation',
    timestamp: '2026-09-27T14:15:00Z',
    ipAddress: '192.168.1.45'
  }
];
