import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Instances, Instance, Float } from "@react-three/drei";
import * as THREE from "three";

/* =========================================================================
   Formations — per-route 3D "worlds" for the site-wide backdrop.

   Every page family gets a distinct instanced formation with its own geometry
   and motion signature, so each route reads as its own 3D scene while sharing
   one Canvas / lighting / post / perf harness (see GlobalScene3D). All motion
   is slow and low-contrast (eye-safe); instance counts are capped for perf.
   ========================================================================= */

export type WorldKind = "constellation" | "tomes" | "sound" | "gallery" | "flow";

/** Route → which world to render + its accent color. */
export function worldForRoute(path: string): { kind: WorldKind; color: string } {
  const p = path.toLowerCase();
  if (p.startsWith("/books") || p.startsWith("/author") || p.startsWith("/reading") || p.startsWith("/works"))
    return { kind: "tomes", color: "#c8912a" };
  if (p.startsWith("/speaking") || p.startsWith("/podcast") || p.startsWith("/voice"))
    return { kind: "sound", color: "#8a5cc8" };
  if (p.startsWith("/press") || p.startsWith("/media") || p.startsWith("/portfolio") || p.startsWith("/legacy"))
    return { kind: "gallery", color: "#2f9c8f" };
  if (p.startsWith("/blog") || p.startsWith("/now") || p.startsWith("/contact"))
    return { kind: "flow", color: p.startsWith("/contact") ? "#c04a5a" : "#b0602f" };
  return { kind: "constellation", color: "#a8802a" }; // home / default
}

/* Shared: an instanced material whose color eases toward the route accent. */
function useAccentMat(target: React.MutableRefObject<THREE.Color>, emissiveIntensity = 1.1) {
  const ref = useRef<THREE.MeshStandardMaterial>(null!);
  useFrame(() => {
    if (ref.current) {
      ref.current.color.lerp(target.current, 0.03);
      ref.current.emissive.lerp(target.current, 0.03);
    }
  });
  return { ref, emissiveIntensity };
}

/* ── constellation: scattered glowing nodes drifting in a loose sphere ──── */
function Constellation({ target }: { target: React.MutableRefObject<THREE.Color> }) {
  const COUNT = 150;
  const { ref, emissiveIntensity } = useAccentMat(target, 1.2);
  const seeds = useMemo(() => {
    const a: { p: THREE.Vector3; s: number; sp: number; ph: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      a.push({
        p: new THREE.Vector3((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 8 - 2),
        s: 0.02 + Math.random() * 0.07,
        sp: 0.05 + Math.random() * 0.2,
        ph: Math.random() * 6.28,
      });
    }
    return a;
  }, []);
  return (
    <Instances limit={COUNT} range={COUNT}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial ref={ref} color="#a8802a" emissive="#a8802a" emissiveIntensity={emissiveIntensity} roughness={0.4} metalness={0.1} toneMapped={false} />
      {seeds.map((s, i) => (
        <Drifter key={i} seed={s} />
      ))}
    </Instances>
  );
}

/* ── tomes: floating thin "books/pages" slowly turning ─────────────────── */
function Tomes({ target }: { target: React.MutableRefObject<THREE.Color> }) {
  const COUNT = 90;
  const { ref, emissiveIntensity } = useAccentMat(target, 1.3);
  const seeds = useMemo(() => {
    const a: { p: THREE.Vector3; r: THREE.Euler; s: number; sp: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      a.push({
        p: new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 13, (Math.random() - 0.5) * 7 - 2),
        r: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
        s: 0.25 + Math.random() * 0.4,
        sp: 0.1 + Math.random() * 0.3,
      });
    }
    return a;
  }, []);
  return (
    <Instances limit={COUNT} range={COUNT}>
      <boxGeometry args={[0.7, 1, 0.08]} />
      <meshStandardMaterial ref={ref} color="#c8912a" emissive="#c8912a" emissiveIntensity={emissiveIntensity} roughness={0.5} metalness={0.3} />
      {seeds.map((s, i) => (
        <Turner key={i} seed={s} />
      ))}
    </Instances>
  );
}

/* ── sound: concentric rings pulsing outward like a waveform ───────────── */
function Sound({ target }: { target: React.MutableRefObject<THREE.Color> }) {
  const RINGS = 12;
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);
  useFrame(() => {
    if (matRef.current) {
      matRef.current.color.lerp(target.current, 0.03);
      matRef.current.emissive.lerp(target.current, 0.03);
    }
  });
  const group = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.children.forEach((c, i) => {
      const phase = t * 0.6 - i * 0.35;
      const pulse = 1 + (Math.sin(phase) * 0.5 + 0.5) * 1.6;
      c.scale.setScalar(pulse);
      (c as THREE.Mesh).position.z = -2 - i * 0.15;
      const m = (c as THREE.Mesh).material as THREE.Material & { opacity: number };
      m.opacity = 0.12 + (Math.sin(phase) * 0.5 + 0.5) * 0.22;
    });
  });
  return (
    <group ref={group} position={[0, 0, -2]}>
      {Array.from({ length: RINGS }).map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.4, 0.02, 12, 96]} />
          <meshStandardMaterial
            ref={i === 0 ? matRef : undefined}
            color="#8a5cc8"
            emissive="#8a5cc8"
            emissiveIntensity={1.4}
            roughness={0.3}
            metalness={0.2}
            transparent
            opacity={0.2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── gallery: a slow parallax grid of hanging frames/planes ────────────── */
function Gallery({ target }: { target: React.MutableRefObject<THREE.Color> }) {
  const COUNT = 60;
  const { ref, emissiveIntensity } = useAccentMat(target, 1.2);
  const seeds = useMemo(() => {
    const a: { p: THREE.Vector3; s: number; sp: number; ph: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      a.push({
        p: new THREE.Vector3((Math.random() - 0.5) * 22, (Math.random() - 0.5) * 13, (Math.random() - 0.5) * 6 - 3),
        s: 0.5 + Math.random() * 0.9,
        sp: 0.04 + Math.random() * 0.12,
        ph: Math.random() * 6.28,
      });
    }
    return a;
  }, []);
  return (
    <Instances limit={COUNT} range={COUNT}>
      <planeGeometry args={[0.9, 1.25]} />
      <meshStandardMaterial ref={ref} color="#2f9c8f" emissive="#2f9c8f" emissiveIntensity={emissiveIntensity} roughness={0.6} metalness={0.2} side={THREE.DoubleSide} />
      {seeds.map((s, i) => (
        <Hover key={i} seed={s} />
      ))}
    </Instances>
  );
}

/* ── flow: a stream of elongated shards flowing along an S-curve ────────── */
function Flow({ target }: { target: React.MutableRefObject<THREE.Color> }) {
  const COUNT = 160;
  const { ref, emissiveIntensity } = useAccentMat(target, 1.0);
  const seeds = useMemo(() => {
    const a: { off: number; radius: number; y: number; s: number; sp: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      a.push({
        off: Math.random(),
        radius: 3 + Math.random() * 7,
        y: (Math.random() - 0.5) * 12,
        s: 0.04 + Math.random() * 0.12,
        sp: 0.03 + Math.random() * 0.06,
      });
    }
    return a;
  }, []);
  return (
    <Instances limit={COUNT} range={COUNT}>
      <boxGeometry args={[0.08, 0.08, 0.5]} />
      <meshStandardMaterial ref={ref} color="#b0602f" emissive="#b0602f" emissiveIntensity={emissiveIntensity} roughness={0.4} metalness={0.2} toneMapped={false} />
      {seeds.map((s, i) => (
        <Streamer key={i} seed={s} />
      ))}
    </Instances>
  );
}

/* ── per-instance motion helpers ───────────────────────────────────────── */
function Drifter({ seed }: { seed: { p: THREE.Vector3; s: number; sp: number; ph: number } }) {
  const ref = useRef<any>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.position.y = seed.p.y + Math.sin(t * seed.sp + seed.ph) * 0.8;
    ref.current.position.x = seed.p.x + Math.cos(t * seed.sp * 0.6 + seed.ph) * 0.4;
  });
  return <Instance ref={ref} position={seed.p} scale={seed.s} />;
}
function Turner({ seed }: { seed: { p: THREE.Vector3; r: THREE.Euler; s: number; sp: number } }) {
  const ref = useRef<any>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.rotation.y = seed.r.y + t * seed.sp;
    ref.current.rotation.x = seed.r.x + Math.sin(t * seed.sp) * 0.3;
    ref.current.position.y = seed.p.y + Math.sin(t * seed.sp * 0.7) * 0.5;
  });
  return <Instance ref={ref} position={seed.p} rotation={seed.r} scale={seed.s} />;
}
function Hover({ seed }: { seed: { p: THREE.Vector3; s: number; sp: number; ph: number } }) {
  const ref = useRef<any>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.position.y = seed.p.y + Math.sin(t * seed.sp + seed.ph) * 0.6;
    ref.current.rotation.y = Math.sin(t * seed.sp * 0.5 + seed.ph) * 0.4;
  });
  return <Instance ref={ref} position={seed.p} scale={seed.s} />;
}
function Streamer({ seed }: { seed: { off: number; radius: number; y: number; s: number; sp: number } }) {
  const ref = useRef<any>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.elapsedTime * seed.sp + seed.off) % 1;
    const angle = t * Math.PI * 2;
    ref.current.position.set(
      Math.sin(angle * 2) * seed.radius,
      seed.y + Math.sin(angle) * 1.5,
      Math.cos(angle) * seed.radius - 2,
    );
    ref.current.rotation.set(angle * 2, angle, 0);
  });
  return <Instance ref={ref} scale={seed.s} />;
}

/* ── public switch ─────────────────────────────────────────────────────── */
export function Formation({
  kind,
  target,
}: {
  kind: WorldKind;
  target: React.MutableRefObject<THREE.Color>;
}) {
  const inner = (() => {
    switch (kind) {
      case "tomes":
        return <Tomes target={target} />;
      case "sound":
        return <Sound target={target} />;
      case "gallery":
        return <Gallery target={target} />;
      case "flow":
        return <Flow target={target} />;
      default:
        return <Constellation target={target} />;
    }
  })();
  return (
    <Float speed={0.6} rotationIntensity={0.15} floatIntensity={0.4}>
      {inner}
    </Float>
  );
}
