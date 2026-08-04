import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/vari/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { crowdTrend, densityByZone, emergencyMix, resourceUsage, responseTime } from "@/lib/wari-data";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({
    meta: [
      { title: "AI Analytics · VARI-SENSE" },
      { name: "description", content: "Crowd trends, emergency heatmaps, volunteer efficiency and resource usage analytics." },
    ],
  }),
  component: Analytics,
});

const pieColors = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--muted-foreground)"];

const heat = Array.from({ length: 7 }, (_, r) =>
  Array.from({ length: 12 }, (_, c) => Math.round(30 + 60 * Math.abs(Math.sin((r + 1) * (c + 2) / 6)))),
);

const tooltipStyle = { borderRadius: 12, fontSize: 12, border: "1px solid var(--border)", background: "var(--card)" };

function Analytics() {
  return (
    <>
      <PageHeader
        title="AI Analytics"
        subtitle="Model insights across crowd, emergency, volunteer and resource dimensions"
        actions={
          <>
            <Badge variant="outline">4 models · v3.2</Badge>
            <Button size="sm" variant="outline">Last 7 days</Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="surface-card p-4">
          <h2 className="font-semibold">Crowd trend (24h)</h2>
          <div className="mt-3 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={crowdTrend}>
                <defs>
                  <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--saffron)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--saffron)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="hour" interval={3} tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 10 }} width={48} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="actual" stroke="var(--saffron)" strokeWidth={2} fill="url(#a1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card p-4">
          <h2 className="font-semibold">Hourly crowd prediction accuracy</h2>
          <div className="mt-3 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={crowdTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="hour" interval={3} tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 10 }} width={48} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="actual" name="Actual" stroke="var(--navy)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="predicted" name="Predicted" stroke="var(--saffron)" strokeWidth={2} dot={false} strokeDasharray="5 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card p-4">
          <h2 className="font-semibold">Emergency distribution</h2>
          <div className="mt-3 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={emergencyMix} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                  {emergencyMix.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card p-4">
          <h2 className="font-semibold">Volunteer efficiency by zone</h2>
          <div className="mt-3 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={densityByZone}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="zone" tick={{ fontSize: 9 }} stroke="var(--muted-foreground)" interval={0} angle={-12} height={45} />
                <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="density" name="Efficiency index" fill="var(--success)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card p-4">
          <h2 className="font-semibold">Medical & police response time</h2>
          <div className="mt-3 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="medical" stroke="var(--success)" strokeWidth={2} />
                <Line type="monotone" dataKey="police" stroke="var(--navy)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card p-4">
          <h2 className="font-semibold">Resource usage vs forecast</h2>
          <div className="mt-3 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="used" fill="var(--navy)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="forecast" fill="var(--saffron)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="surface-card mt-4 p-4">
        <h2 className="font-semibold">Emergency heatmap · zone × hour</h2>
        <div className="mt-3 space-y-1 overflow-x-auto">
          {heat.map((row, r) => (
            <div key={r} className="flex gap-1">
              {row.map((v, c) => (
                <span
                  key={c}
                  title={`Zone ${r + 1} · ${c * 2}:00 · ${v}`}
                  className="h-6 flex-1 rounded"
                  style={{
                    background: `color-mix(in oklab, var(--danger) ${v}%, var(--muted))`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
