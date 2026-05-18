import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  fuelingTargets,
  habits,
  metrics,
  mileageProgression,
  phases,
  stairLevels,
  strengthRoutines,
  warningSigns,
  weeklySchedule,
} from "./constants/trainingPlan";

const toneClasses = {
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  sky: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

const phaseStyles = {
  green: {
    chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200",
    border: "border-emerald-400",
    accent: "bg-emerald-500",
  },
  yellow: {
    chip: "bg-yellow-100 text-yellow-800 dark:bg-yellow-400/15 dark:text-yellow-200",
    border: "border-yellow-400",
    accent: "bg-yellow-500",
  },
  orange: {
    chip: "bg-orange-100 text-orange-800 dark:bg-orange-400/15 dark:text-orange-200",
    border: "border-orange-400",
    accent: "bg-orange-500",
  },
  blue: {
    chip: "bg-blue-100 text-blue-800 dark:bg-blue-400/15 dark:text-blue-200",
    border: "border-blue-400",
    accent: "bg-blue-500",
  },
};

const STORAGE_KEY = "ultratrail-dashboard-habits";
const THEME_KEY = "ultratrail-dashboard-theme";

function useStoredState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/85 text-slate-800 shadow-soft transition hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-900/85 dark:text-slate-100"
      aria-label="Toggle color mode"
      title="Toggle color mode"
    >
      {isDark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}

function Hero({ isDark, onThemeToggle }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(16,185,129,0.28),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(20,83,45,0.78),rgba(30,41,59,0.95))]" />
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100">
            City Runner Edition
          </p>
          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
        </div>

        <div className="grid gap-8 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              50KM Ultra Trail Training Roadmap
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-medium text-emerald-50 sm:text-xl">
              May &rarr; October | City Runner Edition
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {metrics.map(({ label, value, unit, icon: Icon, tone }) => (
              <div
                key={label}
                className="rounded-lg border border-white/12 bg-white/10 p-4 backdrop-blur"
              >
                <div
                  className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${toneClasses[tone]}`}
                >
                  <Icon size={20} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">
                  {label}
                </p>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-2xl font-black">{value}</span>
                  <span className="text-sm font-semibold text-emerald-100">{unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseCard({ phase, expanded, onToggle }) {
  const style = phaseStyles[phase.color];
  return (
    <article
      className={`rounded-lg border-l-4 ${style.border} bg-white p-5 shadow-soft transition dark:bg-slate-900`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <span>
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${style.chip}`}>
            {phase.phase}
          </span>
          <h3 className="mt-3 text-lg font-black text-slate-950 dark:text-white">
            {phase.title}
          </h3>
          <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
            {phase.date}
          </p>
        </span>
        <span className="mt-1 rounded-full bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>

      {expanded && (
        <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Weekly volume: {phase.volume}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {phase.focus.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${style.accent}`} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

function MacroPlan() {
  const [activePhase, setActivePhase] = useState("all");
  const [expanded, setExpanded] = useState(() =>
    phases.reduce((state, phase) => ({ ...state, [phase.id]: true }), {}),
  );
  const visiblePhases = useMemo(
    () => (activePhase === "all" ? phases : phases.filter((phase) => phase.id === activePhase)),
    [activePhase],
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Macro Plan"
        title="Four phases from base to race readiness"
        action={
          <select
            value={activePhase}
            onChange={(event) => setActivePhase(event.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 shadow-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            aria-label="Filter phases"
          >
            <option value="all">All phases</option>
            {phases.map((phase) => (
              <option key={phase.id} value={phase.id}>
                {phase.title}
              </option>
            ))}
          </select>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {visiblePhases.map((phase) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            expanded={expanded[phase.id]}
            onToggle={() =>
              setExpanded((current) => ({ ...current, [phase.id]: !current[phase.id] }))
            }
          />
        ))}
      </div>
    </section>
  );
}

function MileageChart() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white p-5 shadow-soft dark:bg-slate-900">
        <SectionHeader eyebrow="Volume" title="Weekly mileage progression" />
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mileageProgression} margin={{ left: -16, right: 8, top: 10 }}>
              <defs>
                <linearGradient id="kmFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.55} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 11 }} unit="km" domain={[25, 80]} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #cbd5e1" }}
                formatter={(value) => [`${value} km`, "Weekly volume"]}
              />
              <Area
                type="monotone"
                dataKey="km"
                stroke="#059669"
                strokeWidth={3}
                fill="url(#kmFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

function WeeklyStructure() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Weekly Structure" title="Repeatable city training week" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
        {weeklySchedule.map(({ day, title, load, icon: Icon }) => (
          <article key={day} className="rounded-lg bg-white p-4 shadow-soft dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-slate-950 dark:text-white">{day}</span>
              <Icon size={18} className="text-emerald-600 dark:text-emerald-300" />
            </div>
            <h3 className="mt-5 min-h-12 text-sm font-bold text-slate-900 dark:text-slate-100">
              {title}
            </h3>
            <p className="mt-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {load}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StrengthSection() {
  const routines = Object.values(strengthRoutines);
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Strength" title="Two-session injury prevention system" />
      <div className="grid gap-4 lg:grid-cols-2">
        {routines.map((routine) => (
          <article key={routine.title} className="rounded-lg bg-white p-5 shadow-soft dark:bg-slate-900">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              {routine.title}
            </p>
            <h3 className="mt-1 text-xl font-black text-slate-950 dark:text-white">
              {routine.subtitle}
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {routine.items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function StairSystem() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Stairs" title="21-floor apartment climb progression" />
      <div className="grid gap-4 lg:grid-cols-3">
        {stairLevels.map((level) => (
          <article key={level.level} className="rounded-lg bg-white p-5 shadow-soft dark:bg-slate-900">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-300">
              {level.level} - {level.date}
            </p>
            <h3 className="mt-2 text-xl font-black text-slate-950 dark:text-white">{level.title}</h3>
            <p className="mt-4 text-lg font-black text-slate-800 dark:text-slate-100">{level.reps}</p>
            <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">{level.detail}</p>
          </article>
        ))}
      </div>
      <div className="mt-4 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-200">
        <AlertTriangle className="mt-0.5 shrink-0" size={20} />
        <p className="text-sm font-bold">
          Never run down stairs. Always descend slowly and controlled to protect IT band.
        </p>
      </div>
    </section>
  );
}

function FuelingAndWarnings() {
  return (
    <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
      <article className="rounded-lg bg-white p-5 shadow-soft dark:bg-slate-900">
        <SectionHeader eyebrow="Fueling" title="Ultra fueling targets" />
        <ul className="space-y-3">
          {fuelingTargets.map((target) => (
            <li key={target} className="flex gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <Check size={18} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-300" />
              {target}
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-lg bg-white p-5 shadow-soft dark:bg-slate-900">
        <SectionHeader eyebrow="Warning Signs" title="Reduce load before it becomes an injury" />
        <div className="grid gap-3 sm:grid-cols-2">
          {warningSigns.map((sign) => (
            <div
              key={sign.label}
              className={`rounded-lg border p-4 text-sm font-bold ${
                sign.severity === "red"
                  ? "border-red-200 bg-red-50 text-red-800 dark:border-red-500/40 dark:bg-red-950/35 dark:text-red-200"
                  : "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-500/40 dark:bg-yellow-950/30 dark:text-yellow-200"
              }`}
            >
              {sign.label}
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function HabitChecklist() {
  const [checked, setChecked] = useStoredState(STORAGE_KEY, {});

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-slate-950 p-5 text-white shadow-soft dark:bg-slate-900">
        <SectionHeader eyebrow="Weekly Habits" title="Checklist for the current training week" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {habits.map(({ id, label, icon: Icon }) => {
            const isChecked = Boolean(checked[id]);
            return (
              <button
                key={id}
                type="button"
                onClick={() => setChecked((current) => ({ ...current, [id]: !current[id] }))}
                className={`flex min-h-16 items-center gap-3 rounded-lg border p-4 text-left transition ${
                  isChecked
                    ? "border-emerald-400 bg-emerald-500 text-white"
                    : "border-white/10 bg-white/8 text-slate-100 hover:border-emerald-300"
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
                  {isChecked ? <Check size={18} /> : <Icon size={18} />}
                </span>
                <span className="font-bold">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem(THEME_KEY) === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <main className="min-h-screen bg-[#f6f7f2] text-slate-900 transition dark:bg-slate-950 dark:text-slate-100">
      <Hero isDark={isDark} onThemeToggle={() => setIsDark((current) => !current)} />
      <MacroPlan />
      <MileageChart />
      <WeeklyStructure />
      <StrengthSection />
      <StairSystem />
      <FuelingAndWarnings />
      <HabitChecklist />
    </main>
  );
}
