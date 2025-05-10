import { a } from "./a";

test("a", () => {
  expect(a(1)).toBe(3);
  expect(a(2)).toBe(1);
  expect(a(3)).toBe(2);
});
