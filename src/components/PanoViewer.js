import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/* 
  Simulated 360° panoramic viewer using React Three Fiber.
  Uses equirectangular images mapped to the inside of a sphere.
  This replaces react-photo-sphere-viewer for CRA compatibility.
*/

const PanoramaSphere = ({ imageUrl }) => {
  const meshRef = useRef();
  const texture = useLoader(THREE.TextureLoader, imageUrl);

  useEffect(() => {
    if (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
    }
  }, [texture]);

  return (
    <mesh ref={meshRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 64, 32]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
};

const PanoViewer = ({ imageUrl, onClose }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A0A0C]"
      data-testid="pano-viewer"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        data-testid="pano-close"
        className="absolute top-6 right-6 z-50 bg-[#0A0A0C]/80 backdrop-blur-xl border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] font-body text-[#F3F3F1] hover:border-gold hover:text-gold transition-all duration-300"
      >
        ✕ Close
      </button>

      {/* Drag hint */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-[#0A0A0C]/80 backdrop-blur-xl border border-white/10 px-6 py-2">
        <span className="text-[11px] uppercase tracking-[0.2em] font-body text-[#A1A1A5]">
          Drag to explore • Scroll to zoom
        </span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 0.1], fov: 75 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        onCreated={() => setLoading(false)}
      >
        <React.Suspense fallback={null}>
          <PanoramaSphere imageUrl={imageUrl} />
        </React.Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.1}
          rotateSpeed={-0.3}
          minDistance={0.01}
          maxDistance={0.1}
        />
      </Canvas>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-40 bg-[#0A0A0C]">
          <div className="text-center">
            <div className="w-8 h-8 border border-gold border-t-transparent animate-spin mx-auto mb-4" />
            <span className="text-xs uppercase tracking-[0.2em] font-body text-[#707076]">
              Loading Panorama...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanoViewer;
