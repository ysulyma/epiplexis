import {useMemo} from "react";
import * as THREE from "three";
import {LineMaterial, LineSegments2, LineSegmentsGeometry} from "three-stdlib";

import {marchingCubes} from "../lib/marching-cubes";
import {marchingSquares} from "../lib/marching-squares";
import {useStore} from "../store";

const resolution = 64;

const fn = (x: number, y: number, z: number) =>
  2 * y * (y ** 2 - 3 * x ** 2) * (1 - z ** 2) +
  (x ** 2 + y ** 2) ** 2 -
  (9 * z ** 2 - 1) * (1 - z ** 2);

export function ImplicitSurface() {
  const moduliGeometry = useMemo(
    () => marchingCubes(fn, -2, 2, resolution),
    []
  );
  const z = useStore((state) => state.z);

  const section = useMemo(() => {
    const edges = marchingSquares(
      -2,
      2,
      -2,
      2,
      (x, y) => fn(x, y, z),
      0,
      resolution
    ) as number[][];
    for (const edge of edges) {
      edge[2] = z;
    }

    const lineGeometry = new LineSegmentsGeometry().setPositions(
      edges.reduce((a, b) => a.concat(b))
    );

    const lineMaterial = new LineMaterial({
      color: 0x00aa33,
      linewidth: 8,
    });

    lineMaterial.resolution.set(window.innerWidth, window.innerHeight); // important, for now...

    const linePavement = new LineSegments2(lineGeometry, lineMaterial);
    return linePavement;
  }, [z]);

  return (
    <>
      <mesh geometry={moduliGeometry}>
        <meshStandardMaterial
          color={0xbb00ff}
          opacity={0.7}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>
      <primitive object={section} />
    </>
  );
}
