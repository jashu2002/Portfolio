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

  // Mouse & Touch Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  function updatePointer(clientX, clientY) {
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    mouseX = (clientX - windowHalfX) * 0.0006;
    mouseY = (clientY - windowHalfY) * 0.0006;
  }

  window.addEventListener('mousemove', (e) => {
    updatePointer(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 0) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
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
    const elapsedTime = clock.getElapsedTime();

    // Autonomous gentle orbital breathing motion (ensures mobile is always alive & animated)
    const autoFloatX = Math.sin(elapsedTime * 0.7) * 0.4;
    const autoFloatY = Math.cos(elapsedTime * 0.5) * 0.3;

    // Smooth camera tilt towards mouse/touch + auto-float
    targetX += (mouseX - targetX) * 0.06;
    targetY += (mouseY - targetY) * 0.06;

    camera.position.x = (targetX * 4) + autoFloatX;
    camera.position.y = (-targetY * 4) + autoFloatY;
    camera.lookAt(scene.position);

    // Rotations & dynamic energy pulse
    coreMesh.rotation.y += delta * 0.22;
    coreMesh.rotation.x += delta * 0.12;

    wireMesh.rotation.y += delta * 0.22;
    wireMesh.rotation.x += delta * 0.12;

    ring1.rotation.z += delta * 0.38;
    ring1.rotation.y += delta * 0.16;

    ring2.rotation.z -= delta * 0.28;
    ring2.rotation.x -= delta * 0.22;

    particleSystem.rotation.y += delta * 0.09;
    particleSystem.rotation.z += delta * 0.04;

    // Subtle breathing light intensity
    cyanLight.intensity = 48 + Math.sin(elapsedTime * 1.5) * 8;
    violetLight.intensity = 38 + Math.cos(elapsedTime * 1.5) * 6;

    renderer.render(scene, camera);
  }

  animate();
}
