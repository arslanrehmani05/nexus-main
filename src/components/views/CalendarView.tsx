'use client';

import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';

export function CalendarView() {
  const { tasks, activeProject, setIsQuickCreateOpen } = useNexus();
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfWeek = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const projectTasks = tasks.filter(
    (t) => !activeProject || t.projectId === activeProject.id
  );

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const dayCells = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    dayCells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    dayCells.push(day);
  }

  return (
    <div className="flex-1 bg-[#090D16] p-6 flex flex-col overflow-hidden">
      {/* CALENDAR CONTROLS */}
      <div className="flex items-center justify-between mb-4 bg-[#0E1322] border border-slate-800 p-3 rounded-2xl">
        <div className="flex items-center space-x-3">
          <CalendarIcon className="w-5 h-5 text-indigo-400" />
          <h3 className="text-sm font-bold text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white"
          >
            Today
          </button>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* DAYS HEADER */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* CALENDAR GRID */}
      <div className="flex-1 grid grid-cols-7 gap-2 overflow-y-auto custom-scrollbar">
        {dayCells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="bg-slate-950/20 rounded-xl p-2 border border-slate-900/40" />;
          }

          const dateStr = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

          const dayTasks = projectTasks.filter((t) => t.dueDate === dateStr);

          return (
            <div
              key={day}
              className="bg-[#0E1322] border border-slate-800/80 rounded-xl p-2 flex flex-col min-h-[110px] hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5">
                <span>{day}</span>
                {dayTasks.length > 0 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400">
                    {dayTasks.length}
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
                {dayTasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-1.5 rounded-lg bg-indigo-950/50 border border-indigo-800/40 text-[10px] font-semibold text-indigo-200 truncate cursor-pointer hover:bg-indigo-900/60"
                  >
                    {t.title}
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
