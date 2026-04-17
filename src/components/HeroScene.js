import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Rotating Architectural Geometry ─── */
const ArchBlock = ({ position, rotation, scale, speed = 0.3 }) => {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x += 0.001 * speed;
    ref.current.rotation.y += 0.002 * speed;
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#C19A6B"
        metalness={0.8}
        roughness={0.15}
        transparent
        opacity={0.35}
        wireframe
      />
    </mesh>
  );
};

const GoldTorus = ({ position, rotationSpeed = 0.1 }) => {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.x += 0.003 * rotationSpeed;
    ref.current.rotation.z += 0.002 * rotationSpeed;
  });
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[1.8, 0.02, 16, 100]} />
      <meshStandardMaterial color="#C19A6B" metalness={0.9} roughness={0.1} transparent opacity={0.5} />
    </mesh>
  );
};

const CentralStructure = () => {
  const groupRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.08;
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.15;
  });
  return (
    <group ref={groupRef}>
      {/* Central octahedron */}
      <mesh>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#C19A6B"
          metalness={0.95}
          roughness={0.05}
          transparent
          opacity={0.2}
        />
      </mesh>
      {/* Inner rotating cube */}
      <ArchBlock position={[0, 0, 0]} rotation={[0.5, 0.3, 0]} scale={[0.8, 0.8, 0.8]} speed={0.5} />
      {/* Surrounding rings */}
      <GoldTorus position={[0, 0, 0]} rotationSpeed={0.15} />
    </group>
  );
};

const FloatingParticles = () => {
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
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
      <pointsMaterial color="#C19A6B" size={0.03} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

/* ─── Orbiting architectural blocks ─── */
const OrbitingBlocks = () => {
  const groupRef = useRef();
  useFrame((state) => {
    groupRef.current.rotation.y = -state.clock.getElapsedTime() * 0.05;
  });
  return (
    <group ref={groupRef}>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        const r = 3.5;
        return (
          <ArchBlock
            key={i}
            position={[Math.cos(angle) * r, (Math.random() - 0.5) * 2, Math.sin(angle) * r]}
            rotation={[Math.random(), Math.random(), Math.random()]}
            scale={[0.3 + Math.random() * 0.3, 0.6 + Math.random() * 0.6, 0.3 + Math.random() * 0.3]}
            speed={0.2 + Math.random() * 0.3}
          />
        );
      })}
    </group>
  );
};

const HeroScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
    >
      <color attach="background" args={['#0A0A0C']} />
      <fog attach="fog" args={['#0A0A0C', 5, 15]} />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#C19A6B" />
      <directionalLight position={[-5, 3, -5]} intensity={0.2} color="#D4B38A" />
      <pointLight position={[0, 3, 0]} intensity={0.3} color="#C19A6B" distance={10} />

      {/* Geometry */}
      <CentralStructure />
      <OrbitingBlocks />
      <FloatingParticles />
    </Canvas>
  );
};

export default HeroScene;
