export function reportError(e: Error & { digest?: string }, where = "ui") {
  const body = JSON.stringify({ where, message: e.message, digest: e.digest, at: Date.now() });
  try { if (!navigator.sendBeacon?.("/api/log", body)) void fetch("/api/log", { method: "POST", body, keepalive: true }); } catch {}
}
