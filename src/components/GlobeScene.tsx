import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Generate evenly distributed points on a sphere
function generateSpherePoints(count = 240, radius = 1.5) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const iF = i + 0.5;
    const phi = Math.acos(1 - (2 * iF) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * iF;
    const x = Math.cos(theta) * Math.sin(phi);
    const y = Math.cos(phi);
    const z = Math.sin(theta) * Math.sin(phi);
    positions.set([x * radius, y * radius, z * radius], i * 3);
  }
  return positions;
}

// Generate line connections between nearby nodes
function generateLineIndices(positions, threshold = 0.5, maxConnections = 6) {
  const n = positions.length / 3;
  const vertices = [];
  for (let i = 0; i < n; i++) {
    let connections = 0;
    const [xi, yi, zi] = positions.slice(i * 3, i * 3 + 3);
    for (let j = i + 1; j < n; j++) {
      if (connections >= maxConnections) break;
      const [xj, yj, zj] = positions.slice(j * 3, j * 3 + 3);
      const d = Math.hypot(xi - xj, yi - yj, zi - zj);
      if (d <= threshold) {
        vertices.push(xi, yi, zi, xj, yj, zj);
        connections++;
      }
    }
  }
  return new Float32Array(vertices);
}

const WireframeGlobe = () => {
  const groupRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const positions = useMemo(() => generateSpherePoints(240, 1.5), []);
  const lineVertices = useMemo(() => generateLineIndices(positions, 0.5, 6), [positions]);

  const pointsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const linesGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(lineVertices, 3));
    return geo;
  }, [lineVertices]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.09 * delta;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.05;

      // Smooth scale animation on hover
      const targetScale = hovered ? 1.1 : 1;
      groupRef.current.scale.x += (targetScale - groupRef.current.scale.x) * 0.1;
      groupRef.current.scale.y += (targetScale - groupRef.current.scale.y) * 0.1;
      groupRef.current.scale.z += (targetScale - groupRef.current.scale.z) * 0.1;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Lines */}
      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial
          color="#0891b2"
          transparent
          opacity={hovered ? 0.6 : 0.4}
          linewidth={1}
        />
      </lineSegments>

      {/* Points */}
      <points geometry={pointsGeo}>
        <pointsMaterial
          size={hovered ? 0.04 : 0.035}
          sizeAttenuation={true}
          color="#06b6d4"
          transparent
          opacity={hovered ? 0.9 : 0.7}
          depthWrite={false}
        />
      </points>

      {/* Outer shell */}
      <mesh>
        <sphereGeometry args={[1.52, 64, 64]} />
        <meshBasicMaterial
          color="#0A0F1F"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#0891b2" />
    </group>
  );
};

const GlobeScene = () => {
  const [isReady, setIsReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensure component is fully mounted
    setIsMounted(true);

    // Delay Canvas initialization to prevent glitches
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 150);

    return () => {
      clearTimeout(timer);
      setIsMounted(false);
    };
  }, []);

  if (!isMounted || !isReady) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center cursor-pointer">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        style={{ background: 'transparent' }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false
        }}
        dpr={[1, 2]}
        frameloop="always"
      >
        <WireframeGlobe />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

export default GlobeScene;