import test from "node:test";
import assert from "node:assert/strict";
import { twos, SCRUB_STEP_1_30 } from "../src/lib/twos.ts";

test("twos helper returns correct steps easing string for various durations", () => {
  // 1 second -> round(1 * 12) = 12 steps
  assert.equal(twos(1), "steps(12)");

  // 0.5 seconds -> round(0.5 * 12) = 6 steps
  assert.equal(twos(0.5), "steps(6)");

  // 0.25 seconds -> round(0.25 * 12) = 3 steps
  assert.equal(twos(0.25), "steps(3)");

  // 0.333 seconds -> round(4) = 4 steps
  assert.equal(twos(0.333), "steps(4)");

  // Very small duration (< 1/24) clamped to at least 1 step
  assert.equal(twos(0.01), "steps(1)");
  assert.equal(twos(0), "steps(1)");

  // 2 seconds -> round(24) = 24 steps
  assert.equal(twos(2), "steps(24)");
});

test("SCRUB_STEP_1_30 is approximately 0.0333", () => {
  assert.equal(Math.round(SCRUB_STEP_1_30 * 1000) / 1000, 0.033);
});
