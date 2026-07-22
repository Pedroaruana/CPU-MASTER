"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

export type GpuBrand = "none" | "nvidia" | "amd";

function GamingPcModel({ shadows }: { shadows: boolean }) {
  const { scene } = useGLTF("/models/gaming-pc.glb");
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = shadows;
        child.receiveShadow = shadows;
      }
    });
  }, [scene, shadows]);

  return <primitive ref={ref} object={scene} />;
}

function useIsLowPower() {
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    /* eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza com media query real do dispositivo, so existe no client */
    setIsLowPower(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsLowPower(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isLowPower;
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

function GenericRam() {
  const sticks = [-0.14, 0.14];

  return (
    <group position={[8.85, 0.45, 0.15]}>
      {sticks.map((offset) => (
        <group key={offset} position={[offset, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.1, 1.0, 0.55]} />
            <meshStandardMaterial color="#1c1c1f" roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.51, 0]}>
            <boxGeometry args={[0.11, 0.03, 0.55]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={2.2}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function GenericSsd() {
  return (
    <group position={[8.15, -0.2, 0.32]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.55, 0.06, 0.22]} />
        <meshStandardMaterial color="#1c1c1f" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.035, 0]}>
        <boxGeometry args={[0.5, 0.01, 0.18]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Loader() {
  return null;
}

export default function PcCaseViewer({
  gpuBrand,
  ramSelected,
  ssdSelected,
}: {
  gpuBrand: GpuBrand;
  ramSelected: boolean;
  ssdSelected: boolean;
}) {
  const isLowPower = useIsLowPower();

  return (
    <div className="w-full">
      <div className="h-[70vh] max-h-[640px] min-h-[420px] w-full bg-gradient-to-b from-zinc-900 to-black">
        <Canvas
          shadows={!isLowPower}
          dpr={isLowPower ? 1 : [1, 2]}
          camera={{ position: [3, 2, 4], fov: 40 }}
        >
          <color attach="background" args={["#0a0a0a"]} />
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            castShadow={!isLowPower}
            shadow-mapSize-width={isLowPower ? 512 : 2048}
            shadow-mapSize-height={isLowPower ? 512 : 2048}
          />
          <pointLight position={[-3, 1, -2]} intensity={10} color="#a855f7" />
          <pointLight position={[3, 1, 2]} intensity={10} color="#ec4899" />

          <Suspense fallback={<Loader />}>
            <Bounds fit clip observe margin={1.2}>
              <GamingPcModel shadows={!isLowPower} />
              {gpuBrand !== "none" && <GenericGpu brand={gpuBrand} />}
              {ramSelected && <GenericRam />}
              {ssdSelected && <GenericSsd />}
            </Bounds>
            {!isLowPower && <Environment preset="city" />}
          </Suspense>

          <OrbitControls
            makeDefault
            enablePan={false}
            minDistance={1.5}
            maxDistance={8}
            autoRotate
            autoRotateSpeed={0.6}
          />

          {!isLowPower && (
            <EffectComposer>
              <Bloom
                intensity={0.6}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
            </EffectComposer>
          )}
        </Canvas>
      </div>
    </div>
  );
}

useGLTF.preload("/models/gaming-pc.glb");
