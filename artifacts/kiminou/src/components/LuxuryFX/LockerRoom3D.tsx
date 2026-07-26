import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  SSAO,
  Vignette,
  ChromaticAberration,
  ToneMapping,
  SMAA,
} from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import * as THREE from "three";
import { registerForegroundScene } from "@/hooks/use3D";

/* ─── Constants ──────────────────────────────────────────────── */
const LOCKER_W = 0.72;
const LOCKER_H = 2.0;
const LOCKER_D = 0.55;
const LOCKER_GAP = 0.04;
const COLS = 16;
const ROWS = 2;
const ROOM_W = 22;
const ROOM_H = 4.8;
const ROOM_D = 14;

/* ─── Shared materials ───────────────────────────────────────── */
function useLockerMats() {
  return useMemo(() => {
    const metalBody = new THREE.MeshStandardMaterial({
      color: 0x16191f,
      roughness: 0.5,
      metalness: 0.92,
    });
    const metalDoor = new THREE.MeshStandardMaterial({
      color: 0x1c2030,
      roughness: 0.38,
      metalness: 0.95,
    });
    const metalTrim = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      roughness: 0.22,
      metalness: 1.0,
      emissive: new THREE.Color(0xd4a017),
      emissiveIntensity: 0.22,
    });
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0b0c0e,
      roughness: 0.25,
      metalness: 0.55,
      envMapIntensity: 1.2,
    });
    const ceilMat = new THREE.MeshStandardMaterial({
      color: 0x060708,
      roughness: 0.98,
      metalness: 0.0,
    });
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x0d1018,
      roughness: 0.82,
      metalness: 0.18,
    });
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xfff5d0,
      emissive: new THREE.Color(0xfff5d0),
      emissiveIntensity: 2.8,
      roughness: 1,
      metalness: 0,
    });
    const openBackMat = new THREE.MeshStandardMaterial({
      color: 0x080a0d,
      roughness: 1,
      metalness: 0,
    });
    const jerseyMat = new THREE.MeshStandardMaterial({
      color: 0xc8993a,
      roughness: 0.7,
      metalness: 0.1,
      emissive: new THREE.Color(0xc8993a),
      emissiveIntensity: 0.14,
    });
    const benchWoodMat = new THREE.MeshStandardMaterial({
      color: 0x261a10,
      roughness: 0.85,
      metalness: 0.08,
    });
    const benchLegMat = new THREE.MeshStandardMaterial({
      color: 0x181b22,
      roughness: 0.45,
      metalness: 0.88,
    });
    const ballMat = new THREE.MeshStandardMaterial({
      color: 0xc45a1a,
      roughness: 0.78,
      metalness: 0.05,
    });
    const bannerMat = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      roughness: 0.6,
      metalness: 0.2,
      emissive: new THREE.Color(0xd4a017),
      emissiveIntensity: 0.08,
      side: THREE.DoubleSide,
    });
    return { metalBody, metalDoor, metalTrim, floorMat, ceilMat, wallMat, glowMat, openBackMat, jerseyMat, benchWoodMat, benchLegMat, ballMat, bannerMat };
  }, []);
}

/* ─── Locker Unit ───────────────────────────────────────────────── */
function LockerUnit({
  x,
  isOpen,
  mats,
  featured,
}: {
  x: number;
  isOpen: boolean;
  mats: ReturnType<typeof useLockerMats>;
  featured?: boolean;
}) {
  const { metalBody, metalDoor, metalTrim, openBackMat, jerseyMat, ballMat } = mats;
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (glowRef.current && featured) {
      glowRef.current.intensity = 1.1 + Math.sin(clock.elapsedTime * 1.6) * 0.35;
    }
  });

  return (
    <group position={[x, 0, 0]}>
      {/* Body shell */}
      <mesh material={metalBody} castShadow receiveShadow>
        <boxGeometry args={[LOCKER_W, LOCKER_H, LOCKER_D]} />
      </mesh>

      {/* Ventilation slits */}
      <mesh material={metalTrim} position={[0, LOCKER_H * 0.42, LOCKER_D / 2 + 0.002]}>
        <boxGeometry args={[LOCKER_W * 0.62, 0.022, 0.004]} />
      </mesh>
      <mesh material={metalTrim} position={[0, LOCKER_H * 0.38, LOCKER_D / 2 + 0.002]}>
        <boxGeometry args={[LOCKER_W * 0.62, 0.022, 0.004]} />
      </mesh>
      <mesh material={metalTrim} position={[0, LOCKER_H * 0.34, LOCKER_D / 2 + 0.002]}>
        <boxGeometry args={[LOCKER_W * 0.62, 0.022, 0.004]} />
      </mesh>
      <mesh material={metalTrim} position={[0, -LOCKER_H * 0.42, LOCKER_D / 2 + 0.002]}>
        <boxGeometry args={[LOCKER_W * 0.62, 0.022, 0.004]} />
      </mesh>

      {/* Number plate trim */}
      <mesh material={metalTrim} position={[0, LOCKER_H * 0.28, LOCKER_D / 2 + 0.003]}>
        <boxGeometry args={[LOCKER_W * 0.48, 0.035, 0.004]} />
      </mesh>

      {/* Locker handle */}
      <mesh material={metalTrim} position={[LOCKER_W * 0.3, 0, LOCKER_D / 2 + 0.014]}>
        <boxGeometry args={[0.022, 0.16, 0.022]} />
      </mesh>

      {/* Side edge trim strips */}
      <mesh material={metalTrim} position={[-LOCKER_W / 2 + 0.01, 0, LOCKER_D / 2 + 0.003]}>
        <boxGeometry args={[0.012, LOCKER_H, 0.004]} />
      </mesh>
      <mesh material={metalTrim} position={[LOCKER_W / 2 - 0.01, 0, LOCKER_D / 2 + 0.003]}>
        <boxGeometry args={[0.012, LOCKER_H, 0.004]} />
      </mesh>

      {/* Inside open locker */}
      {isOpen && (
        <>
          <mesh material={openBackMat} position={[0, 0, -LOCKER_D / 2 + 0.01]}>
            <boxGeometry args={[LOCKER_W - 0.06, LOCKER_H - 0.06, 0.02]} />
          </mesh>
          {/* Jersey */}
          <mesh material={jerseyMat} position={[0, 0.22, -LOCKER_D / 2 + 0.09]}>
            <boxGeometry args={[LOCKER_W * 0.58, LOCKER_H * 0.58, 0.028]} />
          </mesh>
          {/* Jersey number */}
          <mesh position={[0, 0.18, -LOCKER_D / 2 + 0.11]}>
            <boxGeometry args={[0.14, 0.22, 0.005]} />
            <meshStandardMaterial
              color={0xffffff}
              emissive={new THREE.Color(0xffffff)}
              emissiveIntensity={0.5}
            />
          </mesh>
          {/* Basketball on shelf */}
          <mesh material={ballMat} position={[0.1, -LOCKER_H * 0.3, -LOCKER_D / 2 + 0.18]}>
            <sphereGeometry args={[0.12, 20, 16]} />
          </mesh>
          {/* Glow from inside */}
          <pointLight
            ref={glowRef}
            position={[0, 0.1, -LOCKER_D / 2 + 0.35]}
            color={0xe8b020}
            intensity={1.1}
            distance={3.2}
          />
          {/* Secondary blue accent inside */}
          <pointLight
            position={[0, -0.5, -LOCKER_D / 2 + 0.2]}
            color={0x3060ff}
            intensity={0.3}
            distance={1.5}
          />
        </>
      )}

      {/* Door */}
      <mesh
        material={metalDoor}
        position={isOpen ? [-LOCKER_W * 0.48, 0, LOCKER_D / 2 + 0.005] : [0, 0, LOCKER_D / 2 + 0.005]}
        rotation={isOpen ? [0, -Math.PI * 0.58, 0] : [0, 0, 0]}
        castShadow
      >
        <boxGeometry args={[LOCKER_W - 0.04, LOCKER_H - 0.06, 0.028]} />
      </mesh>
    </group>
  );
}

/* ─── Locker Row ───────────────────────────────────────────────── */
function LockerRow({
  z,
  y,
  openIndex,
  mats,
}: {
  z: number;
  y: number;
  openIndex?: number;
  mats: ReturnType<typeof useLockerMats>;
}) {
  const step = LOCKER_W + LOCKER_GAP;
  const startX = -(COLS / 2) * step + step / 2;

  return (
    <group position={[0, y, z]}>
      {Array.from({ length: COLS }, (_, i) => {
        const x = startX + i * step;
        const isOpen = i === openIndex;
        return (
          <LockerUnit key={i} x={x} isOpen={isOpen} mats={mats} featured={isOpen} />
        );
      })}
    </group>
  );
}

/* ─── Ceiling Strip Lights ───────────────────────────────────────── */
function StripLight({ x, z, intensity = 1.8, mats }: { x: number; z: number; intensity?: number; mats: ReturnType<typeof useLockerMats> }) {
  const ref = useRef<THREE.PointLight>(null);
  const { glowMat } = mats;
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const flicker = 1 + Math.sin(t * 47 + x) * 0.018 + Math.sin(t * 13 + z) * 0.012;
    ref.current.intensity = intensity * flicker;
  });
  return (
    <group position={[x, ROOM_H / 2 - 0.1, z]}>
      <mesh material={glowMat}>
        <boxGeometry args={[0.12, 0.05, 2.8]} />
      </mesh>
      <pointLight
        ref={ref}
        color={0xfff8e0}
        intensity={intensity}
        distance={8}
        castShadow
        shadow-mapSize={[512, 512]}
      />
    </group>
  );
}

/* ─── Championship Banner ─────────────────────────────────────── */
function ChampionshipBanner({ mats }: { mats: ReturnType<typeof useLockerMats> }) {
  const { bannerMat } = mats;
  const bannerRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (bannerRef.current) {
      bannerRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.018;
    }
  });
  return (
    <group ref={bannerRef} position={[0, ROOM_H / 2 - 0.8, -ROOM_D / 2 + 0.3]}>
      {/* Main banner */}
      <mesh material={bannerMat}>
        <boxGeometry args={[2.4, 1.1, 0.012]} />
      </mesh>
      {/* Top rod */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[2.6, 0.06, 0.06]} />
        <meshStandardMaterial color={0xd4a017} metalness={1.0} roughness={0.2} emissive={new THREE.Color(0xd4a017)} emissiveIntensity={0.4} />
      </mesh>
      {/* Banner glow */}
      <pointLight position={[0, 0, 0.3]} color={0xd4a017} intensity={0.6} distance={3} />
    </group>
  );
}

/* ─── Floating Dust Particles ─────────────────────────────────── */
function DustParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const COUNT = 480;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * ROOM_W;
      positions[i * 3 + 1] = (Math.random() - 0.5) * ROOM_H;
      positions[i * 3 + 2] = (Math.random() - 0.5) * ROOM_D;
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.0009;
      velocities[i * 3 + 1] = Math.random() * 0.0007 + 0.00015;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0007;
    }
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const arr = (meshRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 0] += velocities[i * 3 + 0];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      if (arr[i * 3 + 1] > ROOM_H / 2) arr[i * 3 + 1] = -ROOM_H / 2;
      if (Math.abs(arr[i * 3 + 0]) > ROOM_W / 2) arr[i * 3 + 0] *= -0.98;
      if (Math.abs(arr[i * 3 + 2]) > ROOM_D / 2) arr[i * 3 + 2] *= -0.98;
    }
    (meshRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return (
    <points ref={meshRef} geometry={geo}>
      <pointsMaterial
        color={0xe8b830}
        size={0.028}
        sizeAttenuation
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Animated Camera Rig ─────────────────────────────────────── */
function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.6, ROOM_D / 2 - 0.8);
    camera.lookAt(0, 0.5, -ROOM_D / 2);
  }, [camera]);

  useFrame(({ clock, mouse }) => {
    const t = clock.elapsedTime;
    const drift = Math.sin(t * 0.1) * 2.2;
    const verticalDrift = Math.sin(t * 0.065) * 0.18;
    const depthDrift = Math.sin(t * 0.08) * 0.6;
    const mx = mouse.x * 0.5;
    const my = mouse.y * 0.25;
    camera.position.x += (drift + mx - camera.position.x) * 0.011;
    camera.position.y += (0.6 + verticalDrift + my - camera.position.y) * 0.011;
    camera.position.z += (ROOM_D / 2 - 0.8 + depthDrift - camera.position.z) * 0.008;
    camera.lookAt(drift * 0.18 + mx * 0.5, 0.5 + my * 0.3, -ROOM_D / 2 + 1);
  });

  return null;
}

/* ─── Bench ───────────────────────────────────────────────────── */
function Bench({ mats, z }: { mats: ReturnType<typeof useLockerMats>; z: number }) {
  const { benchWoodMat, benchLegMat, ballMat } = mats;
  return (
    <group position={[0, -ROOM_H / 2 + 0.22, z]}>
      {/* Seat plank */}
      <mesh material={benchWoodMat} receiveShadow castShadow>
        <boxGeometry args={[ROOM_W * 0.82, 0.07, 0.38]} />
      </mesh>
      {/* Legs */}
      {[-ROOM_W * 0.36, -ROOM_W * 0.12, ROOM_W * 0.12, ROOM_W * 0.36].map((lx, i) => (
        <mesh key={i} material={benchLegMat} position={[lx, -0.26, 0]} castShadow>
          <boxGeometry args={[0.055, 0.48, 0.055]} />
        </mesh>
      ))}
      {/* Stray basketball on bench */}
      <mesh material={ballMat} position={[2.5, 0.16, 0]} castShadow>
        <sphereGeometry args={[0.145, 22, 18]} />
      </mesh>
      {/* Equipment bag hint under bench */}
      <mesh position={[-3, -0.35, 0]} receiveShadow>
        <boxGeometry args={[0.9, 0.28, 0.32]} />
        <meshStandardMaterial color={0x1a1d26} roughness={0.9} metalness={0.05} />
      </mesh>
    </group>
  );
}

/* ─── Floor Grid Lines ─────────────────────────────────────────── */
function FloorLines() {
  const lineMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0xd4a017,
    emissive: new THREE.Color(0xd4a017),
    emissiveIntensity: 0.25,
    roughness: 0.4,
    metalness: 0.8,
    transparent: true,
    opacity: 0.18,
  }), []);

  return (
    <group position={[0, -ROOM_H / 2 + 0.002, 0]}>
      {/* Center line */}
      <mesh material={lineMat} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, ROOM_D]} />
      </mesh>
      {/* Side accent lines */}
      {[-3, 3].map((x, i) => (
        <mesh key={i} material={lineMat} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0, 0]}>
          <planeGeometry args={[0.025, ROOM_D]} />
        </mesh>
      ))}
      {/* Cross lines */}
      {[-2, 0, 2].map((z, i) => (
        <mesh key={i} material={lineMat} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, z]}>
          <planeGeometry args={[ROOM_W, 0.025]} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Post-processing stack ───────────────────────────────────── */
function PostFX() {
  return (
    // multisampling off — SMAA owns anti-aliasing (clean edges, cheaper).
    <EffectComposer multisampling={0} enableNormalPass>
      {/* Ambient occlusion for contact grounding in the corners */}
      <SSAO
        blendFunction={BlendFunction.MULTIPLY}
        samples={16}
        radius={5}
        intensity={18}
        luminanceInfluence={0.6}
        color={"black" as any}
      />
      {/* Bloom lifts the strip lights, gold trim and warm locker glow */}
      <Bloom
        mipmapBlur
        intensity={1.0}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.3}
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0004, 0.0006]}
        radialModulation={false}
        modulationOffset={0}
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <Vignette eskil={false} offset={0.28} darkness={0.8} />
      <SMAA />
    </EffectComposer>
  );
}

/* ─── Full 3D Scene ───────────────────────────────────────────── */
function LockerRoomScene() {
  const mats = useLockerMats();
  const { floorMat, ceilMat, wallMat } = mats;
  const halfH = ROOM_H / 2;
  const halfD = ROOM_D / 2;
  const halfW = ROOM_W / 2;

  return (
    <>
      {/* Fog — deeper, more dramatic */}
      <fog attach="fog" args={[0x060709, 5, 26]} />

      {/* Ambient — cool blue tint */}
      <ambientLight color={0x131a2a} intensity={1.1} />

      {/* Procedural HDRI — gives the metal lockers real reflections (no external file) */}
      {/* Static lightformers — bake once rather than every frame. */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.2} color="#fff2d0" position={[0, 4, -6]} scale={[14, 6, 1]} />
        <Lightformer intensity={1.1} color="#2050ff" position={[-8, 1, 0]} rotation={[0, Math.PI / 2, 0]} scale={[10, 5, 1]} />
        <Lightformer intensity={1.1} color="#1a3aff" position={[8, 1, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[10, 5, 1]} />
        <Lightformer intensity={1.6} color="#f0a010" position={[0, 0, -5]} scale={[3, 3, 1]} />
      </Environment>

      {/* Ceiling strip lights — more of them */}
      <StripLight x={-4} z={-2} intensity={2.0} mats={mats} />
      <StripLight x={-1.5} z={1} intensity={1.7} mats={mats} />
      <StripLight x={1.5} z={-3} intensity={1.9} mats={mats} />
      <StripLight x={4} z={2} intensity={2.1} mats={mats} />

      {/* Dramatic blue-purple rim from ceiling edges */}
      <pointLight color={0x1a3aff} intensity={0.45} position={[-halfW + 1, halfH - 0.5, 0]} distance={12} />
      <pointLight color={0x2050ff} intensity={0.35} position={[halfW - 1, halfH - 0.5, 0]} distance={12} />

      {/* Warm amber pool at open locker */}
      <pointLight color={0xf0a010} intensity={1.4} position={[0, 0, -halfD + 1.5]} distance={7} />

      {/* Cool blue backlight from camera side */}
      <pointLight color={0x0a2060} intensity={0.6} position={[0, 1.5, halfD - 1]} distance={9} />

      {/* Spotlight from above on center bench */}
      <spotLight
        color={0xfff5d0}
        intensity={4}
        position={[0, halfH - 0.2, 1.2]}
        angle={Math.PI / 7}
        penumbra={0.6}
        distance={10}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Camera */}
      <CameraRig />

      {/* Floor — polished/reflective */}
      <mesh
        material={floorMat}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -halfH, 0]}
        receiveShadow
      >
        <planeGeometry args={[ROOM_W, ROOM_D, 18, 18]} />
      </mesh>

      {/* Floor grid accent lines */}
      <FloorLines />

      {/* Ceiling */}
      <mesh
        material={ceilMat}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, halfH, 0]}
        receiveShadow
      >
        <planeGeometry args={[ROOM_W, ROOM_D]} />
      </mesh>

      {/* Side walls */}
      <mesh
        material={wallMat}
        rotation={[0, Math.PI / 2, 0]}
        position={[-halfW, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[ROOM_D, ROOM_H]} />
      </mesh>
      <mesh
        material={wallMat}
        rotation={[0, -Math.PI / 2, 0]}
        position={[halfW, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[ROOM_D, ROOM_H]} />
      </mesh>

      {/* Front wall */}
      <mesh material={wallMat} position={[0, 0, halfD]} receiveShadow>
        <planeGeometry args={[ROOM_W, ROOM_H]} />
      </mesh>

      {/* Back wall */}
      <mesh material={wallMat} rotation={[0, Math.PI, 0]} position={[0, 0, -halfD]} receiveShadow>
        <planeGeometry args={[ROOM_W, ROOM_H]} />
      </mesh>

      {/* Championship banner */}
      <ChampionshipBanner mats={mats} />

      {/* BACK LOCKER WALL */}
      <group position={[0, 0, -halfD + LOCKER_D / 2 + 0.02]}>
        <LockerRow z={0} y={halfH - LOCKER_H * 0.72} openIndex={Math.floor(COLS / 2)} mats={mats} />
        <LockerRow z={0} y={halfH - LOCKER_H * 1.68} mats={mats} />
      </group>

      {/* LEFT LOCKER WALL */}
      <group rotation={[0, Math.PI / 2, 0]} position={[-halfW + LOCKER_D / 2 + 0.02, 0, 0]}>
        <LockerRow z={0} y={halfH - LOCKER_H * 0.72} mats={mats} />
        <LockerRow z={0} y={halfH - LOCKER_H * 1.68} mats={mats} />
      </group>

      {/* RIGHT LOCKER WALL */}
      <group rotation={[0, -Math.PI / 2, 0]} position={[halfW - LOCKER_D / 2 - 0.02, 0, 0]}>
        <LockerRow z={0} y={halfH - LOCKER_H * 0.72} mats={mats} />
        <LockerRow z={0} y={halfH - LOCKER_H * 1.68} mats={mats} />
      </group>

      {/* Benches */}
      <Bench mats={mats} z={1.4} />
      <Bench mats={mats} z={-1.8} />

      {/* Dust particles */}
      <DustParticles />

      {/* Cinematic post-processing */}
      <PostFX />
    </>
  );
}

/* ─── Exported Canvas Wrapper ─────────────────────────────────── */
export default function LockerRoom3D() {
  // This page owns the only WebGL context while it's mounted.
  useEffect(() => registerForegroundScene(), []);

  return (
    <Canvas
      shadows
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.NoToneMapping,
      }}
      camera={{ fov: 58, near: 0.1, far: 50 }}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      dpr={[1, 1.8]}
    >
      <LockerRoomScene />
    </Canvas>
  );
}
