'use client';

import React, { useState } from 'react';
import { useNexus } from '../../context/NexusContext';
import { FileSpreadsheet, Plus, Send, CheckCircle2 } from 'lucide-react';

export function FormsView() {
  const { forms, submitIntakeForm, projects } = useNexus();

  const [activeFormId, setActiveFormId] = useState<string>(forms[0]?.id || '');
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const selectedForm = forms.find((f) => f.id === activeFormId) || forms[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForm) return;

    submitIntakeForm(selectedForm.id, formValues);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormValues({});
    }, 3000);
  };

  return (
    <div className="flex-1 bg-[#090D16] p-6 overflow-y-auto custom-scrollbar space-y-6">
      <div className="p-4 bg-[#0E1322] border border-slate-800 rounded-2xl flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
            Dynamic Intake Form Builder
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Public or internal forms that automatically transform submissions into actionable tasks
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FORMS LIST */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Available Forms</h4>
          {forms.map((f) => (
            <div
              key={f.id}
              onClick={() => {
                setActiveFormId(f.id);
                setFormValues({});
                setSubmitted(false);
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                f.id === selectedForm?.id
                  ? 'bg-indigo-600/20 border-indigo-500/40 text-white shadow-lg'
                  : 'bg-[#0E1322] border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <h5 className="text-xs font-bold">{f.title}</h5>
              <p className="text-[11px] text-slate-400 mt-1">{f.description}</p>
              <span className="text-[9px] font-mono text-indigo-400 mt-2 inline-block px-2 py-0.5 rounded bg-indigo-500/10">
                {f.fields.length} Fields Configured
              </span>
            </div>
          ))}
        </div>

        {/* LIVE FORM PREVIEW & TEST */}
        {selectedForm && (
          <div className="lg:col-span-2 p-6 bg-[#0E1322] border border-slate-800 rounded-2xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Live Public Intake Form
              </span>
              <h4 className="text-base font-bold text-white mt-2">{selectedForm.title}</h4>
              <p className="text-xs text-slate-400">{selectedForm.description}</p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-950/40 border border-emerald-800/40 rounded-2xl space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <h5 className="text-sm font-bold text-white">Form Submitted Successfully!</h5>
                <p className="text-xs text-emerald-300">
                  Task created automatically in target project pipeline.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {selectedForm.fields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      {field.label} {field.required && <span className="text-rose-400">*</span>}
                    </label>

                    {field.type === 'long_text' ? (
                      <textarea
                        rows={3}
                        required={field.required}
                        value={formValues[field.mapsTo] || ''}
                        onChange={(e) =>
                          setFormValues((prev) => ({ ...prev, [field.mapsTo]: e.target.value }))
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none"
                      />
                    ) : field.type === 'dropdown' ? (
                      <select
                        value={formValues[field.mapsTo] || ''}
                        onChange={(e) =>
                          setFormValues((prev) => ({ ...prev, [field.mapsTo]: e.target.value }))
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none"
                      >
                        <option value="">Select option...</option>
                        {field.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        required={field.required}
                        value={formValues[field.mapsTo] || ''}
                        onChange={(e) =>
                          setFormValues((prev) => ({ ...prev, [field.mapsTo]: e.target.value }))
                        }
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 outline-none"
                      />
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Intake Form</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
