import type { MetadataRoute } from "next";
import { concepts } from "@/lib/domain";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL ?? "http://localhost:3000";
  return ["", "/graph", "/simulations", "/prompt-lab", "/tutor", ...concepts.map((c) => `/concepts/${c.slug}`)].map((p) => ({ url: base + p }));
}
