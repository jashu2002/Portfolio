/**
 * CINEMATIC INTRO ENGINE - 4-PHASE PHOTOREALISTIC IMMERSIVE SEQUENCE
 * 
 * Powered by:
 * - High-Resolution Photorealistic Cosmic Traveler (Generated via Nano Banana / Imagen)
 * - 60 FPS HTML5 Canvas Compositor with Cinematic 3D Dolly Zoom & Nebula Particles
 * - Phase 1: Bio-Digital ECG Heartbeat Pulse (0.0s - 1.15s)
 * - Phase 2 & 3: Photorealistic Cosmic Singularity & Walking Traveler (1.15s - 4.35s)
 * - Phase 4: Supernova "Boom!" Shockwave Flash & Reveal (4.35s - 4.85s)
 * 
 * Accessibility:
 * - Instant Skip via ESC or [SKIP INTRO] button
 * - Prefers-reduced-motion compliance
 * - Zero residual memory / CPU usage after completion
 */

import cosmicWalkerUrl from '../assets/cosmic_walker_intro.jpg';
import { sound } from './audio.js';

class CinematicIntroEngine {
  constructor() {
    this.overlay = null;
    this.canvas = null;
    this.ctx = null;
    this.flashEl = null;
    this.telemetryEl = null;
    this.progressBarEl = null;
    this.skipBtn = null;
    
    this.rafId = null;
    this.startTime = null;
    this.duration = 4.85; // Master duration in seconds
    this.isCompleted = false;
    this.isSkipped = false;
    
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    // Preload Photorealistic Cosmic Traveler Image
    this.cosmicImg = new Image();
    this.cosmicImg.src = cosmicWalkerUrl;
    this.isImgLoaded = false;
    this.cosmicImg.onload = () => {
      this.isImgLoaded = true;
    };

    // Stardust & Swirl Particles
    this.vortexStars = [];
    this.starCount = 750;
    
    // Shockwave particles for Phase 4
    this.shockwaveParticles = [];
    
    // Bindings
    this.handleResize = this.handleResize.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.skip = this.skip.bind(this);
    this.renderFrame = this.renderFrame.bind(this);
  }

  init() {
    // Respect user motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.cleanup(true);
      return;
    }

    this.createDOM();
    this.initVortexStars();
    this.bindEvents();

    // Start render loop
    this.startTime = performance.now();
    this.rafId = requestAnimationFrame(this.renderFrame);

    // Subtle audio cues if unmuted
    try {
      if (sound && !sound.isMuted) {
        setTimeout(() => sound.playHover(), 280);
        setTimeout(() => sound.playHover(), 820);
      }
    } catch (e) {}
  }

  createDOM() {
    const existing = document.getElementById('cinematic-intro-overlay');
    if (existing) existing.remove();

    this.overlay = document.createElement('div');
    this.overlay.id = 'cinematic-intro-overlay';
    this.overlay.className = 'cinematic-intro-overlay';
    this.overlay.setAttribute('role', 'dialog');
    this.overlay.setAttribute('aria-label', 'System Boot Sequence');

    this.overlay.innerHTML = `
      <canvas id="intro-canvas" class="intro-canvas"></canvas>
      <div id="intro-flash" class="intro-flash"></div>
      
      <!-- HUD Telemetry Interface -->
      <div class="intro-hud" aria-hidden="true">
        <div class="hud-top-left">
          <div class="hud-brand-tag">SYS_INITIALIZE // BIO-DIGITAL ARCHITECTURE</div>
          <div class="hud-sub-tag">ENGINEER: JASHWANTH RAJ · SDE-1</div>
        </div>

        <div class="hud-top-right">
          <button id="btn-skip-intro" class="intro-skip-btn" aria-label="Skip Introductory Sequence">
            <span>SKIP INTRO</span>
            <kbd class="skip-kbd">ESC ⇥</kbd>
          </button>
        </div>

        <div class="hud-bottom-left">
          <div id="intro-telemetry-status" class="hud-status-text">
            <span class="hud-status-dot"></span>
            <span id="intro-status-label">[01/04] VITAL_SIGNAL // SYNCHRONIZING ECG PULSE</span>
          </div>
        </div>

        <div class="hud-bottom-right">
          <div class="intro-progress-track">
            <div id="intro-progress-fill" class="intro-progress-fill"></div>
          </div>
        </div>
      </div>
    `;

    document.body.prepend(this.overlay);

    this.canvas = document.getElementById('intro-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.flashEl = document.getElementById('intro-flash');
    this.telemetryEl = document.getElementById('intro-status-label');
    this.progressBarEl = document.getElementById('intro-progress-fill');
    this.skipBtn = document.getElementById('btn-skip-intro');

    this.updateDimensions();
  }

  updateDimensions() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  handleResize() {
    if (this.isCompleted) return;
    this.updateDimensions();
  }

  bindEvents() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('keydown', this.handleKeyDown);
    if (this.skipBtn) {
      this.skipBtn.addEventListener('click', this.skip);
    }
  }

  handleKeyDown(e) {
    if (e.key === 'Escape' || e.code === 'Space') {
      e.preventDefault();
      this.skip();
    }
  }

  initVortexStars() {
    this.vortexStars = [];
    const maxRadius = Math.max(this.width, this.height) * 0.85;

    for (let i = 0; i < this.starCount; i++) {
      const radius = 30 + Math.pow(Math.random(), 1.4) * maxRadius;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.8 + Math.random() * 1.5;
      
      const colorSeed = Math.random();
      let color = '#FFFFFF';
      if (colorSeed < 0.45) color = '#00F0FF'; // Cyan
      else if (colorSeed < 0.8) color = '#A855F7'; // Violet
      else if (colorSeed < 0.92) color = '#4FACFE'; // Electric Blue

      this.vortexStars.push({
        baseR: radius,
        r: radius,
        angle: angle,
        speed: speed,
        size: 0.8 + Math.random() * 2.2,
        color: color,
        alpha: 0.3 + Math.random() * 0.7
      });
    }
  }

  skip() {
    if (this.isSkipped || this.isCompleted) return;
    this.isSkipped = true;

    try {
      if (sound && !sound.isMuted) sound.playClick();
    } catch (e) {}

    if (this.flashEl) {
      this.flashEl.style.opacity = '1';
      this.flashEl.style.transition = 'none';
      setTimeout(() => {
        this.flashEl.style.transition = 'opacity 0.35s ease-out';
        this.flashEl.style.opacity = '0';
        this.cleanup();
      }, 50);
    } else {
      this.cleanup();
    }
  }

  renderFrame(timestamp) {
    if (this.isCompleted) return;

    const elapsed = (timestamp - this.startTime) / 1000;
    const progress = Math.min(elapsed / this.duration, 1);

    // Update progress bar
    if (this.progressBarEl) {
      this.progressBarEl.style.width = `${(progress * 100).toFixed(1)}%`;
    }

    // Clear canvas
    this.ctx.fillStyle = '#050507';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Phase Timeline Progression
    if (elapsed < 1.15) {
      // Phase 1: Bio-Digital ECG Heartbeat Pulse
      this.renderPhase1_ECG(elapsed);
      this.updateStatus('[01/04] VITAL_SIGNAL // SYNCHRONIZING ECG PULSE');
    } else if (elapsed < 4.35) {
      // Phase 2 & 3: Photorealistic Cosmic Singularity & Walking Traveler (Cinematic Dolly Zoom)
      this.renderPhase2And3_CosmicTraveler(elapsed);
      if (elapsed < 2.5) {
        this.updateStatus('[02/04] COSMIC_VORTEX // MILKY WAY SINGULARITY');
      } else {
        this.updateStatus('[03/04] AVATAR_CONVERGENCE // JASHWANTH RAJ');
      }
    } else if (elapsed < this.duration) {
      // Phase 4: Supernova "Boom!" Shockwave Flash
      this.renderPhase4_SupernovaBoom(elapsed);
      this.updateStatus('[04/04] SUPERNOVA_BREACH // SYSTEM ONLINE');
    } else {
      this.cleanup();
      return;
    }

    this.rafId = requestAnimationFrame(this.renderFrame);
  }

  updateStatus(text) {
    if (this.telemetryEl && this.telemetryEl.textContent !== text) {
      this.telemetryEl.textContent = text;
    }
  }

  /* =========================================================================
     PHASE 1: BIO-DIGITAL ECG HEARTBEAT PULSE (0.0s - 1.15s)
     ========================================================================= */
  renderPhase1_ECG(t) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const midY = h * 0.5;

    // Faint oscilloscope grid lines
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridSize = 48;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.restore();

    // ECG sweep progress
    const sweepProgress = Math.min(t / 1.1, 1);
    const leadX = sweepProgress * (w + 40);

    const getECGHeight = (x) => {
      const normX = x / w;
      let dy = 0;

      // Pulse 1 at 35% screen width
      const beat1 = (normX - 0.35) * 24;
      if (Math.abs(beat1) < 4) {
        dy -= 15 * Math.exp(-Math.pow(beat1 + 2.0, 2) * 1.5);
        dy += 18 * Math.exp(-Math.pow(beat1 + 0.6, 2) * 8.0);
        dy -= 135 * Math.exp(-Math.pow(beat1, 2) * 12.0); // Major R-peak
        dy += 38 * Math.exp(-Math.pow(beat1 - 0.6, 2) * 9.0);
        dy -= 28 * Math.exp(-Math.pow(beat1 - 1.8, 2) * 1.2);
      }

      // Pulse 2 at 70% screen width
      const beat2 = (normX - 0.70) * 24;
      if (Math.abs(beat2) < 4) {
        dy -= 16 * Math.exp(-Math.pow(beat2 + 2.0, 2) * 1.5);
        dy += 22 * Math.exp(-Math.pow(beat2 + 0.6, 2) * 8.0);
        dy -= 150 * Math.exp(-Math.pow(beat2, 2) * 14.0); // Sharper electric peak
        dy += 42 * Math.exp(-Math.pow(beat2 - 0.6, 2) * 10.0);
        dy -= 32 * Math.exp(-Math.pow(beat2 - 1.8, 2) * 1.2);
      }

      dy += Math.sin(x * 0.08) * 1.2;
      return midY + dy;
    };

    // Draw ECG Path
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, midY);
    for (let x = 0; x <= leadX; x += 4) {
      ctx.lineTo(x, getECGHeight(x));
    }

    // Outer glow
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.lineWidth = 7;
    ctx.shadowColor = '#00F0FF';
    ctx.shadowBlur = 18;
    ctx.stroke();

    // Violet secondary rim
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.45)';
    ctx.lineWidth = 3.5;
    ctx.shadowBlur = 10;
    ctx.stroke();

    // White core beam
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 4;
    ctx.stroke();
    ctx.restore();

    // Lead Flare Dot
    if (leadX <= w) {
      const leadY = getECGHeight(leadX);
      ctx.save();
      const radGrad = ctx.createRadialGradient(leadX, leadY, 0, leadX, leadY, 30);
      radGrad.addColorStop(0, '#FFFFFF');
      radGrad.addColorStop(0.3, 'rgba(0, 240, 255, 0.85)');
      radGrad.addColorStop(0.7, 'rgba(168, 85, 247, 0.35)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(leadX, leadY, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /* =========================================================================
     PHASE 2 & 3: PHOTOREALISTIC COSMIC TRAVELER & 3D DOLLY ZOOM (1.15s - 4.35s)
     ========================================================================= */
  renderPhase2And3_CosmicTraveler(t) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const cx = w * 0.5;
    const cy = h * 0.5;

    // Time normalized for this phase: 0 to 1 over 3.2 seconds
    const phaseProgress = (t - 1.15) / 3.2;

    // Ease-in-out camera dolly zoom curve (from distant portal to commanding close-up)
    const zoomScale = 0.55 + Math.pow(phaseProgress, 1.8) * 0.95; // 0.55x to 1.50x
    const portalAlpha = Math.min(phaseProgress * 4.0, 1.0);

    // 1. Render Photorealistic Image if loaded
    if (this.isImgLoaded && this.cosmicImg) {
      ctx.save();

      // Circular/organic cosmic portal mask during entry (1.15s to 2.0s)
      if (phaseProgress < 0.28) {
        const maskProgress = phaseProgress / 0.28;
        const maxDiagonal = Math.sqrt(w * w + h * h) * 0.6;
        const maskRadius = maskProgress * maxDiagonal;

        ctx.beginPath();
        ctx.arc(cx, cy, maskRadius, 0, Math.PI * 2);
        ctx.clip();
      }

      // Compute aspect-ratio cover dimensions with cinematic zoom
      const imgW = this.cosmicImg.naturalWidth || 1920;
      const imgH = this.cosmicImg.naturalHeight || 1080;
      const screenAspect = w / h;
      const imgAspect = imgW / imgH;

      let drawW, drawH;
      if (screenAspect > imgAspect) {
        drawW = w * zoomScale;
        drawH = (w / imgAspect) * zoomScale;
      } else {
        drawH = h * zoomScale;
        drawW = (h * imgAspect) * zoomScale;
      }

      // Slight vertical pan to track the walking engineer's eyes & stride
      const panY = (phaseProgress - 0.5) * 35;
      const drawX = cx - drawW * 0.5;
      const drawY = cy - drawH * 0.5 + panY;

      ctx.globalAlpha = portalAlpha;
      ctx.drawImage(this.cosmicImg, drawX, drawY, drawW, drawH);

      // Vignette & Obsidian Border Blending
      const vignette = ctx.createRadialGradient(cx, cy, Math.min(w, h) * 0.35 * zoomScale, cx, cy, Math.max(w, h) * 0.7);
      vignette.addColorStop(0, 'rgba(5, 5, 7, 0)');
      vignette.addColorStop(0.7, 'rgba(5, 5, 7, 0.4)');
      vignette.addColorStop(1, 'rgba(5, 5, 7, 0.95)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      ctx.restore();
    }

    // 2. Dynamic Real-Time Stardust Particles Swirling Around the Portal
    ctx.save();
    ctx.translate(cx, cy);
    const rotationSpeed = (t - 1.15) * 1.8 + Math.pow(phaseProgress, 2) * 2.2;
    const warpIntensity = Math.max(0, (phaseProgress - 0.65) / 0.35); // Activates in last 35% of phase

    for (let i = 0; i < this.vortexStars.length; i++) {
      const star = this.vortexStars[i];
      const curTheta = star.angle + rotationSpeed * star.speed;
      const curR = star.baseR * (zoomScale * 0.9);

      const sx = Math.cos(curTheta) * curR;
      const sy = Math.sin(curTheta) * (curR * 0.85); // Elliptical perspective

      // Skip if off-screen
      if (Math.abs(sx) > w * 0.85 || Math.abs(sy) > h * 0.85) continue;

      ctx.fillStyle = star.color;
      ctx.globalAlpha = star.alpha * portalAlpha;

      if (warpIntensity > 0.1 && curR > 40) {
        // Hyperspace relativistic warp streak
        const streakLen = Math.min(curR * 0.12 * warpIntensity, 55);
        const streakAngle = Math.atan2(sy, sx);
        const tailX = sx - Math.cos(streakAngle) * streakLen;
        const tailY = sy - Math.sin(streakAngle) * streakLen;

        ctx.strokeStyle = star.color;
        ctx.lineWidth = Math.min(star.size * 1.4, 3);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    // 3. Volumetric Portal Breathing Glow
    ctx.save();
    const portalPulse = Math.sin(t * 6) * 0.1 + 0.9;
    const portalGlowRad = Math.min(w, h) * 0.42 * zoomScale * portalPulse;
    const portalGlow = ctx.createRadialGradient(cx, cy, portalGlowRad * 0.6, cx, cy, portalGlowRad);
    portalGlow.addColorStop(0, 'rgba(0, 240, 255, 0)');
    portalGlow.addColorStop(0.5, `rgba(0, 240, 255, ${0.18 * portalAlpha})`);
    portalGlow.addColorStop(0.85, `rgba(168, 85, 247, ${0.22 * portalAlpha})`);
    portalGlow.addColorStop(1, 'rgba(5, 5, 7, 0)');
    ctx.fillStyle = portalGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, portalGlowRad, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  /* =========================================================================
     PHASE 4: SUPERNOVA "BOOM!" SHOCKWAVE FLASH & REVEAL (4.35s - 4.85s)
     ========================================================================= */
  renderPhase4_SupernovaBoom(t) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const cx = w * 0.5;
    const cy = h * 0.5;

    const p4 = (t - 4.35) / 0.5; // 0 to 1 over 500ms

    // Initialize supersonic shockwave particles on first frame
    if (this.shockwaveParticles.length === 0) {
      for (let i = 0; i < 300; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 450 + Math.random() * 1100;
        const color = Math.random() < 0.5 ? '#00F0FF' : (Math.random() < 0.8 ? '#A855F7' : '#FFFFFF');
        this.shockwaveParticles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.5 + Math.random() * 3.5,
          color: color
        });
      }

      // Trigger whiteout supernova flash
      if (this.flashEl) {
        this.flashEl.style.opacity = '1';
        this.flashEl.style.transition = 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
        requestAnimationFrame(() => {
          this.flashEl.style.opacity = '0';
        });
      }

      // Screen micro-shake
      if (this.overlay) {
        this.overlay.classList.add('intro-shake');
        setTimeout(() => this.overlay.classList.remove('intro-shake'), 180);
      }
    }

    // Expanding Supersonic Shockwave Rings
    const maxRadius = Math.max(w, h) * 1.25;
    const shockRadius1 = p4 * maxRadius * 1.15;
    const shockRadius2 = Math.max(0, (p4 - 0.12) * maxRadius * 0.98);

    // Shockwave Ring 1 (Cyan Primary)
    ctx.save();
    ctx.lineWidth = 16 * (1 - p4);
    ctx.strokeStyle = `rgba(0, 240, 255, ${Math.max(0, 1 - p4 * 1.2)})`;
    ctx.shadowColor = '#00F0FF';
    ctx.shadowBlur = 35;
    ctx.beginPath();
    ctx.arc(cx, cy, shockRadius1, 0, Math.PI * 2);
    ctx.stroke();

    // Shockwave Ring 2 (Violet Second Harmonic)
    if (shockRadius2 > 0) {
      ctx.lineWidth = 9 * (1 - p4);
      ctx.strokeStyle = `rgba(168, 85, 247, ${Math.max(0, 1 - p4)})`;
      ctx.shadowColor = '#A855F7';
      ctx.shadowBlur = 25;
      ctx.beginPath();
      ctx.arc(cx, cy, shockRadius2, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // Radial Blast Particles
    ctx.save();
    for (let p of this.shockwaveParticles) {
      const dt = 0.016;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.96;
      p.vy *= 0.96;

      const particleAlpha = Math.max(0, (1 - p4) * 1.3);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = particleAlpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Dissolving Supernova Singularity Core
    const coreAlpha = Math.max(0, 1 - p4 * 1.8);
    if (coreAlpha > 0) {
      ctx.save();
      const superGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200 * (1 + p4 * 2));
      superGlow.addColorStop(0, `rgba(255, 255, 255, ${coreAlpha})`);
      superGlow.addColorStop(0.3, `rgba(0, 240, 255, ${coreAlpha * 0.8})`);
      superGlow.addColorStop(0.7, `rgba(168, 85, 247, ${coreAlpha * 0.4})`);
      superGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = superGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 200 * (1 + p4 * 2), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Begin graceful dissolve of intro overlay so website illuminates smoothly underneath
    if (p4 > 0.65 && this.overlay) {
      this.overlay.style.opacity = `${Math.max(0, (1 - p4) / 0.35)}`;
      this.overlay.style.transform = `scale(${1 + (p4 - 0.65) * 0.08})`;
    }
  }

  /* =========================================================================
     CLEANUP & REVEAL
     ========================================================================= */
  cleanup(immediate = false) {
    if (this.isCompleted) return;
    this.isCompleted = true;

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('keydown', this.handleKeyDown);

    try {
      sessionStorage.setItem('portfolio_intro_experienced', 'true');
    } catch (e) {}

    window.dispatchEvent(new CustomEvent('cinematic-intro-complete'));

    if (immediate) {
      if (this.overlay) this.overlay.remove();
      return;
    }

    if (this.overlay) {
      this.overlay.style.transition = 'opacity 0.45s ease-out, transform 0.45s ease-out';
      this.overlay.style.opacity = '0';
      this.overlay.style.transform = 'scale(1.04)';
      this.overlay.style.pointerEvents = 'none';

      setTimeout(() => {
        if (this.overlay) {
          this.overlay.remove();
          this.overlay = null;
        }
      }, 500);
    }
  }
}

// Singleton Controller
let introEngine = null;

export function initCinematicIntro(force = false) {
  if (introEngine && !introEngine.isCompleted) return;

  const urlParams = new URLSearchParams(window.location.search);
  const shouldForce = force || urlParams.has('replay');

  introEngine = new CinematicIntroEngine();
  introEngine.init();
}

export function replayCinematicIntro() {
  if (introEngine) {
    introEngine.cleanup(true);
  }
  initCinematicIntro(true);
}
