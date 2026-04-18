import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════
   HERO 3D SCENE  —  Real-estate themed
   Clean-edge wireframe luxury building + smooth golden rings
   ═══════════════════════════════════════════════════════════ */

/* ─── Clean Edge Box (no ugly face diagonals) ─── */
const EdgeBox = ({ args, position, rotation, color = '#D4A84B', opacity = 1 }) => {
  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(...args)),
    [args]
  );
  return (
    <lineSegments position={position} rotation={rotation}>
      <primitive object={edges} attach="geometry" />
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
};

/* ─── Full Smooth Gold Ring ─── */
const GoldRing = ({ radius = 2, tube = 0.02, rotation, speed = 0.08 }) => {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x += 0.001 * speed;
    ref.current.rotation.z += 0.0015 * speed;
    ref.current.rotation.y = t * speed;
  });
  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, tube, 24, 200]} />
      <meshStandardMaterial
        color="#D4A84B"
        metalness={0.95}
        roughness={0.05}
        emissive="#C19A6B"
        emissiveIntensity={0.55}
      />
    </mesh>
  );
};

/* ─── Wireframe Luxury House Silhouette ─── */
const HouseWireframe = () => {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.06;
    groupRef.current.position.y = Math.sin(t * 0.35) * 0.12;
  });

  const fill = {
    color: '#C19A6B',
    metalness: 0.95,
    roughness: 0.05,
    transparent: true,
    opacity: 0.12,
    emissive: '#C19A6B',
    emissiveIntensity: 0.1,
    side: 2,
  };

  const slab = {
    color: '#D4A84B',
    metalness: 0.95,
    roughness: 0.05,
    emissive: '#C19A6B',
    emissiveIntensity: 0.45,
    transparent: true,
    opacity: 0.7,
  };

  const gold = '#D4A84B';

  return (
    <group ref={groupRef} position={[0.8, 0, 0]}>

      {/* ═══ GROUND FLOOR ═══ */}
      {/* Clean edge outline */}
      <EdgeBox args={[2.0, 0.95, 1.4]} position={[0, -0.3, 0]} color={gold} />
      {/* Transparent fill */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[2.0, 0.95, 1.4]} />
        <meshStandardMaterial {...fill} />
      </mesh>

      {/* ═══ UPPER FLOOR — cantilevered ═══ */}
      <EdgeBox args={[2.2, 0.85, 1.3]} position={[0.15, 0.65, 0]} color={gold} />
      <mesh position={[0.15, 0.65, 0]}>
        <boxGeometry args={[2.2, 0.85, 1.3]} />
        <meshStandardMaterial {...fill} />
      </mesh>

      {/* ═══ FLOOR SLAB (separation between floors) ═══ */}
      <mesh position={[0.05, 0.2, 0]}>
        <boxGeometry args={[2.35, 0.04, 1.55]} />
        <meshStandardMaterial {...slab} />
      </mesh>
      <EdgeBox args={[2.35, 0.04, 1.55]} position={[0.05, 0.2, 0]} color={gold} opacity={0.8} />

      {/* ═══ ROOF SLAB — wide overhang ═══ */}
      <mesh position={[0.1, 1.1, 0]}>
        <boxGeometry args={[2.55, 0.04, 1.65]} />
        <meshStandardMaterial {...slab} />
      </mesh>
      <EdgeBox args={[2.55, 0.04, 1.65]} position={[0.1, 1.1, 0]} color={gold} opacity={0.85} />

      {/* ═══ SIDE WING ═══ */}
      <EdgeBox args={[0.8, 0.65, 1.0]} position={[-1.35, -0.45, 0.15]} color={gold} opacity={0.7} />
      <mesh position={[-1.35, -0.45, 0.15]}>
        <boxGeometry args={[0.8, 0.65, 1.0]} />
        <meshStandardMaterial {...fill} opacity={0.08} />
      </mesh>
      {/* wing roof */}
      <mesh position={[-1.35, -0.1, 0.15]}>
        <boxGeometry args={[0.9, 0.03, 1.1]} />
        <meshStandardMaterial {...slab} opacity={0.55} />
      </mesh>
      <EdgeBox args={[0.9, 0.03, 1.1]} position={[-1.35, -0.1, 0.15]} color={gold} opacity={0.65} />

      {/* ═══ BALCONY ═══ */}
      <mesh position={[1.2, 0.22, 0.88]}>
        <boxGeometry args={[0.9, 0.03, 0.4]} />
        <meshStandardMaterial {...slab} opacity={0.6} />
      </mesh>
      <EdgeBox args={[0.9, 0.03, 0.4]} position={[1.2, 0.22, 0.88]} color={gold} opacity={0.7} />
      {/* railing */}
      <EdgeBox args={[0.9, 0.25, 0.015]} position={[1.2, 0.37, 1.06]} color={gold} opacity={0.5} />

      {/* ═══ POOL ═══ */}
      <mesh position={[0.3, -0.78, 1.05]}>
        <boxGeometry args={[1.2, 0.06, 0.5]} />
        <meshStandardMaterial
          color="#6ab8e8"
          metalness={0.8}
          roughness={0.05}
          transparent
          opacity={0.45}
          emissive="#4a90c0"
          emissiveIntensity={0.3}
        />
      </mesh>
      <EdgeBox args={[1.2, 0.06, 0.5]} position={[0.3, -0.78, 1.05]} color="#6ab8e8" opacity={0.6} />

      {/* ═══ GLASS WINDOWS (glow panels) ═══ */}
      {/* front ground floor */}
      <mesh position={[-0.25, -0.3, 0.7]}>
        <planeGeometry args={[0.6, 0.65]} />
        <meshStandardMaterial
          color="#8ac0e8" metalness={0.7} roughness={0.05}
          transparent opacity={0.2}
          emissive="#6a9fc0" emissiveIntensity={0.2} side={2}
        />
      </mesh>
      {/* front upper floor — large glass */}
      <mesh position={[0.35, 0.65, 0.65]}>
        <planeGeometry args={[1.0, 0.6]} />
        <meshStandardMaterial
          color="#8ac0e8" metalness={0.7} roughness={0.05}
          transparent opacity={0.22}
          emissive="#6a9fc0" emissiveIntensity={0.18} side={2}
        />
      </mesh>
      {/* right side glass curtain */}
      <mesh position={[1.25, 0.65, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.0, 0.6]} />
        <meshStandardMaterial
          color="#8ac0e8" metalness={0.7} roughness={0.05}
          transparent opacity={0.18}
          emissive="#6a9fc0" emissiveIntensity={0.15} side={2}
        />
      </mesh>

      {/* ═══ FOUNDATION ═══ */}
      <mesh position={[0, -0.78, 0]}>
        <boxGeometry args={[2.7, 0.04, 1.9]} />
        <meshStandardMaterial {...slab} opacity={0.45} />
      </mesh>
      <EdgeBox args={[2.7, 0.04, 1.9]} position={[0, -0.78, 0]} color={gold} opacity={0.5} />

    </group>
  );
};

/* ─── Floating Gold Particles ─── */
const FloatingParticles = () => {
  const count = 150;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, []);

  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.015;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#E8C06A"
        size={0.07}
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
};

/* ─── Smooth Orbiting Rings ─── */
const OrbitingRings = () => {
  return (
    <group position={[0.5, 0, 0]}>
      {/* Main ring — large, elegantly tilted */}
      <GoldRing
        radius={2.8}
        tube={0.02}
        rotation={[0.35, 0, 0.25]}
        speed={0.05}
      />
      {/* Second ring — opposite tilt */}
      <GoldRing
        radius={2.3}
        tube={0.015}
        rotation={[-0.5, Math.PI * 0.35, -0.3]}
        speed={0.07}
      />
      {/* Inner ring — tighter */}
      <GoldRing
        radius={1.7}
        tube={0.012}
        rotation={[0.75, 0.3, 0.5]}
        speed={0.1}
      />
      {/* Large outer halo ring */}
      <GoldRing
        radius={3.5}
        tube={0.01}
        rotation={[0.12, -0.15, 0.08]}
        speed={0.025}
      />
    </group>
  );
};

/* ═══ MAIN CANVAS ═══ */
const HeroScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 6], fov: 48 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.NoToneMapping }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
    >
      <color attach="background" args={['#0A0A0C']} />
      <fog attach="fog" args={['#0A0A0C', 10, 25]} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 4]} intensity={1.5} color="#E8C878" />
      <directionalLight position={[-4, 3, -5]} intensity={0.7} color="#D4B38A" />
      <pointLight position={[2, 2, 2]} intensity={1.2} color="#D4A84B" distance={15} />
      <pointLight position={[-2, -1, 3]} intensity={0.6} color="#D4B38A" distance={12} />
      <pointLight position={[0, 0, -4]} intensity={0.8} color="#C19A6B" distance={14} />

      {/* Scene */}
      <HouseWireframe />
      <OrbitingRings />
      <FloatingParticles />
    </Canvas>
  );
};

export default HeroScene;
