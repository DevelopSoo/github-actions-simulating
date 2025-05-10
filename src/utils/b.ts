export function hello() {}

export function add(a: number, b: number): number {
  if (a < 0) {
    return 0;
  }
  return a + b;
}
