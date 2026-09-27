'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  Organization,
  Workspace,
  Project,
  Task,
  User,
  Team,
  Goal,
  Portfolio,
  Dashboard,
  AutomationRule,
  IntakeForm,
  IntegrationProvider,
  NotificationItem,
  AuditLogEntry,
  TimeEntry,
  ViewType,
  TaskPriority,
  WorkflowConfig,
  StatusConfig
} from '../types/nexus';
import {
  MOCK_ORGANIZATIONS,
  MOCK_WORKSPACES,
  MOCK_USERS,
  MOCK_TEAMS,
  MOCK_PROJECTS,
  MOCK_TASKS,
  MOCK_PORTFOLIOS,
  MOCK_GOALS,
  MOCK_DASHBOARDS,
  MOCK_AUTOMATIONS,
  MOCK_FORMS,
  MOCK_INTEGRATIONS,
  MOCK_NOTIFICATIONS,
  MOCK_AUDIT_LOGS,
  MOCK_TIME_ENTRIES,
  MOCK_WORKFLOWS
} from '../lib/mock-data';

interface NexusContextType {
  // Navigation & Workspace Selection
  activeOrg: Organization;
  activeWorkspace: Workspace;
  setActiveOrgId: (id: string) => void;
  setActiveWorkspaceId: (id: string) => void;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  filterPriority: string;
  setFilterPriority: (priority: string) => void;
  filterAssignee: string;
  setFilterAssignee: (assigneeId: string) => void;

  // Data Collections
  organizations: Organization[];
  workspaces: Workspace[];
  users: User[];
  teams: Team[];
  projects: Project[];
  tasks: Task[];
  portfolios: Portfolio[];
  goals: Goal[];
  dashboards: Dashboard[];
  automations: AutomationRule[];
  forms: IntakeForm[];
  integrations: IntegrationProvider[];
  notifications: NotificationItem[];
  auditLogs: AuditLogEntry[];
  timeEntries: TimeEntry[];
  workflows: WorkflowConfig[];

  // Mutators & Operations
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'attachmentsCount' | 'commentsCount'>) => void;
  updateTaskStatus: (taskId: string, statusId: string) => void;
  updateTaskPriority: (taskId: string, priority: TaskPriority) => void;
  assignTask: (taskId: string, userId: string) => void;
  deleteTask: (taskId: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  addSubtask: (taskId: string, title: string) => void;
  
  createProject: (project: Omit<Project, 'id' | 'code'>) => void;
  createGoal: (goal: Omit<Goal, 'id'>) => void;
  createForm: (form: Omit<IntakeForm, 'id'>) => void;
  submitIntakeForm: (formId: string, values: Record<string, any>) => void;
  
  // UI & Timer States
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isQuickCreateOpen: boolean;
  setIsQuickCreateOpen: (open: boolean) => void;
  
  // Live Timer
  timerActive: boolean;
  activeTimerTaskId: string | null;
  timerSeconds: number;
  startTimer: (taskId: string) => void;
  stopTimer: () => void;

  // Notification Operations
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
}

const NexusContext = createContext<NexusContextType | undefined>(undefined);

export function NexusProvider({ children }: { children: React.ReactNode }) {
  // Navigation State
  const [organizations] = useState<Organization[]>(MOCK_ORGANIZATIONS);
  const [workspaces] = useState<Workspace[]>(MOCK_WORKSPACES);
  const [activeOrgId, setActiveOrgId] = useState<string>('org-acme');
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>('ws-acme-main');
  const [activeView, setActiveView] = useState<ViewType>('list');
  const [activeProject, setActiveProject] = useState<Project | null>(MOCK_PROJECTS[0]);
  const [activeSection, setActiveSection] = useState<string>('projects');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');

  // Core Entity State
  const [users] = useState<User[]>(MOCK_USERS);
  const [teams] = useState<Team[]>(MOCK_TEAMS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [portfolios] = useState<Portfolio[]>(MOCK_PORTFOLIOS);
  const [goals, setGoals] = useState<Goal[]>(MOCK_GOALS);
  const [dashboards] = useState<Dashboard[]>(MOCK_DASHBOARDS);
  const [automations] = useState<AutomationRule[]>(MOCK_AUTOMATIONS);
  const [forms, setForms] = useState<IntakeForm[]>(MOCK_FORMS);
  const [integrations] = useState<IntegrationProvider[]>(MOCK_INTEGRATIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [auditLogs] = useState<AuditLogEntry[]>(MOCK_AUDIT_LOGS);
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(MOCK_TIME_ENTRIES);
  const [workflows] = useState<WorkflowConfig[]>(MOCK_WORKFLOWS);

  // Modals & Palette
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);

  // Timer State
  const [timerActive, setTimerActive] = useState(false);
  const [activeTimerTaskId, setActiveTimerTaskId] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Active Context Objects
  const activeOrg = useMemo(() => {
    return organizations.find((o) => o.id === activeOrgId) || organizations[0];
  }, [organizations, activeOrgId]);

  const activeWorkspace = useMemo(() => {
    return workspaces.find((w) => w.id === activeWorkspaceId) || workspaces[0];
  }, [workspaces, activeWorkspaceId]);

  // Operations
  const createTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'attachmentsCount' | 'commentsCount'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attachmentsCount: 0,
      commentsCount: 0
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTaskStatus = (taskId: string, statusId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, statusId, updatedAt: new Date().toISOString() } : t))
    );
  };

  const updateTaskPriority = (taskId: string, priority: TaskPriority) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, priority, updatedAt: new Date().toISOString() } : t))
    );
  };

  const assignTask = (taskId: string, userId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const exists = t.assigneeIds.includes(userId);
          const assigneeIds = exists ? t.assigneeIds : [...t.assigneeIds, userId];
          return { ...t, assigneeIds, updatedAt: new Date().toISOString() };
        }
        return t;
      })
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const updatedSubtasks = t.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          return { ...t, subtasks: updatedSubtasks, updatedAt: new Date().toISOString() };
        }
        return t;
      })
    );
  };

  const addSubtask = (taskId: string, title: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const newSubtask = {
            id: `sub-${Date.now()}`,
            taskId,
            title,
            completed: false
          };
          return { ...t, subtasks: [...t.subtasks, newSubtask], updatedAt: new Date().toISOString() };
        }
        return t;
      })
    );
  };

  const createProject = (projData: Omit<Project, 'id' | 'code'>) => {
    const code = `PRJ-${Math.floor(100 + Math.random() * 900)}`;
    const newProj: Project = {
      ...projData,
      id: `prj-${Date.now()}`,
      code
    };
    setProjects((prev) => [...prev, newProj]);
    setActiveProject(newProj);
  };

  const createGoal = (goalData: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: `goal-${Date.now()}`
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const createForm = (formData: Omit<IntakeForm, 'id'>) => {
    const newForm: IntakeForm = {
      ...formData,
      id: `form-${Date.now()}`
    };
    setForms((prev) => [...prev, newForm]);
  };

  const submitIntakeForm = (formId: string, values: Record<string, any>) => {
    const form = forms.find((f) => f.id === formId);
    if (!form) return;

    const newTask: Task = {
      id: `task-form-${Date.now()}`,
      projectId: form.targetProjectId,
      title: values.title || 'Form Submission Task',
      description: values.description || 'Generated via customer intake form.',
      statusId: form.targetStatusId,
      priority: values.priority || 'medium',
      assigneeIds: ['usr-1'],
      watcherIds: [],
      subtasks: [],
      dependencies: [],
      tags: ['Intake-Form'],
      customFields: [],
      attachmentsCount: 0,
      commentsCount: 0,
      createdBy: 'usr-guest',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const startTimer = (taskId: string) => {
    setActiveTimerTaskId(taskId);
    setTimerActive(true);
  };

  const stopTimer = () => {
    if (activeTimerTaskId && timerSeconds > 0) {
      const minutes = Math.ceil(timerSeconds / 60);
      const newEntry: TimeEntry = {
        id: `te-${Date.now()}`,
        taskId: activeTimerTaskId,
        userId: 'usr-1',
        description: 'Timer tracking session',
        durationMinutes: minutes,
        date: new Date().toISOString().split('T')[0]
      };
      setTimeEntries((prev) => [newEntry, ...prev]);
    }
    setTimerActive(false);
    setActiveTimerTaskId(null);
    setTimerSeconds(0);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <NexusContext.Provider
      value={{
        activeOrg,
        activeWorkspace,
        setActiveOrgId,
        setActiveWorkspaceId,
        activeView,
        setActiveView,
        activeProject,
        setActiveProject,
        activeSection,
        setActiveSection,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        filterPriority,
        setFilterPriority,
        filterAssignee,
        setFilterAssignee,
        organizations,
        workspaces,
        users,
        teams,
        projects,
        tasks,
        portfolios,
        goals,
        dashboards,
        automations,
        forms,
        integrations,
        notifications,
        auditLogs,
        timeEntries,
        workflows,
        createTask,
        updateTaskStatus,
        updateTaskPriority,
        assignTask,
        deleteTask,
        toggleSubtask,
        addSubtask,
        createProject,
        createGoal,
        createForm,
        submitIntakeForm,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isQuickCreateOpen,
        setIsQuickCreateOpen,
        timerActive,
        activeTimerTaskId,
        timerSeconds,
        startTimer,
        stopTimer,
        markNotificationRead,
        clearAllNotifications
      }}
    >
      {children}
    </NexusContext.Provider>
  );
}

export function useNexus() {
  const context = useContext(NexusContext);
  if (!context) {
    throw new Error('useNexus must be used within a NexusProvider');
  }
  return context;
}
