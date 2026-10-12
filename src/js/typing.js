/**
 * Bulletproof, Ultra-Smooth Text Typing Animation
 * Designed to cycle through key business value propositions with realistic cadence.
 */

export function initTypingEffect(selector = '#hero-typing-target, [data-mf-text-type="typing"]') {
  if (typeof window === 'undefined') return;

  const target = document.querySelector(selector);
  if (!target) return;
  if (target.__typingInited) return;
  target.__typingInited = true;

  // Extract phrases from children or data attributes
  const phraseElements = target.querySelectorAll('.typing-phrase');
  let phrases = [];
  if (phraseElements.length > 0) {
    phrases = Array.from(phraseElements).map(el => el.textContent.trim()).filter(Boolean);
  } else if (target.dataset.phrases) {
    try { phrases = JSON.parse(target.dataset.phrases); } catch (e) {}
  }

  if (phrases.length === 0) {
    phrases = [
      "Solve Business Problems.",
      "Turn Ideas Into Reality.",
      "Automate Core Workflows.",
      "Deliver Production-Ready Code."
    ];
  }

  // Check reduced motion preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    target.innerHTML = `<span class="typing-text">${phrases[0]}</span>`;
    return;
  }

  // Set up inner markup with animated glowing cursor
  target.innerHTML = `<span class="typing-text"></span><span class="typing-cursor" aria-hidden="true">▎</span>`;
  const textSpan = target.querySelector('.typing-text');
  const cursorSpan = target.querySelector('.typing-cursor');

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const TYPE_SPEED = 55;
  const DELETE_SPEED = 25;
  const PAUSE_END = 2200;
  const PAUSE_START = 350;

  function typeTick() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
      textSpan.textContent = currentPhrase.substring(0, charIndex);
    } else {
      charIndex++;
      textSpan.textContent = currentPhrase.substring(0, charIndex);
    }

    let delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;

    // Subtle human cadence variation
    if (!isDeleting) {
      delay += Math.floor(Math.random() * 20);
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      delay = PAUSE_END;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = PAUSE_START;
    }

    setTimeout(typeTick, delay);
  }

  // Start typing immediately
  typeTick();
}
