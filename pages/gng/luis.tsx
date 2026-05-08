import { DragControls, Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  forwardRef,
  useEffectEvent,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DoubleSide, type Group, type Mesh, Vector3 } from "three";

import { KTX } from "@/components/KTX";
import {
  ControlsContext,
  PositionHelper,
  useControls,
} from "@/components/three/PositionHelper";
import { blue600, green600, red600, violet400 } from "@/components/three/theme";

const { raw } = String;

/** Scene configuration */
const config = {
  /** Width of line cylinders */
  lineWidth: 0.01,

  /** Threshold for checking if two vectors are parallel */
  parallelThreshold: 0.01,
};

export default function Luis() {
  const [v, setV] = useState<Vector3>(() => new Vector3(1, 0, 0));
  const [w, setW] = useState<Vector3>(() => new Vector3(0, 1, 0));

  /** Normal of the plane spanned by v and w */
  const planeNormal = useMemo(
    () => new Vector3().crossVectors(v, w).normalize(),
    [v, w],
  );

  /**
   * Whether v and w are parallel
   * Don't check if `planeNormal === 0` because we normalize it above
   */
  const areParallel = areVectorsParallel(v, w);

  const [controls, setControls] = useState<React.ComponentRef<
    typeof OrbitControls
  > | null>(null);

  // span of the vectors
  const spanLineRef = useRef<Mesh>(null);
  const spanPlaneRef = useRef<Mesh>(null);
  useLayoutEffect(() => {
    if (spanLineRef.current) {
      alignToVector(spanLineRef.current, v);
    }
    spanPlaneRef.current?.lookAt(planeNormal);
  }, [planeNormal, v]);

  // orthogonal complement
  const complementLineRef = useRef<Mesh>(null);
  const complementPlaneRef = useRef<Mesh>(null);
  useLayoutEffect(() => {
    if (complementLineRef.current) {
      alignToVector(complementLineRef.current, planeNormal);
    }
    complementPlaneRef.current?.lookAt(v);
  }, [planeNormal, v]);

  return (
    <main className="flex h-screen w-screen flex-col">
      <aside className="fixed top-4 left-4 border border-gray-400 border-solid bg-gray-50 p-2">
        <p>
          The subspace <KTX>{raw`\operatorname{Span}(v,w)`}</KTX> is a{" "}
          <strong className="text-violet-700">
            {areParallel ? "line" : "plane"}
          </strong>
        </p>
        <p>
          The orthogonal complement of{" "}
          <KTX>{raw`\operatorname{Span}(v,w)`}</KTX> is a{" "}
          <strong className="text-red-700">
            {areParallel ? "plane" : "line"}
          </strong>
        </p>
      </aside>
      <Canvas
        camera={{ position: [3.03, 3.31, 3.72] }}
        className="rounded-md bg-grid"
        onCreated={(state) => {
          state.gl.localClippingEnabled = true;
        }}
      >
        <ControlsContext.Provider value={controls}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <PositionHelper />
          <OrbitControls
            enableDamping={false}
            ref={(ref) => setControls(ref)}
          />
          <axesHelper args={[10]} />

          {/* vectors */}
          <DragTarget onUpdate={setV} snapLine={w} vector={v} />
          <ArrowHelper color={blue600} name="v" vector={v} />

          <DragTarget onUpdate={setW} snapLine={v} vector={w} />
          <ArrowHelper color={green600} name="w" vector={w} />

          {/* span of the vectors */}
          {areParallel ? (
            <mesh name="spanLine" ref={spanLineRef}>
              <meshBasicMaterial color={violet400} side={DoubleSide} />
              <cylinderGeometry
                args={[config.lineWidth, config.lineWidth, 10, 32]}
              />
            </mesh>
          ) : (
            <mesh name="spanPlane" ref={spanPlaneRef}>
              <meshBasicMaterial
                color={violet400}
                opacity={0.4}
                side={DoubleSide}
                transparent
              />
              <planeGeometry args={[10, 10]} />
            </mesh>
          )}

          {/* orthogonal complement */}
          {areParallel ? (
            <mesh name="complementPlane" ref={complementPlaneRef}>
              <meshBasicMaterial
                color={red600}
                opacity={0.4}
                side={DoubleSide}
                transparent
              />
              <planeGeometry args={[10, 10]} />
            </mesh>
          ) : (
            <mesh name="complementLine" ref={complementLineRef}>
              <meshBasicMaterial color={red600} side={DoubleSide} />
              <cylinderGeometry
                args={[config.lineWidth, config.lineWidth, 10, 32]}
              />
            </mesh>
          )}

          {/* Question */}
          <Html position={[0, 0, 0]} />
        </ControlsContext.Provider>
      </Canvas>
    </main>
  );
}

/**
 * Similar to THREE.js ArrowHelper, but with a width
 */
const ArrowHelper = forwardRef<
  {
    ref: React.RefObject<Group>;
    update: ({ origin, vector }: { origin?: Vector3; vector: Vector3 }) => void;
  },
  {
    color: number;
    vector: Vector3;

    coneHeight?: number;
    coneRadius?: number;
    lineWidth?: number;
  } & JSX.IntrinsicElements["group"]
>(function ArrowHelper(
  {
    color,
    vector,

    coneHeight = 0.15,
    coneRadius = 0.08,
    lineWidth = 0.02,
    ...props
  },
  forwardedRef,
) {
  const coneRef = useRef<Mesh>(null);
  const cylinderRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  /** Update the cone and cylinder */
  const update = useEffectEvent(
    ({ origin, vector }: { origin?: Vector3; vector?: Vector3 }) => {
      if (origin) {
        groupRef.current?.position.copy(origin);
      }
      if (vector) {
        // update cylinder
        cylinderRef.current?.position.set(0, 0, vector.length() / 2);
        cylinderRef.current?.scale.set(1, vector.length(), 1);

        groupRef.current?.lookAt(vector);
      }
    },
  );

  // expose api
  useImperativeHandle(forwardedRef, () => ({
    ref: groupRef,
    update,
  }));

  // set the origin/vector
  useLayoutEffect(() => {
    update({ vector });
  }, [update, vector]);

  return (
    <group ref={groupRef} {...props}>
      {/* cone */}
      <mesh
        position={[0, 0, vector.length()]}
        ref={coneRef}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial color={color} />
        <coneGeometry args={[coneRadius, coneHeight, 10, 10]} />
      </mesh>

      {/* cylinder */}
      <mesh
        position={[0, 0, vector.length() / 2]}
        ref={cylinderRef}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1, vector.length(), 1]}
      >
        <meshBasicMaterial color={color} />
        <cylinderGeometry args={[lineWidth, lineWidth, 1, 32]} />
      </mesh>
    </group>
  );
});

function DragTarget({
  onUpdate,
  snapLine,
  snapThresholdSquared = 1,
  vector,
}: {
  onUpdate: (v: Vector3) => void;

  vector: Vector3;

  /** Optional vector direction to snap to. */
  snapLine?: Vector3;

  /** Square of the distance threshold to snap to the line. */
  snapThresholdSquared?: number;
}) {
  /**
   * The vector that is being dragged. The {@link DragControls} matrix expects
   * to be applied to the starting vector, not the current state of the vector.
   */
  const dragTarget = useRef<Vector3>() as React.MutableRefObject<Vector3>;
  if (!dragTarget.current) {
    dragTarget.current = new Vector3();
  }

  const controls = useControls();

  return (
    <DragControls
      autoTransform={false}
      onDrag={(localMatrix) => {
        const dest = dragTarget.current.clone().applyMatrix4(localMatrix);

        // snapping
        if (snapLine) {
          const snapTarget = snapLine
            .clone()
            .normalize()
            .multiplyScalar(dest.length());
          if (snapTarget.dot(dest) < 0) {
            snapTarget.multiplyScalar(-1);
          }

          if (snapTarget.distanceToSquared(dest) < snapThresholdSquared) {
            dest.copy(snapTarget);
          }
        }
        onUpdate(dest);
      }}
      onDragEnd={() => {
        dragTarget.current.copy(vector);
      }}
      onDragStart={() => {
        dragTarget.current.copy(vector);
      }}
      onHover={(hovering) => {
        if (controls) {
          controls.enabled = !hovering;
        }
        document.body.style.cursor = hovering ? "grab" : "auto";
      }}
    >
      <mesh position={vector} visible={false}>
        <sphereGeometry args={[0.1, 32, 32]} />
      </mesh>
    </DragControls>
  );
}

/** Align a (cylinder) mesh to be parallel a vector */
function alignToVector(mesh: Mesh, vector: Vector3) {
  const axis = new Vector3(0, 1, 0);
  mesh.quaternion.setFromUnitVectors(axis, vector.clone().normalize());
}

function areVectorsParallel(v: Vector3, w: Vector3) {
  return new Vector3().crossVectors(v, w).lengthSq() < 0.01;
}
