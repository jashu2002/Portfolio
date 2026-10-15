import '@slicemypage/motionflow/dist/motionflow.min.css';
import MotionFlow from '@slicemypage/motionflow';
import { initParallaxEngine } from './parallax-engine.js';
import { initTypingEffect } from './typing.js';

export function initMotionFlow() {
  if (typeof window === 'undefined') return;

  try {
    MotionFlow.init({
      animation: {
        duration: 650,
        distance: 40,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        once: true
      },
      text: {
        loop: {
          animation: 'fade-up',
          interval: 2400
        },
        typing: {
          speed: 60,
          deleteSpeed: 25,
          interval: 2000,
          cursor: true
        }
      },
      count: {
        duration: 1600,
        once: true
      },
      ticker: {
        speed: 25,
        pauseOnHover: true
      }
    });

    window.MotionFlow = MotionFlow;

    // Explicitly initialize text, count, and roller engines
    try {
      if (MotionFlow.text && typeof MotionFlow.text.init === 'function') {
        MotionFlow.text.init();
      }
      if (MotionFlow.count && typeof MotionFlow.count.init === 'function') {
        MotionFlow.count.init();
      }
      if (MotionFlow.roller && typeof MotionFlow.roller.init === 'function') {
        MotionFlow.roller.init();
      }
      if (MotionFlow.ticker && typeof MotionFlow.ticker.init === 'function') {
        MotionFlow.ticker.init();
      }
    } catch (e) {
      // Sub-engine init note
    }

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

  // Initialize dedicated resilient typing engine
  try {
    initTypingEffect();
  } catch (err) {
    console.warn('Typing engine initialization note:', err);
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
