import {
  Ambulance,
  Car,
  Droplets,
  Flame,
  Shield,
  Toilet,
  TrafficCone,
  Utensils,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { mapMarkers } from "@/lib/wari-data";
import { cn } from "@/lib/utils";

const kindMeta: Record<string, { icon: LucideIcon; cls: string; ring?: boolean }> = {
  medical: { icon: Ambulance, cls: "bg-success text-success-foreground" },
  police: { icon: Shield, cls: "bg-navy text-navy-foreground" },
  water: { icon: Droplets, cls: "bg-sky-500 text-white" },
  food: { icon: Utensils, cls: "bg-saffron text-saffron-foreground" },
  rest: { icon: Toilet, cls: "bg-muted text-foreground" },
  parking: { icon: Car, cls: "bg-slate-600 text-white" },
  emergency: { icon: Flame, cls: "bg-danger text-danger-foreground", ring: true },
  closure: { icon: TrafficCone, cls: "bg-warning text-warning-foreground" },
};

export function MapCanvas({
  className,
  showHeatmap = true,
  showRoute = true,
}: {
  className?: string;
  showHeatmap?: boolean;
  showRoute?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-[oklch(0.97_0.01_150)] dark:bg-[oklch(0.22_0.03_265)]",
        className,
      )}
    >
      {/* base terrain */}
      <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M5 0 L0 0 0 5" fill="none" stroke="oklch(0.5 0.02 250 / 12%)" strokeWidth="0.2" />
          </pattern>
          <radialGradient id="hot">
            <stop offset="0%" stopColor="oklch(0.6 0.24 25 / 62%)" />
            <stop offset="60%" stopColor="oklch(0.78 0.18 60 / 32%)" />
            <stop offset="100%" stopColor="oklch(0.8 0.16 84 / 0%)" />
          </radialGradient>
          <radialGradient id="warm">
            <stop offset="0%" stopColor="oklch(0.8 0.16 84 / 45%)" />
            <stop offset="100%" stopColor="oklch(0.8 0.16 84 / 0%)" />
          </radialGradient>
          <radialGradient id="cool">
            <stop offset="0%" stopColor="oklch(0.72 0.18 149 / 40%)" />
            <stop offset="100%" stopColor="oklch(0.72 0.18 149 / 0%)" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        {/* rivers / fields */}
        <path d="M-2 68 C 20 60, 34 78, 55 70 S 88 56, 104 64" fill="none" stroke="oklch(0.75 0.09 230 / 40%)" strokeWidth="2.4" />
        {/* roads */}
        <path d="M-2 88 L104 12" stroke="oklch(0.55 0.02 250 / 35%)" strokeWidth="1.6" fill="none" />
        <path d="M8 -2 L38 104" stroke="oklch(0.55 0.02 250 / 22%)" strokeWidth="1" fill="none" />
        <path d="M-2 40 L104 46" stroke="oklch(0.55 0.02 250 / 22%)" strokeWidth="1" fill="none" />

        {/* pilgrim main route */}
        <path
          id="wari-route"
          d="M6 92 C 28 78, 34 56, 48 44 S 76 26, 96 14"
          fill="none"
          stroke="var(--saffron)"
          strokeWidth="1.4"
          strokeDasharray="3 2"
        />
        {showRoute && (
          <path
            d="M10 96 C 34 84, 44 62, 62 52 S 86 40, 98 34"
            fill="none"
            stroke="var(--success)"
            strokeWidth="1.1"
            strokeDasharray="2 2.5"
          />
        )}

        {showHeatmap && (
          <>
            <circle cx="44" cy="22" r="16" fill="url(#hot)" />
            <circle cx="24" cy="32" r="13" fill="url(#warm)" />
            <circle cx="66" cy="46" r="14" fill="url(#warm)" />
            <circle cx="30" cy="70" r="12" fill="url(#cool)" />
            <circle cx="78" cy="72" r="11" fill="url(#cool)" />
          </>
        )}
      </svg>

      {/* radar sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-sweep h-full w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent dark:via-white/5" />
      </div>

      {/* markers */}
      {mapMarkers.map((m) => {
        const meta = kindMeta[m.kind] ?? kindMeta['rest']!;
        const Icon = meta.icon;
        return (
          <div
            key={m.id}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            {meta.ring && (
              <span className="bg-danger/40 animate-pulse-ring absolute inset-0 rounded-full" />
            )}
            <span
              className={cn(
                "relative grid size-7 place-items-center rounded-full shadow-md ring-2 ring-white/80 dark:ring-black/30",
                meta.cls,
              )}
            >
              <Icon className="size-3.5" />
            </span>
            <span className="glass pointer-events-none absolute top-8 left-1/2 z-10 w-max -translate-x-1/2 rounded-md px-2 py-1 text-[10px] font-medium opacity-0 transition-opacity group-hover:opacity-100">
              {m.label}
            </span>
          </div>
        );
      })}

      {/* legend */}
      <div className="glass absolute bottom-3 left-3 rounded-xl p-2.5 text-[10px]">
        <p className="mb-1.5 font-semibold">Crowd Density</p>
        <div className="h-2 w-32 rounded-full bg-gradient-to-r from-[oklch(0.72_0.18_149)] via-[oklch(0.8_0.16_84)] to-[oklch(0.6_0.24_25)]" />
        <div className="text-muted-foreground mt-1 flex justify-between">
          <span>Low</span>
          <span>Critical</span>
        </div>
      </div>
    </div>
  );
}
