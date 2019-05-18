export function addN(numberToAdd: number): (n: number) => number {
  return function(n: number) {
    return n + numberToAdd;
  };
}
