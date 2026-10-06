/**
 * Multi-Device High-Performance Parallax Engine
 * Provides buttery-smooth 60fps depth scrolling across Desktop, Tablet, and Mobile.
 * Built with center-relative viewport offsets and lerp interpolation.
 */

export class ParallaxEngine {
  constructor(options = {}) {
    this.options = {
      desktopSpeedFactor: 1.0,
      tabletSpeedFactor: 0.75,
      mobileSpeedFactor: 0.55,
      lerpFactorDesktop: 0.14,
      lerpFactorMobile: 0.22,
      tabletBreakpoint: 1024,
      mobileBreakpoint: 768,
      ...options
    };

    this.items = [];
    this.rafId = null;
    this.isTicking = false;
    this.scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    this.viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    this.isReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    if (typeof window === 'undefined' || this.isReducedMotion) return;

    this.collectElements();
    this.bindEvents();
    this.updateTargets();
    // Render first frame immediately to eliminate any visual snap
    this.render();
  }

  collectElements() {
    this.items = [];
    // Support both data-parallax and data-mf-parallax seamlessly
    const elements = document.querySelectorAll('[data-parallax], [data-mf-parallax]');

    elements.forEach(el => {
      if (el.hasAttribute('data-parallax-ignore') || el.hasAttribute('data-mf-parallax-ignore')) return;

      const baseSpeed = parseFloat(
        el.getAttribute('data-parallax-speed') || 
        el.getAttribute('data-mf-parallax-speed') || 
        '0.15'
      );

      const tabletSpeed = el.hasAttribute('data-parallax-speed-tablet')
        ? parseFloat(el.getAttribute('data-parallax-speed-tablet'))
        : (el.hasAttribute('data-mf-parallax-speed-tablet')
            ? parseFloat(el.getAttribute('data-mf-parallax-speed-tablet'))
            : null);

      const mobileSpeed = el.hasAttribute('data-parallax-speed-mobile')
        ? parseFloat(el.getAttribute('data-parallax-speed-mobile'))
        : (el.hasAttribute('data-mf-parallax-speed-mobile')
            ? parseFloat(el.getAttribute('data-mf-parallax-speed-mobile'))
            : null);

      const direction = el.getAttribute('data-parallax-direction') || 'vertical';
      const rotate = parseFloat(el.getAttribute('data-parallax-rotate') || '0');

      // Safe clamp: cards, articles and items with data-parallax-max will never exceed their clamp boundary
      const maxClamp = el.hasAttribute('data-parallax-max')
        ? parseFloat(el.getAttribute('data-parallax-max'))
        : (el.classList.contains('card-3d') || el.classList.contains('project-item') || el.tagName === 'ARTICLE' ? 24 : null);

      el.style.willChange = 'transform';

      this.items.push({
        el,
        baseSpeed,
        tabletSpeed,
        mobileSpeed,
        direction,
        rotate,
        maxClamp,
        currentY: 0,
        targetY: 0,
        currentX: 0,
        targetX: 0,
        currentRot: 0,
        targetRot: 0
      });
    });
  }

  getSpeed(item) {
    const width = window.innerWidth;
    if (width <= this.options.mobileBreakpoint) {
      if (item.mobileSpeed !== null && !isNaN(item.mobileSpeed)) {
        return item.mobileSpeed;
      }
      return item.baseSpeed * this.options.mobileSpeedFactor;
    }
    if (width <= this.options.tabletBreakpoint) {
      if (item.tabletSpeed !== null && !isNaN(item.tabletSpeed)) {
        return item.tabletSpeed;
      }
      return item.baseSpeed * this.options.tabletSpeedFactor;
    }
    return item.baseSpeed * this.options.desktopSpeedFactor;
  }

  updateTargets() {
    this.scrollY = window.scrollY;
    this.viewportHeight = window.innerHeight;
    const vh = this.viewportHeight;
    const halfVh = vh / 2;

    this.items.forEach(item => {
      const rect = item.el.getBoundingClientRect();
      // Calculate true natural top by removing current translation offset
      const naturalTop = rect.top - item.currentY;
      const naturalCenter = naturalTop + rect.height / 2;
      const distanceFromCenter = naturalCenter - halfVh;

      const speed = this.getSpeed(item);

      if (item.direction === 'vertical' || item.direction === 'both') {
        let y = -(distanceFromCenter * speed);
        if (item.maxClamp !== null && !isNaN(item.maxClamp)) {
          y = Math.max(-item.maxClamp, Math.min(item.maxClamp, y));
        }
        item.targetY = y;
      }
      if (item.direction === 'horizontal' || item.direction === 'both') {
        item.targetX = -(distanceFromCenter * (speed * 0.4));
      }
      if (item.rotate) {
        item.targetRot = -(distanceFromCenter * 0.015 * item.rotate);
      }
    });

    if (!this.rafId) {
      this.rafId = requestAnimationFrame(this.render.bind(this));
    }
  }

  render() {
    let moving = false;
    const isMobile = window.innerWidth <= this.options.mobileBreakpoint;
    const lerpRate = isMobile ? this.options.lerpFactorMobile : this.options.lerpFactorDesktop;

    this.items.forEach(item => {
      item.currentY += (item.targetY - item.currentY) * lerpRate;
      item.currentX += (item.targetX - item.currentX) * lerpRate;
      item.currentRot += (item.targetRot - item.currentRot) * lerpRate;

      const diffY = Math.abs(item.targetY - item.currentY);
      const diffX = Math.abs(item.targetX - item.currentX);
      const diffRot = Math.abs(item.targetRot - item.currentRot);

      if (diffY > 0.05 || diffX > 0.05 || diffRot > 0.05) {
        moving = true;
      }

      const yVal = Math.round(item.currentY * 100) / 100;
      const xVal = Math.round(item.currentX * 100) / 100;

      let transformStr = `translate3d(${xVal}px, ${yVal}px, 0)`;
      if (item.rotate) {
        const rotVal = Math.round(item.currentRot * 100) / 100;
        transformStr += ` rotate(${rotVal}deg)`;
      }

      item.el.style.transform = transformStr;
    });

    if (moving) {
      this.rafId = requestAnimationFrame(this.render.bind(this));
    } else {
      this.rafId = null;
    }
  }

  bindEvents() {
    this.scrollListener = () => {
      this.updateTargets();
    };

    this.resizeListener = () => {
      this.viewportHeight = window.innerHeight;
      this.updateTargets();
    };

    window.addEventListener('scroll', this.scrollListener, { passive: true });
    window.addEventListener('resize', this.resizeListener, { passive: true });
  }

  refresh() {
    this.collectElements();
    this.updateTargets();
  }

  destroy() {
    if (this.scrollListener) window.removeEventListener('scroll', this.scrollListener);
    if (this.resizeListener) window.removeEventListener('resize', this.resizeListener);
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.items.forEach(item => {
      item.el.style.transform = '';
      item.el.style.willChange = '';
    });
    this.items = [];
  }
}

export function initParallaxEngine(options) {
  if (typeof window === 'undefined') return null;
  const engine = new ParallaxEngine(options);
  window.parallaxEngine = engine;
  return engine;
}
