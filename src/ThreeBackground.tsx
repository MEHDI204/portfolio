import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function createWireframe(
  geometry: THREE.BufferGeometry,
  position: THREE.Vector3,
  color: number,
  opacity: number,
  scale: number
) {
  const edges = new THREE.EdgesGeometry(geometry);
  const mat = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const mesh = new THREE.LineSegments(edges, mat);
  mesh.position.copy(position);
  mesh.scale.setScalar(scale);
  return mesh;
}

// Creates a single triangle wireframe
function createTriangle(size: number): THREE.BufferGeometry {
  const h = (size * Math.sqrt(3)) / 2;
  const pts = [
    new THREE.Vector3(0, h * 0.66, 0),
    new THREE.Vector3(-size / 2, -h * 0.33, 0),
    new THREE.Vector3(size / 2, -h * 0.33, 0),
    new THREE.Vector3(0, h * 0.66, 0), // close the loop
  ];
  return new THREE.BufferGeometry().setFromPoints(pts);
}

function randomSignedSpread(range: number, edgeBias = 0) {
  const value = Math.random();
  const biased = edgeBias > 0 ? Math.pow(value, 1 / (1 + edgeBias)) : value;
  return (Math.random() > 0.5 ? 1 : -1) * biased * range;
}

// ─── component ─────────────────────────────────────────────────────
export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sceneBounds = {
      width: 110,
      height: 62,
      depth: 92,
    };

    // ── renderer ──
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // ── scene & camera ──
    const scene = new THREE.Scene();
    // Add subtle fog for depth fade
    scene.fog = new THREE.FogExp2(0x0a0f1e, 0.009);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      320
    );
    camera.position.set(0, 10, 36);
    camera.lookAt(0, 0, -20);

    // ── palette ──
    const CYAN = 0x22d3ee;
    const BLUE = 0x3b82f6;
    const PURPLE = 0xa78bfa;
    const INDIGO = 0x6366f1;
    const TEAL = 0x14b8a6;
    const SLATE_LINE = 0x334155;

    // ══════════════════════════════════════════════════════════════
    //  1. INFINITE PERSPECTIVE GRID — vanishing point effect
    // ══════════════════════════════════════════════════════════════
    const gridGroup = new THREE.Group();
    const gridExtent = 120; // half-size
    const divisions = 60;
    const step = (gridExtent * 2) / divisions;

    for (let i = 0; i <= divisions; i++) {
      const pos = -gridExtent + i * step;
      const edgeDist = Math.abs(pos) / gridExtent;
      const baseOpacity = 0.045 + 0.055 * (1 - edgeDist);

      // Lines along X-axis (horizontal, stretching left-right)
      const geoX = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-gridExtent, 0, pos),
        new THREE.Vector3(gridExtent, 0, pos),
      ]);
      const matX = new THREE.LineBasicMaterial({
        color: CYAN,
        transparent: true,
        opacity: baseOpacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      gridGroup.add(new THREE.Line(geoX, matX));

      // Lines along Z-axis (depth, stretching toward vanishing point)
      const geoZ = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(pos, 0, -gridExtent),
        new THREE.Vector3(pos, 0, gridExtent),
      ]);
      const matZ = new THREE.LineBasicMaterial({
        color: BLUE,
        transparent: true,
        opacity: baseOpacity * 0.6,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      gridGroup.add(new THREE.Line(geoZ, matZ));
    }

    gridGroup.position.y = -8;
    gridGroup.rotation.x = -0.15; // slight tilt for perspective depth
    scene.add(gridGroup);

    // Subtle secondary upper grid (ceiling) for full 3D room feel
    const ceilGrid = gridGroup.clone();
    ceilGrid.position.y = 28;
    ceilGrid.rotation.x = 0.15;
    ceilGrid.traverse((child) => {
      if (child instanceof THREE.Line) {
        const mat = child.material as THREE.LineBasicMaterial;
        mat.opacity *= 0.25;
      }
    });
    scene.add(ceilGrid);

    // ══════════════════════════════════════════════════════════════
    //  2. FLOATING WIREFRAME SHAPES — holographic ghosts
    // ══════════════════════════════════════════════════════════════
    interface FloatingShape {
      mesh: THREE.Object3D;
      drift: THREE.Vector3;
      rotSpeed: THREE.Vector3;
      depth: number; // 0 = near, 1 = far
      pulse: number; // phase offset for pulsing opacity
    }

    const shapes: FloatingShape[] = [];

    const geometries = [
      () => new THREE.BoxGeometry(1, 1, 1),
      () => new THREE.IcosahedronGeometry(0.65, 0),
      () => new THREE.OctahedronGeometry(0.65, 0),
      () => new THREE.TetrahedronGeometry(0.65, 0),
      () => new THREE.SphereGeometry(0.55, 8, 6),
      () => new THREE.TorusGeometry(0.45, 0.12, 6, 12),
      () => new THREE.DodecahedronGeometry(0.55, 0),
      () => new THREE.CylinderGeometry(0.3, 0.3, 1, 6),
    ];

    const shapeColors = [CYAN, BLUE, PURPLE, INDIGO, TEAL];

    const isMobile = window.innerWidth < 768;
    const shapeCount = isMobile ? 20 : 56;

    for (let i = 0; i < shapeCount; i++) {
      const depth = Math.random();
      const col = shapeColors[Math.floor(Math.random() * shapeColors.length)];
      const scale = 0.55 + Math.random() * 1.55;
      const opacity = 0.045 + (1 - depth) * 0.13;

      let mesh: THREE.Object3D;

      // ~15% chance to create a flat triangle wireframe instead of 3D edge shape
      if (Math.random() < 0.15) {
        const triGeo = createTriangle(0.8 + Math.random() * 0.6);
        const triMat = new THREE.LineBasicMaterial({
          color: col,
          transparent: true,
          opacity,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        mesh = new THREE.Line(triGeo, triMat);
        mesh.scale.setScalar(scale);
      } else {
        const geo = geometries[Math.floor(Math.random() * geometries.length)]();
        mesh = createWireframe(
          geo,
          new THREE.Vector3(0, 0, 0),
          col,
          opacity,
          scale
        );
      }

      mesh.position.set(
        randomSignedSpread(sceneBounds.width * 0.5, 0.35),
        randomSignedSpread(sceneBounds.height * 0.5, 0.15),
        -8 - depth * sceneBounds.depth
      );

      scene.add(mesh);

      shapes.push({
        mesh,
        drift: new THREE.Vector3(
          (Math.random() - 0.5) * 0.006,
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.003
        ),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.002
        ),
        depth,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // ══════════════════════════════════════════════════════════════
    //  3. CIRCUIT NODES & CONNECTIONS
    // ══════════════════════════════════════════════════════════════
    const nodeCount = isMobile ? 40 : 110;
    const nodePositions: THREE.Vector3[] = [];
    const nodeGroup = new THREE.Group();
    const nodeDots: THREE.Mesh[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const pos = new THREE.Vector3(
        randomSignedSpread(sceneBounds.width * 0.56, 0.2),
        randomSignedSpread(sceneBounds.height * 0.6, 0.1),
        -10 - Math.random() * sceneBounds.depth
      );
      nodePositions.push(pos);

      const dotGeo = new THREE.SphereGeometry(0.07, 5, 5);
      const dotMat = new THREE.MeshBasicMaterial({
        color: CYAN,
        transparent: true,
        opacity: 0.38,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      nodeGroup.add(dot);
      nodeDots.push(dot);
    }

    // Connect nearby nodes with circuit-like lines
    const maxDist = 16;
    for (let i = 0; i < nodeCount; i++) {
      let connections = 0;
      for (let j = i + 1; j < nodeCount; j++) {
        if (connections >= 3) break; // max 3 connections per node
        const d = nodePositions[i].distanceTo(nodePositions[j]);
        if (d < maxDist) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([
            nodePositions[i],
            nodePositions[j],
          ]);
          const opacity = 0.028 + 0.075 * (1 - d / maxDist);
          const lineMat = new THREE.LineBasicMaterial({
            color: SLATE_LINE,
            transparent: true,
            opacity,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          });
          const line = new THREE.Line(lineGeo, lineMat);
          nodeGroup.add(line);
          connections++;
        }
      }
    }
    scene.add(nodeGroup);

    // ══════════════════════════════════════════════════════════════
    //  4. PULSING DATA STREAMS — thin vertical/horizontal lines
    // ══════════════════════════════════════════════════════════════
    interface DataStream {
      line: THREE.Line;
      speed: number;
      axis: 'x' | 'y' | 'z';
      range: number;
    }
    const dataStreams: DataStream[] = [];

    for (let i = 0; i < 16; i++) {
      const axis = (['x', 'y', 'z'] as const)[Math.floor(Math.random() * 3)];
      const len = 3 + Math.random() * 8;
      const pts: THREE.Vector3[] = [];
      const segments = 20;
      for (let s = 0; s <= segments; s++) {
        const t = (s / segments - 0.5) * len;
        const v = new THREE.Vector3(
          axis === 'x' ? t : (Math.random() - 0.5) * 0.05,
          axis === 'y' ? t : (Math.random() - 0.5) * 0.05,
          axis === 'z' ? t : (Math.random() - 0.5) * 0.05
        );
        pts.push(v);
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({
        color: TEAL,
        transparent: true,
        opacity: 0.09,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(geo, mat);
      line.position.set(
        randomSignedSpread(sceneBounds.width * 0.48, 0.25),
        randomSignedSpread(sceneBounds.height * 0.45, 0.12),
        -12 - Math.random() * (sceneBounds.depth - 12)
      );
      scene.add(line);
      dataStreams.push({
        line,
        speed: 0.002 + Math.random() * 0.004,
        axis,
        range: 30 + Math.random() * 20,
      });
    }

    // ══════════════════════════════════════════════════════════════
    //  5. MOUSE TRACKING — physics-based inertia / easing
    // ══════════════════════════════════════════════════════════════
    const mouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    const SPRING = 0.015; // spring stiffness
    const DAMPING = 0.88; // velocity damping for smooth deceleration

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Store originals for parallax
    const shapeOrigins = shapes.map((s) => s.mesh.position.clone());

    // ══════════════════════════════════════════════════════════════
    //  6. ANIMATION LOOP — 60fps, GPU-accelerated
    // ══════════════════════════════════════════════════════════════
    let frameId = 0;
    let time = 0;
    const clock = new THREE.Clock();

    let isPaused = false;
    const onVisibilityChange = () => {
      isPaused = document.hidden;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (isPaused) return;

      const delta = clock.getDelta();
      time += delta;

      // ── Physics-based mouse smoothing (spring + damping) ──
      const dx = mouse.x - smoothMouse.x;
      const dy = mouse.y - smoothMouse.y;
      velocity.x += dx * SPRING;
      velocity.y += dy * SPRING;
      velocity.x *= DAMPING;
      velocity.y *= DAMPING;
      smoothMouse.x += velocity.x;
      smoothMouse.y += velocity.y;

      // ── Grid parallax tilt — camera-rotation illusion ──
      gridGroup.rotation.x = -0.15 + smoothMouse.y * 0.06;
      gridGroup.rotation.y = smoothMouse.x * 0.075;

      // Ceiling mirror
      ceilGrid.rotation.x = 0.15 - smoothMouse.y * 0.04;
      ceilGrid.rotation.y = smoothMouse.x * 0.06;

      // ── Node group slow parallax ──
      nodeGroup.rotation.y = smoothMouse.x * 0.035;
      nodeGroup.rotation.x = smoothMouse.y * 0.025;

      // ── Pulse some node dots ──
      for (let i = 0; i < nodeDots.length; i++) {
        const dot = nodeDots[i];
        const mat = dot.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.18 + 0.24 * Math.sin(time * 1.5 + i * 0.4);
      }

      // ── Shapes: drift, rotate, parallax, pulse ──
      for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i];
        const origin = shapeOrigins[i];

        // Slow drift
        origin.x += s.drift.x;
        origin.y += s.drift.y;
        origin.z += s.drift.z;

        // Wrap bounds
        const halfWidth = sceneBounds.width / 2;
        const halfHeight = sceneBounds.height / 2;
        if (origin.x > halfWidth) origin.x = -halfWidth;
        if (origin.x < -halfWidth) origin.x = halfWidth;
        if (origin.y > halfHeight) origin.y = -halfHeight;
        if (origin.y < -halfHeight) origin.y = halfHeight;

        // Parallax: closer shapes shift more
        const parallaxStrength = 2.0 + (1 - s.depth) * 5.0;
        s.mesh.position.x = origin.x + smoothMouse.x * parallaxStrength;
        s.mesh.position.y = origin.y + smoothMouse.y * parallaxStrength * 0.5;
        s.mesh.position.z = origin.z;

        // Rotate
        s.mesh.rotation.x += s.rotSpeed.x;
        s.mesh.rotation.y += s.rotSpeed.y;
        s.mesh.rotation.z += s.rotSpeed.z;

        // Subtle opacity pulse
        s.mesh.traverse((child) => {
          if (
            child instanceof THREE.LineSegments ||
            child instanceof THREE.Line
          ) {
            const mat = child.material as THREE.LineBasicMaterial;
            const base = 0.05 + (1 - s.depth) * 0.12;
            mat.opacity = base + 0.028 * Math.sin(time * 0.8 + s.pulse);
          }
        });
      }

      // ── Data streams subtle movement ──
      for (const ds of dataStreams) {
        const pos = ds.line.position;
        if (ds.axis === 'x') pos.x += ds.speed;
        else if (ds.axis === 'y') pos.y += ds.speed;
        else pos.z += ds.speed;

        // Wrap
        if (pos.x > ds.range) pos.x = -ds.range;
        if (pos.y > ds.range) pos.y = -ds.range;
        if (pos.z > ds.range) pos.z = -ds.range;
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize handler ──
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      scene.traverse((child) => {
        if (child instanceof THREE.Line || child instanceof THREE.LineSegments || child instanceof THREE.Mesh) {
          child.geometry.dispose();
        }

        const material = child instanceof THREE.Line || child instanceof THREE.LineSegments || child instanceof THREE.Mesh
          ? child.material
          : null;

        if (Array.isArray(material)) {
          material.forEach((entry) => entry.dispose());
        } else {
          material?.dispose();
        }
      });
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      {/* Three.js canvas */}
      <div
        ref={containerRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {/* Dark readability overlay — radial gradient for subtle vignette */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(10,15,30,0.45) 0%, rgba(2,6,23,0.78) 100%)',
        }}
      />
    </>
  );
}
