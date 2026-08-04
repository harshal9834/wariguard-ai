import { createFileRoute } from "@tanstack/react-router";
import {
  Ambulance,
  Brain,
  Droplets,
  Shield,
  Siren,
  Stethoscope,
  TrafficCone,
  Users,
  Utensils,
  HeartHandshake,
  CloudRain,
  Wind,
  Thermometer,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/vari/app-shell";
import { StatCard } from "@/components/vari/stat-card";
import { MapCanvas } from "@/components/vari/map-canvas";
import { AIPanel } from "@/components/vari/ai-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { crowdTrend, densityByZone, emergencies, statCards } from "@/lib/wari-data";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Operations Dashboard · VARI-SENSE" },
      { name: "description", content: "Live overview of pilgrims, volunteers, medical, police, resources and AI risk." },
      { property: "og:title", content: "Operations Dashboard · VARI-SENSE" },
      { property: "og:description", content: "Live Wari operations at a glance." },
    ],
  }),
  component: Dashboard,
});

const icons: Record<string, LucideIcon> = {
  Users,
  HeartHandshake,
  Ambulance,
  Stethoscope,
  Shield,
  Utensils,
  Droplets,
  Siren,
  TrafficCone,
  Brain,
};

function Dashboard() {
  return (
    <>
      <PageHeader
        title="Operations Dashboard"
        subtitle="Pandharpur Wari 2026 · Day 12 · Wakhri to Pandharpur leg"
        actions={
          <>
            <Badge className="bg-success/15 text-success border-0 gap-1.5">
              <span className="bg-success size-1.5 animate-pulse rounded-full" /> Live sync
            </Badge>
            <Button variant="outline" size="sm">Last 24 hours</Button>
            <Button size="sm" className="gradient-saffron border-0 text-white">Export snapshot</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {statCards.map((c, i) => (
          <StatCard
            key={c.key}
            label={c.label}
            value={c.value}
            delta={c.delta}
            up={c.up}
            tone={c.tone}
            icon={icons[c.icon] ?? Users}
            seed={i + 2}
          />
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <div className="surface-card p-4 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Crowd trend vs AI prediction</h2>
              <p className="text-muted-foreground text-xs">Pilgrims present per hour across all monitored zones</p>
            </div>
            <Badge variant="outline">Accuracy 94.6%</Badge>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={crowdTrend}>
                <defs>
                  <linearGradient id="ac" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--navy)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--navy)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={3} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" width={48} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="actual" name="Actual" stroke="var(--navy)" strokeWidth={2} fill="url(#ac)" />
                <Line type="monotone" dataKey="predicted" name="AI predicted" stroke="var(--saffron)" strokeWidth={2} dot={false} strokeDasharray="5 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <AIPanel />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <div className="surface-card overflow-hidden xl:col-span-2">
          <div className="flex items-center justify-between p-4 pb-3">
            <h2 className="font-semibold">Live command map</h2>
            <Badge variant="outline" className="gap-1.5">
              <span className="bg-danger size-1.5 animate-pulse rounded-full" /> 3 emergency zones
            </Badge>
          </div>
          <MapCanvas className="h-80 rounded-none border-x-0 border-b-0" />
        </div>

        <div className="space-y-4">
          <div className="surface-card p-4">
            <h2 className="font-semibold">Zone occupancy</h2>
            <div className="mt-3 space-y-3">
              {densityByZone.map((z) => (
                <div key={z.zone}>
                  <div className="flex justify-between text-xs">
                    <span className="font-medium">{z.zone}</span>
                    <span className={z.density > 85 ? "text-danger font-semibold" : "text-muted-foreground"}>
                      {z.density}%
                    </span>
                  </div>
                  <Progress value={z.density} className="mt-1 h-1.5" />
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-4">
            <h2 className="font-semibold">Weather</h2>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {[
                { icon: Thermometer, v: "27°C", l: "Feels 31°" },
                { icon: CloudRain, v: "68%", l: "Rain 20:00" },
                { icon: Wind, v: "14 km/h", l: "SW wind" },
              ].map((w) => (
                <div key={w.l} className="bg-muted/50 rounded-xl p-2.5">
                  <w.icon className="text-navy mx-auto size-4" />
                  <p className="mt-1 text-sm font-bold">{w.v}</p>
                  <p className="text-muted-foreground text-[10px]">{w.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <div className="surface-card p-4 xl:col-span-2">
          <h2 className="font-semibold">Active emergencies</h2>
          <div className="mt-3 space-y-2">
            {emergencies.slice(0, 4).map((e) => (
              <div key={e.id} className="bg-muted/40 flex flex-wrap items-center gap-3 rounded-xl p-3">
                <span className="bg-danger/15 text-danger grid size-9 place-items-center rounded-lg">
                  <Siren className="size-4" />
                </span>
                <div className="min-w-40 flex-1">
                  <p className="text-[13px] font-semibold">
                    {e.type} · {e.id}
                  </p>
                  <p className="text-muted-foreground text-[11px]">{e.location}</p>
                </div>
                <Badge variant={e.priority === "Critical" ? "destructive" : "secondary"}>{e.priority}</Badge>
                <span className="text-muted-foreground text-[11px]">{e.team}</span>
                <span className="text-xs font-semibold">ETA {e.eta}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card p-4">
          <h2 className="font-semibold">Zone density comparison</h2>
          <div className="mt-3 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={densityByZone} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <YAxis type="category" dataKey="zone" width={90} tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
                <Bar dataKey="density" fill="var(--saffron)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
