import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/vari/app-shell";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings · VARI-SENSE" },
      {
        name: "description",
        content:
          "Language, theme, notifications, voice assistant, accessibility and location permissions.",
      },
    ],
  }),
  component: Settings,
});

const groups = [
  { t: "Language", items: ["Marathi (मराठी)", "Hindi (हिंदी)", "English"], type: "lang" },
  {
    t: "Notifications",
    items: ["Push notifications", "SMS alerts", "WhatsApp alerts", "Voice alerts"],
    type: "switch",
  },
  {
    t: "Voice Assistant",
    items: ["Always-on wake word", "Offline voice mode", "Hands-free navigation"],
    type: "switch",
  },
  {
    t: "Accessibility",
    items: ["High contrast mode", "Large text", "Screen reader hints", "Reduced motion"],
    type: "switch",
  },
  {
    t: "Permissions",
    items: ["Location access", "Background tracking", "Camera for QR", "Microphone"],
    type: "switch",
  },
];

function Settings() {
  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Personalise the command centre and field experience"
        actions={<Button size="sm">Save changes</Button>}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {groups.map((g) => (
          <div key={g.t} className="surface-card p-4">
            <h2 className="font-semibold">{g.t}</h2>
            <div className="mt-3 space-y-3">
              {g.items.map((i, idx) =>
                g.type === "lang" ? (
                  <button
                    key={i}
                    className={`w-full rounded-lg border px-3 py-2 text-left text-[13px] ${idx === 2 ? "border-saffron bg-saffron/10 text-saffron font-medium" : "hover:bg-muted"}`}
                  >
                    {i}
                  </button>
                ) : (
                  <div key={i} className="flex items-center justify-between">
                    <Label className="text-[13px] font-normal">{i}</Label>
                    <Switch defaultChecked={idx < 2} />
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
