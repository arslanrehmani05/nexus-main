'use client';

import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { Plus, CheckCircle2, Clock, MessageSquare, Paperclip, MoreHorizontal, User, AlertCircle } from 'lucide-react';
import { Task, TaskPriority } from '../../types/nexus';

export function BoardView() {
  const {
    tasks,
    activeProject,
    workflows,
    updateTaskStatus,
    users,
    searchQuery,
    filterStatus,
    filterPriority,
    setIsQuickCreateOpen
  } = useNexus();

  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const selectedProj = activeProject;
  const currentWorkflow = workflows.find((w) => w.id === selectedProj?.workflowId) || workflows[0];

  // Filter tasks
  const projectTasks = tasks.filter((t) => {
    if (activeProject && t.projectId !== activeProject.id) return false;
    if (filterStatus !== 'all' && t.statusId !== filterStatus) return false;
    if (filterPriority !== 'all' && t.priority !== filterPriority) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchTag = t.tags.some((tg) => tg.toLowerCase().includes(q));
      if (!matchTitle && !matchTag) return false;
    }
    return true;
  });

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, statusId: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    if (taskId) {
      updateTaskStatus(taskId, statusId);
      setDraggedTaskId(null);
    }
  };

  const priorityColors: Record<TaskPriority, string> = {
    urgent: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    high: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    medium: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    low: 'bg-slate-500/10 text-slate-400 border-slate-500/30'
  };

  return (
    <div className="flex-1 bg-[#090D16] p-6 overflow-x-auto custom-scrollbar flex space-x-6 select-none">
      {currentWorkflow.statuses.map((status) => {
        const laneTasks = projectTasks.filter((t) => t.statusId === status.id);

        return (
          <div
            key={status.id}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status.id)}
            className="w-80 shrink-0 bg-[#0E1322] border border-slate-800/80 rounded-2xl flex flex-col max-h-full overflow-hidden shadow-xl"
          >
            {/* COLUMN HEADER */}
            <div className="p-3.5 border-b border-slate-800/80 flex items-center justify-between bg-[#11172A]">
              <div className="flex items-center space-x-2.5">
                <span
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: status.color }}
                />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {status.name}
                </h4>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  {laneTasks.length}
                </span>
              </div>
              <button
                onClick={() => setIsQuickCreateOpen(true)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* CARDS LIST */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
              {laneTasks.length === 0 ? (
                <div className="border-2 border-dashed border-slate-800/60 rounded-xl p-6 text-center text-slate-500 text-xs">
                  Drop items here
                </div>
              ) : (
                laneTasks.map((task) => {
                  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;

                  return (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      className="bg-[#13192B] border border-slate-800 hover:border-indigo-500/50 rounded-xl p-3.5 shadow-md hover:shadow-indigo-500/10 transition-all cursor-grab active:cursor-grabbing group"
                    >
                      {/* PRIORITY & TAGS */}
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                            priorityColors[task.priority]
                          }`}
                        >
                          {task.priority}
                        </span>
                        {task.dueDate && (
                          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </span>
                        )}
                      </div>

                      {/* TITLE */}
                      <h5 className="text-xs font-bold text-slate-100 group-hover:text-indigo-300 transition-colors leading-snug mb-1.5">
                        {task.title}
                      </h5>

                      {/* DESCRIPTION PREVIEW */}
                      {task.description && (
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                          {task.description}
                        </p>
                      )}

                      {/* TAGS */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {task.tags.map((tg) => (
                          <span
                            key={tg}
                            className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-400"
                          >
                            #{tg}
                          </span>
                        ))}
                      </div>

                      {/* CARD FOOTER */}
                      <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-slate-500 text-[10px]">
                        <div className="flex items-center space-x-3">
                          {task.subtasks.length > 0 && (
                            <span className="flex items-center space-x-1 text-slate-400">
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                              <span>
                                {completedSubtasks}/{task.subtasks.length}
                              </span>
                            </span>
                          )}
                          <span className="flex items-center space-x-1">
                            <MessageSquare className="w-3 h-3" />
                            <span>{task.commentsCount}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Paperclip className="w-3 h-3" />
                            <span>{task.attachmentsCount}</span>
                          </span>
                        </div>

                        {/* ASSIGNEE AVATARS */}
                        <div className="flex items-center -space-x-1.5">
                          {task.assigneeIds.map((uId) => {
                            const usr = users.find((u) => u.id === uId);
                            if (!usr) return null;
                            return (
                              <img
                                key={uId}
                                src={usr.avatar}
                                alt={usr.name}
                                className="w-5 h-5 rounded-full border border-[#13192B] object-cover"
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
