import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Brain,
  BotMessageSquare,
  Boxes,
  Map,
  Orbit,
  Radio,
  Shield,
  Siren,
  Smartphone,
  Users,
  HeartHandshake,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/vari/theme-toggle";
import heroImg from "@/assets/wari-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VARI-SENSE — AI Powered Smart Wari Management Platform" },
      {
        name: "description",
        content:
          "Predict, coordinate and protect the Wari pilgrimage with AI crowd monitoring, live maps, emergency response and resource forecasting.",
      },
      { property: "og:title", content: "VARI-SENSE — AI Powered Smart Wari Management Platform" },
      {
        property: "og:description",
        content:
          "Smart City command centre for the Wari pilgrimage: crowd AI, live maps, emergency response.",
      },
    ],
  }),
  component: Landing,
});

const stats = [
  { value: "2 Million+", label: "Pilgrims Tracked" },
  { value: "2,500+", label: "Volunteers" },
  { value: "300+", label: "Medical Teams" },
  { value: "500+", label: "Police Units" },
  { value: "Live", label: "Monitoring Enabled" },
];

const features = [
  {
    icon: Map,
    title: "Live Command Map",
    desc: "Crowd heatmaps, GPS tracks, camps, closures and AI safe routes on one canvas.",
  },
  {
    icon: Brain,
    title: "Congestion Prediction",
    desc: "15-minute, 30-minute and hourly density forecasts with confidence scoring.",
  },
  {
    icon: Siren,
    title: "Emergency Response",
    desc: "Medical, fire, stampede and lost-person workflows with live ETA tracking.",
  },
  {
    icon: Boxes,
    title: "Resource Forecasting",
    desc: "Water, food, medical kits and vehicles balanced across every zone.",
  },
  {
    icon: BotMessageSquare,
    title: "VariMitra AI",
    desc: "Multilingual voice + chat assistant in Marathi, Hindi and English.",
  },
  {
    icon: Orbit,
    title: "Wari Digital Twin",
    desc: "Simulate crowd flow, resource movement and emergency scenarios ahead of time.",
  },
];

const modules = [
  { icon: Users, name: "Admin" },
  { icon: Activity, name: "Coordinator" },
  { icon: HeartHandshake, name: "Volunteer" },
  { icon: Shield, name: "Police" },
  { icon: Stethoscope, name: "Medical" },
  { icon: Smartphone, name: "Pilgrim App" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="glass sticky top-0 z-50 flex h-16 items-center gap-3 border-b px-4 sm:px-8">
        <span className="gradient-saffron grid size-9 place-items-center rounded-xl font-black text-white">
          V
        </span>
        <span className="font-extrabold tracking-tight">
          VARI<span className="text-saffron">-SENSE</span>
        </span>
        <nav className="text-muted-foreground ml-8 hidden gap-6 text-sm font-medium lg:flex">
          <a href="#platform" className="hover:text-foreground">
            Platform
          </a>
          <a href="#roles" className="hover:text-foreground">
            Roles
          </a>
          <a href="#innovation" className="hover:text-foreground">
            AI Innovations
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <Link to="/auth">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="gradient-saffron border-0 text-white">
            <Link to="/app">Explore Dashboard</Link>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <img
          src={heroImg}
          alt="Aerial view of the Wari pilgrimage procession at sunrise"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.2_0.06_265_/_82%)] via-[oklch(0.2_0.06_265_/_62%)] to-[oklch(0.2_0.06_265_/_92%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center sm:py-32">
          <Badge className="border-white/25 bg-white/15 text-white backdrop-blur">
            <Radio className="mr-1.5 size-3" /> Smart India Hackathon · Government Grade
          </Badge>
          <h1 className="mt-6 text-4xl leading-tight font-black text-white sm:text-6xl">
            AI Powered Smart Wari
            <br />
            Management Platform
          </h1>
          <p className="mt-4 text-lg font-medium tracking-[0.2em] text-[oklch(0.85_0.14_70)] uppercase">
            Predict • Coordinate • Protect
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/80">
            One command centre for coordinators, volunteers, police, medical teams and pilgrims —
            powered by real-time crowd intelligence, predictive analytics and multilingual AI
            assistance.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="gradient-saffron border-0 text-white shadow-lg">
              <Link to="/auth">
                Get Started <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white"
            >
              <Link to="/app">Explore Dashboard</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto -mb-16 grid max-w-6xl grid-cols-2 gap-3 px-6 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-4 text-center">
              <p className="text-saffron text-xl font-black sm:text-2xl">{s.value}</p>
              <p className="text-muted-foreground mt-1 text-[11px] font-medium tracking-wide uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="platform" className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <h2 className="text-center text-3xl font-bold">A Smart City command centre for the Wari</h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-center text-sm">
          Every zone, every camp, every unit — monitored, predicted and coordinated in real time.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="surface-card p-5 transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <span className="bg-saffron/15 text-saffron grid size-10 place-items-center rounded-xl">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="text-muted-foreground mt-1.5 text-[13px] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="roles" className="bg-muted/40 border-y py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold">Six roles, one operation</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {modules.map((m) => (
              <Link
                key={m.name}
                to="/auth"
                className="surface-card grid place-items-center gap-2 p-5 text-center transition-transform hover:-translate-y-1"
              >
                <span className="bg-navy/10 text-navy grid size-11 place-items-center rounded-full">
                  <m.icon className="size-5" />
                </span>
                <span className="text-sm font-semibold">{m.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="innovation" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-4 lg:grid-cols-4">
          {[
            {
              t: "VariMitra Voice Agent",
              d: "Hands-free multilingual navigation and emergency voice commands, with offline mode.",
            },
            {
              t: "WhatsApp Seva Agent",
              d: "SOS, nearby volunteer, live route, food and medical help right inside WhatsApp.",
            },
            {
              t: "Wari Digital Twin",
              d: "Live simulation of crowd, resources and emergencies for what-if planning.",
            },
            {
              t: "SevaOS",
              d: "Volunteer OS: QR attendance, AI scheduling, task allocation and leaderboards.",
            },
          ].map((i, idx) => (
            <div
              key={i.t}
              className="gradient-navy relative overflow-hidden rounded-2xl p-5 text-white"
            >
              <span className="text-saffron text-xs font-bold">0{idx + 1}</span>
              <h3 className="mt-2 font-semibold">{i.t}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/75">{i.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="text-muted-foreground mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 text-xs">
          <span>© 2026 VARI-SENSE · Smart Wari Crowd & Resource Management</span>
          <span>Built for Government of Maharashtra pilot demonstrations</span>
        </div>
      </footer>
    </div>
  );
}
