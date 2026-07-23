import assert from "node:assert/strict";
import test from "node:test";
import { integerSqrt, sqrtRatioX96 } from "../scripts/lib/launch-math.mjs";

test("integer square root is exact or rounds down", () => {
  assert.equal(integerSqrt(0n), 0n);
  assert.equal(integerSqrt(1n), 1n);
  assert.equal(integerSqrt(2n), 1n);
  assert.equal(integerSqrt(16n), 4n);
  assert.equal(integerSqrt(17n), 4n);
});

test("XQNT/USDC initial ratio produces a valid Q96 price both token orders", () => {
  const xqnt = 100_000_000n * 10n ** 18n;
  const usdc = 1_000n * 10n ** 6n;
  const forward = sqrtRatioX96(usdc, xqnt);
  const reverse = sqrtRatioX96(xqnt, usdc);
  const q192 = 1n << 192n;

  assert.ok(forward > 0n);
  assert.ok(reverse > 0n);
  // Integer rounding permits a tiny error around the reciprocal identity.
  const reciprocalError = q192 - forward * reverse;
  assert.ok(reciprocalError >= 0n);
  assert.ok(reciprocalError < q192 / 1_000_000_000n);
});
