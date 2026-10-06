/**
 * CINEMATIC INTRO ENGINE - 4-PHASE IMMERSIVE BOOT SEQUENCE
 * 
 * Phase 1: Bio-Digital ECG Heartbeat Pulse (0.0s - 1.25s)
 * Phase 2: Cosmic Milky Way Galaxy Vortex (1.25s - 3.2s)
 * Phase 3: Walking Silhouette Convergence (2.5s - 4.3s)
 * Phase 4: Supernova "Boom!" Shockwave Flash & Reveal (4.3s - 4.9s)
 * 
 * Engineered with 60FPS HTML5 Canvas, procedural Web Audio cues,
 * responsive retina scaling, and instant skip accessibility.
 */

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
    this.duration = 4.85; // Total duration in seconds
    this.isCompleted = false;
    this.isSkipped = false;
    
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    // Galaxy Particles
    this.galaxyStars = [];
    this.starCount = 1400;
    
    // Shockwave particles for Phase 4
    this.shockwaveParticles = [];
    
    // Walking figure state
    this.walkCycle = 0;
    
    // Resize binding
    this.handleResize = this.handleResize.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.skip = this.skip.bind(this);
    this.renderFrame = this.renderFrame.bind(this);
  }

  init() {
    // Check if reduced motion is requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.cleanup(true);
      return;
    }

    this.createDOM();
    this.initStars();
    this.bindEvents();

    // Start render loop
    this.startTime = performance.now();
    this.rafId = requestAnimationFrame(this.renderFrame);

    // Subtle audio cue if available
    try {
      if (sound && !sound.isMuted) {
        setTimeout(() => sound.playHover(), 300);
        setTimeout(() => sound.playHover(), 850);
      }
    } catch (e) {}
  }

  createDOM() {
    // Clean up any existing overlay
    const existing = document.getElementById('cinematic-intro-overlay');
    if (existing) existing.remove();

    // Create main overlay
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

    // Cache element references
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

  initStars() {
    this.galaxyStars = [];
    const arms = 3;
    const armSeparation = (Math.PI * 2) / arms;
    const maxRadius = Math.max(this.width, this.height) * 0.9;

    for (let i = 0; i < this.starCount; i++) {
      // Galactic core vs spiral arms distribution
      const isCore = Math.random() < 0.22;
      let r, theta, color, size;

      if (isCore) {
        // High-density core
        r = Math.random() * (maxRadius * 0.16);
        theta = Math.random() * Math.PI * 2;
        color = Math.random() < 0.5 ? '#ffffff' : '#00F0FF';
        size = 0.8 + Math.random() * 2.2;
      } else {
        // Logarithmic spiral arms
        const armIndex = Math.floor(Math.random() * arms);
        const distanceT = Math.pow(Math.random(), 1.6);
        r = (maxRadius * 0.12) + distanceT * maxRadius;
        
        // Spiral formula: theta = armOffset + b * log(r) + random dispersion
        const spiralAngle = 2.8 * Math.log(r / 20);
        const spread = (Math.random() - 0.5) * (0.35 + (r / maxRadius) * 0.55);
        theta = (armIndex * armSeparation) + spiralAngle + spread;

        // Brand colors: Cyan, Violet, Electric Blue, White
        const colorSeed = Math.random();
        if (colorSeed < 0.40) {
          color = '#00F0FF'; // Cyan Primary
        } else if (colorSeed < 0.70) {
          color = '#A855F7'; // Violet Primary
        } else if (colorSeed < 0.88) {
          color = '#4FACFE'; // Electric Blue
        } else {
          color = '#FFFFFF'; // Starlight White
        }

        size = 0.6 + Math.random() * 2.0;
      }

      this.galaxyStars.push({
        baseR: r,
        r: r,
        baseTheta: theta,
        theta: theta,
        color: color,
        size: size,
        alpha: 0.2 + Math.random() * 0.8,
        twinkleSpeed: 1 + Math.random() * 4,
        speedFactor: 0.7 + Math.random() * 0.6,
        orbitRadiusOffset: (Math.random() - 0.5) * 15
      });
    }
  }

  skip() {
    if (this.isSkipped || this.isCompleted) return;
    this.isSkipped = true;
    
    // Play sound cue if audio enabled
    try {
      if (sound && !sound.isMuted) sound.playClick();
    } catch (e) {}

    // Trigger instant supernova flash and finish
    if (this.flashEl) {
      this.flashEl.style.opacity = '1';
      this.flashEl.style.transition = 'none';
      setTimeout(() => {
        this.flashEl.style.transition = 'opacity 0.4s ease-out';
        this.flashEl.style.opacity = '0';
        this.cleanup();
      }, 60);
    } else {
      this.cleanup();
    }
  }

  // Master Render Loop
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

    // Render respective phases based on elapsed time
    if (elapsed < 1.35) {
      this.renderPhase1_ECG(elapsed);
      this.updateStatus('[01/04] VITAL_SIGNAL // SYNCHRONIZING ECG PULSE');
    } else if (elapsed < 2.6) {
      this.renderPhase2_MilkyWay(elapsed);
      this.updateStatus('[02/04] COSMIC_VORTEX // ACCELERATING NEBULA CORE');
    } else if (elapsed < 4.35) {
      this.renderPhase3_SilhouetteConvergence(elapsed);
      this.updateStatus('[03/04] AVATAR_CONVERGENCE // VECTOR TRANSIT');
    } else if (elapsed < this.duration) {
      this.renderPhase4_SupernovaBoom(elapsed);
      this.updateStatus('[04/04] SUPERNOVA_BREACH // ENTERING SYSTEM');
    } else {
      // Completed naturally
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
     PHASE 1: BIO-DIGITAL ECG HEARTBEAT PULSE (0.0s - 1.35s)
     ========================================================================= */
  renderPhase1_ECG(t) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const midY = h * 0.5;

    // Faint oscilloscope telemetry grid
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

    // ECG Waveform Generation
    // Timeline: 0s to 1.3s traces across screen
    const traceProgress = Math.min(t / 1.25, 1);
    const leadX = traceProgress * (w + 40);

    // Compute Y offset for any X along the ECG line
    const getECGHeight = (x) => {
      const normX = x / w; // 0 to 1
      let dy = 0;

      // First Beat Pulse (centered around normX = 0.32)
      const beat1 = (normX - 0.32) * 22; // local coordinate
      if (Math.abs(beat1) < 4) {
        // P-wave
        dy -= 14 * Math.exp(-Math.pow(beat1 + 2.0, 2) * 1.5);
        // Q-dip
        dy += 18 * Math.exp(-Math.pow(beat1 + 0.6, 2) * 8.0);
        // R-peak (Major electric spike)
        dy -= 130 * Math.exp(-Math.pow(beat1, 2) * 12.0);
        // S-dip
        dy += 36 * Math.exp(-Math.pow(beat1 - 0.6, 2) * 9.0);
        // T-wave
        dy -= 28 * Math.exp(-Math.pow(beat1 - 1.8, 2) * 1.2);
      }

      // Second Beat Pulse (centered around normX = 0.68)
      const beat2 = (normX - 0.68) * 22;
      if (Math.abs(beat2) < 4) {
        // P-wave
        dy -= 16 * Math.exp(-Math.pow(beat2 + 2.0, 2) * 1.5);
        // Q-dip
        dy += 22 * Math.exp(-Math.pow(beat2 + 0.6, 2) * 8.0);
        // R-peak (Even sharper high-intensity spike)
        dy -= 145 * Math.exp(-Math.pow(beat2, 2) * 14.0);
        // S-dip
        dy += 42 * Math.exp(-Math.pow(beat2 - 0.6, 2) * 10.0);
        // T-wave
        dy -= 32 * Math.exp(-Math.pow(beat2 - 1.8, 2) * 1.2);
      }

      // Small high-frequency bio-noise ripple
      dy += Math.sin(x * 0.08) * 1.2;

      return midY + dy;
    };

    // Draw ECG Trail Path
    ctx.save();
    ctx.beginPath();
    const step = 4;
    ctx.moveTo(0, midY);

    for (let x = 0; x <= leadX; x += step) {
      const y = getECGHeight(x);
      ctx.lineTo(x, y);
    }

    // Outer Neon Glow Pass
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
    ctx.lineWidth = 7;
    ctx.shadowColor = '#00F0FF';
    ctx.shadowBlur = 18;
    ctx.stroke();

    // Secondary Violet Rim Glow
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.4)';
    ctx.lineWidth = 3.5;
    ctx.shadowBlur = 10;
    ctx.stroke();

    // Intense Core Phosphor Line
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 4;
    ctx.stroke();
    ctx.restore();

    // Glowing Lead Head / Phosphor Flare Dot
    if (leadX <= w) {
      const leadY = getECGHeight(leadX);
      ctx.save();
      // Outer flare
      const radGrad = ctx.createRadialGradient(leadX, leadY, 0, leadX, leadY, 28);
      radGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      radGrad.addColorStop(0.25, 'rgba(0, 240, 255, 0.85)');
      radGrad.addColorStop(0.65, 'rgba(168, 85, 247, 0.35)');
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(leadX, leadY, 28, 0, Math.PI * 2);
      ctx.fill();

      // Sharp central spark
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(leadX, leadY, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // At the end of Phase 1 (t > 1.05s), begin spiral gravitational collapse
    if (t > 1.05) {
      const collapseP = (t - 1.05) / 0.3; // 0 to 1
      const centerX = w * 0.5;
      const centerY = midY;
      
      ctx.save();
      const vortexGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80 * collapseP);
      vortexGrad.addColorStop(0, 'rgba(0, 240, 255, ' + (0.8 * collapseP) + ')');
      vortexGrad.addColorStop(0.5, 'rgba(168, 85, 247, ' + (0.5 * collapseP) + ')');
      vortexGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = vortexGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80 * collapseP, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /* =========================================================================
     PHASE 2: COSMIC MILKY WAY GALAXY VORTEX (1.25s - 2.6s)
     ========================================================================= */
  renderPhase2_MilkyWay(t) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const cx = w * 0.5;
    const cy = h * 0.5;

    // Normalized phase progress (0 to 1)
    const phaseT = (t - 1.25) / 1.35;
    
    // Rotation accelerates smoothly
    const rotation = (t - 1.25) * 1.9 + Math.pow(phaseT, 2) * 1.4;
    
    // Exponential camera zoom towards galaxy core
    const zoom = 1.0 + Math.pow(phaseT, 2.2) * 3.8;

    this.drawGalaxyField(ctx, cx, cy, rotation, zoom, 1.0, phaseT);
  }

  /* =========================================================================
     PHASE 3: WALKING SILHOUETTE CONVERGENCE (2.5s - 4.35s)
     ========================================================================= */
  renderPhase3_SilhouetteConvergence(t) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    const cx = w * 0.5;
    const cy = h * 0.5;

    // Normalized Phase 3 progress (0 to 1)
    const p3 = (t - 2.5) / 1.85;

    // Continued galaxy vortex rotation and dramatic high-speed zoom
    const rotation = (t - 1.25) * 2.8 + Math.pow(p3, 2.5) * 4.2;
    // Deep hyperspace zoom
    const zoom = 4.8 + Math.pow(p3, 2.4) * 14.0;
    
    // Draw background galaxy with warp streaks
    const warpIntensity = Math.min(Math.pow(p3, 1.8) * 2.2, 3.0);
    this.drawGalaxyField(ctx, cx, cy, rotation, zoom, 1.0, warpIntensity);

    // Radiant Galactic Core Portal Backlight
    const coreGlowRadius = 80 + p3 * 160;
    ctx.save();
    const portalGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreGlowRadius);
    portalGlow.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    portalGlow.addColorStop(0.3, 'rgba(0, 240, 255, 0.7)');
    portalGlow.addColorStop(0.7, 'rgba(168, 85, 247, 0.4)');
    portalGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = portalGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, coreGlowRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Walking Cycle Progression
    // ~2.0 strides per second
    this.walkCycle = (t - 2.5) * Math.PI * 2 * 2.1;

    // Scale of the approaching silhouette grows as person walks forward
    // Starts small in distance (scale ~0.35) and approaches full commanding scale (~2.2)
    const personScale = 0.35 + Math.pow(p3, 1.6) * 1.85;
    const personAlpha = Math.min(p3 * 2.8, 1);
    
    // Subtle ground elevation adjustment as they step into foreground
    const personY = cy + 25 + p3 * 35;

    this.drawWalkingSilhouette(ctx, cx, personY, personScale, personAlpha, this.walkCycle);
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

    // Generate shockwave particles on the very first frame of Phase 4
    if (this.shockwaveParticles.length === 0) {
      for (let i = 0; i < 280; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 400 + Math.random() * 950;
        const color = Math.random() < 0.5 ? '#00F0FF' : (Math.random() < 0.8 ? '#A855F7' : '#FFFFFF');
        this.shockwaveParticles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.5 + Math.random() * 3.5,
          color: color,
          life: 1.0
        });
      }

      // Trigger whiteout flash overlay
      if (this.flashEl) {
        this.flashEl.style.opacity = '1';
        this.flashEl.style.transition = 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
        requestAnimationFrame(() => {
          this.flashEl.style.opacity = '0';
        });
      }

      // Camera shake / micro-rumble
      if (this.overlay) {
        this.overlay.classList.add('intro-shake');
        setTimeout(() => this.overlay.classList.remove('intro-shake'), 180);
      }
    }

    // Expanding Supersonic Shockwave Rings
    const maxRadius = Math.max(w, h) * 1.2;
    const shockRadius1 = p4 * maxRadius * 1.1;
    const shockRadius2 = Math.max(0, (p4 - 0.12) * maxRadius * 0.95);

    // Shockwave Ring 1
    ctx.save();
    ctx.lineWidth = 14 * (1 - p4);
    ctx.strokeStyle = `rgba(0, 240, 255, ${Math.max(0, 1 - p4 * 1.2)})`;
    ctx.shadowColor = '#00F0FF';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(cx, cy, shockRadius1, 0, Math.PI * 2);
    ctx.stroke();

    // Shockwave Ring 2 (Violet Second Harmonic)
    if (shockRadius2 > 0) {
      ctx.lineWidth = 8 * (1 - p4);
      ctx.strokeStyle = `rgba(168, 85, 247, ${Math.max(0, 1 - p4)})`;
      ctx.shadowColor = '#A855F7';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(cx, cy, shockRadius2, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // Render blast particles flying outward
    ctx.save();
    for (let p of this.shockwaveParticles) {
      const dt = 0.016;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.97;
      p.vy *= 0.97;
      
      const particleAlpha = Math.max(0, (1 - p4) * 1.2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = particleAlpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Central Dissolving Supernova Core
    const coreAlpha = Math.max(0, 1 - p4 * 1.8);
    if (coreAlpha > 0) {
      ctx.save();
      const superGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 180 * (1 + p4 * 2));
      superGlow.addColorStop(0, `rgba(255, 255, 255, ${coreAlpha})`);
      superGlow.addColorStop(0.3, `rgba(0, 240, 255, ${coreAlpha * 0.8})`);
      superGlow.addColorStop(0.7, `rgba(168, 85, 247, ${coreAlpha * 0.4})`);
      superGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = superGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 180 * (1 + p4 * 2), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // At p4 > 0.65, begin dissolving the intro overlay so portfolio appears smoothly underneath
    if (p4 > 0.65 && this.overlay) {
      this.overlay.style.opacity = `${Math.max(0, (1 - p4) / 0.35)}`;
      this.overlay.style.transform = `scale(${1 + (p4 - 0.65) * 0.12})`;
    }
  }

  /* =========================================================================
     DRAW GALAXY FIELD WITH SPIRAL ARMS & WARP STREAKS
     ========================================================================= */
  drawGalaxyField(ctx, cx, cy, rotation, zoom, alpha, warpIntensity = 0) {
    ctx.save();
    ctx.translate(cx, cy);

    // Ambient interstellar nebula dust cloud in center
    const nebulaRadius = 240 * Math.min(zoom * 0.5, 2.5);
    const nebulaGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, nebulaRadius);
    nebulaGrad.addColorStop(0, 'rgba(0, 240, 255, 0.18)');
    nebulaGrad.addColorStop(0.4, 'rgba(168, 85, 247, 0.12)');
    nebulaGrad.addColorStop(0.8, 'rgba(79, 172, 254, 0.05)');
    nebulaGrad.addColorStop(1, 'rgba(5, 5, 7, 0)');
    ctx.fillStyle = nebulaGrad;
    ctx.beginPath();
    ctx.arc(0, 0, nebulaRadius, 0, Math.PI * 2);
    ctx.fill();

    // Render galaxy stars
    const isWarping = warpIntensity > 0.4;

    for (let i = 0; i < this.galaxyStars.length; i++) {
      const star = this.galaxyStars[i];
      
      // Rotate by theta + master rotation
      const curTheta = star.baseTheta + rotation * star.speedFactor;
      const curR = star.baseR * zoom;

      // Project 2D coordinates
      const x = Math.cos(curTheta) * curR;
      const y = Math.sin(curTheta) * (curR * 0.78); // Elliptical inclination tilt

      // Skip if far outside screen bounds
      if (Math.abs(x) > this.width * 1.4 || Math.abs(y) > this.height * 1.4) {
        continue;
      }

      ctx.fillStyle = star.color;
      ctx.globalAlpha = Math.min(star.alpha * alpha, 1);

      if (isWarping && curR > 40) {
        // Hyperspace warp streak radial lines
        const streakLength = Math.min((curR * 0.08) * warpIntensity, 45);
        const streakAngle = Math.atan2(y, x);
        const tailX = x - Math.cos(streakAngle) * streakLength;
        const tailY = y - Math.sin(streakAngle) * streakLength;

        ctx.strokeStyle = star.color;
        ctx.lineWidth = Math.min(star.size * 1.2, 3);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        // Crisp round luminous star particle
        ctx.beginPath();
        ctx.arc(x, y, star.size * Math.min(zoom * 0.35 + 0.65, 2.8), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }

  /* =========================================================================
     DRAW DYNAMIC WALKING SILHOUETTE (THE CREATOR / ENGINEER)
     Procedural kinematic walking gait with glowing cyan/violet rim lighting
     ========================================================================= */
  drawWalkingSilhouette(ctx, x, y, scale, alpha, cycle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.globalAlpha = alpha;

    // Kinematics of human walk cycle:
    // Vertical hip bounce (two bounces per stride)
    const hipBounce = Math.abs(Math.cos(cycle)) * 5 - 2.5;
    // Torso sway
    const torsoTilt = Math.sin(cycle) * 0.04;

    // Leg angles
    const leftHipAngle = Math.sin(cycle) * 0.55;
    const rightHipAngle = Math.sin(cycle + Math.PI) * 0.55;

    // Dynamic knee bend on backward & swing phases
    const leftKneeAngle = leftHipAngle > 0 ? 0.2 : Math.sin(cycle) * 0.8;
    const rightKneeAngle = rightHipAngle > 0 ? 0.2 : Math.sin(cycle + Math.PI) * 0.8;

    // Arm angles (opposite to legs)
    const leftShoulderAngle = Math.sin(cycle + Math.PI) * 0.45;
    const rightShoulderAngle = Math.sin(cycle) * 0.45;

    // Draw Ground Shadow
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.ellipse(0, 78, 38, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Glowing Ethereal Aura Behind Figure
    ctx.save();
    const auraGrad = ctx.createRadialGradient(0, -20, 10, 0, -20, 85);
    auraGrad.addColorStop(0, 'rgba(0, 240, 255, 0.45)');
    auraGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.25)');
    auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(0, -20, 85, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Body Colors & Outline:
    // Deep obsidian black core silhouette with cyan and violet rim lighting
    ctx.fillStyle = '#050507';
    ctx.strokeStyle = '#00F0FF';
    ctx.lineWidth = 1.8;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.shadowColor = '#00F0FF';
    ctx.shadowBlur = 12;

    ctx.save();
    ctx.translate(0, hipBounce);
    ctx.rotate(torsoTilt);

    // --- LEGS (Draw behind torso) ---
    // Right Leg (Far leg)
    this.drawLimb(ctx, 7, 24, rightHipAngle, 32, rightKneeAngle, 34, '#030305', 'rgba(168, 85, 247, 0.8)');
    // Left Leg (Near leg)
    this.drawLimb(ctx, -7, 24, leftHipAngle, 32, leftKneeAngle, 34, '#050507', '#00F0FF');

    // --- TORSO & COAT/JACKET ---
    ctx.beginPath();
    // Torso path (Modern tailored silhouette)
    ctx.moveTo(-16, -28); // Left shoulder
    ctx.lineTo(16, -28);  // Right shoulder
    ctx.lineTo(12, 22);   // Right hip
    ctx.lineTo(-12, 22);  // Left hip
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Coat flare / stride dynamics
    ctx.beginPath();
    ctx.moveTo(-12, 16);
    ctx.lineTo(12, 16);
    ctx.lineTo(18 + Math.sin(cycle) * 6, 44);
    ctx.lineTo(-18 - Math.sin(cycle) * 6, 44);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // --- HEAD & COLLAR ---
    // Neck
    ctx.fillRect(-4, -36, 8, 10);
    // Head with modern posture (forward-looking haircut silhouette)
    ctx.beginPath();
    ctx.ellipse(0, -48, 11, 14, 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Headphone / Cybernetic Headpiece Rim Light
    ctx.save();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00F0FF';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(8, -48, 5, -Math.PI * 0.4, Math.PI * 0.4);
    ctx.stroke();
    ctx.restore();

    // --- ARMS ---
    // Right Arm (Far arm)
    this.drawLimb(ctx, 16, -26, rightShoulderAngle, 26, 0.2, 24, '#030305', 'rgba(168, 85, 247, 0.8)');
    // Left Arm (Near arm)
    this.drawLimb(ctx, -16, -26, leftShoulderAngle, 26, 0.2, 24, '#050507', '#00F0FF');

    ctx.restore(); // Hip bounce & torso tilt
    ctx.restore(); // Main translate & scale
  }

  // Draw 2-segment articulated limb (Hip -> Knee -> Foot OR Shoulder -> Elbow -> Hand)
  drawLimb(ctx, originX, originY, angle1, length1, angle2, length2, fillColor, rimColor) {
    ctx.save();
    ctx.translate(originX, originY);
    ctx.rotate(angle1);

    // Segment 1 (Thigh / Upper Arm)
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = rimColor;
    ctx.lineWidth = 1.6;
    ctx.shadowColor = rimColor;
    ctx.shadowBlur = 8;

    ctx.beginPath();
    ctx.ellipse(0, length1 * 0.5, 4.5, length1 * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Segment 2 (Shin / Forearm)
    ctx.translate(0, length1);
    ctx.rotate(angle2);

    ctx.beginPath();
    ctx.ellipse(0, length2 * 0.5, 3.8, length2 * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Foot / Hand terminus
    ctx.beginPath();
    ctx.ellipse(2, length2, 4.5, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
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

    // Save flag that intro completed
    try {
      sessionStorage.setItem('portfolio_intro_experienced', 'true');
    } catch (e) {}

    // Dispatch event so other components know system is unlocked
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
  // If not forced, check if already in progress
  if (introEngine && !introEngine.isCompleted) return;

  // Check URL query param ?replay=true or explicit force
  const urlParams = new URLSearchParams(window.location.search);
  const shouldForce = force || urlParams.has('replay');

  // Create and launch
  introEngine = new CinematicIntroEngine();
  introEngine.init();
}

// Function to replay on demand (e.g. from command palette or button)
export function replayCinematicIntro() {
  if (introEngine) {
    introEngine.cleanup(true);
  }
  initCinematicIntro(true);
}
