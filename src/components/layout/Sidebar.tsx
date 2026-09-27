'use client';

import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import {
  LayoutDashboard,
  CheckCircle2,
  Inbox,
  FolderGit2,
  Target,
  BarChart3,
  Calendar as CalendarIcon,
  FileSpreadsheet,
  Zap,
  Clock,
  Puzzle,
  Settings,
  ChevronDown,
  Plus,
  Search,
  Sparkles,
  Layers,
  ChevronRight,
  Briefcase,
  SlidersHorizontal,
  LogOut,
  Building2,
  ShieldCheck,
  CheckSquare
} from 'lucide-react';

export function Sidebar() {
  const {
    activeOrg,
    activeWorkspace,
    organizations,
    workspaces,
    setActiveOrgId,
    setActiveWorkspaceId,
    activeSection,
    setActiveSection,
    projects,
    activeProject,
    setActiveProject,
    notifications,
    setIsCommandPaletteOpen,
    setIsQuickCreateOpen,
    tasks
  } = useNexus();

  const [isWorkspaceDropdownOpen, setIsWorkspaceDropdownOpen] = useState(false);
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const currentWorkspaceProjects = projects.filter(
    (p) => p.workspaceId === activeWorkspace.id
  );

  const navItems = [
    { id: 'home', label: 'Home', icon: LayoutDashboard },
    { id: 'inbox', label: 'Inbox', icon: Inbox, badge: unreadCount > 0 ? unreadCount : undefined },
    { id: 'my-work', label: 'My Work', icon: CheckSquare },
    { id: 'portfolios', label: 'Portfolios', icon: Layers },
    { id: 'goals', label: 'Goals & OKRs', icon: Target },
    { id: 'dashboards', label: 'Dashboards', icon: BarChart3 },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'forms', label: 'Intake Forms', icon: FileSpreadsheet },
    { id: 'automations', label: 'Automations', icon: Zap },
    { id: 'time-tracking', label: 'Time Tracking', icon: Clock },
    { id: 'integrations', label: 'Integrations', icon: Puzzle },
    { id: 'settings', label: 'Settings & RBAC', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-[#0B0F19] text-slate-300 border-r border-slate-800/60 flex flex-col h-screen select-none shrink-0 transition-all duration-300 relative z-30">
      {/* BRAND & LOGO HEADER */}
      <div className="p-4 border-b border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="font-bold tracking-wider text-white text-lg leading-tight flex items-center gap-1.5">
              NEXUS
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                PRO
              </span>
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">Business OS</p>
          </div>
        </div>
      </div>

      {/* WORKSPACE & ORG SELECTOR */}
      <div className="p-3 border-b border-slate-800/40 relative">
        <button
          onClick={() => setIsWorkspaceDropdownOpen(!isWorkspaceDropdownOpen)}
          className="w-full bg-slate-900/80 hover:bg-slate-800/80 border border-slate-800 rounded-lg p-2.5 flex items-center justify-between transition-colors text-left group"
        >
          <div className="flex items-center space-x-2.5 truncate">
            <span className="text-lg">{activeWorkspace.icon}</span>
            <div className="truncate">
              <p className="text-xs font-semibold text-white group-hover:text-indigo-300 truncate transition-colors">
                {activeWorkspace.name}
              </p>
              <p className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-400" />
                {activeOrg.name}
              </p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform duration-200" />
        </button>

        {/* WORKSPACE DROPDOWN */}
        {isWorkspaceDropdownOpen && (
          <div className="absolute top-full left-3 right-3 mt-1 bg-[#111625] border border-slate-700/80 rounded-xl shadow-2xl z-50 p-2 space-y-1 backdrop-blur-xl">
            <div className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-800/80 mb-1">
              Organizations & Workspaces
            </div>
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                onClick={() => {
                  setActiveWorkspaceId(ws.id);
                  setActiveOrgId(ws.organizationId);
                  setIsWorkspaceDropdownOpen(false);
                }}
                className={`w-full text-left p-2 rounded-lg flex items-center space-x-2.5 transition-colors ${
                  ws.id === activeWorkspace.id
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                    : 'hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <span className="text-base">{ws.icon}</span>
                <div className="truncate">
                  <p className="text-xs font-medium truncate">{ws.name}</p>
                  <p className="text-[10px] text-slate-500">
                    {organizations.find((o) => o.id === ws.organizationId)?.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* QUICK SEARCH & ACTION */}
      <div className="p-3 space-y-2">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800/80 rounded-lg py-1.5 px-3 text-xs text-slate-400 flex items-center justify-between transition-all group"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400" />
            <span>Search...</span>
          </div>
          <kbd className="bg-slate-800 text-[10px] text-slate-400 px-1.5 py-0.5 rounded font-mono border border-slate-700/60">
            ⌘K
          </kbd>
        </button>

        <button
          onClick={() => setIsQuickCreateOpen(true)}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg py-2 px-3 text-xs flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>New Work Item</span>
        </button>
      </div>

      {/* MAIN NAVIGATION ITEMS */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 custom-scrollbar">
        <div className="px-2 py-1 text-[10px] uppercase tracking-wider font-semibold text-slate-500">
          Core Modules
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                if (item.id !== 'projects') {
                  setActiveProject(null);
                }
              }}
              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400 font-semibold border border-indigo-500/20 shadow-sm'
                  : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* PROJECTS SECTION */}
        <div className="pt-4">
          <div className="flex items-center justify-between px-2 py-1 text-[10px] uppercase tracking-wider font-semibold text-slate-500">
            <button
              onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
              className="flex items-center space-x-1.5 hover:text-slate-300"
            >
              {isProjectsExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
              <span>Workspace Projects</span>
            </button>
            <button
              onClick={() => setIsQuickCreateOpen(true)}
              className="hover:text-indigo-400 p-0.5 rounded"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {isProjectsExpanded && (
            <div className="mt-1 space-y-0.5 pl-1">
              {currentWorkspaceProjects.map((proj) => {
                const isProjActive = activeProject?.id === proj.id;
                const projTaskCount = tasks.filter((t) => t.projectId === proj.id).length;
                return (
                  <button
                    key={proj.id}
                    onClick={() => {
                      setActiveProject(proj);
                      setActiveSection('projects');
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-all ${
                      isProjActive
                        ? 'bg-indigo-600/20 text-white font-medium border border-indigo-500/30'
                        : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="text-sm">{proj.icon}</span>
                      <span className="truncate">{proj.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono bg-slate-800 px-1.5 py-0.5 rounded">
                      {projTaskCount}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* USER FOOTER */}
      <div className="p-3 border-t border-slate-800/60 bg-[#080B13] flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Arslan"
              className="w-8 h-8 rounded-full border border-indigo-500/40 object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0B0F19]" />
          </div>
          <div className="truncate">
            <p className="text-xs font-semibold text-white truncate">Arslan Rehmani</p>
            <p className="text-[10px] text-indigo-400 font-medium truncate flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-indigo-400" />
              CTO • Owner
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
