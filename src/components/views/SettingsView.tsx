'use client';

import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { Settings, ShieldCheck, Sliders, FileText, Lock, Users, Database } from 'lucide-react';
import { MOCK_CUSTOM_FIELDS } from '../../lib/mock-data';

export function SettingsView() {
  const { auditLogs, workflows, activeOrg, activeWorkspace } = useNexus();
  const [activeTab, setActiveTab] = useState<'rbac' | 'fields' | 'workflows' | 'audit'>('rbac');

  return (
    <div className="flex-1 bg-[#090D16] p-6 overflow-y-auto custom-scrollbar space-y-6">
      {/* HEADER */}
      <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-indigo-400" />
            System Control & RBAC Configuration
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage roles, custom fields, custom statuses, and security audit log
          </p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('rbac')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'rbac'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Roles & RBAC Matrix
        </button>
        <button
          onClick={() => setActiveTab('fields')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'fields'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Custom Field Engine
        </button>
        <button
          onClick={() => setActiveTab('workflows')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'workflows'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Custom Status Pipelines
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'audit'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Security Audit Trail
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'rbac' && (
        <div className="bg-[#0E1322] border border-slate-800 rounded-2xl p-5 space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            Role-Based Access Control (RBAC) Matrix
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="p-3">Permission Capability</th>
                  <th className="p-3 text-center">Owner</th>
                  <th className="p-3 text-center">Admin</th>
                  <th className="p-3 text-center">Manager</th>
                  <th className="p-3 text-center">Member</th>
                  <th className="p-3 text-center">Guest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-300">
                <tr>
                  <td className="p-3 font-semibold">View Workspace & Items</td>
                  <td className="p-3 text-center text-emerald-400">✓</td>
                  <td className="p-3 text-center text-emerald-400">✓</td>
                  <td className="p-3 text-center text-emerald-400">✓</td>
                  <td className="p-3 text-center text-emerald-400">✓</td>
                  <td className="p-3 text-center text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Create & Edit Work Items</td>
                  <td className="p-3 text-center text-emerald-400">✓</td>
                  <td className="p-3 text-center text-emerald-400">✓</td>
                  <td className="p-3 text-center text-emerald-400">✓</td>
                  <td className="p-3 text-center text-emerald-400">✓</td>
                  <td className="p-3 text-center text-slate-600">✕</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Manage Workflows & Automations</td>
                  <td className="p-3 text-center text-emerald-400">✓</td>
                  <td className="p-3 text-center text-emerald-400">✓</td>
                  <td className="p-3 text-center text-emerald-400">✓</td>
                  <td className="p-3 text-center text-slate-600">✕</td>
                  <td className="p-3 text-center text-slate-600">✕</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Manage Billing & Security RLS</td>
                  <td className="p-3 text-center text-emerald-400">✓</td>
                  <td className="p-3 text-center text-emerald-400">✓</td>
                  <td className="p-3 text-center text-slate-600">✕</td>
                  <td className="p-3 text-center text-slate-600">✕</td>
                  <td className="p-3 text-center text-slate-600">✕</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'fields' && (
        <div className="bg-[#0E1322] border border-slate-800 rounded-2xl p-5 space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Organization Custom Fields Definition
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_CUSTOM_FIELDS.map((cf) => (
              <div key={cf.id} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-white">{cf.name}</h5>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
                    Type: {cf.type}
                  </span>
                </div>
                {cf.options && (
                  <p className="text-[10px] text-slate-400 mt-2">
                    Options: {cf.options.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'workflows' && (
        <div className="bg-[#0E1322] border border-slate-800 rounded-2xl p-5 space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Custom Workflow Status Pipelines
          </h4>
          <div className="space-y-4">
            {workflows.map((wf) => (
              <div key={wf.id} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                <h5 className="text-xs font-bold text-white mb-2">{wf.name}</h5>
                <div className="flex flex-wrap gap-2">
                  {wf.statuses.map((st) => (
                    <span
                      key={st.id}
                      className="text-xs font-semibold px-3 py-1 rounded-lg border"
                      style={{ color: st.color, borderColor: `${st.color}40`, backgroundColor: `${st.color}15` }}
                    >
                      {st.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-[#0E1322] border border-slate-800 rounded-2xl p-5 space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-400" />
            Immutable Security Audit Trail
          </h4>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="p-3">Actor</th>
                <th className="p-3">Action</th>
                <th className="p-3">Details</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 font-mono">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/40">
                  <td className="p-3 font-semibold text-slate-200">{log.actorName}</td>
                  <td className="p-3 text-indigo-400 font-bold">{log.action}</td>
                  <td className="p-3 text-slate-300 font-sans">{log.details}</td>
                  <td className="p-3 text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="p-3 text-right text-slate-500">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
