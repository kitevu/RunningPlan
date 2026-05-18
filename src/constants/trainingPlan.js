import {
  Activity,
  AlertTriangle,
  CalendarDays,
  Dumbbell,
  Flame,
  Footprints,
  HeartPulse,
  Mountain,
  ShieldAlert,
  StretchHorizontal,
  TrendingUp,
} from "lucide-react";

export const metrics = [
  {
    label: "Current Volume",
    value: "30-35",
    unit: "km/week",
    icon: Activity,
    tone: "emerald",
  },
  {
    label: "Target Peak Volume",
    value: "60-75",
    unit: "km/week",
    icon: TrendingUp,
    tone: "amber",
  },
  {
    label: "Race Goal",
    value: "Finish",
    unit: "strong",
    icon: Mountain,
    tone: "sky",
  },
  {
    label: "Key Risk",
    value: "IT Band",
    unit: "management",
    icon: ShieldAlert,
    tone: "rose",
  },
];

export const phases = [
  {
    id: "base",
    phase: "Phase 1",
    title: "Base & Durability",
    date: "May 18 \u2192 June 30",
    volume: "35 \u2192 45 km",
    color: "green",
    focus: ["Aerobic base", "Strength foundation", "IT band prevention"],
  },
  {
    id: "build",
    phase: "Phase 2",
    title: "Build Engine",
    date: "July \u2192 Mid August",
    volume: "45 \u2192 60 km",
    color: "yellow",
    focus: ["Climbing strength", "Back-to-back runs", "Fueling practice"],
  },
  {
    id: "specific",
    phase: "Phase 3",
    title: "Specific Ultra Build",
    date: "Mid August \u2192 Mid September",
    volume: "60 \u2192 75 km",
    color: "orange",
    focus: ["Race-specific fatigue", "Stair volume", "Long time-on-feet"],
  },
  {
    id: "taper",
    phase: "Phase 4",
    title: "Peak & Taper",
    date: "Mid September \u2192 Race",
    volume: "Reduce \u2192 fresh",
    color: "blue",
    focus: ["Peak long effort", "Reduce volume", "Fresh legs for race day"],
  },
];

export const weeklySchedule = [
  { day: "Mon", title: "Rest + mobility", load: "Recovery", icon: StretchHorizontal },
  { day: "Tue", title: "Easy run 6-8 km", load: "Zone 2", icon: Footprints },
  { day: "Wed", title: "Strength A", load: "Foundation", icon: Dumbbell },
  { day: "Thu", title: "Stair session", load: "Climb", icon: Flame },
  { day: "Fri", title: "Easy run 8-10 km", load: "Zone 2", icon: Footprints },
  { day: "Sat", title: "Strength B + mobility", load: "Trail prep", icon: Dumbbell },
  { day: "Sun", title: "Long run 12-18 km", load: "Progressive", icon: CalendarDays },
];

export const strengthRoutines = {
  foundation: {
    title: "Strength A",
    subtitle: "Foundation",
    items: [
      "Bulgarian split squat: 3x8 each leg",
      "Romanian deadlift: 3x8",
      "Step-up: 3x10",
      "Glute bridge: 3x12",
      "Calf raise: 3x20",
      "Side plank: 3x45s",
    ],
  },
  trail: {
    title: "Strength B",
    subtitle: "Trail Specific",
    items: [
      "Walking lunge: 3x12 each side",
      "Single-leg RDL: 3x10",
      "Box step-down: 3x10",
      "Tibialis raise: 3x20",
      "Dead bug: 3x12",
      "Pallof press: 3x12",
    ],
  },
};

export const stairLevels = [
  {
    level: "Level 1",
    title: "Base Climb",
    date: "May-June",
    reps: "21 floors x 3-4 reps",
    detail: "Power hike up, controlled walk down",
  },
  {
    level: "Level 2",
    title: "Strength Climb",
    date: "July",
    reps: "21 floors x 5-8 reps",
    detail: "Alternate power hike and light jog",
  },
  {
    level: "Level 3",
    title: "Ultra Fatigue",
    date: "August-September",
    reps: "21 floors x 10-15 reps",
    detail: "Continuous effort, focus on climbing economy",
  },
];

export const fuelingTargets = [
  "Start practicing fueling from July",
  "40-60g carbs/hour during long runs",
  "Later progress to 60-90g carbs/hour",
  "Test gel, banana, sports drink, electrolyte",
  "Train the gut before race day",
];

export const warningSigns = [
  { label: "Outer knee tightness", severity: "yellow" },
  { label: "Pain when descending", severity: "red" },
  { label: "Unusual fatigue", severity: "yellow" },
  { label: "Achilles or calf tightness", severity: "yellow" },
  { label: "Reduce load 30-50% immediately if these appear", severity: "red" },
];

export const mileageProgression = [
  { week: "May 18", km: 35 },
  { week: "May 25", km: 36 },
  { week: "Jun 1", km: 38 },
  { week: "Jun 8", km: 40 },
  { week: "Jun 15", km: 42 },
  { week: "Jun 22", km: 45 },
  { week: "Jul 1", km: 47 },
  { week: "Jul 8", km: 50 },
  { week: "Jul 15", km: 53 },
  { week: "Jul 22", km: 55 },
  { week: "Aug 1", km: 58 },
  { week: "Aug 8", km: 60 },
  { week: "Aug 15", km: 64 },
  { week: "Aug 22", km: 68 },
  { week: "Aug 29", km: 72 },
  { week: "Sep 5", km: 75 },
  { week: "Sep 12", km: 68 },
  { week: "Sep 19", km: 55 },
  { week: "Sep 26", km: 42 },
  { week: "Oct Race", km: 30 },
];

export const habits = [
  { id: "zone2", label: "Zone 2 runs", icon: Footprints },
  { id: "strength", label: "Strength sessions", icon: Dumbbell },
  { id: "stairs", label: "Stair session", icon: Flame },
  { id: "longrun", label: "Long run", icon: Mountain },
  { id: "mobility", label: "Mobility", icon: StretchHorizontal },
  { id: "fueling", label: "Fueling practice", icon: HeartPulse },
];
