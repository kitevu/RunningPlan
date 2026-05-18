import {
  Activity,
  AlertTriangle,
  CalendarDays,
  Dumbbell,
  Flag,
  Flame,
  Footprints,
  HeartPulse,
  Mountain,
  Route,
  ShieldAlert,
  StretchHorizontal,
  TimerReset,
  TrendingUp,
} from "lucide-react";

export const season = {
  currentDate: "2026-05-18",
  title: "2026 Ultra Trail Season Roadmap",
  subtitle: "Yên Tử 25K Qualifier → Cao Bằng 70K Main Race",
};

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
    value: "75-85",
    unit: "km/week",
    icon: TrendingUp,
    tone: "amber",
  },
  {
    label: "Main Race",
    value: "Cao Bằng",
    unit: "70K",
    icon: Mountain,
    tone: "sky",
  },
  {
    label: "Qualifier Race",
    value: "Yên Tử",
    unit: "25K",
    icon: Flag,
    tone: "purple",
  },
  {
    label: "Key Risk",
    value: "IT Band",
    unit: "management",
    icon: ShieldAlert,
    tone: "rose",
  },
];

export const races = [
  {
    id: "yen-tu",
    title: "Yên Tử Ultra Trail",
    shortTitle: "Yên Tử 25K",
    date: "2026-08-22",
    displayDate: "August 22, 2026",
    distance: "25km",
    goal: "Qualify + learn",
    priority: "Medium",
    purpose: [
      "Qualify for the main race",
      "Test gear",
      "Test fueling",
      "Test pacing",
      "Test downhill control",
      "Finish healthy",
    ],
    strategy: [
      "Finish healthy",
      "No all-out effort",
      "Test gear, fuel, hydration, shoes, vest",
      "Practice controlled downhill",
      "Write post-race debrief",
    ],
    mindset: "Long run with a bib, not all-out racing",
  },
  {
    id: "cao-bang",
    title: "Cao Bằng Ultra Trail",
    shortTitle: "Cao Bằng 70K",
    date: "2026-11-28",
    displayDate: "November 28, 2026",
    distance: "70km",
    gain: "1700m D+",
    goal: "Main race",
    priority: "High",
    purpose: [
      "Finish strong",
      "Avoid DNF",
      "Avoid injury",
      "Manage fueling and fatigue",
    ],
    strategy: [
      "Finish strong",
      "Fuel consistently",
      "Maintain low effort early",
      "Protect knees and IT band",
      "Manage 10-14 hours on feet",
    ],
    mindset: "Stay functional, patient, and injury-free",
  },
];

export const trainingModes = [
  {
    id: "base",
    label: "Base Phase",
    summary: "Rebuild durability, stabilize 50km/week, and keep IT band quiet.",
  },
  {
    id: "yen-tu",
    label: "Yên Tử Build",
    summary: "Build climbing economy, downhill control, and race-day systems.",
  },
  {
    id: "cao-bang",
    label: "Cao Bằng Build",
    summary: "Prioritize long time on feet, fatigue resistance, stairs, and fueling.",
  },
  {
    id: "taper",
    label: "Taper",
    summary: "Reduce load while preserving rhythm, mobility, and confidence.",
  },
];

export const phases = [
  {
    id: "base-rebuild",
    mode: "base",
    phase: "Phase 1",
    title: "Base Rebuild",
    date: "May 18 → June 30",
    volume: "35 → 50 km/week",
    color: "green",
    focus: ["Aerobic base", "Strength foundation", "Anti-IT band work", "Stair adaptation"],
    successMarkers: ["18-20km long run comfortable", "50km/week stable", "No IT band pain"],
  },
  {
    id: "yen-tu-build",
    mode: "yen-tu",
    phase: "Phase 2",
    title: "Trail Build to Yên Tử",
    date: "July → August 22",
    volume: "50 → 65 km/week",
    color: "yellow",
    focus: ["Climbing economy", "Downhill durability", "Back-to-back runs", "Fueling practice"],
    raceTarget: "Yên Tử 25K as qualifier and gear/fueling test",
  },
  {
    id: "post-yen-tu",
    mode: "yen-tu",
    phase: "Phase 3",
    title: "Post-Yên Tử Recovery + Rebuild",
    date: "August 23 → September 8",
    volume: "35 → 55 km/week",
    color: "green",
    focus: ["Recover from Yên Tử", "Review race debrief", "Fix weaknesses", "Resume volume gradually"],
  },
  {
    id: "ultra-specific",
    mode: "cao-bang",
    phase: "Phase 4",
    title: "Ultra Specific Build",
    date: "September 9 → Mid October",
    volume: "65 → 85 km/week",
    color: "orange",
    focus: ["Long time on feet", "Back-to-back fatigue", "Big stair days", "Fueling under fatigue"],
    keySessions: [
      "Saturday long run 28-35km",
      "Sunday fatigue hike/jog 15-20km",
      "Stair workout 21 floors x 12-20 reps",
    ],
  },
  {
    id: "peak-taper",
    mode: "taper",
    phase: "Phase 5",
    title: "Peak + Taper for Cao Bằng 70K",
    date: "Mid October → November 28",
    volume: "Peak → reduce 30-50%",
    color: "blue",
    focus: ["Peak long effort", "Reduce volume gradually", "Maintain sharpness", "Arrive fresh"],
    peakEffort: "45-55km long effort or 8-10 hours time on feet",
    taper: ["3 weeks before race", "Reduce volume 30-50%", "Keep mobility and light strength"],
  },
];

export const weeklySchedule = [
  { day: "Mon", title: "Rest + mobility", load: "Recovery", icon: StretchHorizontal },
  { day: "Tue", title: "Easy Zone 2 run 6-8km", load: "Aerobic", icon: Footprints },
  { day: "Wed", title: "Strength A", load: "Foundation", icon: Dumbbell },
  { day: "Thu", title: "Stair session", load: "Climb", icon: Flame },
  { day: "Fri", title: "Easy run 8-10km", load: "Zone 2", icon: Footprints },
  { day: "Sat", title: "Strength B + mobility", load: "Durability", icon: Dumbbell },
  { day: "Sun", title: "Long run 12-20km", load: "Progressive", icon: CalendarDays },
];

export const strengthRoutines = {
  foundation: {
    title: "Strength A",
    subtitle: "Foundation",
    items: [
      "Bulgarian split squat: 3x8 each leg",
      "Romanian deadlift: 3x8",
      "Step-up: 3x12 each leg",
      "Glute bridge: 3x15",
      "Standing calf raise: 3x25",
      "Side plank: 3x45-60s",
    ],
  },
  ultra: {
    title: "Strength B",
    subtitle: "Ultra Specific",
    items: [
      "Walking lunge: 3x14 each side",
      "Single-leg RDL: 3x10 each leg",
      "Box step-down: 3x12 each leg",
      "Tibialis raise: 3x20",
      "Pallof press: 3x12",
      "Dead bug: 3x15",
    ],
  },
};

export const stairLevels = [
  {
    level: "Level 1",
    title: "Base",
    date: "May-June",
    reps: "21 floors x 3-5 reps",
    detail: "Power hike up, controlled walk down",
  },
  {
    level: "Level 2",
    title: "Climb Build",
    date: "July-August",
    reps: "21 floors x 6-10 reps",
    detail: "Alternate power hike and light jog",
  },
  {
    level: "Level 3",
    title: "Ultra Fatigue",
    date: "September-October",
    reps: "21 floors x 12-20 reps",
    detail: "Continuous climbing, focus on climbing economy",
  },
];

export const fuelingProgression = [
  { period: "July", target: "40-60g carbs/hour" },
  { period: "August", target: "60-75g carbs/hour" },
  { period: "October-November", target: "75-90g carbs/hour" },
];

export const fuelTypes = [
  "Gel",
  "Banana",
  "Sports drink",
  "Electrolyte tablets",
  "Soft solid food",
];

export const warningGroups = {
  yellow: [
    "Outer knee tightness",
    "Pain when descending",
    "Unusual fatigue",
    "Calf or Achilles tightness",
    "Sleep quality dropping",
    "Heart rate unusually high for easy pace",
  ],
  red: [
    "IT band pain during downhill",
    "Sharp knee pain",
    "Pain that changes running form",
    "Pain lasting more than 24 hours after run",
    "Loss of appetite or persistent fatigue",
  ],
};

export const raceStrategies = [
  {
    race: "Yên Tử 25K",
    icon: Route,
    points: [
      "Treat as long run with a bib",
      "Hike climbs",
      "Jog flats",
      "Controlled downhill",
      "Test gear and fueling",
      "No ego racing",
    ],
  },
  {
    race: "Cao Bằng 70K",
    icon: Mountain,
    points: [
      "Start extremely easy",
      "Hike most climbs",
      "Eat early and often",
      "Protect legs in first half",
      "Stay functional, not fast",
      "Goal is to finish strong",
    ],
  },
];

export const mileageProgression = [
  { week: "May 18", km: 35, mode: "base" },
  { week: "May 25", km: 38, mode: "base" },
  { week: "Jun 1", km: 40, mode: "base" },
  { week: "Jun 8", km: 43, mode: "base" },
  { week: "Jun 15", km: 46, mode: "base" },
  { week: "Jun 22", km: 50, mode: "base" },
  { week: "Jul 1", km: 52, mode: "yen-tu" },
  { week: "Jul 8", km: 55, mode: "yen-tu" },
  { week: "Jul 15", km: 58, mode: "yen-tu" },
  { week: "Jul 22", km: 60, mode: "yen-tu" },
  { week: "Aug 1", km: 63, mode: "yen-tu" },
  { week: "Aug 8", km: 65, mode: "yen-tu" },
  { week: "Aug 15", km: 48, mode: "yen-tu" },
  { week: "Aug 22", km: 35, mode: "yen-tu" },
  { week: "Aug 29", km: 42, mode: "yen-tu" },
  { week: "Sep 8", km: 55, mode: "yen-tu" },
  { week: "Sep 15", km: 65, mode: "cao-bang" },
  { week: "Sep 22", km: 70, mode: "cao-bang" },
  { week: "Sep 29", km: 75, mode: "cao-bang" },
  { week: "Oct 6", km: 80, mode: "cao-bang" },
  { week: "Oct 13", km: 85, mode: "cao-bang" },
  { week: "Oct 20", km: 72, mode: "taper" },
  { week: "Oct 27", km: 60, mode: "taper" },
  { week: "Nov 3", km: 48, mode: "taper" },
  { week: "Nov 10", km: 38, mode: "taper" },
  { week: "Nov 17", km: 28, mode: "taper" },
  { week: "Nov 28", km: 70, mode: "taper" },
];

export const habits = [
  { id: "zone2", label: "Zone 2 runs", icon: Footprints },
  { id: "strength", label: "Strength sessions", icon: Dumbbell },
  { id: "stairs", label: "Stair session", icon: Flame },
  { id: "longrun", label: "Long run", icon: Mountain },
  { id: "mobility", label: "Mobility", icon: StretchHorizontal },
  { id: "fueling", label: "Fueling practice", icon: HeartPulse },
  { id: "itband", label: "IT band check", icon: TimerReset },
];
