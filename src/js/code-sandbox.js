/**
 * Code Execution Sandbox Controller
 * Interactive typing simulator, live runtime compilation, and telemetry streamer
 * Crafted with zero external dependencies and 60 FPS performance
 */
import { sound } from './audio.js';

export const CODE_SCENARIOS = {
  agent_swarm: {
    id: 'agent_swarm',
    title: 'workflow_automation.ts',
    lang: 'typescript',
    badge: 'AI WORKFLOW // MCP INTEGRATION',
    command: 'npx tsx workflow_automation.ts --verbose',
    code: `import { TaskOrchestrator, MCPClient } from '@platform/agent-core';

export async function executeAutomatedPipeline() {
  const mcp = new MCPClient({
    servers: ['github-mcp', 'linear-mcp']
  });

  const orchestrator = new TaskOrchestrator({
    model: 'gpt-4o',
    retries: 3,
    validationMode: 'strict-schema'
  });

  // Automated pull request generation & testing verification
  const result = await orchestrator.run({
    task: 'Generate typed API client and run integration tests',
    tools: await mcp.getAvailableTools(),
    onProgress: (status) => console.log(status)
  });

  return result.summary;
}`,
    logs: [
      { delay: 80, text: '⟳ [0.00s] Initializing TypeScript runtime and strict type checker...', type: 'info' },
      { delay: 180, text: '✓ [0.12s] Type verification passed: 0 errors across 14 modules', type: 'success' },
      { delay: 280, text: '⚡ [0.24s] Establishing connection with MCP tool servers: [github, linear]', type: 'info' },
      { delay: 380, text: '🛰️ [0.39s] Model Context Protocol connected (handshake: 8.4ms)', type: 'accent' },
      { delay: 490, text: '📦 [0.55s] Generated typed API endpoints with full TypeScript definitions', type: 'info' },
      { delay: 620, text: '⚡ [0.78s] Automated unit & integration tests completed (36/36 passed)', type: 'success' },
      { delay: 760, text: '🛡️ [0.94s] Linting, formatting, and schema validation verified', type: 'success' },
      { delay: 900, text: '● [STATUS] Process completed: Exit code 0 · Total execution: 920ms', type: 'metric' }
    ]
  },

  fullstack_api: {
    id: 'fullstack_api',
    title: 'realtime_service.py',
    lang: 'python',
    badge: 'FASTAPI // ASYNC BACKEND',
    command: 'uvicorn realtime_service:app --workers 4 --port 8000',
    code: `from fastapi import FastAPI, WebSocket
from core.database import AsyncDatabasePool

app = FastAPI(title="Real-Time Analytics & Streaming Service")
pool = AsyncDatabasePool(max_size=32, timeout_sec=2.0)

@app.websocket("/ws/analytics")
async def stream_live_metrics(socket: WebSocket):
    await socket.accept()
    async with pool.acquire() as session:
        async for frame in session.stream_events():
            await socket.send_json({
                "status": "connected",
                "p99_latency_ms": 6.8,
                "active_connections": 8420,
                "payload": frame
            })`,
    logs: [
      { delay: 80, text: '⟳ [0.00s] Initializing ASGI worker process pool [PID 41280]...', type: 'info' },
      { delay: 160, text: '✓ [0.08s] Uvicorn running on http://127.0.0.1:8000 (4 workers)', type: 'success' },
      { delay: 260, text: '⚡ [0.18s] AsyncDatabasePool initialized (32 connection pool warm)', type: 'info' },
      { delay: 390, text: '🔌 [0.32s] Client WebSocket connected: /ws/analytics', type: 'accent' },
      { delay: 520, text: '📊 [0.49s] Real-time event stream active (8,420 events/sec)', type: 'accent' },
      { delay: 680, text: '⚡ [0.65s] P99 Latency: 6.8ms · Memory footprint: 38MB steady', type: 'success' },
      { delay: 820, text: '● [STATUS] Service Health: 100% OPERATIONAL · Zero packet drops', type: 'metric' }
    ]
  },

  spatial_core: {
    id: 'spatial_core',
    title: 'interactive_view.ts',
    lang: 'typescript',
    badge: 'THREE.JS // WEBGL 2.0',
    command: 'npx vite build --target esnext',
    code: `import * as THREE from 'three';

export function createInteractiveScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'high-performance'
  });
  
  const scene = new THREE.Scene();
  const geometry = new THREE.IcosahedronGeometry(2.4, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 0x00F0FF,
    wireframe: true
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  return { renderer, scene, mesh };
}`,
    logs: [
      { delay: 80, text: '⟳ [0.00s] Initializing WebGL 2.0 rendering context...', type: 'info' },
      { delay: 150, text: '✓ [0.07s] GPU Hardware acceleration active (Discrete GPU bound)', type: 'success' },
      { delay: 270, text: '⚡ [0.19s] Geometry and material shaders successfully loaded', type: 'info' },
      { delay: 410, text: '✓ [0.33s] Scene graph initialized: 24,576 vertices in VRAM buffer', type: 'success' },
      { delay: 560, text: '💎 [0.48s] Mouse and resize event listeners attached', type: 'accent' },
      { delay: 720, text: '🚀 [0.64s] Render animation loop steady at 60.0 FPS (16.6ms/frame)', type: 'success' },
      { delay: 860, text: '● [STATUS] Draw calls: 1 · Zero memory leaks · 60 FPS verified', type: 'metric' }
    ]
  }
};

/**
 * Lightweight syntax highlighter with zero external dependencies
 */
function highlightCode(code, lang) {
  // Escape HTML characters
  let safe = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (lang === 'typescript') {
    // Comments
    safe = safe.replace(/(\/\/[^\n]*)/g, '<span class="syn-cm">$1</span>');
    // Strings
    safe = safe.replace(/(['"`][^'"`\n]*['"`])/g, '<span class="syn-str">$1</span>');
    // Keywords
    safe = safe.replace(/\b(import|from|export|async|function|const|await|return|new)\b/g, '<span class="syn-kw">$1</span>');
    // Types
    safe = safe.replace(/\b(TaskOrchestrator|MCPClient|HTMLCanvasElement|THREE|IcosahedronGeometry|Mesh|MeshStandardMaterial|Scene|WebGLRenderer)\b/g, '<span class="syn-type">$1</span>');
    // Functions
    safe = safe.replace(/\b(executeAutomatedPipeline|getAvailableTools|createInteractiveScene|run|add)\b/g, '<span class="syn-fn">$1</span>');
    // Numbers
    safe = safe.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="syn-num">$1</span>');
  } else if (lang === 'python') {
    // Comments
    safe = safe.replace(/(#[^\n]*)/g, '<span class="syn-cm">$1</span>');
    // Strings
    safe = safe.replace(/(f?['"][^'"]*['"])/g, '<span class="syn-str">$1</span>');
    // Keywords
    safe = safe.replace(/\b(from|import|async|def|await|with|as|for|in|return)\b/g, '<span class="syn-kw">$1</span>');
    // Types
    safe = safe.replace(/\b(FastAPI|WebSocket|AsyncDatabasePool)\b/g, '<span class="syn-type">$1</span>');
    // Functions
    safe = safe.replace(/\b(stream_live_metrics|accept|acquire|send_json|stream_events)\b/g, '<span class="syn-fn">$1</span>');
    // Numbers
    safe = safe.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="syn-num">$1</span>');
  }

  return safe;
}

export function initCodeSandbox() {
  const container = document.getElementById('code-sandbox-root');
  if (!container) return;

  const tabButtons = container.querySelectorAll('.sandbox-tab');
  const codeDisplay = document.getElementById('sandbox-code-display') || container.querySelector('.sandbox-code-display');
  const lineNumbers = document.getElementById('sandbox-line-numbers') || container.querySelector('.sandbox-line-numbers');
  const termCommand = document.getElementById('sandbox-term-command') || container.querySelector('.sandbox-term-command');
  const termOutput = document.getElementById('sandbox-term-output') || container.querySelector('.sandbox-term-output');
  const termBadge = document.getElementById('sandbox-term-badge') || container.querySelector('.sandbox-term-badge');
  const btnRun = document.getElementById('sandbox-btn-run') || container.querySelector('.sandbox-btn-run');
  const btnCopy = document.getElementById('sandbox-btn-copy') || container.querySelector('.sandbox-btn-copy');
  const activeBadge = document.getElementById('sandbox-active-badge') || container.querySelector('.sandbox-active-badge');

  let currentKey = 'agent_swarm';
  let isTyping = false;
  let typingTimer = null;
  let terminalTimeouts = [];

  function clearAllTimers() {
    if (typingTimer) clearTimeout(typingTimer);
    terminalTimeouts.forEach(t => clearTimeout(t));
    terminalTimeouts = [];
  }

  function updateLineNumbers(text) {
    if (!lineNumbers) return;
    const lines = text.split('\n').length;
    let numbers = '';
    for (let i = 1; i <= lines; i++) {
      numbers += `<span>${i}</span>\n`;
    }
    lineNumbers.innerHTML = numbers;
  }

  function typeCode(fullText, lang, onComplete) {
    clearAllTimers();
    isTyping = true;
    let index = 0;
    const speed = 7; // Fast, snappy, cinematic typing cadence

    // Quick burst typing
    function step() {
      // Chunk characters for buttery 60 FPS animation
      const chunkSize = Math.floor(Math.random() * 3) + 2;
      index = Math.min(index + chunkSize, fullText.length);
      const currentSlice = fullText.slice(0, index);

      codeDisplay.innerHTML = highlightCode(currentSlice, lang) + '<span class="typing-cursor" aria-hidden="true"></span>';
      updateLineNumbers(currentSlice);

      if (index < fullText.length) {
        typingTimer = setTimeout(step, speed);
      } else {
        isTyping = false;
        codeDisplay.innerHTML = highlightCode(fullText, lang) + '<span class="typing-cursor" aria-hidden="true"></span>';
        updateLineNumbers(fullText);
        if (onComplete) onComplete();
      }
    }

    step();
  }

  function runTerminal(scenario) {
    if (!termOutput) return;

    if (termCommand) {
      termCommand.textContent = `$ ${scenario.command}`;
    }

    if (termBadge) {
      termBadge.textContent = '● EXECUTING';
      termBadge.className = 'term-badge';
      termBadge.style.color = '#00F0FF';
      termBadge.style.borderColor = 'rgba(0, 240, 255, 0.4)';
      termBadge.style.background = 'rgba(0, 240, 255, 0.1)';
    }

    termOutput.innerHTML = '';

    scenario.logs.forEach((log, i) => {
      const timeout = setTimeout(() => {
        const line = document.createElement('div');
        line.className = `term-line ${log.type}`;
        line.textContent = log.text;
        line.style.opacity = '0';
        line.style.transform = 'translateY(4px)';
        termOutput.appendChild(line);

        // Micro-fade in
        requestAnimationFrame(() => {
          line.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
          line.style.opacity = '1';
          line.style.transform = 'translateY(0)';
        });

        termOutput.scrollTop = termOutput.scrollHeight;

        // On last log item, play success chime and mark status OK
        if (i === scenario.logs.length - 1) {
          if (termBadge) {
            termBadge.textContent = '✓ 200 OK';
            termBadge.style.color = '#10B981';
            termBadge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
            termBadge.style.background = 'rgba(16, 185, 129, 0.1)';
          }
          sound.playSuccess();
        }
      }, log.delay);

      terminalTimeouts.push(timeout);
    });
  }

  function loadScenario(key, shouldType = true) {
    currentKey = key;
    const scenario = CODE_SCENARIOS[key];
    if (!scenario) return;

    // Update active tab buttons
    tabButtons.forEach(btn => {
      if (btn.getAttribute('data-tab') === key) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    if (activeBadge) {
      activeBadge.textContent = scenario.badge;
    }

    if (shouldType) {
      typeCode(scenario.code, scenario.lang, () => {
        runTerminal(scenario);
      });
    } else {
      clearAllTimers();
      codeDisplay.innerHTML = highlightCode(scenario.code, scenario.lang) + '<span class="typing-cursor" aria-hidden="true"></span>';
      updateLineNumbers(scenario.code);
      runTerminal(scenario);
    }
  }

  // Bind Tab Click Handlers
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      if (tab === currentKey && !isTyping) return;
      sound.playClick();
      loadScenario(tab, true);
    });
  });

  // Bind Run/Replay Button
  if (btnRun) {
    btnRun.addEventListener('click', () => {
      sound.playClick();
      loadScenario(currentKey, true);
    });
  }

  // Bind Copy Code Button
  if (btnCopy) {
    btnCopy.addEventListener('click', async () => {
      sound.playClick();
      const scenario = CODE_SCENARIOS[currentKey];
      if (scenario) {
        try {
          await navigator.clipboard.writeText(scenario.code);
          const originalHTML = btnCopy.innerHTML;
          btnCopy.innerHTML = `<span style="color: #10B981;">✓ Copied</span>`;
          setTimeout(() => {
            btnCopy.innerHTML = originalHTML;
          }, 2000);
        } catch (e) {
          // Fallback if clipboard api blocked
          console.warn('Clipboard write failed:', e);
        }
      }
    });
  }

  // Lazy trigger: Start animation only when scrolled into view
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadScenario('agent_swarm', true);
          observer.disconnect();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(container);
  } else {
    loadScenario('agent_swarm', true);
  }
}
