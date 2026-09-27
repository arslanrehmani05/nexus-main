'use client';

import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { Target, Plus, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

export function GoalsView() {
  const { goals, createGoal } = useNexus();

  const [title, setTitle] = useState('');
  const [targetValue, setTargetValue] = useState(100);
  const [unit, setUnit] = useState('USD');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createGoal({
      workspaceId: 'ws-acme-main',
      title,
      description: 'Strategic goal created via goals dashboard.',
      ownerId: 'usr-1',
      level: 'organization',
      targetValue: Number(targetValue),
      currentValue: 0,
      unit,
      timeframe: 'Q4 2026',
      status: 'on_track',
      linkedProjectIds: []
    });

    setTitle('');
  };

  return (
    <div className="flex-1 bg-[#090D16] p-6 overflow-y-auto custom-scrollbar space-y-6">
      <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" />
            Strategic Goals & OKRs
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Organization, team, and project key performance targets
          </p>
        </div>
      </div>

      {/* QUICK ADD GOAL FORM */}
      <form onSubmit={handleCreate} className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl flex items-center space-x-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Goal Title (e.g., Scale customer retention to 95%)..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
        />
        <input
          type="number"
          value={targetValue}
          onChange={(e) => setTargetValue(Number(e.target.value))}
          placeholder="Target"
          className="w-24 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
        />
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="Unit (e.g. %, USD)"
          className="w-24 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Goal</span>
        </button>
      </form>

      {/* GOALS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((g) => {
          const pct = Math.min(100, Math.round((g.currentValue / g.targetValue) * 100));

          return (
            <div key={g.id} className="p-5 bg-[#0E1322] border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                    {g.level} Goal
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1.5">{g.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{g.description}</p>
                </div>
                <span className="font-mono text-lg font-bold text-indigo-400">{pct}%</span>
              </div>

              <div className="space-y-1">
                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-1">
                  <span>Current: {g.currentValue.toLocaleString()} {g.unit}</span>
                  <span>Target: {g.targetValue.toLocaleString()} {g.unit}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
