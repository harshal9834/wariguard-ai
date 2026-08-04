import { createFileRoute } from "@tanstack/react-router";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { PageHeader } from "@/components/vari/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/reports")({
  head: () => ({
    meta: [
      { title: "Reports · VARI-SENSE" },
      {
        name: "description",
        content:
          "Daily, crowd, emergency, volunteer, medical and resource reports in PDF or Excel.",
      },
    ],
  }),
  component: Reports,
});

const reports = [
  { t: "Daily Operations Report", d: "Consolidated summary for Day 12", size: "2.4 MB" },
  { t: "Crowd Analysis Report", d: "Density, choke points and flow rates", size: "3.1 MB" },
  { t: "Emergency Report", d: "All incidents, response times and outcomes", size: "1.8 MB" },
  { t: "Volunteer Report", d: "Attendance, tasks and performance scores", size: "1.2 MB" },
  { t: "Medical Report", d: "Patients, triage mix and inventory burn", size: "2.0 MB" },
  { t: "Resource Usage Report", d: "Water, food, kits and vehicle utilisation", size: "1.6 MB" },
];

function Reports() {
  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Auto-generated at 06:00, 14:00 and 22:00 IST"
        actions={<Badge variant="outline">Retention 5 years</Badge>}
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <div key={r.t} className="surface-card p-4">
            <span className="bg-navy/10 text-navy grid size-10 place-items-center rounded-xl">
              <FileText className="size-5" />
            </span>
            <h3 className="mt-3 text-[14px] font-semibold">{r.t}</h3>
            <p className="text-muted-foreground mt-1 text-[12px]">{r.d}</p>
            <p className="text-muted-foreground mt-2 text-[10px]">Generated 18:00 · {r.size}</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 gap-1.5">
                <Download className="size-3.5" /> PDF
              </Button>
              <Button size="sm" variant="outline" className="flex-1 gap-1.5">
                <FileSpreadsheet className="size-3.5" /> Excel
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
