'use client';

import React from 'react';
import { useNexus } from '../../context/NexusContext';
import { Inbox, Bell, Check, Trash2, ArrowRight } from 'lucide-react';

export function InboxView() {
  const { notifications, markNotificationRead, clearAllNotifications } = useNexus();

  return (
    <div className="flex-1 bg-[#090D16] p-6 overflow-y-auto custom-scrollbar space-y-6">
      <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Inbox className="w-4 h-4 text-indigo-400" />
            Unified Notification Inbox
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Mentions, task assignments, status changes, and system alerts
          </p>
        </div>
        <button
          onClick={clearAllNotifications}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white transition-all"
        >
          Mark All as Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              n.read
                ? 'bg-[#0E1322]/50 border-slate-800 text-slate-400'
                : 'bg-indigo-950/30 border-indigo-800/50 text-slate-200 shadow-lg'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                <Bell className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">{n.title}</h4>
                <p className="text-xs text-slate-300 mt-0.5">{n.message}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {!n.read && (
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
