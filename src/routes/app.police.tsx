import { createFileRoute } from "@tanstack/react-router";
import { Eye, PhoneCall, Plane, Shield, TrafficCone, TriangleAlert } from "lucide-react";
import { PageHeader } from "@/components/vari/app-shell";
import { StatCard } from "@/components/vari/stat-card";
import { MapCanvas } from "@/components/vari/map-canvas";
import { AIPanel } from "@/components/vari/ai-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { policeUnits } from "@/lib/wari-data";

export const Route = createFileRoute("/app/police")({
  head: () => ({
    meta: [
      { title: "Police Command · VARI-SENSE" },
      { name: "description", content: "Crowd alerts, barricade status, road closures, drone feeds and incident reports." },
    ],
  }),
  component: Police,
});

function Police() {
  return (
    <>
      <PageHeader
        title="Police Command"
        subtitle="504 units deployed · 12 drones airborne · 6 active closures"
        actions={<Button size="sm" variant="destructive" className="gap-1.5"><TriangleAlert className="size-4" /> Raise alert</Button>}
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Crowd Alerts" value="14" delta="+3" tone="danger" icon={TriangleAlert} seed={2} />
        <StatCard label="Barricades Active" value="186" delta="+12" up tone="navy" icon={Shield} seed={4} />
        <StatCard label="Road Closures" value="6" delta="2 new" tone="warning" icon={TrafficCone} seed={6} />
        <StatCard label="Emergency Calls" value="92" delta="-8" up tone="success" icon={PhoneCall} seed={8} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <div className="surface-card p-4 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-1.5 font-semibold">
              <Plane className="size-4" /> Drone surveillance feed
            </h2>
            <Badge variant="destructive" className="gap-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-white" /> LIVE
            </Badge>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {["DRN-01 · Alandi Ghat", "DRN-02 · Wakhri Ringan", "DRN-05 · NH-965", "DRN-08 · Jejuri Camp"].map((d) => (
              <div key={d} className="overflow-hidden rounded-xl border">
                <div className="relative h-32 bg-gradient-to-br from-[oklch(0.32_0.05_265)] to-[oklch(0.18_0.03_265)]">
                  <div className="animate-sweep absolute inset-y-0 w-1/3 bg-white/10" />
                  <span className="absolute top-2 left-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] font-semibold text-white">{d}</span>
                  <span className="absolute right-2 bottom-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white">Alt 120 m</span>
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-6 font-semibold">Deployed units</h2>
          <Table className="mt-2">
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Strength</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policeUnits.map((u) => (
                <TableRow key={u.unit}>
                  <TableCell className="text-xs font-medium">{u.unit}</TableCell>
                  <TableCell className="text-xs">{u.zone}</TableCell>
                  <TableCell className="text-xs">{u.strength}</TableCell>
                  <TableCell>
                    <Badge variant={u.status === "Standby" ? "secondary" : "default"} className="text-[10px]">{u.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-4">
          <AIPanel />
          <div className="surface-card p-4">
            <h2 className="flex items-center gap-1.5 font-semibold">
              <Eye className="size-4" /> Suspicious activity
            </h2>
            <div className="mt-3 space-y-2">
              {[
                { t: "Unattended bag near Gate 2", s: "Under review" },
                { t: "Unauthorised drone detected", s: "Intercepted" },
                { t: "Ticket-touting cluster at P-4", s: "Team dispatched" },
              ].map((i) => (
                <div key={i.t} className="bg-muted/40 rounded-lg p-2.5">
                  <p className="text-[13px] font-medium">{i.t}</p>
                  <p className="text-muted-foreground text-[11px]">{i.s}</p>
                </div>
              ))}
            </div>
          </div>
          <MapCanvas className="h-56" showRoute={false} />
        </div>
      </div>
    </>
  );
}
