import { concepts } from "@/lib/domain";
import { MODES, buildTutorPrompt, type Mode } from "@/lib/tutor";
const calls = new Map<string, number[]>();
function limited(ip: string) { const now = Date.now(); const a = (calls.get(ip) ?? []).filter((t) => now - t < 60000); a.push(now); calls.set(ip, a); return a.length > 10; }
export async function POST(req: Request) {
  if (limited(req.headers.get("x-forwarded-for") ?? "local")) return Response.json({ error: "rate limited, try again in a minute" }, { status: 429 });
  const { slug, mode, status, question } = await req.json();
  const c = concepts.find((x) => x.slug === slug);
  if (!c || !MODES.includes(mode as Mode)) return Response.json({ error: "bad request" }, { status: 400 });
  const prompt = buildTutorPrompt(concepts, c, mode, status, String(question ?? "").slice(0, 500));
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return Response.json({ prompt, answer: null });
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" }, body: JSON.stringify({ model: "claude-sonnet-5-5", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }) });
    const d = await r.json();
    return Response.json({ prompt, answer: d.content?.[0]?.text ?? null });
  } catch { return Response.json({ prompt, answer: null }, { status: 502 }); }
}
