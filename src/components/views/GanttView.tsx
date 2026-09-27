'use client';

import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { GanttChart, CheckCircle2, ChevronRight, Milestone } from 'lucide-react';

export function GanttView() {
  const { tasks, activeProject } = useNexus();

  const projectTasks = tasks.filter(
    (t) => !activeProject || t.projectId === activeProject.id
  );

  return (
    <div className="flex-1 bg-[#090D16] p-6 flex flex-col overflow-hidden">
      <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <GanttChart className="w-4 h-4 text-indigo-400" />
            Interactive Gantt & Critical Path Planning
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Dependencies, milestones, and critical path scheduling
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-indigo-400 font-semibold px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            Critical Path Enabled
          </span>
        </div>
      </div>

      <div className="flex-1 bg-[#0E1322] border border-slate-800 rounded-2xl p-4 overflow-x-auto overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="p-2.5 w-64">Task / Milestone</th>
              <th className="p-2.5 w-28">Start</th>
              <th className="p-2.5 w-28">Due</th>
              <th className="p-2.5 w-32">Dependencies</th>
              <th className="p-2.5">Schedule Grid (Q4 2026)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40 text-xs">
            {projectTasks.map((t, idx) => {
              const completedCount = t.subtasks.filter((s) => s.completed).length;
              const progressPct = t.subtasks.length > 0 ? (completedCount / t.subtasks.length) * 100 : 50;

              return (
                <tr key={t.id} className="hover:bg-slate-900/40">
                  <td className="p-2.5 font-semibold text-slate-200">
                    <div className="flex items-center space-x-2">
                      <Milestone className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="truncate max-w-[200px]">{t.title}</span>
                    </div>
                  </td>
                  <td className="p-2.5 text-slate-400 font-mono text-[11px]">
                    {t.startDate || '2026-09-20'}
                  </td>
                  <td className="p-2.5 text-slate-400 font-mono text-[11px]">
                    {t.dueDate || '2026-10-15'}
                  </td>
                  <td className="p-2.5 text-slate-500 text-[11px]">
                    {t.dependencies.length > 0 ? `Blocked by ${t.dependencies.length} item` : 'None'}
                  </td>
                  <td className="p-2.5">
                    <div className="w-full bg-slate-900 h-6 rounded-lg relative overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-lg transition-all duration-300 flex items-center justify-end px-2 text-[9px] font-bold text-white shadow-sm"
                        style={{ width: `${Math.max(progressPct, 20)}%` }}
                      >
                        {Math.round(progressPct)}%
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
