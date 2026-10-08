// @vitest-environment jsdom
import { afterEach, beforeAll, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Demo } from "@/components/Demos";
import { concepts } from "@/lib/domain";
beforeAll(() => {
  vi.stubGlobal("IntersectionObserver", class { observe() {} disconnect() {} unobserve() {} });
  window.matchMedia = window.matchMedia || ((q: string) => ({ matches: false, media: q, onchange: null, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false }) as MediaQueryList);
});
afterEach(cleanup);
it("every concept has a demo that renders", () => {
  for (const c of concepts) { const { container, unmount } = render(<Demo k={c.slug} />); expect(container.innerHTML, c.slug).not.toBe(""); unmount(); }
});
it("tabs respond to arrow keys", () => {
  render(<Demo k="tabs" />);
  fireEvent.keyDown(screen.getByRole("tab", { name: "Overview" }), { key: "ArrowRight" });
  expect(screen.getByRole("tab", { name: "Specs" }).getAttribute("aria-selected")).toBe("true");
});
it("feedback demo moves idle to loading", () => {
  render(<Demo k="feedback-states" />);
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(screen.getByRole("status").textContent).toContain("loading");
});
it("keyboard moves the draggable card", () => {
  render(<Demo k="drag" />);
  const card = screen.getByRole("button", { name: /Draggable card/ });
  fireEvent.keyDown(card, { key: "ArrowRight" });
  expect(card.style.left).toBe("30px");
});
it("command palette filters and tracks the selection", () => {
  render(<Demo k="command-palette" />);
  const input = screen.getByLabelText("Search concepts", { selector: "input" }) as HTMLInputElement;
  fireEvent.change(input, { target: { value: "scroll" } });
  fireEvent.keyDown(input, { key: "ArrowDown" });
  expect(document.querySelector('[aria-current="true"]')?.textContent).toBeTruthy();
});
