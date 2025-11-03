export const getRotatedPoint = (
  i: number,
  deg: number,
  slicesCount: number,
  radius: number
) => {
  const base = (2 * Math.PI * i) / slicesCount - Math.PI / 2;
  const a = base + (deg * Math.PI) / 180;
  return {
    x: Math.cos(a) * radius + radius,
    y: Math.sin(a) * radius + radius,
    a,
  };
};

export type Point = { x: number; y: number; angle?: number; a?: number };

export const calcPoints = (count: number, radius: number): Point[] =>
  Array.from({ length: count }, (_, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius + radius,
      y: Math.sin(angle) * radius + radius,
      angle,
    };
  });
