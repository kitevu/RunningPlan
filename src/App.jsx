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
  fuelTypes,
  fuelingProgression,
  habits,
  metrics,
  mileageProgression,
  phases,
  races,
  raceStrategies,
  season,
  stairLevels,
  strengthRoutines,
  trainingModes,
  warningGroups,
  weeklySchedule,
} from "./constants/trainingPlan";

const toneClasses = {
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  sky: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300",
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

const STORAGE_KEY = "ultratrail-2026-habits";
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

function daysUntil(dateString) {
  const start = new Date(`${season.currentDate}T00:00:00+07:00`);
  const end = new Date(`${dateString}T00:00:00+07:00`);
  return Math.max(0, Math.ceil((end - start) / 86400000));
}

function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">{title}</h2>
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

function HeroSection({ isDark, onThemeToggle }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.24),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(168,85,247,0.24),transparent_24%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(17,94,89,0.74),rgba(49,46,129,0.92))]" />
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100">
            City Runner Edition
          </p>
          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
        </div>

        <div className="grid gap-8 py-12 lg:grid-cols-[1fr_1.05fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-200">
              May 18, 2026 start point
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              {season.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-medium text-emerald-50 sm:text-xl">
              {season.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
            {metrics.map(({ label, value, unit, icon: Icon, tone }) => (
              <article
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
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ModeToggle({ activeMode, onChange }) {
  const active = trainingModes.find((mode) => mode.id === activeMode);
  return (
    <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white p-4 shadow-soft dark:bg-slate-900">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {trainingModes.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => onChange(mode.id)}
              className={`min-h-12 rounded-lg border px-4 py-3 text-left text-sm font-black transition ${
                activeMode === mode.id
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
          {active?.summary}
        </p>
      </div>
    </section>
  );
}

function RaceCalendar() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Race Calendar" title="Qualifier first, main race second" />
      <div className="grid gap-4 lg:grid-cols-2">
        {races.map((race) => (
          <article
            key={race.id}
            className="rounded-lg border border-purple-100 bg-white p-5 shadow-soft dark:border-purple-500/20 dark:bg-slate-900"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-purple-700 dark:text-purple-300">
                  {race.displayDate}
                </p>
                <h3 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
                  {race.title} {race.distance}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800 dark:bg-purple-500/15 dark:text-purple-200">
                    {race.goal}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    Priority: {race.priority}
                  </span>
                  {race.gain && (
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-800 dark:bg-orange-500/15 dark:text-orange-200">
                      {race.gain}
                    </span>
                  )}
                </div>
              </div>
              <div className="rounded-lg bg-slate-950 px-4 py-3 text-white dark:bg-slate-800">
                <p className="text-3xl font-black">{daysUntil(race.date)}</p>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                  days left
                </p>
              </div>
            </div>

            <p className="mt-5 rounded-lg bg-purple-50 p-3 text-sm font-bold text-purple-900 dark:bg-purple-950/40 dark:text-purple-100">
              {race.mindset}
            </p>
            <ul className="mt-4 grid gap-2 text-sm font-semibold text-slate-700 sm:grid-cols-2 dark:text-slate-200">
              {race.strategy.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-purple-600 dark:text-purple-300" />
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

function PhaseCard({ phase, expanded, onToggle }) {
  const style = phaseStyles[phase.color];
  const details = [
    phase.raceTarget && { title: "Race target", items: [phase.raceTarget] },
    phase.successMarkers && { title: "Success markers", items: phase.successMarkers },
    phase.keySessions && { title: "Key sessions", items: phase.keySessions },
    phase.peakEffort && { title: "Peak effort", items: [phase.peakEffort] },
    phase.taper && { title: "Taper", items: phase.taper },
  ].filter(Boolean);

  return (
    <article className={`rounded-lg border-l-4 ${style.border} bg-white p-5 shadow-soft dark:bg-slate-900`}>
      <button type="button" onClick={onToggle} className="flex w-full items-start justify-between gap-4 text-left">
        <span>
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${style.chip}`}>
            {phase.phase}
          </span>
          <h3 className="mt-3 text-lg font-black text-slate-950 dark:text-white">{phase.title}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">{phase.date}</p>
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
          {details.map((detail) => (
            <div key={detail.title} className="mt-4 rounded-lg bg-slate-50 p-3 dark:bg-slate-950">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                {detail.title}
              </p>
              <ul className="mt-2 space-y-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                {detail.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function MacroTimeline({ activeMode }) {
  const [activePhase, setActivePhase] = useState("all");
  const [expanded, setExpanded] = useState(() =>
    phases.reduce((state, phase) => ({ ...state, [phase.id]: true }), {}),
  );
  const modePhases = phases.filter((phase) => activeMode === "all" || phase.mode === activeMode);
  const visiblePhases =
    activePhase === "all" ? modePhases : modePhases.filter((phase) => phase.id === activePhase);

  useEffect(() => {
    setActivePhase("all");
  }, [activeMode]);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Macro Timeline"
        title="Five phases from base rebuild to Cao Bằng taper"
        action={
          <select
            value={activePhase}
            onChange={(event) => setActivePhase(event.target.value)}
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-800 shadow-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            aria-label="Filter phases"
          >
            <option value="all">All visible phases</option>
            {modePhases.map((phase) => (
              <option key={phase.id} value={phase.id}>
                {phase.title}
              </option>
            ))}
          </select>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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

function MileageChart({ activeMode }) {
  const chartData = useMemo(
    () => mileageProgression.filter((week) => activeMode === "all" || week.mode === activeMode),
    [activeMode],
  );

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-white p-5 shadow-soft dark:bg-slate-900">
        <SectionHeader eyebrow="Volume" title="Weekly mileage progression to 85km peak" />
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ left: -16, right: 8, top: 10 }}>
              <defs>
                <linearGradient id="kmFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.55} />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 11 }} unit="km" domain={[25, 90]} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #cbd5e1" }}
                formatter={(value) => [`${value} km`, "Weekly volume"]}
              />
              <Area type="monotone" dataKey="km" stroke="#059669" strokeWidth={3} fill="url(#kmFill)" />
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
      <SectionHeader eyebrow="Weekly Structure" title="Current base phase training week" />
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

function StrengthRoutine() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Strength" title="Durability-first strength system" />
      <div className="grid gap-4 lg:grid-cols-2">
        {Object.values(strengthRoutines).map((routine) => (
          <article key={routine.title} className="rounded-lg bg-white p-5 shadow-soft dark:bg-slate-900">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              {routine.title}
            </p>
            <h3 className="mt-1 text-xl font-black text-slate-950 dark:text-white">{routine.subtitle}</h3>
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
      <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/35 dark:text-emerald-100">
        Strength goal is durability, downhill control, and anti-IT band stability - not bodybuilding.
      </p>
    </section>
  );
}

function StairWorkoutSystem() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Stairs" title="21-floor apartment stairwell progression" />
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
          Never run downstairs fast. Never jump steps. Descend slowly with short steps to protect IT band and knees.
        </p>
      </div>
    </section>
  );
}

function FuelingSystem() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <article className="rounded-lg bg-white p-5 shadow-soft dark:bg-slate-900">
          <SectionHeader eyebrow="Fueling" title="Carb progression for the season" />
          <div className="grid gap-3 sm:grid-cols-3">
            {fuelingProgression.map((item) => (
              <div key={item.period} className="rounded-lg bg-slate-50 p-4 dark:bg-slate-950">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {item.period}
                </p>
                <p className="mt-2 text-lg font-black text-slate-950 dark:text-white">{item.target}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/35 dark:text-amber-100">
            Ultra runners often fail because of stomach shutdown, sodium imbalance, or dehydration - not because cardio is weak.
          </p>
        </article>

        <article className="rounded-lg bg-white p-5 shadow-soft dark:bg-slate-900">
          <SectionHeader eyebrow="Fuel Types" title="Test early, repeat often" />
          <div className="grid gap-3 sm:grid-cols-2">
            {fuelTypes.map((fuel) => (
              <div key={fuel} className="flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-700 dark:bg-slate-950 dark:text-slate-200">
                <Check size={17} className="text-emerald-600 dark:text-emerald-300" />
                {fuel}
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function WarningSigns() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Warning Signs" title="Act before small pain becomes a season problem" />
      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-yellow-200 bg-yellow-50 p-5 shadow-soft dark:border-yellow-500/40 dark:bg-yellow-950/30">
          <h3 className="text-lg font-black text-yellow-900 dark:text-yellow-100">Yellow flags</h3>
          <ul className="mt-4 grid gap-3 text-sm font-bold text-yellow-900 dark:text-yellow-100">
            {warningGroups.yellow.map((sign) => (
              <li key={sign}>{sign}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-lg border border-red-200 bg-red-50 p-5 shadow-soft dark:border-red-500/40 dark:bg-red-950/35">
          <h3 className="text-lg font-black text-red-900 dark:text-red-100">Red flags</h3>
          <ul className="mt-4 grid gap-3 text-sm font-bold text-red-900 dark:text-red-100">
            {warningGroups.red.map((sign) => (
              <li key={sign}>{sign}</li>
            ))}
          </ul>
        </article>
      </div>
      <p className="mt-4 rounded-lg bg-slate-950 p-4 text-sm font-black text-white dark:bg-slate-900">
        Reduce load 30-50% immediately if warning signs appear.
      </p>
    </section>
  );
}

function RaceStrategy() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <SectionHeader eyebrow="Race Strategy" title="Execution beats fitness on ultra day" />
      <div className="grid gap-4 lg:grid-cols-2">
        {raceStrategies.map(({ race, icon: Icon, points }) => (
          <article key={race} className="rounded-lg bg-white p-5 shadow-soft dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300">
                <Icon size={21} />
              </span>
              <h3 className="text-xl font-black text-slate-950 dark:text-white">{race}</h3>
            </div>
            <ul className="mt-5 grid gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
              {points.map((point) => (
                <li key={point} className="flex gap-3">
                  <Check size={17} className="mt-0.5 shrink-0 text-purple-600 dark:text-purple-300" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function HabitChecklist() {
  const [checked, setChecked] = useStoredState(STORAGE_KEY, {});

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="rounded-lg bg-slate-950 p-5 text-white shadow-soft dark:bg-slate-900">
        <SectionHeader eyebrow="Weekly Habits" title="Checklist for the current training week" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
  const [activeMode, setActiveMode] = useState("base");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <main className="min-h-screen bg-[#f6f7f2] text-slate-900 transition dark:bg-slate-950 dark:text-slate-100">
      <HeroSection isDark={isDark} onThemeToggle={() => setIsDark((current) => !current)} />
      <ModeToggle activeMode={activeMode} onChange={setActiveMode} />
      <RaceCalendar />
      <MacroTimeline activeMode={activeMode} />
      <MileageChart activeMode={activeMode} />
      <WeeklyStructure />
      <StrengthRoutine />
      <StairWorkoutSystem />
      <FuelingSystem />
      <WarningSigns />
      <RaceStrategy />
      <HabitChecklist />
    </main>
  );
}
