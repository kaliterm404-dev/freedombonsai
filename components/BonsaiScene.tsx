"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Tree() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  const trunkCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -1.5, 0),
      new THREE.Vector3(0.1, -0.5, 0.05),
      new THREE.Vector3(-0.05, 0.3, -0.05),
      new THREE.Vector3(0.08, 1.0, 0.02),
      new THREE.Vector3(0, 1.5, 0),
    ]);
  }, []);

  const foliage: [number, number, number, number][] = [
    [0.6, 1.2, 0.3, 0.4],
    [-0.5, 1.5, -0.2, 0.45],
    [0.3, 1.8, -0.3, 0.35],
    [-0.3, 2.0, 0.2, 0.5],
    [0, 1.9, 0, 0.5],
    [0.4, 0.9, -0.4, 0.3],
  ];

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <mesh>
        <tubeGeometry args={[trunkCurve, 20, 0.08, 8, false]} />
        <meshStandardMaterial color="#5c3a1e" roughness={0.8} />
      </mesh>

      {foliage.map((f, i) => (
        <mesh key={i} position={[f[0], f[1], f[2]]}>
          <icosahedronGeometry args={[f[3], 1]} />
          <meshStandardMaterial
            color="#2d7a2d"
            roughness={0.6}
            transparent
            opacity={0.85}
            emissive="#1a4a1a"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

function Particles() {
  const count = 50;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = Math.random() * 4 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += 0.003;
      if (arr[i * 3 + 1] > 3) arr[i * 3 + 1] = -1;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#6abf5e" size={0.03} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function BonsaiScene() {
  return (
    <Canvas
      camera={{ position: [0, 1, 4], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[0, 2, 0]} intensity={0.5} color="#4a8c3f" distance={5} />

      <Tree />
      <Particles />

      <mesh position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.015, 16, 80]} />
        <meshBasicMaterial color="#4a8c3f" transparent opacity={0.4} />
      </mesh>
    </Canvas>
  );
}
