import { Suspense, useMemo, useRef } from "react";
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
import { EffectComposer, Bloom, Vignette, SMAA } from "@react-three/postprocessing";
import * as THREE from "three";
import { use3DEnabled } from "@/hooks/use3D";
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

export type HeroVariant = "home" | "books" | "speaking" | "about";

const ACCENT: Record<HeroVariant, string> = {
  home: "#d4a017",
  books: "#c8912a",
  speaking: "#8a5cc8",
  about: "#c99a3a",
};

/* home — a slow gold glass knot, the site's signature focal form. */
function HomeForm() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.15;
      ref.current.rotation.x += dt * 0.06;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.7}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[1.05, 0.34, 260, 40]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={1.2}
          roughness={0.12}
          ior={1.5}
          chromaticAberration={0.22}
          anisotropy={0.3}
          distortion={0.3}
          distortionScale={0.4}
          temporalDistortion={0.2}
          color="#f3e6c0"
          attenuationColor="#d4a017"
          attenuationDistance={2.4}
        />
      </mesh>
    </Float>
  );
}

/* books — a cluster of glowing tomes orbiting a center. */
function BooksForm() {
  const COUNT = 26;
  const group = useRef<THREE.Group>(null!);
  const seeds = useMemo(() => {
    const a: { p: THREE.Vector3; r: THREE.Euler; s: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      const theta = (i / COUNT) * Math.PI * 2;
      const rad = 1.6 + Math.random() * 1.6;
      a.push({
        p: new THREE.Vector3(Math.cos(theta) * rad, (Math.random() - 0.5) * 2.6, Math.sin(theta) * rad),
        r: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
        s: 0.5 + Math.random() * 0.5,
      });
    }
    return a;
  }, []);
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.14;
  });
  return (
    <group ref={group}>
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
        <torusGeometry args={[1.3, 0.12, 24, 80]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.8}
          roughness={0.15}
          ior={1.4}
          chromaticAberration={0.18}
          color="#f0e2c0"
          attenuationColor="#c99a3a"
          attenuationDistance={3}
        />
      </mesh>
    </Float>
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
      {form}
      <Environment resolution={128} frames={Infinity}>
        <Lightformer intensity={1.6} color="#fff2d0" position={[0, 4, -5]} scale={[10, 6, 1]} />
        <Lightformer intensity={1} color={accent} position={[-6, 0, 1]} rotation={[0, Math.PI / 2, 0]} scale={[8, 5, 1]} />
        <Lightformer intensity={1} color={accent} position={[6, 0, 1]} rotation={[0, -Math.PI / 2, 0]} scale={[8, 5, 1]} />
      </Environment>
      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.55} luminanceSmoothing={0.3} />
        <Vignette eskil={false} offset={0.3} darkness={0.65} />
        <SMAA />
      </EffectComposer>
      <AdaptiveDpr pixelated />
    </>
  );
}

export default function PageHero3D({ variant }: { variant: HeroVariant }) {
  const enabled = use3DEnabled();
  const reduceEffects = useShouldReduceEffects();
  if (!enabled || reduceEffects) return null;

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
