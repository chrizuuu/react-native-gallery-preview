export const clamp = (number: number, min: number, max: number) => {
  'worklet';
  return Math.max(min, Math.min(number, max));
};

const rubberClamp = (x: number, rubberStrength: number, dim: number) => {
  'worklet';
  return (1 - 1 / ((x * rubberStrength) / dim + 1)) * dim;
};

export const withRubberClamp = (
  x: number,
  rubberStrength: { dir0: number; dir1: number } | number,
  dim: number,
  min: number,
  max: number,
  consoleLog?: boolean,
) => {
  'worklet';
  const clampedX = clamp(x, min, max);
  const diff = Math.abs(x - clampedX);
  const direction = clampedX > x ? -1 : 1;

  if (consoleLog) console.log('minMax', min, max);
  const _rubberStrength =
    typeof rubberStrength === 'number'
      ? rubberStrength
      : direction === 1
        ? rubberStrength.dir0
        : rubberStrength.dir1;

  if (consoleLog) console.log('rubberStrheng', _rubberStrength);
  const result = clampedX + direction * rubberClamp(diff, _rubberStrength, dim);

  if (consoleLog) console.log('result', x, clampedX, result);
  return result;
};
