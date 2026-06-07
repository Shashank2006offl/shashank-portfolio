import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

const parameters = {
  materialColor: '#ea580c', // Orange to match the current theme
};

const objectsDistance = 6;

const Scene = () => {
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  
  const spot1Ref = useRef<THREE.SpotLight>(null);
  const spot2Ref = useRef<THREE.SpotLight>(null);
  const spot3Ref = useRef<THREE.SpotLight>(null);

  const { camera, size } = useThree();
  const sectionMeshes = useRef<THREE.Mesh[]>([]);
  const spotlights = useRef<THREE.SpotLight[]>([]);

  useEffect(() => {
    if (torusRef.current && sphereRef.current && boxRef.current) {
      sectionMeshes.current = [torusRef.current, sphereRef.current, boxRef.current];
    }
    if (spot1Ref.current && spot2Ref.current && spot3Ref.current) {
      spotlights.current = [spot1Ref.current, spot2Ref.current, spot3Ref.current];
    }

    // Set initial target for spotlights
    if (spotlights.current.length > 0 && sectionMeshes.current.length > 0) {
        spotlights.current[0].target = sectionMeshes.current[0];
        spotlights.current[1].target = sectionMeshes.current[1];
        spotlights.current[2].target = sectionMeshes.current[2];
    }
  }, []);

  // Parallax / Scroll camera logic
  let scrollY = 0;
  let currentSection = 0;

  useEffect(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;
      const newSection = Math.round(scrollY / size.height);

      if (newSection !== currentSection && newSection < sectionMeshes.current.length) {
        currentSection = newSection;

        // GSAP Animations
        if (sectionMeshes.current[currentSection]) {
          gsap.fromTo(
            sectionMeshes.current[currentSection].position,
            { z: -5 },
            {
              duration: 1.5,
              z: -1,
              ease: 'power2.out',
            }
          );

          gsap.to(sectionMeshes.current[currentSection].rotation, {
            duration: 4.5,
            ease: 'power4.out',
            z: '+=5.5',
          });
        }

        if (spotlights.current[currentSection]) {
          gsap.fromTo(
            spotlights.current[currentSection],
            { angle: 0 },
            {
              duration: 1,
              angle: 0.35,
              ease: 'power2.out',
            }
          );
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [size.height]);

  useFrame((state) => {
    // Scroll camera
    camera.position.y = (-window.scrollY / size.height) * objectsDistance;

    // Float animation
    const time = state.clock.getElapsedTime();
    sectionMeshes.current.forEach((mesh, index) => {
      if (mesh) {
        // Subtle floating
        mesh.position.y = -objectsDistance * index + Math.sin(time + index) * 0.2;
        // Subtle rotation
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.012;
      }
    });
  });

  const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    wireframe: true,
  });

  const planeMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.05, // Lowered opacity so it doesn't block portfolio content
    side: THREE.DoubleSide,
  });

  const positions = [
    [2, 0, -1],
    [-2, -objectsDistance, -1],
    [2, -objectsDistance * 2, -1],
  ];

  return (
    <>
      <ambientLight intensity={0.1} />

      {/* Torus */}
      <mesh ref={torusRef} position={[2, 0, -5]} castShadow material={material}>
        <torusGeometry args={[0.5, 0.25, 16, 60]} />
      </mesh>
      <mesh position={[2, -1, -1]} rotation={[-Math.PI * 0.5, 0, 0]} receiveShadow material={planeMaterial}>
        <planeGeometry args={[4, 4]} />
      </mesh>
      <spotLight ref={spot1Ref} position={[2, 3, -1]} color="#ffffff" intensity={10} angle={0} penumbra={1} castShadow />

      {/* Sphere */}
      <mesh ref={sphereRef} position={[-2, -objectsDistance, -5]} castShadow material={material}>
        <sphereGeometry args={[0.65, 32, 32]} />
      </mesh>
      <mesh position={[-2, -objectsDistance - 1, -1]} rotation={[-Math.PI * 0.5, 0, 0]} receiveShadow material={planeMaterial}>
        <planeGeometry args={[4, 4]} />
      </mesh>
      <spotLight ref={spot2Ref} position={[-2, -objectsDistance + 3, -1]} color="#ffffff" intensity={10} angle={0} penumbra={1} castShadow />

      {/* Box */}
      <mesh ref={boxRef} position={[2, -objectsDistance * 2, -5]} castShadow material={material}>
        <boxGeometry args={[0.9, 0.9, 0.9, 6, 6, 6]} />
      </mesh>
      <mesh position={[2, -objectsDistance * 2 - 1, -1]} rotation={[-Math.PI * 0.5, 0, 0]} receiveShadow material={planeMaterial}>
        <planeGeometry args={[4, 4]} />
      </mesh>
      <spotLight ref={spot3Ref} position={[2, -objectsDistance * 2 + 3, -1]} color="#ffffff" intensity={10} angle={0} penumbra={1} castShadow />
    </>
  );
};

const ScrollBasedAnimation = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 35 }}
        gl={{ alpha: true }}
        shadows
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ScrollBasedAnimation;
