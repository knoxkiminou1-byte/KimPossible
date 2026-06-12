import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Constants ──────────────────────────────────────────────── */
const LOCKER_W = 0.72;
const LOCKER_H = 2.0;
const LOCKER_D = 0.55;
const LOCKER_GAP = 0.04;
const COLS = 14;
const ROWS = 2;
const ROOM_W = 20;
const ROOM_H = 4.2;
const ROOM_D = 12;

/* ─── Shared materials ───────────────────────────────────────── */
function useLockerMats() {
  return useMemo(() => {
    const metalBody = new THREE.MeshStandardMaterial({
      color: 0x1a1d22,
      roughness: 0.55,
      metalness: 0.85,
    });
    const metalDoor = new THREE.MeshStandardMaterial({
      color: 0x202530,
      roughness: 0.45,
      metalness: 0.9,
    });
    const metalTrim = new THREE.MeshStandardMaterial({
      color: 0xd4a017,
      roughness: 0.3,
      metalness: 1.0,
      emissive: new THREE.Color(0xd4a017),
      emissiveIntensity: 0.12,
    });
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0d0e0f,
      roughness: 0.92,
      metalness: 0.05,
    });
    const ceilMat = new THREE.MeshStandardMaterial({
      color: 0x080909,
      roughness: 0.95,
      metalness: 0.0,
    });
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x111318,
      roughness: 0.85,
      metalness: 0.1,
    });
    const glowMat = new THREE.MeshStandardMaterial({
      color: 0xfff5d0,
      emissive: new THREE.Color(0xfff5d0),
      emissiveIntensity: 2.2,
      roughness: 1,
      metalness: 0,
    });
    const openBackMat = new THREE.MeshStandardMaterial({
      color: 0x0a0c0e,
      roughness: 1,
      metalness: 0,
    });
    const jerseyMat = new THREE.MeshStandardMaterial({
      color: 0xc8993a,
      roughness: 0.8,
      metalness: 0.0,
      emissive: new THREE.Color(0xc8993a),
      emissiveIntensity: 0.06,
    });
    return { metalBody, metalDoor, metalTrim, floorMat, ceilMat, wallMat, glowMat, openBackMat, jerseyMat };
  }, []);
}

/* ─── Locker geometry (instanced) ───────────────────────────── */
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
  const { metalBody, metalDoor, metalTrim, openBackMat, jerseyMat } = mats;
  const step = LOCKER_W + LOCKER_GAP;
  const startX = -(COLS / 2) * step + step / 2;

  return (
    <group position={[0, y, z]}>
      {Array.from({ length: COLS }, (_, i) => {
        const x = startX + i * step;
        const isOpen = i === openIndex;
        return (
          <LockerUnit
            key={i}
            x={x}
            isOpen={isOpen}
            mats={mats}
            featured={isOpen}
          />
        );
      })}
    </group>
  );
}

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
  const { metalBody, metalDoor, metalTrim, openBackMat, jerseyMat } = mats;
  const doorRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (glowRef.current && featured) {
      glowRef.current.intensity = 0.6 + Math.sin(clock.elapsedTime * 1.4) * 0.2;
    }
  });

  return (
    <group position={[x, 0, 0]}>
      {/* Body shell */}
      <mesh material={metalBody} castShadow receiveShadow>
        <boxGeometry args={[LOCKER_W, LOCKER_H, LOCKER_D]} />
      </mesh>

      {/* Ventilation slits (top + bottom decorative strips) */}
      <mesh material={metalTrim} position={[0, LOCKER_H * 0.42, LOCKER_D / 2 + 0.002]}>
        <boxGeometry args={[LOCKER_W * 0.6, 0.02, 0.004]} />
      </mesh>
      <mesh material={metalTrim} position={[0, LOCKER_H * 0.38, LOCKER_D / 2 + 0.002]}>
        <boxGeometry args={[LOCKER_W * 0.6, 0.02, 0.004]} />
      </mesh>
      <mesh material={metalTrim} position={[0, -LOCKER_H * 0.42, LOCKER_D / 2 + 0.002]}>
        <boxGeometry args={[LOCKER_W * 0.6, 0.02, 0.004]} />
      </mesh>

      {/* Number plate trim */}
      <mesh material={metalTrim} position={[0, LOCKER_H * 0.28, LOCKER_D / 2 + 0.003]}>
        <boxGeometry args={[LOCKER_W * 0.45, 0.03, 0.004]} />
      </mesh>

      {/* Locker handle */}
      <mesh material={metalTrim} position={[LOCKER_W * 0.3, 0, LOCKER_D / 2 + 0.012]}>
        <boxGeometry args={[0.02, 0.14, 0.02]} />
      </mesh>

      {/* Inside back panel */}
      {isOpen && (
        <>
          <mesh material={openBackMat} position={[0, 0, -LOCKER_D / 2 + 0.01]}>
            <boxGeometry args={[LOCKER_W - 0.06, LOCKER_H - 0.06, 0.02]} />
          </mesh>
          {/* Jersey hanging */}
          <mesh material={jerseyMat} position={[0, 0.2, -LOCKER_D / 2 + 0.08]}>
            <boxGeometry args={[LOCKER_W * 0.55, LOCKER_H * 0.55, 0.025]} />
          </mesh>
          {/* Jersey number accent */}
          <mesh
            position={[0, 0.15, -LOCKER_D / 2 + 0.1]}
          >
            <boxGeometry args={[0.12, 0.2, 0.005]} />
            <meshStandardMaterial
              color={0xffffff}
              emissive={new THREE.Color(0xffffff)}
              emissiveIntensity={0.3}
            />
          </mesh>
          {/* Helmet on shelf at bottom */}
          <mesh position={[0, -LOCKER_H * 0.34, -LOCKER_D / 2 + 0.14]}>
            <sphereGeometry args={[0.14, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
            <meshStandardMaterial color={0x1a2a5a} metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Glow from inside */}
          <pointLight
            ref={glowRef}
            position={[0, 0, -LOCKER_D / 2 + 0.3]}
            color={0xd4a017}
            intensity={0.6}
            distance={2.5}
          />
        </>
      )}

      {/* Door (open = rotated away) */}
      <mesh
        ref={doorRef}
        material={metalDoor}
        position={isOpen ? [-LOCKER_W * 0.45, 0, LOCKER_D / 2 + 0.005] : [0, 0, LOCKER_D / 2 + 0.005]}
        rotation={isOpen ? [0, -Math.PI * 0.55, 0] : [0, 0, 0]}
        castShadow
      >
        <boxGeometry args={[LOCKER_W - 0.04, LOCKER_H - 0.06, 0.025]} />
      </mesh>
    </group>
  );
}

/* ─── Ceiling Strip Lights ───────────────────────────────────── */
function StripLight({ x, z, mats }: { x: number; z: number; mats: ReturnType<typeof useLockerMats> }) {
  const ref = useRef<THREE.PointLight>(null);
  const { glowMat } = mats;
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    // slight organic flicker
    const flicker = 1 + Math.sin(t * 47 + x) * 0.015 + Math.sin(t * 13 + z) * 0.01;
    ref.current.intensity = 1.8 * flicker;
  });
  return (
    <group position={[x, ROOM_H / 2 - 0.1, z]}>
      {/* Fixture box */}
      <mesh material={glowMat}>
        <boxGeometry args={[0.12, 0.05, 2.4]} />
      </mesh>
      <pointLight
        ref={ref}
        color={0xfff5d0}
        intensity={1.8}
        distance={7}
        castShadow
        shadow-mapSize={[512, 512]}
      />
    </group>
  );
}

/* ─── Floating Dust Particles ─────────────────────────────────── */
function DustParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const COUNT = 320;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * ROOM_W;
      positions[i * 3 + 1] = (Math.random() - 0.5) * ROOM_H;
      positions[i * 3 + 2] = (Math.random() - 0.5) * ROOM_D;
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.0008;
      velocities[i * 3 + 1] = Math.random() * 0.0006 + 0.0002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0006;
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
        color={0xd4a017}
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Animated Camera Rig ─────────────────────────────────────── */
function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.5, ROOM_D / 2 - 0.8);
    camera.lookAt(0, 0.5, -ROOM_D / 2);
  }, [camera]);

  useFrame(({ clock, mouse }) => {
    const t = clock.elapsedTime;
    // Slow cinematic drift
    const drift = Math.sin(t * 0.12) * 1.8;
    const verticalDrift = Math.sin(t * 0.07) * 0.15;
    // Subtle mouse parallax
    const mx = mouse.x * 0.4;
    const my = mouse.y * 0.2;
    camera.position.x += (drift + mx - camera.position.x) * 0.012;
    camera.position.y += (0.5 + verticalDrift + my - camera.position.y) * 0.012;
    camera.lookAt(drift * 0.2 + mx * 0.5, 0.5 + my * 0.3, -ROOM_D / 2 + 1);
  });

  return null;
}

/* ─── Bench ───────────────────────────────────────────────────── */
function Bench({ mats, z }: { mats: ReturnType<typeof useLockerMats>; z: number }) {
  const woodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x2a1f15,
        roughness: 0.88,
        metalness: 0.05,
      }),
    []
  );
  const legMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x1a1d22,
        roughness: 0.5,
        metalness: 0.8,
      }),
    []
  );
  return (
    <group position={[0, -ROOM_H / 2 + 0.22, z]}>
      {/* Seat plank */}
      <mesh material={woodMat} receiveShadow>
        <boxGeometry args={[ROOM_W * 0.8, 0.07, 0.35]} />
      </mesh>
      {/* Legs */}
      {[-ROOM_W * 0.35, -ROOM_W * 0.12, ROOM_W * 0.12, ROOM_W * 0.35].map((lx, i) => (
        <mesh key={i} material={legMat} position={[lx, -0.24, 0]}>
          <boxGeometry args={[0.05, 0.44, 0.05]} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Full 3D Scene ───────────────────────────────────────────── */
function LockerRoomScene() {
  const mats = useLockerMats();
  const { floorMat, ceilMat, wallMat } = mats;
  const halfH = ROOM_H / 2;
  const halfD = ROOM_D / 2;
  const halfW = ROOM_W / 2;

  const step = LOCKER_W + LOCKER_GAP;
  const rowWidth = COLS * step;

  return (
    <>
      {/* Fog */}
      <fog attach="fog" args={[0x07080a, 4, 22]} />

      {/* Ambient */}
      <ambientLight color={0x1a1e28} intensity={0.8} />

      {/* Ceiling strip lights */}
      <StripLight x={-3} z={0} mats={mats} />
      <StripLight x={0} z={-2} mats={mats} />
      <StripLight x={3} z={2} mats={mats} />

      {/* Warm fill from featured locker */}
      <pointLight color={0xd4a017} intensity={0.9} position={[0, 0, -halfD + 1.2]} distance={5} />

      {/* Camera */}
      <CameraRig />

      {/* Floor */}
      <mesh
        material={floorMat}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -halfH, 0]}
        receiveShadow
      >
        <planeGeometry args={[ROOM_W, ROOM_D, 12, 12]} />
      </mesh>

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

      {/* Front wall (behind camera) */}
      <mesh
        material={wallMat}
        position={[0, 0, halfD]}
        receiveShadow
      >
        <planeGeometry args={[ROOM_W, ROOM_H]} />
      </mesh>

      {/* Back wall (behind lockers) */}
      <mesh
        material={wallMat}
        rotation={[0, Math.PI, 0]}
        position={[0, 0, -halfD]}
        receiveShadow
      >
        <planeGeometry args={[ROOM_W, ROOM_H]} />
      </mesh>

      {/* BACK LOCKER WALL — top row */}
      <group position={[0, 0, -halfD + LOCKER_D / 2 + 0.02]}>
        <LockerRow z={0} y={halfH - LOCKER_H * 0.75} openIndex={Math.floor(COLS / 2)} mats={mats} />
        <LockerRow z={0} y={halfH - LOCKER_H * 1.72} mats={mats} />
      </group>

      {/* LEFT LOCKER WALL — rotated 90° */}
      <group rotation={[0, Math.PI / 2, 0]} position={[-halfW + LOCKER_D / 2 + 0.02, 0, 0]}>
        <LockerRow z={0} y={halfH - LOCKER_H * 0.75} mats={mats} />
        <LockerRow z={0} y={halfH - LOCKER_H * 1.72} mats={mats} />
      </group>

      {/* RIGHT LOCKER WALL — rotated -90° */}
      <group rotation={[0, -Math.PI / 2, 0]} position={[halfW - LOCKER_D / 2 - 0.02, 0, 0]}>
        <LockerRow z={0} y={halfH - LOCKER_H * 0.75} mats={mats} />
        <LockerRow z={0} y={halfH - LOCKER_H * 1.72} mats={mats} />
      </group>

      {/* Benches */}
      <Bench mats={mats} z={1.2} />
      <Bench mats={mats} z={-1.5} />

      {/* Dust particles */}
      <DustParticles />
    </>
  );
}

/* ─── Exported Canvas Wrapper ─────────────────────────────────── */
export default function LockerRoom3D() {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ fov: 62, near: 0.1, far: 40 }}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      dpr={[1, 1.5]}
    >
      <LockerRoomScene />
    </Canvas>
  );
}
