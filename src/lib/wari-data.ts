export type Trend = { v: number }[];

export const spark = (seed: number, n = 12): Trend =>
  Array.from({ length: n }, (_, i) => ({
    v: Math.round(40 + 30 * Math.sin((i + seed) / 1.7) + ((i * seed) % 13)),
  }));

export const statCards = [
  { key: "pilgrims", label: "Total Pilgrims", value: "1,86,420", delta: "+4.2%", up: true, tone: "saffron", icon: "Users" },
  { key: "volunteers", label: "Active Volunteers", value: "2,514", delta: "+112", up: true, tone: "navy", icon: "HeartHandshake" },
  { key: "ambulance", label: "Available Ambulances", value: "148", delta: "-6", up: false, tone: "success", icon: "Ambulance" },
  { key: "medical", label: "Medical Teams", value: "312", delta: "+9", up: true, tone: "success", icon: "Stethoscope" },
  { key: "police", label: "Police Teams", value: "504", delta: "+18", up: true, tone: "navy", icon: "Shield" },
  { key: "food", label: "Food Distribution", value: "84,300", delta: "+7.6%", up: true, tone: "saffron", icon: "Utensils" },
  { key: "water", label: "Water Stations", value: "212", delta: "3 low", up: false, tone: "navy", icon: "Droplets" },
  { key: "emergency", label: "Emergency Cases", value: "27", delta: "+5", up: false, tone: "danger", icon: "Siren" },
  { key: "roads", label: "Road Closures", value: "6", delta: "2 new", up: false, tone: "warning", icon: "TrafficCone" },
  { key: "risk", label: "AI Risk Score", value: "72 / 100", delta: "High", up: false, tone: "danger", icon: "Brain" },
] as const;

export const crowdTrend = Array.from({ length: 24 }, (_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  actual: Math.round(60000 + 55000 * Math.sin((i - 4) / 3.4) + i * 900),
  predicted: Math.round(62000 + 55000 * Math.sin((i - 3.4) / 3.4) + i * 1000),
}));

export const densityByZone = [
  { zone: "Alandi Ghat", density: 92, capacity: 100 },
  { zone: "Pune Corridor", density: 78, capacity: 100 },
  { zone: "Saswad Halt", density: 64, capacity: 100 },
  { zone: "Jejuri Camp", density: 55, capacity: 100 },
  { zone: "Lonand Junction", density: 41, capacity: 100 },
  { zone: "Wakhri Ringan", density: 88, capacity: 100 },
];

export const resourceUsage = [
  { name: "Water", used: 72, forecast: 88 },
  { name: "Food", used: 65, forecast: 79 },
  { name: "Medical Kits", used: 48, forecast: 61 },
  { name: "Fuel", used: 55, forecast: 58 },
  { name: "Bedding", used: 33, forecast: 39 },
];

export const emergencyMix = [
  { name: "Medical", value: 42 },
  { name: "Lost Person", value: 21 },
  { name: "Road Block", value: 14 },
  { name: "Fire", value: 6 },
  { name: "Stampede Risk", value: 11 },
  { name: "Other", value: 6 },
];

export const responseTime = Array.from({ length: 12 }, (_, i) => ({
  day: `D${i + 1}`,
  medical: Math.round(9 - i * 0.25 + Math.sin(i) * 1.4),
  police: Math.round(11 - i * 0.3 + Math.cos(i) * 1.6),
}));

export type Emergency = {
  id: string;
  type: "Medical" | "Fire" | "Stampede" | "Lost Person" | "Road Block" | "Flood" | "Animal Incident";
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Active" | "Dispatched" | "En Route" | "Resolved";
  location: string;
  team: string;
  eta: string;
  raised: string;
};

export const emergencies: Emergency[] = [
  { id: "EMG-4821", type: "Medical", priority: "Critical", status: "En Route", location: "Wakhri Ringan · Sector 4", team: "Ambulance A-17", eta: "3 min", raised: "2 min ago" },
  { id: "EMG-4820", type: "Stampede", priority: "Critical", status: "Dispatched", location: "Alandi Ghat Bridge", team: "QRT Bravo", eta: "6 min", raised: "8 min ago" },
  { id: "EMG-4818", type: "Lost Person", priority: "High", status: "Active", location: "Jejuri Camp Gate 2", team: "Seva Unit 12", eta: "—", raised: "14 min ago" },
  { id: "EMG-4815", type: "Road Block", priority: "Medium", status: "Dispatched", location: "NH-965 KM 42", team: "Traffic Wing 3", eta: "11 min", raised: "22 min ago" },
  { id: "EMG-4809", type: "Fire", priority: "High", status: "Resolved", location: "Saswad Kitchen Tent", team: "Fire Unit 2", eta: "—", raised: "1 hr ago" },
  { id: "EMG-4803", type: "Animal Incident", priority: "Low", status: "Resolved", location: "Lonand Field Path", team: "Seva Unit 7", eta: "—", raised: "2 hr ago" },
];

export const alerts = [
  { id: 1, level: "Critical", title: "Crowd density 92% at Alandi Ghat", time: "18:42", channel: "Push · SMS · Voice", detail: "AI predicts congestion breach within 12 minutes. Redirect via Ring Road B." },
  { id: 2, level: "Critical", title: "Ambulance shortage in Sector 4", time: "18:31", channel: "Push · WhatsApp", detail: "Only 2 units available for 18,000 pilgrims. Transfer from Saswad depot." },
  { id: 3, level: "Medium", title: "Water stock below 30% at Jejuri", time: "18:05", channel: "SMS", detail: "Forecast depletion in 2h 40m. Tanker dispatch recommended." },
  { id: 4, level: "Medium", title: "Rain expected 20:00 – 22:00", time: "17:50", channel: "Push", detail: "Prepare shelter capacity for 40,000 pilgrims at Lonand." },
  { id: 5, level: "Resolved", title: "Lost child reunited at Gate 2", time: "17:12", channel: "Voice", detail: "AI face-match confirmed guardian in 4 minutes." },
  { id: 6, level: "Resolved", title: "Barricade restored at NH-965", time: "16:40", channel: "Push", detail: "Traffic Wing 3 completed reinforcement." },
];

export const volunteers = [
  { name: "Sanika Patil", zone: "Alandi Ghat", tasks: 14, score: 98, status: "On Duty" },
  { name: "Rohit Deshmukh", zone: "Pune Corridor", tasks: 12, score: 95, status: "On Duty" },
  { name: "Aarti Jadhav", zone: "Jejuri Camp", tasks: 11, score: 93, status: "Break" },
  { name: "Imran Shaikh", zone: "Saswad Halt", tasks: 10, score: 91, status: "On Duty" },
  { name: "Kunal More", zone: "Wakhri Ringan", tasks: 9, score: 88, status: "Off Duty" },
  { name: "Prachi Kulkarni", zone: "Lonand Junction", tasks: 8, score: 86, status: "On Duty" },
];

export const tasks = [
  { id: "T-9012", title: "Escort medical team to Sector 4", priority: "Critical", eta: "5 min", zone: "Wakhri Ringan" },
  { id: "T-9009", title: "Refill water station W-22", priority: "High", eta: "18 min", zone: "Jejuri Camp" },
  { id: "T-9004", title: "Crowd guidance at Gate 2", priority: "Medium", eta: "30 min", zone: "Alandi Ghat" },
  { id: "T-8998", title: "Distribute 500 meal packets", priority: "Medium", eta: "45 min", zone: "Saswad Halt" },
];

export const patients = [
  { id: "P-2201", name: "Vitthal Kadam", age: 64, issue: "Dehydration", triage: "Yellow", camp: "Camp 7" },
  { id: "P-2199", name: "Sunita Gaikwad", age: 51, issue: "Heat exhaustion", triage: "Red", camp: "Camp 3" },
  { id: "P-2195", name: "Mahesh Pawar", age: 37, issue: "Foot injury", triage: "Green", camp: "Camp 7" },
  { id: "P-2190", name: "Rekha Shinde", age: 72, issue: "Chest pain", triage: "Red", camp: "Camp 1" },
];

export const inventory = [
  { item: "ORS Sachets", stock: 12400, min: 8000, unit: "packs" },
  { item: "IV Fluids", stock: 1850, min: 2000, unit: "bottles" },
  { item: "Painkillers", stock: 9600, min: 5000, unit: "strips" },
  { item: "Bandage Kits", stock: 3100, min: 3500, unit: "kits" },
  { item: "Oxygen Cylinders", stock: 240, min: 200, unit: "units" },
];

export const bloodBank = [
  { group: "O+", units: 82 },
  { group: "A+", units: 54 },
  { group: "B+", units: 61 },
  { group: "AB+", units: 22 },
  { group: "O-", units: 14 },
];

export const policeUnits = [
  { unit: "QRT Bravo", zone: "Alandi Ghat", strength: 42, status: "Deployed" },
  { unit: "Traffic Wing 3", zone: "NH-965", strength: 28, status: "Deployed" },
  { unit: "Drone Squad 1", zone: "Wakhri Ringan", strength: 6, status: "Airborne" },
  { unit: "Reserve Alpha", zone: "Pune Depot", strength: 60, status: "Standby" },
];

export const resources = [
  { name: "Drinking Water", stock: 68, consumption: "42,000 L/hr", forecast: "Shortfall in 3h", tone: "warning" },
  { name: "Food Packets", stock: 74, consumption: "12,400 /hr", forecast: "Stable till 22:00", tone: "success" },
  { name: "Medical Kits", stock: 52, consumption: "310 /hr", forecast: "Reorder advised", tone: "warning" },
  { name: "Volunteers", stock: 81, consumption: "2,514 active", forecast: "Adequate", tone: "success" },
  { name: "Ambulances", stock: 39, consumption: "148 available", forecast: "Critical in Sector 4", tone: "danger" },
  { name: "Police Vehicles", stock: 66, consumption: "232 deployed", forecast: "Stable", tone: "success" },
];

export const aiRecommendations = [
  { action: "Deploy 120 more volunteers to Alandi Ghat", impact: "Reduces density 92% → 74%", confidence: 94 },
  { action: "Open alternate route Ring Road B", impact: "Diverts 18,000 pilgrims", confidence: 89 },
  { action: "Dispatch 3 water tankers to Jejuri", impact: "Prevents shortage at 21:10", confidence: 86 },
  { action: "Move Ambulance A-22 to Sector 4", impact: "Response time 9 → 4 min", confidence: 91 },
];

export const predictions = [
  { window: "Next 15 min", risk: "High", density: 88, note: "Bridge choke point forming" },
  { window: "Next 30 min", risk: "Critical", density: 96, note: "Ringan gathering + rain" },
  { window: "Next 1 hour", risk: "Medium", density: 71, note: "Dispersal after ringan" },
];

export const notifications = [
  { icon: "check", text: "Volunteer Sanika accepted task T-9012", time: "just now" },
  { icon: "alert", text: "Medical emergency raised at Wakhri Ringan", time: "2 min" },
  { icon: "trend", text: "Crowd spike detected: Alandi Ghat +12%", time: "6 min" },
  { icon: "cone", text: "Road block reported on NH-965 KM 42", time: "14 min" },
  { icon: "cloud", text: "Weather alert: rain 20:00 – 22:00", time: "22 min" },
  { icon: "food", text: "Food shortage predicted at Saswad 23:00", time: "31 min" },
  { icon: "water", text: "Water station W-22 below 30%", time: "38 min" },
  { icon: "user", text: "Lost person reunited at Gate 2", time: "1 hr" },
];

export const mapMarkers = [
  { id: "m1", x: 22, y: 30, kind: "medical", label: "Medical Camp 3" },
  { id: "m2", x: 61, y: 24, kind: "medical", label: "Medical Camp 7" },
  { id: "p1", x: 38, y: 55, kind: "police", label: "Police Post A" },
  { id: "p2", x: 74, y: 62, kind: "police", label: "Police Post D" },
  { id: "w1", x: 47, y: 38, kind: "water", label: "Water Station W-22" },
  { id: "w2", x: 28, y: 71, kind: "water", label: "Water Station W-08" },
  { id: "f1", x: 66, y: 44, kind: "food", label: "Annadan Center 2" },
  { id: "f2", x: 16, y: 52, kind: "food", label: "Annadan Center 5" },
  { id: "r1", x: 53, y: 74, kind: "rest", label: "Washrooms · Block C" },
  { id: "k1", x: 82, y: 33, kind: "parking", label: "Parking P-4" },
  { id: "e1", x: 44, y: 20, kind: "emergency", label: "Emergency Zone · Bridge" },
  { id: "x1", x: 70, y: 80, kind: "closure", label: "Road Closure NH-965" },
];

export const roles = [
  { id: "admin", name: "Admin", desc: "Full command of the Wari operation", icon: "Crown" },
  { id: "coordinator", name: "Coordinator", desc: "Zone planning and resource routing", icon: "ClipboardList" },
  { id: "volunteer", name: "Volunteer", desc: "Field tasks, attendance, reporting", icon: "HeartHandshake" },
  { id: "police", name: "Police", desc: "Crowd control, barricades, drones", icon: "Shield" },
  { id: "medical", name: "Medical Team", desc: "Patients, ambulances, inventory", icon: "Stethoscope" },
  { id: "pilgrim", name: "Pilgrim", desc: "Help, routes and SOS on the go", icon: "Footprints" },
];
