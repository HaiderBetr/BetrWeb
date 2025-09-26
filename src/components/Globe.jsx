// Globe.jsx
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import "../styles/globe.css";

// Logos
import SharkTankM from "../assets/logos-globe/STM.png";
import CasoCerrado from "../assets/logos-globe/caso-cerrado.png";
import Magic from "../assets/logos-globe/magic-sngh.png";
import Hollywood from "../assets/logos-globe/Hollywood.png";
import CasadosConHijos from "../assets/logos-globe/CCH.png";
import BreakingBad from "../assets/logos-globe/bb-esp.png";
import AndresLopez from "../assets/logos-globe/andres-lopez.png";

// Textura del mapa (ajusta la ruta si la tienes en otro sitio)
import worldMapUrl from "/texture/world-map.jpg";

// ---- Util: generar puntos a partir del mapa B/N ----
function useWorldPoints(texture, { radius = 2, step = 1, threshold = 120 } = {}) {
  return useMemo(() => {
    const img = texture.image;
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const { data } = ctx.getImageData(0, 0, img.width, img.height);

    const base = [];
    for (let y = 0; y < img.height; y += step) {
      for (let x = 0; x < img.width; x += step) {
        const i = (y * img.width + x) * 4;
        const r = data[i];
        if (r < threshold) {
          const lon = (x / img.width) * 360 - 180;
          const lat = 90 - (y / img.height) * 180;
          const phi = (90 - lat) * (Math.PI / 180);
          const theta = (lon + 180) * (Math.PI / 180);

          const nx = -(Math.sin(phi) * Math.cos(theta));
          const ny = Math.cos(phi);
          const nz = Math.sin(phi) * Math.sin(theta);

          base.push(nx, ny, nz);
        }
      }
    }

    const count = base.length / 3;
    const basePositions = new Float32Array(base.length);
    const directions = new Float32Array(base.length);
    const phases = new Float32Array(count);

    for (let i = 0, j = 0; i < base.length; i += 3, j++) {
      const nx = base[i], ny = base[i + 1], nz = base[i + 2];
      basePositions[i] = nx * radius;
      basePositions[i + 1] = ny * radius;
      basePositions[i + 2] = nz * radius;
      directions[i] = nx;
      directions[i + 1] = ny;
      directions[i + 2] = nz;
      phases[j] = Math.random() * Math.PI * 2;
    }

    return { basePositions, directions, phases, count };
  }, [texture, radius, step, threshold]);
}

// ---- Halo ----
function LandHalo({ texture }) {
  const haloRef = useRef();
  const { basePositions } = useWorldPoints(texture, {
    radius: 2.15,
    step: 1,
    threshold: 50,
  });

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(basePositions, 3));
    return g;
  }, [basePositions]);

  useFrame(() => {
    if (haloRef.current) haloRef.current.rotation.y += 0.0012;
  });

  return (
    <points ref={haloRef} geometry={geometry}>
      <pointsMaterial 
      color="black" 
      size={0.002} 
      sizeAttenuation 
      opacity={0.50} 
     />
    </points>
  );
}

// ---- Partículas con pulso (continentes) ----
function LandParticles({ texture }) {
  const pointsRef = useRef();
  const { basePositions, directions, phases, count } = useWorldPoints(texture, {
    radius: 2,
    step: 1,
    threshold: 100,
  });

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(basePositions.slice(), 3));
    return g;
  }, [basePositions]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pos = geometry.attributes.position.array;
    const dir = directions;
    const amp = 0.08;
    const speed = 1.5;

    for (let i = 0, j = 0; j < count; i += 3, j++) {
      const s = 1 + amp * (0.5 + 0.5 * Math.sin(t * speed + phases[j]));
      pos[i] = dir[i] * 2 * s;
      pos[i + 1] = dir[i + 1] * 2 * s;
      pos[i + 2] = dir[i + 2] * 2 * s;
    }
    geometry.attributes.position.needsUpdate = true;

    if (pointsRef.current) pointsRef.current.rotation.y += 0.0012;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial 
      color="black" 
      size={0.008} 
      sizeAttenuation 
      transparent 
      opacity={0.25} 
      depthWrite={false} />
    </points>
  );
}

// ---- Mar (esfera de fondo) ----
function Ocean() {
  return (
    <mesh>
      <sphereGeometry args={[2.0, 64, 64]} />
      <meshStandardMaterial color="rgb(242, 221, 188)" roughness={1} metalness={0} />
    </mesh>
  );
}

// ---- Logos 3D (versión básica que ya usas) ----
function FloatingLogos3D({
  logos,
  radius = 2.15,
  lifespan = 10.5,
  spawnInterval = 0.45,
  maxOnScreen = 8,
  iconSize = 0.18,
  rotateSpeed = 0.0010,
}) {
  const groupRef = useRef();
  const cameraPos = useRef(new THREE.Vector3());

  const texSources = useMemo(() => logos.map(l => l.img), [logos]);
  const textures = useLoader(THREE.TextureLoader, texSources);
  textures.forEach(t => { t.minFilter = THREE.LinearFilter; t.magFilter = THREE.LinearFilter; });

  const pool = useRef(
    Array.from({ length: maxOnScreen }, () => ({
      active: false,
      start: 0,
      texIdx: 0,
      pos: new THREE.Vector3(),
      life: lifespan,
    }))
  );

  const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
  const yoyo = (p) => (p <= 0.5 ? easeOutCubic(p * 2) : easeOutCubic((1 - p) * 2));

  function randomOnSphere(r) {
    const u = Math.random() * 2 - 1;
    const theta = Math.random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    return new THREE.Vector3(r * s * Math.cos(theta), r * u, r * s * Math.sin(theta));
  }

  const lastSpawnRef = useRef(0);
  const nextTexRef = useRef(0);

  const linesGeomRef = useRef(new THREE.BufferGeometry());
  const linesRef = useRef();

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) groupRef.current.rotation.y += rotateSpeed;

    if (t - lastSpawnRef.current >= spawnInterval) {
      const slot = pool.current.find(s => !s.active);
      if (slot) {
        slot.pos.copy(randomOnSphere(radius));
        slot.texIdx = nextTexRef.current % textures.length;
        nextTexRef.current += 1;
        slot.start = t;
        slot.life = lifespan;
        slot.active = true;
      }
      lastSpawnRef.current = t;
    }

    camera.getWorldPosition(cameraPos.current);
    const camDir = cameraPos.current.clone().normalize();

    groupRef.current?.children.forEach((child) => {
      if (!child.userData.slot) return;
      const slot = child.userData.slot;
      if (!slot.active) { child.visible = false; return; }
      const age = t - slot.start;
      const p = Math.min(Math.max(age / slot.life, 0), 1);
      const k = yoyo(p);
      const scale = THREE.MathUtils.lerp(0.32, 0.95, k);
      const alpha = k;

      const normal = slot.pos.clone().normalize();
      const facing = normal.dot(camDir) > 0;
      child.visible = facing && alpha > 0.02;

      child.position.copy(slot.pos);
      child.children[0].lookAt(cameraPos.current);
      child.scale.setScalar(scale);

      const mat = child.children[0].material;
      mat.transparent = true;
      mat.depthTest = false;
      mat.opacity = alpha;

      if (age >= slot.life) { slot.active = false; child.visible = false; }
    });

    // Conexiones (todos con todos entre visibles)
    const activeVisible = pool.current
      .filter(s => s.active && s.pos.clone().normalize().dot(camDir) > 0)
      .sort((a, b) => a.start - b.start);

    const n = activeVisible.length;
    if (n >= 2) {
      const pairCount = (n * (n - 1)) / 2;
      const arr = new Float32Array(pairCount * 2 * 3);
      let k = 0;
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
        const A = activeVisible[i].pos, B = activeVisible[j].pos;
        arr[k++] = A.x; arr[k++] = A.y; arr[k++] = A.z;
        arr[k++] = B.x; arr[k++] = B.y; arr[k++] = B.z;
      }
      linesGeomRef.current.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      linesGeomRef.current.attributes.position.needsUpdate = true;
      if (linesRef.current) linesRef.current.visible = true;
    } else {
      if (linesRef.current) linesRef.current.visible = false;
    }
  });

  return (
    <group ref={groupRef}>
      {pool.current.map((slot, i) => (
        <group key={i} userData={{ slot }} visible={false}>
          <mesh renderOrder={999}>
            <circleGeometry args={[iconSize, 60]} />
            <meshBasicMaterial map={textures[i % textures.length]} transparent opacity={0} depthTest={false} />
          </mesh>
        </group>
      ))}
      <lineSegments ref={linesRef} geometry={linesGeomRef.current} renderOrder={998}>
        <lineBasicMaterial color="black" transparent opacity={0.25} depthTest={false} />
      </lineSegments>
    </group>
  );
}

export default function Globe() {
  const texture = useLoader(THREE.TextureLoader, worldMapUrl);

  const logos3D = useMemo(
    () => [
      { name: "Shark Tank", img: SharkTankM },
      { name: "Caso Cerrado", img: CasoCerrado },
      { name: "Andres Lopez", img: AndresLopez },
      { name: "Breaking Bad", img: BreakingBad },
      { name: "Casados Con Hijos", img: CasadosConHijos },
      { name: "Hollywood Clips", img: Hollywood },
      { name: "Magic", img: Magic },
    ],
    []
  );

  return (
    <section className="world-section">
      {/* Columna izquierda: título/subtítulo */}
      <div className="world-copy">
        <h2 className="title">
          NUESTROS SERVICIOS HAN<br />
          CONQUISTADO EL MUNDO...
        </h2>
        <p className="sub-title">Estos son los lugares a los que hemos llegado:</p>
      </div>

      {/* Columna derecha: globo */}
      <div className="globe-container">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{ background: "rgb(242, 221, 188)" }}>
          <ambientLight intensity={1.5} color="#000000ff" />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#000000ff" />
          <pointLight position={[-5, -5, -5]} intensity={0.2} color="#000000ff" />

          <Ocean />
          <LandParticles texture={texture} />
          <LandHalo texture={texture} />

          <FloatingLogos3D
            logos={logos3D}
            radius={2.15}
            lifespan={10.5}
            spawnInterval={0.45}
            maxOnScreen={8}
            iconSize={0.18}
          />
        </Canvas>
      </div>
    </section>
  );
}
