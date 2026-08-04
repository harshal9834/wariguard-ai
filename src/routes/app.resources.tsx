import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftRight, Boxes, Droplets, TrendingUp, Utensils } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/vari/app-shell";
import { StatCard } from "@/components/vari/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { resourceUsage, resources } from "@/lib/wari-data";

export const Route = createFileRoute("/app/resources")({
  head: () => ({
    meta: [
      { title: "Resource Management · VARI-SENSE" },
      { name: "description", content: "Stock levels, consumption rates and AI demand forecasting for water, food, medical kits and vehicles." },
    ],
  }),
  component: Resources,
});

const toneBadge: Record<string, string> = {
  success: "bg-success/15 text-success",
  warning: "bg-warning/25 text-warning-foreground",
  danger: "bg-danger/15 text-danger",
};

function Resources() {
  return (
    <>
      <PageHeader
        title="Resource Management"
        subtitle="Predictive supply balancing across all Wari zones"
        actions={
          <Button size="sm" className="gap-1.5">
            <ArrowLeftRight className="size-4" /> Transfer resources
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Water Demand (next 3h)" value="126,000 L" delta="+18%" tone="danger" icon={Droplets} seed={2} />
        <StatCard label="Food Demand (next 3h)" value="41,200 meals" delta="+9%" tone="saffron" icon={Utensils} seed={6} />
        <StatCard label="Warehouse Fill" value="64%" delta="-8%" tone="warning" icon={Boxes} seed={4} />
        <StatCard label="Forecast Accuracy" value="92.8%" delta="+1.4" up tone="success" icon={TrendingUp} seed={9} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <div className="surface-card p-4 xl:col-span-2">
          <h2 className="font-semibold">Consumption vs AI forecast</h2>
          <div className="mt-3 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="used" name="Consumed %" fill="var(--navy)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="forecast" name="Forecast %" fill="var(--saffron)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card p-4">
          <h2 className="font-semibold">Nearby requirements</h2>
          <div className="mt-3 space-y-2">
            {[
              { z: "Jejuri Camp", n: "3 water tankers", t: "danger" },
              { z: "Saswad Halt", n: "8,000 meal packets", t: "warning" },
              { z: "Wakhri Ringan", n: "120 medical kits", t: "warning" },
              { z: "Lonand Junction", n: "40 volunteers", t: "success" },
            ].map((r) => (
              <div key={r.z} className="bg-muted/40 flex items-center justify-between rounded-lg p-2.5">
                <div>
                  <p className="text-[13px] font-medium">{r.n}</p>
                  <p className="text-muted-foreground text-[11px]">{r.z}</p>
                </div>
                <Badge className={`border-0 text-[10px] ${toneBadge[r.t]}`}>Dispatch</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="surface-card mt-4 p-4">
        <h2 className="font-semibold">Resource inventory</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r) => (
            <div key={r.name} className="rounded-xl border p-3">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold">{r.name}</p>
                <Badge className={`border-0 text-[10px] ${toneBadge[r.tone]}`}>{r.stock}%</Badge>
              </div>
              <Progress value={r.stock} className="mt-2 h-1.5" />
              <div className="text-muted-foreground mt-2 flex justify-between text-[11px]">
                <span>{r.consumption}</span>
                <span>{r.forecast}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
