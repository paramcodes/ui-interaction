import { expect, it } from "vitest";
import { layoutThrash, optimistic, pessimistic, total } from "./sim";
it("thrashing costs more than batching", () => { expect(total(layoutThrash(6, false))).toBeGreaterThan(total(layoutThrash(6, true))); });
it("optimistic UI shows the result sooner", () => {
  const first = (s: typeof optimistic) => s.events.find((e) => e.lane === "UI shows result")!.start;
  expect(first(optimistic)).toBeLessThan(first(pessimistic));
});
