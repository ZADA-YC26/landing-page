import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Float, MeshTransmissionMaterial, Environment, Stars } from '@react-three/drei'
import * as THREE from 'three'

/* ── Loaded GLTF (may be empty — scaffold is future-proof) ── */
function GltfModel() {
  const { scene } = useGLTF('/3d_model.gltf')

  // Count real mesh nodes
  let meshCount = 0
  scene.traverse((o) => { if ((o as THREE.Mesh).isMesh) meshCount++ })

  if (meshCount === 0) return null // file has no geometry — fall through to ZadaGhost
  return <primitive object={scene} dispose={null} />
}

/* ── Ghost mascot built from Three.js primitives ── */
function ZadaGhostMesh() {
  const groupRef = useRef<THREE.Group>(null)
  const eyeRef   = useRef<THREE.Mesh>(null)
  const sparkRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.25
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.08
    }
    if (sparkRef.current) {
      sparkRef.current.rotation.z = t * 0.8
      sparkRef.current.rotation.x = t * 0.3
    }
    if (eyeRef.current) {
      eyeRef.current.scale.y = 0.8 + Math.abs(Math.sin(t * 0.5)) * 0.2
    }
  })

  // Ghost body: capsule-like shape from a sphere + cylinder
  const bodyGeo = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.55, 32, 32)
    // Flatten bottom half slightly
    const pos = geo.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i)
      if (y < 0) pos.setY(i, y * 0.75)
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
    return geo
  }, [])

  // Wiggly tail triangles
  const tailGeos = useMemo(() =>
    [-0.3, 0, 0.3].map((xOff) => {
      const shape = new THREE.Shape()
      shape.moveTo(-0.18, 0)
      shape.lineTo(0.18, 0)
      shape.lineTo(xOff * 0.5, -0.32)
      shape.closePath()
      return new THREE.ShapeGeometry(shape)
    })
  , [])

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Body */}
      <mesh geometry={bodyGeo} castShadow>
        <MeshTransmissionMaterial
          color="#CCFF00"
          transmission={0.05}
          roughness={0.1}
          metalness={0.0}
          thickness={0.4}
          ior={1.2}
          chromaticAberration={0.04}
          distortion={0.1}
          distortionScale={0.3}
          temporalDistortion={0.05}
          envMapIntensity={1.2}
          emissive="#CCFF00"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Eye */}
      <mesh ref={eyeRef} position={[0.16, 0.12, 0.5]} scale={[1, 1.35, 1]}>
        <circleGeometry args={[0.09, 16]} />
        <meshBasicMaterial color="#05030A" />
      </mesh>

      {/* Tail triangles */}
      {tailGeos.map((geo, i) => (
        <mesh key={i} geometry={geo} position={[-0.3 + i * 0.3, -0.54, 0.0]}>
          <meshStandardMaterial color="#CCFF00" emissive="#CCFF00" emissiveIntensity={0.3} roughness={0.2} />
        </mesh>
      ))}

      {/* 4-point star sparkle */}
      <group ref={sparkRef} position={[-0.72, 0.62, 0.1]}>
        {[0, 90].map((rot, i) => (
          <mesh key={i} rotation={[0, 0, (rot * Math.PI) / 180]}>
            <boxGeometry args={[0.03, 0.38, 0.02]} />
            <meshStandardMaterial color="#CCFF00" emissive="#CCFF00" emissiveIntensity={1.2} />
          </mesh>
        ))}
        {/* Star tips */}
        {[[0, 0.22], [0, -0.22], [0.22, 0], [-0.22, 0]].map(([x, y], i) => (
          <mesh key={`tip-${i}`} position={[x, y, 0]}>
            <octahedronGeometry args={[0.055]} />
            <meshStandardMaterial color="#CCFF00" emissive="#CCFF00" emissiveIntensity={1.5} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/* ── Orbiting XP orbs ── */
function OrbitingOrbs() {
  const orbs = useMemo(() => [
    { radius: 1.25, speed: 0.55, offset: 0,    size: 0.07, color: '#00E5FF' },
    { radius: 1.45, speed: -0.38, offset: 2.1, size: 0.05, color: '#9D00FF' },
    { radius: 1.15, speed: 0.7,  offset: 4.2,  size: 0.06, color: '#CCFF00' },
    { radius: 1.55, speed: -0.5, offset: 1.3,  size: 0.04, color: '#00E5FF' },
    { radius: 1.3,  speed: 0.42, offset: 3.5,  size: 0.05, color: '#9D00FF' },
  ], [])

  const refs = useRef<THREE.Mesh[]>([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    orbs.forEach((orb, i) => {
      const mesh = refs.current[i]
      if (!mesh) return
      const angle = t * orb.speed + orb.offset
      mesh.position.x = Math.cos(angle) * orb.radius
      mesh.position.z = Math.sin(angle) * orb.radius
      mesh.position.y = Math.sin(angle * 1.4 + orb.offset) * 0.3
    })
  })

  return (
    <>
      {orbs.map((orb, i) => (
        <mesh key={i} ref={(el) => { if (el) refs.current[i] = el }}>
          <sphereGeometry args={[orb.size, 12, 12]} />
          <meshStandardMaterial
            color={orb.color}
            emissive={orb.color}
            emissiveIntensity={2.5}
            roughness={0}
            metalness={0}
          />
        </mesh>
      ))}
    </>
  )
}

/* ── Mouse-reactive camera ── */
function CameraRig() {
  const { camera } = useThree()
  useFrame((state) => {
    const mx = state.pointer.x
    const my = state.pointer.y
    camera.position.x += (mx * 0.4 - camera.position.x) * 0.04
    camera.position.y += (my * 0.25 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* ── Floating ring ── */
function Ring() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.3 + 0.5
      ref.current.rotation.z = state.clock.elapsedTime * 0.12
    }
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.7, 0.012, 8, 80]} />
      <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={1.2} transparent opacity={0.35} />
    </mesh>
  )
}

function Ring2() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.18
      ref.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.2 + 0.9
    }
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.35, 0.008, 8, 80]} />
      <meshStandardMaterial color="#9D00FF" emissive="#9D00FF" emissiveIntensity={1.5} transparent opacity={0.25} />
    </mesh>
  )
}

/* ── Ground glow disc ── */
function GroundGlow() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.08
      ref.current.scale.set(s, 1, s)
    }
  })
  return (
    <mesh ref={ref} position={[0, -0.85, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[1.1, 48]} />
      <meshBasicMaterial color="#CCFF00" transparent opacity={0.07} />
    </mesh>
  )
}

/* ── Main exported scene ── */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 3.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[3, 3, 3]} color="#00E5FF" intensity={2} />
      <pointLight position={[-3, 1, -2]} color="#9D00FF" intensity={2.5} />
      <pointLight position={[0, -2, 2]} color="#CCFF00" intensity={1.5} />

      <Stars radius={60} depth={20} count={600} factor={2} fade speed={0.6} />

      <Suspense fallback={null}>
        <Environment preset="night" environmentIntensity={0.4} />
        <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.6}>
          <GltfModel />
          <ZadaGhostMesh />
        </Float>
      </Suspense>

      <OrbitingOrbs />
      <Ring />
      <Ring2 />
      <GroundGlow />
      <CameraRig />
    </Canvas>
  )
}

useGLTF.preload('/3d_model.gltf')
