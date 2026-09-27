'use client';

import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { Clock, CheckCircle2, ChevronRight, User } from 'lucide-react';

export function TimelineView() {
  const { tasks, activeProject, users } = useNexus();

  const projectTasks = tasks.filter(
    (t) => !activeProject || t.projectId === activeProject.id
  );

  const months = ['Sep 2026', 'Oct 2026', 'Nov 2026', 'Dec 2026'];

  return (
    <div className="flex-1 bg-[#090D16] p-6 flex flex-col overflow-hidden">
      <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            Project Execution Timeline
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Visual breakdown of milestone schedules and dependencies
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span className="w-3 h-3 bg-indigo-500 rounded" /> In Development
          <span className="w-3 h-3 bg-emerald-500 rounded ml-2" /> Deployed
        </div>
      </div>

      <div className="flex-1 bg-[#0E1322] border border-slate-800 rounded-2xl p-4 overflow-x-auto overflow-y-auto custom-scrollbar">
        {/* MONTHS HEADER */}
        <div className="flex border-b border-slate-800 pb-3 mb-4 text-xs font-bold text-slate-400">
          <div className="w-72 shrink-0">Work Item Details</div>
          <div className="flex-1 grid grid-cols-4 text-center">
            {months.map((m) => (
              <div key={m}>{m}</div>
            ))}
          </div>
        </div>

        {/* TIMELINE ROWS */}
        <div className="space-y-3">
          {projectTasks.map((t, idx) => {
            const startPct = (idx * 15) % 60;
            const widthPct = 25 + ((idx * 7) % 30);

            return (
              <div key={t.id} className="flex items-center border-b border-slate-800/40 pb-3">
                {/* TASK TITLE */}
                <div className="w-72 shrink-0 pr-4">
                  <p className="text-xs font-semibold text-slate-200 truncate">{t.title}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                    Est: {t.timeEstimateHours || 16}h • {t.priority.toUpperCase()}
                  </p>
                </div>

                {/* TIMELINE BAR */}
                <div className="flex-1 relative h-8 bg-slate-900/60 rounded-xl overflow-hidden border border-slate-800">
                  <div
                    className="absolute top-1 bottom-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-2 flex items-center justify-between text-[10px] font-bold text-white shadow-lg"
                    style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                  >
                    <span className="truncate">{t.title}</span>
                    <span className="font-mono text-[9px] opacity-80">{widthPct}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
