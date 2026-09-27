'use client';

import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { Layers, CheckCircle2, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';

export function PortfoliosView() {
  const { portfolios, projects } = useNexus();

  return (
    <div className="flex-1 bg-[#090D16] p-6 overflow-y-auto custom-scrollbar space-y-6">
      <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            Executive Portfolios
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Group projects into strategic portfolios to monitor cross-project health and budget
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolios.map((port) => {
          const linkedProjects = projects.filter((p) => port.projectIds.includes(p.id));

          return (
            <div
              key={port.id}
              className="p-5 bg-[#0E1322] border border-slate-800 rounded-2xl space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{port.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{port.description}</p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase border ${
                    port.health === 'on_track'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {port.health.replace('_', ' ')}
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Contained Projects ({linkedProjects.length})
                </h5>
                {linkedProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{p.icon}</span>
                      <span className="font-semibold text-slate-200">{p.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-indigo-400">${p.budget?.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
