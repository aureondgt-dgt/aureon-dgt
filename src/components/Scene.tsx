import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { HOLE, HOLE_R, OUTER, OUTER_R, roundedSegments, type Pt } from "../lib/shape";

const input = { mx: 0, my: 0, scroll: 0 };

function buildPath<T extends THREE.Path>(path: T, pts: Pt[], r: number): T {
  const segs = roundedSegments(pts, r);
  path.moveTo(segs[0].start[0], segs[0].start[1]);
  segs.forEach((s, i) => {
    if (i > 0) path.lineTo(s.start[0], s.start[1]);
    path.quadraticCurveTo(s.ctrl[0], s.ctrl[1], s.end[0], s.end[1]);
  });
  path.closePath();
  return path;
}

function LogoMesh() {
  const group = useRef<THREE.Group>(null!);
  const spin = useRef(0);
  const { size } = useThree();

  const geometry = useMemo(() => {
    const shape = buildPath(new THREE.Shape(), OUTER, OUTER_R);
    shape.holes.push(buildPath(new THREE.Path(), HOLE, HOLE_R));
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.32,
      bevelEnabled: true,
      bevelThickness: 0.14,
      bevelSize: 0.1,
      bevelSegments: 10,
      curveSegments: 32,
    });
    g.center();
    g.computeVertexNormals();
    return g;
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const mobile = size.width < 900;
    const p = Math.min(input.scroll, 1.6);
    spin.current += delta * 0.25;

    const baseX = mobile ? 0 : 2.3;
    const baseY = mobile ? 1.05 : 0.05;
    const targetX = THREE.MathUtils.lerp(baseX, 0, Math.min(p, 1));
    const targetY = baseY + p * (mobile ? 0.6 : 0.2);
    const targetZ = -p * 3.2;
    const s = mobile ? 0.82 : 1.15;

    g.position.x = THREE.MathUtils.damp(g.position.x, targetX, 4, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, targetY, 4, delta);
    g.position.z = THREE.MathUtils.damp(g.position.z, targetZ, 4, delta);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, s, 4, delta));

    const ry = input.mx * 0.7 + Math.sin(spin.current) * 0.35 + p * Math.PI * 1.5;
    const rx = -input.my * 0.45 + p * 0.4;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ry, 5, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, rx, 5, delta);
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, input.mx * 0.4, 2, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, input.my * 0.25, 2, delta);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.6}>
        <mesh geometry={geometry} castShadow>
          <meshPhysicalMaterial
            color="#e9e9ec"
            metalness={1}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.08}
            envMapIntensity={1.6}
          />
        </mesh>
        <Rings />
      </Float>
    </group>
  );
}

function Rings() {
  const a = useRef<THREE.Mesh>(null!);
  const b = useRef<THREE.Mesh>(null!);
  useFrame((_, d) => {
    if (a.current) {
      a.current.rotation.z += d * 0.3;
      a.current.rotation.x += d * 0.12;
    }
    if (b.current) {
      b.current.rotation.z -= d * 0.22;
      b.current.rotation.y += d * 0.18;
    }
  });
  return (
    <>
      <mesh ref={a} rotation={[1.2, 0.2, 0]}>
        <torusGeometry args={[2.25, 0.012, 16, 200]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.2} emissive="#9ca3af" emissiveIntensity={0.4} />
      </mesh>
      <mesh ref={b} rotation={[0.4, 1.1, 0]}>
        <torusGeometry args={[2.6, 0.006, 16, 200]} />
        <meshStandardMaterial color="#d4d4d8" metalness={1} roughness={0.3} emissive="#71717a" emissiveIntensity={0.5} />
      </mesh>
    </>
  );
}

function Orbs() {
  const group = useRef<THREE.Group>(null!);
  const orbs = useMemo(
    () =>
      Array.from({ length: 14 }, () => ({
        pos: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8,
          -2 - Math.random() * 6,
        ] as [number, number, number],
        s: 0.05 + Math.random() * 0.18,
      })),
    []
  );
  useFrame((_, d) => {
    if (group.current) {
      group.current.rotation.y += d * 0.02;
      group.current.position.y = input.scroll * 1.5;
    }
  });
  return (
    <group ref={group}>
      {orbs.map((o, i) => (
        <Float key={i} speed={1 + (i % 4)} floatIntensity={1.5}>
          <mesh position={o.pos}>
            <sphereGeometry args={[o.s, 32, 32]} />
            <meshStandardMaterial color="#cfcfd4" metalness={1} roughness={0.15} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function Scene() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      input.mx = (e.clientX / window.innerWidth) * 2 - 1;
      input.my = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      input.scroll = window.scrollY / window.innerHeight;
    };
    onScroll();
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 40 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-4, -2, 3]} intensity={20} color="#ffffff" />
      <LogoMesh />
      <Orbs />
      <Sparkles count={120} scale={[14, 9, 6]} size={2} speed={0.35} color="#e5e7eb" opacity={0.6} />
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#000000"]} />
        <Lightformer form="rect" intensity={4} position={[0, 4, -6]} scale={[12, 1.2, 1]} />
        <Lightformer form="rect" intensity={2.5} position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[10, 1.5, 1]} />
        <Lightformer form="rect" intensity={2.5} position={[6, 1, 2]} rotation-y={-Math.PI / 2} scale={[10, 0.8, 1]} />
        <Lightformer form="ring" intensity={3} position={[2, 2, 6]} scale={3} />
        <Lightformer form="rect" intensity={1.5} position={[0, -4, 3]} rotation-x={-Math.PI / 2} scale={[10, 2, 1]} />
        <Lightformer form="circle" intensity={6} position={[-3, 3, 5]} scale={1.5} />
      </Environment>
    </Canvas>
  );
}
