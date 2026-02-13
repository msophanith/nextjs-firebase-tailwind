"use client";

import { Rose3DScene } from "@/components/valentine/Rose3DScene";

/**
 * Valentine's Special: 3D Animated Rose
 *
 * Requirements met:
 * - Fully 3D using React Three Fiber
 * - No text, UI, or buttons
 * - Centered 3D Rose
 * - Soft romantic gradient background
 * - Pixar-like softness with MeshDistortMaterial
 * - Gentle floating and petal animations
 * - Sparkling particles
 * - Smooth camera orbit
 */
export default function Valentine3DRosePage() {
  return (
    <main className="fixed inset-0 w-full h-full bg-[#fdf2f8]">
      <Rose3DScene />
    </main>
  );
}
