/**
 * Real-time 3D WebGL Autonomous Agent Core using Three.js
 * Interactive polyhedral sphere, orbital rings, and dynamic particle cloud.
 */

import * as THREE from 'three';

export function init3DCanvas(canvasId = 'hero-canvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 28;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  // 1. Central Core: Inner Icosahedron
  const coreGeo = new THREE.IcosahedronGeometry(4.8, 2);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x050510,
    metalness: 0.9,
    roughness: 0.15,
    wireframe: false
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  scene.add(coreMesh);

  // Wireframe Core Overlay
  const wireGeo = new THREE.IcosahedronGeometry(4.85, 2);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x00F0FF,
    wireframe: true,
    transparent: true,
    opacity: 0.4
  });
  const wireMesh = new THREE.Mesh(wireGeo, wireMat);
  scene.add(wireMesh);

  // 2. Gyro Orbital Rings
  const ringGeo1 = new THREE.TorusGeometry(7.2, 0.08, 16, 100);
  const ringMat1 = new THREE.MeshStandardMaterial({
    color: 0x00F0FF,
    emissive: 0x007799,
    roughness: 0.2,
    metalness: 0.8
  });
  const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
  ring1.rotation.x = Math.PI / 3;
  scene.add(ring1);

  const ringGeo2 = new THREE.TorusGeometry(8.4, 0.06, 16, 100);
  const ringMat2 = new THREE.MeshStandardMaterial({
    color: 0xA855F7,
    emissive: 0x662299,
    roughness: 0.2,
    metalness: 0.8
  });
  const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  ring2.rotation.y = Math.PI / 4;
  scene.add(ring2);

  // 3. Swarm Nodes (Particle Cloud)
  const particleCount = 280;
  const particlesGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const cyan = new THREE.Color(0x00F0FF);
  const violet = new THREE.Color(0xA855F7);

  for (let i = 0; i < particleCount * 3; i += 3) {
    const radius = 8.5 + Math.random() * 4.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    positions[i] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = radius * Math.cos(phi);

    const lerped = Math.random() > 0.5 ? cyan : violet;
    colors[i] = lerped.r;
    colors[i + 1] = lerped.g;
    colors[i + 2] = lerped.b;
  }

  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMat = new THREE.PointsMaterial({
    size: 0.25,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particleSystem);

  // 4. Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const cyanLight = new THREE.PointLight(0x00F0FF, 50, 40);
  cyanLight.position.set(12, 10, 15);
  scene.add(cyanLight);

  const violetLight = new THREE.PointLight(0xA855F7, 40, 40);
  violetLight.position.set(-12, -10, 10);
  scene.add(violetLight);

  // Mouse Parallax Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    mouseX = (e.clientX - windowHalfX) * 0.0006;
    mouseY = (e.clientY - windowHalfY) * 0.0006;
  }, { passive: true });

  // Resize handler
  function onResize() {
    if (!canvas) return;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }
  window.addEventListener('resize', onResize, { passive: true });

  // IntersectionObserver to pause rendering when off-screen
  let isVisible = true;
  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.05 });
  observer.observe(canvas);

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const delta = clock.getDelta();

    // Smooth camera tilt towards mouse
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    camera.position.x = targetX * 4;
    camera.position.y = -targetY * 4;
    camera.lookAt(scene.position);

    // Rotations
    coreMesh.rotation.y += delta * 0.2;
    coreMesh.rotation.x += delta * 0.1;

    wireMesh.rotation.y += delta * 0.2;
    wireMesh.rotation.x += delta * 0.1;

    ring1.rotation.z += delta * 0.35;
    ring1.rotation.y += delta * 0.15;

    ring2.rotation.z -= delta * 0.25;
    ring2.rotation.x -= delta * 0.2;

    particleSystem.rotation.y += delta * 0.08;

    renderer.render(scene, camera);
  }

  animate();
}
