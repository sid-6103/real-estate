import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Text, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

/* ─── Materials ─── */
const goldMat = { color: '#C19A6B', metalness: 0.9, roughness: 0.1 };
const glassMat = { color: '#1a1a2e', metalness: 0.3, roughness: 0.05, transparent: true, opacity: 0.25 };
const concreteMat = { color: '#222228', metalness: 0.1, roughness: 0.8 };

/* ─── Interactive House Model (architectural abstraction) ─── */
const HouseModel = () => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* ── Foundation / Base Platform ── */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[6, 0.15, 4.5]} />
        <meshStandardMaterial {...concreteMat} />
      </mesh>

      {/* ── Ground Floor – Main Structure ── */}
      <group position={[0, 0.2, 0]}>
        {/* Back wall */}
        <mesh position={[0, 0.6, -2]}>
          <boxGeometry args={[5.5, 1.4, 0.08]} />
          <meshStandardMaterial {...concreteMat} />
        </mesh>
        {/* Left wall */}
        <mesh position={[-2.75, 0.6, 0]}>
          <boxGeometry args={[0.08, 1.4, 4]} />
          <meshStandardMaterial {...concreteMat} />
        </mesh>
        {/* Right wall – glass */}
        <mesh
          position={[2.75, 0.6, 0]}
          onPointerEnter={() => setHovered('glass-wall')}
          onPointerLeave={() => setHovered(null)}
        >
          <boxGeometry args={[0.06, 1.4, 4]} />
          <meshStandardMaterial
            {...glassMat}
            opacity={hovered === 'glass-wall' ? 0.4 : 0.25}
          />
        </mesh>
        {/* Floor slab */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[5.5, 0.1, 4]} />
          <meshStandardMaterial color="#1a1a1e" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Internal division wall */}
        <mesh position={[-0.5, 0.6, -0.2]}>
          <boxGeometry args={[0.06, 1.2, 2.5]} />
          <meshStandardMaterial {...concreteMat} />
        </mesh>
      </group>

      {/* ── Upper Floor ── */}
      <group position={[0.8, 1.6, 0]}>
        {/* Upper slab / roof of ground floor */}
        <mesh position={[-0.8, -0.1, 0]}>
          <boxGeometry args={[5.5, 0.1, 4]} />
          <meshStandardMaterial {...concreteMat} />
        </mesh>
        {/* Upper back wall */}
        <mesh position={[0, 0.6, -1.8]}>
          <boxGeometry args={[3.8, 1.2, 0.08]} />
          <meshStandardMaterial {...concreteMat} />
        </mesh>
        {/* Upper left wall */}
        <mesh position={[-1.9, 0.6, 0]}>
          <boxGeometry args={[0.08, 1.2, 3.6]} />
          <meshStandardMaterial {...concreteMat} />
        </mesh>
        {/* Upper glass front */}
        <mesh
          position={[1.9, 0.6, 0]}
          onPointerEnter={() => setHovered('upper-glass')}
          onPointerLeave={() => setHovered(null)}
        >
          <boxGeometry args={[0.05, 1.2, 3.6]} />
          <meshStandardMaterial
            {...glassMat}
            opacity={hovered === 'upper-glass' ? 0.4 : 0.2}
          />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[4.2, 0.08, 4]} />
          <meshStandardMaterial {...concreteMat} />
        </mesh>
      </group>

      {/* ── Cantilever Terrace (left) ── */}
      <group position={[-3.2, 1.5, 0.5]}>
        <mesh>
          <boxGeometry args={[1.5, 0.08, 2.5]} />
          <meshStandardMaterial {...concreteMat} />
        </mesh>
        {/* Railing */}
        <mesh position={[0, 0.3, 1.25]}>
          <boxGeometry args={[1.5, 0.02, 0.02]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>
        <mesh position={[-0.75, 0.15, 1.25]}>
          <boxGeometry args={[0.02, 0.3, 0.02]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>
        <mesh position={[0.75, 0.15, 1.25]}>
          <boxGeometry args={[0.02, 0.3, 0.02]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>
      </group>

      {/* ── Pool ── */}
      <mesh
        position={[0, -0.5, 3]}
        onPointerEnter={() => setHovered('pool')}
        onPointerLeave={() => setHovered(null)}
      >
        <boxGeometry args={[3, 0.15, 1.5]} />
        <meshStandardMaterial
          color={hovered === 'pool' ? '#2a4a6b' : '#1a2a3b'}
          metalness={0.5}
          roughness={0.1}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* ── Gold accent lines ── */}
      {[[-2.75, 1.35, 0], [2.75, 1.35, 0], [-0.5, 1.35, -0.2]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <boxGeometry args={[i === 2 ? 0.06 : 0.08, 0.03, i === 2 ? 2.5 : 4]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>
      ))}

      {/* ── Landscape / trees (abstract cylinders) ── */}
      {[[3.5, 0, 2.5], [4, 0, -1.5], [-4, 0, 1]].map((pos, i) => (
        <group key={`tree-${i}`} position={pos}>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
            <meshStandardMaterial color="#3a3a3e" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <sphereGeometry args={[0.35, 8, 6]} />
            <meshStandardMaterial color="#2a3a2a" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

/* ─── Orbiting Camera Controls Label ─── */
const CameraRig = () => {
  const { camera } = useThree();
  useFrame((state) => {
    // Subtle float
    const t = state.clock.getElapsedTime();
    camera.position.y = 3 + Math.sin(t * 0.2) * 0.3;
  });
  return null;
};

/* ─── Floating info labels ─── */
const InfoLabel = ({ position, text }) => {
  return (
    <Float speed={1} floatIntensity={0.3}>
      <group position={position}>
        <mesh>
          <planeGeometry args={[1.2, 0.25]} />
          <meshBasicMaterial color="#0A0A0C" transparent opacity={0.7} />
        </mesh>
      </group>
    </Float>
  );
};

/* ─── Ground plane ─── */
const Ground = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.62, 0]} receiveShadow>
    <planeGeometry args={[30, 30]} />
    <meshStandardMaterial color="#0A0A0C" roughness={1} />
  </mesh>
);

/* ─── Main Page ─── */
const ShowcasePage = () => {
  const [showControls, setShowControls] = useState(true);

  return (
    <main className="pt-20 min-h-screen bg-[#0A0A0C]" data-testid="showcase-page">
      {/* Header */}
      <section className="py-12 md:py-16 px-6 md:px-12 lg:px-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.span
            className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold block mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Immersive Experience
          </motion.span>
          <motion.h1
            className="font-heading text-5xl sm:text-6xl font-light tracking-tighter text-[#F3F3F1] leading-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            3D <span className="italic">Showcase</span>
          </motion.h1>
          <motion.p
            className="font-body font-light text-base text-[#A1A1A5] mt-4 max-w-xl leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Explore our flagship residence in full 3D. Orbit, zoom, and discover every architectural detail.
          </motion.p>
        </div>
      </section>

      {/* 3D Viewer */}
      <motion.section
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="relative w-full" style={{ height: '70vh' }}>
          <Canvas
            camera={{ position: [6, 3, 6], fov: 45 }}
            shadows
            gl={{ antialias: false, powerPreference: 'high-performance' }}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            data-testid="showcase-canvas"
          >
            <color attach="background" args={['#0A0A0C']} />
            <fog attach="fog" args={['#0A0A0C', 8, 25]} />

            {/* Lighting */}
            <ambientLight intensity={0.25} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={0.6}
              color="#C19A6B"
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <directionalLight position={[-8, 5, -5]} intensity={0.3} color="#D4B38A" />
            <pointLight position={[0, 4, 0]} intensity={0.4} color="#C19A6B" distance={15} />
            <pointLight position={[0, 0, 3]} intensity={0.2} color="#4a6a9b" distance={8} />

            <Suspense fallback={null}>
              <HouseModel />
              <Ground />
            </Suspense>

            <CameraRig />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2.1}
              minDistance={4}
              maxDistance={15}
            />
          </Canvas>

          {/* UI Hint */}
          {showControls && (
            <motion.div
              className="absolute top-6 left-1/2 -translate-x-1/2 z-10 bg-[#0A0A0C]/80 backdrop-blur-xl border border-white/10 px-6 py-3 flex items-center gap-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <span className="text-[11px] uppercase tracking-[0.2em] font-body text-[#A1A1A5]">
                Drag to orbit • Scroll to zoom • Shift+drag to pan
              </span>
              <button
                onClick={() => setShowControls(false)}
                className="text-[#707076] hover:text-gold transition-colors text-xs"
              >
                ✕
              </button>
            </motion.div>
          )}

          {/* Info overlay */}
          <div className="absolute bottom-6 left-6 z-10">
            <div className="bg-[#0A0A0C]/80 backdrop-blur-xl border border-white/10 p-6 max-w-sm">
              <span className="text-[10px] uppercase tracking-[0.2em] font-body text-gold block mb-2">
                Featured Residence
              </span>
              <h3 className="font-heading text-2xl font-light text-[#F3F3F1] mb-1">
                The Obsidian Residence
              </h3>
              <p className="text-xs font-body text-[#707076] mb-3">Beverly Hills, CA</p>
              <div className="flex items-center gap-0 text-[10px] uppercase tracking-[0.15em] font-body text-[#A1A1A5]">
                <span>7 Beds</span>
                <span className="mx-2 w-px h-2.5 bg-white/20" />
                <span>9 Baths</span>
                <span className="mx-2 w-px h-2.5 bg-white/20" />
                <span>14,200 Sqft</span>
              </div>
              <p className="font-heading text-2xl text-gold mt-3">$28,500,000</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Specs section below the 3D viewer */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Images */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <motion.div
                className="col-span-2 border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="https://images.pexels.com/photos/33685855/pexels-photo-33685855.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Interior living room"
                  className="w-full aspect-video object-cover"
                />
              </motion.div>
              <motion.div
                className="border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <img
                  src="https://images.pexels.com/photos/34277650/pexels-photo-34277650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Spacious luxury interior"
                  className="w-full aspect-square object-cover"
                />
              </motion.div>
              <motion.div
                className="border border-white/10 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1690489965043-ec15758cce71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBpbnRlcmlvciUyMGRlc2lnbiUyMGxpdmluZyUyMHJvb218ZW58MHx8fHwxNzc2NDM0NzMyfDA&ixlib=rb-4.1.0&q=85"
                  alt="Modern dining room"
                  className="w-full aspect-square object-cover"
                />
              </motion.div>
            </div>

            {/* Details */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-xs font-body font-medium uppercase tracking-[0.3em] text-gold block mb-4">
                  Property Details
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-light tracking-tight text-[#F3F3F1] mb-6">
                  Architectural <span className="italic">Perfection</span>
                </h2>
                <p className="font-body font-light text-base text-[#A1A1A5] leading-relaxed mb-8">
                  A masterpiece of modern architecture perched atop the Hollywood Hills,
                  offering panoramic views from downtown to the Pacific. Floor-to-ceiling
                  glass walls dissolve the boundary between interior luxury and the vast
                  California sky.
                </p>

                {/* Feature list */}
                <div className="space-y-3 mb-8">
                  {['Infinity Pool', 'Home Theater', 'Wine Cellar', 'Smart Home System', 'Helipad Access'].map((f) => (
                    <div key={f} className="flex items-center gap-3 border-b border-white/5 pb-3">
                      <div className="w-1.5 h-1.5 bg-gold" />
                      <span className="text-sm font-body font-light text-[#A1A1A5]">{f}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="/property/1"
                  data-testid="showcase-view-detail"
                  className="inline-block border border-gold text-gold hover:bg-gold hover:text-[#0A0A0C] transition-all duration-300 px-8 py-4 uppercase tracking-[0.2em] text-xs font-body font-medium"
                >
                  View Full Details
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShowcasePage;
