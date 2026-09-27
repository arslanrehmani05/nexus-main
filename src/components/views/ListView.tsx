'use client';

import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import {
  CheckCircle2,
  Circle,
  Clock,
  User as UserIcon,
  Tag,
  Plus,
  Play,
  Trash2,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  AlertCircle,
  FileText
} from 'lucide-react';
import { Task, TaskPriority } from '../../types/nexus';

export function ListView() {
  const {
    tasks,
    activeProject,
    searchQuery,
    filterStatus,
    filterPriority,
    users,
    workflows,
    updateTaskStatus,
    updateTaskPriority,
    deleteTask,
    toggleSubtask,
    addSubtask,
    startTimer,
    timerActive,
    activeTimerTaskId,
    setIsQuickCreateOpen
  } = useNexus();

  const [expandedTaskIds, setExpandedTaskIds] = useState<Record<string, boolean>>({});
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState<Record<string, string>>({});

  // Filter tasks based on active project, search query, and dropdown filters
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

  const selectedProj = activeProject;
  const currentWorkflow = workflows.find((w) => w.id === selectedProj?.workflowId) || workflows[0];

  const toggleExpand = (id: string) => {
    setExpandedTaskIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSelectAll = () => {
    if (selectedTaskIds.length === projectTasks.length) {
      setSelectedTaskIds([]);
    } else {
      setSelectedTaskIds(projectTasks.map((t) => t.id));
    }
  };

  const toggleSelectTask = (id: string) => {
    setSelectedTaskIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    selectedTaskIds.forEach((id) => deleteTask(id));
    setSelectedTaskIds([]);
  };

  const handleAddSubtaskSubmit = (taskId: string, e: React.FormEvent) => {
    e.preventDefault();
    const title = newSubtaskTitle[taskId];
    if (title && title.trim()) {
      addSubtask(taskId, title.trim());
      setNewSubtaskTitle((prev) => ({ ...prev, [taskId]: '' }));
    }
  };

  const priorityColors: Record<TaskPriority, string> = {
    urgent: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    high: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    medium: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    low: 'bg-slate-500/10 text-slate-400 border-slate-500/30'
  };

  return (
    <div className="flex-1 flex flex-col bg-[#090D16] overflow-hidden">
      {/* BULK ACTION BAR */}
      {selectedTaskIds.length > 0 && (
        <div className="bg-indigo-950/80 border-b border-indigo-800/60 px-6 py-2.5 flex items-center justify-between text-xs text-indigo-200">
          <div className="flex items-center space-x-3">
            <span className="font-bold">{selectedTaskIds.length} items selected</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBulkDelete}
              className="bg-rose-600 hover:bg-rose-500 text-white font-semibold px-3 py-1 rounded-lg flex items-center space-x-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Selected</span>
            </button>
          </div>
        </div>
      )}

      {/* TABLE HEADER & DATA GRID */}
      <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-[#0C111E] border-b border-slate-800/80 text-[11px] font-semibold text-slate-400 uppercase tracking-wider sticky top-0 z-10">
              <th className="p-3 w-10 text-center">
                <input
                  type="checkbox"
                  checked={selectedTaskIds.length > 0 && selectedTaskIds.length === projectTasks.length}
                  onChange={toggleSelectAll}
                  className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0 cursor-pointer"
                />
              </th>
              <th className="p-3 min-w-[300px]">Task Title</th>
              <th className="p-3 w-36">Status</th>
              <th className="p-3 w-28">Priority</th>
              <th className="p-3 w-40">Assignees</th>
              <th className="p-3 w-32">Due Date</th>
              <th className="p-3 w-28">Progress</th>
              <th className="p-3 w-24 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40 text-xs">
            {projectTasks.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-12 text-center">
                  <FileText className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-400 font-semibold text-sm">No work items found</p>
                  <p className="text-slate-500 text-xs mt-1">
                    Try adjusting filters or create a new task.
                  </p>
                  <button
                    onClick={() => setIsQuickCreateOpen(true)}
                    className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-semibold text-xs transition-colors inline-flex items-center space-x-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Task</span>
                  </button>
                </td>
              </tr>
            ) : (
              projectTasks.map((task) => {
                const isExpanded = !!expandedTaskIds[task.id];
                const isSelected = selectedTaskIds.includes(task.id);
                const statusObj = currentWorkflow.statuses.find((s) => s.id === task.statusId) || currentWorkflow.statuses[0];
                const completedSubtasks = task.subtasks.filter((s) => s.completed).length;

                return (
                  <React.Fragment key={task.id}>
                    <tr
                      className={`hover:bg-slate-900/60 transition-colors group ${
                        isSelected ? 'bg-indigo-950/20' : ''
                      }`}
                    >
                      {/* CHECKBOX */}
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectTask(task.id)}
                          className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0 cursor-pointer"
                        />
                      </td>

                      {/* TITLE & EXPANDER */}
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleExpand(task.id)}
                            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronRight className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <div>
                            <p className="font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors">
                              {task.title}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              {task.tags.map((tg) => (
                                <span
                                  key={tg}
                                  className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-medium"
                                >
                                  #{tg}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* STATUS SELECT */}
                      <td className="p-3">
                        <select
                          value={task.statusId}
                          onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-200 outline-none"
                          style={{ color: statusObj.color }}
                        >
                          {currentWorkflow.statuses.map((st) => (
                            <option key={st.id} value={st.id} style={{ color: st.color }}>
                              {st.name}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* PRIORITY SELECT */}
                      <td className="p-3">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                            priorityColors[task.priority]
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>

                      {/* ASSIGNEES */}
                      <td className="p-3">
                        <div className="flex items-center -space-x-1.5">
                          {task.assigneeIds.map((uId) => {
                            const usr = users.find((u) => u.id === uId);
                            if (!usr) return null;
                            return (
                              <img
                                key={uId}
                                src={usr.avatar}
                                alt={usr.name}
                                title={`${usr.name} (${usr.role})`}
                                className="w-6 h-6 rounded-full border-2 border-[#090D16] object-cover"
                              />
                            );
                          })}
                        </div>
                      </td>

                      {/* DUE DATE */}
                      <td className="p-3 text-slate-400 font-mono text-[11px]">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '—'}
                      </td>

                      {/* PROGRESS SUBTASKS */}
                      <td className="p-3">
                        {task.subtasks.length > 0 ? (
                          <div className="w-24">
                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                              <span>
                                {completedSubtasks}/{task.subtasks.length}
                              </span>
                              <span>
                                {Math.round((completedSubtasks / task.subtasks.length) * 100)}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                                style={{
                                  width: `${(completedSubtasks / task.subtasks.length) * 100}%`
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => startTimer(task.id)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            timerActive && activeTimerTaskId === task.id
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40'
                          }`}
                          title="Start Time Tracker"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                          title="Delete Task"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>

                    {/* EXPANDED SUBTASKS & DETAILS ROW */}
                    {isExpanded && (
                      <tr className="bg-slate-950/60 border-b border-slate-800/80">
                        <td colSpan={8} className="p-4 pl-12 space-y-3">
                          <p className="text-xs text-slate-300 leading-relaxed font-normal bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                            {task.description || 'No description provided.'}
                          </p>

                          {/* SUBTASKS LIST */}
                          <div>
                            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                              Subtasks ({task.subtasks.length})
                            </h5>
                            <div className="space-y-1.5 max-w-xl">
                              {task.subtasks.map((sub) => (
                                <div
                                  key={sub.id}
                                  onClick={() => toggleSubtask(task.id, sub.id)}
                                  className="flex items-center space-x-2 text-xs p-2 rounded-lg bg-slate-900/80 hover:bg-slate-900 cursor-pointer border border-slate-800/60"
                                >
                                  {sub.completed ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                                  )}
                                  <span
                                    className={
                                      sub.completed ? 'line-through text-slate-500' : 'text-slate-200'
                                    }
                                  >
                                    {sub.title}
                                  </span>
                                </div>
                              ))}

                              {/* ADD SUBTASK FORM */}
                              <form
                                onSubmit={(e) => handleAddSubtaskSubmit(task.id, e)}
                                className="flex items-center space-x-2 pt-1"
                              >
                                <input
                                  type="text"
                                  value={newSubtaskTitle[task.id] || ''}
                                  onChange={(e) =>
                                    setNewSubtaskTitle((prev) => ({
                                      ...prev,
                                      [task.id]: e.target.value
                                    }))
                                  }
                                  placeholder="+ Add subtask press Enter..."
                                  className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
                                />
                              </form>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
