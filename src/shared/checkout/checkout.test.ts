import { checkout, RULES } from "./checkout";

const cases: [string, number][] = [
  ["", 0],
  ["A", 50],
  ["AB", 80],
  ["CDBA", 115],
  ["AA", 100],
  ["AAA", 130],
  ["AAAA", 180],
  ["AAAAA", 230],
  ["AAAAAA", 260],
  ["AAAB", 160],
  ["AAABB", 175],
  ["AAABBD", 190],
  ["DABABA", 190],
];

describe("checkout", () => {
  test.each(cases)("returns correct total for %p", (input, output) => {
    expect(checkout(input, RULES)).toBe(output);
  });

  test("returns error if invalid product provided", () => {
    expect(checkout("AXABD", RULES)).toEqual(
      new Error("Invalid product id provided")
    );
  });
});
