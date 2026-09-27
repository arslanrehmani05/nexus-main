'use client';

import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { BarChart3, TrendingUp, CheckCircle2, AlertTriangle, Clock, Target, Users, Zap } from 'lucide-react';

export function DashboardView() {
  const { tasks, projects, goals, activeWorkspace } = useNexus();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.statusId === 'st-deployed' || t.statusId === 'st-packed').length;
  const inProgressTasks = tasks.filter((t) => t.statusId === 'st-in-dev' || t.statusId === 'st-weaving').length;
  const urgentTasks = tasks.filter((t) => t.priority === 'urgent').length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex-1 bg-[#090D16] p-6 overflow-y-auto custom-scrollbar space-y-6">
      {/* HEADER */}
      <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            Workspace Analytics & Executive Dashboard
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time telemetry for {activeWorkspace.name}
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Live Telemetry Active
        </span>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Work Items</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white mt-2 font-mono">{totalTasks}</p>
          <p className="text-[10px] text-slate-500 mt-1">Across all workspace projects</p>
        </div>

        <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Completion Rate</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-emerald-400 mt-2 font-mono">{completionRate}%</p>
          <p className="text-[10px] text-slate-500 mt-1">{completedTasks} items completed</p>
        </div>

        <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">In Active Pipeline</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-amber-300 mt-2 font-mono">{inProgressTasks}</p>
          <p className="text-[10px] text-slate-500 mt-1">In dev, weaving, or review</p>
        </div>

        <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Urgent Priority Items</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-rose-400 mt-2 font-mono">{urgentTasks}</p>
          <p className="text-[10px] text-slate-500 mt-1">Requires immediate triage</p>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PROJECT HEALTH */}
        <div className="p-5 bg-[#0E1322] border border-slate-800 rounded-2xl space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" />
            Project Health Matrix
          </h4>
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                  <div className="flex items-center space-x-2">
                    <span>{p.icon}</span>
                    <span>{p.name}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      p.health === 'on_track'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {p.health.replace('_', ' ')}
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-400 flex justify-between font-mono">
                  <span>Budget: ${p.budget?.toLocaleString()}</span>
                  <span>Spent: ${p.spent?.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GOALS SUMMARY */}
        <div className="p-5 bg-[#0E1322] border border-slate-800 rounded-2xl space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            Q4 Strategic Goals Telemetry
          </h4>
          <div className="space-y-3">
            {goals.map((g) => {
              const pct = Math.min(100, Math.round((g.currentValue / g.targetValue) * 100));
              return (
                <div key={g.id} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                    <span>{g.title}</span>
                    <span className="font-mono text-indigo-400">{pct}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Current: {g.currentValue.toLocaleString()} {g.unit}</span>
                    <span>Target: {g.targetValue.toLocaleString()} {g.unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
