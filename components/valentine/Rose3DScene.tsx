"use client";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { RoseModel } from "./RoseModel";
import { Sparkles } from "./Sparkles";
import { Suspense } from "react";

export function Rose3DScene() {
  return (
    <div className="w-full h-screen relative overflow-hidden bg-gradient-to-b from-[#fff5f7] to-[#fbcfe8]">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 1.5, 7]} fov={35} />

        <Suspense fallback={null}>
          <RoseModel />
          <Sparkles count={80} />

          <Environment preset="apartment" />

          <ambientLight intensity={1.2} />

          {/* Main soft light */}
          <spotLight
            position={[10, 20, 10]}
            angle={0.2}
            penumbra={1}
            intensity={2}
            castShadow
          />

          {/* Backlight for "glow" effect */}
          <pointLight position={[-10, 5, -10]} intensity={3} color="#f472b6" />

          {/* Fill light */}
          <pointLight position={[5, -5, 5]} intensity={1} color="#ffffff" />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>

      {/* Soft Vignette and Grain */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(251,207,232,0.3)_100%)]" />
    </div>
  );
}
