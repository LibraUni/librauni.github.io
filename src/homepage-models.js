// Small, ideal models for an introductory interactive preview.
// x is position/wavelength (waves) or position/box-width (quantum).
export const wave = (x, phaseDegrees = 0) => Math.sin(2 * Math.PI * x + phaseDegrees * Math.PI / 180);
export const combinedAmplitude = phaseDegrees => 2 * Math.abs(Math.cos(phaseDegrees * Math.PI / 360));
export const clockRatio = beta => {
  if (!Number.isFinite(beta) || beta < 0 || beta >= 1) throw new RangeError('Speed must satisfy 0 ≤ v/c < 1.');
  return Math.sqrt(1 - beta * beta);
};
export const probabilityDensity = (x, n) => {
  if (!Number.isInteger(n) || n < 1) throw new RangeError('The state number is a positive integer.');
  return x < 0 || x > 1 ? 0 : 2 * Math.sin(n * Math.PI * x) ** 2;
};
