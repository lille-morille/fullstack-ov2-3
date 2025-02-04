import { expect, test } from "vitest";
import calculate from "./calculate";

test("calculate correct", () => {
  expect(calculate("1+1")).toBe("2");
  expect(calculate("10/2")).toBe("5");
  expect(calculate("5+(-3)")).toBe("2");
});

test("divide by zero", () => {
  expect(calculate("1/0")).toBe("DIV BY ZERO");
  expect(calculate("10/0")).toBe("DIV BY ZERO");
});

test("invalid syntax", () => {
  expect(calculate("1+")).toBe("ERROR");
  expect(calculate("10/")).toBe("ERROR");
  expect(calculate("5+(-")).toBe("ERROR");
  expect(calculate("5+(-3 3)")).toBe("ERROR");
});
