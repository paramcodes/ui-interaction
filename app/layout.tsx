import "./globals.css";
import Link from "next/link";
import { Vitals } from "@/components/Vitals";
export const metadata = { title: "UI Interaction Atlas", description: "Learn UI vocabulary by interacting with it." };
export default function Layout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="mx-auto max-w-3xl p-4 text-slate-900">
    <Vitals /><nav className="mb-6 flex gap-4 font-medium"><Link href="/">Atlas</Link><Link href="/graph">Graph</Link><Link href="/simulations">Simulations</Link><Link href="/prompt-lab">Prompt Lab</Link><Link href="/tutor">Tutor</Link></nav>
    {children}</body></html>);
}
