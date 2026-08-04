import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/vari/app-shell";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Command Centre · VARI-SENSE" },
      { name: "description", content: "Live Wari operations: crowd AI, maps, emergencies, resources and analytics." },
    ],
  }),
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});
