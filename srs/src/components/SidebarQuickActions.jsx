import React from "react";
import { AlertCircle, Home, Receipt } from "lucide-react";

export default function SidebarQuickActions({ activeAction, setActiveAction, setModal, setDrawerOpen, go, tab }) {
  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Quick actions</h3>
      <div className="space-y-1.5">
        <button
          type="button"
          onClick={() => {
            setActiveAction("complaint");
            setModal("complaint");
            setDrawerOpen(false);
          }}
          className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] ${
            activeAction === "complaint"
              ? "bg-[#1E3A8A] text-white shadow-md"
              : "text-slate-700 hover:bg-white/80"
          }`}
        >
          <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
          Raise a complaint
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveAction("roomChange");
            setModal("roomChange");
            setDrawerOpen(false);
          }}
          className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] ${
            activeAction === "roomChange"
              ? "bg-[#1E3A8A] text-white shadow-md"
              : "text-slate-700 hover:bg-white/80"
          }`}
        >
          <Home className="h-5 w-5 shrink-0" aria-hidden="true" />
          Request room change
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveAction("payments");
            go("payments");
            setDrawerOpen(false);
          }}
          className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] ${
            activeAction === "payments" || tab === "payments"
              ? "bg-[#1E3A8A] text-white shadow-md"
              : "text-slate-700 hover:bg-white/80"
          }`}
        >
          <Receipt className="h-5 w-5 shrink-0" aria-hidden="true" />
          View receipts
        </button>
      </div>
    </div>
  );
}