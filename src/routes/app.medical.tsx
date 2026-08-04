import { createFileRoute } from "@tanstack/react-router";
import { Ambulance, Droplet, HeartPulse, Hospital, Stethoscope } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/vari/app-shell";
import { StatCard } from "@/components/vari/stat-card";
import { MapCanvas } from "@/components/vari/map-canvas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { bloodBank, inventory, patients, responseTime } from "@/lib/wari-data";

export const Route = createFileRoute("/app/medical")({
  head: () => ({
    meta: [
      { title: "Medical Command · VARI-SENSE" },
      { name: "description", content: "Patients, ambulances, hospital availability, medicine inventory and blood requirements." },
    ],
  }),
  component: Medical,
});

const triageTone: Record<string, string> = {
  Red: "bg-danger/15 text-danger",
  Yellow: "bg-warning/25 text-warning-foreground",
  Green: "bg-success/15 text-success",
};

function Medical() {
  return (
    <>
      <PageHeader
        title="Medical Command"
        subtitle="312 teams · 148 ambulances · 26 field hospitals"
        actions={
          <Button size="sm" className="gap-1.5">
            <Ambulance className="size-4" /> Dispatch ambulance
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Active Patients" value="418" delta="+23" tone="danger" icon={HeartPulse} seed={3} />
        <StatCard label="Nearby Ambulances" value="21" delta="-4" tone="saffron" icon={Ambulance} seed={5} />
        <StatCard label="Hospital Beds Free" value="1,244" delta="-86" tone="navy" icon={Hospital} seed={7} />
        <StatCard label="Avg. Response Time" value="6.2 min" delta="-1.1" up tone="success" icon={Stethoscope} seed={2} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <div className="surface-card p-4 xl:col-span-2">
          <h2 className="font-semibold">Patient tracking</h2>
          <Table className="mt-2">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Triage</TableHead>
                <TableHead>Camp</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="text-xs font-medium">{p.id}</TableCell>
                  <TableCell className="text-xs">
                    {p.name} <span className="text-muted-foreground">· {p.age}</span>
                  </TableCell>
                  <TableCell className="text-xs">{p.issue}</TableCell>
                  <TableCell>
                    <Badge className={`border-0 text-[10px] ${triageTone[p.triage]}`}>{p.triage}</Badge>
                  </TableCell>
                  <TableCell className="text-xs">{p.camp}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">Track</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <h2 className="mt-6 font-semibold">Response time trend (minutes)</h2>
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12, border: "1px solid var(--border)", background: "var(--card)" }} />
                <Line type="monotone" dataKey="medical" name="Medical" stroke="var(--success)" strokeWidth={2} />
                <Line type="monotone" dataKey="police" name="Police" stroke="var(--navy)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="surface-card p-4">
            <h2 className="font-semibold">Live ambulance locations</h2>
            <MapCanvas className="mt-3 h-48" showHeatmap={false} />
          </div>

          <div className="surface-card p-4">
            <h2 className="font-semibold">Medicine inventory</h2>
            <div className="mt-3 space-y-2.5">
              {inventory.map((i) => {
                const pct = Math.min(100, Math.round((i.stock / (i.min * 1.8)) * 100));
                return (
                  <div key={i.item}>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">{i.item}</span>
                      <span className={i.stock < i.min ? "text-danger font-semibold" : "text-muted-foreground"}>
                        {i.stock.toLocaleString()} {i.unit}
                      </span>
                    </div>
                    <Progress value={pct} className="mt-1 h-1.5" />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="surface-card p-4">
            <h2 className="flex items-center gap-1.5 font-semibold">
              <Droplet className="text-danger size-4" /> Blood requirement
            </h2>
            <div className="mt-3 grid grid-cols-5 gap-2 text-center">
              {bloodBank.map((b) => (
                <div key={b.group} className="bg-muted/50 rounded-lg p-2">
                  <p className="text-danger text-sm font-bold">{b.group}</p>
                  <p className="text-muted-foreground text-[10px]">{b.units} units</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
