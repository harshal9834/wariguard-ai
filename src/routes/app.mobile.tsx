import { createFileRoute } from "@tanstack/react-router";
import { Bot, Home, Map, Siren, User } from "lucide-react";
import { PageHeader } from "@/components/vari/app-shell";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/mobile")({
  head: () => ({
    meta: [
      { title: "Mobile App Screens · VARI-SENSE" },
      { name: "description", content: "Android pilgrim and volunteer app screens: splash, home, map, emergency, AI and profile." },
    ],
  }),
  component: MobileScreens,
});

const screens = [
  { t: "Splash", b: ["VARI-SENSE", "Predict • Coordinate • Protect"] },
  { t: "Login", b: ["Mobile number", "OTP verification", "Google sign-in"] },
  { t: "Home", b: ["Nearby help", "Crowd status: High", "Today's route", "SOS button"] },
  { t: "Live Map", b: ["Heatmap", "Camps & water", "Safe route"] },
  { t: "Emergency", b: ["Medical", "Lost person", "Fire", "Road block"] },
  { t: "Report Incident", b: ["Photo upload", "Voice note", "Auto GPS tag"] },
  { t: "AI Assistant", b: ["VariMitra chat", "Voice mode", "Marathi / Hindi"] },
  { t: "Volunteer Tasks", b: ["Accept task", "Navigate", "QR attendance"] },
  { t: "Nearby Help", b: ["Medical camp 400 m", "Water 220 m", "Food 600 m"] },
  { t: "Profile", b: ["Batch 14", "Emergency contacts", "Health card"] },
  { t: "Settings", b: ["Language", "Offline mode", "Accessibility"] },
];

function MobileScreens() {
  return (
    <>
      <PageHeader title="Mobile App" subtitle="Android pilgrim & volunteer companion" actions={<Badge variant="outline">11 screens</Badge>} />
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {screens.map((s) => (
          <div key={s.t} className="surface-card overflow-hidden p-3">
            <div className="bg-muted/50 rounded-[1.6rem] border p-2">
              <div className="bg-card flex h-72 flex-col rounded-[1.2rem] border p-3">
                <div className="text-muted-foreground flex items-center justify-between text-[9px]">
                  <span>9:41</span>
                  <span>4G · 82%</span>
                </div>
                <p className="text-saffron mt-2 text-[11px] font-bold">VARI-SENSE</p>
                <p className="text-[13px] font-semibold">{s.t}</p>
                <div className="mt-2 flex-1 space-y-1.5">
                  {s.b.map((b) => (
                    <div key={b} className="bg-muted/60 rounded-lg px-2 py-1.5 text-[10px]">{b}</div>
                  ))}
                </div>
                <div className="text-muted-foreground mt-2 flex justify-between border-t pt-2">
                  {[Home, Map, Siren, Bot, User].map((I, i) => (
                    <I key={i} className={i === 0 ? "text-saffron size-3.5" : "size-3.5"} />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-2 text-center text-[11px] font-medium">{s.t}</p>
          </div>
        ))}
      </div>
    </>
  );
}
