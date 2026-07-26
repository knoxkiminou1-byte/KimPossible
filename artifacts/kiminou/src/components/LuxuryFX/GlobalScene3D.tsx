import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshDistortMaterial,
  AdaptiveDpr,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, SMAA } from "@react-three/postprocessing";
import { useLocation } from "wouter";
import * as THREE from "three";
import { use3DEnabled, useForegroundSceneActive } from "@/hooks/use3D";
import { useShouldReduceEffects } from "@/hooks/useReducedMotion";
import { Formation, worldForRoute } from "@/components/LuxuryFX/Formations";

/* =========================================================================
   GlobalScene3D — a persistent, site-wide 3D backdrop.

   Design goals (per the brief): "super advanced + creative" but "safe, does
   not kill the viewer's eyes", and it must NOT hurt SEO.
     • Sits behind all content at z-index -1 with pointer-events: none — every
       headline and paragraph stays real, crawlable HTML on top of it.
     • Route-aware WORLDS: each page family renders its own distinct instanced
       formation (see Formations.tsx) with its own geometry + motion + accent —
       so every route reads as its own 3D scene, not one uniform backdrop.
     • Gentle by construction: slow drift, low bloom, no strobe/flash, muted
       so text contrast is never fought.
     • Perf-capped: dpr clamp, adaptive resolution, and the render loop is
       fully paused whenever the tab is hidden.
     • Fully skippable: off on touch / reduced-motion devices, and killable
       any time via the floating toggle (use3DEnabled).
   ========================================================================= */

/* Big soft inverted core the whole scene glows from. */
function AuraCore({ target }: { target: React.MutableRefObject<THREE.Color> }) {
  const matRef = useRef<any>(null!);
  useFrame(() => {
    if (matRef.current?.color) matRef.current.color.lerp(target.current, 0.03);
    if (matRef.current?.emissive) matRef.current.emissive.lerp(target.current, 0.03);
  });
  return (
    <mesh position={[0, 0, -11]} scale={13}>
      <icosahedronGeometry args={[1, 16]} />
      <MeshDistortMaterial
        ref={matRef}
        color="#a8802a"
        emissive="#a8802a"
        emissiveIntensity={0.45}
        roughness={0.7}
        metalness={0.1}
        distort={0.45}
        speed={0.5}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
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
  const world = worldForRoute(location);
  const target = useRef<THREE.Color>(new THREE.Color(worldForRoute("/").color));
  useEffect(() => {
    target.current = new THREE.Color(worldForRoute(location).color);
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
      {/* Per-route 3D world — keyed so switching pages remounts cleanly. */}
      <Formation key={world.kind} kind={world.kind} target={target} />

      {/* Static lightformers, so bake the cubemap once instead of re-rendering
          all six faces every frame — this was the single biggest GPU cost. */}
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={1.4} color="#fff2d0" position={[0, 4, -6]} scale={[10, 6, 1]} />
        <Lightformer intensity={0.8} color="#4560ff" position={[-6, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={[8, 5, 1]} />
      </Environment>

      {/* Gentle glow: soft bloom on the aura + motes, calming vignette, SMAA
          for clean edges (no pixelated shimmer on the drifting motes). */}
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={1.15} luminanceThreshold={0.45} luminanceSmoothing={0.35} />
        <Vignette eskil={false} offset={0.28} darkness={0.7} />
        <SMAA />
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

  // Pages that own a foreground canvas (PageHero3D / LockerRoom3D) register
  // themselves. Stacking the backdrop on top of one meant two live WebGL
  // contexts, two post-processing chains and two render loops on the same page
  // — the main reason those routes felt sluggish. The hero canvas wins.
  const foregroundActive = useForegroundSceneActive();
  const active = enabled && !reduceEffects && !foregroundActive;

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
