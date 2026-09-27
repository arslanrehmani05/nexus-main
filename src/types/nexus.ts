export type RoleName = 'Owner' | 'Admin' | 'Manager' | 'Member' | 'Guest';

export interface Permission {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canAssign: boolean;
  canManageSettings: boolean;
  canManageUsers: boolean;
  canManageAutomations: boolean;
  canManageBilling: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: RoleName;
  department?: string;
  title?: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  industry: string;
  plan: 'Free' | 'Pro' | 'Business' | 'Enterprise';
}

export interface Workspace {
  id: string;
  organizationId: string;
  name: string;
  icon: string;
  description: string;
}

export interface Team {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  color: string;
  memberIds: string[];
}

export interface CustomFieldDefinition {
  id: string;
  name: string;
  type: 'text' | 'number' | 'currency' | 'date' | 'dropdown' | 'multi-select' | 'checkbox' | 'rating' | 'formula';
  options?: string[]; // for dropdown / multi-select
  defaultValue?: any;
  required?: boolean;
}

export interface CustomFieldValue {
  fieldId: string;
  value: any;
}

export interface StatusConfig {
  id: string;
  name: string;
  color: string;
  category: 'todo' | 'in_progress' | 'review' | 'done';
  order: number;
}

export interface WorkflowConfig {
  id: string;
  name: string;
  statuses: StatusConfig[];
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Subtask {
  id: string;
  taskId: string;
  title: string;
  completed: boolean;
  assigneeId?: string;
  dueDate?: string;
}

export interface Dependency {
  id: string;
  taskId: string;
  dependsOnTaskId: string;
  type: 'blocked_by' | 'blocks' | 'relates_to';
}

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  reactions?: { emoji: string; count: number; userIds: string[] }[];
  parentId?: string; // threaded reply
}

export interface TaskActivity {
  id: string;
  taskId: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  description: string;
  durationMinutes: number;
  date: string;
}

export interface Task {
  id: string;
  projectId: string;
  listId?: string;
  folderId?: string;
  title: string;
  description: string;
  statusId: string;
  priority: TaskPriority;
  assigneeIds: string[];
  watcherIds: string[];
  dueDate?: string;
  startDate?: string;
  timeEstimateHours?: number;
  timeSpentMinutes?: number;
  tags: string[];
  customFields: CustomFieldValue[];
  subtasks: Subtask[];
  dependencies: Dependency[];
  attachmentsCount: number;
  commentsCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  recurringRule?: string;
  approvalStatus?: 'none' | 'pending' | 'approved' | 'rejected';
}

export interface ProjectList {
  id: string;
  projectId: string;
  name: string;
  color: string;
  order: number;
}

export interface ProjectFolder {
  id: string;
  workspaceId: string;
  name: string;
  color: string;
}

export interface Project {
  id: string;
  workspaceId: string;
  portfolioId?: string;
  folderId?: string;
  name: string;
  code: string; // e.g. "PRJ-101"
  description: string;
  icon: string;
  color: string;
  ownerId: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'archived';
  health: 'on_track' | 'at_risk' | 'off_track';
  startDate: string;
  dueDate: string;
  budget?: number;
  spent?: number;
  workflowId: string;
  customFieldIds: string[];
  memberIds: string[];
}

export interface Portfolio {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  color: string;
  ownerId: string;
  projectIds: string[];
  health: 'on_track' | 'at_risk' | 'off_track';
}

export interface Goal {
  id: string;
  workspaceId: string;
  title: string;
  description: string;
  ownerId: string;
  level: 'organization' | 'team' | 'project' | 'individual';
  targetValue: number;
  currentValue: number;
  unit: string;
  timeframe: string; // e.g., "Q4 2026"
  status: 'on_track' | 'at_risk' | 'off_track' | 'achieved';
  linkedProjectIds: string[];
}

export type ViewType = 'list' | 'board' | 'calendar' | 'timeline' | 'gantt' | 'table' | 'dashboard';

export interface DashboardWidget {
  id: string;
  type: 'task_count' | 'status_distribution' | 'priority_distribution' | 'workload' | 'velocity' | 'time_tracking' | 'goals_summary' | 'activity_stream';
  title: string;
  w: number; // width grid 1-12
  h: number; // height grid
}

export interface Dashboard {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  widgets: DashboardWidget[];
  isGlobal?: boolean;
}

export interface AutomationRule {
  id: string;
  workspaceId: string;
  name: string;
  enabled: boolean;
  trigger: {
    type: 'task_created' | 'status_changed' | 'due_date_passed' | 'form_submitted';
    config?: any;
  };
  conditions: {
    field: string;
    operator: 'equals' | 'contains' | 'greater_than';
    value: string;
  }[];
  actions: {
    type: 'change_status' | 'assign_user' | 'add_tag' | 'create_subtask' | 'send_notification';
    config: any;
  }[];
}

export interface IntakeForm {
  id: string;
  workspaceId: string;
  title: string;
  description: string;
  targetProjectId: string;
  targetStatusId: string;
  fields: {
    id: string;
    label: string;
    type: 'text' | 'long_text' | 'dropdown' | 'date';
    required: boolean;
    options?: string[];
    mapsTo: 'title' | 'description' | 'priority' | 'custom_field';
    customFieldId?: string;
  }[];
}

export interface IntegrationProvider {
  id: string;
  name: string;
  category: 'Communication' | 'Development' | 'Storage' | 'Automation';
  icon: string;
  connected: boolean;
  statusText: string;
  description: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'mention' | 'assignment' | 'due_date' | 'comment' | 'status';
  read: boolean;
  createdAt: string;
  targetUrl?: string;
}

export interface AuditLogEntry {
  id: string;
  organizationId: string;
  actorName: string;
  actorEmail: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}
