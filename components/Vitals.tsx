"use client";
import { useReportWebVitals } from "next/web-vitals";
export function Vitals() {
  useReportWebVitals((m) => { try { navigator.sendBeacon("/api/log", JSON.stringify({ vital: m.name, value: Math.round(m.value) })); } catch {} });
  return null;
}
