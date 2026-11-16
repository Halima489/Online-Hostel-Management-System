import React from "react";
import { BedDouble, UtensilsCrossed, Wallet, Wrench, Megaphone, Users, Plus, Download, Coffee, Sun, Moon, CheckCircle2, CalendarDays, Receipt } from "lucide-react";
import { HOSTEL, STUDENT, ROOM_INFO, ROOMMATES, AMENITIES, ANNOUNCEMENTS, TRANSACTIONS, MESS_BILL } from "./mockData";

const glass = "rounded-2xl border border-slate-200 bg-white shadow-sm";
const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-xl bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#172554]";
const btnGhost = "inline-flex items-center justify-center gap-2 rounded-xl border border-[#1E3A8A]/30 bg-white/70 px-4 py-2.5 text-sm font-semibold text-[#1E3A8A] transition-colors hover:bg-white";

const fmtTaka = (n) => `৳${n.toLocaleString("en-US")}`;

const dateParts = (iso) => {
  const d = new Date(`${iso}T00:00:00`);
  return {
    day: d.getDate(),
    mon: d.toLocaleString("en-US", { month: "short" }),
    full: d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
  };
};

const TONE = {
  green: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  amber: "bg-amber-100 text-amber-900 ring-amber-200",
  blue: "bg-blue-100 text-blue-900 ring-blue-200",
  rose: "bg-rose-100 text-rose-800 ring-rose-200",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
};

const STATUS_TONE = {
  Paid: "green", Pending: "amber", Active: "green", Served: "slate", Skipped: "slate",
  Open: "rose", "In Progress": "blue", Resolved: "green", "Under review": "amber",
};

const PRIORITY = {
  High: { dot: "bg-rose-500", text: "text-rose-700" },
  Medium: { dot: "bg-amber-500", text: "text-amber-800" },
  Low: { dot: "bg-sky-500", text: "text-sky-800" },
};

function Badge({ status, children }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${TONE[STATUS_TONE[status] || "slate"]}`}>
      {children || status}
    </span>
  );
}

function Card({ className = "", children }) {
  return <section className={`${glass} p-5 sm:p-6 ${className}`}>{children}</section>;
}

function CardTitle({ icon: Icon, title, action }) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
        {Icon && <Icon className="h-5 w-5 text-[#1E3A8A]" aria-hidden="true" />}
        {title}
      </h2>
      {action}
    </div>
  );
}

function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-slate-600">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function Switch({ checked, onChange, label, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${checked ? "bg-[#1E3A8A]" : "bg-slate-300"}`}
    >
      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

function downloadReceipt(t) {
  const lines = [
    HOSTEL.name, HOSTEL.address, "", "PAYMENT RECEIPT", `Receipt no: ${t.id}`, `Date: ${dateParts(t.date).full}`,
    `Student: ${STUDENT.name} (${STUDENT.id})`, `Room: ${STUDENT.room}`, `Description: ${t.title}`,
    `Method: ${t.method}`, `Amount: ${fmtTaka(t.amount)}`, `Status: ${t.status}`, "", HOSTEL.tagline,
  ];
  const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `${t.id}.txt`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function AnnouncementItem({ a }) {
  const { day, mon } = dateParts(a.date);
  const p = PRIORITY[a.priority];
  return (
    <li className="flex gap-4 rounded-xl border border-white/70 bg-white/50 p-4">
      <div className="grid h-14 w-14 shrink-0 place-content-center rounded-xl bg-[#1E3A8A] text-center leading-none text-white">
        <span className="text-xl font-bold">{day}</span>
        <span className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-blue-100">{mon}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="font-semibold text-slate-900">{a.title}</h3>
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${p.text}`}>
            <span className={`h-2 w-2 rounded-full ${p.dot}`} aria-hidden="true" />
            {a.priority} priority
          </span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-slate-700">{a.body}</p>
      </div>
    </li>
  );
}

const MEAL_ICON = { Breakfast: Coffee, Lunch: Sun, Dinner: Moon };

function MealRow({ m, onToggle }) {
  const Icon = MEAL_ICON[m.type];
  const status = m.served ? "Served" : m.skipped ? "Skipped" : "Active";
  return (
    <li className="flex items-center gap-4 rounded-xl border border-white/70 bg-white/50 p-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold text-slate-900">{m.type}</h3>
          <Badge status={status} />
        </div>
        <p className="text-sm text-slate-600">{m.time}</p>
        <p className="mt-0.5 text-sm text-slate-700">{m.menu}</p>
      </div>
      {onToggle && (
        <div className="flex flex-col items-center gap-1">
          <Switch checked={m.skipped} disabled={m.served} onChange={() => onToggle(m.id)} label={`Skip ${m.day.toLowerCase()}'s ${m.type.toLowerCase()}`} />
          <span className="text-xs font-medium text-slate-600">Skip</span>
        </div>
      )}
    </li>
  );
}

export function OverviewTab({ greeting, today, meals, complaints, dueItems, go }) {
  const dinner = meals.find((m) => m.id === "t-d");
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;
  const open = complaints.filter((c) => c.status === "Open").length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;
  const dueTotal = dueItems.reduce((s, d) => s + d.amount, 0);
  const next = dueItems[0] ? dateParts(dueItems[0].due) : null;

  const stats = [
    { tab: "room", icon: BedDouble, label: "Room Status", value: `Room ${STUDENT.roomNo}, Bed ${STUDENT.bed}`, sub: "3rd floor · 4-seater", badge: "Active" },
    { tab: "mess", icon: UtensilsCrossed, label: "Mess Status", value: "Today's Dinner", sub: "8:00 – 9:30 PM", badge: dinner.skipped ? "Skipped" : "Active" },
    { tab: "payments", icon: Wallet, label: "Pending Payment", value: fmtTaka(dueTotal), sub: next ? `Due ${next.mon} ${String(next.day).padStart(2, "0")}` : "Nothing due", badge: dueTotal ? "Pending" : "Paid" },
    { tab: "notices", icon: Wrench, label: "Complaints", value: `${inProgress} In Progress`, sub: `${open} open · ${resolved} resolved` },
  ];

  return (
    <>
      <PageHeader title={`${greeting}, ${STUDENT.name.split(" ")[0]}`} subtitle={today} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ icon: Icon, ...s }) => (
          <button
            key={s.label}
            type="button"
            onClick={() => go(s.tab)}
            className={`${glass} p-5 text-left transition hover:-translate-y-0.5 hover:bg-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]`}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]"><Icon className="h-5 w-5" aria-hidden="true" /></span>
              {s.badge && <Badge status={s.badge} />}
            </div>
            <p className="mt-4 text-sm text-slate-600">{s.label}</p>
            <p className="mt-0.5 text-xl font-semibold text-slate-900">{s.value}</p>
            <p className="mt-1 text-sm text-slate-600">{s.sub}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardTitle
            icon={Megaphone}
            title="Recent announcements"
            action={<button type="button" onClick={() => go("notices")} className="text-sm font-semibold text-[#1E3A8A] underline underline-offset-2 hover:text-[#172554]">View all</button>}
          />
          <ul className="space-y-3">{ANNOUNCEMENTS.slice(0, 3).map((a) => <AnnouncementItem key={a.id} a={a} />)}</ul>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardTitle icon={UtensilsCrossed} title="Today's meals" />
            <ul className="space-y-2">
              {meals.filter((m) => m.day === "Today").map((m) => {
                const status = m.served ? "Served" : m.skipped ? "Skipped" : "Active";
                return (
                  <li key={m.id} className="flex items-center justify-between rounded-xl bg-white/50 px-3 py-2.5">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{m.type}</p>
                      <p className="text-xs text-slate-600">{m.time}</p>
                    </div>
                    <Badge status={status} />
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}

export function RoomTab({ roomRequest, openModal }) {
  return (
    <>
      <PageHeader
        title="Room & Seat Info"
        subtitle="Your bed allocation, roommates and hostel facilities."
        action={
          <button type="button" onClick={() => openModal("roomChange")} disabled={!!roomRequest} className={btnPrimary}>
            Request room change
          </button>
        }
      />

      {roomRequest && (
        <div role="status" className="mb-6 flex flex-wrap items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/90 p-4 text-amber-950">
          <div className="min-w-0 flex-1">
            <p className="font-semibold">Room change request submitted <Badge status="Under review" /></p>
            <p className="mt-1 text-sm">Reason: {roomRequest.reason} · Preference: {roomRequest.preference}</p>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardTitle icon={BedDouble} title="Your allocation" action={<Badge status="Active" />} />
          <dl className="divide-y divide-slate-200/80">
            {ROOM_INFO.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5 text-sm">
                <dt className="text-slate-600">{k}</dt>
                <dd className="font-semibold text-slate-900">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card className="lg:col-span-2">
          <CardTitle icon={Users} title="Bed allocation & roommates" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {ROOMMATES.map((r) => (
              <li key={r.bed} className={`flex items-center gap-4 rounded-xl border p-4 ${r.you ? "border-[#1E3A8A] bg-[#1E3A8A]/5" : "border-white/70 bg-white/50"}`}>
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-lg font-bold ${r.you ? "bg-[#1E3A8A] text-white" : "bg-slate-200 text-slate-700"}`}>{r.bed}</span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-900">{r.name}{r.you && <span className="ml-2 text-xs font-semibold text-[#1E3A8A]">(You)</span>}</p>
                  <p className="truncate text-sm text-slate-600">{r.dept}</p>
                  <p className="text-xs text-slate-600">Batch {r.batch}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <CardTitle title="Hostel amenities" />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {AMENITIES.map(({ icon: Icon, label, note }) => (
            <li key={label} className="flex items-center gap-3 rounded-xl bg-white/50 p-3.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#1E3A8A]/10 text-[#1E3A8A]"><Icon className="h-5 w-5" aria-hidden="true" /></span>
              <div>
                <p className="text-sm font-semibold text-slate-900">{label}</p>
                <p className="text-xs text-slate-600">{note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

export function MessTab({ meals, toggleMeal }) {
  const total = MESS_BILL.taken * MESS_BILL.rate;
  const pct = Math.round((MESS_BILL.taken / (MESS_BILL.taken + MESS_BILL.skipped)) * 100);

  return (
    <>
      <PageHeader title="Mess & Meal Planner" subtitle="See what is being served and skip meals you will not eat." />
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          {["Today", "Tomorrow"].map((day) => (
            <Card key={day}>
              <CardTitle icon={UtensilsCrossed} title={`${day}'s meals`} />
              <ul className="space-y-3">
                {meals.filter((m) => m.day === day).map((m) => <MealRow key={m.id} m={m} onToggle={toggleMeal} />)}
              </ul>
            </Card>
          ))}
        </div>

        <Card className="h-fit">
          <CardTitle title="Monthly mess bill" action={<Badge status="Pending" />} />
          <p className="text-sm text-slate-600">{MESS_BILL.month}</p>
          <p className="mt-1 text-4xl font-semibold tracking-tight text-[#1E3A8A]">{fmtTaka(total)}</p>
          <p className="mt-1 text-sm text-slate-600">Due 05 Nov 2026</p>
          <div className="mt-5">
            <div className="flex h-3 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full bg-[#1E3A8A]" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-600"><span>Taken {pct}%</span><span>Skipped {100 - pct}%</span></div>
          </div>
        </Card>
      </div>
    </>
  );
}

export function PaymentsTab({ dueItems, onPay }) {
  const dueTotal = dueItems.reduce((s, d) => s + d.amount, 0);
  const paid = TRANSACTIONS.filter((t) => t.status === "Paid").reduce((s, t) => s + t.amount, 0);
  const next = dueItems[0] ? dateParts(dueItems[0].due).full : "None";

  const summary = [
    { label: "Outstanding", value: fmtTaka(dueTotal), icon: Wallet },
    { label: "Paid (last 3 months)", value: fmtTaka(paid), icon: CheckCircle2 },
    { label: "Next due date", value: next, icon: CalendarDays },
  ];

  return (
    <>
      <PageHeader title="Payments & Receipts" subtitle="Dues, payment history and downloadable receipts." />

      <div className="grid gap-4 sm:grid-cols-3">
        {summary.map(({ icon: Icon, label, value }) => (
          <div key={label} className={`${glass} flex items-center gap-4 p-5`}>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A]"><Icon className="h-5 w-5" aria-hidden="true" /></span>
            <div>
              <p className="text-sm text-slate-600">{label}</p>
              <p className="text-xl font-semibold text-slate-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <Card className="mt-6">
        <CardTitle icon={Wallet} title="Dues to pay" />
        {dueItems.length === 0 ? (
          <p className="text-sm text-slate-700">You have no pending dues.</p>
        ) : (
          <ul className="space-y-3">
            {dueItems.map((d) => (
              <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/70 bg-white/50 p-4">
                <div>
                  <p className="font-semibold text-slate-900">{d.title}</p>
                  <p className="text-sm text-slate-600">Due {dateParts(d.due).full}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge status="Pending" />
                  <span className="text-lg font-semibold text-slate-900">{fmtTaka(d.amount)}</span>
                  {onPay && <button type="button" onClick={() => onPay(d)} className={btnPrimary}>Pay now</button>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="mt-6">
        <CardTitle icon={Receipt} title="Transaction history" />

        <ul className="space-y-3 md:hidden">
          {TRANSACTIONS.map((t) => (
            <li key={t.id} className="rounded-xl border border-white/70 bg-white/50 p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold text-slate-900">{t.title}</p>
                <Badge status={t.status} />
              </div>
              <p className="mt-1 text-sm text-slate-600">{dateParts(t.date).full} · {t.method}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-900">{fmtTaka(t.amount)}</span>
                {t.status === "Paid" && (
                  <button type="button" onClick={() => downloadReceipt(t)} className={btnGhost}><Download className="h-4 w-4" aria-hidden="true" />Receipt</button>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                {["Description", "Date", "Method", "Amount", "Status", ""].map((h, i) => (
                  <th key={i} scope="col" className="px-3 py-3 font-semibold">{h || <span className="sr-only">Receipt</span>}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80">
              {TRANSACTIONS.map((t) => (
                <tr key={t.id}>
                  <td className="px-3 py-3.5">
                    <p className="font-semibold text-slate-900">{t.title}</p>
                    <p className="text-xs text-slate-600">{t.status === "Paid" ? t.id : "Awaiting payment"}</p>
                  </td>
                  <td className="px-3 py-3.5 text-slate-700">{dateParts(t.date).full}</td>
                  <td className="px-3 py-3.5 text-slate-700">{t.method}</td>
                  <td className="px-3 py-3.5 font-semibold text-slate-900">{fmtTaka(t.amount)}</td>
                  <td className="px-3 py-3.5"><Badge status={t.status} /></td>
                  <td className="px-3 py-3.5 text-right">
                    {t.status === "Paid" && (
                      <button type="button" onClick={() => downloadReceipt(t)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-semibold text-[#1E3A8A] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E3A8A]">
                        <Download className="h-4 w-4" aria-hidden="true" />Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

export function NoticesTab({ complaints, openModal }) {
  return (
    <>
      <PageHeader
        title="Notices & Complaints"
        subtitle="Hostel announcements and your maintenance requests."
        action={<button type="button" onClick={() => openModal("complaint")} className={btnPrimary}><Plus className="h-4 w-4" aria-hidden="true" />Raise a complaint</button>}
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardTitle icon={Megaphone} title="Announcements" />
          <ul className="space-y-3">{ANNOUNCEMENTS.map((a) => <AnnouncementItem key={a.id} a={a} />)}</ul>
        </Card>
        <Card>
          <CardTitle icon={Wrench} title="My complaints & requests" />
          {complaints.length === 0 ? <p className="text-sm text-slate-700">You have not raised any complaints yet.</p> : (
            <ul className="space-y-3">
              {complaints.map((c) => (
                <li key={c.id} className="rounded-xl border border-white/70 bg-white/50 p-4">
                  <div className="flex justify-between"><p className="font-semibold text-slate-900">{c.subject}</p><Badge status={c.status} /></div>
                  <p className="mt-2 text-sm text-slate-700">{c.description}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}