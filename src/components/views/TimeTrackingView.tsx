'use client';

import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { Clock, Play, Square, FileText } from 'lucide-react';

export function TimeTrackingView() {
  const { timeEntries, tasks, timerActive, activeTimerTaskId, timerSeconds, stopTimer } = useNexus();

  const totalMinutes = timeEntries.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  return (
    <div className="flex-1 bg-[#090D16] p-6 overflow-y-auto custom-scrollbar space-y-6">
      <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            Time Tracking & Timesheets
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Record task duration, track active session timers, and audit project labor logs
          </p>
        </div>
        <div className="text-right font-mono">
          <p className="text-xs text-slate-400">Total Tracked Time</p>
          <p className="text-lg font-bold text-indigo-400">{totalHours} Hours</p>
        </div>
      </div>

      {/* TIME ENTRIES TABLE */}
      <div className="bg-[#0E1322] border border-slate-800 rounded-2xl p-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Logged Time Entries
        </h4>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              <th className="p-3">Work Item</th>
              <th className="p-3">Description</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-right">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40">
            {timeEntries.map((te) => {
              const task = tasks.find((t) => t.id === te.taskId);
              return (
                <tr key={te.id} className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-slate-200">
                    {task?.title || 'System Task'}
                  </td>
                  <td className="p-3 text-slate-400">{te.description}</td>
                  <td className="p-3 text-slate-500 font-mono">{te.date}</td>
                  <td className="p-3 text-right font-mono font-bold text-indigo-400">
                    {te.durationMinutes} mins
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
