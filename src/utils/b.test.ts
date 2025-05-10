import { add } from "./b";

describe("add function", () => {
  it("should add two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });
});
