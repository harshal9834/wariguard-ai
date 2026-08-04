import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Bell,
  BotMessageSquare,
  BarChart3,
  Boxes,
  FileText,
  LayoutDashboard,
  Map,
  Menu,
  Search,
  Settings,
  Shield,
  Siren,
  Stethoscope,
  HeartHandshake,
  Orbit,
  Smartphone,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";
import { notifications } from "@/lib/wari-data";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/map", label: "Live Map", icon: Map },
  { to: "/app/crowd", label: "Crowd Monitoring", icon: Activity },
  { to: "/app/volunteers", label: "Volunteers", icon: HeartHandshake },
  { to: "/app/resources", label: "Resources", icon: Boxes },
  { to: "/app/medical", label: "Medical", icon: Stethoscope },
  { to: "/app/police", label: "Police", icon: Shield },
  { to: "/app/emergency", label: "Emergency", icon: Siren },
  { to: "/app/alerts", label: "Alerts", icon: Bell },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/reports", label: "Reports", icon: FileText },
  { to: "/app/assistant", label: "VariMitra AI", icon: BotMessageSquare },
  { to: "/app/digital-twin", label: "Digital Twin", icon: Orbit },
  { to: "/app/mobile", label: "Mobile App", icon: Smartphone },
  { to: "/app/settings", label: "Settings", icon: Settings },
] satisfies { to: string; label: string; icon: typeof Map; exact?: boolean }[];

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen w-full bg-background">
      <header className="glass sticky top-0 z-50 flex h-16 items-center gap-3 border-b px-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
        <Link to="/app" className="flex items-center gap-2.5">
          <span className="gradient-saffron grid size-9 place-items-center rounded-xl text-base font-black text-white shadow-md">
            V
          </span>
          <span className="hidden text-[15px] font-extrabold tracking-tight sm:block">
            VARI<span className="text-saffron">-SENSE</span>
          </span>
        </Link>

        <div className="relative ml-4 hidden max-w-md flex-1 md:block">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            placeholder="Search zones, volunteers, incidents…"
            className="bg-background/60 pl-9"
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <Button asChild variant="destructive" size="sm" className="gap-1.5 font-semibold">
            <Link to="/app/emergency">
              <Siren className="size-4" /> <span className="hidden sm:inline">Emergency</span>
            </Link>
          </Button>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-[18px]" />
                <span className="bg-danger absolute top-1.5 right-1.5 size-2 rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notification Center</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.slice(0, 6).map((n) => (
                <DropdownMenuItem key={n.text} className="flex-col items-start gap-0.5 py-2">
                  <span className="text-[13px] leading-snug">{n.text}</span>
                  <span className="text-muted-foreground text-xs">{n.time}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-1.5 sm:px-2">
                <Avatar className="size-7">
                  <AvatarFallback className="bg-navy text-navy-foreground text-xs">
                    AK
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-left leading-tight sm:block">
                  <span className="block text-xs font-semibold">Amit Kulkarni</span>
                  <span className="text-muted-foreground block text-[10px]">
                    Admin · Pune Range
                  </span>
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Signed in as Admin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/app/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/auth">Switch role</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/">Sign out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        <aside
          className={cn(
            "bg-sidebar fixed inset-y-16 left-0 z-40 w-64 shrink-0 overflow-y-auto border-r p-3 transition-transform lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <nav className="space-y-0.5">
            {nav.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to as "/app"}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                      : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                  )}
                >
                  <item.icon className={cn("size-4", active && "text-saffron")} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="surface-card mt-4 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">System Status</span>
              <Badge className="bg-success/15 text-success border-0 text-[10px]">Live</Badge>
            </div>
            <p className="text-muted-foreground mt-1.5 text-[11px] leading-relaxed">
              12,480 GPS devices · 96 drones · 4 AI models online
            </p>
          </div>
        </aside>

        {open && (
          <button
            aria-label="Close menu"
            className="fixed inset-0 top-16 z-30 bg-black/30 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
