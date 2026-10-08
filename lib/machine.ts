export type S = "idle" | "loading" | "success" | "error";
const T: Record<S, Record<string, S>> = {
  idle: { press: "loading" }, loading: { ok: "success", fail: "error" },
  success: { reset: "idle" }, error: { press: "loading" },
};
export const next = (s: S, e: string): S => T[s][e] ?? s;
