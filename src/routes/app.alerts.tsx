import { createFileRoute } from "@tanstack/react-router";
import { Bell, MessageSquare, Radio, Smartphone, Volume2 } from "lucide-react";
import { PageHeader } from "@/components/vari/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { alerts, notifications } from "@/lib/wari-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/alerts")({
  head: () => ({
    meta: [
      { title: "Alert Centre · VARI-SENSE" },
      {
        name: "description",
        content:
          "Critical, medium and resolved alerts with push, SMS, WhatsApp and voice delivery.",
      },
    ],
  }),
  component: Alerts,
});

const levelTone: Record<string, string> = {
  Critical: "bg-danger text-danger-foreground",
  Medium: "bg-warning text-warning-foreground",
  Resolved: "bg-success text-success-foreground",
};

function Timeline({ filter }: { filter?: string }) {
  const list = filter ? alerts.filter((a) => a.level === filter) : alerts;
  return (
    <div className="relative mt-4 pl-6">
      <span className="bg-border absolute top-2 bottom-2 left-2 w-px" />
      <div className="space-y-4">
        {list.map((a) => (
          <div key={a.id} className="relative">
            <span
              className={cn(
                "absolute top-1.5 -left-[18px] size-2.5 rounded-full",
                levelTone[a.level],
              )}
            />
            <div className="surface-card p-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={cn("border-0 text-[10px]", levelTone[a.level])}>{a.level}</Badge>
                <p className="text-[13px] font-semibold">{a.title}</p>
                <span className="text-muted-foreground ml-auto text-[11px]">{a.time}</span>
              </div>
              <p className="text-muted-foreground mt-1.5 text-[12px]">{a.detail}</p>
              <p className="text-muted-foreground mt-2 text-[10px]">Delivered via {a.channel}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Alerts() {
  return (
    <>
      <PageHeader
        title="Alert & Notification Centre"
        subtitle="Multi-channel dissemination to 2.4 million registered devices"
        actions={
          <Button size="sm" className="gradient-saffron border-0 text-white">
            Broadcast alert
          </Button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="surface-card p-4 xl:col-span-2">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Critical">Critical</TabsTrigger>
              <TabsTrigger value="Medium">Medium</TabsTrigger>
              <TabsTrigger value="Resolved">Resolved</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <Timeline />
            </TabsContent>
            <TabsContent value="Critical">
              <Timeline filter="Critical" />
            </TabsContent>
            <TabsContent value="Medium">
              <Timeline filter="Medium" />
            </TabsContent>
            <TabsContent value="Resolved">
              <Timeline filter="Resolved" />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <div className="surface-card p-4">
            <h2 className="font-semibold">Delivery channels</h2>
            <div className="mt-3 space-y-2">
              {[
                { icon: Smartphone, n: "Push notification", v: "2.4 M devices" },
                { icon: MessageSquare, n: "SMS gateway", v: "1.8 M numbers" },
                { icon: Radio, n: "WhatsApp agent", v: "940 K chats" },
                { icon: Volume2, n: "Voice alerts", v: "312 speakers" },
              ].map((c) => (
                <div key={c.n} className="bg-muted/40 flex items-center gap-3 rounded-lg p-2.5">
                  <c.icon className="text-navy size-4" />
                  <div className="flex-1">
                    <p className="text-[13px] font-medium">{c.n}</p>
                    <p className="text-muted-foreground text-[10px]">{c.v}</p>
                  </div>
                  <Badge className="bg-success/15 text-success border-0 text-[10px]">Online</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-4">
            <h2 className="flex items-center gap-1.5 font-semibold">
              <Bell className="size-4" /> Real-time notifications
            </h2>
            <div className="mt-3 space-y-2.5">
              {notifications.map((n) => (
                <div key={n.text} className="flex items-start gap-2">
                  <span className="bg-saffron mt-1.5 size-1.5 shrink-0 rounded-full" />
                  <div>
                    <p className="text-[12px] leading-snug">{n.text}</p>
                    <p className="text-muted-foreground text-[10px]">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
