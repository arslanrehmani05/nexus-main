'use client';

import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import {
  List,
  Kanban,
  Calendar as CalendarIcon,
  Clock,
  BarChart2,
  Table as TableIcon,
  GanttChart,
  Bell,
  Search,
  Filter,
  Plus,
  Play,
  Square,
  Sparkles,
  Check,
  Building2,
  Share2,
  CheckSquare
} from 'lucide-react';
import { ViewType } from '../../types/nexus';

export function Topbar() {
  const {
    activeProject,
    activeView,
    setActiveView,
    activeSection,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    notifications,
    markNotificationRead,
    clearAllNotifications,
    timerActive,
    activeTimerTaskId,
    timerSeconds,
    stopTimer,
    setIsQuickCreateOpen,
    tasks
  } = useNexus();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const unreadNotifications = notifications.filter((n) => !n.read);

  const activeTimerTask = tasks.find((t) => t.id === activeTimerTaskId);

  const viewTabs: { id: ViewType; label: string; icon: React.ElementType }[] = [
    { id: 'list', label: 'List', icon: List },
    { id: 'board', label: 'Board', icon: Kanban },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'gantt', label: 'Gantt', icon: GanttChart },
    { id: 'table', label: 'Table Grid', icon: TableIcon },
    { id: 'dashboard', label: 'Analytics', icon: BarChart2 }
  ];

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="bg-[#0D121F] border-b border-slate-800/80 px-6 py-3 flex items-center justify-between z-20 shrink-0">
      {/* LEFT: TITLE OR VIEW SWITCHER */}
      <div className="flex items-center space-x-6">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-bold text-white capitalize">
              {activeSection === 'projects' && activeProject
                ? activeProject.name
                : activeSection.replace('-', ' ')}
            </h2>
            {activeProject && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {activeProject.code}
              </span>
            )}
          </div>
          {activeProject && (
            <p className="text-xs text-slate-400 truncate max-w-md mt-0.5">
              {activeProject.description}
            </p>
          )}
        </div>

        {/* VIEW TABS (WHEN IN PROJECTS MODULE) */}
        {activeSection === 'projects' && (
          <div className="hidden lg:flex items-center bg-slate-900/90 border border-slate-800 p-1 rounded-xl space-x-1">
            {viewTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* RIGHT: SEARCH, TIMER, NOTIFICATIONS, ACTIONS */}
      <div className="flex items-center space-x-3">
        {/* LIVE TIMER CONTROLLER */}
        {timerActive && (
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1.5 rounded-lg flex items-center space-x-2 text-xs animate-pulse">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="font-mono font-bold">{formatTimer(timerSeconds)}</span>
            <span className="text-[11px] truncate max-w-[120px]">
              {activeTimerTask?.title || 'Tracking task...'}
            </span>
            <button
              onClick={stopTimer}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 p-1 rounded font-semibold transition-colors"
              title="Stop and save time entry"
            >
              <Square className="w-3 h-3 fill-current" />
            </button>
          </div>
        )}

        {/* SEARCH INPUT */}
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items, tags..."
            className="w-48 lg:w-64 bg-slate-900/80 border border-slate-800 focus:border-indigo-500 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none transition-all"
          />
        </div>

        {/* FILTER TOGGLE BUTTON */}
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className={`p-2 rounded-lg border text-xs flex items-center space-x-1.5 transition-colors ${
            filterStatus !== 'all' || filterPriority !== 'all'
              ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-300'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
          }`}
          title="Filter items"
        >
          <Filter className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Filter</span>
        </button>

        {/* NOTIFICATION POPOVER */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 relative transition-colors"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            {unreadNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center border-2 border-[#0D121F]">
                {unreadNotifications.length}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-[#111625] border border-slate-700 rounded-xl shadow-2xl z-50 p-3 space-y-2 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-indigo-400" />
                  Notifications
                </h4>
                {unreadNotifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-[10px] text-indigo-400 hover:underline font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-64 overflow-y-auto space-y-1.5 custom-scrollbar">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-500 py-4 text-center">No new notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${
                        n.read ? 'bg-slate-900/40 text-slate-400' : 'bg-indigo-950/40 border border-indigo-800/40 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold text-[11px] mb-0.5">
                        <span className="truncate">{n.title}</span>
                        <span className="text-[9px] text-slate-500 font-mono">
                          {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-[11px] leading-tight text-slate-400">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* QUICK CREATE TASK BUTTON */}
        <button
          onClick={() => setIsQuickCreateOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center space-x-1.5 shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Task</span>
        </button>
      </div>

      {/* FILTER DROPDOWN BAR */}
      {isFiltersOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#111625] border-b border-slate-800 px-6 py-2.5 flex items-center space-x-4 z-40 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-medium">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200 outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="st-backlog">Backlog</option>
              <option value="st-in-dev">In Development / Weaving</option>
              <option value="st-code-review">Code Review / QC</option>
              <option value="st-deployed">Deployed / Dispatched</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-medium">Priority:</span>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-200 outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {(filterStatus !== 'all' || filterPriority !== 'all') && (
            <button
              onClick={() => {
                setFilterStatus('all');
                setFilterPriority('all');
              }}
              className="text-indigo-400 hover:underline font-medium text-xs"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}
    </header>
  );
}
