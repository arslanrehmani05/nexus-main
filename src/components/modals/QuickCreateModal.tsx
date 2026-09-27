'use client';

import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { X, Plus, Calendar, User as UserIcon, Tag, AlertCircle } from 'lucide-react';
import { TaskPriority } from '../../types/nexus';

export function QuickCreateModal() {
  const {
    isQuickCreateOpen,
    setIsQuickCreateOpen,
    createTask,
    projects,
    activeProject,
    users,
    workflows
  } = useNexus();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState<string>(activeProject?.id || projects[0]?.id || '');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [statusId, setStatusId] = useState<string>('st-backlog');
  const [assigneeId, setAssigneeId] = useState<string>('usr-1');
  const [dueDate, setDueDate] = useState<string>('');
  const [tagsInput, setTagsInput] = useState<string>('');
  const [timeEstimate, setTimeEstimate] = useState<number>(8);

  if (!isQuickCreateOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    createTask({
      projectId,
      title,
      description,
      statusId,
      priority,
      assigneeIds: assigneeId ? [assigneeId] : [],
      watcherIds: [],
      dueDate: dueDate || undefined,
      timeEstimateHours: Number(timeEstimate),
      timeSpentMinutes: 0,
      tags,
      customFields: [],
      subtasks: [],
      dependencies: [],
      createdBy: 'usr-1'
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setTagsInput('');
    setIsQuickCreateOpen(false);
  };

  const selectedProj = projects.find((p) => p.id === projectId);
  const selectedWf = workflows.find((w) => w.id === selectedProj?.workflowId) || workflows[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-[#0F1423] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
              +
            </div>
            <h3 className="text-sm font-bold text-white">Create New Work Item</h3>
          </div>
          <button
            onClick={() => setIsQuickCreateOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {/* TITLE */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Task Title <span className="text-indigo-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Build Responsive App Shell & Glassmorphic Navigation Header"
              className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none font-medium transition-all"
              autoFocus
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description / Specifications
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail work scope, requirements, or links..."
              className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all resize-none"
            />
          </div>

          {/* GRID ATTRIBUTES */}
          <div className="grid grid-cols-2 gap-3">
            {/* PROJECT */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Project
              </label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.code})
                  </option>
                ))}
              </select>
            </div>

            {/* STATUS */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Initial Workflow Status
              </label>
              <select
                value={statusId}
                onChange={(e) => setStatusId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
              >
                {selectedWf.statuses.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>

            {/* PRIORITY */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* ASSIGNEE */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Assignee</label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
              >
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.title || u.role})
                  </option>
                ))}
              </select>
            </div>

            {/* DUE DATE */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
              />
            </div>

            {/* ESTIMATED HOURS */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Time Estimate (Hours)
              </label>
              <input
                type="number"
                value={timeEstimate}
                onChange={(e) => setTimeEstimate(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
              />
            </div>
          </div>

          {/* TAGS */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g., UI/UX, Frontend, High-Priority"
              className="w-full bg-slate-900/80 border border-slate-700 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none transition-all"
            />
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsQuickCreateOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
            >
              Create Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
