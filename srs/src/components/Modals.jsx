import React, { useState, useRef, useEffect } from "react";
import { X, Send, ArrowRightLeft } from "lucide-react";
import { STUDENT, COMPLAINT_CATEGORIES, ROOM_CHANGE_REASONS, ROOM_CHANGE_PREFS } from "./mockData";

const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#172554] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]";
const btnGhost = "inline-flex items-center justify-center gap-2 rounded-xl border border-[#1E3A8A]/30 bg-white/70 px-4 py-2.5 text-sm font-semibold text-[#1E3A8A] transition-colors hover:bg-white";
const inputCls = "block w-full rounded-xl border border-slate-300 bg-white/80 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]";

export function Modal({ title, onClose, children }) {
  const panelRef = useRef(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div onClick={onClose} className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />
      <div ref={panelRef} tabIndex={-1} className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-white/70 bg-white/95 p-6 shadow-2xl backdrop-blur-xl sm:rounded-3xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ComplaintModal({ onSubmit, onClose }) {
  const [f, setF] = useState({ category: "", priority: "Medium", location: `Room ${STUDENT.room}`, subject: "", description: "" });
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));

  return (
    <Modal title="Raise a complaint / maintenance request" onClose={onClose}>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(f); }} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-800">Category</label>
            <select value={f.category} onChange={set("category")} className={inputCls}>
              <option value="">Select…</option>
              {COMPLAINT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-800">Priority</label>
            <select value={f.priority} onChange={set("priority")} className={inputCls}>
              {["Low", "Medium", "High"].map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-800">Location</label>
          <input value={f.location} onChange={set("location")} className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-800">Subject</label>
          <input value={f.subject} onChange={set("subject")} className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-800">Details</label>
          <textarea rows={4} value={f.description} onChange={set("description")} className={inputCls} />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className={btnGhost}>Cancel</button>
          <button type="submit" className={btnPrimary}><Send className="h-4 w-4" />Submit request</button>
        </div>
      </form>
    </Modal>
  );
}

export function RoomChangeModal({ onSubmit, onClose }) {
  const [f, setF] = useState({ reason: "", preference: ROOM_CHANGE_PREFS[0], details: "" });
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));

  return (
    <Modal title="Request a room change" onClose={onClose}>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(f); }} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-800">Reason</label>
          <select value={f.reason} onChange={set("reason")} className={inputCls}>
            <option value="">Select…</option>
            {ROOM_CHANGE_REASONS.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-800">Preference</label>
          <select value={f.preference} onChange={set("preference")} className={inputCls}>
            {ROOM_CHANGE_PREFS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-800">Details</label>
          <textarea rows={4} value={f.details} onChange={set("details")} className={inputCls} />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className={btnGhost}>Cancel</button>
          <button type="submit" className={btnPrimary}><ArrowRightLeft className="h-4 w-4" />Send request</button>
        </div>
      </form>
    </Modal>
  );
}