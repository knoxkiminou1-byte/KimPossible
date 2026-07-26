import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  Float,
  MeshTransmissionMaterial,
  Instances,
  Instance,
  AdaptiveDpr,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, SMAA, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { use3DEnabled, registerForegroundScene } from "@/hooks/use3D";
import { useShouldReduceEffects } from "@/hooks/useReducedMotion";

/* =========================================================================
   PageHero3D — a dedicated FOREGROUND 3D hero for a single page.

   Unlike the site-wide backdrop (GlobalScene3D), this is a focal 3D object
   embedded INSIDE a page's hero section, sitting above the hero background but
   behind the hero text (the page gives its text `relative z-10`). Only the
   current route's hero mounts, so there's never more than one of these live —
   no lag. Text stays real HTML on top → SEO safe. Honors the global 3D toggle
   and reduced-motion / touch.
   ========================================================================= */

export type HeroVariant = "home" | "books" | "speaking" | "about" | "portfolio";

const ACCENT: Record<HeroVariant, string> = {
  home: "#d4a017",
  books: "#c8912a",
  speaking: "#8a5cc8",
  about: "#c99a3a",
  portfolio: "#d4a017",
};

/* home — a small gold glass accent, lifted clear of the centered wordmark so
   it complements the mural hero instead of colliding with the title. */
function HomeForm() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.18;
      ref.current.rotation.x += dt * 0.07;
    }
  });
  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.8}>
      <mesh ref={ref} position={[0, 2.35, 0]} scale={0.42}>
        <torusKnotGeometry args={[1.05, 0.34, 220, 36]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={1}
          roughness={0.06}
          ior={1.5}
          chromaticAberration={0.3}
          anisotropy={0.4}
          distortion={0.3}
          distortionScale={0.4}
          temporalDistortion={0.2}
          clearcoat={1}
          clearcoatRoughness={0.08}
          iridescence={1}
          iridescenceIOR={1.6}
          iridescenceThicknessRange={[100, 480]}
          color="#f5ead0"
          emissive="#d4a017"
          emissiveIntensity={0.12}
          attenuationColor="#e2b23a"
          attenuationDistance={2}
        />
      </mesh>
    </Float>
  );
}

/* books — a cluster of glowing tomes orbiting a center. */
function BooksForm() {
  const COUNT = 22;
  const group = useRef<THREE.Group>(null!);
  const seeds = useMemo(() => {
    const a: { p: THREE.Vector3; r: THREE.Euler; s: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      const theta = (i / COUNT) * Math.PI * 2;
      const rad = 1.7 + Math.random() * 1.4;
      a.push({
        p: new THREE.Vector3(Math.cos(theta) * rad, (Math.random() - 0.5) * 2.4, Math.sin(theta) * rad),
        r: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
        s: 0.42 + Math.random() * 0.42,
      });
    }
    return a;
  }, []);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.14;
  });
  return (
    // Offset right + back so the cluster clears the left wordmark and top nav.
    <group ref={group} position={[1.4, -0.2, -0.6]}>
      <Instances limit={COUNT} range={COUNT}>
        <boxGeometry args={[0.7, 0.95, 0.12]} />
        <meshStandardMaterial color="#c8912a" emissive="#c8912a" emissiveIntensity={0.7} roughness={0.45} metalness={0.35} />
        {seeds.map((s, i) => (
          <BookInstance key={i} seed={s} />
        ))}
      </Instances>
    </group>
  );
}
function BookInstance({ seed }: { seed: { p: THREE.Vector3; r: THREE.Euler; s: number } }) {
  const ref = useRef<any>(null!);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.y = seed.p.y + Math.sin(clock.elapsedTime * 0.5 + seed.p.x) * 0.25;
  });
  return <Instance ref={ref} position={seed.p} rotation={seed.r} scale={seed.s} />;
}

/* speaking — concentric sound rings pulsing outward like a waveform. */
function SpeakingForm() {
  const RINGS = 16;
  const group = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.z += 0.0015;
    group.current.children.forEach((c, i) => {
      const phase = t * 0.7 - i * 0.28;
      const pulse = 0.5 + i * 0.28 + (Math.sin(phase) * 0.5 + 0.5) * 0.4;
      c.scale.setScalar(pulse);
      const m = (c as THREE.Mesh).material as THREE.Material & { opacity: number };
      m.opacity = 0.15 + (Math.sin(phase) * 0.5 + 0.5) * 0.5;
    });
  });
  return (
    <group ref={group}>
      {Array.from({ length: RINGS }).map((_, i) => (
        <mesh key={i}>
          <torusGeometry args={[1, 0.018, 12, 120]} />
          <meshStandardMaterial color="#8a5cc8" emissive="#8a5cc8" emissiveIntensity={1.4} roughness={0.3} metalness={0.2} transparent opacity={0.3} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

/* about — a slow rotating glass frame (identity in one frame). */
function AboutForm() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.2;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.25} floatIntensity={0.5}>
      <mesh ref={ref}>
        <torusGeometry args={[1.3, 0.12, 48, 140]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.8}
          roughness={0.08}
          ior={1.4}
          chromaticAberration={0.24}
          clearcoat={1}
          clearcoatRoughness={0.1}
          iridescence={0.9}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[120, 500]}
          color="#f0e2c0"
          attenuationColor="#c99a3a"
          attenuationDistance={3}
        />
      </mesh>
    </Float>
  );
}

/* portfolio — a full showstopper: a slow ring of reflective monolith "work"
   slabs orbiting an iridescent glass core, with the whole rig gently tumbling. */
function MonolithRing() {
  const SLABS = 11;
  const ring = useRef<THREE.Group>(null!);
  const core = useRef<THREE.Mesh>(null!);
  const slabs = useMemo(() => {
    const a: { angle: number; h: number; tilt: number }[] = [];
    for (let i = 0; i < SLABS; i++) {
      a.push({
        angle: (i / SLABS) * Math.PI * 2,
        h: 1.6 + Math.random() * 1.4,
        tilt: (Math.random() - 0.5) * 0.3,
      });
    }
    return a;
  }, []);
  useFrame((state, dt) => {
    if (ring.current) {
      ring.current.rotation.y += dt * 0.16;
      ring.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;
    }
    if (core.current) {
      core.current.rotation.y -= dt * 0.25;
      core.current.rotation.x += dt * 0.1;
    }
  });
  const RADIUS = 2.3;
  return (
    // Offset right so the ring dominates center-right and clears the left copy.
    <group position={[0.9, 0, 0]}>
      <group ref={ring}>
        {slabs.map((s, i) => (
          <mesh
            key={i}
            position={[Math.cos(s.angle) * RADIUS, 0, Math.sin(s.angle) * RADIUS]}
            rotation={[s.tilt, -s.angle + Math.PI / 2, 0]}
            castShadow
          >
            <boxGeometry args={[0.9, s.h, 0.08]} />
            <meshStandardMaterial
              color="#14161c"
              roughness={0.28}
              metalness={0.92}
              envMapIntensity={0.7}
              emissive="#d4a017"
              emissiveIntensity={0.02}
            />
          </mesh>
        ))}
      </group>
      {/* iridescent glass core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.95, 1]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={1.4}
          roughness={0.06}
          ior={1.5}
          chromaticAberration={0.34}
          anisotropy={0.5}
          distortion={0.35}
          distortionScale={0.5}
          temporalDistortion={0.25}
          clearcoat={1}
          clearcoatRoughness={0.08}
          iridescence={1}
          iridescenceIOR={1.6}
          iridescenceThicknessRange={[100, 520]}
          color="#f5ead0"
          attenuationColor="#e2b23a"
          attenuationDistance={2.4}
        />
      </mesh>
    </group>
  );
}

function HeroScene({ variant }: { variant: HeroVariant }) {
  const accent = ACCENT[variant];
  const form = (() => {
    switch (variant) {
      case "books":
        return <BooksForm />;
      case "speaking":
        return <SpeakingForm />;
      case "about":
        return <AboutForm />;
      case "portfolio":
        return <MonolithRing />;
      default:
        return <HomeForm />;
    }
  })();
  return (
    <>
      <fog attach="fog" args={["#08090c", 6, 22]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 4, 3]} intensity={30} color="#fff2d0" distance={30} />
      <pointLight position={[-5, -3, -3]} intensity={16} color={accent} distance={30} />
      {/* Gold rim light — rakes the form's edges for that expensive glass glint. */}
      <spotLight position={[0, -1, -6]} intensity={60} angle={0.9} penumbra={1} color="#ffd77a" distance={26} />
      {form}
      {/* Static lightformers — bake once rather than every frame. */}
      <Environment resolution={160} frames={1}>
        <Lightformer intensity={1.7} color="#fff2d0" position={[0, 4, -5]} scale={[10, 6, 1]} />
        <Lightformer intensity={1.1} color={accent} position={[-6, 0, 1]} rotation={[0, Math.PI / 2, 0]} scale={[8, 5, 1]} />
        <Lightformer intensity={1.1} color={accent} position={[6, 0, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[8, 5, 1]} />
        <Lightformer form="ring" intensity={1.4} color="#ffe9b0" position={[0, 0, 6]} scale={[3, 3, 1]} />
      </Environment>
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={1.05} luminanceThreshold={0.5} luminanceSmoothing={0.32} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0007]}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette eskil={false} offset={0.28} darkness={0.68} />
        <SMAA />
      </EffectComposer>
      <AdaptiveDpr pixelated />
    </>
  );
}

export default function PageHero3D({ variant }: { variant: HeroVariant }) {
  const enabled = use3DEnabled();
  const reduceEffects = useShouldReduceEffects();
  const active = enabled && !reduceEffects;

  // Tell the site-wide backdrop to stand down while this hero owns the page,
  // so only one WebGL context is ever live.
  useEffect(() => {
    if (!active) return;
    return registerForegroundScene();
  }, [active]);

  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false }}
        camera={{ position: [0, 0, 6], fov: 42, near: 0.1, far: 40 }}
      >
        <Suspense fallback={null}>
          <HeroScene variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  );
}
