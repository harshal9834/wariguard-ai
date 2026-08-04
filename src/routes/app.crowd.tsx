import { createFileRoute } from "@tanstack/react-router";
import { Activity, Camera, Gauge, Users } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/vari/app-shell";
import { MapCanvas } from "@/components/vari/map-canvas";
import { StatCard } from "@/components/vari/stat-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { crowdTrend, densityByZone } from "@/lib/wari-data";

export const Route = createFileRoute("/app/crowd")({
  head: () => ({
    meta: [
      { title: "Crowd Monitoring · VARI-SENSE" },
      { name: "description", content: "Zone-wise occupancy, choke point detection and CCTV/drone crowd analytics." },
    ],
  }),
  component: Crowd,
});

const feeds = [
  { id: "CAM-04", zone: "Alandi Ghat Bridge", occupancy: 92, state: "Critical" },
  { id: "CAM-11", zone: "Wakhri Ringan Field", occupancy: 88, state: "Critical" },
  { id: "CAM-07", zone: "Pune Corridor Gate", occupancy: 74, state: "Watch" },
  { id: "DRN-02", zone: "Saswad Halt", occupancy: 61, state: "Normal" },
];

function Crowd() {
  return (
    <>
      <PageHeader title="Crowd Monitoring" subtitle="Computer-vision density estimation across 96 drones and 212 cameras" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Live Occupancy" value="78%" delta="+6%" tone="saffron" icon={Gauge} seed={1} />
        <StatCard label="Pilgrims In Frame" value="1,86,420" delta="+4.2%" up tone="navy" icon={Users} seed={4} />
        <StatCard label="Choke Points" value="5" delta="+2" tone="danger" icon={Activity} seed={7} />
        <StatCard label="Active Feeds" value="308" delta="+12" up tone="success" icon={Camera} seed={9} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <div className="surface-card p-4 xl:col-span-2">
          <h2 className="font-semibold">Hourly density curve</h2>
          <div className="mt-3 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={crowdTrend}>
                <defs>
                  <linearGradient id="cd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--saffron)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--saffron)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="hour" interval={2} tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 10 }} width={50} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="actual" name="Observed" stroke="var(--saffron)" strokeWidth={2} fill="url(#cd)" />
                <Area type="monotone" dataKey="predicted" name="Predicted" stroke="var(--navy)" strokeWidth={2} fillOpacity={0} strokeDasharray="5 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card p-4">
          <h2 className="font-semibold">Zone occupancy</h2>
          <div className="mt-3 space-y-3">
            {densityByZone.map((z) => (
              <div key={z.zone}>
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{z.zone}</span>
                  <span className={z.density > 85 ? "text-danger font-semibold" : "text-muted-foreground"}>{z.density}%</span>
                </div>
                <Progress value={z.density} className="mt-1 h-1.5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <MapCanvas className="h-96 xl:col-span-2" />
        <div className="surface-card p-4">
          <h2 className="font-semibold">Camera & drone feeds</h2>
          <div className="mt-3 space-y-3">
            {feeds.map((f) => (
              <div key={f.id} className="overflow-hidden rounded-xl border">
                <div className="relative h-24 bg-gradient-to-br from-[oklch(0.35_0.05_265)] to-[oklch(0.2_0.04_265)]">
                  <div className="animate-sweep absolute inset-y-0 w-1/3 bg-white/10" />
                  <span className="absolute top-2 left-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {f.id} · LIVE
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5">
                  <div>
                    <p className="text-[12px] font-medium">{f.zone}</p>
                    <p className="text-muted-foreground text-[10px]">Occupancy {f.occupancy}%</p>
                  </div>
                  <Badge variant={f.state === "Critical" ? "destructive" : "secondary"} className="text-[10px]">
                    {f.state}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
