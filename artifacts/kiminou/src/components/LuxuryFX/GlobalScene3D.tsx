import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshDistortMaterial,
  Instances,
  Instance,
  AdaptiveDpr,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useLocation } from "wouter";
import * as THREE from "three";
import { use3DEnabled } from "@/hooks/use3D";
import { useShouldReduceEffects } from "@/hooks/useReducedMotion";

/* =========================================================================
   GlobalScene3D — a persistent, site-wide 3D backdrop.

   Design goals (per the brief): "super advanced + creative" but "safe, does
   not kill the viewer's eyes", and it must NOT hurt SEO.
     • Sits behind all content at z-index -1 with pointer-events: none — every
       headline and paragraph stays real, crawlable HTML on top of it.
     • Route-aware: the accent hue eases to a new color on each page.
     • Gentle by construction: slow drift, low bloom, no strobe/flash, muted
       so text contrast is never fought.
     • Perf-capped: dpr clamp, adaptive resolution, and the render loop is
       fully paused whenever the tab is hidden.
     • Fully skippable: off on touch / reduced-motion devices, and killable
       any time via the floating toggle (use3DEnabled).
   ========================================================================= */

/* Per-route accent — muted, low-saturation so nothing glares. */
function accentFor(path: string): THREE.Color {
  const p = path.toLowerCase();
  if (p.startsWith("/sports") || p.startsWith("/recruiting")) return new THREE.Color("#3355cc");
  if (p.startsWith("/books") || p.startsWith("/author") || p.startsWith("/reading")) return new THREE.Color("#c8912a");
  if (p.startsWith("/speaking") || p.startsWith("/podcast")) return new THREE.Color("#8a5cc8");
  if (p.startsWith("/press") || p.startsWith("/media")) return new THREE.Color("#2f9c8f");
  if (p.startsWith("/blog") || p.startsWith("/now")) return new THREE.Color("#b0602f");
  if (p.startsWith("/contact")) return new THREE.Color("#c04a5a");
  return new THREE.Color("#a8802a"); // home / default — literary gold
}

/* Big soft inverted core the whole scene glows from. */
function AuraCore({ target }: { target: React.MutableRefObject<THREE.Color> }) {
  const matRef = useRef<any>(null!);
  useFrame(() => {
    if (matRef.current?.color) matRef.current.color.lerp(target.current, 0.03);
    if (matRef.current?.emissive) matRef.current.emissive.lerp(target.current, 0.03);
  });
  return (
    <mesh position={[0, 0, -5]} scale={9}>
      <icosahedronGeometry args={[1, 12]} />
      <MeshDistortMaterial
        ref={matRef}
        color="#a8802a"
        emissive="#a8802a"
        emissiveIntensity={0.85}
        roughness={0.55}
        metalness={0.2}
        distort={0.32}
        speed={0.5}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

/* Slow gold-dust motes — GPU instanced, gentle vertical drift. */
const MOTE_COUNT = 160;
function Motes({ target }: { target: React.MutableRefObject<THREE.Color> }) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null!);
  const seeds = useMemo(() => {
    const a: { pos: THREE.Vector3; s: number; sp: number; ph: number }[] = [];
    for (let i = 0; i < MOTE_COUNT; i++) {
      a.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 22,
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8 - 2,
        ),
        s: 0.015 + Math.random() * 0.06,
        sp: 0.05 + Math.random() * 0.18,
        ph: Math.random() * Math.PI * 2,
      });
    }
    return a;
  }, []);
  useFrame(() => {
    if (matRef.current) {
      matRef.current.color.lerp(target.current, 0.03);
      matRef.current.emissive.lerp(target.current, 0.03);
    }
  });
  return (
    <Instances limit={MOTE_COUNT} range={MOTE_COUNT}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        ref={matRef}
        color="#a8802a"
        emissive="#a8802a"
        emissiveIntensity={1.1}
        roughness={0.4}
        metalness={0.1}
        toneMapped={false}
      />
      {seeds.map((s, i) => (
        <Mote key={i} seed={s} />
      ))}
    </Instances>
  );
}
function Mote({ seed }: { seed: { pos: THREE.Vector3; s: number; sp: number; ph: number } }) {
  const ref = useRef<any>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.position.y = seed.pos.y + Math.sin(t * seed.sp + seed.ph) * 0.8;
    ref.current.position.x = seed.pos.x + Math.cos(t * seed.sp * 0.6 + seed.ph) * 0.4;
  });
  return <Instance ref={ref} position={seed.pos} scale={seed.s} />;
}

/* Gentle pointer parallax + scroll dolly. Damped so it never snaps. */
function CameraDrift() {
  const { camera } = useThree();
  const scrollRef = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      scrollRef.current = Math.min(1, window.scrollY / max);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useFrame((state, dt) => {
    const targetX = state.pointer.x * 0.5;
    const targetY = 0.3 + state.pointer.y * 0.35 - scrollRef.current * 0.8;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2, dt);
    camera.lookAt(0, 0, -6);
  });
  return null;
}

function SceneContents() {
  const [location] = useLocation();
  const target = useRef<THREE.Color>(accentFor("/"));
  useEffect(() => {
    target.current = accentFor(location);
  }, [location]);

  return (
    <>
      <color attach="background" args={["#08090c"]} />
      <fog attach="fog" args={["#08090c", 8, 26]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 4, 2]} intensity={22} color="#fff2d0" distance={40} />
      <pointLight position={[-6, -3, -4]} intensity={14} color="#4560ff" distance={40} />

      <CameraDrift />
      <AuraCore target={target} />
      <Motes target={target} />

      <Environment resolution={128} frames={Infinity}>
        <Lightformer intensity={1.4} color="#fff2d0" position={[0, 4, -6]} scale={[10, 6, 1]} />
        <Lightformer intensity={0.8} color="#4560ff" position={[-6, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={[8, 5, 1]} />
      </Environment>

      {/* Gentle glow: soft bloom on the aura + motes, plus a calming vignette. */}
      <EffectComposer>
        <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.5} luminanceSmoothing={0.35} />
        <Vignette eskil={false} offset={0.28} darkness={0.7} />
      </EffectComposer>

      <AdaptiveDpr pixelated />
    </>
  );
}

/** Pauses the render loop whenever the tab is hidden (battery + eye safety). */
function useTabVisible() {
  const [visible, setVisible] = useState(
    typeof document === "undefined" ? true : !document.hidden,
  );
  useEffect(() => {
    const on = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);
  return visible;
}

export default function GlobalScene3D() {
  const enabled = use3DEnabled();
  const reduceEffects = useShouldReduceEffects();
  const visible = useTabVisible();

  const active = enabled && !reduceEffects;

  // Toggle a root class so a single CSS rule can turn the full-page shells
  // into a translucent scrim that lets the backdrop glow through — without
  // touching any per-page markup. Cleaned up whenever 3D is inactive.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("threed-on", active);
    return () => root.classList.remove("threed-on");
  }, [active]);

  // Off by preference, or on touch / reduced-motion devices: render nothing.
  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0.3, 6], fov: 46, near: 0.1, far: 60 }}
      >
        <SceneContents />
      </Canvas>
    </div>
  );
}
