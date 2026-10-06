import '@slicemypage/motionflow/dist/motionflow.min.css';
import MotionFlow from '@slicemypage/motionflow';
import { initParallaxEngine } from './parallax-engine.js';

export function initMotionFlow() {
  if (typeof window === 'undefined') return;

  try {
    MotionFlow.init({
      animation: {
        duration: 700,
        distance: 50,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        once: true,
        repeat: 'both'
      },
      text: {
        loop: {
          animation: 'fade-up',
          interval: 2400
        },
        typing: {
          speed: 65,
          deleteSpeed: 25,
          interval: 2000,
          cursor: true
        }
      },
      count: {
        duration: 1800,
        once: true
      },
      ticker: {
        speed: 60,
        pauseOnHover: true
      }
    });

    window.MotionFlow = MotionFlow;

    // Disable MotionFlow's internal parallax so our dedicated ParallaxEngine handles all parallax
    try {
      if (MotionFlow.parallax && typeof MotionFlow.parallax.destroy === 'function') {
        MotionFlow.parallax.destroy();
      }
    } catch (e) {
      // Ignore
    }
  } catch (err) {
    console.warn('MotionFlow initialization note:', err);
  }

  // Initialize high-performance multi-device parallax engine
  try {
    initParallaxEngine({
      desktopSpeedFactor: 1.0,
      tabletSpeedFactor: 0.75,
      mobileSpeedFactor: 0.55
    });
  } catch (err) {
    console.warn('Parallax initialization note:', err);
  }

  return MotionFlow;
}
