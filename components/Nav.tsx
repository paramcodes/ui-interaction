"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Atlas", icon: "🗺️" },
  { href: "/graph", label: "Graph", icon: "🕸️" },
  { href: "/simulations", label: "Simulations", icon: "⚡" },
  { href: "/prompt-lab", label: "Prompt Lab", icon: "🧪" },
  { href: "/tutor", label: "AI Tutor", icon: "🤖" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="mb-8 pt-4">
      <div className="table-plate flex flex-wrap items-center justify-between gap-4 px-5 py-3.5">
        <Link href="/" className="group flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl border-2 border-[#4a3428] bg-[#ff7d9e] text-lg font-black shadow-[0_2px_0_#4a3428] transition-transform group-hover:rotate-6">
            ✨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-[#4a3428]">
                UI INTERACTION ATLAS
              </span>
              <span className="badge-pill bg-[#ffc93c] text-[10px] text-[#4a3428]">
                ARCADE
              </span>
            </div>
            <p className="text-xs font-bold text-[#4a3428]">
              Hands-on interface physics & prompt cookbook
            </p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-2" aria-label="Main Navigation">
          {LINKS.map(({ href, label, icon }) => {
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`table-plate-action inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-black transition-all ${
                  isActive
                    ? "border-2 border-[#4a3428] bg-[#ff7d9e] text-[#4a3428] shadow-[0_3px_0_#4a3428] translate-y-[-1px]"
                    : "border-2 border-[#4a3428] bg-[#fffdf7] text-[#4a3428] shadow-[0_2px_0_#4a3428] hover:bg-[#fdf5e0]"
                }`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
