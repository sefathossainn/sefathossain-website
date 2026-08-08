"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Icosahedron, Octahedron } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
} from "@react-three/postprocessing";

const EMERALD = "#1e7a4e";
const EVERGREEN = "#2a6045";
const SIGNAL = "#27a165";
const OBSIDIAN = "#060c09";

/**
 * The Secure Lattice — a faceted wireframe vault around a soft signal-green
 * core, floating in deep-green fog. Rotates almost imperceptibly and drifts
 * toward the cursor with restraint. Postprocessing: bloom on the core, film
 * grain, vignette. Deliberately low-poly and cheap — a few meshes, capped DPR.
 */
export function SecureLatticeScene({
  intensity = 1,
  offsetX = 0,
}: {
  intensity?: number;
  /** shift the whole structure to one side (world units) so it frames, not competes */
  offsetX?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const outer = useRef<THREE.Mesh>(null);
  const mid = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // pointer parallax — restrained
    const px = state.pointer.x * 0.22 * intensity;
    const py = state.pointer.y * 0.16 * intensity;

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        px,
        3,
        delta,
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        -py,
        3,
        delta,
      );
      group.current.position.y = Math.sin(t * 0.5) * 0.08;
    }
    if (outer.current) outer.current.rotation.y += delta * 0.06;
    if (mid.current) {
      mid.current.rotation.y -= delta * 0.09;
      mid.current.rotation.x += delta * 0.03;
    }
    if (core.current) {
      const s = 1 + Math.sin(t * 1.4) * 0.06;
      core.current.scale.setScalar(s);
    }
  });

  return (
    <>
      {/* transparent canvas — the CSS poster shows behind; fog dissolves edges */}
      <fog attach="fog" args={[OBSIDIAN, 4.5, 11]} />

      <ambientLight intensity={0.25} />
      <pointLight position={[0, 0, 0]} intensity={6} distance={8} color={SIGNAL} />
      <pointLight position={[4, 3, 5]} intensity={0.4} color={EMERALD} />

      <group ref={group} position={[offsetX, 0, 0]}>
        {/* Outer vault shell */}
        <Icosahedron ref={outer} args={[2.35, 1]}>
          <meshBasicMaterial
            color={EMERALD}
            wireframe
            transparent
            opacity={0.55}
          />
        </Icosahedron>

        {/* Inner counter-rotating lattice */}
        <Octahedron ref={mid} args={[1.5, 0]}>
          <meshBasicMaterial
            color={EVERGREEN}
            wireframe
            transparent
            opacity={0.5}
          />
        </Octahedron>

        {/* The protected core */}
        <mesh ref={core}>
          <sphereGeometry args={[0.34, 32, 32]} />
          <meshBasicMaterial color={SIGNAL} toneMapped={false} />
        </mesh>
        <mesh scale={1.7}>
          <sphereGeometry args={[0.34, 24, 24]} />
          <meshBasicMaterial
            color={SIGNAL}
            transparent
            opacity={0.12}
            toneMapped={false}
          />
        </mesh>
      </group>

      <EffectComposer>
        <Bloom
          intensity={1.1 * intensity}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.3} darkness={0.85} />
        <Noise opacity={0.035} />
      </EffectComposer>
    </>
  );
}
