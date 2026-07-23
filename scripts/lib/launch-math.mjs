export function sqrtRatioX96(amount1, amount0) {
  if (amount0 <= 0n || amount1 <= 0n) {
    throw new Error("Pool amounts must be positive.");
  }
  const result = integerSqrt((amount1 << 192n) / amount0);
  if (result <= 0n || result > (1n << 160n) - 1n) {
    throw new Error("sqrtPriceX96 is outside uint160.");
  }
  return result;
}

export function integerSqrt(value) {
  if (value < 0n) throw new Error("Cannot square-root a negative value.");
  if (value < 2n) return value;
  let x0 =
    1n << ((BigInt(value.toString(2).length) + 1n) >> 1n);
  let x1 = (x0 + value / x0) >> 1n;
  while (x1 < x0) {
    x0 = x1;
    x1 = (x0 + value / x0) >> 1n;
  }
  return x0;
}
