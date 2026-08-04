import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ClipboardList,
  Crown,
  Footprints,
  HeartHandshake,
  Shield,
  Smartphone,
  Stethoscope,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import authBg from "@/assets/wari-auth.jpg";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in · VARI-SENSE Command Centre" },
      {
        name: "description",
        content: "Login, register or use OTP access to the VARI-SENSE Wari management platform.",
      },
      { property: "og:title", content: "Sign in · VARI-SENSE Command Centre" },
      {
        property: "og:description",
        content:
          "Role based access for admins, coordinators, volunteers, police, medical teams and pilgrims.",
      },
    ],
  }),
  component: AuthPage,
});

const roleList: { id: string; name: string; icon: LucideIcon }[] = [
  { id: "admin", name: "Admin", icon: Crown },
  { id: "coordinator", name: "Coordinator", icon: ClipboardList },
  { id: "volunteer", name: "Volunteer", icon: HeartHandshake },
  { id: "police", name: "Police", icon: Shield },
  { id: "medical", name: "Medical", icon: Stethoscope },
  { id: "pilgrim", name: "Pilgrim", icon: Footprints },
];

function AuthPage() {
  const [role, setRole] = useState("admin");

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <img
        src={authBg}
        alt="Pilgrims walking with saffron flags at dawn"
        width={1280}
        height={1024}
        className="absolute inset-0 size-full object-cover opacity-25"
      />
      <div className="from-background/70 via-background/85 to-background absolute inset-0 bg-gradient-to-b" />

      <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1.5 text-xs"
        >
          <ArrowLeft className="size-3.5" /> Back to home
        </Link>

        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-2.5">
            <span className="gradient-saffron grid size-10 place-items-center rounded-xl font-black text-white">
              V
            </span>
            <div>
              <p className="font-extrabold tracking-tight">
                VARI<span className="text-saffron">-SENSE</span>
              </p>
              <p className="text-muted-foreground text-[11px]">Smart Wari Command Access</p>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold">Select your role</p>
            <div className="grid grid-cols-3 gap-2">
              {roleList.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl border p-2.5 text-[11px] font-medium transition-colors",
                    role === r.id
                      ? "border-saffron bg-saffron/12 text-saffron"
                      : "bg-background/50 hover:bg-muted",
                  )}
                >
                  <r.icon className="size-4" />
                  {r.name}
                </button>
              ))}
            </div>
          </div>

          <Tabs defaultValue="login" className="mt-5">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="otp">OTP</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-4 space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="email">Official email</Label>
                <Input id="email" type="email" placeholder="name@wari.gov.in" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pass">Password</Label>
                <Input id="pass" type="password" placeholder="••••••••" />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs">
                  <Checkbox id="remember" defaultChecked /> Remember me
                </label>
                <button className="text-saffron text-xs font-medium">Forgot password?</button>
              </div>
              <Button asChild className="gradient-saffron w-full border-0 text-white">
                <Link to="/app">Sign in as {roleList.find((r) => r.id === role)?.name}</Link>
              </Button>
            </TabsContent>

            <TabsContent value="otp" className="mt-4 space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="phone">Mobile number</Label>
                <Input id="phone" placeholder="+91 98XXXXXX21" />
              </div>
              <div className="space-y-1.5">
                <Label>Enter 6-digit OTP</Label>
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button asChild className="w-full">
                <Link to="/app">Verify & continue</Link>
              </Button>
            </TabsContent>

            <TabsContent value="register" className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="fn">Full name</Label>
                  <Input id="fn" placeholder="Amit Kulkarni" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="id">Service ID</Label>
                  <Input id="id" placeholder="MH-WAR-2026" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="em2">Email</Label>
                <Input id="em2" type="email" placeholder="name@wari.gov.in" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pw2">Create password</Label>
                <Input id="pw2" type="password" placeholder="••••••••" />
              </div>
              <Button asChild className="w-full">
                <Link to="/app">Create account</Link>
              </Button>
            </TabsContent>
          </Tabs>

          <div className="my-4 flex items-center gap-3">
            <span className="bg-border h-px flex-1" />
            <span className="text-muted-foreground text-[11px]">or continue with</span>
            <span className="bg-border h-px flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="gap-2">
              <span className="text-[13px] font-bold text-[#4285F4]">G</span> Google
            </Button>
            <Button variant="outline" className="gap-2">
              <Smartphone className="size-4" /> DigiLocker
            </Button>
          </div>

          <p className="text-muted-foreground mt-4 text-center text-[11px]">
            Protected by Maharashtra State Data Centre · MFA enabled
          </p>
        </div>
      </div>
    </div>
  );
}
