import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Ambulance, Dog, Flame, MapPin, Search, Siren, TrafficCone, Users, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/vari/app-shell";
import { MapCanvas } from "@/components/vari/map-canvas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { emergencies } from "@/lib/wari-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency Management · VARI-SENSE" },
      { name: "description", content: "Medical, fire, stampede, lost person, road block, flood and animal incident response." },
    ],
  }),
  component: EmergencyPage,
});

const typeIcon: Record<string, LucideIcon> = {
  Medical: Ambulance,
  Fire: Flame,
  Stampede: Users,
  "Lost Person": Search,
  "Road Block": TrafficCone,
  Flood: Waves,
  "Animal Incident": Dog,
};

const categories = ["All", "Medical", "Fire", "Stampede", "Lost Person", "Road Block", "Flood", "Animal Incident"];

function EmergencyPage() {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? emergencies : emergencies.filter((e) => e.type === cat);

  return (
    <>
      <PageHeader
        title="Emergency Management"
        subtitle="27 open incidents · average dispatch time 48 seconds"
        actions={
          <Button size="sm" variant="destructive" className="gap-1.5">
            <Siren className="size-4" /> SOS broadcast
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              cat === c ? "border-saffron bg-saffron/15 text-saffron" : "hover:bg-muted",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-3 xl:col-span-2">
          {list.map((e) => {
            const Icon = typeIcon[e.type] ?? Siren;
            return (
              <div key={e.id} className="surface-card p-4">
                <div className="flex flex-wrap items-start gap-3">
                  <span
                    className={cn(
                      "grid size-10 place-items-center rounded-xl",
                      e.status === "Resolved" ? "bg-success/15 text-success" : "bg-danger/15 text-danger",
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-48 flex-1">
                    <p className="font-semibold">
                      {e.type} <span className="text-muted-foreground text-xs font-normal">· {e.id}</span>
                    </p>
                    <p className="text-muted-foreground flex items-center gap-1 text-xs">
                      <MapPin className="size-3" /> {e.location} · raised {e.raised}
                    </p>
                  </div>
                  <Badge variant={e.priority === "Critical" ? "destructive" : "secondary"}>{e.priority}</Badge>
                  <Badge variant="outline">{e.status}</Badge>
                </div>

                <div className="mt-3 grid gap-3 text-xs sm:grid-cols-4">
                  <div className="bg-muted/40 rounded-lg p-2.5">
                    <p className="text-muted-foreground text-[10px] uppercase">Assigned team</p>
                    <p className="mt-0.5 font-semibold">{e.team}</p>
                  </div>
                  <div className="bg-muted/40 rounded-lg p-2.5">
                    <p className="text-muted-foreground text-[10px] uppercase">ETA</p>
                    <p className="mt-0.5 font-semibold">{e.eta}</p>
                  </div>
                  <div className="bg-muted/40 rounded-lg p-2.5">
                    <p className="text-muted-foreground text-[10px] uppercase">Live tracking</p>
                    <p className="text-success mt-0.5 font-semibold">Streaming</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="flex-1">Track</Button>
                    <Button size="sm" className="flex-1" disabled={e.status === "Resolved"}>
                      {e.status === "Resolved" ? "Closed" : "Resolve"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="surface-card p-4">
            <h2 className="font-semibold">Incident map</h2>
            <MapCanvas className="mt-3 h-64" />
          </div>
          <div className="surface-card p-4">
            <h2 className="font-semibold">Escalation protocol</h2>
            <ol className="text-muted-foreground mt-3 space-y-2 text-[12px]">
              {[
                "Auto-detect via CV / SOS / call",
                "AI severity scoring + nearest unit match",
                "Dispatch with live navigation",
                "Command centre supervision",
                "Resolution + report generation",
              ].map((s, i) => (
                <li key={s} className="flex gap-2">
                  <span className="bg-navy/10 text-navy grid size-5 shrink-0 place-items-center rounded-full text-[10px] font-bold">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
