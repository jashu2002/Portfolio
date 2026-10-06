/**
 * Procedural Web Audio API Sound Designer
 * Generates futuristic micro-sound effects and ambient audio on-the-fly without external audio files.
 */

class SoundDesigner {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('cinematic-audio-muted') === 'true';
    this.ambientOsc1 = null;
    this.ambientOsc2 = null;
    this.ambientGain = null;
    this.isAmbientPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playHover() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      // Audio fallback silent
    }
  }

  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  playAgentStep() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.035, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch (e) {}
  }

  playSuccess() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = this.ctx.currentTime + (i * 0.05);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.025, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.22);
      });
    } catch (e) {}
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('cinematic-audio-muted', this.isMuted);
    if (this.isMuted && this.isAmbientPlaying) {
      this.stopAmbient();
    } else if (!this.isMuted && !this.isAmbientPlaying) {
      this.playClick();
    }
    return !this.isMuted;
  }
}

export const sound = new SoundDesigner();

// Global click & hover hook for interactive elements
export function setupInteractiveSounds() {
  document.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button, a, input, select, .interactive')) {
      sound.playClick();
    }
  });

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('button, a, .interactive')) {
      sound.playHover();
    }
  });

  // Audio Toggle Button Controller
  const audioButtons = document.querySelectorAll('.audio-btn');
  audioButtons.forEach(btn => {
    if (!sound.isMuted) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.addEventListener('click', () => {
      const active = sound.toggleMute();
      audioButtons.forEach(b => {
        if (active) b.classList.add('active');
        else b.classList.remove('active');
      });
    });
  });
}
