import { useState } from "react";
import heroImg from "./assets/hero.jpeg";

const ROLES = {
  student: {
    label: "Student",
    idLabel: "Student ID or email",
    idPlaceholder: "e.g. 2021-114-0457 or you@university.edu",
    regIdLabel: "Student ID",
    regIdPlaceholder: "e.g. 2021-114-0457",
    sub: "Log in to see your room and requests.",
    regSub: "Register with your student ID to request a room.",
  },
  manager: {
    label: "Hostel Manager",
    idLabel: "Staff ID or email",
    idPlaceholder: "e.g. HM-0032 or you@university.edu",
    regIdLabel: "Staff ID",
    regIdPlaceholder: "e.g. HM-0032",
    sub: "Log in to manage rooms and requests.",
    regSub: "Register with your staff ID to manage a hostel block.",
  },
};

function Field({ id, label, type = "text", value, onChange, error, placeholder, autoComplete, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-900">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`block w-full rounded-lg border bg-white/90 px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F2F3A] focus-visible:ring-offset-1 ${
            error ? "border-red-600" : "border-slate-300"
          } ${children ? "pr-16" : ""}`}
        />
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default function HostelAuthPage({
  systemName = "Moonmoon Muslim Girls Hostel",
  onLogin = (p) => console.log("login", p),
  onRegister = (p) => console.log("register", p),
}) {
  const [role, setRole] = useState("student");
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    fullName: "",
    identifier: "",
    email: "",
    hostelBlock: "",
    password: "",
    confirm: "",
  });

  const cfg = ROLES[role];
  const isLogin = mode === "login";
  const set = (key) => (val) => setValues((v) => ({ ...v, [key]: val }));

  const switchRole = (next) => {
    setRole(next);
    setErrors({});
  };
  const switchMode = () => {
    setMode(isLogin ? "register" : "login");
    setErrors({});
    setShowPassword(false);
  };

  const validate = () => {
    const e = {};
    if (!values.identifier.trim()) e.identifier = `Enter your ${isLogin ? cfg.idLabel.toLowerCase() : cfg.regIdLabel.toLowerCase()}.`;
    if (!values.password) e.password = "Enter your password.";
    if (!isLogin) {
      if (!values.fullName.trim()) e.fullName = "Enter your full name.";
      if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = "Enter a valid email address, like name@university.edu.";
      if (role === "manager" && !values.hostelBlock.trim()) e.hostelBlock = "Enter the hostel or block you manage.";
      if (values.password && values.password.length < 8) e.password = "Use at least 8 characters.";
      if (values.confirm !== values.password) e.confirm = "Passwords don't match.";
    }
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    setBusy(true);
    try {
      if (isLogin) {
        await onLogin({ role, identifier: values.identifier.trim(), password: values.password });
      } else {
        const { confirm, ...rest } = values;
        await onRegister({ role, ...rest });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center flex flex-col justify-between px-4 py-8 sm:px-8"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.14)), url(${heroImg})`
      }}
    >
      {/* Top Header & Branding */}
      <header className="text-center mx-auto max-w-3xl pt-2">
        <div className="flex justify-center mb-2">
          <svg className="w-12 h-12 text-[#1E3A8A]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 3.7l5 4.5V18H7v-6.8l5-4.5z"/>
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight text-[#1E3A8A]">
          {systemName}
        </h1>
        <div className="flex items-center justify-center gap-3 mt-1.5">
          <span className="h-[1px] w-12 bg-[#1E3A8A]/40"></span>
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] font-bold text-[#1E3A8A]">
            MANAGEMENT SYSTEM
          </p>
          <span className="h-[1px] w-12 bg-[#1E3A8A]/40"></span>
        </div>
        <p className="mt-1 text-xs sm:text-sm font-medium text-slate-700">
          Shibgonj, Lakhripara Area, Sylhet
        </p>
        <p className="mt-1 text-sm italic font-medium text-slate-600">
          Safe Stay &bull; Better Tomorrow
        </p>
      </header>

      {/* Center Form Card */}
      <main className="flex items-center justify-center my-auto py-6">
        <div className="w-full max-w-lg rounded-3xl bg-white/95 p-8 sm:p-10 shadow-2xl backdrop-blur-md border border-white/60">
          {/* Role switcher */}
          <div
            role="tablist"
            aria-label="Account type"
            className="mb-8 grid grid-cols-2 gap-1 rounded-xl bg-slate-200/80 p-1"
          >
            {Object.entries(ROLES).map(([key, r]) => {
              const active = role === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => switchRole(key)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors focus:outline-none ${
                    active ? "bg-[#1E3A8A] text-white shadow-md" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-slate-900">{isLogin ? "Log in" : "Create your account"}</h3>
          <p className="mt-1.5 text-sm font-medium text-slate-600">{isLogin ? cfg.sub : cfg.regSub}</p>

          <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
            {!isLogin && (
              <Field
                id="fullName"
                label="Full name"
                value={values.fullName}
                onChange={set("fullName")}
                error={errors.fullName}
                autoComplete="name"
              />
            )}

            <Field
              id="identifier"
              label={isLogin ? cfg.idLabel : cfg.regIdLabel}
              value={values.identifier}
              onChange={set("identifier")}
              error={errors.identifier}
              placeholder={isLogin ? cfg.idPlaceholder : cfg.regIdPlaceholder}
              autoComplete="username"
            />

            

            
            <Field
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={set("password")}
              error={errors.password}
              autoComplete={isLogin ? "current-password" : "new-password"}
            >
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-pressed={showPassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 rounded-r-lg px-3.5 text-sm font-semibold text-slate-700 hover:text-black focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </Field>

            {!isLogin && (
              <Field
                id="confirm"
                label="Confirm password"
                type={showPassword ? "text" : "password"}
                value={values.confirm}
                onChange={set("confirm")}
                error={errors.confirm}
                autoComplete="new-password"
              />
            )}

            {isLogin && (
              <div className="text-right">
                <a
                  href="#forgot"
                  className="text-sm font-semibold text-[#1E3A8A] underline underline-offset-2 hover:text-black"
                >
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-[#1E3A8A] px-4 py-3 font-semibold text-white shadow-md transition-all hover:bg-[#172554] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? (isLogin ? "Logging in…" : "Creating account…") : isLogin ? "Log in →" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm font-medium text-slate-700">
            {isLogin ? "New to the hostel system?" : "Already registered?"}{" "}
            <button
              type="button"
              onClick={switchMode}
              className="font-bold text-[#1E3A8A] underline underline-offset-2 hover:text-black"
            >
              {isLogin ? "Create an account" : "Log in"}
            </button>
          </p>
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="text-center text-xs text-slate-600 pb-2">
        &copy; {new Date().getFullYear()} {systemName}. All rights reserved.
      </footer>
    </div>
  );
}