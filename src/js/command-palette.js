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
          <span><strong>Home:</strong> Freelance Software Developer & Solutions</span>
          <span class="badge">Page</span>
        </li>
        <li class="cmd-item" data-action="goto" data-url="projects.html">
          <span><strong>Work:</strong> Selected Projects & Case Studies</span>
          <span class="badge">Page</span>
        </li>
        <li class="cmd-item" data-action="goto-external" data-url="https://dhansiri-ten.vercel.app/">
          <span><strong>Featured Client:</strong> Dhansiri Chakki Fresh Atta (Live Storefront)</span>
          <span class="badge badge-emerald">Live</span>
        </li>
        <li class="cmd-item" data-action="goto-external" data-url="https://woozy-xi.vercel.app/">
          <span><strong>Featured Project:</strong> WOofe Luxury Pet Furniture (Live Next.js App)</span>
          <span class="badge badge-emerald">Live</span>
        </li>
        <li class="cmd-item" data-action="goto" data-url="services.html">
          <span><strong>Services:</strong> Web, E-Commerce, Python & AI Solutions</span>
          <span class="badge badge-cyan">Services</span>
        </li>
        <li class="cmd-item" data-action="goto" data-url="workflow.html">
          <span><strong>Process:</strong> 7-Stage Client Development Lifecycle</span>
          <span class="badge">Page</span>
        </li>
        <li class="cmd-item" data-action="goto" data-url="skills.html">
          <span><strong>About:</strong> Background & Technical Stack</span>
          <span class="badge">Page</span>
        </li>
        <li class="cmd-item" data-action="goto" data-url="contact.html">
          <span><strong>Start a Project:</strong> Request a Quote & Consultation</span>
          <span class="badge badge-emerald">Action</span>
        </li>
        <li class="cmd-item" data-action="goto-external" data-url="/assets/Jashwanth_Raj_Resume.pdf">
          <span><strong>Resume:</strong> View Jashwanth Raj Resume (PDF)</span>
          <span class="badge badge-emerald">Resume</span>
        </li>
        <li class="cmd-item" data-action="goto-external" data-url="https://github.com/jashu2002">
          <span><strong>GitHub:</strong> github.com/jashu2002</span>
          <span class="badge">Code</span>
        </li>
        <li class="cmd-item" data-action="goto-external" data-url="https://www.linkedin.com/in/jashwanthraj/">
          <span><strong>LinkedIn:</strong> linkedin.com/in/jashwanthraj</span>
          <span class="badge badge-cyan">Connect</span>
        </li>
        <li class="cmd-item" data-action="copy-email">
          <span><strong>Copy Email:</strong> jashwanthraj0310@gmail.com</span>
          <span class="badge badge-violet">Action</span>
        </li>
        <li class="cmd-item" data-action="toggle-audio">
          <span><strong>Toggle Sound:</strong> Audio Synthesizer</span>
          <span class="badge">Audio</span>
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
