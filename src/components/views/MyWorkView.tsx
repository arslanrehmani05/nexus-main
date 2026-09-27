'use client';

import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { CheckSquare, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function MyWorkView() {
  const { tasks, updateTaskStatus } = useNexus();
  const [tab, setTab] = useState<'today' | 'upcoming' | 'overdue' | 'completed'>('today');

  const myTasks = tasks.filter((t) => t.assigneeIds.includes('usr-1'));

  const overdue = myTasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.statusId !== 'st-deployed'
  );
  const today = myTasks.filter((t) => t.statusId !== 'st-deployed' && !overdue.includes(t));
  const completed = myTasks.filter((t) => t.statusId === 'st-deployed' || t.statusId === 'st-packed');

  const displayTasks =
    tab === 'today' ? today : tab === 'overdue' ? overdue : completed;

  return (
    <div className="flex-1 bg-[#090D16] p-6 overflow-y-auto custom-scrollbar space-y-6">
      <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-indigo-400" />
            My Personal Work Center
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Partitioned view of your assigned work items
          </p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setTab('today')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tab === 'today'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Today / Active ({today.length})
        </button>
        <button
          onClick={() => setTab('overdue')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tab === 'overdue'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Overdue ({overdue.length})
        </button>
        <button
          onClick={() => setTab('completed')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            tab === 'completed'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Completed ({completed.length})
        </button>
      </div>

      {/* TASK LIST */}
      <div className="space-y-3">
        {displayTasks.map((task) => (
          <div
            key={task.id}
            className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl flex items-center justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <h4 className="text-xs font-bold text-white">{task.title}</h4>
              <p className="text-xs text-slate-400 mt-1">{task.description}</p>
              <div className="flex items-center space-x-3 mt-2 text-[10px] font-mono text-slate-500">
                <span>Priority: {task.priority.toUpperCase()}</span>
                <span>Due: {task.dueDate || 'N/A'}</span>
              </div>
            </div>

            <button
              onClick={() => updateTaskStatus(task.id, 'st-deployed')}
              className="px-3 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all"
            >
              Mark Done
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
