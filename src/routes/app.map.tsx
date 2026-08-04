import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layers, Navigation, Route as RouteIcon, Satellite } from "lucide-react";
import { PageHeader } from "@/components/vari/app-shell";
import { MapCanvas } from "@/components/vari/map-canvas";
import { AIPanel } from "@/components/vari/ai-panel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/app/map")({
  head: () => ({
    meta: [
      { title: "Live Map · VARI-SENSE" },
      {
        name: "description",
        content: "Crowd heatmap, GPS tracks, camps, closures and AI suggested safe routes.",
      },
    ],
  }),
  component: LiveMap,
});

const layers = [
  "Crowd Density Heatmap",
  "Moving Pilgrim Routes",
  "Live GPS Locations",
  "Medical Camps",
  "Police Stations",
  "Water Stations",
  "Food Distribution",
  "Washrooms",
  "Parking Areas",
  "Emergency Zones",
  "Road Closures",
  "AI Safe Routes",
];

function LiveMap() {
  const [heat, setHeat] = useState(true);
  const [route, setRoute] = useState(true);

  return (
    <>
      <PageHeader
        title="Live Map"
        subtitle="Real-time geospatial view of the Wari corridor"
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Satellite className="size-4" /> Satellite
            </Button>
            <Button size="sm" className="gap-1.5">
              <Navigation className="size-4" /> Recentre
            </Button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-4">
        <div className="surface-card p-4">
          <p className="flex items-center gap-1.5 text-sm font-semibold">
            <Layers className="size-4" /> Map layers
          </p>
          <div className="mt-3 space-y-2.5">
            {layers.map((l, i) => (
              <div key={l} className="flex items-center justify-between gap-2">
                <Label htmlFor={`l-${i}`} className="text-[12px] font-normal">
                  {l}
                </Label>
                <Switch
                  id={`l-${i}`}
                  defaultChecked={i !== 8 && i !== 7}
                  onCheckedChange={(v) => {
                    if (i === 0) setHeat(v);
                    if (i === 11) setRoute(v);
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-2">
          <MapCanvas className="h-[560px]" showHeatmap={heat} showRoute={route} />
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { l: "Tracked devices", v: "12,480" },
              { l: "Avg. walking speed", v: "3.4 km/h" },
              { l: "Route deviation", v: "2.1%" },
              { l: "Drone coverage", v: "96%" },
            ].map((s) => (
              <div key={s.l} className="surface-card p-3">
                <p className="text-muted-foreground text-[10px] uppercase">{s.l}</p>
                <p className="mt-0.5 font-bold">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="surface-card p-4">
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              <RouteIcon className="size-4" /> AI suggested safe routes
            </p>
            <div className="mt-3 space-y-2">
              {[
                { n: "Ring Road B", d: "Diverts 18,000 pilgrims", t: "+6 min", tone: "success" },
                { n: "Canal Path C", d: "Bypasses bridge choke", t: "+11 min", tone: "warning" },
                { n: "Village Link D", d: "Emergency vehicles only", t: "+3 min", tone: "danger" },
              ].map((r) => (
                <div key={r.n} className="bg-muted/50 rounded-lg p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold">{r.n}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {r.t}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mt-0.5 text-[11px]">{r.d}</p>
                </div>
              ))}
            </div>
          </div>
          <AIPanel floating />
        </div>
      </div>
    </>
  );
}
