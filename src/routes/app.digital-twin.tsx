import { createFileRoute } from "@tanstack/react-router";
import { Orbit, Play, Timer } from "lucide-react";
import { PageHeader } from "@/components/vari/app-shell";
import { MapCanvas } from "@/components/vari/map-canvas";
import { AIPanel } from "@/components/vari/ai-panel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/app/digital-twin")({
  head: () => ({
    meta: [
      { title: "Wari Digital Twin · VARI-SENSE" },
      {
        name: "description",
        content: "Live crowd simulation, resource movement and emergency scenario forecasting.",
      },
    ],
  }),
  component: DigitalTwin,
});

function DigitalTwin() {
  return (
    <>
      <PageHeader
        title="Wari Digital Twin"
        subtitle="Simulate crowd flow, resources and emergencies before they happen"
        actions={
          <>
            <Badge variant="outline" className="gap-1.5">
              <Orbit className="size-3.5" /> Sim v3.2
            </Badge>
            <Button size="sm" className="gap-1.5">
              <Play className="size-4" /> Run simulation
            </Button>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="surface-card overflow-hidden">
            <MapCanvas className="h-[420px] rounded-none border-0" />
            <div className="border-t p-4">
              <div className="flex items-center gap-2 text-xs font-medium">
                <Timer className="size-4" /> Timeline forecast · T+45 minutes
              </div>
              <Slider defaultValue={[45]} max={180} step={5} className="mt-3" />
              <div className="text-muted-foreground mt-1.5 flex justify-between text-[10px]">
                <span>Now</span>
                <span>+1 h</span>
                <span>+2 h</span>
                <span>+3 h</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { l: "Simulated pilgrims", v: "1.94 M" },
              { l: "Agents per second", v: "48,000" },
              { l: "Scenario branches", v: "12" },
              { l: "Model confidence", v: "93.1%" },
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
            <h2 className="font-semibold">Scenario library</h2>
            <div className="mt-3 space-y-2">
              {[
                { n: "Heavy rain at Wakhri", i: "Shelter demand +62%" },
                { n: "Bridge closure", i: "Reroute 24,000 pilgrims" },
                { n: "Ringan surge", i: "Density 96% for 22 min" },
                { n: "Ambulance shortage", i: "Response 6 → 14 min" },
              ].map((s) => (
                <button
                  key={s.n}
                  className="bg-muted/40 hover:bg-muted w-full rounded-lg p-2.5 text-left"
                >
                  <p className="text-[13px] font-medium">{s.n}</p>
                  <p className="text-muted-foreground text-[11px]">{s.i}</p>
                </button>
              ))}
            </div>
          </div>
          <AIPanel floating />
        </div>
      </div>
    </>
  );
}
