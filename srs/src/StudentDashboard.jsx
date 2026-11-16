import { useState, useEffect, useRef } from "react";
import {
  Moon, MoonStar, LayoutDashboard, BedDouble, UtensilsCrossed, Wallet, Megaphone, Menu, X,
  ChevronDown, LogOut, MapPin, Wifi, ShieldCheck, Droplets, Zap, Shirt, BookOpen, CheckCircle2,
  Download, Plus, ArrowRightLeft, Wrench, Receipt, Coffee, Sun, Users, Send, CalendarDays,
  AlertCircle, Home,
} from "lucide-react";
import { HOSTEL, STUDENT, NAV, INITIAL_MEALS, INITIAL_COMPLAINTS, TRANSACTIONS } from "./components/mockData";
import SidebarQuickActions from "./components/SidebarQuickActions";
import { ComplaintModal, RoomChangeModal } from "./components/Modals";
import { OverviewTab, RoomTab, MessTab, PaymentsTab, NoticesTab } from "./components/Tabs";

export default function StudentDashboard({
  onLogout = () => {},
  onSubmitComplaint = () => {},
  onSubmitRoomChange = () => {},
  onPayNow = () => {},
}) {
  const [tab, setTab] = useState("overview");
  const [activeAction, setActiveAction] = useState(null); 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [meals, setMeals] = useState(INITIAL_MEALS);
  
  // ট্রানজেকশন স্টেট যা পেমেন্টের পর ডাইনামিকালি আপডেট হবে
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("student_transactions");
    return saved ? JSON.parse(saved) : TRANSACTIONS;
  });

  useEffect(() => {
    localStorage.setItem("student_transactions", JSON.stringify(transactions));
  }, [transactions]);

  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem("student_complaints");
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  useEffect(() => {
    localStorage.setItem("student_complaints", JSON.stringify(complaints));
  }, [complaints]);

  const [roomRequest, setRoomRequest] = useState(() => {
    const saved = localStorage.getItem("student_room_request");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (roomRequest) {
      localStorage.setItem("student_room_request", JSON.stringify(roomRequest));
    }
  }, [roomRequest]);

  const profileRef = useRef(null);

  // ডাইনামিক ট্রানজেকশন থেকে পেন্ডিং ডিউ ফিল্টার করা
  const dueItems = transactions.filter((t) => t.status === "Pending");
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const todayISO = new Date().toLocaleDateString("en-CA");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (!profileOpen) return;
    const onDown = (e) => profileRef.current && !profileRef.current.contains(e.target) && setProfileOpen(false);
    const onKey = (e) => e.key === "Escape" && setProfileOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [profileOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e) => e.key === "Escape" && setDrawerOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const go = (id) => {
    setTab(id);
    setActiveAction(null); 
    setDrawerOpen(false);
    setProfileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMeal = (id) =>
    setMeals((ms) => ms.map((m) => (m.id === id && !m.served ? { ...m, skipped: !m.skipped } : m)));

  const submitComplaint = (f) => {
    const entry = { id: `CMP-${1050 + complaints.length}`, date: todayISO, status: "Open", ...f, subject: f.subject.trim(), description: f.description.trim(), location: f.location.trim() };
    setComplaints((c) => [entry, ...c]);
    onSubmitComplaint(entry);
    setModal(null);
    setActiveAction(null);
    setToast("Complaint submitted. The hostel office will review it.");
  };

  const submitRoomChange = (f) => {
    const req = { ...f, date: todayISO };
    setRoomRequest(req);
    onSubmitRoomChange(req);
    setModal(null);
    setActiveAction(null);
    setTab("room");
    setToast("Room change request sent for review.");
  };

  // পে নাও বাটনে ক্লিক করলে স্ট্যাটাস পেইড হয়ে যাবে
  const pay = (item) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === item.id ? { ...t, status: "Paid", method: "Online / bKash" } : t))
    );
    onPayNow(item);
    setToast(`Successfully paid for ${item.title}!`);
  };

  const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#172554] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]";
  const glass = "rounded-2xl border border-slate-200 bg-white shadow-sm";

  return (
    <div className="relative isolate min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-100 text-slate-900">
      {/* glass backdrop blobs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-blue-300/40 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-indigo-300/40 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-sky-200/60 blur-3xl" />
      </div>

      {/* sticky header */}
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/70 backdrop-blur-xl">
        <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            className="rounded-lg p-2 text-[#1E3A8A] hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#1E3A8A] text-white shadow-md"><Moon className="h-5 w-5" aria-hidden="true" /></span>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-semibold text-[#1E3A8A] sm:text-base">{HOSTEL.name}</p>
              <p className="hidden items-center gap-1 truncate text-xs text-slate-600 sm:flex"><MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />{HOSTEL.address}</p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                className="flex items-center gap-2.5 rounded-xl p-1.5 pr-2.5 hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1E3A8A] text-sm font-semibold text-white">{STUDENT.initials}</span>
                <span className="hidden text-left leading-tight md:block">
                  <span className="block text-sm font-semibold text-slate-900">{STUDENT.name}</span>
                  <span className="block text-xs text-slate-600">ID {STUDENT.id} · Room {STUDENT.room}</span>
                </span>
                <ChevronDown className={`h-4 w-4 text-slate-600 transition-transform ${profileOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>

              {profileOpen && (
                <div role="menu" className="absolute right-0 mt-2 w-72 animate-[tabIn_0.18s_ease-out] rounded-2xl border border-white/70 bg-white/95 p-2 shadow-xl backdrop-blur-xl motion-reduce:animate-none">
                  <div className="px-3 py-3">
                    <p className="font-semibold text-slate-900">{STUDENT.name}</p>
                    <p className="text-sm text-slate-600">Student ID: {STUDENT.id}</p>
                    <p className="text-sm text-slate-600">Room: {STUDENT.room}</p>
                  </div>
                  <div className="border-t border-slate-200 pt-1">
                    <button type="button" role="menuitem" onClick={() => go("room")} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]">
                      <BedDouble className="h-4 w-4" aria-hidden="true" />My room & seat
                    </button>
                    <button type="button" role="menuitem" onClick={onLogout} className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]">
                      <LogOut className="h-4 w-4" aria-hidden="true" />Log out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button type="button" onClick={onLogout} className={`${btnPrimary} !px-3 sm:!px-4`} aria-label="Log out">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div onClick={() => setDrawerOpen(false)} aria-hidden="true" className="absolute inset-0 animate-[fadeIn_0.2s_ease-out] bg-slate-900/40 backdrop-blur-sm motion-reduce:animate-none" />
          <aside role="dialog" aria-modal="true" aria-label="Navigation menu" className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] animate-[drawerIn_0.25s_ease-out] flex-col overflow-y-auto border-r border-white/70 bg-white/90 p-4 shadow-2xl backdrop-blur-xl motion-reduce:animate-none">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#1E3A8A] text-white"><Moon className="h-5 w-5" aria-hidden="true" /></span>
                <span className="text-sm font-semibold text-[#1E3A8A]">Student Portal</span>
              </div>
              <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close navigation menu" className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className={`${glass} p-3`}>
              <nav aria-label="Dashboard sections" className="space-y-1.5">
                {NAV.map(({ id, label, icon: Icon }) => {
                  const active = tab === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => go(id)}
                      aria-current={active ? "page" : undefined}
                      className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] ${active ? "bg-[#1E3A8A] text-white shadow-md" : "text-slate-700 hover:bg-white/80"}`}
                    >
                      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                      {label}
                    </button>
                  );
                })}
              </nav>
            </div>
            <SidebarQuickActions
              activeAction={activeAction}
              setActiveAction={setActiveAction}
              setModal={setModal}
              setDrawerOpen={setDrawerOpen}
              go={go}
              tab={tab}
            />
            <div className="mt-4 rounded-2xl bg-[#1E3A8A] p-4 text-white">
              <MoonStar className="h-6 w-6 text-blue-200" aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold">{HOSTEL.tagline}</p>
              <p className="mt-1 text-xs text-blue-100">{HOSTEL.address}</p>
            </div>
          </aside>
        </div>
      )}

      <div className="mx-auto flex max-w-[1500px]">
        {/* desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4">
            <div className={`${glass} p-3`}>
              <nav aria-label="Dashboard sections" className="space-y-1.5">
                {NAV.map(({ id, label, icon: Icon }) => {
                  const active = tab === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => go(id)}
                      aria-current={active ? "page" : undefined}
                      className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] ${active ? "bg-[#1E3A8A] text-white shadow-md" : "text-slate-700 hover:bg-white/80"}`}
                    >
                      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                      {label}
                    </button>
                  );
                })}
              </nav>
            </div>
            <SidebarQuickActions
              activeAction={activeAction}
              setActiveAction={setActiveAction}
              setModal={setModal}
              setDrawerOpen={setDrawerOpen}
              go={go}
              tab={tab}
            />
            <div className="mt-4 rounded-2xl bg-[#1E3A8A] p-4 text-white">
              <MoonStar className="h-6 w-6 text-blue-200" aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold">{HOSTEL.tagline}</p>
              <p className="mt-1 text-xs text-blue-100">{HOSTEL.address}</p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div key={tab} className="animate-[tabIn_0.3s_ease-out] motion-reduce:animate-none">
            {tab === "overview" && <OverviewTab greeting={greeting} today={today} meals={meals} complaints={complaints} dueItems={dueItems} go={go} openModal={setModal} />}
            {tab === "room" && <RoomTab roomRequest={roomRequest} openModal={setModal} />}
            {tab === "mess" && <MessTab meals={meals} toggleMeal={toggleMeal} />}
            {tab === "payments" && <PaymentsTab dueItems={dueItems} onPay={pay} />}
            {tab === "notices" && <NoticesTab complaints={complaints} openModal={setModal} />}
          </div>

          <footer className="mt-10 text-center text-xs text-slate-600">
            {HOSTEL.name} · {HOSTEL.tagline}
          </footer>
        </main>
      </div>

      {modal === "complaint" && <ComplaintModal onSubmit={submitComplaint} onClose={() => { setModal(null); setActiveAction(null); }} />}
      {modal === "roomChange" && <RoomChangeModal onSubmit={submitRoomChange} onClose={() => { setModal(null); setActiveAction(null); }} />}

      {toast && (
        <div role="status" aria-live="polite" className="fixed bottom-4 left-1/2 z-[70] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 animate-[tabIn_0.25s_ease-out] items-center gap-3 rounded-xl bg-[#1E3A8A] px-4 py-3 text-sm font-medium text-white shadow-xl motion-reduce:animate-none">
          <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
          {toast}
        </div>
      )}
    </div>
  );
}