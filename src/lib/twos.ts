/**
 * Animation quantisation helper: "on twos" (~12 frames per second).
 * Hold each frame for two frames of a 24fps timeline, with no motion blur.
 *
 * @param duration Duration in seconds.
 * @returns GSAP steps easing string e.g. "steps(12)" for 1 second.
 */
export function twos(duration: number): string {
  const steps = Math.max(1, Math.round(duration * 12));
  return `steps(${steps})`;
}

/**
 * Standard 1/30 progress step for scrubbed timelines
 */
export const SCRUB_STEP_1_30 = 1 / 30;
