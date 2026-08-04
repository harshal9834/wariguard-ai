import { Brain, ChevronRight, Sparkle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { aiRecommendations, predictions } from "@/lib/wari-data";
import { cn } from "@/lib/utils";

const riskTone: Record<string, string> = {
  Low: "bg-success/15 text-success",
  Medium: "bg-warning/25 text-warning-foreground",
  High: "bg-saffron/20 text-saffron",
  Critical: "bg-danger/15 text-danger",
};

export function AIPanel({ className, floating = false }: { className?: string; floating?: boolean }) {
  return (
    <div
      className={cn(
        floating ? "glass rounded-2xl" : "surface-card",
        "p-4",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="gradient-navy grid size-8 place-items-center rounded-lg text-white">
            <Brain className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold">AI Prediction Engine</p>
            <p className="text-muted-foreground text-[11px]">Updated 12 seconds ago</p>
          </div>
        </div>
        <Badge className="bg-danger/15 text-danger border-0">Risk: High</Badge>
      </div>

      <div className="mt-4 space-y-3">
        {predictions.map((p) => (
          <div key={p.window}>
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">{p.window}</span>
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", riskTone[p.risk])}>
                {p.risk}
              </span>
            </div>
            <Progress value={p.density} className="mt-1.5 h-1.5" />
            <p className="text-muted-foreground mt-1 text-[11px]">{p.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 border-t pt-3">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold">
          <Sparkle className="text-saffron size-3.5" /> AI Recommendations
        </p>
        <div className="space-y-2">
          {aiRecommendations.map((r) => (
            <div key={r.action} className="bg-muted/50 rounded-lg p-2.5">
              <p className="text-[12px] leading-snug font-medium">{r.action}</p>
              <div className="text-muted-foreground mt-1 flex items-center justify-between text-[10px]">
                <span>{r.impact}</span>
                <span className="text-success font-semibold">{r.confidence}%</span>
              </div>
            </div>
          ))}
        </div>
        <Button size="sm" className="mt-3 w-full gap-1">
          Apply all recommendations <ChevronRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
