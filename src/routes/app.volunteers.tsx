import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  CheckCircle2,
  Mic,
  QrCode,
  Upload,
  Navigation,
  HeartHandshake,
  ListTodo,
} from "lucide-react";
import { PageHeader } from "@/components/vari/app-shell";
import { StatCard } from "@/components/vari/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tasks, volunteers } from "@/lib/wari-data";

export const Route = createFileRoute("/app/volunteers")({
  head: () => ({
    meta: [
      { title: "Volunteers · SevaOS · VARI-SENSE" },
      {
        name: "description",
        content: "Task allocation, QR attendance, performance and leaderboard for Wari volunteers.",
      },
    ],
  }),
  component: Volunteers,
});

function Volunteers() {
  return (
    <>
      <PageHeader
        title="SevaOS · Volunteer Operations"
        subtitle="AI scheduling, QR attendance and field task allocation"
        actions={
          <>
            <Button variant="outline" size="sm" className="gap-1.5">
              <QrCode className="size-4" /> QR check-in
            </Button>
            <Button size="sm">Assign task</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Active Volunteers"
          value="2,514"
          delta="+112"
          up
          tone="navy"
          icon={HeartHandshake}
          seed={2}
        />
        <StatCard
          label="Open Tasks"
          value="86"
          delta="-14"
          up
          tone="saffron"
          icon={ListTodo}
          seed={5}
        />
        <StatCard
          label="Tasks Completed Today"
          value="1,942"
          delta="+18%"
          up
          tone="success"
          icon={CheckCircle2}
          seed={8}
        />
        <StatCard
          label="Avg. Performance"
          value="91.4"
          delta="+2.1"
          up
          tone="success"
          icon={Award}
          seed={3}
        />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-3">
        <div className="surface-card p-4 xl:col-span-2">
          <Tabs defaultValue="tasks">
            <TabsList>
              <TabsTrigger value="tasks">Assigned tasks</TabsTrigger>
              <TabsTrigger value="nearby">Nearby requests</TabsTrigger>
              <TabsTrigger value="report">Field reporting</TabsTrigger>
            </TabsList>

            <TabsContent value="tasks" className="mt-4 space-y-2">
              {tasks.map((t) => (
                <div
                  key={t.id}
                  className="bg-muted/40 flex flex-wrap items-center gap-3 rounded-xl p-3"
                >
                  <div className="min-w-48 flex-1">
                    <p className="text-[13px] font-semibold">{t.title}</p>
                    <p className="text-muted-foreground text-[11px]">
                      {t.id} · {t.zone}
                    </p>
                  </div>
                  <Badge variant={t.priority === "Critical" ? "destructive" : "secondary"}>
                    {t.priority}
                  </Badge>
                  <span className="text-xs font-medium">ETA {t.eta}</span>
                  <Button size="sm" variant="outline" className="gap-1.5">
                    <Navigation className="size-3.5" /> Navigate
                  </Button>
                  <Button size="sm">Accept</Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="nearby" className="mt-4 space-y-2">
              {[
                { t: "Pilgrim needs wheelchair support", d: "220 m away · Gate 2" },
                { t: "Elderly group lost from batch 14", d: "480 m away · Camp 3" },
                { t: "Spilled water blocking path", d: "700 m away · Ring Road B" },
              ].map((n) => (
                <div
                  key={n.t}
                  className="bg-muted/40 flex items-center justify-between gap-3 rounded-xl p-3"
                >
                  <div>
                    <p className="text-[13px] font-semibold">{n.t}</p>
                    <p className="text-muted-foreground text-[11px]">{n.d}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Respond
                  </Button>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="report" className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Upload, t: "Upload incident photo", d: "Auto-tagged with GPS + zone" },
                { icon: Mic, t: "Voice report", d: "Speech-to-text in Marathi/Hindi" },
                { icon: QrCode, t: "QR attendance", d: "Check-in / check-out at camps" },
              ].map((c) => (
                <button
                  key={c.t}
                  className="surface-card p-4 text-left transition-transform hover:-translate-y-0.5"
                >
                  <span className="bg-saffron/15 text-saffron grid size-10 place-items-center rounded-xl">
                    <c.icon className="size-5" />
                  </span>
                  <p className="mt-2.5 text-[13px] font-semibold">{c.t}</p>
                  <p className="text-muted-foreground text-[11px]">{c.d}</p>
                </button>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="surface-card p-4">
          <h2 className="flex items-center gap-1.5 font-semibold">
            <Award className="text-saffron size-4" /> Volunteer leaderboard
          </h2>
          <div className="mt-3 space-y-3">
            {volunteers.map((v, i) => (
              <div key={v.name} className="flex items-center gap-3">
                <span className="text-muted-foreground w-4 text-xs font-bold">{i + 1}</span>
                <Avatar className="size-8">
                  <AvatarFallback className="bg-navy/10 text-navy text-[11px]">
                    {v.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{v.name}</p>
                  <p className="text-muted-foreground text-[10px]">
                    {v.zone} · {v.tasks} tasks
                  </p>
                  <Progress value={v.score} className="mt-1 h-1" />
                </div>
                <Badge variant="outline" className="text-[10px]">
                  {v.score}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
