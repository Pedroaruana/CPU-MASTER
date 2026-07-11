"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

export type GpuBrand = "none" | "nvidia" | "amd";

function GamingPcModel() {
  const { scene } = useGLTF("/models/gaming-pc.glb");
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive ref={ref} object={scene} />;
}

function GenericGpu({ brand }: { brand: "nvidia" | "amd" }) {
  const accent = brand === "nvidia" ? "#22c55e" : "#ef4444";

  return (
    <group position={[8.5, -0.85, 0.3]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.1, 0.45, 0.75]} />
        <meshStandardMaterial color="#111114" roughness={0.35} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.24, 0.39]}>
        <boxGeometry args={[2.1, 0.05, 0.03]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Loader() {
  return null;
}

export default function PcCaseViewer({ gpuBrand }: { gpuBrand: GpuBrand }) {
  return (
    <div className="w-full">
      <div className="h-[70vh] max-h-[640px] min-h-[420px] w-full bg-gradient-to-b from-zinc-900 to-black">
        <Canvas shadows camera={{ position: [3, 2, 4], fov: 40 }}>
          <color attach="background" args={["#0a0a0a"]} />
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-3, 1, -2]} intensity={10} color="#a855f7" />
          <pointLight position={[3, 1, 2]} intensity={10} color="#ec4899" />

          <Suspense fallback={<Loader />}>
            <Bounds fit clip observe margin={1.2}>
              <GamingPcModel />
              {gpuBrand !== "none" && <GenericGpu brand={gpuBrand} />}
            </Bounds>
            <Environment preset="city" />
          </Suspense>

          <OrbitControls
            makeDefault
            enablePan={false}
            minDistance={1.5}
            maxDistance={8}
            autoRotate
            autoRotateSpeed={0.6}
          />

          <EffectComposer>
            <Bloom
              intensity={0.6}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
}

useGLTF.preload("/models/gaming-pc.glb");
