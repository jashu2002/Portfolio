/**
 * Universal Command Palette (⌘K / Ctrl+K)
 */

import { sound } from './audio.js';

export function initCommandPalette() {
  const backdrop = document.createElement('div');
  backdrop.className = 'cmd-modal-backdrop';
  backdrop.innerHTML = `
    <div class="cmd-modal" role="dialog" aria-modal="true" aria-label="Command Menu">
      <div class="cmd-input-wrap">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--text-tertiary);">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" class="cmd-input" placeholder="Type a command or jump to page..." autofocus />
        <span class="cmd-key">ESC</span>
      </div>
      <ul class="cmd-list" role="listbox">
        <li class="cmd-item" data-action="goto" data-url="index.html">
          <span><strong>Overview:</strong> Full-Stack Portfolio & Highlights</span>
          <span class="badge">Page</span>
        </li>
        <li class="cmd-item" data-action="goto" data-url="services.html">
          <span><strong>Services:</strong> Web Apps, AI Workflows & CRMs</span>
          <span class="badge">Page</span>
        </li>
        <li class="cmd-item" data-action="goto" data-url="projects.html">
          <span><strong>Projects:</strong> Production Case Studies & Demos</span>
          <span class="badge">Page</span>
        </li>
        <li class="cmd-item" data-action="goto" data-url="workflow.html">
          <span><strong>Workflow:</strong> Development Lifecycle & QA</span>
          <span class="badge">Page</span>
        </li>
        <li class="cmd-item" data-action="goto" data-url="skills.html">
          <span><strong>Skills:</strong> Full-Stack Technical Competencies</span>
          <span class="badge">Page</span>
        </li>
        <li class="cmd-item" data-action="goto" data-url="contact.html">
          <span><strong>Contact:</strong> Get in Touch & Inquiries</span>
          <span class="badge">Page</span>
        </li>
        <li class="cmd-item" data-action="replay-intro">
          <span><strong>Replay Intro:</strong> Cinematic ECG & Galaxy Experience</span>
          <span class="badge badge-cyan">Visual</span>
        </li>
        <li class="cmd-item" data-action="toggle-audio">
          <span><strong>Toggle Sound:</strong> Audio Synthesizer</span>
          <span class="badge badge-cyan">Audio</span>
        </li>
        <li class="cmd-item" data-action="copy-email">
          <span><strong>Copy Email:</strong> jashwanthraj0310@gmail.com</span>
          <span class="badge badge-violet">Action</span>
        </li>
        <li class="cmd-item" data-action="goto-external" data-url="https://www.linkedin.com/in/jashwanthraj/">
          <span><strong>LinkedIn:</strong> Jashwanth Raj Profile</span>
          <span class="badge badge-cyan">Connect</span>
        </li>
      </ul>
    </div>
  `;

  document.body.appendChild(backdrop);

  const input = backdrop.querySelector('.cmd-input');
  const items = backdrop.querySelectorAll('.cmd-item');

  function openPalette() {
    backdrop.classList.add('open');
    sound.playClick();
    setTimeout(() => input.focus(), 50);
  }

  function closePalette() {
    backdrop.classList.remove('open');
    input.value = '';
    filterItems('');
  }

  // Keyboard shortcut listener
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (backdrop.classList.contains('open')) closePalette();
      else openPalette();
    } else if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closePalette();
    }
  });

  // Global trigger buttons
  document.querySelectorAll('.cmd-trigger').forEach(btn => {
    btn.addEventListener('click', openPalette);
  });

  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closePalette();
  });

  function filterItems(query) {
    const q = query.toLowerCase();
    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(q) ? 'flex' : 'none';
    });
  }

  input.addEventListener('input', (e) => {
    filterItems(e.target.value);
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      const url = item.getAttribute('data-url');

      if (action === 'goto' && url) {
        window.location.href = url;
      } else if (action === 'replay-intro') {
        closePalette();
        if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/Portfolio/')) {
          if (window.replayCinematicIntro) {
            window.replayCinematicIntro();
          } else {
            window.location.search = '?replay=true';
          }
        } else {
          window.location.href = 'index.html?replay=true';
        }
      } else if (action === 'toggle-audio') {
        sound.toggleMute();
        closePalette();
      } else if (action === 'copy-email') {
        navigator.clipboard.writeText('jashwanthraj0310@gmail.com');
        sound.playSuccess();
        alert('Email copied to clipboard: jashwanthraj0310@gmail.com');
        closePalette();
      } else if (action === 'goto-external' && url) {
        sound.playClick();
        window.open(url, '_blank', 'noopener,noreferrer');
        closePalette();
      }
    });
  });
}
