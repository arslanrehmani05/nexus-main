'use client';

import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { Puzzle, CheckCircle2, ArrowUpRight } from 'lucide-react';

export function IntegrationsView() {
  const { integrations } = useNexus();

  return (
    <div className="flex-1 bg-[#090D16] p-6 overflow-y-auto custom-scrollbar space-y-6">
      <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Puzzle className="w-4 h-4 text-indigo-400" />
            Integrations & Provider Ecosystem
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Connect external webhooks, developer tools, and team channels
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((provider) => (
          <div
            key={provider.id}
            className="p-5 bg-[#0E1322] border border-slate-800 rounded-2xl space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{provider.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{provider.name}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">{provider.category}</span>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    provider.connected
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                >
                  {provider.statusText}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">{provider.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                  provider.connected
                    ? 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                <span>{provider.connected ? 'Configure Connection' : 'Connect Provider'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
