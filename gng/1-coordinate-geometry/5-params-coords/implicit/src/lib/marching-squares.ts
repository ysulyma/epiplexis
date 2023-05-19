import type {Pt3} from "../utils";

/* marching squares */
/* taken from https://stemkoski.github.io/MathBox/graph2d-implicit.html */

// returns an array of endpoints of edges. c = zLevel, i.e. isocline value.
// z = zFunc(x,y). generating the level set where z = c.
export function marchingSquares(
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  zFunc: (x: number, y: number) => number,
  c: number,
  resolution: number
) {
  const xStep = (xMax - xMin) / resolution;
  const yStep = (yMax - yMin) / resolution;
  const points: Pt3[] = [];
  for (let x = xMin; x < xMax; x += xStep) {
    for (let y = yMin; y < yMax; y += yStep) {
      const z1 = zFunc(x, y); // bottom left corner
      const z2 = zFunc(x + xStep, y); // bottom right corner
      const z4 = zFunc(x + xStep, y + yStep); // top right corner
      const z8 = zFunc(x, y + yStep); // top left corner
      let n = 0;
      if (z1 > c) n += 1;
      if (z2 > c) n += 2;
      if (z4 > c) n += 4;
      if (z8 > c) n += 8;

      // calculate linear interpolation values along the given sides.
      //  to simplify, could assume each is 0.5*xStep or 0.5*yStep accordingly.
      const bottomInterp = ((c - z1) / (z2 - z1)) * xStep;
      const topInterp = ((c - z8) / (z4 - z8)) * xStep;
      const leftInterp = ((c - z1) / (z8 - z1)) * yStep;
      const rightInterp = ((c - z2) / (z4 - z2)) * yStep;

      // for a visual diagram of cases: https://en.wikipedia.org/wiki/Marching_squares
      if (n == 1 || n == 14)
        // lower left corner
        points.push([x, y + leftInterp, c], [x + bottomInterp, y, c]);
      else if (n == 2 || n == 13)
        // lower right corner
        points.push([x + bottomInterp, y, c], [x + xStep, y + rightInterp, c]);
      else if (n == 4 || n == 11)
        // upper right corner
        points.push(
          [x + topInterp, y + yStep, c],
          [x + xStep, y + rightInterp, c]
        );
      else if (n == 8 || n == 7)
        // upper left corner
        points.push([x, y + leftInterp, c], [x + topInterp, y + yStep, c]);
      else if (n == 3 || n == 12)
        // horizontal
        points.push([x, y + leftInterp, c], [x + xStep, y + rightInterp, c]);
      else if (n == 6 || n == 9)
        // vertical
        points.push([x + bottomInterp, y, c], [x + topInterp, y + yStep, c]);
      else if (n == 5)
        // should do subcase // lower left & upper right
        points.push(
          [x, y + leftInterp, c],
          [x + bottomInterp, y, c],
          [x + topInterp, y + yStep, c],
          [x + xStep, y + rightInterp, c]
        );
      else if (n == 10)
        // should do subcase // lower right & upper left
        points.push(
          [x + bottomInterp, y, c],
          [x + xStep, y + rightInterp, c],
          [x, y + yStep / 2, c],
          [x, y + leftInterp, c],
          [x + topInterp, y + yStep, c]
        );
      else if (n == 0 || n == 15)
        // no line segments appear in this grid square.
        points.push();
    }
  }
  return points;
}
