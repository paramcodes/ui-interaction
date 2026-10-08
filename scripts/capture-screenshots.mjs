import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";
import { existsSync, mkdirSync } from "node:fs";

mkdirSync("public/screenshots", { recursive: true });

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server failed to start at ${url} within ${timeoutMs}ms`);
}

async function run() {
  const port = 3456;
  const baseUrl = `http://localhost:${port}`;

  console.log("Starting Next.js server on port", port);
  const server = spawn("npx", ["next", "start", "-p", String(port)], {
    stdio: "inherit",
    detached: false,
  });

  try {
    await waitForServer(baseUrl);
    console.log("Server ready! Launching Playwright...");

    const browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 2,
    });

    const page = await context.newPage();

    // 1. Home / Atlas
    console.log("Capturing 01-atlas-catalog.png...");
    await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "public/screenshots/01-atlas-catalog.png", fullPage: false });

    // 2. Concept Detail (Optimistic UI)
    console.log("Capturing 02-concept-detail.png...");
    await page.goto(`${baseUrl}/concepts/optimistic-ui`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "public/screenshots/02-concept-detail.png", fullPage: false });

    // 3. Concept Graph
    console.log("Capturing 03-concept-graph.png...");
    await page.goto(`${baseUrl}/graph`, { waitUntil: "networkidle" });
    // Wait for ELK layout and react-flow nodes
    await page.waitForSelector(".react-flow__node", { timeout: 10000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: "public/screenshots/03-concept-graph.png", fullPage: false });

    // 4. Simulations
    console.log("Capturing 04-simulations.png...");
    await page.goto(`${baseUrl}/simulations`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "public/screenshots/04-simulations.png", fullPage: false });

    // 5. Prompt Lab
    console.log("Capturing 05-prompt-lab.png...");
    await page.goto(`${baseUrl}/prompt-lab`, { waitUntil: "networkidle" });
    // Click a few checkboxes to showcase generated prompt
    const checkboxes = page.locator('input[type="checkbox"]');
    const count = await checkboxes.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      await checkboxes.nth(i).check();
    }
    await page.waitForTimeout(500);
    await page.screenshot({ path: "public/screenshots/05-prompt-lab.png", fullPage: false });

    // 6. AI Tutor
    console.log("Capturing 06-ai-tutor.png...");
    await page.goto(`${baseUrl}/tutor`, { waitUntil: "networkidle" });
    await page.fill('textarea[aria-label="Your question"]', "How do I implement optimistic rollback with undo toast?");
    const askButton = page.locator('button:has-text("Ask")');
    await askButton.click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: "public/screenshots/06-ai-tutor.png", fullPage: false });

    await browser.close();
    console.log("All screenshots captured successfully!");
  } finally {
    server.kill("SIGTERM");
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
