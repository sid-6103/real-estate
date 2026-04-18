import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Text, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

/* ─── Shared material presets ─── */
const mat = {
  wall:    { color: '#e8e3db', metalness: 0.05, roughness: 0.75 },
  glass:   { color: '#7aadd4', metalness: 0.7, roughness: 0.05, transparent: true, opacity: 0.45 },
  wood:    { color: '#8b6f47', metalness: 0.1, roughness: 0.6 },
  darkFlr: { color: '#3a3530', metalness: 0.3, roughness: 0.5 },
  accent:  { color: '#C19A6B', metalness: 0.8, roughness: 0.15 },
  trim:    { color: '#2a2a2e', metalness: 0.4, roughness: 0.5 },
};

/* ═══════════════════════════════════════════════════════════════
   PROPER MODERN LUXURY VILLA
   ─ 2-storey house with windows, front door, balcony, pool, yard
   ═══════════════════════════════════════════════════════════════ */
const HouseModel = () => {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.3) * 0.05;
  });

  const W = mat.wall;
  const G = mat.glass;
  const T = mat.trim;
  const A = mat.accent;

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>

      {/* ═════ LAWN / GROUND ═════ */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[16, 0.1, 14]} />
        <meshStandardMaterial color="#2d4a2d" roughness={0.95} />
      </mesh>

      {/* Driveway */}
      <mesh position={[0, 0.01, 5]}>
        <boxGeometry args={[2.4, 0.02, 4]} />
        <meshStandardMaterial color="#666660" roughness={0.9} />
      </mesh>

      {/* ═════ FOUNDATION PLATFORM ═════ */}
      <mesh position={[0, 0.08, 0]}>
        <boxGeometry args={[7.4, 0.16, 5.4]} />
        <meshStandardMaterial color="#555550" roughness={0.85} />
      </mesh>

      {/* ═════ GROUND FLOOR  (y 0.16 → 1.56,  height 1.4) ═════ */}

      {/* Floor slab */}
      <mesh position={[0, 0.21, 0]}>
        <boxGeometry args={[6.6, 0.1, 4.6]} />
        <meshStandardMaterial {...mat.darkFlr} />
      </mesh>

      {/* ── FRONT WALL  z = +2.24 ── */}
      {/* sill  – left of door */}
      <mesh position={[-1.8, 0.46, 2.24]}>
        <boxGeometry args={[2.8, 0.4, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* sill  – right of door */}
      <mesh position={[1.8, 0.46, 2.24]}>
        <boxGeometry args={[2.8, 0.4, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* header */}
      <mesh position={[0, 1.46, 2.24]}>
        <boxGeometry args={[6.6, 0.2, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* left corner pillar */}
      <mesh position={[-3.05, 0.95, 2.24]}>
        <boxGeometry args={[0.5, 0.78, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* right corner pillar */}
      <mesh position={[3.05, 0.95, 2.24]}>
        <boxGeometry args={[0.5, 0.78, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* door frame – left mullion */}
      <mesh position={[-0.52, 0.88, 2.24]}>
        <boxGeometry args={[0.14, 1.18, 0.08]} />
        <meshStandardMaterial {...T} />
      </mesh>
      {/* door frame – right mullion */}
      <mesh position={[0.52, 0.88, 2.24]}>
        <boxGeometry args={[0.14, 1.18, 0.08]} />
        <meshStandardMaterial {...T} />
      </mesh>

      {/* ★ FRONT DOOR */}
      <mesh position={[0, 0.88, 2.22]}>
        <boxGeometry args={[0.9, 1.18, 0.05]} />
        <meshStandardMaterial {...mat.wood} />
      </mesh>
      {/* door handle */}
      <mesh position={[0.32, 0.82, 2.26]}>
        <boxGeometry args={[0.05, 0.14, 0.04]} />
        <meshStandardMaterial {...A} />
      </mesh>
      {/* door glass inset */}
      <mesh position={[0, 1.15, 2.26]}>
        <boxGeometry args={[0.5, 0.35, 0.02]} />
        <meshStandardMaterial {...G} opacity={0.3} />
      </mesh>

      {/* front – left window */}
      <mesh position={[-1.8, 0.95, 2.22]}>
        <boxGeometry args={[2.0, 0.78, 0.03]} />
        <meshStandardMaterial {...G} />
      </mesh>
      {/* left window – horizontal divider */}
      <mesh position={[-1.8, 0.95, 2.26]}>
        <boxGeometry args={[2.05, 0.025, 0.02]} />
        <meshStandardMaterial {...T} />
      </mesh>
      {/* left window – vertical mullion */}
      <mesh position={[-1.8, 0.95, 2.26]}>
        <boxGeometry args={[0.025, 0.78, 0.02]} />
        <meshStandardMaterial {...T} />
      </mesh>

      {/* front – right window */}
      <mesh position={[1.8, 0.95, 2.22]}>
        <boxGeometry args={[2.0, 0.78, 0.03]} />
        <meshStandardMaterial {...G} />
      </mesh>
      {/* right window – horizontal divider */}
      <mesh position={[1.8, 0.95, 2.26]}>
        <boxGeometry args={[2.05, 0.025, 0.02]} />
        <meshStandardMaterial {...T} />
      </mesh>
      {/* right window – vertical mullion */}
      <mesh position={[1.8, 0.95, 2.26]}>
        <boxGeometry args={[0.025, 0.78, 0.02]} />
        <meshStandardMaterial {...T} />
      </mesh>

      {/* ── BACK WALL  z = -2.24 ── */}
      {/* bottom solid strip */}
      <mesh position={[0, 0.46, -2.24]}>
        <boxGeometry args={[6.6, 0.5, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* header */}
      <mesh position={[0, 1.43, -2.24]}>
        <boxGeometry args={[6.6, 0.26, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* left pillar */}
      <mesh position={[-2.8, 0.98, -2.24]}>
        <boxGeometry args={[1.0, 0.64, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* centre pillar */}
      <mesh position={[0, 0.98, -2.24]}>
        <boxGeometry args={[0.25, 0.64, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* right pillar */}
      <mesh position={[2.8, 0.98, -2.24]}>
        <boxGeometry args={[1.0, 0.64, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* back windows */}
      <mesh position={[-1.35, 0.98, -2.22]}>
        <boxGeometry args={[1.9, 0.6, 0.03]} />
        <meshStandardMaterial {...G} />
      </mesh>
      <mesh position={[1.35, 0.98, -2.22]}>
        <boxGeometry args={[1.9, 0.6, 0.03]} />
        <meshStandardMaterial {...G} />
      </mesh>

      {/* ── LEFT WALL  x = -3.26 ── */}
      {/* bottom strip */}
      <mesh position={[-3.26, 0.46, 0]}>
        <boxGeometry args={[0.08, 0.5, 4.4]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* header */}
      <mesh position={[-3.26, 1.43, 0]}>
        <boxGeometry args={[0.08, 0.26, 4.4]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* front corner */}
      <mesh position={[-3.26, 0.98, 1.8]}>
        <boxGeometry args={[0.08, 0.68, 0.8]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* back corner */}
      <mesh position={[-3.26, 0.98, -1.8]}>
        <boxGeometry args={[0.08, 0.68, 0.8]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* centre mullion */}
      <mesh position={[-3.26, 0.98, 0]}>
        <boxGeometry args={[0.08, 0.68, 0.15]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* left windows */}
      <mesh position={[-3.24, 0.98, 0.9]}>
        <boxGeometry args={[0.03, 0.64, 1.6]} />
        <meshStandardMaterial {...G} />
      </mesh>
      <mesh position={[-3.24, 0.98, -0.9]}>
        <boxGeometry args={[0.03, 0.64, 1.6]} />
        <meshStandardMaterial {...G} />
      </mesh>

      {/* ── RIGHT WALL  x = +3.26 — mostly glass (modern) ── */}
      {/* bottom strip */}
      <mesh position={[3.26, 0.32, 0]}>
        <boxGeometry args={[0.08, 0.22, 4.4]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* header */}
      <mesh position={[3.26, 1.46, 0]}>
        <boxGeometry args={[0.08, 0.2, 4.4]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* vertical frame strips */}
      <mesh position={[3.26, 0.88, -2.16]}>
        <boxGeometry args={[0.08, 0.92, 0.08]} />
        <meshStandardMaterial {...T} />
      </mesh>
      <mesh position={[3.26, 0.88, 2.16]}>
        <boxGeometry args={[0.08, 0.92, 0.08]} />
        <meshStandardMaterial {...T} />
      </mesh>
      <mesh position={[3.26, 0.88, 0]}>
        <boxGeometry args={[0.08, 0.92, 0.06]} />
        <meshStandardMaterial {...T} />
      </mesh>
      {/* glass panels */}
      <mesh position={[3.24, 0.88, -1.08]}>
        <boxGeometry args={[0.03, 0.92, 2.1]} />
        <meshStandardMaterial {...G} opacity={0.35} />
      </mesh>
      <mesh position={[3.24, 0.88, 1.08]}>
        <boxGeometry args={[0.03, 0.92, 2.1]} />
        <meshStandardMaterial {...G} opacity={0.35} />
      </mesh>


      {/* ═════ CEILING SLAB / 2nd FLOOR  ═════ */}
      <mesh position={[0, 1.56, 0]}>
        <boxGeometry args={[6.8, 0.1, 4.8]} />
        <meshStandardMaterial {...W} />
      </mesh>

      {/* ═════ SECOND FLOOR  (y 1.61 → 2.91,  height 1.3) ═════ */}

      {/* ── FRONT upper — glass curtain wall ── */}
      {/* bottom strip */}
      <mesh position={[0, 1.71, 2.24]}>
        <boxGeometry args={[6.6, 0.15, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* header */}
      <mesh position={[0, 2.84, 2.24]}>
        <boxGeometry args={[6.6, 0.15, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* corner pillars */}
      <mesh position={[-3.0, 2.3, 2.24]}>
        <boxGeometry args={[0.4, 1.12, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      <mesh position={[3.0, 2.3, 2.24]}>
        <boxGeometry args={[0.4, 1.12, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* vertical mullions */}
      {[-1.5, 0, 1.5].map((x, i) => (
        <mesh key={`fm-${i}`} position={[x, 2.3, 2.24]}>
          <boxGeometry args={[0.06, 1.12, 0.08]} />
          <meshStandardMaterial {...T} />
        </mesh>
      ))}
      {/* horizontal divider */}
      <mesh position={[0, 2.3, 2.26]}>
        <boxGeometry args={[5.6, 0.025, 0.02]} />
        <meshStandardMaterial {...T} />
      </mesh>
      {/* upper front glass panels */}
      {[-2.25, -0.75, 0.75, 2.25].map((x, i) => (
        <mesh key={`fg-${i}`} position={[x, 2.3, 2.22]}>
          <boxGeometry args={[1.1, 1.08, 0.03]} />
          <meshStandardMaterial {...G} />
        </mesh>
      ))}

      {/* ── BACK upper ── */}
      <mesh position={[0, 1.76, -2.24]}>
        <boxGeometry args={[6.6, 0.2, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      <mesh position={[0, 2.78, -2.24]}>
        <boxGeometry args={[6.6, 0.28, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      <mesh position={[-2.8, 2.3, -2.24]}>
        <boxGeometry args={[1.0, 0.84, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      <mesh position={[0, 2.3, -2.24]}>
        <boxGeometry args={[0.25, 0.84, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      <mesh position={[2.8, 2.3, -2.24]}>
        <boxGeometry args={[1.0, 0.84, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* back upper windows */}
      <mesh position={[-1.35, 2.3, -2.22]}>
        <boxGeometry args={[1.9, 0.7, 0.03]} />
        <meshStandardMaterial {...G} />
      </mesh>
      <mesh position={[1.35, 2.3, -2.22]}>
        <boxGeometry args={[1.9, 0.7, 0.03]} />
        <meshStandardMaterial {...G} />
      </mesh>

      {/* ── LEFT upper ── */}
      <mesh position={[-3.26, 1.71, 0]}>
        <boxGeometry args={[0.08, 0.15, 4.4]} />
        <meshStandardMaterial {...W} />
      </mesh>
      <mesh position={[-3.26, 2.82, 0]}>
        <boxGeometry args={[0.08, 0.2, 4.4]} />
        <meshStandardMaterial {...W} />
      </mesh>
      <mesh position={[-3.26, 2.3, 1.8]}>
        <boxGeometry args={[0.08, 0.92, 0.8]} />
        <meshStandardMaterial {...W} />
      </mesh>
      <mesh position={[-3.26, 2.3, -1.8]}>
        <boxGeometry args={[0.08, 0.92, 0.8]} />
        <meshStandardMaterial {...W} />
      </mesh>
      <mesh position={[-3.26, 2.3, 0]}>
        <boxGeometry args={[0.08, 0.92, 0.15]} />
        <meshStandardMaterial {...W} />
      </mesh>
      <mesh position={[-3.24, 2.3, 0.9]}>
        <boxGeometry args={[0.03, 0.88, 1.6]} />
        <meshStandardMaterial {...G} />
      </mesh>
      <mesh position={[-3.24, 2.3, -0.9]}>
        <boxGeometry args={[0.03, 0.88, 1.6]} />
        <meshStandardMaterial {...G} />
      </mesh>

      {/* ── RIGHT upper — glass curtain ── */}
      <mesh position={[3.26, 1.66, 0]}>
        <boxGeometry args={[0.08, 0.1, 4.4]} />
        <meshStandardMaterial {...W} />
      </mesh>
      <mesh position={[3.26, 2.87, 0]}>
        <boxGeometry args={[0.08, 0.12, 4.4]} />
        <meshStandardMaterial {...W} />
      </mesh>
      <mesh position={[3.26, 2.3, -2.16]}>
        <boxGeometry args={[0.08, 1.12, 0.08]} />
        <meshStandardMaterial {...T} />
      </mesh>
      <mesh position={[3.26, 2.3, 2.16]}>
        <boxGeometry args={[0.08, 1.12, 0.08]} />
        <meshStandardMaterial {...T} />
      </mesh>
      <mesh position={[3.26, 2.3, 0]}>
        <boxGeometry args={[0.08, 1.12, 0.06]} />
        <meshStandardMaterial {...T} />
      </mesh>
      <mesh position={[3.24, 2.3, -1.08]}>
        <boxGeometry args={[0.03, 1.08, 2.1]} />
        <meshStandardMaterial {...G} opacity={0.35} />
      </mesh>
      <mesh position={[3.24, 2.3, 1.08]}>
        <boxGeometry args={[0.03, 1.08, 2.1]} />
        <meshStandardMaterial {...G} opacity={0.35} />
      </mesh>

      {/* ═══════════════════════════════════════════════════
          INTERIOR FURNITURE — SECOND FLOOR  (floor y ≈ 1.66)
          ═══════════════════════════════════════════════════ */}

      {/* ── 2F partition wall (bedroom | study) ── */}
      <mesh position={[0.3, 2.28, 0]}>
        <boxGeometry args={[0.06, 1.2, 3.8]} />
        <meshStandardMaterial color="#d5d0c8" roughness={0.8} />
      </mesh>

      {/* ────────── MASTER BEDROOM  (left half, x < 0) ────────── */}

      {/* Bed frame */}
      <mesh position={[-1.5, 1.82, -0.6]}>
        <boxGeometry args={[1.6, 0.22, 2.2]} />
        <meshStandardMaterial color="#5c4a3a" metalness={0.1} roughness={0.7} />
      </mesh>
      {/* Mattress */}
      <mesh position={[-1.5, 1.96, -0.6]}>
        <boxGeometry args={[1.5, 0.14, 2.1]} />
        <meshStandardMaterial color="#f0ebe3" roughness={0.9} />
      </mesh>
      {/* Pillows */}
      <mesh position={[-1.85, 2.06, -1.5]}>
        <boxGeometry args={[0.5, 0.1, 0.35]} />
        <meshStandardMaterial color="#d4cec5" roughness={0.95} />
      </mesh>
      <mesh position={[-1.15, 2.06, -1.5]}>
        <boxGeometry args={[0.5, 0.1, 0.35]} />
        <meshStandardMaterial color="#d4cec5" roughness={0.95} />
      </mesh>
      {/* Duvet / blanket */}
      <mesh position={[-1.5, 2.04, 0]}>
        <boxGeometry args={[1.45, 0.06, 1.0]} />
        <meshStandardMaterial color="#8a9aaa" roughness={0.9} />
      </mesh>
      {/* Headboard */}
      <mesh position={[-1.5, 2.25, -1.7]}>
        <boxGeometry args={[1.7, 0.55, 0.08]} />
        <meshStandardMaterial color="#4a3a2a" metalness={0.1} roughness={0.6} />
      </mesh>

      {/* Left nightstand */}
      <mesh position={[-2.6, 1.8, -1.3]}>
        <boxGeometry args={[0.45, 0.26, 0.45]} />
        <meshStandardMaterial color="#5c4a3a" roughness={0.7} />
      </mesh>
      {/* Left nightstand – lamp base */}
      <mesh position={[-2.6, 1.97, -1.3]}>
        <cylinderGeometry args={[0.06, 0.08, 0.12, 8]} />
        <meshStandardMaterial color="#333" roughness={0.5} />
      </mesh>
      {/* Left nightstand – lamp shade */}
      <mesh position={[-2.6, 2.08, -1.3]}>
        <cylinderGeometry args={[0.06, 0.12, 0.14, 8]} />
        <meshStandardMaterial color="#f5e6d0" roughness={0.9} emissive="#f5e6d0" emissiveIntensity={0.15} />
      </mesh>

      {/* Right nightstand */}
      <mesh position={[-0.4, 1.8, -1.3]}>
        <boxGeometry args={[0.45, 0.26, 0.45]} />
        <meshStandardMaterial color="#5c4a3a" roughness={0.7} />
      </mesh>
      {/* Right nightstand – lamp */}
      <mesh position={[-0.4, 1.97, -1.3]}>
        <cylinderGeometry args={[0.06, 0.08, 0.12, 8]} />
        <meshStandardMaterial color="#333" roughness={0.5} />
      </mesh>
      <mesh position={[-0.4, 2.08, -1.3]}>
        <cylinderGeometry args={[0.06, 0.12, 0.14, 8]} />
        <meshStandardMaterial color="#f5e6d0" roughness={0.9} emissive="#f5e6d0" emissiveIntensity={0.15} />
      </mesh>

      {/* Wardrobe / closet (against back wall) */}
      <mesh position={[-2.8, 2.18, -1.9]}>
        <boxGeometry args={[0.7, 1.0, 0.5]} />
        <meshStandardMaterial color="#4a3a2a" metalness={0.1} roughness={0.65} />
      </mesh>
      {/* Wardrobe door line */}
      <mesh position={[-2.8, 2.18, -1.64]}>
        <boxGeometry args={[0.015, 0.9, 0.01]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.5} />
      </mesh>
      {/* Wardrobe handles */}
      <mesh position={[-2.87, 2.18, -1.64]}>
        <boxGeometry args={[0.02, 0.12, 0.02]} />
        <meshStandardMaterial {...A} />
      </mesh>
      <mesh position={[-2.73, 2.18, -1.64]}>
        <boxGeometry args={[0.02, 0.12, 0.02]} />
        <meshStandardMaterial {...A} />
      </mesh>

      {/* Dresser (against left wall) */}
      <mesh position={[-2.9, 1.85, 0.5]}>
        <boxGeometry args={[0.55, 0.4, 1.0]} />
        <meshStandardMaterial color="#5c4a3a" roughness={0.7} />
      </mesh>
      {/* Mirror above dresser */}
      <mesh position={[-3.15, 2.3, 0.5]}>
        <boxGeometry args={[0.03, 0.6, 0.7]} />
        <meshStandardMaterial color="#aaccdd" metalness={0.8} roughness={0.05} />
      </mesh>

      {/* Bedroom rug */}
      <mesh position={[-1.5, 1.67, 0.2]}>
        <boxGeometry args={[1.8, 0.02, 1.0]} />
        <meshStandardMaterial color="#8a7a6a" roughness={0.95} />
      </mesh>

      {/* ────────── STUDY / SITTING AREA  (right half, x > 0.3) ────────── */}

      {/* Desk (against back wall) */}
      {/* desk top */}
      <mesh position={[1.8, 2.05, -1.7]}>
        <boxGeometry args={[1.8, 0.06, 0.7]} />
        <meshStandardMaterial color="#6b5840" metalness={0.1} roughness={0.5} />
      </mesh>
      {/* desk legs */}
      {[[1.0, 1.82, -1.95], [2.6, 1.82, -1.95], [1.0, 1.82, -1.4], [2.6, 1.82, -1.4]].map((p, i) => (
        <mesh key={`dl-${i}`} position={p}>
          <boxGeometry args={[0.06, 0.4, 0.06]} />
          <meshStandardMaterial color="#555" roughness={0.6} />
        </mesh>
      ))}
      {/* Desk drawer unit */}
      <mesh position={[2.4, 1.85, -1.7]}>
        <boxGeometry args={[0.5, 0.35, 0.55]} />
        <meshStandardMaterial color="#6b5840" roughness={0.6} />
      </mesh>
      {/* Monitor */}
      <mesh position={[1.8, 2.35, -1.85]}>
        <boxGeometry args={[0.7, 0.45, 0.03]} />
        <meshStandardMaterial color="#1a1a1e" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Monitor screen */}
      <mesh position={[1.8, 2.36, -1.83]}>
        <boxGeometry args={[0.62, 0.38, 0.01]} />
        <meshStandardMaterial color="#2a4060" emissive="#2a4060" emissiveIntensity={0.3} />
      </mesh>
      {/* Monitor stand */}
      <mesh position={[1.8, 2.1, -1.8]}>
        <boxGeometry args={[0.15, 0.08, 0.15]} />
        <meshStandardMaterial color="#1a1a1e" roughness={0.4} />
      </mesh>
      {/* Keyboard */}
      <mesh position={[1.7, 2.09, -1.55]}>
        <boxGeometry args={[0.45, 0.02, 0.15]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.5} />
      </mesh>

      {/* Office chair */}
      {/* seat */}
      <mesh position={[1.8, 1.92, -1.3]}>
        <boxGeometry args={[0.45, 0.06, 0.45]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.7} />
      </mesh>
      {/* chair back */}
      <mesh position={[1.8, 2.18, -1.08]}>
        <boxGeometry args={[0.45, 0.48, 0.04]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.7} />
      </mesh>
      {/* chair pedestal */}
      <mesh position={[1.8, 1.78, -1.3]}>
        <cylinderGeometry args={[0.04, 0.04, 0.24, 6]} />
        <meshStandardMaterial color="#555" roughness={0.5} />
      </mesh>
      {/* chair base */}
      <mesh position={[1.8, 1.67, -1.3]}>
        <cylinderGeometry args={[0.22, 0.22, 0.03, 8]} />
        <meshStandardMaterial color="#333" roughness={0.5} />
      </mesh>

      {/* Bookshelf (against partition wall) */}
      <mesh position={[0.55, 2.2, -0.5]}>
        <boxGeometry args={[0.4, 1.0, 1.5]} />
        <meshStandardMaterial color="#5c4a3a" roughness={0.7} />
      </mesh>
      {/* shelf dividers */}
      {[1.9, 2.15, 2.4].map((y, i) => (
        <mesh key={`sh-${i}`} position={[0.55, y, -0.5]}>
          <boxGeometry args={[0.38, 0.02, 1.45]} />
          <meshStandardMaterial color="#4a3a2a" roughness={0.6} />
        </mesh>
      ))}
      {/* Books (colored blocks on shelves) */}
      {[
        [0.55, 2.05, -0.9, '#c44', 0.25], [0.55, 2.05, -0.55, '#48a', 0.2],
        [0.55, 2.05, -0.25, '#6a5', 0.18], [0.55, 2.3, -0.8, '#a86', 0.22],
        [0.55, 2.3, -0.5, '#66a', 0.2], [0.55, 2.3, -0.2, '#a55', 0.16],
        [0.55, 2.55, -0.7, '#8a6', 0.24], [0.55, 2.55, -0.4, '#578', 0.2],
      ].map(([x, y, z, color, w], i) => (
        <mesh key={`bk-${i}`} position={[x, y, z]}>
          <boxGeometry args={[0.3, 0.2, w]} />
          <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
      ))}

      {/* 2F Sofa / lounge chair (front-right near glass wall) */}
      {/* seat */}
      <mesh position={[2.2, 1.82, 1.2]}>
        <boxGeometry args={[1.2, 0.2, 0.65]} />
        <meshStandardMaterial color="#6a6a70" roughness={0.85} />
      </mesh>
      {/* backrest */}
      <mesh position={[2.2, 2.05, 1.5]}>
        <boxGeometry args={[1.2, 0.28, 0.12]} />
        <meshStandardMaterial color="#6a6a70" roughness={0.85} />
      </mesh>
      {/* armrests */}
      <mesh position={[1.62, 1.95, 1.2]}>
        <boxGeometry args={[0.08, 0.12, 0.65]} />
        <meshStandardMaterial color="#5a5a60" roughness={0.8} />
      </mesh>
      <mesh position={[2.78, 1.95, 1.2]}>
        <boxGeometry args={[0.08, 0.12, 0.65]} />
        <meshStandardMaterial color="#5a5a60" roughness={0.8} />
      </mesh>
      {/* cushions */}
      <mesh position={[1.8, 1.95, 1.15]}>
        <boxGeometry args={[0.45, 0.08, 0.5]} />
        <meshStandardMaterial color="#8a8590" roughness={0.9} />
      </mesh>
      <mesh position={[2.5, 1.95, 1.15]}>
        <boxGeometry args={[0.45, 0.08, 0.5]} />
        <meshStandardMaterial color="#8a8590" roughness={0.9} />
      </mesh>

      {/* Small side table near sofa */}
      <mesh position={[1.3, 1.82, 1.6]}>
        <boxGeometry args={[0.4, 0.28, 0.4]} />
        <meshStandardMaterial color="#C19A6B" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Plant pot on side table */}
      <mesh position={[1.3, 2.0, 1.6]}>
        <cylinderGeometry args={[0.1, 0.08, 0.14, 8]} />
        <meshStandardMaterial color="#8a725a" roughness={0.8} />
      </mesh>
      <mesh position={[1.3, 2.12, 1.6]}>
        <sphereGeometry args={[0.12, 8, 6]} />
        <meshStandardMaterial color="#3d7a3d" roughness={0.9} />
      </mesh>

      {/* 2F Floor rug (study area) */}
      <mesh position={[1.8, 1.67, -0.6]}>
        <boxGeometry args={[2.2, 0.02, 1.8]} />
        <meshStandardMaterial color="#6a6060" roughness={0.95} />
      </mesh>

      {/* ═══════════════════════════════════════════════════
          INTERIOR FURNITURE — GROUND FLOOR  (floor y ≈ 0.26)
          ═══════════════════════════════════════════════════ */}

      {/* ── GF partition wall (living | kitchen) ── */}
      <mesh position={[0, 0.88, -0.3]}>
        <boxGeometry args={[0.06, 1.1, 2.5]} />
        <meshStandardMaterial color="#d5d0c8" roughness={0.8} />
      </mesh>

      {/* ────────── LIVING ROOM  (right side, x > 0, visible through glass) ────────── */}

      {/* L-Sofa – long section */}
      <mesh position={[1.8, 0.44, -1.2]}>
        <boxGeometry args={[2.0, 0.24, 0.7]} />
        <meshStandardMaterial color="#4a4a52" roughness={0.85} />
      </mesh>
      <mesh position={[1.8, 0.64, -1.5]}>
        <boxGeometry args={[2.0, 0.22, 0.12]} />
        <meshStandardMaterial color="#4a4a52" roughness={0.85} />
      </mesh>
      {/* L-Sofa – short section */}
      <mesh position={[2.6, 0.44, -0.55]}>
        <boxGeometry args={[0.7, 0.24, 0.65]} />
        <meshStandardMaterial color="#4a4a52" roughness={0.85} />
      </mesh>
      {/* sofa cushions */}
      <mesh position={[1.3, 0.58, -1.15]}>
        <boxGeometry args={[0.55, 0.06, 0.5]} />
        <meshStandardMaterial color="#5a5a64" roughness={0.9} />
      </mesh>
      <mesh position={[2.0, 0.58, -1.15]}>
        <boxGeometry args={[0.55, 0.06, 0.5]} />
        <meshStandardMaterial color="#5a5a64" roughness={0.9} />
      </mesh>
      {/* throw pillow */}
      <mesh position={[2.7, 0.58, -1.15]}>
        <boxGeometry args={[0.25, 0.2, 0.06]} />
        <meshStandardMaterial color="#b08050" roughness={0.9} />
      </mesh>

      {/* Coffee table */}
      <mesh position={[1.5, 0.42, -0.4]}>
        <boxGeometry args={[1.0, 0.06, 0.55]} />
        <meshStandardMaterial color="#6b5840" metalness={0.15} roughness={0.5} />
      </mesh>
      {/* coffee table legs */}
      {[[1.0, 0.34, -0.6], [2.0, 0.34, -0.6], [1.0, 0.34, -0.2], [2.0, 0.34, -0.2]].map((p, i) => (
        <mesh key={`ctl-${i}`} position={p}>
          <boxGeometry args={[0.04, 0.14, 0.04]} />
          <meshStandardMaterial color="#333" roughness={0.5} />
        </mesh>
      ))}
      {/* decorative items on coffee table */}
      <mesh position={[1.35, 0.48, -0.4]}>
        <boxGeometry args={[0.2, 0.04, 0.15]} />
        <meshStandardMaterial color="#ccc" roughness={0.6} />
      </mesh>
      <mesh position={[1.7, 0.48, -0.4]}>
        <cylinderGeometry args={[0.06, 0.06, 0.1, 8]} />
        <meshStandardMaterial color="#4a6a5a" roughness={0.8} />
      </mesh>

      {/* TV Console / media unit (right wall) */}
      <mesh position={[2.9, 0.42, 0.5]}>
        <boxGeometry args={[0.5, 0.3, 1.6]} />
        <meshStandardMaterial color="#3a3a3e" metalness={0.2} roughness={0.5} />
      </mesh>
      {/* TV screen */}
      <mesh position={[2.95, 0.9, 0.5]}>
        <boxGeometry args={[0.04, 0.6, 1.1]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* TV screen glow */}
      <mesh position={[2.93, 0.9, 0.5]}>
        <boxGeometry args={[0.02, 0.55, 1.0]} />
        <meshStandardMaterial color="#1a2a40" emissive="#1a2a40" emissiveIntensity={0.2} />
      </mesh>

      {/* Living room rug */}
      <mesh position={[1.8, 0.27, -0.5]}>
        <boxGeometry args={[2.4, 0.02, 1.8]} />
        <meshStandardMaterial color="#7a7068" roughness={0.95} />
      </mesh>

      {/* Floor lamp */}
      <mesh position={[0.6, 0.7, -1.3]}>
        <cylinderGeometry args={[0.03, 0.04, 0.9, 6]} />
        <meshStandardMaterial color="#222" roughness={0.5} />
      </mesh>
      <mesh position={[0.6, 1.18, -1.3]}>
        <cylinderGeometry args={[0.08, 0.14, 0.16, 8]} />
        <meshStandardMaterial color="#f5e6d0" roughness={0.9} emissive="#f5e6d0" emissiveIntensity={0.2} />
      </mesh>

      {/* ────────── KITCHEN / DINING  (left side, x < 0) ────────── */}

      {/* Kitchen island/counter */}
      <mesh position={[-1.5, 0.55, 0.6]}>
        <boxGeometry args={[1.6, 0.55, 0.6]} />
        <meshStandardMaterial color="#ddd" metalness={0.15} roughness={0.3} />
      </mesh>
      {/* countertop (darker stone) */}
      <mesh position={[-1.5, 0.84, 0.6]}>
        <boxGeometry args={[1.65, 0.04, 0.65]} />
        <meshStandardMaterial color="#444" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Wall cabinets (back wall) */}
      <mesh position={[-1.8, 1.15, -1.85]}>
        <boxGeometry args={[2.2, 0.5, 0.35]} />
        <meshStandardMaterial color="#e0ddd6" roughness={0.7} />
      </mesh>
      {/* cabinet doors line */}
      <mesh position={[-1.8, 1.15, -1.67]}>
        <boxGeometry args={[0.02, 0.45, 0.01]} />
        <meshStandardMaterial color="#bbb" roughness={0.5} />
      </mesh>
      {/* cabinet handles */}
      <mesh position={[-2.15, 1.15, -1.67]}>
        <boxGeometry args={[0.02, 0.1, 0.02]} />
        <meshStandardMaterial {...A} />
      </mesh>
      <mesh position={[-1.45, 1.15, -1.67]}>
        <boxGeometry args={[0.02, 0.1, 0.02]} />
        <meshStandardMaterial {...A} />
      </mesh>

      {/* Lower kitchen cabinets (below counter on back wall) */}
      <mesh position={[-1.8, 0.48, -1.85]}>
        <boxGeometry args={[2.2, 0.4, 0.5]} />
        <meshStandardMaterial color="#e0ddd6" roughness={0.7} />
      </mesh>
      {/* counter surface */}
      <mesh position={[-1.8, 0.7, -1.85]}>
        <boxGeometry args={[2.25, 0.04, 0.55]} />
        <meshStandardMaterial color="#444" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Stove/range (on counter) */}
      <mesh position={[-2.3, 0.75, -1.85]}>
        <boxGeometry args={[0.6, 0.06, 0.5]} />
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Range hood */}
      <mesh position={[-2.3, 1.25, -1.95]}>
        <boxGeometry args={[0.65, 0.15, 0.3]} />
        <meshStandardMaterial color="#888" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* Dining table */}
      <mesh position={[-1.5, 0.54, 1.4]}>
        <boxGeometry args={[1.3, 0.06, 0.8]} />
        <meshStandardMaterial color="#6b5840" metalness={0.1} roughness={0.5} />
      </mesh>
      {/* table legs */}
      {[[-2.0, 0.38, 1.1], [-1.0, 0.38, 1.1], [-2.0, 0.38, 1.7], [-1.0, 0.38, 1.7]].map((p, i) => (
        <mesh key={`dtl-${i}`} position={p}>
          <boxGeometry args={[0.05, 0.22, 0.05]} />
          <meshStandardMaterial color="#5a4a3a" roughness={0.6} />
        </mesh>
      ))}

      {/* Dining chairs */}
      {[[-2.0, 0, 1.4], [-1, 0, 1.4], [-1.5, 0, 0.9], [-1.5, 0, 1.9]].map((pos, i) => (
        <group key={`dc-${i}`} position={pos} rotation={[0, i < 2 ? 0 : Math.PI / 2, 0]}>
          {/* seat */}
          <mesh position={[0, 0.42, 0]}>
            <boxGeometry args={[0.35, 0.04, 0.35]} />
            <meshStandardMaterial color="#5c4a3a" roughness={0.7} />
          </mesh>
          {/* back */}
          <mesh position={[0, 0.58, -0.16]}>
            <boxGeometry args={[0.35, 0.28, 0.04]} />
            <meshStandardMaterial color="#5c4a3a" roughness={0.7} />
          </mesh>
          {/* legs */}
          {[[-0.14, 0.32, -0.14], [0.14, 0.32, -0.14], [-0.14, 0.32, 0.14], [0.14, 0.32, 0.14]].map((lp, j) => (
            <mesh key={`dcl-${j}`} position={lp}>
              <boxGeometry args={[0.03, 0.18, 0.03]} />
              <meshStandardMaterial color="#444" roughness={0.5} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Fruit bowl on dining table */}
      <mesh position={[-1.5, 0.6, 1.4]}>
        <sphereGeometry args={[0.12, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ddd" roughness={0.5} side={2} />
      </mesh>

      {/* ═════ ROOF ═════ */}
      <mesh position={[0, 2.96, 0]}>
        <boxGeometry args={[7.4, 0.1, 5.4]} />
        <meshStandardMaterial color="#3a3a3e" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* gold roof-edge accent */}
      <mesh position={[0, 3.02, 0]}>
        <boxGeometry args={[7.5, 0.02, 5.5]} />
        <meshStandardMaterial {...A} />
      </mesh>

      {/* ═════ BALCONY  (upper floor, front) ═════ */}
      {/* slab extending from front wall */}
      <mesh position={[0, 1.62, 3.1]}>
        <boxGeometry args={[4.2, 0.08, 1.5]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* glass railing panel */}
      <mesh position={[0, 2.05, 3.82]}>
        <boxGeometry args={[4.2, 0.78, 0.04]} />
        <meshStandardMaterial color="#b8d4e8" metalness={0.5} roughness={0.1} transparent opacity={0.25} />
      </mesh>
      {/* railing top bar (gold) */}
      <mesh position={[0, 2.45, 3.82]}>
        <boxGeometry args={[4.3, 0.035, 0.04]} />
        <meshStandardMaterial {...A} />
      </mesh>
      {/* railing side posts */}
      <mesh position={[-2.1, 2.05, 3.82]}>
        <boxGeometry args={[0.04, 0.86, 0.04]} />
        <meshStandardMaterial {...A} />
      </mesh>
      <mesh position={[2.1, 2.05, 3.82]}>
        <boxGeometry args={[0.04, 0.86, 0.04]} />
        <meshStandardMaterial {...A} />
      </mesh>
      {/* balcony side walls */}
      <mesh position={[-2.1, 2.05, 3.46]}>
        <boxGeometry args={[0.04, 0.86, 0.76]} />
        <meshStandardMaterial color="#b8d4e8" metalness={0.5} roughness={0.1} transparent opacity={0.2} />
      </mesh>
      <mesh position={[2.1, 2.05, 3.46]}>
        <boxGeometry args={[0.04, 0.86, 0.76]} />
        <meshStandardMaterial color="#b8d4e8" metalness={0.5} roughness={0.1} transparent opacity={0.2} />
      </mesh>

      {/* ═════ ENTRANCE CANOPY + STEPS ═════ */}
      {/* canopy slab */}
      <mesh position={[0, 1.56, 2.85]}>
        <boxGeometry args={[2.2, 0.06, 1.3]} />
        <meshStandardMaterial color="#3a3a3e" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* canopy pillars */}
      <mesh position={[-0.9, 0.85, 3.2]}>
        <boxGeometry args={[0.08, 1.5, 0.08]} />
        <meshStandardMaterial {...T} />
      </mesh>
      <mesh position={[0.9, 0.85, 3.2]}>
        <boxGeometry args={[0.08, 1.5, 0.08]} />
        <meshStandardMaterial {...T} />
      </mesh>
      {/* entrance steps */}
      <mesh position={[0, 0.14, 2.7]}>
        <boxGeometry args={[1.6, 0.1, 0.7]} />
        <meshStandardMaterial color="#555550" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.08, 3.1]}>
        <boxGeometry args={[1.6, 0.1, 0.6]} />
        <meshStandardMaterial color="#666660" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.02, 3.4]}>
        <boxGeometry args={[1.6, 0.06, 0.4]} />
        <meshStandardMaterial color="#777770" roughness={0.8} />
      </mesh>

      {/* ═════ GARAGE WING (right side, single storey) ═════ */}
      {/* floor slab */}
      <mesh position={[5.2, 0.21, 0]}>
        <boxGeometry args={[3, 0.1, 3.6]} />
        <meshStandardMaterial {...mat.darkFlr} />
      </mesh>
      {/* back wall */}
      <mesh position={[5.2, 0.88, -1.76]}>
        <boxGeometry args={[3, 1.24, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* right wall */}
      <mesh position={[6.66, 0.88, 0]}>
        <boxGeometry args={[0.08, 1.24, 3.5]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* front wall – with garage door opening */}
      <mesh position={[4.2, 0.88, 1.76]}>
        <boxGeometry args={[1.0, 1.24, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      <mesh position={[6.2, 0.88, 1.76]}>
        <boxGeometry args={[1.0, 1.24, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      <mesh position={[5.2, 1.38, 1.76]}>
        <boxGeometry args={[1.0, 0.24, 0.08]} />
        <meshStandardMaterial {...W} />
      </mesh>
      {/* garage door */}
      <mesh position={[5.2, 0.72, 1.75]}>
        <boxGeometry args={[1.0, 1.08, 0.04]} />
        <meshStandardMaterial color="#555555" metalness={0.4} roughness={0.4} />
      </mesh>
      {/* garage door horizontal lines */}
      {[0.4, 0.65, 0.9].map((y, i) => (
        <mesh key={`gdl-${i}`} position={[5.2, y, 1.77]}>
          <boxGeometry args={[0.98, 0.015, 0.01]} />
          <meshStandardMaterial color="#444444" roughness={0.5} />
        </mesh>
      ))}
      {/* garage roof */}
      <mesh position={[5.2, 1.55, 0]}>
        <boxGeometry args={[3.2, 0.1, 3.8]} />
        <meshStandardMaterial color="#3a3a3e" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* connection wall between main + garage */}
      <mesh position={[3.56, 0.88, 0]}>
        <boxGeometry args={[0.5, 1.24, 3.5]} />
        <meshStandardMaterial {...W} />
      </mesh>

      {/* ═════ GOLD ACCENT LINES ═════ */}
      {/* ground-floor base line */}
      <mesh position={[0, 0.22, 2.26]}>
        <boxGeometry args={[6.7, 0.025, 0.02]} />
        <meshStandardMaterial {...A} />
      </mesh>
      {/* floor division line */}
      <mesh position={[0, 1.56, 2.26]}>
        <boxGeometry args={[6.7, 0.025, 0.02]} />
        <meshStandardMaterial {...A} />
      </mesh>

      {/* ═════ POOL  (left side of house) ═════ */}
      {/* pool deck */}
      <mesh position={[-5.2, 0.03, 0]}>
        <boxGeometry args={[4.4, 0.04, 4]} />
        <meshStandardMaterial color="#c4b9a8" roughness={0.8} />
      </mesh>
      {/* pool coping */}
      <mesh position={[-5.2, 0.07, 0]}>
        <boxGeometry args={[3.6, 0.02, 3.2]} />
        <meshStandardMaterial color="#999990" roughness={0.7} />
      </mesh>
      {/* pool water */}
      <mesh
        position={[-5.2, 0.01, 0]}
        onPointerEnter={() => setHovered('pool')}
        onPointerLeave={() => setHovered(null)}
      >
        <boxGeometry args={[3.2, 0.22, 2.8]} />
        <meshStandardMaterial
          color={hovered === 'pool' ? '#5ab8ff' : '#1a6fa0'}
          metalness={0.7}
          roughness={0.05}
          transparent
          opacity={0.88}
        />
      </mesh>
      {/* water surface shimmer */}
      <mesh position={[-5.2, 0.12, 0]}>
        <boxGeometry args={[3.0, 0.01, 2.6]} />
        <meshStandardMaterial color="#7dd3fc" metalness={0.95} roughness={0} transparent opacity={0.4} />
      </mesh>

      {/* ═════ LANDSCAPING ═════ */}

      {/* ── Realistic Trees ── */}
      {[
        { pos: [-5.5, 0, 3.5],  type: 'round',   scale: 1.0  },
        { pos: [-5.5, 0, -3.5], type: 'cypress',  scale: 0.9  },
        { pos: [6.5, 0, 3.5],   type: 'round',   scale: 1.1  },
        { pos: [6.5, 0, -3],    type: 'cypress',  scale: 0.85 },
        { pos: [-2, 0, -4],     type: 'round',   scale: 0.95 },
        { pos: [3, 0, -4],      type: 'round',   scale: 1.05 },
        { pos: [-7, 0, 0],      type: 'cypress',  scale: 0.8  },
        { pos: [3.5, 0, 5],     type: 'round',   scale: 0.75 },
      ].map((tree, i) => (
        <group key={`tree-${i}`} position={tree.pos} scale={[tree.scale, tree.scale, tree.scale]}>
          {/* Trunk — tapered cylinder */}
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.06, 0.12, 1.1, 8]} />
            <meshStandardMaterial color="#5a4a38" roughness={0.92} />
          </mesh>
          {/* Primary branches (subtle) */}
          <mesh position={[0.12, 0.9, 0.05]} rotation={[0.2, 0, 0.6]}>
            <cylinderGeometry args={[0.02, 0.035, 0.4, 5]} />
            <meshStandardMaterial color="#5a4a38" roughness={0.9} />
          </mesh>
          <mesh position={[-0.1, 0.85, -0.06]} rotation={[-0.3, 0.5, -0.5]}>
            <cylinderGeometry args={[0.02, 0.03, 0.35, 5]} />
            <meshStandardMaterial color="#5a4a38" roughness={0.9} />
          </mesh>

          {tree.type === 'round' ? (
            <>
              {/* ── Round canopy tree — multi-layer foliage ── */}
              {/* Large lower canopy */}
              <mesh position={[0, 1.25, 0]}>
                <sphereGeometry args={[0.55, 14, 12]} />
                <meshStandardMaterial color="#2e6b2e" roughness={0.88} />
              </mesh>
              {/* Middle canopy — offset */}
              <mesh position={[0.12, 1.5, 0.08]}>
                <sphereGeometry args={[0.45, 12, 10]} />
                <meshStandardMaterial color="#3a7e3a" roughness={0.85} />
              </mesh>
              {/* Upper canopy — smaller, lighter */}
              <mesh position={[-0.05, 1.7, -0.05]}>
                <sphereGeometry args={[0.35, 12, 10]} />
                <meshStandardMaterial color="#4a9a4a" roughness={0.82} />
              </mesh>
              {/* Top tuft */}
              <mesh position={[0.05, 1.9, 0.03]}>
                <sphereGeometry args={[0.2, 10, 8]} />
                <meshStandardMaterial color="#5aaa5a" roughness={0.8} />
              </mesh>
              {/* Shadow sphere underneath */}
              <mesh position={[0, 1.05, 0]}>
                <sphereGeometry args={[0.4, 10, 8]} />
                <meshStandardMaterial color="#1e4a1e" roughness={0.95} transparent opacity={0.7} />
              </mesh>
            </>
          ) : (
            <>
              {/* ── Cypress / conical tree — stacked cones ── */}
              {/* Bottom cone — widest */}
              <mesh position={[0, 0.95, 0]}>
                <coneGeometry args={[0.4, 0.6, 10]} />
                <meshStandardMaterial color="#1e5a1e" roughness={0.9} />
              </mesh>
              {/* Middle cone */}
              <mesh position={[0, 1.3, 0]}>
                <coneGeometry args={[0.32, 0.55, 10]} />
                <meshStandardMaterial color="#2a6a2a" roughness={0.88} />
              </mesh>
              {/* Upper cone */}
              <mesh position={[0, 1.6, 0]}>
                <coneGeometry args={[0.24, 0.5, 10]} />
                <meshStandardMaterial color="#358a35" roughness={0.85} />
              </mesh>
              {/* Top cone — smallest */}
              <mesh position={[0, 1.85, 0]}>
                <coneGeometry args={[0.15, 0.4, 8]} />
                <meshStandardMaterial color="#42a042" roughness={0.82} />
              </mesh>
            </>
          )}
        </group>
      ))}

      {/* ── Hedges (rounded, organic) ── */}
      {/* Front left hedge */}
      <group position={[-4.5, 0.1, 4]}>
        {[-0.8, 0, 0.8].map((x, i) => (
          <mesh key={`hl-${i}`} position={[x, 0.15, 0]}>
            <sphereGeometry args={[0.35, 10, 8]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#2a5a2a' : '#336633'} roughness={0.92} />
          </mesh>
        ))}
        {/* Connecting fill */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[2.2, 0.2, 0.45]} />
          <meshStandardMaterial color="#265a26" roughness={0.95} />
        </mesh>
      </group>
      {/* Front right hedge */}
      <group position={[5, 0.1, 4]}>
        {[-0.8, 0, 0.8].map((x, i) => (
          <mesh key={`hr-${i}`} position={[x, 0.15, 0]}>
            <sphereGeometry args={[0.35, 10, 8]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#336633' : '#2a5a2a'} roughness={0.92} />
          </mesh>
        ))}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[2.2, 0.2, 0.45]} />
          <meshStandardMaterial color="#265a26" roughness={0.95} />
        </mesh>
      </group>
      {/* Side hedge (near pool) */}
      <group position={[-5.2, 0.1, -2.5]}>
        {[-0.5, 0.3].map((z, i) => (
          <mesh key={`hs-${i}`} position={[0, 0.12, z]}>
            <sphereGeometry args={[0.28, 8, 6]} />
            <meshStandardMaterial color="#2a5a2a" roughness={0.92} />
          </mesh>
        ))}
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.5, 0.15, 1.3]} />
          <meshStandardMaterial color="#265a26" roughness={0.95} />
        </mesh>
      </group>

      {/* Pathway lights along driveway */}
      {[[-1.4, 0, 4], [1.4, 0, 4], [-1.4, 0, 5], [1.4, 0, 5]].map((pos, i) => (
        <group key={`pl-${i}`} position={pos}>
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.44, 6]} />
            <meshStandardMaterial color="#333" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.46, 0]}>
            <sphereGeometry args={[0.045, 6, 6]} />
            <meshStandardMaterial color="#fff5dd" emissive="#fff5dd" emissiveIntensity={0.6} />
          </mesh>
        </group>
      ))}

      {/* Small decorative shrubs near entrance */}
      {[[-1.2, 0, 2.4], [1.2, 0, 2.4]].map((pos, i) => (
        <mesh key={`shrub-${i}`} position={pos}>
          <sphereGeometry args={[0.2, 8, 6]} />
          <meshStandardMaterial color="#3a6a3a" roughness={0.9} />
        </mesh>
      ))}

    </group>
  );
};

/* ─── Subtle camera bob ─── */
const CameraRig = () => {
  const { camera } = useThree();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    camera.position.y = 4 + Math.sin(t * 0.2) * 0.3;
  });
  return null;
};

/* ─── Ground plane (dark beyond lawn) ─── */
const Ground = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.25, 0]} receiveShadow>
    <planeGeometry args={[60, 60]} />
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
            camera={{ position: [10, 5, 10], fov: 45 }}
            shadows
            gl={{ antialias: true, powerPreference: 'high-performance' }}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            data-testid="showcase-canvas"
          >
            <color attach="background" args={['#0A0A0C']} />
            <fog attach="fog" args={['#0A0A0C', 18, 50]} />

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[12, 14, 8]}
              intensity={1.0}
              color="#fffaf4"
              castShadow
              shadow-mapSize={[2048, 2048]}
            />
            <directionalLight position={[-10, 8, -6]} intensity={0.5} color="#D4B38A" />
            <pointLight position={[0, 5, 0]} intensity={0.9} color="#C19A6B" distance={25} />
            {/* Pool light */}
            <pointLight position={[-5.2, 0, 0]} intensity={1.5} color="#4a8cbf" distance={8} />
            {/* Fill from front */}
            <pointLight position={[0, 3, 12]} intensity={0.5} color="#ffffff" distance={22} />

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
              autoRotateSpeed={0.4}
              maxPolarAngle={Math.PI / 2.1}
              minDistance={6}
              maxDistance={25}
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
