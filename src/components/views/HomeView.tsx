'use client';

import React from 'react';
import { useNexus } from '../../context/NexusContext';
import {
  Sparkles,
  CheckSquare,
  Clock,
  AlertTriangle,
  FolderGit2,
  TrendingUp,
  Plus,
  ArrowRight
} from 'lucide-react';

export function HomeView() {
  const { tasks, projects, goals, activeOrg, activeWorkspace, setIsQuickCreateOpen, setActiveSection, setActiveProject } = useNexus();

  const myTasks = tasks.filter((t) => t.assigneeIds.includes('usr-1'));
  const overdueTasks = myTasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.statusId !== 'st-deployed'
  );
  const urgentTasks = myTasks.filter((t) => t.priority === 'urgent');

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="flex-1 bg-[#090D16] p-6 overflow-y-auto custom-scrollbar space-y-6">
      {/* PERSONALIZED GREETING BANNER */}
      <div className="p-6 bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border border-indigo-500/30 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold mb-1">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>{activeOrg.name} • {activeWorkspace.name}</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {greeting}, Arslan!
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              You have <span className="text-indigo-300 font-bold">{myTasks.length} assigned work items</span> across active projects. {overdueTasks.length > 0 && <span className="text-rose-400 font-bold">{overdueTasks.length} items require immediate attention.</span>}
            </p>
          </div>

          <button
            onClick={() => setIsQuickCreateOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-lg shadow-indigo-600/30 self-start md:self-auto transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Work Item</span>
          </button>
        </div>
      </div>

      {/* METRIC HIGHLIGHT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">My Work Items</p>
            <p className="text-2xl font-bold text-white mt-1 font-mono">{myTasks.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <CheckSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Overdue Alerts</p>
            <p className="text-2xl font-bold text-rose-400 mt-1 font-mono">{overdueTasks.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">Active Workspace Projects</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1 font-mono">{projects.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <FolderGit2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* TWO COLUMN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLS: MY HIGH PRIORITY WORK */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Priority Action Items
            </h3>
            <button
              onClick={() => setActiveSection('my-work')}
              className="text-xs text-indigo-400 hover:underline font-semibold flex items-center gap-1"
            >
              View all My Work <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2">
            {myTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => setActiveSection('projects')}
                className="p-4 bg-[#0E1322] border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl flex items-center justify-between transition-all cursor-pointer group"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-indigo-300 transition-colors">
                    {t.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {t.priority.toUpperCase()}
                    </span>
                    <span>Due {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'Soon'}</span>
                  </p>
                </div>
                <span className="text-xs text-indigo-400 font-semibold px-3 py-1 rounded-xl bg-indigo-500/10 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  Open
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT 1 COL: QUICK RECENT PROJECTS */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Active Projects
          </h3>
          <div className="space-y-3">
            {projects.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setActiveProject(p);
                  setActiveSection('projects');
                }}
                className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl hover:border-slate-700 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{p.icon}</span>
                  <div>
                    <h5 className="text-xs font-bold text-white">{p.name}</h5>
                    <p className="text-[10px] text-slate-400">{p.code} • {p.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
