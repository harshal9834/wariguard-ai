import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { spark } from "@/lib/wari-data";

const toneMap: Record<string, { chip: string; stroke: string }> = {
  saffron: { chip: "bg-saffron/15 text-saffron", stroke: "var(--saffron)" },
  navy: { chip: "bg-navy/12 text-navy", stroke: "var(--navy)" },
  success: { chip: "bg-success/15 text-success", stroke: "var(--success)" },
  warning: { chip: "bg-warning/20 text-warning-foreground", stroke: "var(--warning)" },
  danger: { chip: "bg-danger/15 text-danger", stroke: "var(--danger)" },
};

export function StatCard({
  label,
  value,
  delta,
  up,
  tone = "navy",
  icon: Icon,
  seed = 3,
}: {
  label: string;
  value: string;
  delta?: string;
  up?: boolean;
  tone?: string;
  icon: LucideIcon;
  seed?: number;
}) {
  const t = toneMap[tone] ?? toneMap['navy']!;
  const data = spark(seed);

  return (
    <div className="surface-card group relative overflow-hidden p-4 transition-shadow hover:shadow-[var(--shadow-lift)]">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">{label}</p>
          <p className="mt-1.5 text-2xl font-bold tabular-nums">{value}</p>
        </div>
        <span className={cn("grid size-9 shrink-0 place-items-center rounded-xl", t.chip)}>
          <Icon className="size-[18px]" />
        </span>
      </div>
      {delta && (
        <div className="mt-2 flex items-center gap-1 text-xs font-medium">
          {up ? (
            <ArrowUpRight className="text-success size-3.5" />
          ) : (
            <ArrowDownRight className="text-danger size-3.5" />
          )}
          <span className={up ? "text-success" : "text-danger"}>{delta}</span>
          <span className="text-muted-foreground">vs last hour</span>
        </div>
      )}
      <div className="mt-2 h-10 opacity-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={`sp-${label.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={t.stroke} stopOpacity={0.35} />
                <stop offset="100%" stopColor={t.stroke} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={t.stroke}
              strokeWidth={2}
              fill={`url(#sp-${label.replace(/\s/g, "")})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
