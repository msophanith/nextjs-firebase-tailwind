"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, ContactShadows } from "@react-three/drei";

// Soft Petal Component
function Petal({ rotation, scale, position, color, opacity, delay }: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Custom Petal Geometry - More tapered and curved
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(
      1,
      32,
      32,
      0,
      Math.PI * 2,
      0,
      Math.PI * 0.5,
    );
    geo.scale(1, 1.2, 0.7);
    // Curl the edges slightly by moving vertices
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      // Taper the bottom
      const taper = Math.pow(y + 0.8, 0.6);
      pos.setX(i, x * taper);
      pos.setZ(i, z + Math.sin(y * 1.5) * 0.1);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      // Subtle sway
      meshRef.current.rotation.x = rotation[0] + Math.sin(t + delay) * 0.02;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <meshPhysicalMaterial
        color={color}
        roughness={0.8}
        metalness={0}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        sheen={1}
        sheenColor="#fff"
        sheenRoughness={0.5}
        emissive={color}
        emissiveIntensity={0.05}
        thickness={0.1}
      />
    </mesh>
  );
}

export function RoseModel() {
  const groupRef = useRef<THREE.Group>(null);

  const petalData = useMemo(() => {
    const data = [];
    const layers = 6;
    const petalsPerLayer = [1, 3, 5, 8, 12, 12];

    for (let l = 0; l < layers; l++) {
      const count = petalsPerLayer[l];
      const layerScale = 0.2 + l * 0.35;
      const layerY = -l * 0.15;
      const layerColor = new THREE.Color("#f43f5e").lerp(
        new THREE.Color("#881337"),
        l / layers,
      );

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (l * Math.PI) / 4;
        const radius = l * 0.25;

        data.push({
          position: [
            Math.cos(angle) * radius,
            layerY + Math.random() * 0.1,
            Math.sin(angle) * radius,
          ],
          rotation: [
            1.2 + l * 0.3, // Tilt more as we go out
            -angle + Math.PI,
            0,
          ],
          scale: [layerScale, layerScale * 1.2, layerScale],
          color: layerColor,
          opacity: 1 - l * 0.05,
          delay: l + i,
        });
      }
    }
    return data;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;
      groupRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={groupRef}>
        {/* Flower Head */}
        <group position={[0, 0.5, 0]}>
          {petalData.map((props, i) => (
            <Petal key={i} {...props} />
          ))}

          {/* Core */}
          <mesh position={[0, -0.1, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshBasicMaterial color="#4c0519" />
          </mesh>
        </group>

        {/* Improved Stem */}
        <mesh position={[0, -1.8, 0]} rotation={[0, 0, 0.05]}>
          <cylinderGeometry args={[0.04, 0.05, 4, 16]} />
          <meshStandardMaterial color="#064e3b" roughness={0.9} />
        </mesh>

        {/* Artistic Leaves */}
        {[-0.6, 0.6].map((x, i) => (
          <mesh
            key={i}
            position={[x, -1.2 + i * 0.3, 0]}
            rotation={[0.5, 0, x > 0 ? -0.8 : 0.8]}
            scale={[0.8, 0.4, 0.1]}
          >
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshPhysicalMaterial
              color="#065f46"
              roughness={0.7}
              sheen={0.5}
              sheenColor="#fff"
            />
          </mesh>
        ))}
      </group>

      <ContactShadows
        position={[0, -3.8, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
      />
    </Float>
  );
}
