import "./globals.css";
import { Vitals } from "@/components/Vitals";
import { Nav } from "@/components/Nav";

export const metadata = {
  title: "UI Interaction Atlas — Arcade Edition",
  description: "Learn UI vocabulary by interacting with live native and motion physics.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener('keydown',function(e){if((e.metaKey||e.ctrlKey)&&(e.key==='k'||e.key==='K'||e.code==='KeyK')){var d=document.querySelector('dialog[aria-label="Command palette"]');if(d){e.preventDefault();if(!d.open)d.showModal();}}});`,
          }}
        />
      </head>
      <body className="min-h-screen px-4 pb-16 antialiased selection:bg-[#ff7d9e] selection:text-[#4a3428]">
        <div className="mx-auto max-w-5xl">
          <Vitals />
          <Nav />
          {children}
          <footer className="mt-16 text-center">
            <div className="table-plate mx-auto inline-flex flex-wrap items-center justify-center gap-4 px-6 py-3 text-xs font-bold text-[#4a3428]">
              <span>🎮 UI INTERACTION ATLAS • ARCADE EDITION</span>
              <span>•</span>
              <span>30 INTERACTION PATTERNS</span>
              <span>•</span>
              <span>WCAG ACCESSIBILITY & MOTION TOKENS</span>
              <span>•</span>
              <a
                href="https://github.com/paramcodes/ui-interaction"
                target="_blank"
                rel="noreferrer"
                className="text-[#4a3428] underline hover:text-[#ff7d9e]"
              >
                GitHub
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
