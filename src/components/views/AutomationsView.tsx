'use client';

import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { Zap, Plus, ArrowRight, ToggleLeft, ToggleRight, ShieldAlert } from 'lucide-react';

export function AutomationsView() {
  const { automations } = useNexus();

  return (
    <div className="flex-1 bg-[#090D16] p-6 overflow-y-auto custom-scrollbar space-y-6">
      <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            Rule-Based Automation Engine
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure automated rules: WHEN Trigger ➔ IF Conditions ➔ THEN Actions
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-lg shadow-indigo-600/20">
          <Plus className="w-4 h-4" />
          <span>New Automation Rule</span>
        </button>
      </div>

      <div className="space-y-4">
        {automations.map((rule) => (
          <div
            key={rule.id}
            className="p-5 bg-[#0E1322] border border-slate-800 rounded-2xl space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{rule.name}</h4>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    Status: {rule.enabled ? 'ACTIVE' : 'DISABLED'}
                  </span>
                </div>
              </div>

              {rule.enabled ? (
                <ToggleRight className="w-6 h-6 text-indigo-400 cursor-pointer" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-slate-600 cursor-pointer" />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                  1. WHEN Trigger
                </span>
                <span className="font-mono text-slate-200">{rule.trigger.type.replace('_', ' ')}</span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  2. IF Conditions
                </span>
                <span className="font-mono text-slate-200">
                  {rule.conditions.length > 0
                    ? rule.conditions.map((c) => `${c.field} ${c.operator} ${c.value}`).join(' AND ')
                    : 'Always Execute'}
                </span>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  3. THEN Actions
                </span>
                <span className="font-mono text-slate-200">
                  {rule.actions.map((a) => a.type.replace('_', ' ')).join(', ')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
