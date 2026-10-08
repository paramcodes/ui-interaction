import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
test("home renders and has no serious accessibility violations", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "UI Interaction Atlas" })).toBeVisible();
  const r = await new AxeBuilder({ page }).analyze();
  expect(r.violations.filter((v) => v.impact === "serious" || v.impact === "critical")).toEqual([]);
});
test("dialog opens and Escape closes it", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open dialog" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});
test("tabs move with arrow keys", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Overview" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Specs" })).toHaveAttribute("aria-selected", "true");
});
test("prompt lab builds a prompt", async ({ page }) => {
  await page.goto("/prompt-lab");
  await page.getByLabel("focus trap", { exact: false }).first().check();
  await expect(page.getByLabel("Generated prompt")).toHaveValue(/focus trap/);
});
test("graph renders nodes", async ({ page }) => {
  await page.goto("/graph");
  await expect(page.locator(".react-flow__node").first()).toBeVisible();
});
test("command palette opens with Ctrl+K", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog", { name: "Command palette" })).toBeVisible();
});
test("keyboard moves the draggable card", async ({ page }) => {
  await page.goto("/");
  const c = page.getByRole("button", { name: /Draggable card/ });
  await c.focus(); const b = await c.boundingBox();
  await page.keyboard.press("ArrowRight");
  expect((await c.boundingBox())!.x).toBeGreaterThan(b!.x);
});
test("infinite scroll loads more items", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Infinite list").evaluate((el) => el.scrollTo(0, el.scrollHeight));
  await expect(page.getByText("Loaded 20 of 100")).toBeVisible();
});
test("Escape hides the tooltip", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Hover or focus me/ }).focus();
  await expect(page.getByRole("tooltip")).toHaveCSS("opacity", "1");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("tooltip")).toHaveCSS("opacity", "0");
});
