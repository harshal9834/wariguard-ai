import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bot, Mic, Send, Languages } from "lucide-react";
import { PageHeader } from "@/components/vari/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/assistant")({
  head: () => ({
    meta: [
      { title: "VariMitra AI Assistant · VARI-SENSE" },
      { name: "description", content: "Multilingual AI assistant for routes, food centres, medical camps and emergency guidance." },
    ],
  }),
  component: Assistant,
});

const seed = [
  { role: "user", text: "जवळचं अन्नदान केंद्र कुठे आहे?" },
  { role: "ai", text: "सर्वात जवळचं अन्नदान केंद्र 'अन्नदान केंद्र २' आहे — ६०० मीटर, चालत ८ मिनिटं. सध्या रांग कमी आहे. मी मार्ग नकाशावर दाखवू का?" },
  { role: "user", text: "Suggest a safe route to Pandharpur avoiding the crowd." },
  { role: "ai", text: "Ring Road B is currently the safest route: 18% lower density, adds 6 minutes. Two water stations and one medical camp are on the way. Shall I start voice navigation?" },
];

const quick = ["Nearest medical camp", "Report a lost person", "Water station near me", "Emergency guidance", "Today's ringan timing"];

function Assistant() {
  const [lang, setLang] = useState("English");
  const [msgs, setMsgs] = useState(seed);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [
      ...m,
      { role: "user", text },
      { role: "ai", text: "VariMitra AI is looking that up across live crowd, resource and medical data for your zone…" },
    ]);
    setInput("");
  };

  return (
    <>
      <PageHeader
        title="VariMitra AI"
        subtitle="Multilingual voice + chat assistant for pilgrims and field teams"
        actions={
          <div className="flex gap-1.5">
            {["Marathi", "Hindi", "English"].map((l) => (
              <Button key={l} size="sm" variant={lang === l ? "default" : "outline"} onClick={() => setLang(l)}>
                {l}
              </Button>
            ))}
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-4">
        <div className="surface-card flex h-[560px] flex-col p-4 xl:col-span-3">
          <div className="flex items-center gap-2 border-b pb-3">
            <span className="gradient-saffron grid size-9 place-items-center rounded-xl text-white">
              <Bot className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">VariMitra AI</p>
              <p className="text-muted-foreground text-[11px]">Online · {lang} · voice enabled</p>
            </div>
            <Badge variant="outline" className="ml-auto gap-1"><Languages className="size-3" /> 3 languages</Badge>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto py-4">
            {msgs.map((m, i) => (
              <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                    m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 pb-2">
            {quick.map((q) => (
              <button key={q} onClick={() => send(q)} className="hover:bg-muted rounded-full border px-2.5 py-1 text-[11px]">
                {q}
              </button>
            ))}
          </div>

          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <Button type="button" variant="outline" size="icon"><Mic className="size-4" /></Button>
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Ask VariMitra in ${lang}…`} />
            <Button type="submit" size="icon"><Send className="size-4" /></Button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="surface-card p-4">
            <h2 className="font-semibold">Capabilities</h2>
            <ul className="text-muted-foreground mt-2 space-y-1.5 text-[12px]">
              {["Answer pilgrim questions", "Find nearest food centre", "Find medical camp", "Suggest safe route", "Emergency guidance", "Lost person assistance", "Voice chat", "Offline voice mode"].map((c) => (
                <li key={c} className="flex gap-2"><span className="bg-saffron mt-1.5 size-1.5 rounded-full" />{c}</li>
              ))}
            </ul>
          </div>
          <div className="gradient-navy rounded-2xl p-4 text-white">
            <h3 className="font-semibold">WhatsApp Seva Agent</h3>
            <p className="mt-1.5 text-[12px] text-white/75">
              Same assistant on WhatsApp: SOS, nearby volunteer, live route, food and medical help — no app install needed.
            </p>
            <Button size="sm" variant="outline" className="mt-3 w-full border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              Open agent settings
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
