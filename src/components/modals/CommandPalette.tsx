'use client';

import React, { useState, useEffect } from 'react';
import { useNexus } from '../../context/NexusContext';
import {
  Search,
  Plus,
  LayoutDashboard,
  FolderGit2,
  Settings,
  Zap,
  Target,
  Clock,
  Layers,
  CheckSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export function CommandPalette() {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setIsQuickCreateOpen,
    setActiveSection,
    setActiveView,
    projects,
    setActiveProject,
    tasks
  } = useNexus();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const actions = [
    {
      id: 'create-task',
      title: 'Create New Task',
      subtitle: 'Add work item to current project',
      icon: Plus,
      run: () => {
        setIsCommandPaletteOpen(false);
        setIsQuickCreateOpen(true);
      }
    },
    {
      id: 'nav-home',
      title: 'Go to Home Dashboard',
      subtitle: 'Overview of work, deadlines & assigned items',
      icon: LayoutDashboard,
      run: () => {
        setActiveSection('home');
        setIsCommandPaletteOpen(false);
      }
    },
    {
      id: 'nav-my-work',
      title: 'Go to My Work',
      subtitle: 'Personal work items partitioned by due date',
      icon: CheckSquare,
      run: () => {
        setActiveSection('my-work');
        setIsCommandPaletteOpen(false);
      }
    },
    {
      id: 'nav-goals',
      title: 'Go to Goals & OKRs',
      subtitle: 'Strategic organizational metrics',
      icon: Target,
      run: () => {
        setActiveSection('goals');
        setIsCommandPaletteOpen(false);
      }
    },
    {
      id: 'nav-automations',
      title: 'Open Automation Rules',
      subtitle: 'Rule-based trigger condition action builder',
      icon: Zap,
      run: () => {
        setActiveSection('automations');
        setIsCommandPaletteOpen(false);
      }
    },
    {
      id: 'nav-settings',
      title: 'Open Settings & RBAC Permissions',
      subtitle: 'Manage custom workflows, custom fields & audit trail',
      icon: Settings,
      run: () => {
        setActiveSection('settings');
        setIsCommandPaletteOpen(false);
      }
    }
  ];

  const filteredActions = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#0F1423] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* COMMAND INPUT */}
        <div className="p-4 border-b border-slate-800 flex items-center space-x-3 bg-slate-900/50">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search work items..."
            className="w-full bg-transparent text-slate-100 text-sm placeholder-slate-500 outline-none font-medium"
            autoFocus
          />
          <kbd className="bg-slate-800 text-[10px] text-slate-400 px-2 py-0.5 rounded font-mono border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* RESULTS FEED */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4 custom-scrollbar">
          {/* ACTIONS */}
          <div>
            <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Quick System Commands
            </div>
            <div className="space-y-1 mt-1">
              {filteredActions.map((act) => {
                const Icon = act.icon;
                return (
                  <button
                    key={act.id}
                    onClick={act.run}
                    className="w-full text-left p-2.5 rounded-xl flex items-center justify-between hover:bg-indigo-600/20 hover:border-indigo-500/30 border border-transparent transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300">
                          {act.title}
                        </p>
                        <p className="text-[10px] text-slate-500">{act.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* TASKS SEARCH RESULTS */}
          {query.trim() !== '' && filteredTasks.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Matching Work Tasks ({filteredTasks.length})
              </div>
              <div className="space-y-1 mt-1">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => {
                      setActiveSection('projects');
                      setIsCommandPaletteOpen(false);
                    }}
                    className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <p className="text-xs font-medium text-slate-200">{task.title}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                        Priority: {task.priority.toUpperCase()} • {task.subtasks.length} subtasks
                      </p>
                    </div>
                    <span className="text-[10px] text-indigo-400 font-semibold px-2 py-0.5 rounded bg-indigo-500/10">
                      View Task
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FOOTER TIPS */}
        <div className="p-3 border-t border-slate-800 bg-[#080B13] flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>NEXUS Intelligent Command Palette</span>
          </div>
          <div className="flex items-center space-x-3">
            <span>Use ↑ ↓ to navigate</span>
            <span>↵ to select</span>
          </div>
        </div>
      </div>
    </div>
  );
}
